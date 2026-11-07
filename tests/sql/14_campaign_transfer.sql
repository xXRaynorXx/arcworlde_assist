\set A '00000000-0000-0000-0000-00000000000a'
\set B '00000000-0000-0000-0000-00000000000b'
reset role;
select set_config('request.jwt.claim.sub',:'A',false) \gset
set role authenticated;
insert into campaigns(name,max_value,num_missions,starting_gold) values ('C3',500,2,300) returning id as cid, join_code as code \gset
select set_config('request.jwt.claim.sub',:'B',false) \gset
select public.join_campaign(:'code') is not null as b_dentro;
\echo '== B no es el creador: no puede traspasar'
select public.campaign_transfer_owner(:'cid', :'B');
select set_config('request.jwt.claim.sub',:'A',false) \gset
select public.campaign_transfer_owner(:'cid', :'B');
select set_config('request.jwt.claim.sub',:'B',false) \gset
select 'creador ahora es B' t, owner_id = :'B' es_b from campaigns where id=:'cid';
\echo '== A ya no puede empezar la campaña'
select set_config('request.jwt.claim.sub',:'A',false) \gset
select public.campaign_start(:'cid');
