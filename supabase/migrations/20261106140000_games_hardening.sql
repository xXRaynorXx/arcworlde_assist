-- Partidas: refuerzo de seguridad y operaciones del creador.
--  * Los jugadores solo pueden cambiar SU banda, y solo mientras la partida está en preparación.
--  * Puntos, bando, inicio y cierre de partida solo los cambia el creador, mediante funciones.
--  * Solo se puede entrar a una partida en preparación.

-- ---------------------------------------------------------------------------
-- Unirse: únicamente partidas en preparación
-- ---------------------------------------------------------------------------
create or replace function public.join_game(p_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  gid uuid;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesión';
  end if;

  select id into gid from public.games
  where join_code = p_code and status = 'draft' and campaign_id is null;

  if gid is null then
    raise exception 'Código no válido o la partida ya ha empezado';
  end if;

  insert into public.game_players (game_id, user_id)
  values (gid, auth.uid())
  on conflict do nothing;

  return gid;
end;
$$;

-- ---------------------------------------------------------------------------
-- Cambiar de banda: solo en preparación
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
    new.band_snapshot = null;
    return new;
  end if;

  select * into b from public.bands where id = new.band_id;
  if not found or b.owner_id <> new.user_id then
    raise exception 'La banda no existe o no es tuya';
  end if;

  if b.value > g.max_value then
    raise exception 'La banda (% GP) supera el valor máximo de la partida (% GP)', b.value, g.max_value;
  end if;

  new.band_snapshot = to_jsonb(b) - 'owner_id';
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Permisos por columna: los jugadores solo tocan su banda
-- ---------------------------------------------------------------------------
revoke update on public.game_players from authenticated;
grant update (band_id) on public.game_players to authenticated;

revoke update on public.campaign_players from authenticated;
grant update (band_id) on public.campaign_players to authenticated;

-- Los datos de la partida (nombre, valor, escenario) los edita el creador; el estado y el
-- resultado solo cambian con start_game() y finish_game().
revoke update on public.games from authenticated;
grant update (name, max_value, scenario_id, scenario_mode) on public.games to authenticated;

drop policy if exists game_players_update on public.game_players;
create policy game_players_update on public.game_players
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists campaign_players_update on public.campaign_players;
create policy campaign_players_update on public.campaign_players
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Operaciones del creador
-- ---------------------------------------------------------------------------
create or replace function public.set_game_player_score(
  p_game uuid,
  p_user uuid,
  p_vp integer,
  p_side text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
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

create or replace function public.start_game(p_game uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  st text;
begin
  if not public.is_game_owner(p_game) then
    raise exception 'Solo el creador puede empezar la partida';
  end if;

  select status into st from public.games where id = p_game;
  if st <> 'draft' then
    raise exception 'La partida ya ha empezado';
  end if;
  if not exists (select 1 from public.game_players where game_id = p_game) then
    raise exception 'Todavía no hay jugadores';
  end if;
  if exists (select 1 from public.game_players where game_id = p_game and band_id is null) then
    raise exception 'Todos los jugadores deben elegir una banda';
  end if;

  update public.games set status = 'active' where id = p_game;
end;
$$;

create or replace function public.finish_game(p_game uuid, p_winners uuid[] default '{}')
returns void
language plpgsql
security definer
set search_path = public
as $$
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

-- ---------------------------------------------------------------------------
-- Guardas: valor y escenario se fijan al empezar; nadie abandona una partida en curso
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
       or new.scenario_mode is distinct from old.scenario_mode then
      raise exception 'La partida ya ha empezado: no se puede cambiar el valor ni el escenario';
    end if;
  end if;

  if new.max_value < old.max_value and exists (
    select 1 from public.game_players
    where game_id = new.id and (band_snapshot ->> 'value')::integer > new.max_value
  ) then
    raise exception 'Hay bandas que superan el nuevo valor máximo';
  end if;

  return new;
end;
$$;

create trigger games_guard_update
  before update on public.games
  for each row execute function public.guard_game_update();

create or replace function public.guard_game_player_delete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
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

create trigger game_players_guard_delete
  before delete on public.game_players
  for each row execute function public.guard_game_player_delete();

-- ---------------------------------------------------------------------------
-- Tiempo real: los cambios en partidas y jugadores llegan a los clientes (respeta RLS)
-- ---------------------------------------------------------------------------
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    begin
      alter publication supabase_realtime add table public.games;
    exception when duplicate_object then null;
    end;
    begin
      alter publication supabase_realtime add table public.game_players;
    exception when duplicate_object then null;
    end;
  end if;
end;
$$;

revoke execute on function public.set_game_player_score(uuid, uuid, integer, text) from public, anon;
revoke execute on function public.start_game(uuid) from public, anon;
revoke execute on function public.finish_game(uuid, uuid[]) from public, anon;
revoke execute on function public.join_game(text) from public, anon;
grant execute on function public.set_game_player_score(uuid, uuid, integer, text) to authenticated;
grant execute on function public.start_game(uuid) to authenticated;
grant execute on function public.finish_game(uuid, uuid[]) to authenticated;
grant execute on function public.join_game(text) to authenticated;
