-- Corrección: crear una partida o una campaña fallaba con
--   "new row violates row-level security policy"
-- Al insertar y pedir la fila de vuelta (RETURNING), Postgres comprueba la política de
-- lectura sobre la fila recién creada. is_game_member() e is_campaign_member() consultan la
-- tabla desde una función y no ven esa fila todavía. Se añade la comprobación directa del
-- creador, que sí se evalúa sobre la propia fila. Es seguro ejecutarla más de una vez.

drop policy if exists games_select on public.games;
create policy games_select on public.games
  for select to authenticated
  using (owner_id = auth.uid() or public.is_game_member(id));

drop policy if exists campaigns_select on public.campaigns;
create policy campaigns_select on public.campaigns
  for select to authenticated
  using (owner_id = auth.uid() or public.is_campaign_member(id));
