-- Crédito temporal: la miniatura con la lesión «Herido» no juega la siguiente partida y su valor queda
-- libre para fichar sustitutos (y equipo) que desaparecen al acabar esa partida.
--  · campaign_players.temp_spent: GP del crédito ya gastados en sustitutos temporales.
--  · Las miniaturas temporales llevan "temporal": true en band_snapshot.units y no cuentan para el valor de la banda.
--  · campaign_ledger guarda cuánto se gastó y se ingresó en cada gestión de banda (lo ven todos los jugadores).

alter table public.campaign_players add column if not exists temp_spent integer not null default 0;
alter table public.campaign_ledger  add column if not exists spent integer not null default 0;
alter table public.campaign_ledger  add column if not exists refunded integer not null default 0;

-- Valor (miniatura + equipo) de las miniaturas fijas con la lesión «Herido» en la ficha de la partida
create or replace function public.campaign_temp_credit(p_roster jsonb, p_units jsonb)
returns integer
language plpgsql
immutable
set search_path = public
as $$
declare
  k   text;
  u   jsonb;
  e   jsonb;
  tot integer := 0;
begin
  for k in select jsonb_object_keys(coalesce(p_roster, '{}'::jsonb)) loop
    if coalesce(p_roster -> k -> 'lesiones', '[]'::jsonb) ? 'herido' then
      u := p_units -> (k::int);
      if u is not null and not coalesce((u ->> 'temporal')::boolean, false) then
        tot := tot + coalesce((u ->> 'coste')::int, 0);
        for e in select * from jsonb_array_elements(coalesce(u -> 'equipo', '[]'::jsonb)) loop
          tot := tot + coalesce((e ->> 'coste')::int, 0);
        end loop;
      end if;
    end if;
  end loop;
  return tot;
end;
$$;

-- Se pasa a nueva firma (con gastado/ingresado/temporal): se borra la anterior
drop function if exists public.campaign_update_band(uuid, jsonb, integer[], integer, text);

create or replace function public.campaign_update_band(
  p_campaign uuid, p_units jsonb, p_remap integer[], p_delta integer, p_reason text,
  p_spent integer default 0, p_refund integer default 0, p_temp integer default 0)
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
  tmp_units integer := 0;
  credit integer;
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
  if p_delta is null or abs(p_delta) > 100000
     or coalesce(p_spent, 0) < 0 or coalesce(p_refund, 0) < 0 or coalesce(p_temp, 0) < 0
     or p_spent > 100000 or p_refund > 100000 or p_temp > 100000 then
    raise exception 'Cantidad no válida';
  end if;

  -- valor nominal de la banda fija (las miniaturas temporales no cuentan)
  for u in select * from jsonb_array_elements(p_units) loop
    if coalesce(btrim(u ->> 'nombre'), '') = '' or coalesce((u ->> 'coste')::int, -1) < 0 then
      raise exception 'Todas las miniaturas necesitan nombre y coste';
    end if;
    if coalesce((u ->> 'temporal')::boolean, false) then
      tmp_units := tmp_units + (u ->> 'coste')::int;
    else
      tot := tot + (u ->> 'coste')::int;
    end if;
    for e in select * from jsonb_array_elements(coalesce(u -> 'equipo', '[]'::jsonb)) loop
      if coalesce((e ->> 'coste')::int, -1) < 0 then raise exception 'Coste de equipo no válido'; end if;
      if not coalesce((u ->> 'temporal')::boolean, false) then tot := tot + (e ->> 'coste')::int; end if;
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

  -- La ficha de la partida en preparación: lesiones recolocadas según la nueva posición
  select roster into old_roster from public.game_players where game_id = g.id and user_id = me;
  for i in 1 .. n loop
    if p_remap[i] >= 0 and old_roster ? (p_remap[i]::text) then
      new_roster := new_roster || jsonb_build_object((i - 1)::text, old_roster -> (p_remap[i]::text));
    end if;
  end loop;

  -- Crédito temporal: lo gastado en sustitutos no puede pasar del valor de las miniaturas heridas
  credit := public.campaign_temp_credit(new_roster, v_units);
  if tmp_units = 0 and not exists (select 1 from jsonb_array_elements(v_units) x where coalesce((x ->> 'temporal')::boolean, false)) then
    p_temp := 0;
  else
    if p_temp > credit then
      raise exception 'Los sustitutos temporales (% GP) superan el crédito de las miniaturas heridas (% GP)', p_temp, credit;
    end if;
    if p_temp < tmp_units then
      raise exception 'Cantidad no válida';
    end if;
  end if;

  update public.campaign_players
  set gold = gold + p_delta,
      temp_spent = coalesce(p_temp, 0),
      band_snapshot = jsonb_set(jsonb_set(band_snapshot, '{units}', v_units), '{value}', to_jsonb(tot))
  where campaign_id = p_campaign and user_id = me
  returning gold into bal;

  perform set_config('aw.internal', '1', true);
  update public.game_players
  set band_snapshot = (select band_snapshot from public.campaign_players where campaign_id = p_campaign and user_id = me),
      roster = new_roster,
      ready = false
  where game_id = g.id and user_id = me;
  perform set_config('aw.internal', '', true);

  if p_delta <> 0 or coalesce(p_spent, 0) > 0 or coalesce(p_refund, 0) > 0 then
    insert into public.campaign_ledger (campaign_id, user_id, actor_id, chapter, delta, balance, reason, spent, refunded)
    values (p_campaign, me, me, c.chapter, p_delta, bal, left(coalesce(nullif(btrim(p_reason), ''), 'Cambios en la banda'), 120),
            coalesce(p_spent, 0), coalesce(p_refund, 0));
  end if;
  return bal;
