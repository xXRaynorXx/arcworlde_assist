\set A '00000000-0000-0000-0000-00000000000a'
\set B '00000000-0000-0000-0000-00000000000b'
reset role;
select set_config('request.jwt.claim.sub',:'A',false) \gset
set role authenticated;
insert into bands(owner_id,name,faction,value,units) values
 (:'A','BI','Halflings',100,'[{"nombre":"Sheriff","coste":100,"equipo":[]}]');
insert into campaigns(name,max_value,num_missions,starting_gold) values ('C5',500,2,300) returning id as cid, join_code as code \gset
select public.join_campaign(:'code') is not null;
update campaign_players set band_id=(select id from bands where name='BI') where campaign_id=:'cid';
select set_config('request.jwt.claim.sub',:'B',false) \gset
select public.join_campaign(:'code') is not null;
update campaign_players set band_id=(select id from bands where name='BB') where campaign_id=:'cid' and user_id=:'B';
select set_config('request.jwt.claim.sub',:'A',false) \gset
select public.campaign_start(:'cid') as g1 \gset
select 'misión 1' t, position, status from games where id=:'g1';

\echo '== el creador no puede insertar partidas de campaña a mano (solo campaign_make_chapter)'
insert into games(name,campaign_id,position) values ('Dup',:'cid',1);
insert into games(name,campaign_id,position) values ('Futura',:'cid',2);
\echo '== el creador no puede cambiar la misión de una partida de campaña ni sacarla de la campaña'
update games set position=2 where id=:'g1';
update games set campaign_id=null where id=:'g1';
\echo '== una partida suelta no puede tener misión'
insert into games(name,position) values ('Suelta',1);

\echo '== B no puede colgar su partida suelta de la campaña de A'
select set_config('request.jwt.claim.sub',:'B',false) \gset
insert into games(name) values ('De B') returning id as gb \gset
update games set campaign_id=:'cid' where id=:'gb';
update games set campaign_id=:'cid', position=1 where id=:'gb';
select 'partida de B' t, campaign_id is null suelta, position from games where id=:'gb';

\echo '== B no puede poner otra banda (la de A) en la partida de campaña'
update game_players set band_id=(select band_id from campaign_players where campaign_id=:'cid' and user_id=:'A') where game_id=:'g1' and user_id=:'B';
\echo '== B tampoco con otra banda suya que no es la de la campaña'
insert into bands(owner_id,name,faction,value,units) values (:'B','BB2','Ourks',50,'[{"nombre":"Grunt","coste":50,"equipo":[]}]');
update game_players set band_id=(select id from bands where name='BB2') where game_id=:'g1' and user_id=:'B';
\echo '== quitar y volver a poner la banda de la campaña sí funciona'
update game_players set band_id=null where game_id=:'g1' and user_id=:'B';
update game_players set band_id=(select band_id from campaign_players where campaign_id=:'cid' and user_id=:'B') where game_id=:'g1' and user_id=:'B';
select 'banda de B' t, band_snapshot->>'name' banda, side from game_players where game_id=:'g1' and user_id=:'B';

\echo '== ni siquiera sin RLS ni permisos por columna se puede mover una partida de misión o de campaña'
reset role;
update games set position=2 where id=:'g1';
update games set campaign_id=null, position=null where id=:'g1';
\echo '== ni siquiera sin RLS puede haber dos partidas en la misma misión'
\set VERBOSITY terse
insert into games(owner_id,name,campaign_id,position) values (:'A','Dup',:'cid',1);
select 'partidas de C5' t, count(*) from games where campaign_id=:'cid';
\set VERBOSITY default
