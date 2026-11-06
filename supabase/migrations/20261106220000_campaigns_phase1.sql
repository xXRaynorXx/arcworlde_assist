-- Campañas, fase 1: número de misiones, fondo de cada banda, capítulos con su partida y
-- tiradas compartidas (comerciante, lesiones y aventuras entre partidas).
--  * Los dados se tiran en el servidor, así nadie puede falsearlos, y todos los miembros ven el resultado.
--  * El fondo (GP) de cada banda solo cambia con campaign_adjust_gold() y queda anotado en un libro de caja.
--  * El estado de la campaña (capítulo, ganador) solo cambia con las funciones campaign_*.

-- ---------------------------------------------------------------------------
-- Columnas nuevas
-- ---------------------------------------------------------------------------
alter table public.campaigns
  add column if not exists num_missions  integer not null default 3 check (num_missions between 1 and 12),
  add column if not exists starting_gold integer not null default 0 check (starting_gold between 0 and 100000),
  add column if not exists chapter       integer not null default 0;

alter table public.campaign_players
  add column if not exists gold     integer not null default 0 check (gold >= 0),
  add column if not exists injuries jsonb   not null default '{}'::jsonb;  -- { "<miniatura>": ["cojera", ...] } para la próxima partida

-- ---------------------------------------------------------------------------
-- Libro de caja y tiradas (solo lectura para los clientes)
-- ---------------------------------------------------------------------------
create table if not exists public.campaign_ledger (
  id          bigint generated always as identity primary key,
  campaign_id uuid not null references public.campaigns (id) on delete cascade,
  user_id     uuid not null references public.profiles (id) on delete cascade,   -- banda a la que afecta
  actor_id    uuid references public.profiles (id) on delete set null,           -- quién lo anotó
  chapter     integer not null default 0,
  delta       integer not null,
  balance     integer not null,
  reason      text not null check (char_length(reason) between 1 and 120),
  created_at  timestamptz not null default now()
);
create index if not exists campaign_ledger_idx on public.campaign_ledger (campaign_id, created_at);

create table if not exists public.campaign_rolls (
  id          bigint generated always as identity primary key,
  campaign_id uuid not null references public.campaigns (id) on delete cascade,
  user_id     uuid not null references public.profiles (id) on delete cascade,
  chapter     integer not null,
  kind        text not null check (kind in ('merchant', 'injury', 'adventure')),
  unit_index  integer,                    -- miniatura (solo lesiones)
  dice        integer[] not null,
  result      jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);
create unique index if not exists campaign_rolls_once_idx
  on public.campaign_rolls (campaign_id, user_id, chapter, kind, coalesce(unit_index, -1));
create index if not exists campaign_rolls_idx on public.campaign_rolls (campaign_id, created_at);

alter table public.campaign_ledger enable row level security;
alter table public.campaign_rolls  enable row level security;
revoke all on public.campaign_ledger, public.campaign_rolls from anon, authenticated;
grant select on public.campaign_ledger, public.campaign_rolls to authenticated;

drop policy if exists campaign_ledger_select on public.campaign_ledger;
create policy campaign_ledger_select on public.campaign_ledger
  for select to authenticated using (public.is_campaign_member(campaign_id));
drop policy if exists campaign_rolls_select on public.campaign_rolls;
create policy campaign_rolls_select on public.campaign_rolls
  for select to authenticated using (public.is_campaign_member(campaign_id));

-- ---------------------------------------------------------------------------
-- Permisos por columna y guardas
-- ---------------------------------------------------------------------------
revoke update on public.campaigns from authenticated;
grant update (name, max_value, num_missions, starting_gold) on public.campaigns to authenticated;

create or replace function public.guard_campaign_insert()
returns trigger
language plpgsql
as $$
begin
  new.status := 'draft';
  new.chapter := 0;
  new.winner_id := null;
  return new;
end;
$$;
drop trigger if exists campaigns_guard_insert on public.campaigns;
create trigger campaigns_guard_insert
  before insert on public.campaigns
  for each row execute function public.guard_campaign_insert();

create or replace function public.guard_campaign_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status <> 'draft' and (new.max_value is distinct from old.max_value
                                or new.starting_gold is distinct from old.starting_gold) then
    raise exception 'La campaña ya ha empezado: no se puede cambiar el valor máximo ni el fondo inicial';
  end if;
  if new.num_missions < old.chapter then
    raise exception 'La campaña ya va por la misión %', old.chapter;
  end if;
  if old.status = 'finished' and new.num_missions is distinct from old.num_missions then
    raise exception 'La campaña ha terminado';
  end if;
  return new;
end;
$$;
drop trigger if exists campaigns_guard_update on public.campaigns;
create trigger campaigns_guard_update
  before update on public.campaigns
  for each row execute function public.guard_campaign_update();

