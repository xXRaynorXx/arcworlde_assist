-- Integridad de las relaciones partida ↔ campaña:
--  · Las partidas de campaña solo las crea campaign_make_chapter: la API ya no puede insertar partidas con campaign_id.
--  · campaign_id y position no se pueden cambiar con un UPDATE. La API ya no podía (solo tiene permiso sobre
--    algunas columnas de games); el trigger lo garantiza también para funciones y administración.
--  · Una sola partida por capítulo: unique (campaign_id, position), y position solo existe en partidas de campaña.
--  · En una partida de campaña, game_players.band_id tiene que ser la banda con la que el jugador está en la campaña
--    (antes se aceptaba cualquier band_id y band_visible_to_me podía dejar ver bandas ajenas).

-- Las partidas sueltas no tienen capítulo
update public.games set position = null where campaign_id is null and position is not null;

alter table public.games
  add constraint games_campaign_position_check check ((campaign_id is null) = (position is null));

create unique index if not exists games_campaign_position_idx
  on public.games (campaign_id, position) where campaign_id is not null;

drop policy if exists games_insert on public.games;
create policy games_insert on public.games
  for insert to authenticated
  with check (owner_id = auth.uid() and campaign_id is null);

create or replace function public.guard_game_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.campaign_id is distinct from old.campaign_id or new.position is distinct from old.position then
    raise exception 'No se puede cambiar la campaña ni la misión de una partida';
  end if;

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

create or replace function public.check_game_player_band()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  b public.bands;
  g public.games;
  cp public.campaign_players;
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
    select * into cp from public.campaign_players
    where campaign_id = g.campaign_id and user_id = new.user_id;
    if not found or cp.band_snapshot is null then
      raise exception 'Este jugador no tiene banda en la campaña';
    end if;
    if new.band_id is distinct from cp.band_id then
      raise exception 'En una partida de campaña solo puedes usar tu banda de la campaña';
    end if;
    if tg_op = 'UPDATE' then
      if new.side is not distinct from old.side
         and (old.side is null or old.side is not distinct from (old.band_snapshot ->> 'faction')) then
        new.side := nullif(cp.band_snapshot ->> 'faction', '');
      end if;
      if new.band_id is distinct from old.band_id then
        new.ready := false;
      end if;
    else
      new.side := coalesce(new.side, nullif(cp.band_snapshot ->> 'faction', ''));
    end if;
    new.band_snapshot := cp.band_snapshot;
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
