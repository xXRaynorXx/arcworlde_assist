-- Campañas: traspasar el rol de creador y deshacer "Pasar a la misión N".

-- Las partidas de una campaña activa no se borran, salvo desde las funciones de campaña
create or replace function public.guard_campaign_game_delete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
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

-- El creador pasa el mando a otro jugador de la campaña (y de sus partidas)
create or replace function public.campaign_transfer_owner(p_campaign uuid, p_user uuid)
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

-- Deshace el paso a la misión actual si aún no se ha hecho nada en ella
-- (sin tiradas, ni compras, ni gastos de PV, y con la partida sin empezar).
create or replace function public.campaign_undo_chapter(p_campaign uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
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

revoke execute on function public.campaign_transfer_owner(uuid, uuid) from public, anon;
revoke execute on function public.campaign_undo_chapter(uuid) from public, anon;
grant execute on function public.campaign_transfer_owner(uuid, uuid) to authenticated;
grant execute on function public.campaign_undo_chapter(uuid) to authenticated;