-- La banda de la campaña solo se cambia antes de empezar
create or replace function public.check_campaign_player_band()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  b public.bands;
  c public.campaigns;
begin
  select * into c from public.campaigns where id = new.campaign_id;
  if tg_op = 'UPDATE' and c.status <> 'draft' and new.band_id is distinct from old.band_id then
    raise exception 'La campaña ya ha empezado: no se puede cambiar de banda';
  end if;

  if new.band_id is null then
    new.band_snapshot = null;
    return new;
  end if;

  select * into b from public.bands where id = new.band_id;
  if not found or b.owner_id <> new.user_id then
    raise exception 'La banda no existe o no es tuya';
  end if;
  if b.value > c.max_value then
    raise exception 'La banda (% GP) supera el valor máximo de la campaña (% GP)', b.value, c.max_value;
  end if;

  new.band_snapshot = to_jsonb(b) - 'owner_id';
  return new;
end;
$$;

-- Nadie se va de una campaña en marcha; las partidas de una campaña activa no se borran
create or replace function public.guard_campaign_player_delete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  st text;
begin
  select status into st from public.campaigns where id = old.campaign_id;
  if st is not null and st <> 'draft' then
    raise exception 'La campaña ya ha empezado: no se puede abandonar';
  end if;
  return old;
end;
$$;
drop trigger if exists campaign_players_guard_delete on public.campaign_players;
create trigger campaign_players_guard_delete
  before delete on public.campaign_players
  for each row execute function public.guard_campaign_player_delete();

create or replace function public.guard_campaign_game_delete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  st text;
begin
  if old.campaign_id is not null then
    select status into st from public.campaigns where id = old.campaign_id;
    if st = 'active' then
      raise exception 'Esta partida pertenece a una campaña en curso';
    end if;
  end if;
  return old;
end;
$$;
drop trigger if exists games_guard_campaign_delete on public.games;
create trigger games_guard_campaign_delete
  before delete on public.games
  for each row execute function public.guard_campaign_game_delete();

