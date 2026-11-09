// Ficha de banda: atributos, ataques y rasgos de cada miniatura, con seguimiento en partida
// (vida actual, atributos, lesiones, noqueado). Se usa en Mis Bandas y en Partidas.
(function () {
  'use strict';
  const AW = window.AW;
  if (!AW || !AW.api) return;
  const { esc } = AW.api;

  const STATS = [['hp', 'Vida'], ['mov', 'Mov'], ['armadura', 'Armadura'], ['ap', 'AP']];
  // Tabla de lesiones (1D6) del compendio. cojera resta 1 al movimiento.
  const LESIONES = [
    ['herido', 'Herido', 'No participa en la siguiente partida'],
    ['cojera', 'Cojera', '-1 Movimiento en la siguiente partida'],
    ['golpe_cabeza', 'Golpe en la cabeza', 'No puede usar su rasgo de mayor nivel'],
    ['ojo_morado', 'Ojo morado', 'Repite los disparos que hayan tenido éxito'],
    ['brazo_cabestrillo', 'Brazo en cabestrillo', 'No puede usar escudo']
  ];

  function catalogUnit(id) {
    if (!id || typeof datosMinis === 'undefined') return null;
    for (const f of datosMinis.facciones || []) {
      const u = (f.unidades || []).find((x) => x.id === id);
      if (u) return u;
    }
    return null;
  }

  // Descripciones de rasgos: datosFacciones (compendio) y, si existe, datosRasgos { "Nombre": {resumen, detalles} }.
  let traitIdx = null;
  // Clave de búsqueda: minúsculas y apóstrofos tipográficos normalizados
  const traitKey = (n) => String(n || '').toLowerCase().replace(/[\u2018\u2019`´]/g, "'").trim();
  // Nombres con que aparece un rasgo en las miniaturas -> nombre con que está descrito
  const TRAIT_ALIAS = {
    'grand cookbook': 'grand cookbook of bulbo chubb',
    'crew and payload': 'crew & random payload',
    'things of magic': 'thing of magic',
    'elemental colleges': 'colleges of mt orion',
    'resurrection': 'raiser of the dead',
    'light armour': 'light armour (gratis)',
    'heavy armour': 'heavy armour (gratis)'
  };
  function buildTraits() {
    traitIdx = {};
    const add = (name, o) => { const k = traitKey(name); if (k && !traitIdx[k]) traitIdx[k] = o; };
    (function walk(o) {
      if (Array.isArray(o)) return o.forEach(walk);
      if (o && typeof o === 'object') {
        if (o.nombre && o.detalles) add(String(o.nombre).split(' / ').pop().trim(), o);
        Object.values(o).forEach(walk);
      }
    })(typeof datosFacciones !== 'undefined' ? datosFacciones : null);
    // Datos consolidados de facciones (tienen prioridad sobre los textos antiguos)
    const fresh = [];
    if (typeof rasgosUnidadesDB !== 'undefined') fresh.push(rasgosUnidadesDB);
    if (typeof habilidadesFaccionDB !== 'undefined') fresh.push(habilidadesFaccionDB);
    fresh.forEach((db) => db.forEach((o) => {
      const k = traitKey(String(o.nombre).split(' / ').pop());
      traitIdx[k] = o;
    }));
    // Equipo (armería común y exclusiva) como último recurso: los rasgos "de serie" suelen ser un objeto
    [typeof armeriaComunDB !== 'undefined' ? armeriaComunDB : null, typeof armeriaExclusivaDB !== 'undefined' ? armeriaExclusivaDB : null].forEach((db) => {
      (db || []).forEach((o) => {
        if (!o || !o.nombre) return;
        const k = traitKey(String(o.nombre).split(' / ').pop());
        if (!traitIdx[k]) traitIdx[k] = { nombre: o.nombre, resumen: o.resumen || o.efecto || '', detalles: o.detalles || o.efectos || o.descripcion || '' };
      });
    });
    if (typeof datosRasgos !== 'undefined' && datosRasgos) Object.keys(datosRasgos).forEach((k) => {
      const en = k.split(' / ').pop().trim();
      add(en, datosRasgos[k]);
      add(en.replace(/\s*\(.*\)\s*$/, ''), datosRasgos[k]); // "Woodlore (Lore of the Darkwood)" también como "Woodlore"
    });
  }
  function traitInfo(name) {
    if (!traitIdx) buildTraits();
    const k = traitKey(name);
    // "Light Armour (Gratis / +1 Armadura)" -> "light armour": se busca también sin el texto entre paréntesis
    const base = k.replace(/\s*\(.*\)\s*$/, '');
    return traitIdx[k] || traitIdx[base] || traitIdx[TRAIT_ALIAS[k]] || traitIdx[TRAIT_ALIAS[base]] || null;
  }
  function stripTags(s) { return String(s || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, ''); }

  function traitChip(name, extra) {
    const t = traitInfo(name);
    const tip = t ? stripTags(t.resumen) + ' ' + stripTags(t.detalles) : 'Sin descripción cargada todavía';
    return '<span title="' + esc(tip) + '" class="inline-block text-xs px-2 py-0.5 rounded-md border ' +
      (extra ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-slate-800/70 border-slate-700 text-slate-200') + '">' + esc(name) + '</span>';
  }
  function traitDetails(names) {
    return names.map((n) => {
      const t = traitInfo(n);
      return '<li><span class="text-slate-200 font-semibold">' + esc(n) + '</span>' +
        (t ? ' <span class="text-slate-400">— ' + esc(stripTags(t.resumen)) + ' ' + esc(stripTags(t.detalles)) + '</span>'
           : ' <span class="text-slate-600 italic">— sin descripción cargada</span>') + '</li>';
    }).join('');
  }

  function baseStats(c) { return (c && c.stats) || {}; }
  // Valor actual de un atributo. Una cojera que llega de la partida anterior (sin Mov guardado) resta 1.
  function cur(st, c, k) {
    if (st && st[k] != null) return Number(st[k]);
    const base = baseStats(c)[k];
    return k === 'mov' && st && Array.isArray(st.lesiones) && st.lesiones.indexOf('cojera') >= 0 ? Math.max(0, base - 1) : base;
  }

  // opts: { st: estado de la miniatura, edit: bool, idx, fn: 'AW.g.rosterAdj' }
  function unitBlock(u, opts) {
    opts = opts || {};
    const c = catalogUnit(u.id);
    const st = opts.st || {};
    const edit = !!opts.edit;
    const traits = (c && c.rasgos) || [];
    const extra = Array.isArray(st.extra) ? st.extra.slice() : []; // rasgos comprados en campaña
    // Habilidades de campaña compradas con PV (N1, N2...)
    const rc = u.rasgos_campana && typeof u.rasgos_campana === 'object' ? u.rasgos_campana : {};
    Object.keys(rc).forEach((id) => {
      const tr = window.AWTraits && AWTraits.find(id);
      extra.push((tr ? tr.nombre : id) + ' N' + rc[id]);
    });
    const all = traits.concat(extra);
    const gear = Array.isArray(u.equipo) ? u.equipo : [];
    const gearTotal = gear.reduce((t, g) => t + (Number(g.coste) || 0), 0);
    let h = '<div class="rounded-lg border ' + (st.ko ? 'border-rose-700/60 bg-rose-950/20' : 'border-slate-800 bg-slate-900/60') + ' p-3">' +
      '<div class="flex flex-wrap items-center justify-between gap-2"><p class="font-semibold text-white">' + esc(u.apodo || u.nombre) +
      (u.apodo ? ' <span class="text-xs text-slate-500 font-normal">' + esc(u.nombre) + '</span>' : c && c.nombre !== u.nombre ? ' <span class="text-xs text-slate-500 font-normal">' + esc(c.nombre) + '</span>' : '') +
      (st.ko ? ' <span class="text-xs text-rose-300">🤕 Noqueado</span>' : '') + '</p>' +
      '<span class="text-xs text-slate-500">' + esc(u.tipo || '') + ' · ' + ((Number(u.coste) || 0) + gearTotal) + ' GP' + (gearTotal ? ' <span class="text-slate-600">(' + (Number(u.coste) || 0) + ' + ' + gearTotal + ' equipo)</span>' : '') + '</span></div>';
    const serie = ((c && c.equipo_de_serie) || []).filter((x) => !/Armamento Est[aá]ndar/i.test(x));
    const serieHtml = serie.length
      ? '<div class="mt-2 flex flex-wrap gap-1.5">' + serie.map((x) => '<span title="Equipo de serie: ya incluido en el perfil" class="inline-block text-xs px-2 py-0.5 rounded-md border bg-amber-950/30 border-amber-800/50 text-amber-200">🛡️ ' + esc(x) + '</span>').join('') + '</div>'
      : '';
    const gearHtml = serieHtml + (gear.length
      ? '<div class="mt-2 flex flex-wrap gap-1.5">' + gear.map((g) => {
          const d = window.AWGear && AWGear.find(g.origen, g.id, opts.faction);
          const tip = d ? stripTags(d.resumen) + ' ' + stripTags(d.detalles) + (d.restriccion ? ' (' + stripTags(d.restriccion) + ')' : '') : '';
          return '<span title="' + esc(tip.trim()) + '" class="inline-block text-xs px-2 py-0.5 rounded-md border bg-emerald-950/40 border-emerald-800/50 text-emerald-200">🎒 ' + esc(String(g.nombre).split(' / ')[0]) + '</span>';
        }).join('') + '</div>'
      : '');
    if (!c) {
      return h + '<p class="text-xs text-slate-500 mt-1">Miniatura personalizada: sin atributos en el catálogo.</p>' + gearHtml + '</div>';
    }
    h += '<div class="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">' + STATS.map((s) => {
      const k = s[0], base = baseStats(c)[k], v = cur(st, c, k);
      const changed = v !== base;
      return '<div class="text-center bg-slate-950 rounded-md py-1.5 border border-slate-800"><p class="text-[10px] uppercase tracking-wide text-slate-500">' + s[1] + '</p>' +
        (edit
          ? '<div class="flex items-center justify-center gap-1"><button ' + AWUtil.act('click', opts.fn, [opts.idx, k, -1]) + ' class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white leading-none">−</button>' +
            '<span class="min-w-[2.5rem] font-bold ' + (changed ? 'text-amber-400' : 'text-white') + '">' + v + '</span>' +
            '<button ' + AWUtil.act('click', opts.fn, [opts.idx, k, 1]) + ' class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white leading-none">+</button></div>'
          : '<p class="font-bold ' + (changed ? 'text-amber-400' : 'text-white') + '">' + v + '</p>') +
        (changed ? '<p class="text-[10px] text-slate-500">base ' + base + '</p>' : '') + '</div>';
    }).join('') + '</div>';
    if (all.length) {
      h += '<div class="mt-2 flex flex-wrap gap-1.5">' + traits.map((n) => traitChip(n, false)).join('') + extra.map((n) => traitChip(n, true)).join('') + '</div>';
    }
    h += gearHtml;
    h += '<details class="mt-2 text-xs"><summary class="cursor-pointer text-slate-400">Ataques y rasgos en detalle</summary><ul class="mt-1 ml-4 list-disc text-slate-400 space-y-1">' +
      (c.ataques || []).map((a) => '<li>' + esc(a) + '</li>').join('') + '</ul>' +
      (all.length ? '<p class="mt-2 text-slate-500">Rasgos</p><ul class="ml-4 list-disc space-y-1">' + traitDetails(all) + '</ul>' : '') +
      (gear.length ? '<p class="mt-2 text-slate-500">Equipo</p><ul class="ml-4 list-disc space-y-1">' + gear.map((g) => {
        const d = window.AWGear && AWGear.find(g.origen, g.id, opts.faction);
        return '<li><span class="text-slate-200 font-semibold">' + esc(String(g.nombre).split(' / ')[0]) + '</span> <span class="text-slate-500">(' + (Number(g.coste) || 0) + ' GP)</span>' +
          (d ? ' <span class="text-slate-400">— ' + esc(stripTags(d.resumen)) + ' ' + esc(stripTags(d.detalles)) + (d.restriccion ? ' ' + esc(stripTags(d.restriccion)) : '') + '</span>' : '') + '</li>';
      }).join('') + '</ul>' : '') + '</details>';
    if (edit) {
      const les = Array.isArray(st.lesiones) ? st.lesiones : [];
      h += '<div class="mt-2 flex flex-wrap items-center gap-1.5">' +
        les.map((id) => {
          const l = LESIONES.find((x) => x[0] === id);
          return '<span title="' + esc(l ? l[2] : '') + '" class="text-xs px-2 py-0.5 rounded-md bg-rose-950/40 border border-rose-800/50 text-rose-200">' + esc(l ? l[1] : id) +
            ' <button ' + AWUtil.act('click', opts.fn + 'Lesion', [opts.idx, id, false]) + ' class="ml-1 hover:text-white">×</button></span>';
        }).join('') +
        '<select ' + AWUtil.act('change', opts.fn + 'Lesion', [opts.idx, '$value', true], { reset: true }) + ' class="text-xs bg-slate-950 border border-slate-700 rounded-md px-2 py-1 text-slate-300">' +
        '<option value="">+ Lesión…</option>' + LESIONES.filter((l) => les.indexOf(l[0]) < 0).map((l) => '<option value="' + l[0] + '">' + l[1] + '</option>').join('') + '</select>' +
        '<button ' + AWUtil.act('click', opts.fn + 'Ko', [opts.idx]) + ' class="text-xs px-2 py-1 rounded-md border ' + (st.ko ? 'border-rose-600 text-rose-200' : 'border-slate-700 text-slate-300') + ' hover:bg-slate-800">' +
        (st.ko ? 'Levantar' : 'Noquear') + '</button>' +
        '<button ' + AWUtil.act('click', opts.fn + 'Reset', [opts.idx]) + ' class="text-xs px-2 py-1 rounded-md border border-slate-700 text-slate-400 hover:bg-slate-800">Restaurar</button></div>';
    } else if (Array.isArray(st.lesiones) && st.lesiones.length) {
      h += '<p class="mt-2 text-xs text-rose-300">Lesiones: ' + st.lesiones.map((id) => { const l = LESIONES.find((x) => x[0] === id); return esc(l ? l[1] : id); }).join(', ') + '</p>';
    }
    return h + '</div>';
  }

  function bandSheet(units, roster, opts) {
    opts = opts || {};
    roster = roster || {};
    if (!(units || []).length) return '<p class="text-sm text-slate-500 italic">Banda vacía</p>';
    return '<div class="grid grid-cols-1 lg:grid-cols-2 gap-3">' +
      units.map((u, i) => unitBlock(u, Object.assign({}, opts, { st: roster[i], idx: i }))).join('') + '</div>';
  }

  AW.sheet = { STATS, LESIONES, catalogUnit, traitInfo, unitBlock, bandSheet, baseStats, cur };
})();
