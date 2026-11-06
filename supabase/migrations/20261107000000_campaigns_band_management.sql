-- Campañas: gestión de la banda con el fondo, escenario, PV propios y evento de final de ronda por jugador.
--  * Al elegir banda, su valor se descuenta del presupuesto inicial.
--  * campaign_update_band(): compras/ventas de equipo y miniaturas entre partidas (con el comerciante),
--    ajustando el fondo y la ficha de la partida en preparación.
--  * campaign_set_vp(): cada jugador anota sus propios PV.
--  * campaign_roll('round_event'): cada jugador roba su evento de final de ronda (carta al azar).

-- ---------------------------------------------------------------------------
-- 1. El valor de la banda se descuenta del presupuesto
-- ---------------------------------------------------------------------------
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
    if c.status = 'draft' then new.gold = c.starting_gold; end if;
    return new;
  end if;

  select * into b from public.bands where id = new.band_id;
  if not found or b.owner_id <> new.user_id then
    raise exception 'La banda no existe o no es tuya';
  end if;
  if b.value > c.max_value then
    raise exception 'La banda (% GP) supera el valor máximo de la campaña (% GP)', b.value, c.max_value;
  end if;
  if c.status = 'draft' then
    if b.value > c.starting_gold then
      raise exception 'El presupuesto (% GP) no alcanza para esta banda (% GP)', c.starting_gold, b.value;
    end if;
    new.gold = c.starting_gold - b.value;
  end if;

  new.band_snapshot = to_jsonb(b) - 'owner_id';
  return new;
end;
$$;

-- Si el creador cambia el presupuesto antes de empezar, se recalcula el fondo de cada banda
create or replace function public.campaign_recalc_gold()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'draft' and new.starting_gold is distinct from old.starting_gold then
    if exists (select 1 from public.campaign_players
               where campaign_id = new.id and coalesce((band_snapshot ->> 'value')::int, 0) > new.starting_gold) then
      raise exception 'Hay bandas que cuestan más que el nuevo presupuesto';
    end if;
    update public.campaign_players
    set gold = new.starting_gold - coalesce((band_snapshot ->> 'value')::int, 0)
    where campaign_id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists campaigns_recalc_gold on public.campaigns;
create trigger campaigns_recalc_gold
  after update of starting_gold on public.campaigns
  for each row execute function public.campaign_recalc_gold();

-- Recalcula lo que ya hubiera elegido alguien
update public.campaign_players cp
set gold = c.starting_gold - coalesce((cp.band_snapshot ->> 'value')::int, 0)
from public.campaigns c
where c.id = cp.campaign_id and c.status = 'draft'
  and c.starting_gold - coalesce((cp.band_snapshot ->> 'value')::int, 0) >= 0;