exception when check_violation then
  raise exception 'No hay fondos suficientes';
end;
$$;

revoke execute on function public.campaign_update_band(uuid, jsonb, integer[], integer, text, integer, integer, integer) from public, anon;
grant  execute on function public.campaign_update_band(uuid, jsonb, integer[], integer, text, integer, integer, integer) to authenticated;
revoke execute on function public.campaign_temp_credit(jsonb, jsonb) from public, anon;
grant  execute on function public.campaign_temp_credit(jsonb, jsonb) to authenticated;

-- Quitar «Herido» libera el crédito: no puede quedar menos que lo ya gastado en sustitutos
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
  ro  jsonb;
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
    select coalesce(roster -> p_unit::text, '{}'::jsonb) into ent from public.game_players where game_id = g.id and user_id = me;
    les := coalesce(ent -> 'lesiones', '[]'::jsonb) - p_injury;
    if p_add then les := les || to_jsonb(p_injury); end if;
    ent := jsonb_set(ent, '{lesiones}', les, true);
    if p_add and p_injury = 'herido' then ent := jsonb_set(ent, '{ko}', 'true'::jsonb, true); end if;
    if not p_add and p_injury = 'herido' then ent := ent - 'ko'; end if;
    perform set_config('aw.internal', '1', true);
    update public.game_players set roster = jsonb_set(roster, array[p_unit::text], ent, true)
    where game_id = g.id and user_id = me
    returning roster into ro;
    perform set_config('aw.internal', '', true);
    if cp.temp_spent > public.campaign_temp_credit(ro, cp.band_snapshot -> 'units') then
      raise exception 'Quita antes los sustitutos temporales: ya has gastado % GP del crédito de las miniaturas heridas', cp.temp_spent;
    end if;
  elsif g.status = 'finished' then
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

-- Al pasar a la siguiente misión se van los sustitutos temporales (y su equipo) y se recolocan las lesiones
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
  units jsonb;
  kept  jsonb;
  inj   jsonb;
  idx   integer;
  newi  integer;
begin
  select * into c from public.campaigns where id = cid;

  insert into public.games (owner_id, campaign_id, name, max_value, position, max_players, status)
  values (c.owner_id, cid, left(c.name, 60) || ' · Misión ' || n, c.max_value, n,
          greatest(1, least(12, (select count(*) from public.campaign_players where campaign_id = cid))), 'draft')
  returning id into gid;

  for cp in select * from public.campaign_players where campaign_id = cid order by joined_at loop
    units := coalesce(cp.band_snapshot -> 'units', '[]'::jsonb);
    inj := coalesce(cp.injuries, '{}'::jsonb);
    if exists (select 1 from jsonb_array_elements(units) x where coalesce((x ->> 'temporal')::boolean, false)) then
      kept := '[]'::jsonb;
      inj := '{}'::jsonb;
      newi := 0;
      for idx in 0 .. jsonb_array_length(units) - 1 loop
        if coalesce((units -> idx ->> 'temporal')::boolean, false) then continue; end if;
        kept := kept || jsonb_build_array(units -> idx);
        if coalesce(cp.injuries, '{}'::jsonb) ? idx::text then
          inj := inj || jsonb_build_object(newi::text, cp.injuries -> idx::text);
        end if;
        newi := newi + 1;
      end loop;
      update public.campaign_players set band_snapshot = jsonb_set(band_snapshot, '{units}', kept) where campaign_id = cid and user_id = cp.user_id;
    end if;

    -- Las lesiones de la partida anterior pasan a la ficha de la nueva (y se consumen)
    roster := '{}'::jsonb;
    for k, l in select key, value from jsonb_each(inj) loop
      roster := roster || jsonb_build_object(k, jsonb_build_object(
        'lesiones', l,
        'ko', (l ? 'herido')
      ));
    end loop;

    insert into public.game_players (game_id, user_id, band_id, roster)
    values (gid, cp.user_id, cp.band_id, roster);
  end loop;

  update public.campaign_players set injuries = '{}'::jsonb, temp_spent = 0 where campaign_id = cid;
  update public.campaigns set chapter = n where id = cid;
  return gid;
end;
$$;
