/* ArcWorlde Assist: cuentas de usuario y bandas (Supabase)
 *
 * Se carga después del script principal de index.html y se engancha a
 * renderSidebar() y renderContent() sin tocar el compendio existente.
 * Secciones nuevas: app_account (cuenta) y app_bands (mis bandas).
 */
(function () {
  'use strict';

  const cfg = window.ARCWORLDE_CONFIG || {};
  const AW = (window.AW = {});
  // Registro para que otros módulos (partidas.js...) añadan secciones al menú.
  AW.views = {};          // id de sección -> función que devuelve el HTML
  AW.navItems = [];       // [id, icono, texto] que aparecen antes de "Mis Bandas"
  AW.hooks = { userChanged: [], afterRender: [] };

  const TIPOS = [
    ['commander', 'Comandante'],
    ['mage', 'Mago'],
    ['elite', 'Élite'],
    ['irregular', 'Irregular'],
    ['unit', 'Unidad'],
    ['heavy', 'Pesada'],
    ['beast', 'Bestia'],
    ['monster', 'Monstruo'],
    ['equipo', 'Equipo / Objeto']
  ];

  const state = {
    sb: null,
    offline: false,
    user: null,
    profile: null,
    bands: [],
    bandsLoaded: false,
    editing: null,
    authMode: 'login',
    recovery: false,
    msg: null,
    busy: false
  };

  /* ------------------------------------------------------------------ utils */
  const esc = AWUtil.esc;
  const act = AWUtil.act;

  const isApp = (id) => typeof id === 'string' && id.indexOf('app_') === 0;
  const redirectUrl = () => location.origin + location.pathname;
  const displayName = () =>
    (state.profile && state.profile.display_name) ||
    (state.user && state.user.email ? state.user.email.split('@')[0] : '');

  const toast = AWUtil.toast;

  function translateError(err) {
    const m = (err && err.message) || String(err || '');
    if (/invalid login credentials/i.test(m)) return 'Email o contraseña incorrectos.';
    if (/email not confirmed/i.test(m)) return 'Confirma tu correo antes de entrar (revisa también el spam).';
    if (/user already registered/i.test(m)) return 'Ese email ya tiene cuenta. Prueba a iniciar sesión.';
    if (/password should be at least/i.test(m)) return 'La contraseña es demasiado corta (mínimo 6 caracteres).';
    if (/rate limit|too many/i.test(m)) return 'Demasiados intentos. Espera un momento y vuelve a probar.';
    if (/unsupported provider|provider is not enabled/i.test(m)) return 'El acceso con Google aún no está activado en Supabase.';
    return m;
  }

  /* --------------------------------------------------------------- bootstrap */
  function init() {
    if (!window.supabase || !cfg.SUPABASE_URL || !cfg.SUPABASE_KEY) {
      state.offline = true;
      return;
    }
    state.sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });

    state.sb.auth.onAuthStateChange((event, session) => {
      state.user = session ? session.user : null;
      if (event === 'PASSWORD_RECOVERY') state.recovery = true;
      if (event === 'SIGNED_IN' && !state.recovery) state.msg = null;
      // No se hacen llamadas a Supabase dentro del callback: se aplazan.
      setTimeout(async () => {
        if (state.user) {
          await loadProfile();
          await loadBands();
        } else {
          state.profile = null;
          state.bands = [];
          state.bandsLoaded = false;
          state.editing = null;
          state.bandContext = null;
        }
        AW.hooks.userChanged.forEach((f) => f(state.user));
        refresh();
      }, 0);
    });
  }

  async function loadProfile() {
    const { data, error } = await state.sb.from('profiles').select('*').eq('id', state.user.id).maybeSingle();
    if (error) {
      toast('No se pudo cargar tu perfil: ' + translateError(error), 'error');
      return;
    }
    state.profile = data;
  }

  async function loadBands() {
    const { data, error } = await state.sb
      .from('bands')
      .select('*')
      .eq('owner_id', state.user.id)
      .order('updated_at', { ascending: false });
    if (error) {
      toast('No se pudieron cargar tus bandas: ' + translateError(error), 'error');
      return;
    }
    state.bands = data || [];
    state.bandsLoaded = true;
  }

  /* ------------------------------------------------------- enganche al menú */
  function appendAppNav() {
    const nav = document.getElementById('nav-menu');
    if (!nav) return;

    const label = document.createElement('p');
    label.className = 'text-xs uppercase tracking-wider text-slate-500 px-4 pt-5 pb-1 border-t border-slate-800 mt-4';
    label.textContent = 'Comunidad';
    nav.appendChild(label);

    const items = AW.navItems.concat([
      ['app_bands', '🛡️', 'Mis Bandas'],
      ['app_account', '👤', state.user ? esc(displayName()) : 'Iniciar sesión']
    ]);
    items.forEach(([id, icon, text]) => {
      const b = document.createElement('button');
      const active = currentSectionId === id;
      b.className =
        'w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-medium truncate ' +
        (active
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white');
      b.innerHTML = icon + ' ' + text;
      b.onclick = () => go(id);
      nav.appendChild(b);
    });
  }

  function go(id) {
    currentSectionId = id;
    window.renderSidebar();
    window.renderContent();
    if (window.innerWidth < 768) toggleSidebar();
  }
  AW.go = go;

  function refresh() {
    window.renderSidebar();
    if (isApp(currentSectionId)) renderApp();
  }

  const origSidebar = window.renderSidebar;
  window.renderSidebar = function () {
    origSidebar();
    appendAppNav();
  };

  const origContent = window.renderContent;
  window.renderContent = function () {
    if (isApp(currentSectionId)) return renderApp();
    return origContent();
  };

  /* ------------------------------------------------------------------ vistas */
  function shell(title, subtitle, inner) {
    return (
      '<div class="max-w-4xl mx-auto pb-12">' +
      '<header class="mb-8"><h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">' +
      title +
      '</h2><p class="text-emerald-500 font-medium mt-2">' +
      subtitle +
      '</p></header>' +
      inner +
      '</div>'
    );
  }

  function renderApp(keepScroll) {
    const main = document.getElementById('main-content');
    const prevScroll = main.scrollTop;
    let html;
    if (state.offline) {
      html = shell(
        'Cuentas no disponibles',
        'No se pudo cargar el servicio',
        '<div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-300">No se ha podido cargar Supabase. Comprueba tu conexión y recarga la página.</div>'
      );
    } else if (currentSectionId === 'app_account') {
      html = viewAccount();
    } else if (currentSectionId === 'app_bands') {
      html = viewBands();
    } else if (AW.views[currentSectionId]) {
      html = AW.views[currentSectionId]();
    } else {
      html = '';
    }
    main.innerHTML = html;
    main.scrollTop = keepScroll === true ? prevScroll : 0;
    AW.hooks.afterRender.forEach((f) => f(currentSectionId));
  }

  const inputCls =
    'w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500';
  const btnPrimary =
    'px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors text-sm';
  const btnGhost =
    'px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors text-sm';

  function msgBox() {
    if (!state.msg) return '';
    const cls =
      state.msg.type === 'error'
        ? 'bg-rose-950/40 border-rose-900/60 text-rose-200'
        : 'bg-emerald-950/40 border-emerald-900/60 text-emerald-200';
    return '<div class="mb-4 p-3 border rounded-lg text-sm ' + cls + '">' + esc(state.msg.text) + '</div>';
  }

  /* --- cuenta --- */
  function viewAccount() {
    if (state.recovery && state.user) return viewNewPassword();
    return state.user ? viewProfile() : viewLogin();
  }

  function viewLogin() {
    const reg = state.authMode === 'register';
    const googleIcon =
      '<svg class="w-5 h-5" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>';

    const inner =
      '<div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-md">' +
      msgBox() +
      '<button ' + act('click', 'AW.google', []) + ' class="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl py-2.5 font-semibold transition-colors">' +
      googleIcon +
      ' Continuar con Google</button>' +
      '<div class="flex items-center gap-3 my-5 text-xs text-slate-500"><div class="flex-1 h-px bg-slate-800"></div>o con tu email<div class="flex-1 h-px bg-slate-800"></div></div>' +
      '<form ' + act('submit', 'AW.submitAuth', ['$event']) + ' class="space-y-3">' +
      (reg
        ? '<div><label class="block text-xs text-slate-400 mb-1">Nombre de jugador</label><input name="name" required maxlength="40" class="' + inputCls + '" autocomplete="nickname"></div>'
        : '') +
      '<div><label class="block text-xs text-slate-400 mb-1">Email</label><input name="email" type="email" required class="' + inputCls + '" autocomplete="email"></div>' +
      '<div><label class="block text-xs text-slate-400 mb-1">Contraseña</label><input name="password" type="password" required minlength="6" class="' + inputCls + '" autocomplete="' + (reg ? 'new-password' : 'current-password') + '"></div>' +
      '<button type="submit" class="' + btnPrimary + ' w-full">' + (reg ? 'Crear cuenta' : 'Entrar') + '</button>' +
      '</form>' +
      '<div class="mt-4 flex justify-between text-sm">' +
      '<button ' + act('click', 'AW.setAuthMode', [(reg ? 'login' : 'register')]) + ' class="text-emerald-400 hover:text-emerald-300">' +
      (reg ? 'Ya tengo cuenta' : 'Crear una cuenta') +
      '</button>' +
      (reg ? '' : '<button ' + act('click', 'AW.forgot', []) + ' class="text-slate-400 hover:text-white">He olvidado la contraseña</button>') +
      '</div></div>';

    return shell('Tu cuenta', 'Inicia sesión para guardar tus bandas y jugar partidas y campañas', inner);
  }

  function viewProfile() {
    const inner =
      '<div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-md space-y-5">' +
      msgBox() +
      '<form ' + act('submit', 'AW.saveProfile', ['$event']) + ' class="space-y-3">' +
      '<div><label class="block text-xs text-slate-400 mb-1">Nombre de jugador</label><input name="name" required maxlength="40" value="' + esc(displayName()) + '" class="' + inputCls + '"></div>' +
      '<div><label class="block text-xs text-slate-400 mb-1">Email</label><input value="' + esc(state.user.email) + '" disabled class="' + inputCls + ' opacity-60"></div>' +
      '<button type="submit" class="' + btnPrimary + '">Guardar nombre</button>' +
      '</form>' +
      '<div class="pt-4 border-t border-slate-800 flex gap-3">' +
      '<button ' + act('click', 'AW.go', ['app_bands']) + ' class="' + btnGhost + '">Ver mis bandas (' + state.bands.length + ')</button>' +
      '<button ' + act('click', 'AW.signOut', []) + ' class="' + btnGhost + '">Cerrar sesión</button>' +
      '</div></div>';
    return shell('Hola, ' + esc(displayName()), 'Tu perfil de jugador', inner);
  }

  function viewNewPassword() {
    const inner =
      '<div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-md">' +
      msgBox() +
      '<form ' + act('submit', 'AW.setNewPassword', ['$event']) + ' class="space-y-3">' +
      '<div><label class="block text-xs text-slate-400 mb-1">Nueva contraseña</label><input name="password" type="password" required minlength="6" class="' + inputCls + '" autocomplete="new-password"></div>' +
      '<button type="submit" class="' + btnPrimary + '">Guardar contraseña</button></form></div>';
    return shell('Nueva contraseña', 'Elige una contraseña nueva para tu cuenta', inner);
  }

  /* --- bandas --- */
  function gearCost(u) {
    return (u.equipo || []).reduce((s, g) => s + (Number(g.coste) || 0), 0);
  }
  function unitTotal(u) {
    return (Number(u.coste) || 0) + gearCost(u);
  }
  function totalOf(units) {
    return (units || []).reduce((s, u) => s + unitTotal(u), 0);
  }

  function catalogFactions() {
    return typeof datosMinis !== 'undefined' && datosMinis && datosMinis.facciones ? datosMinis.facciones : [];
  }

  const catalogUnitOf = (u) => (AW.sheet && AW.sheet.catalogUnit ? AW.sheet.catalogUnit(u.id) : null);

  function catalogUnits(faction) {
    const f = catalogFactions().find((x) => x.id === faction || x.nombre === faction);
    return f ? f.unidades || [] : [];
  }

  // Miniaturas que se pueden fichar: la facción de la banda, las de sus facciones aliadas (según su regla de
  // facción; sin comandantes) y el Bestiario, que se contrata aparte.
  function recruitGroups(faction) {
    const own = catalogFactions().find((x) => x.id === faction || x.nombre === faction);
    if (!own) return [];
    const groups = [{ label: own.nombre, kind: 'own', units: (own.unidades || []).map((u) => ({ f: own, u })) }];
    window.AWGear && AWGear.allies(own.id).forEach((a) => {
      const f = catalogFactions().find((x) => x.id === a.id);
      if (!f) return;
      const units = (f.unidades || []).filter((u) => !AWGear.isCommander(u)).map((u) => ({ f, u }));
      if (units.length) groups.push({ label: 'Aliados: ' + f.nombre, kind: 'ally', units, regla: a.regla });
    });
    const best = catalogFactions().find((x) => x.id === 'bestiary');
    if (best && best.id !== own.id) groups.push({ label: 'Bestiario (se contrata aparte)', kind: 'bestiary', units: (best.unidades || []).map((u) => ({ f: best, u })) });
    const hire = catalogFactions().find((x) => x.id === 'swords_for_hire');
    if (hire && hire.id !== own.id) {
      const units = (hire.unidades || []).filter((u) => !AWGear.isCommander(u)).map((u) => ({ f: hire, u }));
      if (units.length) groups.push({ label: 'Espadas de Alquiler (se contrata aparte)', kind: 'hire', units });
    }
    return groups;
  }
  const recruitable = (faction) => recruitGroups(faction).reduce((all, g) => all.concat(g.units.map((p) => p.u)), []);
  const unitFactionName = (u, fallback) => {
    const id = window.AWGear && u && u.id ? AWGear.unitFaction(u.id) : null;
    const f = id ? catalogFactions().find((x) => x.id === id) : null;
    return f ? f.nombre : fallback;
  };

  // Reglas de composición según datos_minis.js (comandantes y límites por banda).
  function validateBand(faction, units) {
    const issues = [];
    if (!units || !units.length) return issues;

    const rules = typeof datosMinis !== 'undefined' && datosMinis ? (datosMinis.reglas_banda || datosMinis.reglas_generales_banda) : null;
    if (rules) {
      const cmds = units.filter((u) => AWGear.isCommander(catalogUnitOf(u) || u)).length;
      if (rules.comandante_obligatorio && cmds === 0 && catalogUnits(faction).some((u) => AWGear.isCommander(u))) issues.push('Falta un comandante.');
      if (rules.max_comandantes != null && cmds > rules.max_comandantes)
        issues.push('Máximo ' + rules.max_comandantes + ' comandante' + (rules.max_comandantes === 1 ? '' : 's') + ' por banda.');
    }

    recruitable(faction).forEach((c) => {
      if (c.max_por_banda == null) return;
      const n = units.filter((u) => AWGear.canonId(u.id) === c.id).length;
      if (n > c.max_por_banda) issues.push(c.nombre + ': máximo ' + c.max_por_banda + ' por banda.');
    });
    return issues;
  }

  function issuesHtml() {
    const issues = validateBand(state.editing.faction, state.editing.units);
    const ctx = state.bandContext;
    const total = totalOf(state.editing.units);
    if (ctx && ctx.maxValue && total > ctx.maxValue)
      issues.unshift('Supera el valor máximo de la partida (' + total + ' de ' + ctx.maxValue + ' GP).');
    if (!issues.length) return '';
    return (
      '<div class="mt-4 p-3 bg-amber-950/30 border border-amber-900/50 rounded-lg text-sm text-amber-200">' +
      '<p class="font-semibold mb-1">Revisa la banda:</p><ul class="list-disc list-inside space-y-0.5">' +
      issues.map((i) => '<li>' + esc(i) + '</li>').join('') +
      '</ul></div>'
    );
  }

  function viewBands() {
    if (!state.user) {
      return shell(
        'Mis Bandas',
        'Crea y guarda tus bandas',
        '<div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md"><p class="text-slate-300 mb-4">Necesitas una cuenta para guardar bandas.</p><button ' + act('click', 'AW.go', ['app_account']) + ' class="' + btnPrimary + '">Iniciar sesión</button></div>'
      );
    }
    if (state.editing) return viewBandEditor();

    let cards = '';
    if (!state.bandsLoaded) {
      cards = '<p class="text-slate-500">Cargando bandas...</p>';
    } else if (!state.bands.length) {
      cards =
        '<div class="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-8 text-center text-slate-400">Aún no tienes ninguna banda. Crea la primera.</div>';
    } else {
      cards =
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
        state.bands
          .map((b) => {
            const n = (b.units || []).length;
            const incompleta = validateBand(b.faction, b.units).length > 0;
            return (
              '<article class="bg-slate-950 rounded-xl p-5 border border-slate-800/60 hover:border-emerald-500/50 transition-colors">' +
              '<div class="flex items-start justify-between gap-3"><h5 class="text-lg font-bold text-white">' + esc(b.name) + '</h5>' +
              '<span class="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md font-semibold whitespace-nowrap">' + b.value + ' GP</span></div>' +
              '<p class="text-sm text-slate-400 mt-1">' + (b.faction ? esc(b.faction) + ' · ' : '') + n + (n === 1 ? ' miniatura' : ' miniaturas') +
              (incompleta ? ' · <span class="text-amber-400" title="No cumple las reglas de composición">⚠ revisar</span>' : '') + '</p>' +
              (b.notes ? '<p class="text-sm text-slate-500 mt-2 line-clamp-2">' + esc(b.notes) + '</p>' : '') +
              (n && AW.sheet ? '<details class="mt-3 text-sm"><summary class="cursor-pointer text-slate-300">Ver ficha (atributos y rasgos)</summary><div class="mt-2">' + AW.sheet.bandSheet(b.units, null, { faction: b.faction }) + '</div></details>' : '') +
              '<div class="mt-4 flex gap-2">' +
              '<button ' + act('click', 'AW.editBand', [b.id]) + ' class="' + btnGhost + '">Editar</button>' +
              '<button ' + act('click', 'AW.deleteBand', [b.id]) + ' class="px-4 py-2 text-rose-300 hover:bg-rose-950/40 rounded-xl text-sm transition-colors">Borrar</button>' +
              '</div></article>'
            );
          })
          .join('') +
        '</div>';
    }

    const inner =
      '<div class="mb-6"><button ' + act('click', 'AW.newBand', []) + ' class="' + btnPrimary + '">+ Nueva banda</button></div>' + cards;
    return shell('Mis Bandas', 'Las bandas de tu perfil, listas para usar en partidas y campañas', inner);
  }

  function shortName(n) {
    return String(n || '').split(' / ')[0];
  }

  // Equipo de una miniatura: filas bajo la miniatura (como las miniaturas de la banda) y un catálogo
  // para añadir más, agrupado en armería común y armería de la facción, por tipo de objeto.
  function catalogById(id) {
    if (!id) return null;
    for (const f of catalogFactions()) {
      const c = (f.unidades || []).find((x) => x.id === id);
      if (c) return c;
    }
    return null;
  }
  // Equipo que la miniatura trae de serie (sin coste; ya cuenta en su perfil). serieAll: todo el del
  // catálogo; serieOf: el que sigue llevando (se puede quitar para poner otro mejor, p. ej. una armadura pesada).
  function serieAll(u) {
    const c = catalogById(u.id);
    return ((c && c.equipo_de_serie) || []).filter((s) => !/Armamento Est[aá]ndar/i.test(s));
  }
  function serieOf(u) {
    const off = Array.isArray(u.serie_quitado) ? u.serie_quitado : [];
    return serieAll(u).filter((s) => off.indexOf(s) < 0);
  }
  // Nivel de una armadura: 1 ligera, 2 pesada, 0 si no es armadura
  const isSerieArmour = (s) => /Light Armour|Heavy Armour|Armadura (Ligera|Pesada)/i.test(s);
  const serieArmourLevel = (s) => (/Heavy Armour|Armadura Pesada/i.test(s) ? 2 : isSerieArmour(s) ? 1 : 0);
  const gearArmourLevel = (id) => (id === 'heavy_armour' ? 2 : id === 'light_armour' ? 1 : 0);
  function serieArmour(u) {
    return serieOf(u).reduce((m, s) => Math.max(m, serieArmourLevel(s)), 0);
  }
  const boughtArmour = (u) => (u.equipo || []).some((g) => g.origen === 'comun' && /^(light|heavy)_armour$/.test(g.id));
  // Horda Enterrada (Tomb Guardian): -25 % en la Armería Común, redondeado hacia arriba
  function gearPrice(u, d, origen) {
    const c = catalogById(u.id);
    const base = Number(d.coste) || 0;
    return origen === 'comun' && c && /Buried Horde/i.test((c.rasgos || []).join(' ')) ? Math.ceil(base * 0.75) : base;
  }
  // Una sola armadura por miniatura. La de serie se puede cambiar por una mejor (ligera -> pesada).
  function armourBlocked(u, d, origen) {
    if (origen !== 'comun' || !gearArmourLevel(d.id)) return false;
    return boughtArmour(u) || gearArmourLevel(d.id) <= serieArmour(u);
  }
  // Al comprar una armadura mejor se quita la de serie
  function dropSerieArmour(u) {
    const armour = serieOf(u).filter(isSerieArmour);
    if (armour.length) u.serie_quitado = (u.serie_quitado || []).concat(armour);
    return armour.length > 0;
  }

  function gearCategory(a) {
    const t = String(a.tipo || '');
    if (/Forma Animal|Linaje/i.test(t)) return 'Rasgos comprables';
    if (/armour|shield/i.test(a.id)) return 'Armaduras y protección';
    if (/Consumible|Explosivo|Invocaci|Grimorio|Apoyo/.test(t)) return 'Objetos y consumibles';
    if (/Montura|Volador|Veh/.test(t)) return 'Monturas y vehículos';
    if (/Armadura|Camuflaje|Mutaci/.test(t)) return 'Armaduras y protección';
    if (/Arma|Varita|Linaje/.test(t) || /^Equipo/.test(t)) return 'Armas y equipo';
    return 'Otros';
  }

  // En campaña, lo que se compra cuesta según el humor del comerciante (ctx.buyFactor)
  function shopCtx() { return state.bandContext && state.bandContext.buyFactor && state.bandContext.buyFactor !== 1 ? state.bandContext : null; }
  const shopPrice = (p, bc) => Math.round((Number(p) || 0) * bc.buyFactor);

  function gearCostLabel(u, g) {
    const bc = shopCtx();
    const base = Number(g.coste) || 0;
    if (bc && bc.isNewGear && bc.isNewGear(u, g)) return '<span class="text-slate-500 line-through">' + base + '</span> ' + shopPrice(base, bc) + ' GP';
    return base + ' GP';
  }

  function gearBlock(u, i) {
    const faction = unitFactionName(u, state.editing.faction);
    const has = (origen, id) => (u.equipo || []).some((g) => g.origen === origen && g.id === id);
    const off = Array.isArray(u.serie_quitado) ? u.serie_quitado : [];
    const serieRows = serieAll(u)
      .map((s, k) =>
        off.indexOf(s) < 0
          ? '<div class="grid grid-cols-12 gap-2 items-center pl-4 border-l-2 border-amber-700/70">' +
            '<div class="col-span-8 text-sm text-slate-200">' + esc(s) + '</div>' +
            '<div class="col-span-3 text-xs text-amber-400/80 text-right">de serie · gratis</div>' +
            '<button ' + act('click', 'AW.removeSerie', [i, k]) + ' title="Quitar el equipo de serie (no se recupera su valor)" class="col-span-1 text-slate-400 hover:text-rose-400 text-lg leading-none">×</button></div>'
          : '<div class="grid grid-cols-12 gap-2 items-center pl-4 border-l-2 border-slate-800">' +
            '<div class="col-span-8 text-sm text-slate-500 line-through">' + esc(s) + '</div>' +
            '<div class="col-span-3 text-xs text-slate-500 text-right">de serie · quitado</div>' +
            '<button ' + act('click', 'AW.restoreSerie', [i, k]) + ' title="Volver a llevarlo" class="col-span-1 text-slate-400 hover:text-emerald-400 text-base leading-none">↺</button></div>'
      )
      .join('');
    const rows = serieRows + (u.equipo || [])
      .map((g, j) => {
        const d = window.AWGear && AWGear.find(g.origen, g.id, faction);
        const info = d ? [d.resumen, d.detalles, d.restriccion].filter(Boolean).map((x) => String(x).replace(/<[^>]*>/g, ' ')).join(' ') : '';
        return (
          '<div class="grid grid-cols-12 gap-2 items-center pl-4 border-l-2 ' + (g.origen === 'comun' ? 'border-slate-600' : 'border-emerald-700') + '">' +
          '<div class="col-span-8 sm:col-span-7 text-sm text-slate-200">' + esc(shortName(g.nombre)) +
          '<span class="text-xs text-slate-500"> · ' + (g.origen === 'comun' ? 'común' : 'facción') + '</span></div>' +
          '<div class="hidden sm:block sm:col-span-3 text-xs text-slate-500">' + esc(d ? String(d.tipo).replace(/^Equipo \/ |^Objeto \//, '') : '') + '</div>' +
          '<div class="col-span-3 sm:col-span-1 text-sm text-amber-400 text-right">' + gearCostLabel(u, g) + '</div>' +
          '<button ' + act('click', 'AW.removeGear', [i, j]) + ' title="Quitar" class="col-span-1 text-slate-400 hover:text-rose-400 text-lg leading-none">×</button>' +
          (info ? '<details class="col-span-12 text-xs text-slate-500"><summary class="cursor-pointer">Ver reglas</summary><p class="mt-1 text-slate-400">' + esc(info) + '</p></details>' : '') +
          '</div>'
        );
      })
      .join('');
    let select = '';
    if (window.AWGear) {
      const groups = [];
      const add = (label, items, origen) => {
        const byCat = {};
        items.filter((a) => !has(origen, a.id) && !armourBlocked(u, a, origen)).forEach((a) => (byCat[gearCategory(a)] = byCat[gearCategory(a)] || []).push(a));
        Object.keys(byCat).forEach((cat) =>
          groups.push(
            '<optgroup label="' + esc(label + ' — ' + cat) + '">' +
              byCat[cat].map((a) => '<option value="' + origen + ':' + esc(a.id) + '">' + esc(shortName(a.nombre)) + ' (' + gearPrice(u, a, origen) + ' GP' + (gearPrice(u, a, origen) !== a.coste ? ', -25%' : '') + (shopCtx() ? ' → ' + shopPrice(gearPrice(u, a, origen), shopCtx()) + ' GP al comprar' : '') + ')</option>').join('') +
              '</optgroup>'
          )
        );
      };
      const opts = u.id ? AWGear.optionsFor(u.id) : null;
      add('Común', opts ? opts.common : AWGear.common(), 'comun');
      add(faction || 'Facción', opts ? opts.exclusive : AWGear.exclusive(faction), 'faccion');
      select =
        '<select ' + act('change', 'AW.addGear', [i, '$value']) + ' class="' + inputCls + ' sm:w-auto">' +
        '<option value="">Añadir equipo del catálogo...</option>' + groups.join('') + '</select>';
    }
    return (
      '<div class="col-span-12 space-y-1.5 mt-1">' +
      '<p class="text-xs uppercase tracking-wide text-slate-500">Equipo</p>' +
      (rows || '<p class="pl-4 text-xs text-slate-600 italic">Sin equipo</p>') +
      '<div class="pl-4 flex flex-wrap items-center gap-3">' + select +
      '<span class="ml-auto text-xs text-slate-500">Total miniatura: <span id="aw-sub-' + i + '" class="text-amber-400 font-semibold">' + unitTotal(u) + '</span> GP</span></div></div>'
    );
  }

  function unitRow(u, i) {
    const tipo = (TIPOS.find((t) => t[0] === ((catalogUnitOf(u) || {}).clase || u.tipo)) || [0, (catalogUnitOf(u) || {}).clase || u.tipo || ''])[1];
    const fname = unitFactionName(u, state.editing.faction);
    const ally = u.id && fname && state.editing.faction && fname !== state.editing.faction && !/Bestiar|Bestiary/i.test(fname);
    return (
      '<div class="grid grid-cols-12 gap-2 items-center bg-slate-950/40 border border-slate-800/60 rounded-xl p-2">' +
      // Perfil, tipo y coste base vienen del catálogo y no se editan
      '<div class="col-span-9 sm:col-span-8 text-sm font-semibold text-slate-100 px-1" title="Perfil del catálogo">' + esc(u.nombre) +
      ' <span class="ml-1 text-xs font-normal px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">' + esc(tipo) + '</span>' +
      (ally ? ' <span class="text-xs font-normal text-sky-300">aliado · ' + esc(shortName(fname)) + '</span>' : '') + '</div>' +
      '<div class="col-span-2 sm:col-span-3 text-sm text-right text-amber-400" title="Coste base de la miniatura">' + (Number(u.coste) || 0) + ' GP</div>' +
      '<button ' + act('click', 'AW.removeUnit', [i]) + ' title="Quitar" aria-label="Quitar miniatura" class="col-span-1 text-slate-400 hover:text-rose-400 text-xl leading-none px-2 py-1">×</button>' +
      '<input value="' + esc(u.apodo || '') + '" ' + act('input', 'AW.setUnit', [i, 'apodo', '$value']) + ' placeholder="Nombre propio (opcional), p. ej. Bilbo" aria-label="Nombre propio de la miniatura" maxlength="40" class="' + inputCls + ' col-span-12">' +
      (state.bandContext && state.bandContext.badge ? state.bandContext.badge(u) : '') +
      (state.bandContext && state.bandContext.canTemp && state.bandContext.canTemp(u)
        ? '<label class="col-span-12 text-xs text-sky-200 flex items-center gap-2"><input type="checkbox" ' + (u.temporal ? 'checked ' : '') + act('change', 'AW.setUnitTemp', [i, '$checked']) + '> Sustituto temporal (se paga con el crédito de las miniaturas heridas y se va al acabar la partida)</label>'
        : '') +
      (u.id && catalogUnitOf(u) && AW.sheet
        ? '<details class="col-span-12 text-sm"><summary class="cursor-pointer text-slate-400 hover:text-slate-200">Ver ficha (atributos, ataques y rasgos)</summary><div class="mt-2">' + AW.sheet.unitBlock(u, { faction: fname }) + '</div></details>'
        : '') +
      gearBlock(u, i) +
      '</div>'
    );
  }

  // "Vida 10 · Mov 4 · Arm 1 · AP 4" de una unidad del catálogo
  function statLine(c) {
    const s = (c && c.stats) || {};
    return 'Vida ' + (s.hp != null ? s.hp : '-') + ' · Mov ' + (s.mov != null ? s.mov : '-') +
      ' · Arm ' + (s.armadura != null ? s.armadura : '-') + ' · AP ' + (s.ap != null ? s.ap : '-');
  }

  // Selector de facción (antes era un campo de texto con sugerencias que no se veía bien).
  // Si la banda tiene una facción escrita a mano que no está en el catálogo, se conserva como opción.
  function factionSelect(current, factions, locked) {
    const known = factions.some((f) => f.nombre === current);
    const lc = String(current || '').toLowerCase();
    const resolved = factions.find((f) => f.id === lc || String(f.nombre).toLowerCase() === lc);
    const value = known ? current : resolved ? resolved.nombre : current;
    return (
      '<select ' + act('change', 'AW.setField', ['faction', '$value'],{then:'AW.rerender'}) + '' + (locked ? ' disabled' : '') + ' class="' + inputCls + '">' +
      '<option value=""' + (value ? '' : ' selected') + '>Elige facción...</option>' +
      factions.map((f) => '<option value="' + esc(f.nombre) + '"' + (f.nombre === value ? ' selected' : '') + '>' + esc(f.nombre) + '</option>').join('') +
      (value && !factions.some((f) => f.nombre === value) ? '<option value="' + esc(value) + '" selected>' + esc(value) + ' (sin catálogo)</option>' : '') +
      '</select>'
    );
  }

  function viewBandEditor() {
    const e = state.editing;
    const ctx = state.bandContext;
    const factions = catalogFactions();
    const groups = recruitGroups(e.faction);

    const inner =
      '<div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-5">' +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
      '<div><label class="block text-xs text-slate-400 mb-1">Nombre de la banda</label><input value="' + esc(e.name) + '" ' + act('input', 'AW.setField', ['name', '$value']) + ' maxlength="60" class="' + inputCls + '"></div>' +
      '<div><label class="block text-xs text-slate-400 mb-1">Facción' + (e.units.length && !(ctx && ctx.lockFaction) ? ' <span class="text-slate-500">(quita las miniaturas para cambiarla)</span>' : '') + '</label>' + factionSelect(e.faction, factions, (ctx && ctx.lockFaction) || e.units.length > 0) + '</div>' +
      '</div>' +
      '<div><label class="block text-xs text-slate-400 mb-1">Notas</label><textarea ' + act('input', 'AW.setField', ['notes', '$value']) + ' rows="2" maxlength="500" class="' + inputCls + '">' + esc(e.notes) + '</textarea></div>' +
      '<div class="border-t border-slate-800 pt-5">' +
      '<div class="flex items-center justify-between mb-3"><h4 class="text-lg font-bold text-white">Miniaturas y equipo</h4>' +
      '<span class="text-amber-400 font-bold"><span id="aw-total">' + totalOf(e.units) + '</span> GP' +
      (ctx && ctx.maxValue ? ' <span class="text-slate-500 font-normal">/ ' + ctx.maxValue + '</span>' : '') + '</span></div>' +
      (ctx && ctx.summary ? '<div id="aw-ctx" class="mb-3">' + ctx.summary(e.units) + '</div>' : '') +
      '<div class="space-y-2">' + e.units.map(unitRow).join('') + '</div>' +
      '<div class="mt-3">' +
      (groups.length
        ? '<select ' + act('change', 'AW.addFromCatalog', ['$value'], { reset: true }) + ' class="' + inputCls + ' sm:w-auto"><option value="">Añadir miniatura del catálogo...</option>' +
          groups.map((g) =>
            TIPOS.map((t) => {
              const opts = g.units
                .filter((p) => AWGear.claseOf(p.u) === t[0])
                .map((p) => '<option value="' + esc(p.f.id + ':' + p.u.id) + '">' + esc(p.u.nombre) + ' (' + (Number(p.u.coste) || 0) + ' GP · ' + statLine(p.u) + ')</option>')
                .join('');
              return opts ? '<optgroup label="' + esc(g.label + ' — ' + t[1]) + '">' + opts + '</optgroup>' : '';
            }).join('')
          ).join('') +
          '</select>' +
          (groups.some((g) => g.kind === 'ally') ? '<p class="mt-2 text-xs text-sky-300/80">Sugeridas por alianza: ' + groups.filter((g) => g.kind === 'ally').map((g) => esc(g.label.replace('Aliados: ', ''))).join(', ') + ' (regla de facción).</p>' : '')
        : e.faction && factions.length
          ? '<span class="text-xs text-slate-500">No hay catálogo para "' + esc(e.faction) + '".</span>'
          : '<span class="text-xs text-slate-500">Elige una facción para ver su catálogo de miniaturas.</span>') +
      '</div>' +
      '<div id="aw-issues">' + issuesHtml() + '</div></div>' +
      '<div class="pt-5 border-t border-slate-800 flex gap-3">' +
      '<button ' + act('click', 'AW.saveBand', []) + ' class="' + btnPrimary + '"' + (state.busy ? ' disabled' : '') + '>Guardar banda</button>' +
      '<button ' + act('click', 'AW.cancelEdit', []) + ' class="' + btnGhost + '">Cancelar</button></div>' +
      '</div>';

    return shell(
      ctx && ctx.title ? esc(ctx.title) : e.id ? 'Editar banda' : 'Nueva banda',
      ctx && ctx.subtitle
        ? esc(ctx.subtitle)
        : ctx && ctx.maxValue
        ? 'Valor máximo de la partida: ' + ctx.maxValue + ' GP. Al guardar, se apunta a ella con esta banda.'
        : 'El valor total se calcula con el coste de cada línea',
      inner
    );
  }

  /* ----------------------------------------------------------------- acciones */
  AW.setAuthMode = (mode) => {
    state.authMode = mode;
    state.msg = null;
    renderApp();
  };

  AW.submitAuth = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.target);
    const email = String(f.get('email') || '').trim();
    const password = String(f.get('password') || '');
    const btn = ev.target.querySelector('button[type=submit]');
    btn.disabled = true;
    state.msg = null;

    if (state.authMode === 'register') {
      const name = String(f.get('name') || '').trim();
      const { data, error } = await state.sb.auth.signUp({
        email,
        password,
        options: { data: { full_name: name }, emailRedirectTo: redirectUrl() }
      });
      if (error) state.msg = { type: 'error', text: translateError(error) };
      else if (!data.session)
        state.msg = { type: 'ok', text: 'Cuenta creada. Te hemos enviado un correo para confirmarla.' };
    } else {
      const { error } = await state.sb.auth.signInWithPassword({ email, password });
      if (error) state.msg = { type: 'error', text: translateError(error) };
    }
    btn.disabled = false;
    if (!state.user) renderApp();
  };

  AW.google = async () => {
    state.msg = null;
    const { error } = await state.sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl() }
    });
    if (error) {
      state.msg = { type: 'error', text: translateError(error) };
      renderApp();
    }
  };

  AW.forgot = async () => {
    const email = prompt('Escribe el email de tu cuenta:');
    if (!email) return;
    const { error } = await state.sb.auth.resetPasswordForEmail(email.trim(), { redirectTo: redirectUrl() });
    state.msg = error
      ? { type: 'error', text: translateError(error) }
      : { type: 'ok', text: 'Si el email existe, recibirás un enlace para cambiar la contraseña.' };
    renderApp();
  };

  AW.setNewPassword = async (ev) => {
    ev.preventDefault();
    const password = String(new FormData(ev.target).get('password') || '');
    const { error } = await state.sb.auth.updateUser({ password });
    if (error) {
      state.msg = { type: 'error', text: translateError(error) };
    } else {
      state.recovery = false;
      state.msg = { type: 'ok', text: 'Contraseña actualizada.' };
      toast('Contraseña actualizada');
    }
    renderApp();
  };

  AW.saveProfile = async (ev) => {
    ev.preventDefault();
    const name = String(new FormData(ev.target).get('name') || '').trim();
    if (!name) return;
    const { error } = await state.sb.from('profiles').update({ display_name: name }).eq('id', state.user.id);
    if (error) {
      toast(translateError(error), 'error');
      return;
    }
    state.profile = Object.assign({}, state.profile, { display_name: name });
    toast('Nombre guardado');
    refresh();
  };

  AW.signOut = async () => {
    await state.sb.auth.signOut();
    state.msg = null;
  };

  /* bandas */
  // ctx (opcional): { title, maxValue, onSaved(band), onCancel() } cuando se crea una banda
  // para una partida concreta; al guardar o cancelar se vuelve a ella.
  AW.newBand = (ctx) => {
    state.bandContext = ctx && typeof ctx === 'object' && ctx.onSaved ? ctx : null;
    state.editing = { id: null, name: '', faction: '', notes: '', units: [] };
    if (state.bandContext) currentSectionId = 'app_bands';
    window.renderSidebar();
    renderApp();
  };

  // Edita una banda que no es del perfil (la de una campaña). ctx: { title, subtitle, summary(units) -> html,
  // save(units) -> false si falla, onSaved(), onCancel() }. Cada miniatura guarda su posición original en _o.
  AW.editBandCtx = (ctx, data) => {
    state.bandContext = ctx;
    state.editing = {
      id: null,
      name: data.name || '',
      faction: data.faction || '',
      notes: data.notes || '',
      units: (JSON.parse(JSON.stringify(data.units || []))).map((u, i) => Object.assign(u, { _o: i }))
    };
    state.editing._init = JSON.stringify(state.editing.units);
    currentSectionId = 'app_bands';
    window.renderSidebar();
    renderApp();
  };

  AW.editBand = (id) => {
    const b = state.bands.find((x) => x.id === id);
    if (!b) return;
    state.editing = {
      id: b.id,
      name: b.name,
      faction: b.faction || '',
      notes: b.notes || '',
      units: JSON.parse(JSON.stringify(b.units || []))
    };
    renderApp();
  };

  AW.cancelEdit = async () => {
    const ctx = state.bandContext;
    if (ctx && ctx.save && state.editing && state.editing._init !== JSON.stringify(state.editing.units)) {
      if (!(await AWUtil.confirm('Tienes cambios sin guardar en la banda. ¿Descartarlos?', { danger: true, yes: 'Descartar', no: 'Seguir editando' }))) return;
    }
    state.editing = null;
    state.bandContext = null;
    if (ctx && ctx.onCancel) return ctx.onCancel();
    renderApp();
  };

  AW.rerender = () => renderApp();

  AW.setField = (k, v) => {
    if (k === 'faction' && v !== state.editing.faction) {
      // El equipo exclusivo de otra facción deja de ser válido
      state.editing.units.forEach((u) => {
        u.equipo = (u.equipo || []).filter((g) => g.origen === 'comun');
      });
    }
    state.editing[k] = v;
  };

  AW.addGear = (i, val) => {
    if (!val) return;
    const [origen, id] = String(val).split(':');
    const unit = state.editing.units[i];
    if (!unit) return;
    const d = window.AWGear && AWGear.find(origen, id, unitFactionName(unit, state.editing.faction));
    if (!d) return;
    const opts = unit.id ? AWGear.optionsFor(unit.id) : null;
    if (opts && !(origen === 'comun' ? opts.common : opts.exclusive).some((a) => a.id === id)) return toast('Esta miniatura no puede llevar ese equipo', 'error');
    unit.equipo = unit.equipo || [];
    if (unit.equipo.some((g) => g.origen === origen && g.id === id)) return;
    if (armourBlocked(unit, d, origen)) return toast('Esta miniatura ya lleva armadura', 'error');
    if (origen === 'comun' && gearArmourLevel(d.id) && dropSerieArmour(unit)) toast('Sustituye a la armadura de serie');
    unit.equipo.push({ id: d.id, origen, nombre: d.nombre, coste: gearPrice(unit, d, origen) });
    renderApp(true);
  };

  // Quitar / recuperar equipo de serie (k: posición en el equipo de serie del catálogo)
  AW.removeSerie = (i, k) => {
    const unit = state.editing.units[i];
    const s = unit && serieAll(unit)[k];
    if (!s) return;
    unit.serie_quitado = (unit.serie_quitado || []).filter((x) => x !== s).concat(s);
    renderApp(true);
  };
  AW.restoreSerie = (i, k) => {
    const unit = state.editing.units[i];
    const s = unit && serieAll(unit)[k];
    if (!s) return;
    if (isSerieArmour(s) && boughtArmour(unit)) return toast('Quita antes la armadura comprada', 'error');
    unit.serie_quitado = (unit.serie_quitado || []).filter((x) => x !== s);
    if (!unit.serie_quitado.length) delete unit.serie_quitado;
    renderApp(true);
  };

  AW.removeGear = (i, j) => {
    const unit = state.editing.units[i];
    if (!unit || !unit.equipo) return;
    unit.equipo.splice(j, 1);
    renderApp(true);
  };

  AW.setUnit = (i, k, v) => {
    state.editing.units[i][k] = k === 'coste' ? (v === '' ? '' : Math.max(0, Math.floor(Number(v) || 0))) : v;
    const t = document.getElementById('aw-total');
    if (t) t.textContent = totalOf(state.editing.units);
    const sub = document.getElementById('aw-sub-' + i);
    if (sub) sub.textContent = unitTotal(state.editing.units[i]);
    const iss = document.getElementById('aw-issues');
    if (iss) iss.innerHTML = issuesHtml();
    const cx = document.getElementById('aw-ctx');
    if (cx && state.bandContext && state.bandContext.summary) cx.innerHTML = state.bandContext.summary(state.editing.units);
  };

  AW.setUnitTemp = (i, v) => {
    if (v) state.editing.units[i].temporal = true; else delete state.editing.units[i].temporal;
    renderApp(true);
  };

  // Añade una miniatura del catálogo: val = "idFacción:idMiniatura". Nombre, tipo y coste vienen del catálogo.
  AW.addFromCatalog = (val) => {
    if (!val) return;
    const [fid, uid] = String(val).split(':');
    const pick = recruitGroups(state.editing.faction).reduce((all, g) => all.concat(g.units), []).find((p) => p.f.id === fid && p.u.id === uid);
    if (!pick) return;
    state.editing.units.push({ id: pick.u.id, nombre: pick.u.nombre, tipo: AWGear.claseOf(pick.u) || 'unit', coste: Number(pick.u.coste) || 0, faccion_id: pick.f.id });
    renderApp();
  };

  AW.removeUnit = (i) => {
    state.editing.units.splice(i, 1);
    renderApp();
  };

  AW.saveBand = async () => {
    const e = state.editing;
    const name = e.name.trim();
    if (!name) return toast('Ponle un nombre a la banda', 'error');
    if (e.units.some((u) => !String(u.nombre || '').trim()))
      return toast('Todas las líneas necesitan nombre', 'error');

    const units = e.units.map((u) =>
      Object.assign({}, u, {
        nombre: String(u.nombre).trim(),
        apodo: String(u.apodo || '').trim().slice(0, 40) || undefined,
        coste: Math.max(0, Math.floor(Number(u.coste) || 0)),
        equipo: (u.equipo || []).map((g) => ({
          id: String(g.id),
          origen: g.origen === 'comun' ? 'comun' : 'faccion',
          nombre: String(g.nombre),
          coste: Math.max(0, Math.floor(Number(g.coste) || 0))
        }))
      })
    );
    const payload = {
      name,
      faction: e.faction.trim() || null,
      notes: e.notes.trim() || null,
      units,
      value: totalOf(units)
    };

    // Banda creada para una partida: debe respetar el valor máximo y las reglas de composición.
    const forGame = state.bandContext;
    if (forGame && !units.length) return toast('Añade al menos una miniatura', 'error');
    if (forGame && forGame.maxValue && payload.value > forGame.maxValue)
      return toast('La banda supera el valor máximo de la partida (' + forGame.maxValue + ' GP)', 'error');
    if (forGame && validateBand(payload.faction, units).length)
      return toast('Corrige los avisos de la banda antes de guardarla', 'error');

    // Banda de una campaña: no se guarda en el perfil, la guarda la propia campaña (con sus compras y ventas)
    if (forGame && forGame.save) {
      state.busy = true;
      const ok = await forGame.save(units);
      state.busy = false;
      if (ok === false) return renderApp(true);
      state.editing = null;
      state.bandContext = null;
      return forGame.onSaved && forGame.onSaved();
    }

    state.busy = true;
    const q = e.id
      ? state.sb.from('bands').update(payload).eq('id', e.id)
      : state.sb.from('bands').insert(Object.assign({ owner_id: state.user.id }, payload));
    const { data, error } = await q.select().single();
    state.busy = false;

    if (error) return toast('No se pudo guardar: ' + translateError(error), 'error');
    toast('Banda guardada');
    const ctx = state.bandContext;
    state.editing = null;
    state.bandContext = null;
    await loadBands();
    if (ctx && ctx.onSaved) return ctx.onSaved(data);
    renderApp();
  };

  AW.deleteBand = async (id) => {
    const b = state.bands.find((x) => x.id === id);
    if (!b || !(await AWUtil.confirm('¿Borrar la banda "' + b.name + '"? No se puede deshacer.', { danger: true, yes: 'Borrar' }))) return;
    const { error } = await state.sb.from('bands').delete().eq('id', id);
    if (error) return toast('No se pudo borrar: ' + translateError(error), 'error');
    toast('Banda borrada');
    await loadBands();
    renderApp();
  };

  // Utilidades compartidas con otros módulos (partidas.js...)
  AW.api = {
    state, esc, toast, translateError, shell, msgBox, inputCls, btnPrimary, btnGhost,
    validateBand, totalOf, render: renderApp, displayName
  };

  init();
})();
