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
    finishing: false,
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
    const [c, g, r, l] = await Promise.all([
      state.sb.from('campaigns').select(SEL_ONE).eq('id', id).maybeSingle(),
      state.sb.from('games').select(SEL_GAMES).eq('campaign_id', id).order('position', { ascending: true }),
      state.sb.from('campaign_rolls').select('*').eq('campaign_id', id).order('id', { ascending: true }),
      state.sb.from('campaign_ledger').select('*').eq('campaign_id', id).order('id', { ascending: true })
    ]);
    const err = c.error || g.error || r.error || l.error;
    if (err) {
      toast('No se pudo cargar la campaña: ' + translateError(err), 'error');
      return null;
    }
    if (id === cs.id) {
      cs.camp = c.data;
      cs.games = g.data || [];
      cs.rolls = r.data || [];
      cs.ledger = l.data || [];
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
  const pname = (p) => (p && p.profiles && p.profiles.display_name) || 'Jugador';
  const gpFmt = (n) => (Number(n) || 0) + ' GP';

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
      '<div><label class="block text-xs text-slate-400 mb-1">Fondo inicial por banda (GP)</label><input name="gold" type="number" min="0" step="1" value="100" required class="' + inputCls + '"></div></div>' +
      '<p class="text-xs text-slate-500">Cada misión es una partida. El fondo es el dinero con el que empieza cada banda y luego sube o baja con compras, ventas, premios y eventos.</p>' +
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
      '<details class="bg-slate-950 border ' + (done ? 'border-emerald-900/60' : 'border-slate-800/60') + ' rounded-xl"' + (open ? ' open' : '') + '>' +
      '<summary class="cursor-pointer px-4 py-3 flex items-center gap-3 text-white font-semibold"><span class="w-6 h-6 rounded-full text-xs flex items-center justify-center ' +
      (done ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300') + '">' + (done ? '✓' : n) + '</span>' + title + '</summary>' +
      '<div class="px-4 pb-4 pt-1">' + inner + '</div></details>'
    );
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
    steps += step(1, 'Escenario', !!g.scenario_id,
      '<p class="text-sm text-slate-300">' + (sc ? esc(sc) : 'Todavía no hay escenario elegido.') + '</p>' +
      (g.status === 'draft' && c.owner_id === me ? '<p class="text-xs text-slate-500 mt-1">Elígelo o sortéalo dentro de la partida.</p>' : ''), isCur && !g.scenario_id);

    // 2. Comerciante (antes de la partida)
    const mRolls = rollsOf(n, 'merchant');
    steps += step(2, 'El comerciante ambulante (1D6)', mRolls.length >= players.length && players.length > 0,
      '<p class="text-xs text-slate-500 mb-2">Cada jugador tira antes de la partida; el resultado fija los precios de compra y venta de ese jugador. Todos ven las tiradas.</p>' +
      rows('merchant', c.status === 'active' && isCur && gStatus === 'draft', 'Tirar 1D6'), isCur && gStatus === 'draft');

    // 3. Preparar banda
    steps += step(3, 'Preparar la banda', gStatus !== 'draft',
      '<p class="text-xs text-slate-500 mb-2">Fondo de cada banda ahora mismo:</p>' +
      '<div class="flex flex-wrap gap-3">' + players.map((p) => '<span class="text-sm bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5">' + esc(pname(p)) + ': <strong class="text-amber-400">' + gpFmt(p.gold) + '</strong></span>').join('') + '</div>' +
      '<p class="text-xs text-slate-500 mt-2">Elige a tus personajes y comprueba el equipo en la ficha de la partida (el comerciante y el cofre llegan en la siguiente fase).</p>', false);

    // 4. Batalla y eventos de ronda
    steps += step(4, 'La batalla y los eventos de ronda', gStatus === 'finished',
      '<p class="text-sm text-slate-300">' + (gStatus === 'draft' ? 'La partida aún no ha empezado: hace falta que todos den su OK.' : gStatus === 'active' ? 'En curso, ronda ' + (g.round || 0) + '.' : 'Terminada.') +
      (gStatus === 'finished' ? (winners.length ? ' Ganó: <strong>' + esc(winners.map((u) => pname(asCamp(u))).join(', ')) + '</strong>.' : ' Sin ganador declarado.') : '') + '</p>' +
      (gp.length ? '<div class="flex flex-wrap gap-3 mt-2">' + gp.map((x) => '<span class="text-sm bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5">' + esc(pname(x)) + ': <strong class="text-amber-400">' + x.vp + ' PV</strong></span>').join('') + '</div>' : '') +
      (g.round ? '<div class="mt-3">' + eventsOf(g) + '</div>' : ''), isCur && gStatus === 'active');

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
        '<p class="text-sm text-slate-400 mb-3">Comparte el código o el enlace. Cada jugador elige su banda (hasta ' + c.max_value + ' GP) y empieza con ' + gpFmt(c.starting_gold) + ' de fondo.</p>' +
        '<div class="flex flex-wrap gap-2 items-center"><code class="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-300 select-all">' + esc(c.join_code) + '</code>' +
        '<button onclick="AW.c.copy(\'' + esc(c.join_code) + '\')" class="' + btnGhost + '">Copiar código</button>' +
        '<button onclick="AW.c.copy(\'' + esc(link) + '\')" class="' + btnGhost + '">Copiar enlace</button></div></section>';
    }

    /* jugadores y bandas */
    html += '<section class="mb-6"><h3 class="text-lg font-bold text-white mb-3">Jugadores (' + players.length + ')</h3><div class="space-y-3">';
    if (!players.length) html += '<p class="text-slate-500">Todavía no se ha apuntado nadie.</p>';
    players.forEach((p) => {
      const b = p.band_snapshot;
      html +=
        '<article class="bg-slate-950 rounded-xl p-5 border border-slate-800/60"><div class="flex flex-wrap items-center justify-between gap-3">' +
        '<h4 class="text-base font-bold text-white">' + esc(pname(p)) + (p.user_id === me ? ' <span class="text-xs text-emerald-400 font-normal">(tú)</span>' : '') +
        (p.user_id === c.owner_id ? ' <span class="text-xs text-slate-500 font-normal">creador</span>' : '') + '</h4>' +
        '<span class="text-amber-400 font-bold">' + gpFmt(p.gold) + '</span></div>' +
        '<div class="mt-3">' + (b
          ? '<details class="text-sm"><summary class="cursor-pointer text-slate-300"><span class="font-semibold text-white">' + esc(b.name) + '</span>' + (b.faction ? ' · ' + esc(b.faction) : '') + ' · <span class="text-amber-400">' + b.value + ' GP</span></summary><div class="mt-3">' +
            (AW.sheet ? AW.sheet.bandSheet(b.units || [], null, { faction: b.faction }) : '') + '</div></details>'
          : '<p class="text-sm text-slate-500 italic">Aún no ha elegido banda</p>') + '</div>';
      if (p.user_id === me && c.status === 'draft') html += bandPicker(c, p);
      html += '</article>';
    });
    html += '</div></section>';

    /* clasificación */
    if (c.status !== 'draft' && cs.games.some((g) => g.status === 'finished')) {
      html += '<section class="mb-6"><h3 class="text-lg font-bold text-white mb-3">Clasificación</h3><div class="bg-slate-950 border border-slate-800/60 rounded-xl overflow-hidden"><table class="w-full text-sm"><thead class="text-slate-500 text-left"><tr><th class="px-4 py-2">Jugador</th><th class="px-4 py-2">Victorias</th><th class="px-4 py-2">PV</th></tr></thead><tbody>' +
        standings(players).map((s, i) => '<tr class="border-t border-slate-800/60"><td class="px-4 py-2 text-slate-200">' + (i === 0 ? '🥇 ' : '') + esc(s.name) + '</td><td class="px-4 py-2 text-slate-300">' + s.wins + '</td><td class="px-4 py-2 text-amber-400">' + s.vp + '</td></tr>').join('') +
        '</tbody></table></div></section>';
    }

    /* fondo */
    if (c.status !== 'draft') html += goldSection(c, players);

    /* capítulos */
    if (c.status !== 'draft') {
      html += '<section class="mb-6"><h3 class="text-lg font-bold text-white mb-3">Misiones</h3>';
      for (let n = c.num_missions; n >= 1; n--) html += chapterCard(c, n, players);
      html += '</section>';
    }

    /* acciones del creador */
    html += '<section class="pt-4 border-t border-slate-800 flex flex-wrap gap-3 items-center">';
    if (isOwner && c.status === 'draft') {
      const need = [];
      if (!players.length) need.push('faltan jugadores');
      const noBand = players.filter((p) => !p.band_id).map(pname);
      if (noBand.length) need.push('falta banda de ' + noBand.join(', '));
      html += '<button onclick="AW.c.start()" class="' + btnPrimary + '"' + (need.length ? ' disabled' : '') + '>Empezar campaña</button>' +
        '<span class="text-sm text-slate-500">' + (need.length ? 'Pendiente: ' + esc(need.join(' · ')) : 'Todo listo. Se creará la misión 1.') + '</span>';
    }
    if (isOwner && c.status === 'active') {
      const g = gameOf(c.chapter);
      const done = g && g.status === 'finished';
      if (c.chapter < c.num_missions) {
        html += '<button onclick="AW.c.nextChapter()" class="' + btnPrimary + '"' + (done ? '' : ' disabled') + '>Pasar a la misión ' + (c.chapter + 1) + '</button>' +
          '<span class="text-sm text-slate-500">' + (done ? 'Cuando todos hayan hecho sus tiradas.' : 'Termina antes la partida de la misión ' + c.chapter + '.') + '</span>';
      } else if (!cs.finishing) {
        html += '<button onclick="AW.c.finishOpen()" class="' + btnPrimary + '"' + (done ? '' : ' disabled') + '>Cerrar campaña</button>' +
          '<span class="text-sm text-slate-500">' + (done ? 'Es la última misión.' : 'Termina antes la última partida.') + '</span>';
      } else {
        const st = standings(players);
        html += '<div class="w-full bg-slate-900 border border-slate-800 rounded-xl p-4"><p class="text-sm text-slate-300 mb-3">¿Quién gana la campaña? (marca varios si hay empate)</p><div class="space-y-1 mb-4">' +
          st.map((s, i) => '<label class="flex items-center gap-2 text-slate-200"><input type="checkbox" class="aw-cwin accent-amber-500" value="' + s.user_id + '"' + (i === 0 ? ' checked' : '') + '> ' + esc(s.name) + ' <span class="text-slate-500">(' + s.wins + ' victorias, ' + s.vp + ' PV)</span></label>').join('') +
          '</div><div class="flex gap-3"><button onclick="AW.c.finishConfirm()" class="' + btnPrimary + '">Confirmar y cerrar</button><button onclick="AW.c.finishCancel()" class="' + btnGhost + '">Cancelar</button></div></div>';
      }
    }
    if (!isOwner && mine && c.status === 'draft') {
      html += '<button onclick="AW.c.leave()" class="px-4 py-2 text-rose-300 hover:bg-rose-950/40 rounded-xl text-sm">Salir de la campaña</button>';
    }
    if (isOwner) html += '<button onclick="AW.c.remove()" class="px-4 py-2 text-rose-300 hover:bg-rose-950/40 rounded-xl text-sm ml-auto">Borrar campaña</button>';
    html += '</section>';

    return shell(esc(c.name), 'Campaña', html);
  }

  function bandPicker(c, mine) {
    const opts = state.bands
      .map((b) => {
        let why = '';
        if (!(b.units || []).length) why = 'vacía';
        else if (b.value > c.max_value) why = 'supera ' + c.max_value + ' GP';
        else if (AW.api.validateBand(b.faction, b.units).length) why = 'incompleta';
        return '<option value="' + b.id + '"' + (why ? ' disabled' : '') + (mine.band_id === b.id ? ' selected' : '') + '>' + esc(b.name) + ' · ' + b.value + ' GP' + (why ? ' (' + why + ')' : '') + '</option>';
      })
      .join('');
    return (
      '<div class="mt-4 pt-4 border-t border-slate-800/60"><p class="text-xs text-slate-400 mb-2">Tu banda para la campaña (máximo ' + c.max_value + ' GP)</p>' +
      '<div class="flex flex-wrap gap-2 items-center"><select onchange="AW.c.chooseBand(this.value)" class="' + inputCls + ' sm:w-auto"><option value="">— Elige una de tu perfil —</option>' + opts + '</select>' +
      '<button onclick="AW.c.newBandFor()" class="' + btnGhost + '">+ Crear banda nueva</button></div></div>'
    );
  }

  /* ----------------------------------------------------------------- acciones */
  async function run(promise, okMsg) {
    const { data, error } = await promise;
    if (error) toast(translateError(error), 'error');
    else if (okMsg) toast(okMsg);
    if (cs.id) await loadOne(cs.id);
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
  C.nextChapter = () => run(state.sb.rpc('campaign_next_chapter', { p_campaign: cs.id }), 'Nueva misión creada');

  C.roll = async (kind, unit) => {
    const r = await run(state.sb.rpc('campaign_roll', { p_campaign: cs.id, p_kind: kind, p_unit: unit == null ? null : unit }), null);
    if (r && r.dice) toast('Has sacado ' + r.dice.join(' / '));
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
    if (!confirm('¿Salir de la campaña?')) return;
    const { error } = await state.sb.from('campaign_players').delete().eq('campaign_id', cs.id).eq('user_id', state.user.id);
    if (error) return toast(translateError(error), 'error');
    toast('Has salido de la campaña');
    C.back();
  };

  C.remove = async () => {
    const c = cs.camp;
    if (!c || !confirm('¿Borrar la campaña "' + c.name + '" con todas sus misiones? No se puede deshacer.')) return;
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
