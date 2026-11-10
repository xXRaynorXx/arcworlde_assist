window.__errs = [];
window.addEventListener('error', e => window.__errs.push(String(e.message)));
window.addEventListener('unhandledrejection', e => window.__errs.push('rej: ' + String(e.reason && e.reason.message || e.reason) + ' @ ' + String(e.reason && e.reason.stack || '').split('\n').slice(1,3).join('|')));
let me = 'u1', seq = 0, authCb = null;
const FIRST = (f, n, t) => ({ id: n, owner_id: f, name: n, faction: t, value: 120, updated_at: '1',
  units: [{ id: 'halfling_sheriff', nombre: 'Sheriff', tipo: 'comandante', coste: 80 }, { id: 'halfling_militia', nombre: 'Milicia Halfling', tipo: 'tropa', coste: 40 }] });
const db = {
  profiles: [{ id: 'u1', display_name: 'Ana' }, { id: 'u2', display_name: 'Bob' }, { id: 'u3', display_name: 'Carol' }],
  games: [], game_players: [],
  bands: [FIRST('u1', 'AnaOk', 'Halflings'), FIRST('u2', 'BobOk', 'Ourks'), FIRST('u3', 'CarolOk', 'Gremlins')]
};
const DECK = ['K♠', '7♥', '🃏', 'A♦', '10♣', '2♠'];
const nameOf = id => (db.profiles.find(p => p.id === id) || {}).display_name;
const visible = g => g.owner_id === me || db.game_players.some(p => p.game_id === g.id && p.user_id === me);
const shape = g => Object.assign({}, g, { owner: { display_name: nameOf(g.owner_id) },
  game_players: db.game_players.filter(p => p.game_id === g.id).map(p => Object.assign({}, p, { profiles: { display_name: nameOf(p.user_id) } })) });
const err = m => ({ data: null, error: { message: m } });
function draw(g) { g.round += 1; g.arcdeck_card = DECK[(g.round - 1) % DECK.length]; g.arcdeck_history = g.arcdeck_history.concat([{ round: g.round, card: g.arcdeck_card }]); }

