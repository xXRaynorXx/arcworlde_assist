window.__errs = [];
window.addEventListener('error', e => window.__errs.push(String(e.message)));
window.addEventListener('unhandledrejection', e => window.__errs.push('rej: ' + String(e.reason && e.reason.message || e.reason) + ' @ ' + String(e.reason && e.reason.stack || '').split('\n').slice(1,3).join('|')));
let me = 'u1', seq = 0, authCb = null;
const FIRST = (f, n, t) => ({ id: n, owner_id: f, name: n, faction: t, value: 120, updated_at: '1',
  units: [{ id: 'halfling_sheriff', nombre: 'Sheriff', tipo: 'comandante', coste: 80 }, { id: 'halfling_militia', nombre: 'Milicia Halfling', tipo: 'tropa', coste: 40 }] });
const db = {
  profiles: [{ id: 'u1', display_name: 'Ana' }, { id: 'u2', display_name: 'Bob' }, { id: 'u3', display_name: 'Carol' }],
  games: [], game_players: [], campaigns: [], campaign_players: [], campaign_rolls: [], campaign_ledger: [], campaign_vp_log: [],
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
  const rows = db[st.table], match = r => st.filters.every(f => f(r));
  if (st.op === 'insert') {
    const row = Object.assign({ id: st.table[0] + (++seq), created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, st.payload);
    if (st.table === 'games') Object.assign(row, { status: 'draft', join_code: 'CODE' + seq, victory: {}, campaign_id: null, round: 0, arcdeck_card: null, arcdeck_history: [],
      max_players: st.payload.max_players || 2, arcdeck_env: st.payload.arcdeck_env || 'mildaark' });
    if (st.table === 'campaigns') Object.assign(row, { status: 'draft', chapter: 0, winner_id: null, join_code: 'CAMP' + seq, settings: {} });
    rows.push(row);
    return { data: st.single ? (st.table === 'games' ? shape(row) : row) : null, error: null };
  }
  if (st.op === 'update') {
    const hit = rows.filter(match);
    if (st.table === 'campaign_players') {
      for (const r of hit) {
        if ('band_id' in st.payload) {
          const c = db.campaigns.find(x => x.id === r.campaign_id);
          if (c.status !== 'draft') return err('La campaña ya ha empezado: no se puede cambiar de banda');
          const b = db.bands.find(x => x.id === st.payload.band_id);
          if (b && b.value > c.max_value) return err('La banda supera el valor máximo de la campaña');
          if (b && b.value > c.starting_gold) return err('El presupuesto (' + c.starting_gold + ' GP) no alcanza para esta banda (' + b.value + ' GP)');
          r.band_snapshot = b ? Object.assign({}, b) : null;
          r.gold = c.starting_gold - (b ? b.value : 0);
        }
      }
    }
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
  if (st.op === 'delete') {
    if (st.table === 'campaign_players') { const c = db.campaigns.find(x => x.id === (rows.filter(match)[0] || {}).campaign_id); if (c && c.status !== 'draft') return err('La campaña ya ha empezado: no se puede abandonar'); }
    if (st.table === 'campaigns') { db.games = db.games.filter(g => g.campaign_id !== (rows.filter(match)[0] || {}).id); } for (const r of rows.filter(match)) rows.splice(rows.indexOf(r), 1); return { data: null, error: null }; }
  let out = rows.filter(match);
  const campMember = cid => { const c = db.campaigns.find(x => x.id === cid); return c && (c.owner_id === me || db.campaign_players.some(p => p.campaign_id === cid && p.user_id === me)); };
  if (st.table === 'campaigns') out = out.filter(c => campMember(c.id)).map(c => Object.assign({}, c, { owner: { display_name: nameOf(c.owner_id) },
    campaign_players: db.campaign_players.filter(p => p.campaign_id === c.id).map(p => Object.assign({}, p, { profiles: { display_name: nameOf(p.user_id) } })) }));
  if (['campaign_rolls', 'campaign_ledger', 'campaign_vp_log'].includes(st.table)) out = out.filter(r => campMember(r.campaign_id));
  if (st.table === 'games') out = out.filter(g => visible(g) || (g.campaign_id && campMember(g.campaign_id))).sort((a, b) => (a.position || 0) - (b.position || 0)).map(shape);
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

const D = () => (window.__dice && window.__dice.length ? window.__dice.shift() : 1 + Math.floor(Math.random() * 6));
function makeChapter(c, n) {
  const g = { id: 'g' + (++seq), owner_id: c.owner_id, campaign_id: c.id, name: c.name + ' · Misión ' + n, max_value: c.max_value, status: 'draft', scenario_id: null,
    scenario_mode: 'chosen', victory: {}, position: n, join_code: 'CG' + seq, created_at: new Date().toISOString(), round: 0, arcdeck_card: null, arcdeck_history: [],
    max_players: Math.max(1, db.campaign_players.filter(p => p.campaign_id === c.id).length), arcdeck_env: 'mildaark' };
  db.games.push(g);
  db.campaign_players.filter(p => p.campaign_id === c.id).forEach(cp => {
    if (cp.band_snapshot && (cp.band_snapshot.units || []).some(u => u.temporal)) {
      const kept = [], inj = {}; (cp.band_snapshot.units || []).forEach((u, i) => { if (u.temporal) return; if (cp.injuries && cp.injuries[i]) inj[kept.length] = cp.injuries[i]; kept.push(u); });
      cp.band_snapshot = Object.assign({}, cp.band_snapshot, { units: kept }); cp.injuries = inj;
    }
    cp.temp_spent = 0;
    const roster = {};
    Object.keys(cp.injuries || {}).forEach(k => { roster[k] = { lesiones: cp.injuries[k], ko: cp.injuries[k].includes('herido') }; });
    db.game_players.push({ game_id: g.id, user_id: cp.user_id, band_id: cp.band_id, band_snapshot: cp.band_snapshot, side: cp.band_snapshot && cp.band_snapshot.faction, vp: 0, ready: false, roster, joined_at: new Date(1e12 + ++seq).toISOString() });
    cp.injuries = {};
  });
  c.chapter = n; return g.id;
}
const campOf = id => db.campaigns.find(x => x.id === id);
Object.assign(rpc, {
  join_campaign({ p_code }) {
    const c = db.campaigns.find(x => x.join_code === p_code && x.status === 'draft');
    if (!c) return err('Código de campaña no válido o la campaña ya ha empezado');
    if (!db.campaign_players.some(p => p.campaign_id === c.id && p.user_id === me))
      db.campaign_players.push({ campaign_id: c.id, user_id: me, band_id: null, band_snapshot: null, gold: c.starting_gold, injuries: {}, joined_at: new Date(1e12 + ++seq).toISOString() });
    return { data: c.id, error: null };
  },
  campaign_start({ p_campaign }) {
    const c = campOf(p_campaign); const ps = db.campaign_players.filter(p => p.campaign_id === c.id);
    if (c.owner_id !== me) return err('Solo el creador puede empezar la campaña');
    if (!ps.length) return err('Todavía no hay jugadores');
    if (ps.some(p => !p.band_id)) return err('Todos los jugadores deben elegir una banda');
    c.status = 'active'; ps.forEach(p => { if (c.starting_gold) db.campaign_ledger.push({ id: ++seq, campaign_id: c.id, user_id: p.user_id, actor_id: me, chapter: 0, delta: c.starting_gold, balance: c.starting_gold, reason: 'Presupuesto inicial' }); db.campaign_ledger.push({ id: ++seq, campaign_id: c.id, user_id: p.user_id, actor_id: me, chapter: 0, delta: -p.band_snapshot.value, balance: p.gold, reason: 'Banda inicial: ' + p.band_snapshot.name }); });
    return { data: makeChapter(c, 1), error: null };
  },
  campaign_transfer_owner({ p_campaign, p_user }) {
    const c = campOf(p_campaign);
    if (c.owner_id !== me) return err('Solo el creador puede traspasar la campaña');
    if (!db.campaign_players.some(p => p.campaign_id === c.id && p.user_id === p_user)) return err('Ese jugador no está en la campaña');
    c.owner_id = p_user; db.games.filter(g => g.campaign_id === c.id).forEach(g => g.owner_id = p_user); return { data: null, error: null };
  },
  campaign_undo_chapter({ p_campaign }) {
    const c = campOf(p_campaign); const g = db.games.find(x => x.campaign_id === c.id && x.position === c.chapter);
    if (c.owner_id !== me) return err('Solo el creador puede deshacer el paso de misión');
    if (c.chapter <= 1 || g.status !== 'draft') return err('No hay ningún cambio de misión que deshacer');
    if ([db.campaign_rolls, db.campaign_ledger, db.campaign_vp_log].some(t => t.some(r => r.campaign_id === c.id && r.chapter === c.chapter))) return err('En esta misión ya hay tiradas, compras o gastos de PV: no se puede deshacer');
    db.game_players.filter(x => x.game_id === g.id).forEach(x => {
      const inj = {}; Object.keys(x.roster || {}).forEach(k => { const l = (x.roster[k].lesiones || []); if (l.length) inj[k] = l; });
      db.campaign_players.find(p => p.campaign_id === c.id && p.user_id === x.user_id).injuries = inj;
    });
    db.game_players = db.game_players.filter(x => x.game_id !== g.id); db.games = db.games.filter(x => x.id !== g.id); c.chapter--; return { data: null, error: null };
  },
  campaign_next_chapter({ p_campaign }) {
    const c = campOf(p_campaign);
    if (c.owner_id !== me) return err('Solo el creador puede pasar al siguiente capítulo');
    if (c.chapter >= c.num_missions) return err('Ya se han jugado todas las misiones: cierra la campaña');
    if (db.games.find(g => g.campaign_id === c.id && g.position === c.chapter).status !== 'finished') return err('Termina antes la partida de la misión ' + c.chapter);
    return { data: makeChapter(c, c.chapter + 1), error: null };
  },
  campaign_finish({ p_campaign, p_winners }) {
    const c = campOf(p_campaign);
    if (c.owner_id !== me) return err('Solo el creador puede cerrar la campaña');
    if (c.chapter < c.num_missions || db.games.find(g => g.campaign_id === c.id && g.position === c.chapter).status !== 'finished') return err('Faltan misiones por jugar');
    c.status = 'finished'; c.winner_id = p_winners.length === 1 ? p_winners[0] : null; c.settings = { winners: p_winners }; return { data: null, error: null };
  },
  campaign_adjust_gold({ p_campaign, p_user, p_delta, p_reason }) {
    const c = campOf(p_campaign);
    if (c.status !== 'active') return err('La campaña no está en curso');
    if (me !== c.owner_id && me !== p_user) return err('Solo puedes cambiar el fondo de tu banda (o el creador el de cualquiera)');
    const cp = db.campaign_players.find(p => p.campaign_id === c.id && p.user_id === p_user);
    if (cp.gold + p_delta < 0) return err('No hay fondos suficientes');
    cp.gold += p_delta; db.campaign_ledger.push({ id: ++seq, campaign_id: c.id, user_id: p_user, actor_id: me, chapter: c.chapter, delta: p_delta, balance: cp.gold, reason: p_reason });
    return { data: cp.gold, error: null };
  },
  campaign_buy_trait({ p_campaign, p_unit, p_trait, p_level, p_cost }) {
    const c = campOf(p_campaign); const g = db.games.find(x => x.campaign_id === c.id && x.position === c.chapter);
    const cp = db.campaign_players.find(p => p.campaign_id === c.id && p.user_id === me);
    if (g.status === 'active') return err('Los PV se gastan antes o después de la batalla, no durante');
    const u = cp.band_snapshot.units[p_unit]; if (!u) return err('Esa miniatura no existe');
    const cur = (u.rasgos_campana || {})[p_trait] || 0; if (p_level !== cur + 1) return err('Debes comprar los niveles en orden (ahora toca el nivel ' + (cur + 1) + ')');
    let earned = 0; db.games.filter(x => x.campaign_id === c.id && x.status === 'finished').forEach(x => { const y = db.game_players.find(z => z.game_id === x.id && z.user_id === me); if (y) earned += y.vp; });
    const bal = earned - db.campaign_vp_log.filter(l => l.user_id === me).reduce((t, l) => t + l.cost, 0);
    if (bal < p_cost) return err('No tienes PV suficientes (' + bal + ' disponibles)');
    u.rasgos_campana = Object.assign({}, u.rasgos_campana, { [p_trait]: p_level });
    db.campaign_vp_log.push({ id: ++seq, campaign_id: c.id, user_id: me, chapter: c.chapter, unit_index: p_unit, trait: p_trait, level: p_level, cost: p_cost });
    if (g.status === 'draft') db.game_players.find(x => x.game_id === g.id && x.user_id === me).band_snapshot = cp.band_snapshot;
    return { data: bal - p_cost, error: null };
  },
  campaign_set_injury({ p_campaign, p_unit, p_injury, p_add }) {
    const c = campOf(p_campaign); const g = db.games.find(x => x.campaign_id === c.id && x.position === c.chapter);
    const cp = db.campaign_players.find(p => p.campaign_id === c.id && p.user_id === me);
    if (g.status === 'draft') {
      const gp = db.game_players.find(x => x.game_id === g.id && x.user_id === me);
      const e = gp.roster[p_unit] || {}; let l = (e.lesiones || []).filter(x => x !== p_injury); if (p_add) l.push(p_injury);
      const prev = gp.roster[p_unit];
      gp.roster[p_unit] = Object.assign({}, e, { lesiones: l, ko: l.includes('herido') });
      let credit = 0; (cp.band_snapshot.units || []).forEach((u, i) => { if (!u.temporal && ((gp.roster[i] || {}).lesiones || []).includes('herido')) credit += u.coste + (u.equipo || []).reduce((t, g) => t + g.coste, 0); });
      if ((cp.temp_spent || 0) > credit) { if (prev) gp.roster[p_unit] = prev; else delete gp.roster[p_unit]; return err('Quita antes los sustitutos temporales: ya has gastado ' + cp.temp_spent + ' GP del crédito de las miniaturas heridas'); }
    } else if (g.status === 'finished') {
      let l = (cp.injuries[p_unit] || []).filter(x => x !== p_injury); if (p_add) l.push(p_injury); cp.injuries[p_unit] = l;
    } else return err('Las lesiones se gestionan antes o después de la batalla, no durante');
    return { data: null, error: null };
  },
  campaign_set_vp({ p_game, p_vp }) {
    const g = db.games.find(x => x.id === p_game);
    if (g.status !== 'active') return err('Los PV se anotan mientras la partida está en curso');
    db.game_players.find(x => x.game_id === p_game && x.user_id === me).vp = p_vp; return { data: null, error: null };
  },
  campaign_update_band({ p_campaign, p_units, p_remap, p_delta, p_reason, p_spent = 0, p_refund = 0, p_temp = 0 }) {
    const c = campOf(p_campaign); const g = db.games.find(x => x.campaign_id === c.id && x.position === c.chapter);
    const cp = db.campaign_players.find(p => p.campaign_id === c.id && p.user_id === me);
    if (g.status !== 'draft') return err('La banda solo se gestiona antes de empezar la partida');
    if (!db.campaign_rolls.some(r => r.campaign_id === c.id && r.user_id === me && r.chapter === c.chapter && r.kind === 'merchant')) return err('Tira antes al comerciante ambulante');
    if (cp.gold + p_delta < 0) return err('No hay fondos suficientes');
    const gp = db.game_players.find(x => x.game_id === g.id && x.user_id === me); const nr = {};
    p_remap.forEach((o, i) => { if (o >= 0 && gp.roster[o]) nr[i] = gp.roster[o]; });
    let tot = 0, tmpUnits = 0, credit = 0;
    p_units.forEach((u, i) => {
      const gearSum = (u.equipo || []).reduce((t, e) => t + e.coste, 0);
      if (u.temporal) tmpUnits += u.coste; else { tot += u.coste + gearSum; if (((nr[i] || {}).lesiones || []).includes('herido')) credit += u.coste + gearSum; }
    });
    if (p_units.some(u => u.temporal)) {
      if (p_temp > credit) return err('Los sustitutos temporales (' + p_temp + ' GP) superan el crédito de las miniaturas heridas (' + credit + ' GP)');
      if (p_temp < tmpUnits) return err('Cantidad no válida');
    } else p_temp = 0;
    cp.gold += p_delta; cp.temp_spent = p_temp; cp.band_snapshot = Object.assign({}, cp.band_snapshot, { units: p_units, value: tot });
    gp.band_snapshot = cp.band_snapshot; gp.roster = nr; gp.ready = false;
    if (p_delta || p_spent || p_refund) db.campaign_ledger.push({ id: ++seq, campaign_id: c.id, user_id: me, actor_id: me, chapter: c.chapter, delta: p_delta, balance: cp.gold, reason: p_reason, spent: p_spent, refunded: p_refund });
    return { data: cp.gold, error: null };
  },
  campaign_roll({ p_campaign, p_kind, p_unit }) {
    const c = campOf(p_campaign); const g = db.games.find(x => x.campaign_id === c.id && x.position === c.chapter);
    if (c.status !== 'active') return err('La campaña no está en curso');
    let dice, result, unit = null;
    if (p_kind === 'merchant') {
      if (g.status !== 'draft') return err('El comerciante solo pasa antes de la partida');
      dice = [D()]; result = { humor: ['dificiles', 'fina', 'normal', 'normal', 'preferido', 'gran_humor'][dice[0] - 1] };
    } else if (p_kind === 'injury') {
      if (g.status !== 'finished') return err('Las lesiones se tiran cuando termina la partida');
      const gp = db.game_players.find(x => x.game_id === g.id && x.user_id === me);
      if (p_unit == null || !(gp.roster[p_unit] && gp.roster[p_unit].ko)) return err('Esa miniatura no quedó noqueada');
      dice = [D()]; const inj = ['herido', 'cojera', 'golpe_cabeza', 'ojo_morado', 'brazo_cabestrillo', 'afortunado'][dice[0] - 1]; result = { lesion: inj }; unit = p_unit;
      if (inj !== 'afortunado') { const cp = db.campaign_players.find(p => p.campaign_id === c.id && p.user_id === me); cp.injuries[p_unit] = (cp.injuries[p_unit] || []).concat(inj); }
    } else if (p_kind === 'round_event') {
      if (g.status !== 'active' || !(g.round >= 1)) return err('El evento de final de ronda se roba durante la partida, una vez empezada');
      dice = [D()]; const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; result = { card: window.__card || (ranks[(dice[0] * 2) % 13] + '♥'), round: g.round }; unit = g.round;
    } else {
      if (g.status !== 'finished') return err('Las aventuras se tiran cuando termina la partida');
      if (c.chapter >= c.num_missions) return err('Era la última misión: no hay aventura intermedia');
      dice = [D(), D(), D()]; result = { evento: dice[0] + '/' + dice[1], resolucion: Math.floor((dice[2] + 1) / 2) };
    }
    if (db.campaign_rolls.some(r => r.campaign_id === c.id && r.user_id === me && r.chapter === c.chapter && r.kind === p_kind && r.unit_index === unit)) return err('Ya has hecho esta tirada en este capítulo');
    db.campaign_rolls.push({ id: ++seq, campaign_id: c.id, user_id: me, chapter: c.chapter, kind: p_kind, unit_index: unit, dice, result });
    return { data: { dice, result }, error: null };
  }
});

window.__login = id => { me = id; authCb('SIGNED_IN', { user: { id, email: id + '@x.com' } }); };
window.__db = db;
const chan = { on() { return chan; }, subscribe() { return chan; } };
window.supabase = { createClient: () => ({
  auth: { onAuthStateChange(cb) { authCb = cb; setTimeout(() => cb('SIGNED_IN', { user: { id: 'u1', email: 'u1@x.com' } }), 0); }, signOut() {} },
  from: builder, rpc: (n, a) => Promise.resolve(rpc[n](a)), channel: () => chan, removeChannel() {}
}) };
