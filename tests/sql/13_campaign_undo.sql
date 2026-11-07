\set A '00000000-0000-0000-0000-00000000000a'
\set B '00000000-0000-0000-0000-00000000000b'
select id as cid from campaigns where name='C2' \gset
select set_config('request.jwt.claim.sub',:'A',false) \gset
set role authenticated;
\echo '== deshacer misión 2 con tirada de comerciante (debe fallar)'
select public.campaign_undo_chapter(:'cid');
reset role;
delete from campaign_rolls where campaign_id=:'cid' and chapter=2;
delete from campaign_ledger where campaign_id=:'cid' and chapter=2;
delete from campaign_vp_log where campaign_id=:'cid' and chapter=2;
set role authenticated;
select public.campaign_undo_chapter(:'cid');
select 'estado' t, chapter, (select count(*) from games where campaign_id=:'cid') juegos from campaigns where id=:'cid';
select 'lesiones devueltas' t, injuries from campaign_players where campaign_id=:'cid';
\echo '== traspaso a quien no está (falla), traspaso a mismo (falla)'
select public.campaign_transfer_owner(:'cid', :'B');
select public.campaign_transfer_owner(:'cid', :'A');
