/* ArcWorlde Assist: partidas únicas (Supabase)
 *
 * Sección "Partidas": crear una partida, invitar con código o enlace, que cada jugador
 * elija una banda de su perfil (valor máximo) o cree una nueva, empezar, puntuar y cerrar.
 * Se carga después de usuarios.js, que le presta utilidades en AW.api.
 */
(function () {
  'use strict';

  const AW = window.AW;
  if (!AW || !AW.api) return;
  const { state, esc, toast, translateError, shell, msgBox, inputCls, btnPrimary, btnGhost, validateBand } = AW.api;

  const SEC = 'app_games';
  const G = (AW.g = {});
  const gs = {
    list: null,
    loading: false,
    view: 'list', // list | new | detail
    current: null,
    currentId: null,
    finishing: false,
    pendingCode: null,
    channel: null
  };

  AW.navItems.push([SEC, '⚔️', 'Partidas']);
  AW.views[SEC] = viewGames;

  // Enlace de invitación: ?partida=CODIGO
  try {
    const c = new URLSearchParams(location.search).get('partida');
    if (c) {
      gs.pendingCode = c.trim();
      currentSectionId = SEC;
    }
  } catch (e) {
    /* sin parámetros */
  }

  /* ------------------------------------------------------------------ datos */
  const SELECT =
    '*, owner:profiles!owner_id(display_name), game_players(user_id, band_id, band_snapshot, side, vp, joined_at, profiles(display_name))';

  async function loadGames() {
    gs.loading = true;
    const { data, error } = await state.sb
      .from('games')
      .select(SELECT)
      .is('campaign_id', null)
      .order('created_at', { ascending: false });
    gs.loading = false;
    if (error) toast('No se pudieron cargar las partidas: ' + translateError(error), 'error');
    gs.list = error ? gs.list || [] : data || [];
  }

  async function loadGame(id) {
    const { data, error } = await state.sb.from('games').select(SELECT).eq('id', id).maybeSingle();
    if (error) {
      toast('No se pudo cargar la partida: ' + translateError(error), 'error');
      return null;
    }
    if (id === gs.currentId) gs.current = data;
    return data;
  }

  function rerender(keepScroll) {
    if (currentSectionId === SEC) AW.api.render(keepScroll === true);
  }

  /* ------------------------------------------------------------- escenarios */
  function scenarios() {
    if (typeof datosEscenarios === 'undefined') return [];
    const sec = datosEscenarios.secciones_escenarios.find((s) => s.id_seccion === 'escenarios_predisenados');
    const out = [];
    (sec ? sec.categorias : []).forEach((c) => c.acciones.forEach((a) => out.push(a)));
    return out;
  }
  const scenarioById = (id) => scenarios().find((s) => s.id === id);
  function randomScenarioId(exceptId) {
    const all = scenarios().filter((s) => s.id !== exceptId);
    return all.length ? all[Math.floor(Math.random() * all.length)].id : null;
  }
  function scenarioOptions(selected) {
    return scenarios()
      .map((s) => '<option value="' + esc(s.id) + '"' + (s.id === selected ? ' selected' : '') + '>' + esc(s.nombre) + '</option>')
      .join('');
  }

  /* ------------------------------------------------------------ tiempo real */
  function unsubscribe() {
    if (gs.channel) {
      try {
        state.sb.removeChannel(gs.channel);
      } catch (e) {
        /* nada */
      }
      gs.channel = null;
    }
  }

  function subscribe(id) {
    unsubscribe();
    let timer = null;
    const soft = () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        if (gs.currentId !== id || gs.view !== 'detail') return;
        await loadGame(id);
        const typing = document.activeElement && /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName);
        if (!typing) rerender(true);
      }, 300);
    };
    try {
      gs.channel = state.sb
        .channel('game-' + id)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'game_players', filter: 'game_id=eq.' + id }, soft)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'games', filter: 'id=eq.' + id }, soft)
        .subscribe();
    } catch (e) {
      gs.channel = null; // sin tiempo real: queda el botón "Actualizar"
    }
  }

  /* --------------------------------------------------------------- sesión */
  function resetState() {
    unsubscribe();
    gs.list = null;
    gs.current = null;
    gs.currentId = null;
    gs.view = 'list';
    gs.finishing = false;
  }

  AW.hooks.userChanged.push(async (user) => {
    const id = user ? user.id : null;
    if (id !== gs.userId) resetState(); // cierre de sesión o cambio de cuenta
    gs.userId = id;
    if (!user) return;
    await loadGames();
    if (gs.pendingCode) {
      const code = gs.pendingCode;
      gs.pendingCode = null;
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

  function playerName(p) {
    return (p.profiles && p.profiles.display_name) || 'Jugador';
  }

  function viewGames() {
    if (!state.user) {
      const code = gs.pendingCode
        ? '<p class="text-emerald-400 mb-3">Te han invitado a una partida. Inicia sesión y te apuntamos automáticamente.</p>'
        : '';
      return shell(
        'Partidas',
        'Crea partidas, invita a tus amigos y llevad la cuenta de los resultados',
        '<div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md">' + code +
          '<p class="text-slate-300 mb-4">Necesitas una cuenta para crear o unirte a partidas.</p>' +
          '<button onclick="AW.go(\'app_account\')" class="' + btnPrimary + '">Iniciar sesión</button></div>'
      );
    }
    if (gs.list === null && !gs.loading) {
      loadGames().then(() => rerender(true));
    }
    if (gs.view === 'new') return viewNew();
    if (gs.view === 'detail') return viewDetail();
    return viewList();
  }

  function viewList() {
    let cards;
    if (gs.list === null) {
      cards = '<p class="text-slate-500">Cargando partidas...</p>';
    } else if (!gs.list.length) {
      cards =
        '<div class="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-8 text-center text-slate-400">Aún no tienes partidas. Crea una o únete con un código.</div>';
    } else {
      cards =
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
        gs.list
          .map((g) => {
            const sc = scenarioById(g.scenario_id);
            const n = (g.game_players || []).length;
            const mine = g.owner_id === state.user.id;
            return (
              '<article onclick="AW.g.open(\'' + g.id + '\')" class="cursor-pointer bg-slate-950 rounded-xl p-5 border border-slate-800/60 hover:border-emerald-500/50 transition-colors">' +
              '<div class="flex items-start justify-between gap-3"><h5 class="text-lg font-bold text-white">' + esc(g.name) + '</h5>' + badge(g.status) + '</div>' +
              '<p class="text-sm text-slate-400 mt-1">' + g.max_value + ' GP · ' + n + (n === 1 ? ' jugador' : ' jugadores') + '</p>' +
              '<p class="text-sm text-slate-500 mt-1">' + (sc ? esc(sc.nombre) : 'Escenario sin elegir') + '</p>' +
              '<p class="text-xs text-slate-600 mt-2">' + (mine ? 'Creada por ti' : 'Creada por ' + esc(g.owner ? g.owner.display_name : '—')) + '</p>' +
              '</article>'
            );
          })
          .join('') +
        '</div>';
    }

    const inner =
      '<div class="flex flex-wrap gap-3 items-end mb-6">' +
      '<button onclick="AW.g.showNew()" class="' + btnPrimary + '">+ Nueva partida</button>' +
      '<form onsubmit="AW.g.join(event)" class="flex gap-2 items-end ml-auto">' +
      '<div><label class="block text-xs text-slate-400 mb-1">¿Tienes un código?</label><input name="code" required maxlength="40" placeholder="Código de invitación" class="' + inputCls + '"></div>' +
      '<button type="submit" class="' + btnGhost + '">Unirme</button></form></div>' +
      cards;
    return shell('Partidas', 'Tus partidas y las que te han invitado', inner);
  }

  function viewNew() {
    const inner =
      '<form onsubmit="AW.g.create(event)" class="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 max-w-xl">' +
      '<div><label class="block text-xs text-slate-400 mb-1">Nombre de la partida</label><input name="name" required maxlength="80" class="' + inputCls + '"></div>' +
      '<div><label class="block text-xs text-slate-400 mb-1">Valor máximo de banda (GP)</label><input name="max" type="number" min="1" step="1" value="500" required class="' + inputCls + '"></div>' +
      '<div><label class="block text-xs text-slate-400 mb-1">Escenario</label><select name="scenario" class="' + inputCls + '">' +
      '<option value="">Elegirlo más tarde</option><option value="random">🎲 Aleatorio</option>' + scenarioOptions('') + '</select></div>' +
      '<label class="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" name="plays" checked class="accent-emerald-500"> Yo también juego esta partida</label>' +
      '<div class="pt-2 flex gap-3"><button type="submit" class="' + btnPrimary + '">Crear partida</button>' +
      '<button type="button" onclick="AW.g.back()" class="' + btnGhost + '">Cancelar</button></div></form>';
    return shell('Nueva partida', 'Después podrás invitar a los jugadores con un código o un enlace', inner);
  }

  function bandSummary(p) {
    const b = p.band_snapshot;
    if (!b) return '<p class="text-sm text-slate-500 italic">Aún no ha elegido banda</p>';
    const units = (b.units || [])
      .map((u) => '<li>' + esc(u.nombre) + ' <span class="text-slate-500">(' + (Number(u.coste) || 0) + ' GP)</span></li>')
      .join('');
    return (
      '<details class="text-sm"><summary class="cursor-pointer text-slate-300"><span class="font-semibold text-white">' + esc(b.name) + '</span>' +
      (b.faction ? ' · ' + esc(b.faction) : '') + ' · <span class="text-amber-400">' + b.value + ' GP</span></summary>' +
      '<ul class="mt-2 ml-4 list-disc text-slate-400 space-y-0.5">' + units + '</ul></details>'
    );
  }

  function bandPicker(g, mine) {
    const opts = state.bands
      .map((b) => {
        let why = '';
        if (!(b.units || []).length) why = 'vacía';
        else if (b.value > g.max_value) why = 'supera ' + g.max_value + ' GP';
        else if (validateBand(b.faction, b.units).length) why = 'incompleta';
        return (
          '<option value="' + b.id + '"' + (why ? ' disabled' : '') + (mine.band_id === b.id ? ' selected' : '') + '>' +
          esc(b.name) + ' · ' + b.value + ' GP' + (why ? ' (' + why + ')' : '') + '</option>'
        );
      })
      .join('');
    return (
      '<div class="mt-4 pt-4 border-t border-slate-800/60"><p class="text-xs text-slate-400 mb-2">Tu banda para esta partida (máximo ' + g.max_value + ' GP)</p>' +
      '<div class="flex flex-wrap gap-2 items-center">' +
      '<select onchange="AW.g.chooseBand(this.value)" class="' + inputCls + ' sm:w-auto"><option value="">— Elige una de tu perfil —</option>' + opts + '</select>' +
      '<button onclick="AW.g.newBandFor()" class="' + btnGhost + '">+ Crear banda nueva</button></div></div>'
    );
  }

  function viewDetail() {
    const g = gs.current;
    const back = '<button onclick="AW.g.back()" class="text-sm text-slate-400 hover:text-white mb-4">← Todas las partidas</button>';
    if (!g) return shell('Partida', 'Cargando...', back + '<p class="text-slate-500">Cargando partida...</p>');

    const me = state.user.id;
    const isOwner = g.owner_id === me;
    const players = (g.game_players || []).slice().sort((a, b) => String(a.joined_at).localeCompare(String(b.joined_at)));
    const mine = players.find((p) => p.user_id === me);
    const winners = (g.victory && g.victory.winners) || [];
    const sc = scenarioById(g.scenario_id);
    const editable = g.status !== 'finished';
    let html = back;

    /* cabecera */
    html +=
      '<div class="flex flex-wrap items-center gap-3 mb-6">' + badge(g.status) +
      '<span class="text-amber-400 font-semibold">' + g.max_value + ' GP</span>' +
      '<span class="text-sm text-slate-500">Creada por ' + (isOwner ? 'ti' : esc(g.owner ? g.owner.display_name : '—')) + '</span>' +
      '<button onclick="AW.g.refresh()" class="' + btnGhost + ' ml-auto">↻ Actualizar</button></div>';

    /* resultado */
    if (g.status === 'finished') {
      const names = players.filter((p) => winners.indexOf(p.user_id) >= 0).map(playerName);
      html +=
        '<div class="mb-6 p-4 rounded-xl border border-amber-700/40 bg-amber-950/20 text-amber-200">🏆 ' +
        (names.length ? (names.length > 1 ? 'Empate entre ' : 'Ganador: ') + '<strong>' + esc(names.join(', ')) + '</strong>' : 'Partida terminada sin ganador declarado') +
        '</div>';
    }

    /* invitación */
    if (g.status === 'draft') {
      const link = location.origin + location.pathname + '?partida=' + g.join_code;
      html +=
        '<section class="mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-5"><h3 class="text-lg font-bold text-white mb-3">Invitar jugadores</h3>' +
        '<div class="flex flex-wrap items-center gap-2"><code class="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-emerald-300">' + esc(g.join_code) + '</code>' +
        '<button onclick="AW.g.copy(\'' + esc(g.join_code) + '\')" class="' + btnGhost + '">Copiar código</button>' +
        '<button onclick="AW.g.copy(\'' + esc(link) + '\')" class="' + btnGhost + '">Copiar enlace</button></div></section>';
    }

    /* escenario */
    html += '<section class="mb-6"><h3 class="text-lg font-bold text-white mb-3">Escenario</h3>';
    if (isOwner && g.status === 'draft') {
      html +=
        '<div class="flex flex-wrap gap-2 mb-3"><select onchange="AW.g.setScenario(this.value)" class="' + inputCls + ' sm:w-auto"><option value="">Sin elegir</option>' + scenarioOptions(g.scenario_id) + '</select>' +
        '<button onclick="AW.g.rollScenario()" class="' + btnGhost + '">🎲 Sortear</button></div>';
    }
    html += sc ? (typeof renderCard === 'function' ? renderCard(sc) : esc(sc.nombre)) : '<p class="text-slate-500">Todavía no hay escenario elegido.</p>';
    html += '</section>';

    /* jugadores */
    html += '<section class="mb-6"><h3 class="text-lg font-bold text-white mb-3">Jugadores (' + players.length + ')</h3><div class="space-y-3">';
    if (!players.length) html += '<p class="text-slate-500">Todavía no se ha apuntado nadie.</p>';
    players.forEach((p) => {
      const isMe = p.user_id === me;
      const won = winners.indexOf(p.user_id) >= 0;
      html +=
        '<article class="bg-slate-950 rounded-xl p-5 border ' + (won ? 'border-amber-600/60' : 'border-slate-800/60') + '">' +
        '<div class="flex flex-wrap items-center justify-between gap-3"><h4 class="text-base font-bold text-white">' + (won ? '🏆 ' : '') + esc(playerName(p)) +
        (isMe ? ' <span class="text-xs text-emerald-400 font-normal">(tú)</span>' : '') +
        (p.user_id === g.owner_id ? ' <span class="text-xs text-slate-500 font-normal">creador</span>' : '') + '</h4>' +
        '<div class="flex items-center gap-3 text-sm">';

      if (isOwner && editable) {
        html += '<input value="' + esc(p.side || '') + '" onchange="AW.g.setSide(\'' + p.user_id + '\',this.value)" maxlength="30" placeholder="Bando / equipo" class="' + inputCls + ' w-36">';
      } else if (p.side) {
        html += '<span class="text-slate-400">' + esc(p.side) + '</span>';
      }
      if (g.status === 'active' && isOwner) {
        html += '<label class="text-slate-400">PV <input type="number" min="0" step="1" value="' + p.vp + '" onchange="AW.g.setVp(\'' + p.user_id + '\',this.value)" class="' + inputCls + ' w-20 inline-block"></label>';
      } else if (g.status !== 'draft') {
        html += '<span class="text-amber-400 font-semibold">' + p.vp + ' PV</span>';
      }
      html += '</div></div><div class="mt-3">' + bandSummary(p) + '</div>';

      if (isMe && g.status === 'draft') html += bandPicker(g, p);
      html += '</article>';
    });
    html += '</div>';

    if (isOwner && !mine && g.status === 'draft') {
      html += '<button onclick="AW.g.joinSelf()" class="' + btnGhost + ' mt-3">Unirme como jugador</button>';
    }
    html += '</section>';

    /* acciones */
    html += '<section class="pt-4 border-t border-slate-800 flex flex-wrap gap-3 items-center">';
    if (isOwner && g.status === 'draft') {
      const missing = players.filter((p) => !p.band_id).map(playerName);
      const ready = players.length > 0 && !missing.length;
      html +=
        '<button onclick="AW.g.start()" class="' + btnPrimary + '"' + (ready ? '' : ' disabled') + '>Empezar partida</button>' +
        '<span class="text-sm text-slate-500">' +
        (!players.length ? 'Falta al menos un jugador.' : missing.length ? 'Falta banda de: ' + esc(missing.join(', ')) : 'Todos listos.') + '</span>';
    }
    if (isOwner && g.status === 'active') {
      if (!gs.finishing) {
        html += '<button onclick="AW.g.finishOpen()" class="' + btnPrimary + '">Terminar partida</button>';
      } else {
        const top = Math.max.apply(null, players.map((p) => p.vp));
        html +=
          '<div class="w-full bg-slate-900 border border-slate-800 rounded-xl p-4"><p class="text-sm text-slate-300 mb-3">¿Quién ha ganado? (marca varios si hay empate)</p>' +
          '<div class="space-y-1 mb-4">' +
          players
            .map((p) =>
              '<label class="flex items-center gap-2 text-slate-200"><input type="checkbox" class="aw-win accent-amber-500" value="' + p.user_id + '"' +
              (top > 0 && p.vp === top ? ' checked' : '') + '> ' + esc(playerName(p)) + ' <span class="text-slate-500">(' + p.vp + ' PV)</span></label>'
            )
            .join('') +
          '</div><div class="flex gap-3"><button onclick="AW.g.finishConfirm()" class="' + btnPrimary + '">Confirmar y cerrar</button>' +
          '<button onclick="AW.g.finishCancel()" class="' + btnGhost + '">Cancelar</button></div></div>';
      }
    }
    if (!isOwner && mine && g.status === 'draft') {
      html += '<button onclick="AW.g.leave()" class="px-4 py-2 text-rose-300 hover:bg-rose-950/40 rounded-xl text-sm">Salir de la partida</button>';
    }
    if (isOwner) {
      html += '<button onclick="AW.g.remove()" class="px-4 py-2 text-rose-300 hover:bg-rose-950/40 rounded-xl text-sm ml-auto">Borrar partida</button>';
    }
    html += '</section>';

    return shell(esc(g.name), 'Partida única', html);
  }

  /* ----------------------------------------------------------------- acciones */
  async function run(promise, okMsg) {
    const { error } = await promise;
    if (error) toast(translateError(error), 'error');
    else if (okMsg) toast(okMsg);
    if (gs.currentId) await loadGame(gs.currentId);
    rerender(true);
    return !error;
  }

  async function joinByCode(code) {
    const { data, error } = await state.sb.rpc('join_game', { p_code: code });
    if (error) {
      toast(translateError(error), 'error');
      gs.view = 'list';
      rerender();
      return;
    }
    await loadGames();
    toast('Te has unido a la partida');
    G.open(data);
  }

  G.open = async (id) => {
    gs.currentId = id;
    gs.view = 'detail';
    gs.finishing = false;
    gs.current = (gs.list || []).find((g) => g.id === id) || null;
    currentSectionId = SEC;
    window.renderSidebar();
    rerender();
    const g = await loadGame(id);
    if (!g) {
      toast('No se encuentra la partida', 'error');
      return G.back();
    }
    subscribe(id);
    rerender();
  };

  G.back = () => {
    unsubscribe();
    gs.view = 'list';
    gs.current = null;
    gs.currentId = null;
    gs.finishing = false;
    currentSectionId = SEC;
    window.renderSidebar();
    rerender();
    loadGames().then(() => rerender(true));
  };

  G.showNew = () => {
    gs.view = 'new';
    rerender();
  };

  G.refresh = async () => {
    await run(Promise.resolve({}), null);
    toast('Actualizado');
  };

  G.create = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.target);
    const name = String(f.get('name') || '').trim();
    const max = Math.floor(Number(f.get('max')) || 0);
    const sc = String(f.get('scenario') || '');
    if (!name || max < 1) return toast('Revisa el nombre y el valor máximo', 'error');

    const { data, error } = await state.sb
      .from('games')
      .insert({
        owner_id: state.user.id,
        name,
        max_value: max,
        scenario_mode: sc === 'random' ? 'random' : 'chosen',
        scenario_id: sc === 'random' ? randomScenarioId() : sc || null
      })
      .select()
      .single();
    if (error) return toast('No se pudo crear: ' + translateError(error), 'error');

    if (f.get('plays')) {
      const j = await state.sb.rpc('join_game', { p_code: data.join_code });
      if (j.error) toast(translateError(j.error), 'error');
    }
    toast('Partida creada');
    await loadGames();
    G.open(data.id);
  };

  G.join = async (ev) => {
    ev.preventDefault();
    const code = String(new FormData(ev.target).get('code') || '').trim();
    if (code) await joinByCode(code);
  };

  G.joinSelf = async () => {
    if (!gs.current) return;
    await run(state.sb.rpc('join_game', { p_code: gs.current.join_code }), 'Te has apuntado');
  };

  G.chooseBand = async (bandId) => {
    await run(
      state.sb.from('game_players').update({ band_id: bandId || null }).eq('game_id', gs.currentId).eq('user_id', state.user.id),
      bandId ? 'Banda elegida' : null
    );
  };

  G.newBandFor = () => {
    const g = gs.current;
    if (!g) return;
    AW.newBand({
      title: 'Nueva banda para "' + g.name + '"',
      maxValue: g.max_value,
      onSaved: async (band) => {
        const { error } = await state.sb
          .from('game_players')
          .update({ band_id: band.id })
          .eq('game_id', g.id)
          .eq('user_id', state.user.id);
        if (error) toast('La banda se guardó, pero no se pudo elegir: ' + translateError(error), 'error');
        G.open(g.id);
      },
      onCancel: () => G.open(g.id)
    });
  };

  G.setSide = (uid, value) =>
    run(state.sb.rpc('set_game_player_score', { p_game: gs.currentId, p_user: uid, p_vp: null, p_side: value || '' }), null);

  G.setVp = (uid, value) => {
    const vp = Math.max(0, Math.floor(Number(value) || 0));
    return run(state.sb.rpc('set_game_player_score', { p_game: gs.currentId, p_user: uid, p_vp: vp, p_side: null }), null);
  };

  G.setScenario = (id) =>
    run(state.sb.from('games').update({ scenario_id: id || null, scenario_mode: 'chosen' }).eq('id', gs.currentId), null);

  G.rollScenario = () => {
    const id = randomScenarioId(gs.current && gs.current.scenario_id);
    if (!id) return;
    return run(state.sb.from('games').update({ scenario_id: id, scenario_mode: 'random' }).eq('id', gs.currentId), 'Escenario sorteado');
  };

  G.start = () => run(state.sb.rpc('start_game', { p_game: gs.currentId }), '¡Que empiece la partida!');

  G.finishOpen = () => {
    gs.finishing = true;
    rerender(true);
  };
  G.finishCancel = () => {
    gs.finishing = false;
    rerender(true);
  };
  G.finishConfirm = async () => {
    const winners = Array.prototype.map.call(document.querySelectorAll('.aw-win:checked'), (el) => el.value);
    gs.finishing = false;
    await run(state.sb.rpc('finish_game', { p_game: gs.currentId, p_winners: winners }), 'Partida terminada');
  };

  G.leave = async () => {
    if (!confirm('¿Salir de esta partida?')) return;
    const { error } = await state.sb.from('game_players').delete().eq('game_id', gs.currentId).eq('user_id', state.user.id);
    if (error) return toast(translateError(error), 'error');
    toast('Has salido de la partida');
    G.back();
  };

  G.remove = async () => {
    const g = gs.current;
    if (!g || !confirm('¿Borrar la partida "' + g.name + '" para todos los jugadores? No se puede deshacer.')) return;
    const { error } = await state.sb.from('games').delete().eq('id', g.id);
    if (error) return toast(translateError(error), 'error');
    toast('Partida borrada');
    G.back();
  };

  G.copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast('Copiado');
    } catch (e) {
      prompt('Copia esto:', text);
    }
  };
})();
