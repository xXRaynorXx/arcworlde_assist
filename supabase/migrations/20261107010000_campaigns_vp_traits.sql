-- Campañas: gastar PV en habilidades de campaña (Traits) y gestionar secuelas (lesiones) antes de la partida.
--  * campaign_vp_log: registro de compras (nadie lo escribe desde el cliente).
--  * Saldo de PV = PV de las misiones terminadas - lo gastado.
--  * campaign_buy_trait(): sube un nivel de un rasgo de una miniatura (N1, N2...).
--  * campaign_set_injury(): añade o quita una lesión a una miniatura.

create table if not exists public.campaign_vp_log (
  id          bigint generated always as identity primary key,
  campaign_id uuid not null references public.campaigns (id) on delete cascade,
  user_id     uuid not null references public.profiles (id) on delete cascade,
  chapter     integer not null,
  unit_index  integer not null,
  trait       text not null check (char_length(trait) between 1 and 60),
  level       integer not null check (level between 1 and 10),
  cost        integer not null check (cost between 1 and 200),
  created_at  timestamptz not null default now()
);
create index if not exists campaign_vp_log_idx on public.campaign_vp_log (campaign_id, user_id);
alter table public.campaign_vp_log enable row level security;
drop policy if exists campaign_vp_log_select on public.campaign_vp_log;
create policy campaign_vp_log_select on public.campaign_vp_log
  for select to authenticated using (public.is_campaign_member(campaign_id));
revoke all on public.campaign_vp_log from anon, authenticated;
grant select on public.campaign_vp_log to authenticated;

create or replace function public.campaign_vp_balance(p_campaign uuid, p_user uuid)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select sum(gp.vp) from public.game_players gp join public.games g on g.id = gp.game_id
                   where g.campaign_id = p_campaign and g.status = 'finished' and gp.user_id = p_user), 0)::int
       - coalesce((select sum(cost) from public.campaign_vp_log where campaign_id = p_campaign and user_id = p_user), 0)::int;
$$;
revoke execute on function public.campaign_vp_balance(uuid, uuid) from public, anon, authenticated;