-- Al empezar, el libro de caja anota el presupuesto y el coste de la banda
create or replace function public.campaign_start(p_campaign uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  c public.campaigns;
  n integer;
  cp record;
  v integer;
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

  for cp in select * from public.campaign_players where campaign_id = p_campaign loop
    v := coalesce((cp.band_snapshot ->> 'value')::int, 0);
    if c.starting_gold > 0 then
      insert into public.campaign_ledger (campaign_id, user_id, actor_id, chapter, delta, balance, reason)
      values (p_campaign, cp.user_id, auth.uid(), 0, c.starting_gold, c.starting_gold, 'Presupuesto inicial');
    end if;
    if v > 0 then
      insert into public.campaign_ledger (campaign_id, user_id, actor_id, chapter, delta, balance, reason)
      values (p_campaign, cp.user_id, auth.uid(), 0, -v, cp.gold, left('Banda inicial: ' || coalesce(cp.band_snapshot ->> 'name', ''), 120));
    end if;
  end loop;

  return public.campaign_make_chapter(p_campaign, 1);
end;
$$;

-- ---------------------------------------------------------------------------
-- 2. La ficha de una partida de campaña usa la banda de la campaña (con sus cambios)
-- ---------------------------------------------------------------------------
create or replace function public.check_game_player_band()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  b public.bands;
  g public.games;
  snap jsonb;
begin
  select * into g from public.games where id = new.game_id;

  if tg_op = 'UPDATE' then
    if g.status <> 'draft' and new.band_id is distinct from old.band_id then
      raise exception 'La partida ya ha empezado: no se puede cambiar de banda';
    end if;
  end if;

  if new.band_id is null then
    if tg_op = 'UPDATE' then
      -- Si el bando era el automático (la facción de la banda anterior), se vacía.
      if new.side is not distinct from old.side
         and old.side is not distinct from (old.band_snapshot ->> 'faction') then
        new.side := null;
      end if;
      new.ready := false;
    end if;
    new.band_snapshot := null;
    return new;
  end if;

  -- Partida de campaña: la banda es la de la campaña (con sus compras y ventas), no la del perfil
  if g.campaign_id is not null then
    select band_snapshot into snap from public.campaign_players
    where campaign_id = g.campaign_id and user_id = new.user_id;
    if snap is null then
      raise exception 'Este jugador no tiene banda en la campaña';
    end if;
    if tg_op = 'UPDATE' then
      if new.side is not distinct from old.side
         and (old.side is null or old.side is not distinct from (old.band_snapshot ->> 'faction')) then
        new.side := nullif(snap ->> 'faction', '');
      end if;
      if new.band_id is distinct from old.band_id then
        new.ready := false;
      end if;
    else
      new.side := coalesce(new.side, nullif(snap ->> 'faction', ''));
    end if;
    new.band_snapshot := snap;
    return new;
  end if;

  select * into b from public.bands where id = new.band_id;
  if not found or b.owner_id <> new.user_id then
    raise exception 'La banda no existe o no es tuya';
  end if;

  if b.value > g.max_value then
    raise exception 'La banda (% GP) supera el valor máximo de la partida (% GP)', b.value, g.max_value;
  end if;

  if tg_op = 'UPDATE' then
    -- Bando automático: solo si nadie lo ha cambiado a mano (vacío o igual a la facción anterior).
    if new.side is not distinct from old.side
       and (old.side is null or old.side is not distinct from (old.band_snapshot ->> 'faction')) then
      new.side := nullif(b.faction, '');
    end if;
    if new.band_id is distinct from old.band_id then
      new.ready := false;
    end if;
  else
    new.side := coalesce(new.side, nullif(b.faction, ''));
  end if;

  new.band_snapshot := to_jsonb(b) - 'owner_id';
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Tiradas: evento de final de ronda por jugador
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
  uidx integer;
  suits text[] := array['♠','♥','♦','♣'];
  ranks text[] := array['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  card text;
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

  elsif p_kind = 'round_event' then
    if g.status <> 'active' or coalesce(g.round, 0) < 1 then
      raise exception 'El evento de final de ronda se roba durante la partida, una vez empezada';
    end if;
    -- Mazo de 54 cartas: 52 + 2 jokers
    d1 := 1 + floor(random() * 54)::int;
    if d1 > 52 then
      card := '🃏';
    else
      card := ranks[1 + ((d1 - 1) % 13)] || suits[1 + ((d1 - 1) / 13)];
    end if;
    dice := array[d1];
    uidx := g.round;
    res := jsonb_build_object('card', card, 'round', g.round);

  else
    raise exception 'Tirada no válida';
  end if;

  begin
    insert into public.campaign_rolls (campaign_id, user_id, chapter, kind, unit_index, dice, result)
    values (p_campaign, me, c.chapter, p_kind, case when p_kind = 'injury' then p_unit when p_kind = 'round_event' then uidx end, dice, res);
  exception when unique_violation then
    raise exception 'Ya has hecho esta tirada en este capítulo';
  end;

  return jsonb_build_object('dice', to_jsonb(dice), 'result', res);
end;
$$;

alter table public.campaign_rolls drop constraint if exists campaign_rolls_kind_check;
alter table public.campaign_rolls add constraint campaign_rolls_kind_check
  check (kind in ('merchant', 'injury', 'adventure', 'round_event'));

-- ---------------------------------------------------------------------------
-- 3. Cambios de banda entre partidas (compras y ventas)
-- ---------------------------------------------------------------------------
-- La ficha solo se toca en partida en curso, salvo que lo haga una función de campaña
create or replace function public.guard_game_player_roster()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  st text;
begin
  if new.roster is distinct from old.roster and coalesce(current_setting('aw.internal', true), '') <> '1' then
    select status into st from public.games where id = new.game_id;
    if st <> 'active' then
      raise exception 'La ficha solo se puede modificar mientras la partida está en curso';
    end if;
    if jsonb_typeof(new.roster) <> 'object' or octet_length(new.roster::text) > 30000 then
      raise exception 'Ficha de banda no válida';
    end if;
  end if;
  return new;
end;
$$;

-- p_units : miniaturas nuevas (con equipo)
-- p_remap : por cada miniatura nueva, su posición en la banda anterior (0..n-1) o -1 si es nueva
-- p_delta : variación del fondo (negativa = gasto), calculada con los precios del comerciante
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

  update public.campaign_players
  set gold = gold + p_delta,
      band_snapshot = jsonb_set(jsonb_set(band_snapshot, '{units}', p_units), '{value}', to_jsonb(tot))
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

-- ---------------------------------------------------------------------------
-- 4. Cada jugador anota sus propios PV durante la partida
-- ---------------------------------------------------------------------------
create or replace function public.campaign_set_vp(p_game uuid, p_vp integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  g public.games;
begin
  select * into g from public.games where id = p_game;
  if not found or g.campaign_id is null then
    raise exception 'Solo para partidas de campaña';
  end if;
  if g.status <> 'active' then
    raise exception 'Los PV se anotan mientras la partida está en curso';
  end if;
  if p_vp is null or p_vp < 0 or p_vp > 999 then
    raise exception 'PV no válidos';
  end if;
  update public.game_players set vp = p_vp where game_id = p_game and user_id = auth.uid();
  if not found then
    raise exception 'No juegas esta partida';
  end if;
end;
$$;

revoke execute on function public.campaign_update_band(uuid, jsonb, integer[], integer, text) from public, anon;
revoke execute on function public.campaign_set_vp(uuid, integer) from public, anon;
revoke execute on function public.campaign_start(uuid) from public, anon;
revoke execute on function public.campaign_roll(uuid, text, integer) from public, anon;
grant execute on function public.campaign_update_band(uuid, jsonb, integer[], integer, text) to authenticated;
grant execute on function public.campaign_set_vp(uuid, integer) to authenticated;
grant execute on function public.campaign_start(uuid) to authenticated;
grant execute on function public.campaign_roll(uuid, text, integer) to authenticated;