function exec(st) {
  const rows = db[st.table] || (db[st.table] = []), match = r => st.filters.every(f => f(r));
  if (st.op === 'insert') {
    const row = Object.assign({ id: st.table[0] + (++seq), created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, st.payload);
    if (st.table === 'games') Object.assign(row, { status: 'draft', join_code: 'CODE' + seq, victory: {}, campaign_id: null, round: 0, arcdeck_card: null, arcdeck_history: [],
      max_players: st.payload.max_players || 2, arcdeck_env: st.payload.arcdeck_env || 'mildaark' });
    rows.push(row);
    return { data: st.single ? (st.table === 'games' ? shape(row) : row) : null, error: null };
  }
  if (st.op === 'update') {
    const hit = rows.filter(match);
    for (const r of hit) {
      if (st.table === 'game_players') {
        const g = db.games.find(x => x.id === r.game_id);
        if ('band_id' in st.payload) {
          if (g.status !== 'draft') return err('La partida ya ha empezado: no se puede cambiar de banda');
          const b = db.bands.find(x => x.id === st.payload.band_id);
          if (b && b.value > g.max_value) return err('La banda supera el valor máximo');
          const oldFaction = r.band_snapshot ? r.band_snapshot.faction : null;
          if (r.side == null || r.side === oldFaction) r.side = b ? (b.faction || null) : null;
          r.band_snapshot = b ? Object.assign({}, b) : null; r.ready = false; r.roster = {};
        }
        if ('roster' in st.payload && g.status !== 'active') return err('La ficha solo se puede modificar mientras la partida está en curso');
        if ('ready' in st.payload) {
          if (g.status !== 'draft') return err('La partida ya ha empezado');
          if (st.payload.ready && !r.band_id) return err('Elige una banda antes de dar tu OK');
        }
      }
      if (st.table === 'games' && 'max_players' in st.payload && db.game_players.filter(p => p.game_id === r.id).length > st.payload.max_players)
        return err('Ya hay más jugadores apuntados que el nuevo número');
      Object.assign(r, st.payload);
    }
    return { data: st.single ? hit[0] || null : null, error: null };
  }
  if (st.op === 'delete') { for (const r of rows.filter(match)) rows.splice(rows.indexOf(r), 1); return { data: null, error: null }; }
  let out = rows.filter(match);
  if (st.table === 'games') out = out.filter(visible).map(shape);
  return st.single ? { data: out[0] || null, error: null } : { data: out, error: null };
}
function builder(table) {
  const st = { table, op: 'select', filters: [], payload: null, single: null };
  const b = {
    select() { return b; }, insert(p) { st.op = 'insert'; st.payload = p; return b; },
    update(p) { st.op = 'update'; st.payload = p; return b; }, delete() { st.op = 'delete'; return b; },
    eq(k, v) { st.filters.push(r => r[k] === v); return b; },
    is(k, v) { st.filters.push(r => (r[k] == null) === (v === null)); return b; },
    order() { return b; }, single() { st.single = 'one'; return b; }, maybeSingle() { st.single = 'maybe'; return b; },
    then(res, rej) { return Promise.resolve(exec(st)).then(res, rej); }
  };
  return b;
}
const rpc = {
  join_game({ p_code }) {
    const g = db.games.find(x => x.join_code === p_code && x.status === 'draft');
    if (!g) return err('Código no válido o la partida ya ha empezado');
    const ps = db.game_players.filter(p => p.game_id === g.id);
    if (!ps.some(p => p.user_id === me)) {
      if (ps.length >= g.max_players) return err('La partida está completa (' + g.max_players + ' jugadores)');
      db.game_players.push({ game_id: g.id, user_id: me, band_id: null, band_snapshot: null, side: null, vp: 0, ready: false, roster: {}, joined_at: new Date(1e12 + ++seq).toISOString() });
    }
    return { data: g.id, error: null };
  },
  start_game({ p_game }) {
    const g = db.games.find(x => x.id === p_game), ps = db.game_players.filter(p => p.game_id === p_game);
    if (g.owner_id !== me) return err('Solo el creador puede empezar la partida');
    if (ps.length < g.max_players) return err('Faltan jugadores: hay ' + ps.length + ' de ' + g.max_players);
    if (ps.some(p => !p.band_id)) return err('Todos los jugadores deben elegir una banda');
    if (g.max_players > 1 && ps.some(p => !p.ready)) return err('Todos los jugadores deben dar su OK');
    g.status = 'active'; draw(g); return { data: null, error: null };
  },
  next_round({ p_game, p_from_round }) {
    const g = db.games.find(x => x.id === p_game);
    if (g.status !== 'active') return err('La partida no está en curso');
    if (g.round !== p_from_round) return { data: { unchanged: true }, error: null };
    draw(g); return { data: { round: g.round }, error: null };
  },
  set_game_player_score({ p_game, p_user, p_vp, p_side }) {
    const r = db.game_players.find(p => p.game_id === p_game && p.user_id === p_user);
    if (p_vp != null) r.vp = p_vp; if (p_side != null) r.side = p_side || null; return { data: null, error: null };
  },
  finish_game({ p_game, p_winners }) { const g = db.games.find(x => x.id === p_game); g.status = 'finished'; g.victory = { winners: p_winners }; return { data: null, error: null }; }
};
window.__login = id => { me = id; authCb('SIGNED_IN', { user: { id, email: id + '@x.com' } }); };
window.__db = db;
const chan = { on() { return chan; }, subscribe() { return chan; } };
window.supabase = { createClient: () => ({
  auth: { onAuthStateChange(cb) { authCb = cb; setTimeout(() => cb('SIGNED_IN', { user: { id: 'u1', email: 'u1@x.com' } }), 0); }, signOut() {} },
  from: builder, rpc: (n, a) => Promise.resolve(rpc[n](a)), channel: () => chan, removeChannel() {}
}) };