-- ---------------------------------------------------------------------------
-- Unirse: solo antes de empezar y con el fondo inicial
-- ---------------------------------------------------------------------------
create or replace function public.join_campaign(p_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  c public.campaigns;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesión';
  end if;

  select * into c from public.campaigns where join_code = p_code and status = 'draft' for update;
  if not found then
    raise exception 'Código de campaña no válido o la campaña ya ha empezado';
  end if;

  if not exists (select 1 from public.campaign_players where campaign_id = c.id and user_id = auth.uid())
     and (select count(*) from public.campaign_players where campaign_id = c.id) >= 12 then
    raise exception 'La campaña está completa (12 jugadores)';
  end if;

  insert into public.campaign_players (campaign_id, user_id, gold)
  values (c.id, auth.uid(), c.starting_gold)
  on conflict do nothing;

  return c.id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Capítulos: cada misión es una partida de la campaña
-- ---------------------------------------------------------------------------
create or replace function public.campaign_make_chapter(cid uuid, n integer)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  c   public.campaigns;
  gid uuid;
  cp  record;
  roster jsonb;
  k   text;
  l   jsonb;
begin
  select * into c from public.campaigns where id = cid;

  insert into public.games (owner_id, campaign_id, name, max_value, position, max_players, status)
  values (c.owner_id, cid, left(c.name, 60) || ' · Misión ' || n, c.max_value, n,
          greatest(1, least(12, (select count(*) from public.campaign_players where campaign_id = cid))), 'draft')
  returning id into gid;

  for cp in select * from public.campaign_players where campaign_id = cid order by joined_at loop
    -- Las lesiones de la partida anterior pasan a la ficha de la nueva (y se consumen)
    roster := '{}'::jsonb;
    for k, l in select key, value from jsonb_each(coalesce(cp.injuries, '{}'::jsonb)) loop
      roster := roster || jsonb_build_object(k, jsonb_build_object(
        'lesiones', l,
        'ko', (l ? 'herido')
      ));
    end loop;

    insert into public.game_players (game_id, user_id, band_id, roster)
    values (gid, cp.user_id, cp.band_id, roster);
  end loop;

  update public.campaign_players set injuries = '{}'::jsonb where campaign_id = cid;
  update public.campaigns set chapter = n where id = cid;
  return gid;
end;
$$;

create or replace function public.campaign_start(p_campaign uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  c public.campaigns;
  n integer;
begin
  select * into c from public.campaigns where id = p_campaign for update;
  if not found or c.owner_id is distinct from auth.uid() then
    raise exception 'Solo el creador puede empezar la campaña';
  end if;
  if c.status <> 'draft' then
    raise exception 'La campaña ya ha empezado';
  end if;
  select count(*) into n from public.campaign_players where campaign_id = p_campaign;
  if n = 0 then
    raise exception 'Todavía no hay jugadores';
  end if;
  if exists (select 1 from public.campaign_players where campaign_id = p_campaign and band_id is null) then
    raise exception 'Todos los jugadores deben elegir una banda';
  end if;

  update public.campaigns set status = 'active' where id = p_campaign;
  return public.campaign_make_chapter(p_campaign, 1);
end;
$$;

create or replace function public.campaign_next_chapter(p_campaign uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  c public.campaigns;
begin
  select * into c from public.campaigns where id = p_campaign for update;
  if not found or c.owner_id is distinct from auth.uid() then
    raise exception 'Solo el creador puede pasar al siguiente capítulo';
  end if;
  if c.status <> 'active' then
    raise exception 'La campaña no está en curso';
  end if;
  if c.chapter >= c.num_missions then
    raise exception 'Ya se han jugado todas las misiones: cierra la campaña';
  end if;
  if not exists (select 1 from public.games where campaign_id = p_campaign and position = c.chapter and status = 'finished') then
    raise exception 'Termina antes la partida de la misión %', c.chapter;
  end if;
  return public.campaign_make_chapter(p_campaign, c.chapter + 1);
end;
$$;

create or replace function public.campaign_finish(p_campaign uuid, p_winners uuid[] default '{}')
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  c public.campaigns;
begin
  select * into c from public.campaigns where id = p_campaign for update;
  if not found or c.owner_id is distinct from auth.uid() then
    raise exception 'Solo el creador puede cerrar la campaña';
  end if;
  if c.status <> 'active' then
    raise exception 'La campaña no está en curso';
  end if;
  if c.chapter < c.num_missions
     or not exists (select 1 from public.games where campaign_id = p_campaign and position = c.chapter and status = 'finished') then
    raise exception 'Faltan misiones por jugar';
  end if;
  if exists (
    select 1 from unnest(coalesce(p_winners, '{}')) w
    where not exists (select 1 from public.campaign_players where campaign_id = p_campaign and user_id = w)
  ) then
    raise exception 'Algún ganador no participa en la campaña';
  end if;

  update public.campaigns
  set status = 'finished',
      winner_id = case when coalesce(array_length(p_winners, 1), 0) = 1 then p_winners[1] else null end,
      settings = settings || jsonb_build_object('winners', to_jsonb(coalesce(p_winners, '{}')))
  where id = p_campaign;
end;
$$;

-- ---------------------------------------------------------------------------
-- Fondo de la banda: cada movimiento queda anotado con su motivo
-- ---------------------------------------------------------------------------
create or replace function public.campaign_adjust_gold(p_campaign uuid, p_user uuid, p_delta integer, p_reason text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  c   public.campaigns;
  bal integer;
begin
  select * into c from public.campaigns where id = p_campaign;
  if not found or not public.is_campaign_member(p_campaign) then
    raise exception 'No participas en esta campaña';
  end if;
  if c.status <> 'active' then
    raise exception 'La campaña no está en curso';
  end if;
  if auth.uid() <> c.owner_id and auth.uid() <> p_user then
    raise exception 'Solo puedes cambiar el fondo de tu banda (o el creador el de cualquiera)';
  end if;
  if p_delta is null or p_delta = 0 or abs(p_delta) > 100000 then
    raise exception 'Cantidad no válida';
  end if;
  if p_reason is null or btrim(p_reason) = '' then
    raise exception 'Indica el motivo';
  end if;

  update public.campaign_players
  set gold = gold + p_delta
  where campaign_id = p_campaign and user_id = p_user
  returning gold into bal;
  if bal is null then
    raise exception 'Ese jugador no participa en la campaña';
  end if;   -- el check (gold >= 0) impide dejarlo en negativo

  insert into public.campaign_ledger (campaign_id, user_id, actor_id, chapter, delta, balance, reason)
  values (p_campaign, p_user, auth.uid(), c.chapter, p_delta, bal, left(btrim(p_reason), 120));
  return bal;
exception when check_violation then
  raise exception 'No hay fondos suficientes';
end;
$$;

-- ---------------------------------------------------------------------------
-- Tiradas compartidas
--  merchant  : 1D6 antes de la partida (humor del comerciante)
--  injury    : 1D6 por miniatura noqueada, después de la partida
--  adventure : 2D6 (decena y unidad) + 1D6 de resolución, después de la partida (no tras la última misión)
-- ---------------------------------------------------------------------------
create or replace function public.campaign_roll(p_campaign uuid, p_kind text, p_unit integer default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  c    public.campaigns;
  g    public.games;
  me   uuid := auth.uid();
  d1   integer;
  d2   integer;
  d3   integer;
  res  jsonb;
  dice integer[];
  inj  text;
  gp   public.game_players;
begin
  select * into c from public.campaigns where id = p_campaign;
  if not found or me is null or not exists (select 1 from public.campaign_players where campaign_id = p_campaign and user_id = me) then
    raise exception 'No participas en esta campaña';
  end if;
  if c.status <> 'active' then
    raise exception 'La campaña no está en curso';
  end if;
  select * into g from public.games where campaign_id = p_campaign and position = c.chapter;

  if p_kind = 'merchant' then
    if g.status <> 'draft' then
      raise exception 'El comerciante solo pasa antes de la partida';
    end if;
    d1 := 1 + floor(random() * 6)::int;
    dice := array[d1];
    res := jsonb_build_object('humor', case d1 when 1 then 'dificiles' when 2 then 'fina' when 3 then 'normal'
                                              when 4 then 'normal' when 5 then 'preferido' else 'gran_humor' end);

  elsif p_kind = 'injury' then
    if g.status <> 'finished' then
      raise exception 'Las lesiones se tiran cuando termina la partida';
    end if;
    select * into gp from public.game_players where game_id = g.id and user_id = me;
    if p_unit is null or p_unit < 0 or not coalesce((gp.roster -> p_unit::text ->> 'ko')::boolean, false) then
      raise exception 'Esa miniatura no quedó noqueada';
    end if;
    d1 := 1 + floor(random() * 6)::int;
    dice := array[d1];
    inj := case d1 when 1 then 'herido' when 2 then 'cojera' when 3 then 'golpe_cabeza'
                   when 4 then 'ojo_morado' when 5 then 'brazo_cabestrillo' else 'afortunado' end;
    res := jsonb_build_object('lesion', inj);
    if inj <> 'afortunado' then
      update public.campaign_players
      set injuries = jsonb_set(injuries, array[p_unit::text],
                               coalesce(injuries -> p_unit::text, '[]'::jsonb) || to_jsonb(inj))
      where campaign_id = p_campaign and user_id = me;
    end if;

  elsif p_kind = 'adventure' then
    if g.status <> 'finished' then
      raise exception 'Las aventuras se tiran cuando termina la partida';
    end if;
    if c.chapter >= c.num_missions then
      raise exception 'Era la última misión: no hay aventura intermedia';
    end if;
    d1 := 1 + floor(random() * 6)::int;
    d2 := 1 + floor(random() * 6)::int;
    d3 := 1 + floor(random() * 6)::int;
    dice := array[d1, d2, d3];
    res := jsonb_build_object('evento', d1 || '/' || d2, 'resolucion', (d3 + 1) / 2);

  else
    raise exception 'Tirada no válida';
  end if;

  begin
    insert into public.campaign_rolls (campaign_id, user_id, chapter, kind, unit_index, dice, result)
    values (p_campaign, me, c.chapter, p_kind, case when p_kind = 'injury' then p_unit end, dice, res);
  exception when unique_violation then
    raise exception 'Ya has hecho esta tirada en este capítulo';
  end;

  return jsonb_build_object('dice', to_jsonb(dice), 'result', res);
end;
$$;

-- ---------------------------------------------------------------------------
-- Permisos de ejecución y tiempo real
-- ---------------------------------------------------------------------------
revoke execute on function public.campaign_make_chapter(uuid, integer) from public, anon, authenticated;
revoke execute on function public.campaign_start(uuid)                 from public, anon;
revoke execute on function public.campaign_next_chapter(uuid)          from public, anon;
revoke execute on function public.campaign_finish(uuid, uuid[])        from public, anon;
revoke execute on function public.campaign_adjust_gold(uuid, uuid, integer, text) from public, anon;
revoke execute on function public.campaign_roll(uuid, text, integer)   from public, anon;
revoke execute on function public.join_campaign(text)                  from public, anon;
grant execute on function public.campaign_start(uuid)                 to authenticated;
grant execute on function public.campaign_next_chapter(uuid)          to authenticated;
grant execute on function public.campaign_finish(uuid, uuid[])        to authenticated;
grant execute on function public.campaign_adjust_gold(uuid, uuid, integer, text) to authenticated;
grant execute on function public.campaign_roll(uuid, text, integer)   to authenticated;
grant execute on function public.join_campaign(text)                  to authenticated;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    begin alter publication supabase_realtime add table public.campaigns;        exception when duplicate_object then null; end;
    begin alter publication supabase_realtime add table public.campaign_players; exception when duplicate_object then null; end;
    begin alter publication supabase_realtime add table public.campaign_rolls;   exception when duplicate_object then null; end;
    begin alter publication supabase_realtime add table public.campaign_ledger;  exception when duplicate_object then null; end;
  end if;
end $$;
