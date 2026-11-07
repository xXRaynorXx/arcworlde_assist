\set A '00000000-0000-0000-0000-00000000000a'
select id as cid from campaigns where name='C2' \gset
select id as g from games where campaign_id=:'cid' and position=1 \gset
select set_config('request.jwt.claim.sub',:'A',false) \gset
set role authenticated;
\echo '== sin PV (debe fallar)'
select public.campaign_buy_trait(:'cid',0,'fleet_of_foot',1,3);
\echo '== lesion manual en borrador: cojera en miniatura 0'
select public.campaign_set_injury(:'cid',0,'cojera',true);
select roster from game_players where game_id=:'g';
select public.campaign_set_injury(:'cid',0,'cojera',false);
select roster from game_players where game_id=:'g';
reset role;
update games set status='finished' where id=:'g';
update game_players set vp=7 where game_id=:'g';
set role authenticated;
\echo '== con 7 PV: N2 sin N1 (falla), N1 ok (queda 4), N2 coste 6 (falla), N1 otra vez (falla)'
select public.campaign_buy_trait(:'cid',0,'fleet_of_foot',2,6);
select public.campaign_buy_trait(:'cid',0,'fleet_of_foot',1,3) as quedan;
select public.campaign_buy_trait(:'cid',0,'fleet_of_foot',2,6);
select public.campaign_buy_trait(:'cid',0,'fleet_of_foot',1,3);
select public.campaign_buy_trait(:'cid',9,'hardy',1,3);
select band_snapshot->'units'->0->'rasgos_campana' r from campaign_players where campaign_id=:'cid';
\echo '== lesion tras batalla'
select public.campaign_set_injury(:'cid',0,'ojo_morado',true);
select injuries from campaign_players where campaign_id=:'cid';
\echo '== directo al log (falla)'
insert into campaign_vp_log(campaign_id,user_id,chapter,unit_index,trait,level,cost) values (:'cid',:'A',1,0,'x',1,1);
\echo '== siguiente misión: el rasgo y la lesion pasan; update_band conserva rasgos'
select public.campaign_next_chapter(:'cid') as g2 \gset
select roster, band_snapshot->'units'->0->'rasgos_campana' r from game_players where game_id=:'g2';
select public.campaign_roll(:'cid','merchant') is not null;
select public.campaign_update_band(:'cid','[{"nombre":"Nuevo","coste":10,"equipo":[],"rasgos_campana":{"hardy":3}},{"nombre":"Sheriff","coste":80,"equipo":[]}]'::jsonb,array[-1,0],-10,'x');
select jsonb_path_query_array(band_snapshot->'units','$[*].rasgos_campana') from campaign_players where campaign_id=:'cid';
select 'log' t, trait, level, cost from campaign_vp_log;
