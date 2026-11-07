\set A '00000000-0000-0000-0000-00000000000a'
\set B '00000000-0000-0000-0000-00000000000b'
insert into auth.users(id,email) values (:'A','a@x'),(:'B','b@x');
select set_config('request.jwt.claim.sub',:'A',false) \gset
set role authenticated;
insert into bands(owner_id,name,faction,value,units) values
 (:'A','BA','Halflings',120,'[{"nombre":"Sheriff","coste":80,"equipo":[]},{"nombre":"Mil","coste":40,"equipo":[]}]'),
 (:'A','Cara','Halflings',300,'[{"nombre":"X","coste":300}]');
insert into campaigns(name,max_value,num_missions,starting_gold,status,chapter) values ('Camp',500,2,200,'finished',9) returning id as cid, join_code as code \gset
select public.join_campaign(:'code') is not null;
\echo '== banda cara (300>200) debe fallar'
update campaign_players set band_id=(select id from bands where name='Cara');
update campaign_players set band_id=(select id from bands where name='BA');
select 'oro tras elegir' t, gold from campaign_players;
select set_config('request.jwt.claim.sub',:'B',false) \gset
insert into bands(owner_id,name,faction,value,units) values (:'B','BB','Ourks',100,'[{"nombre":"Jefe","coste":100,"equipo":[]}]');
select public.join_campaign(:'code') is not null;
update campaign_players set band_id=(select id from bands where name='BB') where user_id=:'B';
select set_config('request.jwt.claim.sub',:'A',false) \gset
\echo '== creador cambia presupuesto a 100 (debe fallar: BA cuesta 120), luego a 250'
update campaigns set starting_gold=100 where id=:'cid';
update campaigns set starting_gold=250 where id=:'cid';
select 'oros' t, user_id=:'A' es_a, gold from campaign_players order by joined_at;
select public.campaign_start(:'cid') as g1 \gset
select 'libro' t, user_id=:'A' es_a, delta, balance, reason from campaign_ledger order by id;
\echo '== gestionar banda sin comerciante: debe fallar'
select public.campaign_update_band(:'cid','[{"nombre":"Sheriff","coste":80,"equipo":[]}]'::jsonb,array[0],10,'x');
select public.campaign_roll(:'cid','merchant') is not null;
\echo '== A compra espada (30): quita Mil y añade espada al sheriff; remap'
select public.campaign_update_band(:'cid','[{"nombre":"Sheriff","coste":80,"equipo":[{"id":"espada","origen":"comun","nombre":"Espada","coste":30}]}]'::jsonb,array[0],-30+0,'Compra: Espada');
select 'oro A' t, gold, band_snapshot->>'value' valor, jsonb_array_length(band_snapshot->'units') n from campaign_players where user_id=:'A';
select 'gp A' t, band_snapshot->>'value' valor, ready, roster from game_players where user_id=:'A';
\echo '== gastar mas de lo que hay: debe fallar'
select public.campaign_update_band(:'cid','[{"nombre":"Sheriff","coste":80,"equipo":[]}]'::jsonb,array[0],-9999,'x');
\echo '== B (otro) no puede modificar la banda de A, solo la suya'
select set_config('request.jwt.claim.sub',:'B',false) \gset
select public.campaign_update_band(:'cid','[{"nombre":"Jefe","coste":100,"equipo":[]}]'::jsonb,array[0],0,'x');
\echo '== PV: B no puede (partida en preparacion)'
select public.campaign_set_vp(:'g1',3);
\echo '== directo al roster/snapshot (debe fallar)'
update game_players set band_snapshot='{}' where user_id=:'B';
update campaign_players set band_snapshot='{}' where user_id=:'B';
reset role;
update games set status='active', round=1 where id=:'g1';
set role authenticated;
select public.campaign_set_vp(:'g1',3);
select 'vp' t, user_id=:'B' es_b, vp from game_players order by joined_at;
select (public.campaign_roll(:'cid','round_event') is not null) as evento;
select public.campaign_roll(:'cid','round_event');
\echo '(arriba: segundo robo en la misma ronda debe fallar)'
reset role;
update games set round=2 where id=:'g1';
set role authenticated;
select (public.campaign_roll(:'cid','round_event') is not null) as evento_r2;
\echo '== banda no se gestiona con la partida en curso'
select public.campaign_update_band(:'cid','[{"nombre":"Jefe","coste":100,"equipo":[]}]'::jsonb,array[0],0,'x');
select 'rolls' t, kind, unit_index from campaign_rolls order by id;
select 'libro final' t, delta, balance, reason from campaign_ledger order by id;
