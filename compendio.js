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
  function traitInfo(name) {
    if (!idx) build();
    const k = traitKey(name);
    // "Light Armour (Gratis / +1 Armadura)" -> "light armour": se busca también sin el texto entre paréntesis
    const base = k.replace(/\s*\(.*\)\s*$/, '');
    return idx[k] || idx[base] || idx[TRAIT_ALIAS[k]] || idx[TRAIT_ALIAS[base]] || null;
  }
  window.AWCompendio = { traitInfo, traitKey };
})();
