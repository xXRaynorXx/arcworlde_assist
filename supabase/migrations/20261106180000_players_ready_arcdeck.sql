-- Partidas: número de jugadores, OK de cada jugador, rondas con eventos ArcDeck y bando automático.
--  * La partida indica cuántos jugadores son. Si son más de uno, todos dan su OK antes de empezar.
--  * Al empezar se roba el primer evento ArcDeck (ronda 1). "Final de ronda" roba el siguiente.
--  * El mazo (54 cartas, sin repetir hasta agotarlo) vive en una tabla sin acceso para los clientes,
--    para que nadie pueda ver qué cartas vienen. Solo se ve la carta actual y las ya jugadas.
--  * Al elegir banda, el bando del jugador se rellena con la facción de esa banda.

-- ---------------------------------------------------------------------------
-- Columnas nuevas
-- ---------------------------------------------------------------------------
alter table public.games
  add column if not exists max_players     integer not null default 2 check (max_players between 1 and 12),
  add column if not exists arcdeck_env     text    not null default 'mildaark' check (arcdeck_env in ('mildaark', 'vauhaemia')),
  add column if not exists round           integer not null default 0,
  add column if not exists arcdeck_card    text,
  add column if not exists arcdeck_history jsonb   not null default '[]'::jsonb;

alter table public.game_players
  add column if not exists ready boolean not null default false;

-- Mazo oculto: sin políticas ni permisos, solo lo tocan las funciones de abajo.
create table if not exists public.game_arcdeck (
  game_id uuid primary key references public.games (id) on delete cascade,
  deck    text[] not null default '{}'
);
alter table public.game_arcdeck enable row level security;
revoke all on public.game_arcdeck from anon, authenticated;

-- Permisos por columna: el creador edita nº de jugadores y entorno; cada jugador, su OK.
grant update (max_players, arcdeck_env) on public.games to authenticated;
grant update (ready) on public.game_players to authenticated;

-- ---------------------------------------------------------------------------
-- Unirse: respeta el número de jugadores
-- ---------------------------------------------------------------------------
create or replace function public.join_game(p_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
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

-- ---------------------------------------------------------------------------
-- Banda elegida: valida, rellena el bando con la facción y retira el OK si cambia
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

-- OK del jugador: solo en preparación y con banda elegida
create or replace function public.guard_game_player_ready()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
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

drop trigger if exists game_players_guard_ready on public.game_players;
create trigger game_players_guard_ready
  before update of ready on public.game_players
  for each row execute function public.guard_game_player_ready();

-- ---------------------------------------------------------------------------
-- Cambios del creador en la partida: valor, escenario, nº de jugadores y entorno, solo en preparación
-- ---------------------------------------------------------------------------
create or replace function public.guard_game_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
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

-- ---------------------------------------------------------------------------
-- ArcDeck: robar carta (interna) y final de ronda
-- ---------------------------------------------------------------------------
create or replace function public.arcdeck_draw(gid uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
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

create or replace function public.next_round(p_game uuid, p_from_round integer)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
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

-- ---------------------------------------------------------------------------
-- Empezar: exige jugadores completos y OK (si son varios) y roba el evento de la ronda 1
-- ---------------------------------------------------------------------------
create or replace function public.start_game(p_game uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
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

-- ---------------------------------------------------------------------------
-- Permisos de ejecución
-- ---------------------------------------------------------------------------
revoke execute on function public.arcdeck_draw(uuid) from public, anon, authenticated;
revoke execute on function public.next_round(uuid, integer) from public, anon;
revoke execute on function public.start_game(uuid) from public, anon;
revoke execute on function public.join_game(text) from public, anon;
grant execute on function public.next_round(uuid, integer) to authenticated;
grant execute on function public.start_game(uuid) to authenticated;
grant execute on function public.join_game(text) to authenticated;
