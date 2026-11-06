-- Ficha de banda en partida: estado de cada miniatura (vida actual, atributos, lesiones, noqueado).
-- Cada jugador edita el de su propia banda mientras la partida está en curso; todos los
-- participantes pueden verlo. Forma: { "<posición en la banda>": { hp, mov, armadura, ap, ko, lesiones[], nota } }

alter table public.game_players
  add column if not exists roster jsonb not null default '{}'::jsonb;

grant update (roster) on public.game_players to authenticated;

create or replace function public.guard_game_player_roster()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  st text;
begin
  if new.roster is distinct from old.roster then
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

drop trigger if exists game_players_guard_roster on public.game_players;
create trigger game_players_guard_roster
  before update of roster on public.game_players
  for each row execute function public.guard_game_player_roster();

-- Al cambiar de banda en preparación, la ficha vuelve a empezar.
create or replace function public.reset_game_player_roster()
returns trigger
language plpgsql
as $$
begin
  if new.band_id is distinct from old.band_id then
    new.roster := '{}'::jsonb;
  end if;
  return new;
end;
$$;

drop trigger if exists game_players_reset_roster on public.game_players;
create trigger game_players_reset_roster
  before update of band_id on public.game_players
  for each row execute function public.reset_game_player_roster();
