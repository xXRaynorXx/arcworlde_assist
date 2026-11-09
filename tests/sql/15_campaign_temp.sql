\set A '00000000-0000-0000-0000-00000000000a'
\set B '00000000-0000-0000-0000-00000000000b'
reset role;
select set_config('request.jwt.claim.sub',:'A',false) \gset
set role authenticated;
insert into bands(owner_id,name,faction,value,units) values
 (:'A','BT','Halflings',150,'[{"nombre":"Sheriff","coste":80,"equipo":[{"id":"espada","origen":"comun","nombre":"Espada","coste":30}]},{"nombre":"Mil","coste":40,"equipo":[]}]');
insert into campaigns(name,max_value,num_missions,starting_gold,status,chapter) values ('C4',500,2,300,'draft',0) returning id as cid, join_code as code \gset
select public.join_campaign(:'code') is not null;
update campaign_players set band_id=(select id from bands where name='BT') where campaign_id=:'cid';
select public.campaign_start(:'cid') as g1 \gset
select public.campaign_roll(:'cid','merchant') is not null;
\echo '== sin herido no hay crédito: un temporal debe fallar'
select public.campaign_update_band(:'cid','[{"nombre":"Sheriff","coste":80,"equipo":[{"id":"espada","origen":"comun","nombre":"Espada","coste":30}]},{"nombre":"Mil","coste":40,"equipo":[]},{"nombre":"Sub","coste":20,"temporal":true,"equipo":[]}]'::jsonb,array[0,1,-1],0,'x',0,0,20);
\echo '== el Sheriff queda Herido: crédito 110 (80 + espada 30)'
select public.campaign_set_injury(:'cid',0,'herido',true);
select 'crédito' t, public.campaign_temp_credit(roster, (select band_snapshot->'units' from campaign_players where campaign_id=:'cid' and user_id=:'A')) credito from game_players where game_id=:'g1' and user_id=:'A';
\echo '== sustituto de 120 (supera 110): falla'
select public.campaign_update_band(:'cid','[{"nombre":"Sheriff","coste":80,"equipo":[{"id":"espada","origen":"comun","nombre":"Espada","coste":30}]},{"nombre":"Mil","coste":40,"equipo":[]},{"nombre":"Sub","coste":120,"temporal":true,"equipo":[]}]'::jsonb,array[0,1,-1],0,'x',0,0,120);
\echo '== temporal marcado pero sin pagarlo (p_temp 0 < coste 60): falla'
select public.campaign_update_band(:'cid','[{"nombre":"Sheriff","coste":80,"equipo":[{"id":"espada","origen":"comun","nombre":"Espada","coste":30}]},{"nombre":"Mil","coste":40,"equipo":[]},{"nombre":"Sub","coste":60,"temporal":true,"equipo":[]}]'::jsonb,array[0,1,-1],0,'x',0,0,0);
\echo '== sustituto 60 + espada 30 con crédito (oro no cambia) y un arco permanente de 10 con oro'
select public.campaign_update_band(:'cid','[{"nombre":"Sheriff","coste":80,"equipo":[{"id":"espada","origen":"comun","nombre":"Espada","coste":30}]},{"nombre":"Mil","coste":40,"equipo":[{"id":"arco","origen":"comun","nombre":"Arco","coste":10}]},{"nombre":"Sub","coste":60,"temporal":true,"equipo":[{"id":"espada","origen":"comun","nombre":"Espada","coste":30}]}]'::jsonb,array[0,1,-1],-10,'Compra: Arco, Fichaje Sub',10,0,90);
select 'oro' t, gold, temp_spent, band_snapshot->>'value' valor, jsonb_array_length(band_snapshot->'units') n from campaign_players where campaign_id=:'cid' and user_id=:'A';
select 'libro' t, delta, spent, refunded, reason from campaign_ledger where campaign_id=:'cid' and chapter=1 order by id desc limit 1;
select 'roster' t, roster from game_players where game_id=:'g1' and user_id=:'A';
\echo '== quitar Herido con sustitutos pagados: falla'
select public.campaign_set_injury(:'cid',0,'herido',false);
\echo '== fin de la partida y siguiente misión: el sustituto se va'
reset role;
update games set status='finished' where id=:'g1';
select set_config('request.jwt.claim.sub',:'A',false) \gset
set role authenticated;
select public.campaign_set_injury(:'cid',2,'cojera',true);
select public.campaign_set_injury(:'cid',1,'cojera',true);
select 'lesiones previas' t, injuries from campaign_players where campaign_id=:'cid';
select public.campaign_next_chapter(:'cid') as g2 \gset
select 'tras cambio' t, jsonb_array_length(band_snapshot->'units') n, band_snapshot->>'value' valor, temp_spent, injuries from campaign_players where campaign_id=:'cid';
select 'nombres' t, (select string_agg(x->>'nombre', ',') from jsonb_array_elements(band_snapshot->'units') x) from campaign_players where campaign_id=:'cid';
select 'ficha nueva' t, roster from game_players where game_id=:'g2' and user_id=:'A';
