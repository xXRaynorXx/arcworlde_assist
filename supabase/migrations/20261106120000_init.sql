-- ArcWorlde Assist: esquema inicial
-- Usuarios, bandas, partidas, campañas y participantes, con seguridad por fila (RLS).

-- ---------------------------------------------------------------------------
-- Utilidades
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Perfiles (uno por usuario de auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 40),
  created_at   timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Bandas (pertenecen a un usuario y viven en su perfil)
-- ---------------------------------------------------------------------------
create table public.bands (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  name       text not null check (char_length(name) between 1 and 60),
  faction    text,
  value      integer not null default 0 check (value >= 0),
  units      jsonb not null default '[]'::jsonb,
  notes      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index bands_owner_idx on public.bands (owner_id);

create trigger bands_updated_at
  before update on public.bands
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Campañas y partidas
-- ---------------------------------------------------------------------------
create table public.campaigns (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  name       text not null check (char_length(name) between 1 and 80),
  max_value  integer not null default 500 check (max_value > 0),
  status     text not null default 'draft' check (status in ('draft', 'active', 'finished')),
  join_code  text not null unique default substr(replace(gen_random_uuid()::text, '-', ''), 1, 10),
  winner_id  uuid references public.profiles (id) on delete set null,
  settings   jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.games (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  campaign_id   uuid references public.campaigns (id) on delete cascade,
  name          text not null check (char_length(name) between 1 and 80),
  max_value     integer not null default 500 check (max_value > 0),
  status        text not null default 'draft' check (status in ('draft', 'active', 'finished')),
  scenario_id   text,                                   -- id del escenario en datosEscenarios
  scenario_mode text not null default 'chosen' check (scenario_mode in ('chosen', 'random')),
  victory       jsonb not null default '{}'::jsonb,     -- método de victoria según el mapa
  position      integer,                                -- orden dentro de la campaña
  join_code     text not null unique default substr(replace(gen_random_uuid()::text, '-', ''), 1, 10),
  created_at    timestamptz not null default now(),
  finished_at   timestamptz
);

create index games_campaign_idx on public.games (campaign_id);

-- Un jugador por campaña, con su campamento (oro, experiencia, cofre, estado de la banda)
create table public.campaign_players (
  campaign_id uuid not null references public.campaigns (id) on delete cascade,
  user_id     uuid not null references public.profiles (id) on delete cascade,
  band_id     uuid references public.bands (id) on delete set null,
  band_snapshot jsonb,
  camp        jsonb not null default '{}'::jsonb,
  total_vp    integer not null default 0,
  joined_at   timestamptz not null default now(),
  primary key (campaign_id, user_id)
);

-- Un jugador por partida. Puede haber varios por mapa (team/side) o uno solo (solitario).
create table public.game_players (
  game_id       uuid not null references public.games (id) on delete cascade,
  user_id       uuid not null references public.profiles (id) on delete cascade,
  band_id       uuid references public.bands (id) on delete set null,
  band_snapshot jsonb,
  side          text,
  vp            integer not null default 0,
  result        jsonb not null default '{}'::jsonb,
  joined_at     timestamptz not null default now(),
  primary key (game_id, user_id)
);

create index game_players_user_idx on public.game_players (user_id);
create index campaign_players_user_idx on public.campaign_players (user_id);

-- ---------------------------------------------------------------------------
-- Funciones de pertenencia (security definer para evitar recursión en RLS)
-- ---------------------------------------------------------------------------
create or replace function public.is_campaign_member(cid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.campaigns c
    where c.id = cid
      and (c.owner_id = auth.uid()
           or exists (select 1 from public.campaign_players cp
                      where cp.campaign_id = c.id and cp.user_id = auth.uid()))
  );
$$;

create or replace function public.is_game_member(gid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.games g
    where g.id = gid
      and (g.owner_id = auth.uid()
           or exists (select 1 from public.game_players gp
                      where gp.game_id = g.id and gp.user_id = auth.uid())
           or (g.campaign_id is not null and public.is_campaign_member(g.campaign_id)))
  );
$$;

create or replace function public.is_game_owner(gid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.games g where g.id = gid and g.owner_id = auth.uid());
$$;

create or replace function public.is_campaign_owner(cid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.campaigns c where c.id = cid and c.owner_id = auth.uid());
$$;

create or replace function public.is_game_in_my_campaign(gid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.games g
    where g.id = gid
      and g.campaign_id is not null
      and public.is_campaign_member(g.campaign_id)
  );
$$;

-- Una banda es visible para quien comparte partida o campaña con ella
create or replace function public.band_visible_to_me(bid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.game_players gp
    where gp.band_id = bid and public.is_game_member(gp.game_id)
  ) or exists (
    select 1 from public.campaign_players cp
    where cp.band_id = bid and public.is_campaign_member(cp.campaign_id)
  );
$$;

-- ---------------------------------------------------------------------------
-- Validación de banda al apuntarse: pertenece al jugador y respeta el valor máximo
-- ---------------------------------------------------------------------------
create or replace function public.check_game_player_band()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  b public.bands;
  maxv integer;
begin
  if new.band_id is null then
    new.band_snapshot = null;
    return new;
  end if;

  select * into b from public.bands where id = new.band_id;
  if not found or b.owner_id <> new.user_id then
    raise exception 'La banda no existe o no es tuya';
  end if;

  select max_value into maxv from public.games where id = new.game_id;
  if b.value > maxv then
    raise exception 'La banda (% GP) supera el valor máximo de la partida (% GP)', b.value, maxv;
  end if;

  new.band_snapshot = to_jsonb(b) - 'owner_id';
  return new;
end;
$$;

create trigger game_players_check_band
  before insert or update of band_id on public.game_players
  for each row execute function public.check_game_player_band();

create or replace function public.check_campaign_player_band()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  b public.bands;
  maxv integer;
begin
  if new.band_id is null then
    new.band_snapshot = null;
    return new;
  end if;

  select * into b from public.bands where id = new.band_id;
  if not found or b.owner_id <> new.user_id then
    raise exception 'La banda no existe o no es tuya';
  end if;

  select max_value into maxv from public.campaigns where id = new.campaign_id;
  if b.value > maxv then
    raise exception 'La banda (% GP) supera el valor máximo de la campaña (% GP)', b.value, maxv;
  end if;

  new.band_snapshot = to_jsonb(b) - 'owner_id';
  return new;
end;
$$;

create trigger campaign_players_check_band
  before insert or update of band_id on public.campaign_players
  for each row execute function public.check_campaign_player_band();

-- ---------------------------------------------------------------------------
-- Unirse con código de invitación (único camino para apuntarse a algo ajeno)
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
  where join_code = p_code and status in ('draft', 'active') and campaign_id is null;

  if gid is null then
    raise exception 'Código de partida no válido';
  end if;

  insert into public.game_players (game_id, user_id)
  values (gid, auth.uid())
  on conflict do nothing;

  return gid;
end;
$$;

create or replace function public.join_campaign(p_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  cid uuid;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesión';
  end if;

  select id into cid from public.campaigns
  where join_code = p_code and status in ('draft', 'active');

  if cid is null then
    raise exception 'Código de campaña no válido';
  end if;

  insert into public.campaign_players (campaign_id, user_id)
  values (cid, auth.uid())
  on conflict do nothing;

  return cid;
end;
$$;

-- ---------------------------------------------------------------------------
-- Seguridad por fila
-- ---------------------------------------------------------------------------
alter table public.profiles         enable row level security;
alter table public.bands            enable row level security;
alter table public.campaigns        enable row level security;
alter table public.games            enable row level security;
alter table public.campaign_players enable row level security;
alter table public.game_players     enable row level security;

-- profiles: los usuarios identificados ven los nombres; cada uno edita el suyo
create policy profiles_select on public.profiles
  for select to authenticated using (true);
create policy profiles_update_own on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- bands: el dueño gestiona las suyas; los compañeros de partida pueden verlas
create policy bands_select on public.bands
  for select to authenticated
  using (owner_id = auth.uid() or public.band_visible_to_me(id));
create policy bands_insert_own on public.bands
  for insert to authenticated with check (owner_id = auth.uid());
create policy bands_update_own on public.bands
  for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy bands_delete_own on public.bands
  for delete to authenticated using (owner_id = auth.uid());

-- campaigns
create policy campaigns_select on public.campaigns
  for select to authenticated using (public.is_campaign_member(id));
create policy campaigns_insert on public.campaigns
  for insert to authenticated with check (owner_id = auth.uid());
create policy campaigns_update_owner on public.campaigns
  for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy campaigns_delete_owner on public.campaigns
  for delete to authenticated using (owner_id = auth.uid());

-- games
create policy games_select on public.games
  for select to authenticated using (public.is_game_member(id));
create policy games_insert on public.games
  for insert to authenticated
  with check (
    owner_id = auth.uid()
    and (campaign_id is null or public.is_campaign_owner(campaign_id))
  );
create policy games_update_owner on public.games
  for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy games_delete_owner on public.games
  for delete to authenticated using (owner_id = auth.uid());

-- campaign_players: se entra con join_campaign(); cada uno edita lo suyo y el creador, todo
create policy campaign_players_select on public.campaign_players
  for select to authenticated using (public.is_campaign_member(campaign_id));
create policy campaign_players_update on public.campaign_players
  for update to authenticated
  using (user_id = auth.uid() or public.is_campaign_owner(campaign_id))
  with check (user_id = auth.uid() or public.is_campaign_owner(campaign_id));
create policy campaign_players_delete on public.campaign_players
  for delete to authenticated
  using (user_id = auth.uid() or public.is_campaign_owner(campaign_id));

-- game_players
create policy game_players_select on public.game_players
  for select to authenticated using (public.is_game_member(game_id));
-- En partidas de una campaña, cada miembro de la campaña se apunta a sí mismo
create policy game_players_insert_campaign on public.game_players
  for insert to authenticated
  with check (user_id = auth.uid() and public.is_game_in_my_campaign(game_id));
create policy game_players_update on public.game_players
  for update to authenticated
  using (user_id = auth.uid() or public.is_game_owner(game_id))
  with check (user_id = auth.uid() or public.is_game_owner(game_id));
create policy game_players_delete on public.game_players
  for delete to authenticated
  using (user_id = auth.uid() or public.is_game_owner(game_id));

-- ---------------------------------------------------------------------------
-- Permisos: nada para visitantes anónimos
-- ---------------------------------------------------------------------------
revoke all on all tables in schema public from anon;
revoke execute on function public.join_game(text) from public, anon;
revoke execute on function public.join_campaign(text) from public, anon;
grant execute on function public.join_game(text) to authenticated;
grant execute on function public.join_campaign(text) to authenticated;
