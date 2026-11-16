// Acceso común al compendio (datos_minis.js): índice de rasgos para la consulta y las fichas.
(function () {
  const comp = () => (typeof compendioArcWorlde !== 'undefined' ? compendioArcWorlde : null);

  // Clave de búsqueda: minúsculas y apóstrofos tipográficos normalizados
  const traitKey = (n) => String(n || '').toLowerCase().replace(/[‘’`´]/g, "'").trim();
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
  let idx = null;
  function build() {
    idx = {};
    const c = comp();
    if (!c) return;
    const add = (name, o) => { const k = traitKey(name); if (k && !idx[k]) idx[k] = o; };
    // Diccionario de rasgos del compendio
    Object.keys(c.diccionario_rasgos || {}).forEach((k) => {
      const en = k.split(' / ').pop().trim();
      add(en, c.diccionario_rasgos[k]);
      add(en.replace(/\s*\(.*\)\s*$/, ''), c.diccionario_rasgos[k]); // "Woodlore (Lore of the Darkwood)" también como "Woodlore"
    });
    // Reglas de facción y equipo (común y de facción) como último recurso: los rasgos "de serie" suelen ser un objeto
    (c.facciones || []).forEach((f) => (f.reglas_faccion || []).forEach((o) => add(String(o.nombre).split(' / ').pop(), o)));
    const gear = (c.armeria_comun || []).concat((c.facciones || []).reduce((all, f) => all.concat(f.armeria_exclusiva || []), []));
    gear.forEach((o) => {
      if (!o || !o.nombre) return;
      add(String(o.nombre).split(' / ').pop(), { nombre: o.nombre, resumen: o.resumen || '', detalles: o.detalles || o.efecto || '' });
    });
  }
  // Traducción al castellano de un rasgo (datos_traducciones_es.js). Solo se aplica con la web en castellano.
  const esActivo = () => !window.AWI18n || AWI18n.lang() === 'es';
  const trad = (kind, k) => (esActivo() && typeof traduccionesES !== 'undefined' && traduccionesES[kind] && traduccionesES[kind][k]) || null;
  // Parte inglesa de una clave del diccionario ("Escurridizo / Born Slippy" -> "born slippy")
  const enKey = (k) => traitKey(String(k).split(' / ').pop());
  function localizado(base, tr) {
    return tr ? Object.assign({}, base, { nombre: tr.nombre || base.nombre, resumen: tr.resumen || base.resumen, detalles: tr.detalles || base.detalles }) : base;
  }
  // Ataques y hechizos de las fichas de miniatura (solo en castellano): "(2 AP) Nombre: Power 6. Special Rules: ..." -> "... Reglas especiales: ..."
  function ataqueES(a) {
    const reglas = trad('unidades', 'reglas');
    if (!reglas) return a;
    let t = String(a).replace(/^\(Ranged\)/, '(A distancia)').replace(/^\(Melee\)/, '(Cuerpo a cuerpo)');
    const i = t.indexOf('Special Rules: ');
    if (i < 0) return t;
    const regla = t.slice(i + 15);
    return t.slice(0, i) + 'Reglas especiales: ' + (reglas[regla] || regla);
  }
  function hechizoES(h) {
    const hs = trad('unidades', 'hechizos');
    const tx = trad('unidades', 'hechizosTexto');
    if (tx && tx[h]) return tx[h];
    const m = hs && String(h).match(/^(.*?) \(Exige (\d+)\): /);
    const t = m && (hs[traitKey(m[1])] || hs[traitKey(m[1].replace(/\s*\(.*\)\s*$/, ''))]);
    return t ? t.nombre + ' (Exige ' + m[2] + '): ' + t.efecto : h;
  }
  function traitInfo(name) {
    const r = traitInfoBase(name);
    if (!r) return r;
    const k = traitKey(name);
    return localizado(r, trad('rasgos', k) || trad('rasgos', k.replace(/\s*\(.*\)\s*$/, '')) || trad('rasgos', TRAIT_ALIAS[k]));
  }
  function traitInfoBase(name) {
    if (!idx) build();
    const k = traitKey(name);
    // "Light Armour (Gratis / +1 Armadura)" -> "light armour": se busca también sin el texto entre paréntesis
    const base = k.replace(/\s*\(.*\)\s*$/, '');
    return idx[k] || idx[base] || idx[TRAIT_ALIAS[k]] || idx[TRAIT_ALIAS[base]] || null;
  }
  window.AWCompendio = { traitInfo, traitKey, trad, enKey, localizado, ataqueES, hechizoES };
})();
