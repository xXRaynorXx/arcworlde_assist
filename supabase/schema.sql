-- Esquema resultante de aplicar TODAS las migraciones (solo lectura; generado con tests/run_sql.sh --schema).
-- Para una base nueva usa las migraciones por orden; este archivo sirve para ver el estado final de tablas y funciones.
--
-- PostgreSQL database dump
--


-- Dumped from database version 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: arcdeck_draw(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.arcdeck_draw(gid uuid) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
declare
  d    text[];
  card text;
  r    integer;
begin
  select deck into d from public.game_arcdeck where game_id = gid for update;

  -- Mazo nuevo (o agotado): 52 cartas + 2 Jokers, barajado.
  if d is null or coalesce(array_length(d, 1), 0) = 0 then
    select array_agg(c order by random()) into d
    from (
      select rk.v || st.v as c
      from unnest(array['2','3','4','5','6','7','8','9','10','J','Q','K','A']) as rk(v)
      cross join unnest(array['♠','♥','♦','♣']) as st(v)
      union all select '🃏'
      union all select '🃏'
    ) x;
  end if;

  card := d[1];
  d := d[2:array_length(d, 1)];

  insert into public.game_arcdeck (game_id, deck) values (gid, d)
  on conflict (game_id) do update set deck = excluded.deck;

  update public.games
  set round = round + 1,
      arcdeck_card = card,
      arcdeck_history = arcdeck_history || jsonb_build_array(jsonb_build_object('round', round + 1, 'card', card))
  where id = gid
  returning round into r;

  return jsonb_build_object('round', r, 'card', card);
end;
$$;


--
-- Name: band_visible_to_me(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.band_visible_to_me(bid uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  select exists (
    select 1 from public.game_players gp
    where gp.band_id = bid and public.is_game_member(gp.game_id)
  ) or exists (
    select 1 from public.campaign_players cp
    where cp.band_id = bid and public.is_campaign_member(cp.campaign_id)
  );
$$;


--
-- Name: campaign_adjust_gold(uuid, uuid, integer, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_adjust_gold(p_campaign uuid, p_user uuid, p_delta integer, p_reason text) RETURNS integer
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: campaign_buy_trait(uuid, integer, text, integer, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_buy_trait(p_campaign uuid, p_unit integer, p_trait text, p_level integer, p_cost integer) RETURNS integer
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $_$
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
$_$;


--
-- Name: campaign_finish(uuid, uuid[]); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_finish(p_campaign uuid, p_winners uuid[] DEFAULT '{}'::uuid[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: campaign_make_chapter(uuid, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_make_chapter(cid uuid, n integer) RETURNS uuid
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: campaign_next_chapter(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_next_chapter(p_campaign uuid) RETURNS uuid
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: campaign_recalc_gold(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_recalc_gold() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: campaign_roll(uuid, text, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_roll(p_campaign uuid, p_kind text, p_unit integer DEFAULT NULL::integer) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: campaign_set_injury(uuid, integer, text, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_set_injury(p_campaign uuid, p_unit integer, p_injury text, p_add boolean) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: campaign_set_vp(uuid, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_set_vp(p_game uuid, p_vp integer) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: campaign_start(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_start(p_campaign uuid) RETURNS uuid
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: campaign_temp_credit(jsonb, jsonb); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_temp_credit(p_roster jsonb, p_units jsonb) RETURNS integer
    LANGUAGE plpgsql IMMUTABLE
    SET search_path TO 'public'
    AS $$
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


--
-- Name: campaign_transfer_owner(uuid, uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_transfer_owner(p_campaign uuid, p_user uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
declare
  c public.campaigns;
begin
  select * into c from public.campaigns where id = p_campaign for update;
  if not found or c.owner_id is distinct from auth.uid() then
    raise exception 'Solo el creador puede traspasar la campaña';
  end if;
  if c.status = 'finished' then
    raise exception 'La campaña ya ha terminado';
  end if;
  if p_user = c.owner_id then
    raise exception 'Ya eres el creador';
  end if;
  if not exists (select 1 from public.campaign_players where campaign_id = p_campaign and user_id = p_user) then
    raise exception 'Ese jugador no está en la campaña';
  end if;
  update public.campaigns set owner_id = p_user where id = p_campaign;
  update public.games set owner_id = p_user where campaign_id = p_campaign;
end;
$$;


--
-- Name: campaign_undo_chapter(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_undo_chapter(p_campaign uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
declare
  c public.campaigns;
  g public.games;
  gp record;
  inj jsonb;
  lst jsonb;
  k text;
begin
  select * into c from public.campaigns where id = p_campaign for update;
  if not found or c.owner_id is distinct from auth.uid() then
    raise exception 'Solo el creador puede deshacer el paso de misión';
  end if;
  if c.status <> 'active' or c.chapter <= 1 then
    raise exception 'No hay ningún cambio de misión que deshacer';
  end if;
  select * into g from public.games where campaign_id = p_campaign and position = c.chapter;
  if g.status <> 'draft' then
    raise exception 'La partida de esta misión ya ha empezado';
  end if;
  if exists (select 1 from public.campaign_rolls where campaign_id = p_campaign and chapter = c.chapter)
     or exists (select 1 from public.campaign_ledger where campaign_id = p_campaign and chapter = c.chapter)
     or exists (select 1 from public.campaign_vp_log where campaign_id = p_campaign and chapter = c.chapter) then
    raise exception 'En esta misión ya hay tiradas, compras o gastos de PV: no se puede deshacer';
  end if;

  -- Las lesiones que se habían pasado a la ficha vuelven a la reserva de la campaña
  for gp in select * from public.game_players where game_id = g.id loop
    inj := '{}'::jsonb;
    for k in select jsonb_object_keys(coalesce(gp.roster, '{}'::jsonb)) loop
      lst := coalesce(gp.roster -> k -> 'lesiones', '[]'::jsonb);
      if jsonb_array_length(lst) > 0 then inj := inj || jsonb_build_object(k, lst); end if;
    end loop;
    update public.campaign_players set injuries = inj where campaign_id = p_campaign and user_id = gp.user_id;
  end loop;

  perform set_config('aw.internal', '1', true);
  delete from public.games where id = g.id;
  perform set_config('aw.internal', '', true);
  update public.campaigns set chapter = c.chapter - 1 where id = p_campaign;
end;
$$;


--
-- Name: campaign_update_band(uuid, jsonb, integer[], integer, text, integer, integer, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_update_band(p_campaign uuid, p_units jsonb, p_remap integer[], p_delta integer, p_reason text, p_spent integer DEFAULT 0, p_refund integer DEFAULT 0, p_temp integer DEFAULT 0) RETURNS integer
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: campaign_vp_balance(uuid, uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.campaign_vp_balance(p_campaign uuid, p_user uuid) RETURNS integer
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  select coalesce((select sum(gp.vp) from public.game_players gp join public.games g on g.id = gp.game_id
                   where g.campaign_id = p_campaign and g.status = 'finished' and gp.user_id = p_user), 0)::int
       - coalesce((select sum(cost) from public.campaign_vp_log where campaign_id = p_campaign and user_id = p_user), 0)::int;
$$;


--
-- Name: check_campaign_player_band(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.check_campaign_player_band() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: check_game_player_band(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.check_game_player_band() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: finish_game(uuid, uuid[]); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.finish_game(p_game uuid, p_winners uuid[] DEFAULT '{}'::uuid[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
declare
  st text;
begin
  if not public.is_game_owner(p_game) then
    raise exception 'Solo el creador puede cerrar la partida';
  end if;

  select status into st from public.games where id = p_game;
  if st <> 'active' then
    raise exception 'La partida no está en curso';
  end if;
  if exists (
    select 1 from unnest(coalesce(p_winners, '{}')) w
    where not exists (select 1 from public.game_players where game_id = p_game and user_id = w)
  ) then
    raise exception 'Algún ganador no participa en la partida';
  end if;

  update public.games
  set status = 'finished',
      finished_at = now(),
      victory = victory || jsonb_build_object('winners', to_jsonb(coalesce(p_winners, '{}')))
  where id = p_game;
end;
$$;


--
-- Name: guard_campaign_game_delete(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.guard_campaign_game_delete() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
declare
  st text;
begin
  if old.campaign_id is not null and coalesce(current_setting('aw.internal', true), '') <> '1' then
    select status into st from public.campaigns where id = old.campaign_id;
    if st = 'active' then
      raise exception 'Esta partida pertenece a una campaña en curso';
    end if;
  end if;
  return old;
end;
$$;


--
-- Name: guard_campaign_insert(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.guard_campaign_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  new.status := 'draft';
  new.chapter := 0;
  new.winner_id := null;
  return new;
end;
$$;


--
-- Name: guard_campaign_player_delete(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.guard_campaign_player_delete() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: guard_campaign_update(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.guard_campaign_update() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: guard_game_player_delete(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.guard_game_player_delete() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
declare
  g public.games;
begin
  select * into g from public.games where id = old.game_id;
  -- Sin partida (borrado en cascada) o sin sesión (administración): se permite.
  if found and auth.uid() is not null and g.status <> 'draft' and g.owner_id <> auth.uid() then
    raise exception 'No puedes abandonar una partida que ya ha empezado';
  end if;
  return old;
end;
$$;


--
-- Name: guard_game_player_ready(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.guard_game_player_ready() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
declare
  st text;
begin
  if new.ready is distinct from old.ready then
    select status into st from public.games where id = new.game_id;
    if st <> 'draft' then
      raise exception 'La partida ya ha empezado';
    end if;
    if new.ready and new.band_id is null then
      raise exception 'Elige una banda antes de dar tu OK';
    end if;
  end if;
  return new;
end;
$$;


--
-- Name: guard_game_player_roster(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.guard_game_player_roster() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: guard_game_update(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.guard_game_update() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
begin
  if old.status <> 'draft' then
    if new.max_value is distinct from old.max_value
       or new.scenario_id is distinct from old.scenario_id
       or new.scenario_mode is distinct from old.scenario_mode
       or new.max_players is distinct from old.max_players
       or new.arcdeck_env is distinct from old.arcdeck_env then
      raise exception 'La partida ya ha empezado: no se pueden cambiar sus ajustes';
    end if;
  end if;

  if new.max_value < old.max_value and exists (
    select 1 from public.game_players
    where game_id = new.id and (band_snapshot ->> 'value')::integer > new.max_value
  ) then
    raise exception 'Hay bandas que superan el nuevo valor máximo';
  end if;

  if new.max_players < old.max_players
     and (select count(*) from public.game_players where game_id = new.id) > new.max_players then
    raise exception 'Ya hay más jugadores apuntados que el nuevo número';
  end if;

  return new;
end;
$$;


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    left(coalesce(
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(new.raw_user_meta_data ->> 'name', ''),
      split_part(new.email, '@', 1),
      'Jugador'
    ), 40)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;


--
-- Name: is_campaign_member(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_campaign_member(cid uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  select exists (
    select 1 from public.campaigns c
    where c.id = cid
      and (c.owner_id = auth.uid()
           or exists (select 1 from public.campaign_players cp
                      where cp.campaign_id = c.id and cp.user_id = auth.uid()))
  );
$$;


--
-- Name: is_campaign_owner(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_campaign_owner(cid uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  select exists (select 1 from public.campaigns c where c.id = cid and c.owner_id = auth.uid());
$$;


--
-- Name: is_game_in_my_campaign(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_game_in_my_campaign(gid uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  select exists (
    select 1 from public.games g
    where g.id = gid
      and g.campaign_id is not null
      and public.is_campaign_member(g.campaign_id)
  );
$$;


--
-- Name: is_game_member(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_game_member(gid uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  select exists (
    select 1 from public.games g
    where g.id = gid
      and (g.owner_id = auth.uid()
           or exists (select 1 from public.game_players gp
                      where gp.game_id = g.id and gp.user_id = auth.uid())
           or (g.campaign_id is not null and public.is_campaign_member(g.campaign_id)))
  );
$$;


--
-- Name: is_game_owner(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_game_owner(gid uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  select exists (select 1 from public.games g where g.id = gid and g.owner_id = auth.uid());
$$;


--
-- Name: join_campaign(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.join_campaign(p_code text) RETURNS uuid
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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


--
-- Name: join_game(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.join_game(p_code text) RETURNS uuid
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
declare
  g public.games;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesión';
  end if;

  select * into g from public.games
  where join_code = p_code and status = 'draft' and campaign_id is null
  for update;

  if not found then
    raise exception 'Código no válido o la partida ya ha empezado';
  end if;

  if not exists (select 1 from public.game_players where game_id = g.id and user_id = auth.uid())
     and (select count(*) from public.game_players where game_id = g.id) >= g.max_players then
    raise exception 'La partida está completa (% jugadores)', g.max_players;
  end if;

  insert into public.game_players (game_id, user_id)
  values (g.id, auth.uid())
  on conflict do nothing;

  return g.id;
end;
$$;


--
-- Name: next_round(uuid, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.next_round(p_game uuid, p_from_round integer) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
declare
  g public.games;
begin
  select * into g from public.games where id = p_game for update;
  if not found then
    raise exception 'La partida no existe';
  end if;
  if not (g.owner_id = auth.uid()
          or exists (select 1 from public.game_players where game_id = p_game and user_id = auth.uid())) then
    raise exception 'No participas en esta partida';
  end if;
  if g.status <> 'active' then
    raise exception 'La partida no está en curso';
  end if;

  -- Dos pulsaciones a la vez: solo cuenta la primera, la otra recibe el estado actual.
  if g.round <> p_from_round then
    return jsonb_build_object('round', g.round, 'card', g.arcdeck_card, 'unchanged', true);
  end if;

  return public.arcdeck_draw(p_game);
end;
$$;


--
-- Name: reset_game_player_roster(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.reset_game_player_roster() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  if new.band_id is distinct from old.band_id then
    new.roster := '{}'::jsonb;
  end if;
  return new;
end;
$$;


--
-- Name: set_game_player_score(uuid, uuid, integer, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.set_game_player_score(p_game uuid, p_user uuid, p_vp integer, p_side text DEFAULT NULL::text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
begin
  if not public.is_game_owner(p_game) then
    raise exception 'Solo el creador puede puntuar';
  end if;
  if (select status from public.games where id = p_game) = 'finished' then
    raise exception 'La partida ya ha terminado';
  end if;

  -- p_vp null: no toca los puntos. p_side null: no toca el bando; '' lo borra.
  update public.game_players
  set vp = greatest(0, coalesce(p_vp, vp)),
      side = case when p_side is null then side else nullif(btrim(p_side), '') end
  where game_id = p_game and user_id = p_user;
end;
$$;


--
-- Name: set_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


--
-- Name: start_game(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.start_game(p_game uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
declare
  g public.games;
  n integer;
begin
  select * into g from public.games where id = p_game for update;
  if not found or g.owner_id is distinct from auth.uid() then
    raise exception 'Solo el creador puede empezar la partida';
  end if;
  if g.status <> 'draft' then
    raise exception 'La partida ya ha empezado';
  end if;

  select count(*) into n from public.game_players where game_id = p_game;
  if n = 0 then
    raise exception 'Todavía no hay jugadores';
  end if;
  if n < g.max_players then
    raise exception 'Faltan jugadores: hay % de %', n, g.max_players;
  end if;
  if exists (select 1 from public.game_players where game_id = p_game and band_id is null) then
    raise exception 'Todos los jugadores deben elegir una banda';
  end if;
  if g.max_players > 1
     and exists (select 1 from public.game_players where game_id = p_game and not ready) then
    raise exception 'Todos los jugadores deben dar su OK';
  end if;

  update public.games set status = 'active' where id = p_game;
  perform public.arcdeck_draw(p_game);
end;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bands; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bands (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    owner_id uuid DEFAULT auth.uid() NOT NULL,
    name text NOT NULL,
    faction text,
    value integer DEFAULT 0 NOT NULL,
    units jsonb DEFAULT '[]'::jsonb NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT bands_name_check CHECK (((char_length(name) >= 1) AND (char_length(name) <= 60))),
    CONSTRAINT bands_value_check CHECK ((value >= 0))
);


--
-- Name: campaign_ledger; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_ledger (
    id bigint NOT NULL,
    campaign_id uuid NOT NULL,
    user_id uuid NOT NULL,
    actor_id uuid,
    chapter integer DEFAULT 0 NOT NULL,
    delta integer NOT NULL,
    balance integer NOT NULL,
    reason text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    spent integer DEFAULT 0 NOT NULL,
    refunded integer DEFAULT 0 NOT NULL,
    CONSTRAINT campaign_ledger_reason_check CHECK (((char_length(reason) >= 1) AND (char_length(reason) <= 120)))
);


--
-- Name: campaign_ledger_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.campaign_ledger ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.campaign_ledger_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: campaign_players; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_players (
    campaign_id uuid NOT NULL,
    user_id uuid NOT NULL,
    band_id uuid,
    band_snapshot jsonb,
    camp jsonb DEFAULT '{}'::jsonb NOT NULL,
    total_vp integer DEFAULT 0 NOT NULL,
    joined_at timestamp with time zone DEFAULT now() NOT NULL,
    gold integer DEFAULT 0 NOT NULL,
    injuries jsonb DEFAULT '{}'::jsonb NOT NULL,
    temp_spent integer DEFAULT 0 NOT NULL,
    CONSTRAINT campaign_players_gold_check CHECK ((gold >= 0))
);


--
-- Name: campaign_rolls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_rolls (
    id bigint NOT NULL,
    campaign_id uuid NOT NULL,
    user_id uuid NOT NULL,
    chapter integer NOT NULL,
    kind text NOT NULL,
    unit_index integer,
    dice integer[] NOT NULL,
    result jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT campaign_rolls_kind_check CHECK ((kind = ANY (ARRAY['merchant'::text, 'injury'::text, 'adventure'::text, 'round_event'::text])))
);


--
-- Name: campaign_rolls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.campaign_rolls ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.campaign_rolls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: campaign_vp_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_vp_log (
    id bigint NOT NULL,
    campaign_id uuid NOT NULL,
    user_id uuid NOT NULL,
    chapter integer NOT NULL,
    unit_index integer NOT NULL,
    trait text NOT NULL,
    level integer NOT NULL,
    cost integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT campaign_vp_log_cost_check CHECK (((cost >= 1) AND (cost <= 200))),
    CONSTRAINT campaign_vp_log_level_check CHECK (((level >= 1) AND (level <= 10))),
    CONSTRAINT campaign_vp_log_trait_check CHECK (((char_length(trait) >= 1) AND (char_length(trait) <= 60)))
);


--
-- Name: campaign_vp_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.campaign_vp_log ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.campaign_vp_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaigns (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    owner_id uuid DEFAULT auth.uid() NOT NULL,
    name text NOT NULL,
    max_value integer DEFAULT 500 NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    join_code text DEFAULT substr(replace((gen_random_uuid())::text, '-'::text, ''::text), 1, 10) NOT NULL,
    winner_id uuid,
    settings jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    num_missions integer DEFAULT 3 NOT NULL,
    starting_gold integer DEFAULT 0 NOT NULL,
    chapter integer DEFAULT 0 NOT NULL,
    CONSTRAINT campaigns_max_value_check CHECK ((max_value > 0)),
    CONSTRAINT campaigns_name_check CHECK (((char_length(name) >= 1) AND (char_length(name) <= 80))),
    CONSTRAINT campaigns_num_missions_check CHECK (((num_missions >= 1) AND (num_missions <= 12))),
    CONSTRAINT campaigns_starting_gold_check CHECK (((starting_gold >= 0) AND (starting_gold <= 100000))),
    CONSTRAINT campaigns_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'active'::text, 'finished'::text])))
);


--
-- Name: game_arcdeck; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.game_arcdeck (
    game_id uuid NOT NULL,
    deck text[] DEFAULT '{}'::text[] NOT NULL
);


--
-- Name: game_players; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.game_players (
    game_id uuid NOT NULL,
    user_id uuid NOT NULL,
    band_id uuid,
    band_snapshot jsonb,
    side text,
    vp integer DEFAULT 0 NOT NULL,
    result jsonb DEFAULT '{}'::jsonb NOT NULL,
    joined_at timestamp with time zone DEFAULT now() NOT NULL,
    ready boolean DEFAULT false NOT NULL,
    roster jsonb DEFAULT '{}'::jsonb NOT NULL
);


--
-- Name: games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.games (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    owner_id uuid DEFAULT auth.uid() NOT NULL,
    campaign_id uuid,
    name text NOT NULL,
    max_value integer DEFAULT 500 NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    scenario_id text,
    scenario_mode text DEFAULT 'chosen'::text NOT NULL,
    victory jsonb DEFAULT '{}'::jsonb NOT NULL,
    "position" integer,
    join_code text DEFAULT substr(replace((gen_random_uuid())::text, '-'::text, ''::text), 1, 10) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    finished_at timestamp with time zone,
    max_players integer DEFAULT 2 NOT NULL,
    arcdeck_env text DEFAULT 'mildaark'::text NOT NULL,
    round integer DEFAULT 0 NOT NULL,
    arcdeck_card text,
    arcdeck_history jsonb DEFAULT '[]'::jsonb NOT NULL,
    CONSTRAINT games_arcdeck_env_check CHECK ((arcdeck_env = ANY (ARRAY['mildaark'::text, 'vauhaemia'::text]))),
    CONSTRAINT games_max_players_check CHECK (((max_players >= 1) AND (max_players <= 12))),
    CONSTRAINT games_max_value_check CHECK ((max_value > 0)),
    CONSTRAINT games_name_check CHECK (((char_length(name) >= 1) AND (char_length(name) <= 80))),
    CONSTRAINT games_scenario_mode_check CHECK ((scenario_mode = ANY (ARRAY['chosen'::text, 'random'::text]))),
    CONSTRAINT games_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'active'::text, 'finished'::text])))
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    display_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT profiles_display_name_check CHECK (((char_length(display_name) >= 1) AND (char_length(display_name) <= 40)))
);


--
-- Name: bands bands_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bands
    ADD CONSTRAINT bands_pkey PRIMARY KEY (id);


--
-- Name: campaign_ledger campaign_ledger_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_ledger
    ADD CONSTRAINT campaign_ledger_pkey PRIMARY KEY (id);


--
-- Name: campaign_players campaign_players_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_players
    ADD CONSTRAINT campaign_players_pkey PRIMARY KEY (campaign_id, user_id);


--
-- Name: campaign_rolls campaign_rolls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_rolls
    ADD CONSTRAINT campaign_rolls_pkey PRIMARY KEY (id);


--
-- Name: campaign_vp_log campaign_vp_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_vp_log
    ADD CONSTRAINT campaign_vp_log_pkey PRIMARY KEY (id);


--
-- Name: campaigns campaigns_join_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_join_code_key UNIQUE (join_code);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: game_arcdeck game_arcdeck_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game_arcdeck
    ADD CONSTRAINT game_arcdeck_pkey PRIMARY KEY (game_id);


--
-- Name: game_players game_players_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game_players
    ADD CONSTRAINT game_players_pkey PRIMARY KEY (game_id, user_id);


--
-- Name: games games_join_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_join_code_key UNIQUE (join_code);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: bands_owner_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX bands_owner_idx ON public.bands USING btree (owner_id);


--
-- Name: campaign_ledger_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX campaign_ledger_idx ON public.campaign_ledger USING btree (campaign_id, created_at);


--
-- Name: campaign_players_user_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX campaign_players_user_idx ON public.campaign_players USING btree (user_id);


--
-- Name: campaign_rolls_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX campaign_rolls_idx ON public.campaign_rolls USING btree (campaign_id, created_at);


--
-- Name: campaign_rolls_once_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX campaign_rolls_once_idx ON public.campaign_rolls USING btree (campaign_id, user_id, chapter, kind, COALESCE(unit_index, '-1'::integer));


--
-- Name: campaign_vp_log_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX campaign_vp_log_idx ON public.campaign_vp_log USING btree (campaign_id, user_id);


--
-- Name: game_players_user_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX game_players_user_idx ON public.game_players USING btree (user_id);


--
-- Name: games_campaign_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX games_campaign_idx ON public.games USING btree (campaign_id);


--
-- Name: bands bands_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER bands_updated_at BEFORE UPDATE ON public.bands FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: campaign_players campaign_players_check_band; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER campaign_players_check_band BEFORE INSERT OR UPDATE OF band_id ON public.campaign_players FOR EACH ROW EXECUTE FUNCTION public.check_campaign_player_band();


--
-- Name: campaign_players campaign_players_guard_delete; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER campaign_players_guard_delete BEFORE DELETE ON public.campaign_players FOR EACH ROW EXECUTE FUNCTION public.guard_campaign_player_delete();


--
-- Name: campaigns campaigns_guard_insert; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER campaigns_guard_insert BEFORE INSERT ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.guard_campaign_insert();


--
-- Name: campaigns campaigns_guard_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER campaigns_guard_update BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.guard_campaign_update();


--
-- Name: campaigns campaigns_recalc_gold; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER campaigns_recalc_gold AFTER UPDATE OF starting_gold ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.campaign_recalc_gold();


--
-- Name: game_players game_players_check_band; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER game_players_check_band BEFORE INSERT OR UPDATE OF band_id ON public.game_players FOR EACH ROW EXECUTE FUNCTION public.check_game_player_band();


--
-- Name: game_players game_players_guard_delete; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER game_players_guard_delete BEFORE DELETE ON public.game_players FOR EACH ROW EXECUTE FUNCTION public.guard_game_player_delete();


--
-- Name: game_players game_players_guard_ready; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER game_players_guard_ready BEFORE UPDATE OF ready ON public.game_players FOR EACH ROW EXECUTE FUNCTION public.guard_game_player_ready();


--
-- Name: game_players game_players_guard_roster; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER game_players_guard_roster BEFORE UPDATE OF roster ON public.game_players FOR EACH ROW EXECUTE FUNCTION public.guard_game_player_roster();


--
-- Name: game_players game_players_reset_roster; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER game_players_reset_roster BEFORE UPDATE OF band_id ON public.game_players FOR EACH ROW EXECUTE FUNCTION public.reset_game_player_roster();


--
-- Name: games games_guard_campaign_delete; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER games_guard_campaign_delete BEFORE DELETE ON public.games FOR EACH ROW EXECUTE FUNCTION public.guard_campaign_game_delete();


--
-- Name: games games_guard_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER games_guard_update BEFORE UPDATE ON public.games FOR EACH ROW EXECUTE FUNCTION public.guard_game_update();


--
-- Name: bands bands_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bands
    ADD CONSTRAINT bands_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: campaign_ledger campaign_ledger_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_ledger
    ADD CONSTRAINT campaign_ledger_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES public.profiles(id) ON DELETE SET NULL;


--
-- Name: campaign_ledger campaign_ledger_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_ledger
    ADD CONSTRAINT campaign_ledger_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON DELETE CASCADE;


--
-- Name: campaign_ledger campaign_ledger_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_ledger
    ADD CONSTRAINT campaign_ledger_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: campaign_players campaign_players_band_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_players
    ADD CONSTRAINT campaign_players_band_id_fkey FOREIGN KEY (band_id) REFERENCES public.bands(id) ON DELETE SET NULL;


--
-- Name: campaign_players campaign_players_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_players
    ADD CONSTRAINT campaign_players_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON DELETE CASCADE;


--
-- Name: campaign_players campaign_players_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_players
    ADD CONSTRAINT campaign_players_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: campaign_rolls campaign_rolls_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_rolls
    ADD CONSTRAINT campaign_rolls_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON DELETE CASCADE;


--
-- Name: campaign_rolls campaign_rolls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_rolls
    ADD CONSTRAINT campaign_rolls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: campaign_vp_log campaign_vp_log_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_vp_log
    ADD CONSTRAINT campaign_vp_log_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON DELETE CASCADE;


--
-- Name: campaign_vp_log campaign_vp_log_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_vp_log
    ADD CONSTRAINT campaign_vp_log_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: campaigns campaigns_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: campaigns campaigns_winner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_winner_id_fkey FOREIGN KEY (winner_id) REFERENCES public.profiles(id) ON DELETE SET NULL;


--
-- Name: game_arcdeck game_arcdeck_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game_arcdeck
    ADD CONSTRAINT game_arcdeck_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id) ON DELETE CASCADE;


--
-- Name: game_players game_players_band_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game_players
    ADD CONSTRAINT game_players_band_id_fkey FOREIGN KEY (band_id) REFERENCES public.bands(id) ON DELETE SET NULL;


--
-- Name: game_players game_players_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game_players
    ADD CONSTRAINT game_players_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id) ON DELETE CASCADE;


--
-- Name: game_players game_players_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game_players
    ADD CONSTRAINT game_players_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: games games_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON DELETE CASCADE;


--
-- Name: games games_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: bands; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.bands ENABLE ROW LEVEL SECURITY;

--
-- Name: bands bands_delete_own; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY bands_delete_own ON public.bands FOR DELETE TO authenticated USING ((owner_id = auth.uid()));


--
-- Name: bands bands_insert_own; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY bands_insert_own ON public.bands FOR INSERT TO authenticated WITH CHECK ((owner_id = auth.uid()));


--
-- Name: bands bands_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY bands_select ON public.bands FOR SELECT TO authenticated USING (((owner_id = auth.uid()) OR public.band_visible_to_me(id)));


--
-- Name: bands bands_update_own; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY bands_update_own ON public.bands FOR UPDATE TO authenticated USING ((owner_id = auth.uid())) WITH CHECK ((owner_id = auth.uid()));


--
-- Name: campaign_ledger; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.campaign_ledger ENABLE ROW LEVEL SECURITY;

--
-- Name: campaign_ledger campaign_ledger_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY campaign_ledger_select ON public.campaign_ledger FOR SELECT TO authenticated USING (public.is_campaign_member(campaign_id));


--
-- Name: campaign_players; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.campaign_players ENABLE ROW LEVEL SECURITY;

--
-- Name: campaign_players campaign_players_delete; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY campaign_players_delete ON public.campaign_players FOR DELETE TO authenticated USING (((user_id = auth.uid()) OR public.is_campaign_owner(campaign_id)));


--
-- Name: campaign_players campaign_players_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY campaign_players_select ON public.campaign_players FOR SELECT TO authenticated USING (public.is_campaign_member(campaign_id));


--
-- Name: campaign_players campaign_players_update; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY campaign_players_update ON public.campaign_players FOR UPDATE TO authenticated USING ((user_id = auth.uid())) WITH CHECK ((user_id = auth.uid()));


--
-- Name: campaign_rolls; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.campaign_rolls ENABLE ROW LEVEL SECURITY;

--
-- Name: campaign_rolls campaign_rolls_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY campaign_rolls_select ON public.campaign_rolls FOR SELECT TO authenticated USING (public.is_campaign_member(campaign_id));


--
-- Name: campaign_vp_log; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.campaign_vp_log ENABLE ROW LEVEL SECURITY;

--
-- Name: campaign_vp_log campaign_vp_log_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY campaign_vp_log_select ON public.campaign_vp_log FOR SELECT TO authenticated USING (public.is_campaign_member(campaign_id));


--
-- Name: campaigns; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

--
-- Name: campaigns campaigns_delete_owner; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY campaigns_delete_owner ON public.campaigns FOR DELETE TO authenticated USING ((owner_id = auth.uid()));


--
-- Name: campaigns campaigns_insert; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY campaigns_insert ON public.campaigns FOR INSERT TO authenticated WITH CHECK ((owner_id = auth.uid()));


--
-- Name: campaigns campaigns_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY campaigns_select ON public.campaigns FOR SELECT TO authenticated USING (((owner_id = auth.uid()) OR public.is_campaign_member(id)));


--
-- Name: campaigns campaigns_update_owner; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY campaigns_update_owner ON public.campaigns FOR UPDATE TO authenticated USING ((owner_id = auth.uid())) WITH CHECK ((owner_id = auth.uid()));


--
-- Name: game_arcdeck; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.game_arcdeck ENABLE ROW LEVEL SECURITY;

--
-- Name: game_players; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.game_players ENABLE ROW LEVEL SECURITY;

--
-- Name: game_players game_players_delete; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY game_players_delete ON public.game_players FOR DELETE TO authenticated USING (((user_id = auth.uid()) OR public.is_game_owner(game_id)));


--
-- Name: game_players game_players_insert_campaign; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY game_players_insert_campaign ON public.game_players FOR INSERT TO authenticated WITH CHECK (((user_id = auth.uid()) AND public.is_game_in_my_campaign(game_id)));


--
-- Name: game_players game_players_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY game_players_select ON public.game_players FOR SELECT TO authenticated USING (public.is_game_member(game_id));


--
-- Name: game_players game_players_update; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY game_players_update ON public.game_players FOR UPDATE TO authenticated USING ((user_id = auth.uid())) WITH CHECK ((user_id = auth.uid()));


--
-- Name: games; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

--
-- Name: games games_delete_owner; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY games_delete_owner ON public.games FOR DELETE TO authenticated USING ((owner_id = auth.uid()));


--
-- Name: games games_insert; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY games_insert ON public.games FOR INSERT TO authenticated WITH CHECK (((owner_id = auth.uid()) AND ((campaign_id IS NULL) OR public.is_campaign_owner(campaign_id))));


--
-- Name: games games_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY games_select ON public.games FOR SELECT TO authenticated USING (((owner_id = auth.uid()) OR public.is_game_member(id)));


--
-- Name: games games_update_owner; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY games_update_owner ON public.games FOR UPDATE TO authenticated USING ((owner_id = auth.uid())) WITH CHECK ((owner_id = auth.uid()));


--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles profiles_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY profiles_select ON public.profiles FOR SELECT TO authenticated USING (true);


--
-- Name: profiles profiles_update_own; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY profiles_update_own ON public.profiles FOR UPDATE TO authenticated USING ((id = auth.uid())) WITH CHECK ((id = auth.uid()));


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;


--
-- Name: FUNCTION arcdeck_draw(gid uuid); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.arcdeck_draw(gid uuid) FROM PUBLIC;


--
-- Name: FUNCTION campaign_adjust_gold(p_campaign uuid, p_user uuid, p_delta integer, p_reason text); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_adjust_gold(p_campaign uuid, p_user uuid, p_delta integer, p_reason text) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_adjust_gold(p_campaign uuid, p_user uuid, p_delta integer, p_reason text) TO authenticated;


--
-- Name: FUNCTION campaign_buy_trait(p_campaign uuid, p_unit integer, p_trait text, p_level integer, p_cost integer); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_buy_trait(p_campaign uuid, p_unit integer, p_trait text, p_level integer, p_cost integer) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_buy_trait(p_campaign uuid, p_unit integer, p_trait text, p_level integer, p_cost integer) TO authenticated;


--
-- Name: FUNCTION campaign_finish(p_campaign uuid, p_winners uuid[]); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_finish(p_campaign uuid, p_winners uuid[]) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_finish(p_campaign uuid, p_winners uuid[]) TO authenticated;


--
-- Name: FUNCTION campaign_make_chapter(cid uuid, n integer); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_make_chapter(cid uuid, n integer) FROM PUBLIC;


--
-- Name: FUNCTION campaign_next_chapter(p_campaign uuid); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_next_chapter(p_campaign uuid) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_next_chapter(p_campaign uuid) TO authenticated;


--
-- Name: FUNCTION campaign_roll(p_campaign uuid, p_kind text, p_unit integer); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_roll(p_campaign uuid, p_kind text, p_unit integer) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_roll(p_campaign uuid, p_kind text, p_unit integer) TO authenticated;


--
-- Name: FUNCTION campaign_set_injury(p_campaign uuid, p_unit integer, p_injury text, p_add boolean); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_set_injury(p_campaign uuid, p_unit integer, p_injury text, p_add boolean) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_set_injury(p_campaign uuid, p_unit integer, p_injury text, p_add boolean) TO authenticated;


--
-- Name: FUNCTION campaign_set_vp(p_game uuid, p_vp integer); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_set_vp(p_game uuid, p_vp integer) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_set_vp(p_game uuid, p_vp integer) TO authenticated;


--
-- Name: FUNCTION campaign_start(p_campaign uuid); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_start(p_campaign uuid) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_start(p_campaign uuid) TO authenticated;


--
-- Name: FUNCTION campaign_temp_credit(p_roster jsonb, p_units jsonb); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_temp_credit(p_roster jsonb, p_units jsonb) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_temp_credit(p_roster jsonb, p_units jsonb) TO authenticated;


--
-- Name: FUNCTION campaign_transfer_owner(p_campaign uuid, p_user uuid); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_transfer_owner(p_campaign uuid, p_user uuid) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_transfer_owner(p_campaign uuid, p_user uuid) TO authenticated;


--
-- Name: FUNCTION campaign_undo_chapter(p_campaign uuid); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_undo_chapter(p_campaign uuid) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_undo_chapter(p_campaign uuid) TO authenticated;


--
-- Name: FUNCTION campaign_update_band(p_campaign uuid, p_units jsonb, p_remap integer[], p_delta integer, p_reason text, p_spent integer, p_refund integer, p_temp integer); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_update_band(p_campaign uuid, p_units jsonb, p_remap integer[], p_delta integer, p_reason text, p_spent integer, p_refund integer, p_temp integer) FROM PUBLIC;
GRANT ALL ON FUNCTION public.campaign_update_band(p_campaign uuid, p_units jsonb, p_remap integer[], p_delta integer, p_reason text, p_spent integer, p_refund integer, p_temp integer) TO authenticated;


--
-- Name: FUNCTION campaign_vp_balance(p_campaign uuid, p_user uuid); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.campaign_vp_balance(p_campaign uuid, p_user uuid) FROM PUBLIC;


--
-- Name: FUNCTION finish_game(p_game uuid, p_winners uuid[]); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.finish_game(p_game uuid, p_winners uuid[]) FROM PUBLIC;
GRANT ALL ON FUNCTION public.finish_game(p_game uuid, p_winners uuid[]) TO authenticated;


--
-- Name: FUNCTION join_campaign(p_code text); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.join_campaign(p_code text) FROM PUBLIC;
GRANT ALL ON FUNCTION public.join_campaign(p_code text) TO authenticated;


--
-- Name: FUNCTION join_game(p_code text); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.join_game(p_code text) FROM PUBLIC;
GRANT ALL ON FUNCTION public.join_game(p_code text) TO authenticated;


--
-- Name: FUNCTION next_round(p_game uuid, p_from_round integer); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.next_round(p_game uuid, p_from_round integer) FROM PUBLIC;
GRANT ALL ON FUNCTION public.next_round(p_game uuid, p_from_round integer) TO authenticated;


--
-- Name: FUNCTION set_game_player_score(p_game uuid, p_user uuid, p_vp integer, p_side text); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.set_game_player_score(p_game uuid, p_user uuid, p_vp integer, p_side text) FROM PUBLIC;
GRANT ALL ON FUNCTION public.set_game_player_score(p_game uuid, p_user uuid, p_vp integer, p_side text) TO authenticated;


--
-- Name: FUNCTION start_game(p_game uuid); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.start_game(p_game uuid) FROM PUBLIC;
GRANT ALL ON FUNCTION public.start_game(p_game uuid) TO authenticated;


--
-- Name: TABLE bands; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.bands TO authenticated;


--
-- Name: TABLE campaign_ledger; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT ON TABLE public.campaign_ledger TO authenticated;


--
-- Name: TABLE campaign_players; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE ON TABLE public.campaign_players TO authenticated;


--
-- Name: COLUMN campaign_players.band_id; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(band_id) ON TABLE public.campaign_players TO authenticated;


--
-- Name: TABLE campaign_rolls; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT ON TABLE public.campaign_rolls TO authenticated;


--
-- Name: TABLE campaign_vp_log; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT ON TABLE public.campaign_vp_log TO authenticated;


--
-- Name: TABLE campaigns; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE ON TABLE public.campaigns TO authenticated;


--
-- Name: COLUMN campaigns.name; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(name) ON TABLE public.campaigns TO authenticated;


--
-- Name: COLUMN campaigns.max_value; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(max_value) ON TABLE public.campaigns TO authenticated;


--
-- Name: COLUMN campaigns.num_missions; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(num_missions) ON TABLE public.campaigns TO authenticated;


--
-- Name: COLUMN campaigns.starting_gold; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(starting_gold) ON TABLE public.campaigns TO authenticated;


--
-- Name: TABLE game_players; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE ON TABLE public.game_players TO authenticated;


--
-- Name: COLUMN game_players.band_id; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(band_id) ON TABLE public.game_players TO authenticated;


--
-- Name: COLUMN game_players.ready; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(ready) ON TABLE public.game_players TO authenticated;


--
-- Name: COLUMN game_players.roster; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(roster) ON TABLE public.game_players TO authenticated;


--
-- Name: TABLE games; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE ON TABLE public.games TO authenticated;


--
-- Name: COLUMN games.name; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(name) ON TABLE public.games TO authenticated;


--
-- Name: COLUMN games.max_value; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(max_value) ON TABLE public.games TO authenticated;


--
-- Name: COLUMN games.scenario_id; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(scenario_id) ON TABLE public.games TO authenticated;


--
-- Name: COLUMN games.scenario_mode; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(scenario_mode) ON TABLE public.games TO authenticated;


--
-- Name: COLUMN games.max_players; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(max_players) ON TABLE public.games TO authenticated;


--
-- Name: COLUMN games.arcdeck_env; Type: ACL; Schema: public; Owner: -
--

GRANT UPDATE(arcdeck_env) ON TABLE public.games TO authenticated;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.profiles TO authenticated;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;


--
-- PostgreSQL database dump complete
--