create or replace function public.campaign_buy_trait(p_campaign uuid, p_unit integer, p_trait text, p_level integer, p_cost integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  c   public.campaigns;
  g   public.games;
  cp  public.campaign_players;
  me  uuid := auth.uid();
  cur integer;
  bal integer;
  snap jsonb;
begin
  select * into c from public.campaigns where id = p_campaign;
  select * into cp from public.campaign_players where campaign_id = p_campaign and user_id = me;
  if not found or c.status <> 'active' then
    raise exception 'No puedes gastar PV ahora';
  end if;
  select * into g from public.games where campaign_id = p_campaign and position = c.chapter;
  if g.status = 'active' then
    raise exception 'Los PV se gastan antes o después de la batalla, no durante';
  end if;
  if p_unit is null or p_unit < 0 or p_unit >= jsonb_array_length(coalesce(cp.band_snapshot -> 'units', '[]'::jsonb)) then
    raise exception 'Esa miniatura no existe';
  end if;
  if p_trait is null or p_trait !~ '^[a-z0-9_]{1,60}$' or p_cost is null or p_cost < 1 or p_cost > 200 or p_level is null or p_level < 1 then
    raise exception 'Rasgo no válido';
  end if;
  cur := coalesce((cp.band_snapshot -> 'units' -> p_unit -> 'rasgos_campana' ->> p_trait)::int, 0);
  if p_level <> cur + 1 then
    raise exception 'Debes comprar los niveles en orden (ahora toca el nivel %)', cur + 1;
  end if;
  bal := public.campaign_vp_balance(p_campaign, me);
  if bal < p_cost then
    raise exception 'No tienes PV suficientes (% disponibles)', bal;
  end if;

  update public.campaign_players
  set band_snapshot = jsonb_set(band_snapshot, array['units', p_unit::text, 'rasgos_campana'],
        coalesce(band_snapshot -> 'units' -> p_unit -> 'rasgos_campana', '{}'::jsonb) || jsonb_build_object(p_trait, p_level), true)
  where campaign_id = p_campaign and user_id = me
  returning band_snapshot into snap;

  insert into public.campaign_vp_log (campaign_id, user_id, chapter, unit_index, trait, level, cost)
  values (p_campaign, me, c.chapter, p_unit, p_trait, p_level, p_cost);

  if g.status = 'draft' then
    update public.game_players set band_snapshot = snap where game_id = g.id and user_id = me;
  end if;
  return bal - p_cost;
end;
$$;

create or replace function public.campaign_set_injury(p_campaign uuid, p_unit integer, p_injury text, p_add boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  c   public.campaigns;
  g   public.games;
  me  uuid := auth.uid();
  cp  public.campaign_players;
  les jsonb;
  ent jsonb;
begin
  select * into c from public.campaigns where id = p_campaign;
  select * into cp from public.campaign_players where campaign_id = p_campaign and user_id = me;
  if not found or c.status <> 'active' then
    raise exception 'No puedes cambiar las lesiones ahora';
  end if;
  if p_injury not in ('herido', 'cojera', 'golpe_cabeza', 'ojo_morado', 'brazo_cabestrillo') then
    raise exception 'Lesión no válida';
  end if;
  if p_unit is null or p_unit < 0 or p_unit >= jsonb_array_length(coalesce(cp.band_snapshot -> 'units', '[]'::jsonb)) then
    raise exception 'Esa miniatura no existe';
  end if;
  select * into g from public.games where campaign_id = p_campaign and position = c.chapter;

  if g.status = 'draft' then
    -- La ficha de la próxima partida ya existe: se cambia ahí
    select coalesce(roster -> p_unit::text, '{}'::jsonb) into ent from public.game_players where game_id = g.id and user_id = me;
    les := coalesce(ent -> 'lesiones', '[]'::jsonb) - p_injury;
    if p_add then les := les || to_jsonb(p_injury); end if;
    ent := jsonb_set(ent, '{lesiones}', les, true);
    if p_add and p_injury = 'herido' then ent := jsonb_set(ent, '{ko}', 'true'::jsonb, true); end if;
    if not p_add and p_injury = 'herido' then ent := ent - 'ko'; end if;
    perform set_config('aw.internal', '1', true);
    update public.game_players set roster = jsonb_set(roster, array[p_unit::text], ent, true) where game_id = g.id and user_id = me;
    perform set_config('aw.internal', '', true);
  elsif g.status = 'finished' then
    -- Se aplicará a la ficha de la siguiente misión
    les := coalesce(cp.injuries -> p_unit::text, '[]'::jsonb) - p_injury;
    if p_add then les := les || to_jsonb(p_injury); end if;
    update public.campaign_players
    set injuries = case when jsonb_array_length(les) = 0 then injuries - p_unit::text else jsonb_set(injuries, array[p_unit::text], les, true) end
    where campaign_id = p_campaign and user_id = me;
  else
    raise exception 'Las lesiones se gestionan antes o después de la batalla, no durante';
  end if;
end;
$$;

create or replace function public.campaign_update_band(p_campaign uuid, p_units jsonb, p_remap integer[], p_delta integer, p_reason text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  c    public.campaigns;
  g    public.games;
  cp   public.campaign_players;
  me   uuid := auth.uid();
  u    jsonb;
  e    jsonb;
  tot  integer := 0;
  i    integer;
  n    integer;
  old_roster jsonb;
  new_roster jsonb := '{}'::jsonb;
  bal  integer;
  old_units jsonb;
  v_units jsonb := '[]'::jsonb;
begin
  select * into c from public.campaigns where id = p_campaign;
  select * into cp from public.campaign_players where campaign_id = p_campaign and user_id = me;
  if not found or c.status <> 'active' then
    raise exception 'No puedes cambiar la banda ahora';
  end if;
  select * into g from public.games where campaign_id = p_campaign and position = c.chapter;
  if g.status <> 'draft' then
    raise exception 'La banda solo se gestiona antes de empezar la partida';
  end if;
  if not exists (select 1 from public.campaign_rolls where campaign_id = p_campaign and user_id = me and chapter = c.chapter and kind = 'merchant') then
    raise exception 'Tira antes al comerciante ambulante';
  end if;
  if jsonb_typeof(p_units) <> 'array' or octet_length(p_units::text) > 60000 or jsonb_array_length(p_units) > 40 then
    raise exception 'Banda no válida';
  end if;
  n := jsonb_array_length(p_units);
  if p_remap is null or coalesce(array_length(p_remap, 1), 0) <> n then
    raise exception 'Banda no válida';
  end if;
  if p_delta is null or abs(p_delta) > 100000 then
    raise exception 'Cantidad no válida';
  end if;

  -- valor nominal de la nueva banda
  for u in select * from jsonb_array_elements(p_units) loop
    if coalesce(btrim(u ->> 'nombre'), '') = '' or coalesce((u ->> 'coste')::int, -1) < 0 then
      raise exception 'Todas las miniaturas necesitan nombre y coste';
    end if;
    tot := tot + (u ->> 'coste')::int;
    for e in select * from jsonb_array_elements(coalesce(u -> 'equipo', '[]'::jsonb)) loop
      if coalesce((e ->> 'coste')::int, -1) < 0 then raise exception 'Coste de equipo no válido'; end if;
      tot := tot + (e ->> 'coste')::int;
    end loop;
  end loop;

  -- Los rasgos de campaña comprados con PV no se tocan desde aquí: se conservan según la miniatura de origen
  old_units := coalesce(cp.band_snapshot -> 'units', '[]'::jsonb);
  for i in 1 .. n loop
    u := (p_units -> (i - 1)) - 'rasgos_campana';
    if p_remap[i] >= 0 and (old_units -> p_remap[i]) ? 'rasgos_campana' then
      u := u || jsonb_build_object('rasgos_campana', old_units -> p_remap[i] -> 'rasgos_campana');
    end if;
    v_units := v_units || jsonb_build_array(u);
  end loop;

  update public.campaign_players
  set gold = gold + p_delta,
      band_snapshot = jsonb_set(jsonb_set(band_snapshot, '{units}', v_units), '{value}', to_jsonb(tot))
  where campaign_id = p_campaign and user_id = me
  returning gold into bal;

  -- La ficha de la partida en preparación: misma banda y lesiones recolocadas según la nueva posición
  select roster into old_roster from public.game_players where game_id = g.id and user_id = me;
  for i in 1 .. n loop
    if p_remap[i] >= 0 and old_roster ? (p_remap[i]::text) then
      new_roster := new_roster || jsonb_build_object((i - 1)::text, old_roster -> (p_remap[i]::text));
    end if;
  end loop;
  perform set_config('aw.internal', '1', true);
  update public.game_players
  set band_snapshot = (select band_snapshot from public.campaign_players where campaign_id = p_campaign and user_id = me),
      roster = new_roster,
      ready = false
  where game_id = g.id and user_id = me;
  perform set_config('aw.internal', '', true);

  if p_delta <> 0 then
    insert into public.campaign_ledger (campaign_id, user_id, actor_id, chapter, delta, balance, reason)
    values (p_campaign, me, me, c.chapter, p_delta, bal, left(coalesce(nullif(btrim(p_reason), ''), 'Cambios en la banda'), 120));
  end if;
  return bal;
exception when check_violation then
  raise exception 'No hay fondos suficientes';
end;
$$;

revoke execute on function public.campaign_buy_trait(uuid, integer, text, integer, integer) from public, anon;
revoke execute on function public.campaign_set_injury(uuid, integer, text, boolean) from public, anon;
revoke execute on function public.campaign_update_band(uuid, jsonb, integer[], integer, text) from public, anon;
grant execute on function public.campaign_buy_trait(uuid, integer, text, integer, integer) to authenticated;
grant execute on function public.campaign_set_injury(uuid, integer, text, boolean) to authenticated;
grant execute on function public.campaign_update_band(uuid, jsonb, integer[], integer, text) to authenticated;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    begin alter publication supabase_realtime add table public.campaign_vp_log; exception when duplicate_object then null; end;
  end if;
end $$;
