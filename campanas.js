// Campañas: varias misiones (cada una es una partida), fondo de GP por banda, y las tiradas
// compartidas entre partidas (comerciante, lesiones, aventuras). Los dados los tira el servidor.
(function () {
  'use strict';

  const AW = window.AW;
  if (!AW || !AW.api) return;
  const { state, esc, toast, translateError, shell, inputCls, btnPrimary, btnGhost } = AW.api;

  const SEC = 'app_campaigns';
  const C = (AW.c = {});
  const cs = {
    list: null,
    loading: false,
    view: 'list', // list | new | detail
    id: null,
    camp: null, // campaña con sus jugadores
    games: [], // partidas (misiones) de la campaña
    rolls: [],
    ledger: [],
    vplog: [],
    finishing: false,
    tab: 'mision', // mision | jugadores | caja | historial | ajustes
    userId: null,
    pendingCode: null,
    channel: null
  };

  AW.navItems.push([SEC, '🏕️', 'Campañas']);
  AW.views[SEC] = viewCampaigns;

  try {
    const code = new URLSearchParams(location.search).get('campana');
    if (code) {
      cs.pendingCode = code.trim();
      currentSectionId = SEC;
    }
  } catch (e) {
    /* sin parámetros */
  }

  const T = () => (typeof datosCampanaTablas !== 'undefined' ? datosCampanaTablas : { humor_comerciante: {}, lesiones: {}, aventuras: {} });

  /* ------------------------------------------------------------------ datos */
  const SEL_LIST = '*, owner:profiles!owner_id(display_name), campaign_players(user_id)';
  const SEL_ONE =
    '*, owner:profiles!owner_id(display_name), campaign_players(user_id, band_id, band_snapshot, gold, injuries, joined_at, profiles(display_name))';
  const SEL_GAMES = '*, game_players(user_id, band_snapshot, vp, ready, roster, profiles(display_name))';

  async function loadList() {
    cs.loading = true;
    const { data, error } = await state.sb.from('campaigns').select(SEL_LIST).order('created_at', { ascending: false });
    cs.loading = false;
    if (error) toast('No se pudieron cargar las campañas: ' + translateError(error), 'error');
    cs.list = error ? cs.list || [] : data || [];
  }

  async function loadOne(id) {
    const [c, g, r, l, v] = await Promise.all([
      state.sb.from('campaigns').select(SEL_ONE).eq('id', id).maybeSingle(),
      state.sb.from('games').select(SEL_GAMES).eq('campaign_id', id).order('position', { ascending: true }),
      state.sb.from('campaign_rolls').select('*').eq('campaign_id', id).order('id', { ascending: true }),
      state.sb.from('campaign_ledger').select('*').eq('campaign_id', id).order('id', { ascending: true }),
      state.sb.from('campaign_vp_log').select('*').eq('campaign_id', id).order('id', { ascending: true })
    ]);
    const err = c.error || g.error || r.error || l.error || v.error;
    if (err) {
      toast('No se pudo cargar la campaña: ' + translateError(err), 'error');
      return null;
    }
    if (id === cs.id) {
      cs.camp = c.data;
      cs.games = g.data || [];
      cs.rolls = r.data || [];
      cs.ledger = l.data || [];
      cs.vplog = v.data || [];
    }
    return c.data;
  }

  function rerender(keep) {
    if (currentSectionId === SEC) AW.api.render(keep === true);
  }

  /* ------------------------------------------------------------ tiempo real */
  function unsubscribe() {
    if (cs.channel) {
      try {
        state.sb.removeChannel(cs.channel);
      } catch (e) {
        /* nada */
      }
      cs.channel = null;
    }
  }

  function subscribe(id) {
    unsubscribe();
    let timer = null;
    const soft = () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        if (cs.id !== id || cs.view !== 'detail') return;
        await loadOne(id);
        const typing = document.activeElement && /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName);
        if (!typing) rerender(true);
      }, 300);
    };
    try {
      cs.channel = state.sb
        .channel('camp-' + id)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'campaigns', filter: 'id=eq.' + id }, soft)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'campaign_players', filter: 'campaign_id=eq.' + id }, soft)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'campaign_rolls', filter: 'campaign_id=eq.' + id }, soft)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'campaign_ledger', filter: 'campaign_id=eq.' + id }, soft)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'games', filter: 'campaign_id=eq.' + id }, soft)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'campaign_vp_log', filter: 'campaign_id=eq.' + id }, soft)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'game_players' }, (pl) => {
          // game_players no se puede filtrar por campaña: solo se recarga si es una partida de esta campaña
          const gid = (pl.new && pl.new.game_id) || (pl.old && pl.old.game_id);
          if (!gid || cs.games.some((g) => g.id === gid)) soft();
        })
        .subscribe();
    } catch (e) {
      cs.channel = null;
    }
  }

  /* ----------------------------------------------------------------- sesión */
  function resetState() {
    unsubscribe();
    cs.list = null;
    cs.camp = null;
    cs.games = [];
    cs.rolls = [];
    cs.ledger = [];
    cs.vplog = [];
    cs.id = null;
    cs.view = 'list';
    cs.finishing = false;
  }

  AW.hooks.userChanged.push(async (user) => {
    const id = user ? user.id : null;
    if (id !== cs.userId) resetState();
    cs.userId = id;
    if (!user) return;
    await loadList();
    if (cs.pendingCode) {
      const code = cs.pendingCode;
      cs.pendingCode = null;
      try {
        history.replaceState(null, '', location.pathname);
      } catch (e) {
        /* nada */
      }
      await joinByCode(code);
    } else {
      rerender(true);
    }
  });

  /* ------------------------------------------------------------------ vistas */
  const STATUS = {
    draft: ['En preparación', 'bg-amber-500/10 text-amber-400 border-amber-500/20'],
    active: ['En curso', 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'],
    finished: ['Terminada', 'bg-slate-500/10 text-slate-300 border-slate-500/20']
  };
  const badge = (s) =>
    '<span class="text-xs border px-2 py-0.5 rounded-md font-semibold whitespace-nowrap ' + STATUS[s][1] + '">' + STATUS[s][0] + '</span>';
  const pname = AWUtil.pname;
  const gpFmt = AWUtil.gpFmt;

  function viewCampaigns() {
    if (!state.user) {
      return shell(
        'Campañas',
        'Varias misiones seguidas, con fondo de GP, comerciante y aventuras entre partidas',
        '<div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md">' +
          (cs.pendingCode ? '<p class="text-emerald-400 mb-3">Te han invitado a una campaña. Inicia sesión y te apuntamos automáticamente.</p>' : '') +
          '<p class="text-slate-300 mb-4">Necesitas una cuenta para crear o unirte a campañas.</p>' +
          '<button onclick="AW.go(\'app_account\')" class="' + btnPrimary + '">Iniciar sesión</button></div>'
      );
    }
    if (cs.list === null && !cs.loading) loadList().then(() => rerender(true));
    if (cs.view === 'new') return viewNew();
    if (cs.view === 'detail') return viewDetail();
    return viewList();
  }

  function viewList() {
    let cards;
    if (cs.list === null) cards = '<p class="text-slate-500">Cargando campañas...</p>';
    else if (!cs.list.length)
      cards = '<div class="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-8 text-center text-slate-400">Aún no tienes campañas. Crea una o únete con un código.</div>';
    else
      cards =
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
        cs.list
          .map((c) => {
            const mine = c.owner_id === state.user.id;
            return (
              '<article onclick="AW.c.open(\'' + c.id + '\')" class="cursor-pointer bg-slate-950 rounded-xl p-5 border border-slate-800/60 hover:border-emerald-500/50 transition-colors">' +
              '<div class="flex items-start justify-between gap-3"><h5 class="text-lg font-bold text-white">' + esc(c.name) + '</h5>' + badge(c.status) + '</div>' +
              '<p class="text-sm text-slate-400 mt-1">' + c.num_missions + ' misiones · banda hasta ' + c.max_value + ' GP · ' + (c.campaign_players || []).length + ' jugadores</p>' +
              (c.status === 'active' ? '<p class="text-sm text-emerald-400 mt-1">Misión ' + c.chapter + ' de ' + c.num_missions + '</p>' : '') +
              '<p class="text-xs text-slate-600 mt-2">' + (mine ? 'Creada por ti' : 'Creada por ' + esc(c.owner ? c.owner.display_name : '—')) + '</p></article>'
            );
          })
          .join('') +
        '</div>';
    const inner =
      '<div class="flex flex-wrap gap-3 items-end mb-6">' +
      '<button onclick="AW.c.showNew()" class="' + btnPrimary + '">+ Nueva campaña</button>' +
      '<form onsubmit="AW.c.join(event)" class="flex gap-2 items-end ml-auto">' +
      '<div><label class="block text-xs text-slate-400 mb-1">¿Tienes un código?</label><input name="code" required maxlength="40" placeholder="Código de invitación" class="' + inputCls + '"></div>' +
      '<button type="submit" class="' + btnGhost + '">Unirme</button></form></div>' +
      cards;
    return shell('Campañas', 'Tus campañas y las que te han invitado', inner);
  }

  function viewNew() {
    const inner =
      '<form onsubmit="AW.c.create(event)" class="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 max-w-xl">' +
      '<div><label class="block text-xs text-slate-400 mb-1">Nombre de la campaña</label><input name="name" required maxlength="80" class="' + inputCls + '"></div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">' +
      '<div><label class="block text-xs text-slate-400 mb-1">Número de misiones</label><input name="missions" type="number" min="1" max="12" step="1" value="3" required class="' + inputCls + '"></div>' +
      '<div><label class="block text-xs text-slate-400 mb-1">Valor máximo de banda (GP)</label><input name="max" type="number" min="1" step="1" value="500" required class="' + inputCls + '"></div>' +
      '<div><label class="block text-xs text-slate-400 mb-1">Presupuesto inicial por banda (GP)</label><input name="gold" type="number" min="0" step="1" value="100" required class="' + inputCls + '"></div></div>' +
      '<p class="text-xs text-slate-500">Cada misión es una partida. El presupuesto es el dinero con el que empieza cada banda: al elegir banda se le descuenta su valor, y lo que queda (el fondo) sube o baja con compras, ventas, premios y eventos.</p>' +
      '<label class="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" name="plays" checked class="accent-emerald-500"> Yo también juego esta campaña</label>' +
      '<div class="pt-2 flex gap-3"><button type="submit" class="' + btnPrimary + '">Crear campaña</button>' +
      '<button type="button" onclick="AW.c.back()" class="' + btnGhost + '">Cancelar</button></div></form>';
    return shell('Nueva campaña', 'Después podrás invitar a los jugadores con un código o un enlace', inner);
  }

  /* ---- ayudas de la vista de detalle ---- */
  const gameOf = (n) => cs.games.find((g) => g.position === n) || null;
  const rollsOf = (chapter, kind) => cs.rolls.filter((r) => r.chapter === chapter && r.kind === kind);

  function diceHtml(dice) {
    return (dice || []).map((d) => '<span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-800 border border-slate-600 text-white font-bold text-sm">' + d + '</span>').join(' ');
  }

  function describeRoll(r) {
    const t = T();
    if (r.kind === 'merchant') {
      const h = t.humor_comerciante[r.result.humor];
      return h ? '<strong class="text-amber-300">' + esc(h.nombre) + '</strong> <span class="text-slate-400">— ' + esc(h.texto) + '</span>' : '—';
    }
    if (r.kind === 'injury') {
      const l = t.lesiones[r.result.lesion];
      return l ? '<strong class="text-rose-300">' + esc(l.nombre) + '</strong> <span class="text-slate-400">— ' + esc(l.texto) + '</span>' : '—';
    }
    if (r.kind === 'round_event') {
      const g = cs.games.find((x) => x.position === r.chapter);
      return AW.g && AW.g.cardEventHtml ? AW.g.cardEventHtml(r.result.card, g && g.arcdeck_env) : esc(r.result.card);
    }
    const ev = t.aventuras[r.result.evento];
    const txt = ev ? ev.resultados[String(r.result.resolucion)] : '';
    return ev
      ? '<strong class="text-emerald-300">' + esc(ev.nombre) + '</strong> <span class="text-slate-500">(' + esc(r.result.evento) + ', resolución ' + ['1-2', '3-4', '5-6'][r.result.resolucion - 1] + ')</span><br><span class="text-slate-300">' + esc(txt) + '</span>'
      : '—';
  }

  function playerRollRow(p, roll, canRoll, kind, label) {
    return (
      '<div class="flex flex-wrap items-start gap-3 py-2 border-b border-slate-800/60 last:border-0">' +
      '<span class="w-32 shrink-0 text-sm font-semibold text-slate-200">' + esc(pname(p)) + (p.user_id === state.user.id ? ' <span class="text-emerald-400 font-normal">(tú)</span>' : '') + '</span>' +
      (roll
        ? '<span class="shrink-0">' + diceHtml(roll.dice) + '</span><span class="text-sm flex-1 min-w-[12rem]">' + describeRoll(roll) + '</span>'
        : canRoll && p.user_id === state.user.id
          ? '<button onclick="AW.c.roll(\'' + kind + '\')" class="' + btnPrimary + ' !py-1.5 !px-3 text-sm">🎲 ' + label + '</button>'
          : '<span class="text-sm text-slate-600 italic">pendiente</span>') +
      '</div>'
    );
  }

  function step(n, title, done, inner, open) {
    return (
      '<details id="cstep-' + n + '" class="bg-slate-950 border ' + (done ? 'border-emerald-900/60' : 'border-slate-800/60') + ' rounded-xl"' + (open ? ' open' : '') + '>' +
      '<summary class="cursor-pointer px-4 py-3 flex items-center gap-3 text-white font-semibold"><span class="w-6 h-6 rounded-full text-xs flex items-center justify-center ' +
      (done ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300') + '">' + (done ? '✓' : n) + '</span>' + title + '</summary>' +
      '<div class="px-4 pb-4 pt-1">' + inner + '</div></details>'
    );
  }

  const mineOf = () => (cs.camp && cs.camp.campaign_players || []).find((p) => p.user_id === state.user.id) || null;
  function myHumor(n) {
    const r = rollsOf(n, 'merchant').find((x) => x.user_id === state.user.id);
    return r ? T().humor_comerciante[r.result.humor] || null : null;
  }
  const pct = AWUtil.pct;

  // Cuánto cuestan los cambios respecto a la banda anterior, con los precios del comerciante de este jugador
  function bandChange(orig, units, humor) {
    const buy = 1 + ((humor && humor.compra) || 0) / 100;
    const sell = 1 + ((humor && humor.venta) || 0) / 100;
    const key = (g) => g.origen + ':' + g.id;
    const used = {};
    let spend = 0, refund = 0;
    const lines = [];
    const gearBuy = (g, who) => { const c = Math.round((Number(g.coste) || 0) * buy); spend += c; lines.push({ t: 'Compra', n: g.nombre + (who ? ' (' + who + ')' : ''), c }); };
    const gearSell = (g, who) => { const c = Math.round((Number(g.coste) || 0) * sell); refund += c; lines.push({ t: 'Venta', n: g.nombre + (who ? ' (' + who + ')' : ''), c }); };
    units.forEach((u) => {
      const o = u._o != null ? orig[u._o] : null;
      const gear = u.equipo || [];
      if (o) {
        used[u._o] = true;
        const oldG = o.equipo || [];
        const dc = (Number(u.coste) || 0) - (Number(o.coste) || 0);
        if (dc > 0) { spend += dc; lines.push({ t: 'Ajuste', n: u.nombre, c: dc }); }
        else if (dc < 0) { refund += -dc; lines.push({ t: 'Ajuste', n: u.nombre, c: dc }); }
        gear.filter((g) => !oldG.some((x) => key(x) === key(g))).forEach((g) => gearBuy(g, u.nombre));
        oldG.filter((g) => !gear.some((x) => key(x) === key(g))).forEach((g) => gearSell(g, u.nombre));
      } else {
        const c = Number(u.coste) || 0;
        spend += c;
        lines.push({ t: 'Fichaje', n: u.nombre, c });
        gear.forEach((g) => gearBuy(g, u.nombre));
      }
    });
    orig.forEach((o, i) => {
      if (used[i]) return;
      const c = Number(o.coste) || 0;
      refund += c;
      lines.push({ t: 'Baja', n: o.nombre, c });
      (o.equipo || []).forEach((g) => gearSell(g, o.nombre));
    });
    return { spend, refund, net: spend - refund, lines };
  }

  // PV: ganados en misiones terminadas menos los gastados en rasgos
  function vpBalance(uid) {
    let earned = 0;
    cs.games.filter((g) => g.status === 'finished').forEach((g) => {
      const x = (g.game_players || []).find((y) => y.user_id === uid);
      if (x) earned += Number(x.vp) || 0;
    });
    const spent = cs.vplog.filter((l) => l.user_id === uid).reduce((t, l) => t + l.cost, 0);
    return { earned, spent, left: earned - spent };
  }
  const LESIONES = ['herido', 'cojera', 'golpe_cabeza', 'ojo_morado', 'brazo_cabestrillo'];

  // Panel del paso 3: gastar PV en rasgos de campaña y gestionar lesiones de cada miniatura
  function spoilsPanel(snap, rosterOf, vp) {
    const traits = window.AWTraits ? AWTraits.list() : [];
    const t = T();
    const units = (snap && snap.units) || [];
    if (!units.length) return '';
    let h = '<div class="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800"><p class="text-sm font-semibold text-white">⭐ Puntos de victoria y secuelas</p>' +
      '<p class="text-sm text-slate-300 mt-1">PV disponibles: <strong class="text-amber-400">' + vp.left + '</strong> <span class="text-slate-500">(ganados ' + vp.earned + ' − gastados ' + vp.spent + ')</span></p>' +
      '<p class="text-xs text-slate-500 mb-2">Compra niveles de habilidades de campaña para tus miniaturas (en orden: N1, N2...) y ajusta sus lesiones. Los PV se anotan en el paso 4 de cada misión (el MVP suma sus D3 PV a mano).</p><div class="space-y-2">';
    units.forEach((u, i) => {
      const rc = u.rasgos_campana || {};
      const les = ((rosterOf && rosterOf[i] && rosterOf[i].lesiones) || []).filter((x) => LESIONES.indexOf(x) >= 0);
      const opts = traits.map((tr) => {
        const next = (Number(rc[tr.id]) || 0) + 1;
        const lv = tr.niveles.find((x) => x.n === next);
        if (!lv) return '';
        return '<option value="' + tr.id + '"' + (lv.coste > vp.left ? ' disabled' : '') + '>' + esc(tr.nombre) + ' N' + next + ' · ' + lv.coste + ' VP</option>';
      }).join('');
      h += '<div class="rounded-lg bg-slate-950 border border-slate-800/70 p-3"><p class="font-semibold text-slate-100 text-sm">' + esc(u.nombre) + '</p>' +
        '<div class="flex flex-wrap gap-1.5 mt-1.5">' +
        Object.keys(rc).map((id) => { const tr = window.AWTraits && AWTraits.find(id); const lv = tr && tr.niveles.find((x) => x.n === rc[id]); return '<span title="' + esc(lv ? lv.texto : '') + '" class="text-xs px-2 py-0.5 rounded-md border bg-amber-500/10 border-amber-500/30 text-amber-300">⭐ ' + esc(tr ? tr.nombre : id) + ' N' + rc[id] + '</span>'; }).join('') +
        les.map((id) => '<span class="text-xs px-2 py-0.5 rounded-md border bg-rose-950/40 border-rose-800/50 text-rose-200">🤕 ' + esc((t.lesiones[id] || {}).nombre || id) + ' <button onclick="AW.c.setInjury(' + i + ',\'' + id + '\',false)" title="Quitar" aria-label="Quitar lesión" class="ml-1 px-1.5 py-0.5 text-rose-300 hover:text-white">×</button></span>').join('') +
        '</div><div class="flex flex-wrap gap-2 mt-2">' +
        '<select onchange="AW.c.buyTrait(' + i + ',this.value);this.value=\'\'" class="' + inputCls + ' sm:w-auto"><option value="">Comprar habilidad con PV…</option>' + opts + '</select>' +
        '<select onchange="AW.c.setInjury(' + i + ',this.value,true);this.value=\'\'" class="' + inputCls + ' sm:w-auto"><option value="">Añadir lesión…</option>' +
        LESIONES.filter((id) => les.indexOf(id) < 0).map((id) => '<option value="' + id + '">' + esc((t.lesiones[id] || {}).nombre || id) + '</option>').join('') + '</select></div></div>';
    });
    return h + '</div></div>';
  }

  function eventsOf(g) {
    return typeof AW.g.eventsHtml === 'function' ? AW.g.eventsHtml(g) : '';
  }

  function chapterCard(c, n, players) {
    const g = gameOf(n);
    const isCur = c.chapter === n;
    const me = state.user.id;
    const gStatus = g ? g.status : null;
    let html =
      '<section class="mb-4 rounded-2xl border ' + (isCur && c.status === 'active' ? 'border-emerald-700/60 bg-slate-900' : 'border-slate-800 bg-slate-900/50') + ' overflow-hidden">' +
      '<div class="px-5 py-3 flex flex-wrap items-center gap-3 border-b border-slate-800">' +
      '<h4 class="text-lg font-bold text-white">Misión ' + n + '</h4>' +
      (g ? badge(g.status) : '<span class="text-xs text-slate-500">Sin empezar</span>') +
      (g ? '<button onclick="AW.c.openGame(\'' + g.id + '\')" class="' + btnGhost + ' ml-auto !py-1.5 text-sm">Abrir partida →</button>' : '') +
      '</div>';
    if (!g) return html + '<p class="px-5 py-4 text-slate-500 text-sm">Se creará al terminar la misión anterior.</p></section>';

    const sc = AW.g && AW.g.scenarioName ? AW.g.scenarioName(g.scenario_id) : null;
    const gp = g.game_players || [];
    const asCamp = (uid) => players.find((p) => p.user_id === uid) || { user_id: uid, profiles: null };
    const rows = (kind, can, label) =>
      players.map((p) => playerRollRow(p, rollsOf(n, kind).find((r) => r.user_id === p.user_id), can, kind, label)).join('');

    const winners = (g.victory && g.victory.winners) || [];
    let steps = '';

    // 1. Escenario
    const canPick = g.status === 'draft' && c.status === 'active' && c.owner_id === me && AW.g && AW.g.scenarioOptions;
    steps += step(1, 'Escenario', !!g.scenario_id,
      (canPick
        ? '<div class="flex flex-wrap gap-2 mb-3"><select onchange="AW.c.setScenario(this.value)" class="' + inputCls + ' sm:w-auto"><option value="">Sin elegir</option>' + AW.g.scenarioOptions(g.scenario_id) + '</select>' +
          '<button onclick="AW.c.randomScenario()" class="' + btnGhost + '">🎲 Sortear</button></div>'
        : '') +
      '<p class="text-sm text-slate-300">' + (sc ? esc(sc) : 'Todavía no hay escenario elegido.') + '</p>' +
      (!canPick && g.status === 'draft' && !g.scenario_id ? '<p class="text-xs text-slate-500 mt-1">Lo elige el creador de la campaña.</p>' : ''), isCur && !g.scenario_id);

    // 2. Comerciante (antes de la partida)
    const mRolls = rollsOf(n, 'merchant');
    steps += step(2, 'El comerciante ambulante (1D6)', mRolls.length >= players.length && players.length > 0,
      '<p class="text-xs text-slate-500 mb-2">Cada jugador tira antes de la partida; el resultado fija los precios de compra y venta de ese jugador. Todos ven las tiradas.</p>' +
      rows('merchant', c.status === 'active' && isCur && gStatus === 'draft', 'Tirar 1D6'), isCur && gStatus === 'draft');

    // 3. Preparar banda
    const mineP = players.find((p) => p.user_id === me);
    const hum = myHumor(n);
    let prep =
      '<p class="text-xs text-slate-500 mb-2">Banda y fondo de cada jugador ahora mismo:</p>' +
      '<div class="flex flex-wrap gap-3">' + players.map((p) => '<span class="text-sm bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5">' + esc(pname(p)) + ': banda <strong class="text-slate-200">' + (p.band_snapshot ? (Number(p.band_snapshot.value) || 0) : 0) + ' GP</strong> · fondo <strong class="text-amber-400">' + gpFmt(p.gold) + '</strong></span>').join('') + '</div>';
    if (mineP && c.status === 'active' && isCur) {
      if (gStatus === 'draft') {
        prep += hum
          ? '<div class="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-300">Tu comerciante: <strong class="text-amber-300">' + esc(hum.nombre) + '</strong> · compras ' + pct(hum.compra) + ', ventas ' + pct(hum.venta) +
            '<div class="mt-2"><button onclick="AW.c.editBand()" class="' + btnPrimary + ' !py-1.5 text-sm">🛒 Comprar / vender y gestionar mi banda</button></div></div>'
          : '<p class="mt-3 text-sm text-amber-300">Tira antes al comerciante (paso 2) para poder comprar y vender.</p>';
        const myGp = gp.find((x) => x.user_id === me);
        prep += spoilsPanel(mineP.band_snapshot, myGp && myGp.roster, vpBalance(me));
        prep += '<p class="text-xs text-slate-500 mt-2">Lo que compres se descuenta de tu fondo y lo que vendas se suma. Al cambiar tu banda tendrás que volver a dar tu OK en la partida.</p>';
      } else {
        prep += '<p class="text-xs text-slate-500 mt-2">La partida ya ha empezado: la banda queda cerrada hasta la próxima misión.</p>';
      }
    }
    steps += step(3, 'Preparar la banda (comerciante)', gStatus !== 'draft', prep, isCur && gStatus === 'draft');

    // 4. Batalla, PV y eventos de final de ronda
    const eRolls = rollsOf(n, 'round_event');
    const canAct = c.status === 'active' && isCur && gStatus === 'active';
    let battle =
      '<p class="text-sm text-slate-300">' + (gStatus === 'draft' ? 'La partida aún no ha empezado: hace falta que todos den su OK.' : gStatus === 'active' ? 'En curso, ronda ' + (g.round || 0) + '.' : 'Terminada.') +
      (gStatus === 'finished' ? (winners.length ? ' Ganó: <strong>' + esc(winners.map((u) => pname(asCamp(u))).join(', ')) + '</strong>.' : ' Sin ganador declarado.') : '') + '</p>';
    if (gStatus !== 'draft') {
      battle += '<div class="mt-3 space-y-3">' + gp.map((x) => {
        const mineRow = x.user_id === me;
        const mine = eRolls.filter((r) => r.user_id === x.user_id).sort((a, b) => b.unit_index - a.unit_index);
        const done = mine.some((r) => r.unit_index === g.round);
        return '<div class="bg-slate-900 border border-slate-800 rounded-xl p-3">' +
          '<div class="flex flex-wrap items-center gap-3"><span class="font-semibold text-white">' + esc(pname(x)) + (mineRow ? ' <span class="text-xs text-emerald-400 font-normal">(tú)</span>' : '') + '</span>' +
          (mineRow && canAct
            ? '<label class="text-sm text-slate-400">PV <input type="number" min="0" max="999" step="1" value="' + x.vp + '" onchange="AW.c.setVp(\'' + g.id + '\',this.value)" class="' + inputCls + ' w-20 inline-block"></label>'
            : '<strong class="text-amber-400">' + x.vp + ' PV</strong>') +
          (mineRow && canAct && (g.round || 0) >= 1
            ? (done ? '<span class="text-xs text-slate-500">Ya has robado tu evento de la ronda ' + g.round + '</span>'
                    : '<button onclick="AW.c.roll(\'round_event\')" class="' + btnPrimary + ' !py-1.5 !px-3 text-sm ml-auto">🃏 Evento de final de ronda ' + g.round + '</button>')
            : '') + '</div>' +
          (mine.length ? '<div class="mt-3 space-y-3">' + mine.map((r) => '<div class="border-t border-slate-800/60 pt-3"><p class="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">Ronda ' + r.unit_index + '</p>' + describeRoll(r) + '</div>').join('') + '</div>' : '') +
          '</div>';
      }).join('') + '</div>';
      if (canAct && (g.round || 0) < 1) battle += '<p class="text-xs text-slate-500 mt-2">Cuando el creador pulse "Final de ronda" en la partida podréis robar vuestros eventos.</p>';
    }
    battle += (g.round ? '<div class="mt-3">' + eventsOf(g) + '</div>' : '');
    steps += step(4, 'La batalla, PV y eventos de final de ronda', gStatus === 'finished', battle, isCur && gStatus === 'active');

    // 5. Lesiones
    if (gStatus === 'finished') {
      const iRolls = rollsOf(n, 'injury');
      const mineGp = gp.find((x) => x.user_id === me);
      const koIdx = (x) => Object.keys(x.roster || {}).filter((k) => x.roster[k] && x.roster[k].ko).map(Number);
      const unitName = (x, i) => ((x.band_snapshot && x.band_snapshot.units) || [])[i] ? x.band_snapshot.units[i].nombre : 'Miniatura ' + (i + 1);
      let inner = '<p class="text-xs text-slate-500 mb-2">Cada miniatura noqueada tira 1D6 en la Tabla de Lesiones. Los efectos valen para la siguiente partida.</p>';
      let any = false;
      gp.forEach((x) => {
        koIdx(x).forEach((i) => {
          any = true;
          const roll = iRolls.find((r) => r.user_id === x.user_id && r.unit_index === i);
          inner +=
            '<div class="flex flex-wrap items-start gap-3 py-2 border-b border-slate-800/60 last:border-0">' +
            '<span class="w-44 shrink-0 text-sm font-semibold text-slate-200">' + esc(pname(x)) + ' · ' + esc(unitName(x, i)) + '</span>' +
            (roll
              ? '<span class="shrink-0">' + diceHtml(roll.dice) + '</span><span class="text-sm flex-1 min-w-[12rem]">' + describeRoll(roll) + '</span>'
              : x.user_id === me && c.status === 'active' && isCur
                ? '<button onclick="AW.c.roll(\'injury\',' + i + ')" class="' + btnPrimary + ' !py-1.5 !px-3 text-sm">🎲 Tirar lesión</button>'
                : '<span class="text-sm text-slate-600 italic">pendiente</span>') +
            '</div>';
        });
      });
      if (!any) inner += '<p class="text-sm text-slate-500">Ninguna miniatura quedó noqueada' + (mineGp ? ' (márcalas con "Noquear" en tu ficha durante la partida).' : '.') + '</p>';
      steps += step(5, 'Lesiones tras la batalla (1D6)', any && iRolls.length >= gp.reduce((s, x) => s + koIdx(x).length, 0), inner, isCur);
    }

    // 6. Aventura intermedia
    if (gStatus === 'finished' && n < c.num_missions) {
      const aRolls = rollsOf(n, 'adventure');
      steps += step(6, 'Aventura intermedia (2D6 + 1D6)', aRolls.length >= players.length && players.length > 0,
        '<p class="text-xs text-slate-500 mb-2">Cada jugador tira por su cuenta; el resultado lo ve todo el mundo.</p>' +
        rows('adventure', c.status === 'active' && isCur, 'Tirar aventura'), isCur);
    }

    return html + '<div class="p-4 space-y-2">' + steps + '</div></section>';
  }

  function standings(players) {
    const stat = {};
    players.forEach((p) => (stat[p.user_id] = { name: pname(p), wins: 0, vp: 0 }));
    cs.games.filter((g) => g.status === 'finished').forEach((g) => {
      ((g.victory && g.victory.winners) || []).forEach((u) => stat[u] && stat[u].wins++);
      (g.game_players || []).forEach((x) => stat[x.user_id] && (stat[x.user_id].vp += x.vp || 0));
    });
    return Object.keys(stat).map((k) => Object.assign({ user_id: k }, stat[k])).sort((a, b) => b.wins - a.wins || b.vp - a.vp);
  }

  function goldSection(c, players) {
    const me = state.user.id;
    const isOwner = c.owner_id === me;
    const active = c.status === 'active';
    const names = {};
    players.forEach((p) => (names[p.user_id] = pname(p)));
    let html =
      '<section class="mb-6"><h3 class="text-lg font-bold text-white mb-3">💰 Fondo de las bandas</h3>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">' +
      players.map((p) =>
        '<div class="bg-slate-950 border border-slate-800/60 rounded-xl p-4 flex items-center justify-between"><span class="text-slate-200 font-semibold">' + esc(pname(p)) +
        (p.user_id === me ? ' <span class="text-xs text-emerald-400 font-normal">(tú)</span>' : '') + '</span><span class="text-2xl font-bold text-amber-400">' + gpFmt(p.gold) + '</span></div>'
      ).join('') + '</div>';
    if (active) {
      html +=
        '<form onsubmit="AW.c.adjustGold(event)" class="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap gap-3 items-end">' +
        (isOwner
          ? '<div><label class="block text-xs text-slate-400 mb-1">Banda</label><select name="who" class="' + inputCls + '">' + players.map((p) => '<option value="' + p.user_id + '"' + (p.user_id === me ? ' selected' : '') + '>' + esc(pname(p)) + '</option>').join('') + '</select></div>'
          : '<input type="hidden" name="who" value="' + me + '">') +
        '<div><label class="block text-xs text-slate-400 mb-1">GP (+ ingreso, − gasto)</label><input name="delta" type="number" step="1" required class="' + inputCls + ' w-32"></div>' +
        '<div class="flex-1 min-w-[12rem]"><label class="block text-xs text-slate-400 mb-1">Motivo</label><input name="reason" required maxlength="120" placeholder="Premio de la misión, compra, evento…" class="' + inputCls + '"></div>' +
        '<button type="submit" class="' + btnPrimary + '">Anotar</button></form>';
    }
    if (cs.ledger.length) {
      html +=
        '<details class="mt-3 text-sm"><summary class="cursor-pointer text-slate-400 hover:text-white">Libro de caja (' + cs.ledger.length + ' movimientos)</summary>' +
        '<ul class="mt-2 space-y-1">' +
        cs.ledger.slice().reverse().map((l) =>
          '<li class="text-slate-400"><span class="text-slate-500">Misión ' + l.chapter + '</span> · <strong class="text-slate-200">' + esc(names[l.user_id] || 'Jugador') + '</strong> · <span class="' + (l.delta > 0 ? 'text-emerald-400' : 'text-rose-400') + ' font-semibold">' +
          (l.delta > 0 ? '+' : '') + l.delta + ' GP</span> → ' + l.balance + ' GP · ' + esc(l.reason) + '</li>'
        ).join('') + '</ul></details>';
    }
    return html + '</section>';
  }

  // Barra "qué toca ahora": dice el siguiente paso y deja pulsarlo (o muestra a quién se espera)
  function nextStep(c, players) {
    if (c.status !== 'active') return '';
    const n = c.chapter;
    const g = gameOf(n);
    if (!g) return '';
    const me = state.user.id;
    const isOwner = c.owner_id === me;
    const gp = g.game_players || [];
    const mineGp = gp.find((x) => x.user_id === me);
    const act = (label, fn) => '<button onclick="' + fn + '" class="' + btnPrimary + '">' + label + '</button>';
    const goto = (label, st) => act(label, 'AW.c.goStep(' + st + ')');
    const open = act('Abrir la partida →', "AW.c.openGame('" + g.id + "')");
    const without = (kind) => players.filter((p) => !rollsOf(n, kind).some((r) => r.user_id === p.user_id));
    const names = (l) => l.map(pname).join(', ');
    let title = '', text = '', btn = '';

    if (g.status === 'draft') {
      const noMerchant = without('merchant');
      const waiting = gp.filter((x) => !x.ready);
      if (!g.scenario_id) {
        title = isOwner ? 'Elige el escenario' : 'Esperando el escenario';
        text = isOwner ? 'Elígelo del desplegable o sortéalo.' : 'Lo elige el creador de la campaña.';
        btn = isOwner ? goto('Ir al escenario', 1) : '';
      } else if (noMerchant.some((p) => p.user_id === me)) {
        title = 'Tira al comerciante ambulante';
        text = 'Su humor fija tus precios de compra y venta.';
        btn = act('🎲 Tirar 1D6', "AW.c.roll('merchant')");
      } else if (mineGp && !mineGp.ready) {
        title = 'Prepara tu banda y da tu OK';
        text = 'Compra y vende, gasta PV y ajusta lesiones; cuando estés listo, da tu OK en la partida.';
        btn = goto('Preparar la banda', 3) + ' ' + open;
      } else if (waiting.length) {
        title = 'Esperando el OK de ' + names(waiting);
        text = noMerchant.length ? 'Faltan tiradas del comerciante: ' + names(noMerchant) + '.' : 'Cuando todos den su OK, el creador empieza la partida.';
        btn = open;
      } else {
        title = isOwner ? 'Todo listo: empieza la partida' : 'Todo listo: el creador empieza la partida';
        btn = open;
      }
    } else if (g.status === 'active') {
      const mine = rollsOf(n, 'round_event').some((r) => r.user_id === me && r.unit_index === g.round);
      title = 'Partida en curso · ronda ' + (g.round || 0);
      text = 'Anota tus PV y roba tu evento de final de ronda cuando toque.';
      btn = ((g.round || 0) >= 1 && !mine && mineGp ? act('🃏 Evento de final de ronda ' + g.round, "AW.c.roll('round_event')") + ' ' : '') + goto('Mis PV y eventos', 4) + ' ' + open;
    } else {
      const koIdx = (x) => Object.keys(x.roster || {}).filter((k) => x.roster[k] && x.roster[k].ko).map(Number);
      const myPendInj = mineGp ? koIdx(mineGp).filter((i) => !rollsOf(n, 'injury').some((r) => r.user_id === me && r.unit_index === i)).length : 0;
      const advLeft = n < c.num_missions ? without('adventure') : [];
      const injLeft = gp.filter((x) => koIdx(x).some((i) => !rollsOf(n, 'injury').some((r) => r.user_id === x.user_id && r.unit_index === i)));
      if (myPendInj) {
        title = 'Tira las lesiones de tus noqueados';
        text = 'Te faltan ' + myPendInj + ' tirada' + (myPendInj > 1 ? 's' : '') + '.';
        btn = goto('Ir a las lesiones', 5);
      } else if (advLeft.some((p) => p.user_id === me)) {
        title = 'Tira tu aventura entre partidas';
        text = '2D6 + 1D6; todos verán el resultado.';
        btn = goto('Ir a la aventura', 6);
      } else if (injLeft.length || advLeft.length) {
        title = 'Esperando a ' + names([].concat(injLeft.map((x) => ({ profiles: x.profiles })), advLeft).filter((p, k, a) => a.findIndex((q) => pname(q) === pname(p)) === k));
        text = 'Faltan tiradas de lesiones o aventuras.';
      } else if (isOwner) {
        title = n < c.num_missions ? 'Todo hecho: pasa a la misión ' + (n + 1) : 'Todo hecho: cierra la campaña';
        text = 'Si quieres, antes compra rasgos con PV o ajusta bandas en la siguiente misión.';
      } else {
        title = 'Todo hecho: espera al creador';
        text = (n < c.num_missions ? 'El creador debe pasar a la misión ' + (n + 1) : 'El creador debe cerrar la campaña') + '.';
      }
    }
    return '<div class="mb-4 p-4 rounded-2xl border border-emerald-700/50 bg-emerald-950/20" role="status">' +
      '<p class="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Siguiente paso</p>' +
      '<p class="text-white font-bold mt-0.5">' + esc(title) + '</p>' +
      (text ? '<p class="text-sm text-slate-300 mt-0.5">' + esc(text) + '</p>' : '') +
      (btn ? '<div class="mt-3 flex flex-wrap gap-2">' + btn + '</div>' : '') + '</div>';
  }

  function viewDetail() {
    const c = cs.camp;
    const back = '<button onclick="AW.c.back()" class="text-sm text-slate-400 hover:text-white mb-4">← Todas las campañas</button>';
    if (!c) return shell('Campaña', 'Cargando...', back + '<p class="text-slate-500">Cargando campaña...</p>');

    const me = state.user.id;
    const isOwner = c.owner_id === me;
    const players = (c.campaign_players || []).slice().sort((a, b) => String(a.joined_at).localeCompare(String(b.joined_at)));
    const mine = players.find((p) => p.user_id === me);
    const winners = (c.settings && c.settings.winners) || [];
    let html = back;

    html +=
      '<div class="flex flex-wrap items-center gap-3 mb-6">' + badge(c.status) +
      '<span class="text-amber-400 font-semibold">banda hasta ' + c.max_value + ' GP</span>' +
      '<span class="text-slate-300">🏁 ' + c.num_missions + ' misiones</span>' +
      (c.status === 'active' ? '<span class="text-emerald-400 font-semibold">Misión ' + c.chapter + ' de ' + c.num_missions + '</span>' : '') +
      '<span class="text-slate-300">👥 ' + players.length + '</span>' +
      '<span class="text-sm text-slate-500">Creada por ' + (isOwner ? 'ti' : esc(c.owner ? c.owner.display_name : '—')) + '</span>' +
      '<button onclick="AW.c.refresh()" class="' + btnGhost + ' ml-auto">↻ Actualizar</button></div>';

    if (c.status === 'finished') {
      const names = players.filter((p) => winners.indexOf(p.user_id) >= 0).map(pname);
      html += '<div class="mb-6 p-4 rounded-xl border border-amber-700/40 bg-amber-950/20 text-amber-200">🏆 ' +
        (names.length ? (names.length > 1 ? 'Empate entre ' : 'Ganador de la campaña: ') + '<strong>' + esc(names.join(', ')) + '</strong>' : 'Campaña terminada sin ganador declarado') + '</div>';
    }

    if (c.status === 'draft') {
      const link = location.origin + location.pathname + '?campana=' + c.join_code;
      html +=
        '<section class="mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-5"><h3 class="text-lg font-bold text-white mb-1">Invitar jugadores</h3>' +
        '<p class="text-sm text-slate-400 mb-3">Comparte el código o el enlace. Cada jugador elige su banda (hasta ' + c.max_value + ' GP) y empieza con ' + gpFmt(c.starting_gold) + ' de presupuesto: el valor de su banda se descuenta de ahí.</p>' +
        '<div class="flex flex-wrap gap-2 items-center"><code class="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-300 select-all">' + esc(c.join_code) + '</code>' +
        '<button onclick="AW.c.copy(\'' + esc(c.join_code) + '\')" class="' + btnGhost + '">Copiar código</button>' +
        '<button onclick="AW.c.copy(\'' + esc(link) + '\')" class="' + btnGhost + '">Copiar enlace</button></div></section>';
    }

    /* jugadores y bandas */
    let playersHtml = '<section class="mb-6"><h3 class="text-lg font-bold text-white mb-3">Jugadores (' + players.length + ')</h3><div class="space-y-3">';
    if (!players.length) playersHtml += '<p class="text-slate-500">Todavía no se ha apuntado nadie.</p>';
    players.forEach((p) => {
      const b = p.band_snapshot;
      playersHtml +=
        '<article class="bg-slate-950 rounded-xl p-5 border border-slate-800/60"><div class="flex flex-wrap items-center justify-between gap-3">' +
        '<h4 class="text-base font-bold text-white">' + esc(pname(p)) + (p.user_id === me ? ' <span class="text-xs text-emerald-400 font-normal">(tú)</span>' : '') +
        (p.user_id === c.owner_id ? ' <span class="text-xs text-slate-500 font-normal">creador</span>' : '') + '</h4>' +
        '<span class="text-amber-400 font-bold">' + gpFmt(p.gold) + '</span></div>' +
        '<div class="mt-3">' + (b
          ? '<details class="text-sm"><summary class="cursor-pointer text-slate-300"><span class="font-semibold text-white">' + esc(b.name) + '</span>' + (b.faction ? ' · ' + esc(b.faction) : '') + ' · <span class="text-slate-400">' + (Number(b.value) || 0) + ' GP</span></summary><div class="mt-3 space-y-2">' +
            (AW.sheet ? AW.sheet.bandSheet(b.units || [], null, { faction: b.faction }) : '') + '</div></details>'
          : '<p class="text-sm text-slate-500 italic">Aún no ha elegido banda</p>') + '</div>';
      if (p.user_id === me && c.status === 'draft') playersHtml += bandPicker(c, p);
      playersHtml += '</article>';
    });
    playersHtml += '</div></section>';

    /* clasificación */
    let standHtml = '';
    if (c.status !== 'draft' && cs.games.some((g) => g.status === 'finished')) {
      standHtml = '<section class="mb-6"><h3 class="text-lg font-bold text-white mb-3">Clasificación</h3><div class="bg-slate-950 border border-slate-800/60 rounded-xl overflow-hidden"><table class="w-full text-sm"><thead class="text-slate-400 text-left"><tr><th class="px-4 py-2">Jugador</th><th class="px-4 py-2">Victorias</th><th class="px-4 py-2">PV</th></tr></thead><tbody>' +
        standings(players).map((x, k) => '<tr class="border-t border-slate-800/60"><td class="px-4 py-2 text-slate-200">' + (k === 0 ? '🥇 ' : '') + esc(x.name) + '</td><td class="px-4 py-2 text-slate-300">' + x.wins + '</td><td class="px-4 py-2 text-slate-300">' + x.vp + '</td></tr>').join('') +
        '</tbody></table></div></section>';
    }

    /* acciones del creador sobre el avance de la campaña */
    let actions = '';
    if (isOwner && c.status === 'draft') {
      const need = [];
      if (!players.length) need.push('faltan jugadores');
      const noBand = players.filter((p) => !p.band_id).map(pname);
      if (noBand.length) need.push('falta banda de ' + noBand.join(', '));
      actions += '<button onclick="AW.c.start()" class="' + btnPrimary + '"' + (need.length ? ' disabled' : '') + '>Empezar campaña</button>' +
        '<span class="text-sm text-slate-500">' + (need.length ? 'Pendiente: ' + esc(need.join(' · ')) : 'Todo listo. Se creará la misión 1.') + '</span>';
    }
    if (isOwner && c.status === 'active') {
      const g = gameOf(c.chapter);
      const done = g && g.status === 'finished';
      if (c.chapter < c.num_missions) {
        actions += '<button onclick="AW.c.nextChapter()" class="' + btnPrimary + '"' + (done ? '' : ' disabled') + '>Pasar a la misión ' + (c.chapter + 1) + '</button>' +
          '<span class="text-sm text-slate-500">' + (done ? 'Cuando todos hayan hecho sus tiradas.' : 'Termina antes la partida de la misión ' + c.chapter + '.') + '</span>';
      } else if (!cs.finishing) {
        actions += '<button onclick="AW.c.finishOpen()" class="' + btnPrimary + '"' + (done ? '' : ' disabled') + '>Cerrar campaña</button>' +
          '<span class="text-sm text-slate-500">' + (done ? 'Es la última misión.' : 'Termina antes la última partida.') + '</span>';
      } else {
        const st = standings(players);
        actions += '<div class="w-full bg-slate-900 border border-slate-800 rounded-xl p-4"><p class="text-sm text-slate-300 mb-3">¿Quién gana la campaña? (marca varios si hay empate)</p><div class="space-y-2 mb-4">' +
          st.map((x, k) => '<label class="flex items-center gap-2 text-slate-200"><input type="checkbox" class="aw-cwin accent-amber-500" value="' + x.user_id + '"' + (k === 0 ? ' checked' : '') + '> ' + esc(x.name) + ' <span class="text-xs text-slate-500">(' + x.wins + ' victorias · ' + x.vp + ' PV)</span></label>').join('') +
          '</div><div class="flex gap-3"><button onclick="AW.c.finishConfirm()" class="' + btnPrimary + '">Confirmar y cerrar</button><button onclick="AW.c.finishCancel()" class="' + btnGhost + '">Cancelar</button></div></div>';
      }
    }
    const actionsHtml = actions ? '<section class="pt-4 mt-2 border-t border-slate-800 flex flex-wrap gap-3 items-center">' + actions + '</section>' : '';

    /* ajustes */
    let settingsHtml = '<section class="space-y-4"><h3 class="text-lg font-bold text-white">Ajustes de la campaña</h3>';
    if (isOwner && c.status !== 'finished' && players.length > 1) {
      settingsHtml += '<div class="bg-slate-900 border border-slate-800 rounded-xl p-4"><p class="text-sm font-semibold text-white mb-1">Traspasar el mando</p>' +
        '<p class="text-xs text-slate-500 mb-3">El nuevo creador elige escenario, empieza y cierra las partidas, pasa de misión y cierra la campaña.</p>' +
        '<div class="flex flex-wrap gap-2"><select id="aw-transfer" class="' + inputCls + ' sm:w-auto">' +
        players.filter((p) => p.user_id !== me).map((p) => '<option value="' + p.user_id + '">' + esc(pname(p)) + '</option>').join('') + '</select>' +
        '<button onclick="AW.c.transfer()" class="' + btnGhost + '">Traspasar</button></div></div>';
    }
    if (isOwner && c.status === 'active' && c.chapter > 1) {
      const g = gameOf(c.chapter);
      const fresh = g && g.status === 'draft' && !cs.rolls.some((r) => r.chapter === c.chapter) && !cs.ledger.some((l) => l.chapter === c.chapter) && !cs.vplog.some((l) => l.chapter === c.chapter);
      settingsHtml += '<div class="bg-slate-900 border border-slate-800 rounded-xl p-4"><p class="text-sm font-semibold text-white mb-1">Deshacer el paso a la misión ' + c.chapter + '</p>' +
        '<p class="text-xs text-slate-500 mb-3">' + (fresh ? 'Vuelve a la misión ' + (c.chapter - 1) + ' (las lesiones vuelven a su sitio).' : 'Solo se puede mientras la partida no haya empezado y nadie haya hecho tiradas, compras ni gastos de PV en esta misión.') + '</p>' +
        '<button onclick="AW.c.undoChapter()" class="' + btnGhost + '"' + (fresh ? '' : ' disabled') + '>Deshacer</button></div>';
    }
    settingsHtml += '<div class="flex flex-wrap gap-3 items-center">';
    if (!isOwner && mine && c.status === 'draft') settingsHtml += '<button onclick="AW.c.leave()" class="px-4 py-2 text-rose-300 hover:bg-rose-950/40 rounded-xl text-sm">Salir de la campaña</button>';
    if (isOwner) settingsHtml += '<button onclick="AW.c.remove()" class="px-4 py-2 text-rose-300 hover:bg-rose-950/40 rounded-xl text-sm">Borrar campaña</button>';
    settingsHtml += '</div></section>';

    if (c.status === 'draft') {
      html += playersHtml + actionsHtml + '<section class="pt-4 mt-2 border-t border-slate-800 flex flex-wrap gap-3">' +
        (!isOwner && mine ? '<button onclick="AW.c.leave()" class="px-4 py-2 text-rose-300 hover:bg-rose-950/40 rounded-xl text-sm">Salir de la campaña</button>' : '') +
        (isOwner ? '<button onclick="AW.c.remove()" class="px-4 py-2 text-rose-300 hover:bg-rose-950/40 rounded-xl text-sm ml-auto">Borrar campaña</button>' : '') + '</section>';
      return shell(esc(c.name), 'Campaña', html);
    }

    /* campaña en marcha o terminada: pestañas */
    const TABS = [['mision', c.status === 'finished' ? 'Última misión' : 'Misión actual'], ['jugadores', 'Jugadores'], ['caja', 'Fondo'], ['historial', 'Misiones anteriores'], ['ajustes', 'Ajustes']];
    if (TABS.every((t) => t[0] !== cs.tab)) cs.tab = 'mision';
    html += '<div role="tablist" aria-label="Secciones de la campaña" class="flex gap-1 overflow-x-auto mb-5 border-b border-slate-800">' +
      TABS.map((t) => '<button role="tab" id="ctab-' + t[0] + '" aria-selected="' + (cs.tab === t[0]) + '" onclick="AW.c.tab(\'' + t[0] + '\')" class="shrink-0 px-4 py-2 text-sm font-semibold border-b-2 -mb-px ' +
        (cs.tab === t[0] ? 'border-emerald-500 text-white' : 'border-transparent text-slate-400 hover:text-white') + '">' + t[1] + '</button>').join('') + '</div>';
    html += '<div role="tabpanel" aria-labelledby="ctab-' + cs.tab + '">';
    if (cs.tab === 'mision') {
      html += nextStep(c, players) + (c.chapter >= 1 ? chapterCard(c, c.chapter, players) : '') + actionsHtml;
    } else if (cs.tab === 'jugadores') html += standHtml + playersHtml;
    else if (cs.tab === 'caja') html += goldSection(c, players);
    else if (cs.tab === 'historial') {
      let any = false;
      for (let n = c.chapter - 1; n >= 1; n--) { any = true; html += chapterCard(c, n, players); }
      if (!any) html += '<p class="text-slate-500">Todavía no hay misiones anteriores.</p>';
    } else html += settingsHtml;
    html += '</div>';

    return shell(esc(c.name), 'Campaña', html);
  }

  function bandPicker(c, mine) {
    const opts = state.bands
      .map((b) => {
        let why = '';
        if (!(b.units || []).length) why = 'vacía';
        else if (b.value > c.max_value) why = 'supera ' + c.max_value + ' GP';
        else if (b.value > c.starting_gold) why = 'no cabe en el presupuesto de ' + c.starting_gold + ' GP';
        else if (AW.api.validateBand(b.faction, b.units).length) why = 'incompleta';
        return '<option value="' + b.id + '"' + (why ? ' disabled' : '') + (mine.band_id === b.id ? ' selected' : '') + '>' + esc(b.name) + ' · ' + b.value + ' GP' + (why ? ' (' + why + ')' : '') + '</option>';
      })
      .join('');
    return (
      '<div class="mt-4 pt-4 border-t border-slate-800/60"><p class="text-xs text-slate-400 mb-2">Tu banda para la campaña (máximo ' + c.max_value + ' GP). Su valor se descuenta de tu presupuesto de ' + c.starting_gold + ' GP' +
      (mine.band_snapshot ? ': te quedan <strong class="text-amber-400">' + gpFmt(mine.gold) + '</strong>' : '') + '.</p>' +
      '<div class="flex flex-wrap gap-2 items-center"><select onchange="AW.c.chooseBand(this.value)" class="' + inputCls + ' sm:w-auto"><option value="">— Elige una de tu perfil —</option>' + opts + '</select>' +
      '<button onclick="AW.c.newBandFor()" class="' + btnGhost + '">+ Crear banda nueva</button></div></div>'
    );
  }

  /* ----------------------------------------------------------------- acciones */
  async function run(promise, okMsg) {
    const { data, error } = await AWUtil.busy(promise);
    if (error) toast(translateError(error), 'error');
    else if (okMsg) toast(okMsg);
    if (cs.id) await AWUtil.busy(loadOne(cs.id));
    rerender(true);
    return error ? null : data === undefined ? {} : data;
  }

  async function joinByCode(code) {
    const { data, error } = await state.sb.rpc('join_campaign', { p_code: code });
    if (error) {
      toast(translateError(error), 'error');
      cs.view = 'list';
      rerender();
      return;
    }
    await loadList();
    toast('Te has unido a la campaña');
    C.open(data);
  }

  C.open = async (id) => {
    cs.id = id;
    cs.view = 'detail';
    cs.finishing = false;
    cs.camp = null;
    cs.games = [];
    cs.rolls = [];
    cs.ledger = [];
    cs.vplog = [];
    cs.tab = 'mision';
    currentSectionId = SEC;
    window.renderSidebar();
    rerender();
    if (!state.bands || !state.bands.length) {
      /* las bandas ya se cargan al iniciar sesión */
    }
    const c = await loadOne(id);
    if (!c) {
      toast('No se encuentra la campaña', 'error');
      return C.back();
    }
    subscribe(id);
    rerender();
  };

  C.where = () => ({ view: cs.view, id: cs.view === 'detail' ? cs.id : null });

  C.back = () => {
    unsubscribe();
    cs.view = 'list';
    cs.camp = null;
    cs.id = null;
    cs.finishing = false;
    currentSectionId = SEC;
    window.renderSidebar();
    rerender();
    loadList().then(() => rerender(true));
  };

  C.showNew = () => {
    cs.view = 'new';
    rerender();
  };

  C.refresh = async () => {
    await run(Promise.resolve({}), null);
    toast('Actualizado');
  };

  C.copy = (text) => {
    try {
      navigator.clipboard.writeText(text).then(() => toast('Copiado'), () => toast('No se pudo copiar', 'error'));
    } catch (e) {
      toast('No se pudo copiar', 'error');
    }
  };

  C.create = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.target);
    const name = String(f.get('name') || '').trim();
    const missions = Math.floor(Number(f.get('missions')) || 0);
    const max = Math.floor(Number(f.get('max')) || 0);
    const gold = Math.floor(Number(f.get('gold')));
    if (!name || max < 1) return toast('Revisa el nombre y el valor máximo', 'error');
    if (missions < 1 || missions > 12) return toast('El número de misiones debe estar entre 1 y 12', 'error');
    if (!(gold >= 0)) return toast('El fondo inicial no puede ser negativo', 'error');

    const { data, error } = await state.sb
      .from('campaigns')
      .insert({ owner_id: state.user.id, name, max_value: max, num_missions: missions, starting_gold: gold })
      .select()
      .single();
    if (error) return toast('No se pudo crear: ' + translateError(error), 'error');
    if (f.get('plays')) {
      const j = await state.sb.rpc('join_campaign', { p_code: data.join_code });
      if (j.error) toast(translateError(j.error), 'error');
    }
    toast('Campaña creada');
    await loadList();
    C.open(data.id);
  };

  C.join = async (ev) => {
    ev.preventDefault();
    const code = String(new FormData(ev.target).get('code') || '').trim();
    if (code) await joinByCode(code);
  };

  C.chooseBand = (bandId) =>
    run(state.sb.from('campaign_players').update({ band_id: bandId || null }).eq('campaign_id', cs.id).eq('user_id', state.user.id), bandId ? 'Banda elegida' : null);

  C.newBandFor = () => {
    const c = cs.camp;
    if (!c) return;
    AW.newBand({
      title: 'Nueva banda para "' + c.name + '"',
      maxValue: c.max_value,
      onSaved: async (band) => {
        const { error } = await state.sb.from('campaign_players').update({ band_id: band.id }).eq('campaign_id', c.id).eq('user_id', state.user.id);
        if (error) toast('La banda se guardó, pero no se pudo elegir: ' + translateError(error), 'error');
        C.open(c.id);
      },
      onCancel: () => C.open(c.id)
    });
  };

  C.start = () => run(state.sb.rpc('campaign_start', { p_campaign: cs.id }), '¡Empieza la campaña!');
  C.nextChapter = async () => {
    const n = cs.camp ? cs.camp.chapter + 1 : '';
    if (!(await AWUtil.confirm('¿Pasar a la misión ' + n + '? Se creará su partida con las bandas y lesiones actuales.', { yes: 'Pasar de misión' }))) return;
    await run(state.sb.rpc('campaign_next_chapter', { p_campaign: cs.id }), 'Nueva misión creada');
    cs.tab = 'mision';
    rerender();
  };

  C.tab = (t) => {
    cs.tab = t;
    rerender();
  };

  // Lleva a un paso de la misión actual (lo abre y se desplaza hasta él)
  C.goStep = (n) => {
    cs.tab = 'mision';
    rerender(true);
    setTimeout(() => {
      const el = document.getElementById('cstep-' + n);
      if (!el) return;
      el.open = true;
      if (el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 30);
  };

  C.transfer = async () => {
    const sel = document.getElementById('aw-transfer');
    const p = sel && (cs.camp.campaign_players || []).find((x) => x.user_id === sel.value);
    if (!p) return;
    if (!(await AWUtil.confirm('¿Traspasar el mando de la campaña a ' + pname(p) + '? Dejarás de poder gestionarla.', { yes: 'Traspasar' }))) return;
    await run(state.sb.rpc('campaign_transfer_owner', { p_campaign: cs.id, p_user: p.user_id }), 'Mando traspasado a ' + pname(p));
    cs.tab = 'mision';
    rerender();
  };

  C.undoChapter = async () => {
    if (!(await AWUtil.confirm('¿Deshacer el paso a la misión ' + (cs.camp ? cs.camp.chapter : '') + '? Se borrará su partida y volverás a la anterior.', { danger: true, yes: 'Deshacer' }))) return;
    await run(state.sb.rpc('campaign_undo_chapter', { p_campaign: cs.id }), 'Misión deshecha');
    cs.tab = 'mision';
    rerender();
  };

  C.roll = async (kind, unit) => {
    const r = await run(state.sb.rpc('campaign_roll', { p_campaign: cs.id, p_kind: kind, p_unit: unit == null ? null : unit }), null);
    if (r && r.dice) toast('Has sacado ' + r.dice.join(' / '));
  };

  C.setScenario = (id) =>
    run(state.sb.from('games').update({ scenario_id: id || null, scenario_mode: 'chosen' }).eq('id', (cs.games.find((g) => g.position === cs.camp.chapter) || {}).id), null);

  C.randomScenario = () => {
    const g = cs.games.find((x) => x.position === cs.camp.chapter);
    if (!g || !AW.g.randomScenarioId) return;
    return run(state.sb.from('games').update({ scenario_id: AW.g.randomScenarioId(g.scenario_id), scenario_mode: 'random' }).eq('id', g.id), 'Escenario sorteado');
  };

  C.buyTrait = async (unit, traitId) => {
    if (!traitId) return;
    const me = mineOf();
    const tr = window.AWTraits && AWTraits.find(traitId);
    const u = me && me.band_snapshot && me.band_snapshot.units[unit];
    if (!tr || !u) return;
    const next = ((u.rasgos_campana || {})[traitId] || 0) + 1;
    const lv = tr.niveles.find((x) => x.n === next);
    if (!lv) return toast('Ya tiene el nivel máximo', 'error');
    if (!(await AWUtil.confirm('¿Comprar ' + tr.nombre + ' N' + next + ' para ' + u.nombre + ' por ' + lv.coste + ' PV?\n' + lv.texto, { yes: 'Comprar' }))) return rerender(true);
    return run(state.sb.rpc('campaign_buy_trait', { p_campaign: cs.id, p_unit: unit, p_trait: traitId, p_level: next, p_cost: lv.coste }), tr.nombre + ' N' + next + ' comprado');
  };

  C.setInjury = (unit, injury, add) => {
    if (!injury) return;
    return run(state.sb.rpc('campaign_set_injury', { p_campaign: cs.id, p_unit: unit, p_injury: injury, p_add: !!add }), null);
  };

  C.setVp = (gid, v) => run(state.sb.rpc('campaign_set_vp', { p_game: gid, p_vp: Math.max(0, Math.floor(Number(v) || 0)) }), null);

  // Comprar y vender: se abre el editor de bandas con la banda de la campaña
  C.editBand = () => {
    const c = cs.camp;
    const me = mineOf();
    if (!c || !me || !me.band_snapshot) return;
    const n = c.chapter;
    const humor = myHumor(n);
    const snap = me.band_snapshot;
    const orig = JSON.parse(JSON.stringify(snap.units || []));
    const gold = me.gold;
    const back = () => C.open(c.id);
    AW.editBandCtx(
      {
        title: 'Gestionar banda: ' + (snap.name || ''),
        subtitle: 'Comerciante: ' + (humor ? humor.nombre + ' (compras ' + pct(humor.compra) + ', ventas ' + pct(humor.venta) + ')' : '—') + ' · Fondo: ' + gold + ' GP',
        lockFaction: true,
        summary: (units) => {
          const ch = bandChange(orig, units, humor);
          const left = gold - ch.net;
          return '<div class="p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-300">' +
            '<div class="flex flex-wrap gap-x-5 gap-y-1">' +
            '<span>Gastas <strong class="text-rose-300">' + ch.spend + ' GP</strong></span>' +
            '<span>Ingresas <strong class="text-emerald-300">' + ch.refund + ' GP</strong></span>' +
            '<span>Fondo tras guardar: <strong class="' + (left < 0 ? 'text-rose-400' : 'text-amber-400') + '">' + left + ' GP</strong>' + (left < 0 ? ' (no alcanza)' : '') + '</span></div>' +
            (ch.lines.length ? '<ul class="mt-2 text-xs text-slate-400 space-y-0.5">' + ch.lines.map((l) => '<li>' + l.t + ': ' + esc(l.n) + ' · ' + l.c + ' GP</li>').join('') + '</ul>' : '<p class="text-xs text-slate-500 mt-1">Sin cambios todavía.</p>') +
            '</div>';
        },
        save: async (units) => {
          const ch = bandChange(orig, units, humor);
          if (ch.net > gold) {
            toast('No tienes fondos suficientes para estos cambios', 'error');
            return false;
          }
          if (!ch.lines.length) {
            toast('No has cambiado nada');
            return true;
          }
          const clean = units.map((u) => { const x = Object.assign({}, u); delete x._o; return x; });
          const reason = ch.lines.filter((l) => l.t === 'Compra' || l.t === 'Venta' || l.t === 'Fichaje' || l.t === 'Baja').map((l) => l.t + ' ' + String(l.n).split(' (')[0]).join(', ') || 'Cambios en la banda';
          const { error } = await state.sb.rpc('campaign_update_band', {
            p_campaign: c.id,
            p_units: clean,
            p_remap: units.map((u) => (u._o == null ? -1 : u._o)),
            p_delta: -ch.net,
            p_reason: reason.slice(0, 118)
          });
          if (error) {
            toast(translateError(error), 'error');
            return false;
          }
          toast('Banda actualizada');
          return true;
        },
        onSaved: back,
        onCancel: back
      },
      { name: snap.name, faction: snap.faction, notes: snap.notes, units: orig }
    );
  };

  C.adjustGold = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.target);
    const delta = Math.trunc(Number(f.get('delta')));
    if (!delta) return toast('Pon una cantidad distinta de 0', 'error');
    const ok = await run(
      state.sb.rpc('campaign_adjust_gold', { p_campaign: cs.id, p_user: String(f.get('who')), p_delta: delta, p_reason: String(f.get('reason') || '') }),
      'Movimiento anotado'
    );
    if (ok !== null) ev.target.reset && ev.target.reset();
  };

  C.finishOpen = () => {
    cs.finishing = true;
    rerender(true);
  };
  C.finishCancel = () => {
    cs.finishing = false;
    rerender(true);
  };
  C.finishConfirm = async () => {
    const winners = Array.prototype.map.call(document.querySelectorAll('.aw-cwin:checked'), (el) => el.value);
    cs.finishing = false;
    await run(state.sb.rpc('campaign_finish', { p_campaign: cs.id, p_winners: winners }), 'Campaña terminada');
  };

  C.leave = async () => {
    if (!(await AWUtil.confirm('¿Salir de la campaña?', { yes: 'Salir' }))) return;
    const { error } = await state.sb.from('campaign_players').delete().eq('campaign_id', cs.id).eq('user_id', state.user.id);
    if (error) return toast(translateError(error), 'error');
    toast('Has salido de la campaña');
    C.back();
  };

  C.remove = async () => {
    const c = cs.camp;
    if (!c || !(await AWUtil.confirm('¿Borrar la campaña "' + c.name + '" con todas sus misiones? No se puede deshacer.', { danger: true, yes: 'Borrar' }))) return;
    const { error } = await state.sb.from('campaigns').delete().eq('id', c.id);
    if (error) return toast('No se pudo borrar: ' + translateError(error), 'error');
    toast('Campaña borrada');
    C.back();
  };

  // Abre la partida de una misión; al volver se regresa a la campaña
  C.openGame = (gid) => {
    unsubscribe();
    if (AW.g && AW.g.openFromCampaign) AW.g.openFromCampaign(gid, cs.id);
  };
})();
