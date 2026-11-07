\set A '00000000-0000-0000-0000-00000000000a'
reset role;
insert into campaigns(name,max_value,num_missions,starting_gold,status,chapter,owner_id) values ('C2',500,2,300,'draft',0,:'A') returning id as cid \gset
insert into campaign_players(campaign_id,user_id,gold) values (:'cid',:'A',300);
select set_config('request.jwt.claim.sub',:'A',false) \gset
set role authenticated;
update campaign_players set band_id=(select id from bands where name='BA') where campaign_id=:'cid';
select public.campaign_start(:'cid') as g \gset
select public.campaign_roll(:'cid','merchant') is not null;
reset role;
select set_config('aw.internal','1',false);
update game_players set roster='{"0":{"lesiones":["cojera"]},"1":{"lesiones":["herido"],"ko":true}}' where game_id=:'g';
select set_config('aw.internal','',false);
set role authenticated;
select public.campaign_update_band(:'cid','[{"nombre":"Mil","coste":40,"equipo":[]},{"nombre":"Nuevo","coste":10,"equipo":[]}]'::jsonb,array[1,-1],-10,'Cambio');
select roster from game_players where game_id=:'g';
