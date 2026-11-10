// Armería para construir bandas: la común (extraída de las Reglas de Campaña) y la exclusiva de cada
// facción (armeria_exclusiva del compendio, datos_minis.js). Cada objeto tiene coste en GP.

(function () {
  // Cómo se nombran las facciones en el texto de las reglas de facción (para saber quiénes son aliadas)
  const FACTION_WORDS = {
    imperial: /imperial/i, halfling: /halfling/i, wizards: /wizard/i, wild_elves: /wild elv/i,
    dark_lords: /dark lord/i, undead_raiders: /undead raiders/i, vampires: /vampire/i,
    ancient_dead: /ancient dead/i, ourks: /ourk/i, gremlins: /gremlin/i, beastfolk: /beastfolk/i
  };
  // Frase de las reglas de alianza: "When constructing your Warband, you may use Characters from ..."
  const ALLY_PHRASE = /you may (?:also )?use characters from|puedes (?:reclutar|incluir)/i;


  const comp = () => (typeof compendioArcWorlde !== "undefined" ? compendioArcWorlde : null);
  const factions = () => (comp() && comp().facciones) || (typeof datosMinis !== "undefined" && datosMinis.facciones) || [];

  function factionId(name) {
    if (!name) return null;
    const n = String(name).trim().toLowerCase();
    const f = factions().find((x) => x.id === n || String(x.nombre).toLowerCase() === n);
    if (f) return f.id;
    return null;
  }
  function faction(name) {
    const id = factionId(name);
    return factions().find((f) => f.id === id) || null;
  }

  // Armería común: la del compendio (con campos resumen/detalles como el resto)
  function common() {
    const c = comp();
    if (!c || !c.armeria_comun) return [];
    return c.armeria_comun.map((a) => ({
      id: a.id, origen: "comun", nombre: a.nombre, tipo: a.tipo, coste: a.coste,
      resumen: "", detalles: a.efecto || a.resumen || "", restriccion: a.restriccion || ""
    }));
  }
  function exclusive(name) {
    const f = faction(name);
    return f ? f.armeria_exclusiva || [] : [];
  }
  function find(origen, id, factionName) {
    if (origen === "comun") return common().find((a) => a.id === id) || null;
    const own = exclusive(factionName).find((a) => a.id === id);
    if (own) return own;
    for (const f of factions()) { const a = (f.armeria_exclusiva || []).find((x) => x.id === id); if (a) return a; }
    return null;
  }

  // Clase de una miniatura (campo "clase" del compendio)
  const claseOf = (u) => (u && u.clase) || "";
  const isCommander = (u) => /^commander$/.test(claseOf(u));
  // Monstruos y bestias: no compran armería común
  const isMonster = (u) => /^(monster|heavy|beast)$/.test(claseOf(u));

  // Facción de una miniatura del catálogo
  function unitFaction(unitId) {
    const f = factions().find((x) => (x.unidades || []).some((u) => u.id === unitId));
    return f ? f.id : null;
  }
  // Equipo que puede comprar una miniatura del catálogo: la armería común (salvo monstruos) y lo que
  // su ficha permite de la armería de su facción (equipo_permitido).
  function optionsFor(unitId) {
    const fid = unitFaction(unitId);
    const f = factions().find((x) => x.id === fid);
    const u = f && f.unidades.find((x) => x.id === unitId);
    if (!u) return null;
    const allowed = new Set((u.equipo_permitido || []));
    return {
      faccion: f.nombre,
      common: isMonster(u) ? [] : common(),
      // Lo que la ficha cita en equipo_permitido, de cualquier armería de facción (los mercenarios usan la de otras). Vacío = nada
      exclusive: allowed.size
        ? factions().reduce((all, x) => all.concat((x.armeria_exclusiva || []).filter((a) => allowed.has(a.id) && !all.some((b) => b.id === a.id))), [])
        : []
    };
  }

  // Facciones aliadas según su regla de facción ("Puedes reclutar/incluir unidades/personajes de ...").
  function allies(name) {
    const f = faction(name);
    if (!f) return [];
    const out = {};
    (f.reglas_faccion || []).forEach((r) => {
      const t = String(r.detalles || "");
      const m = ALLY_PHRASE.exec(t);
      if (!m) return;
      const tail = t.slice(m.index);
      Object.keys(FACTION_WORDS).forEach((id) => {
        if (id !== f.id && FACTION_WORDS[id].test(tail)) out[id] = { id, regla: r.nombre };
      });
    });
    return Object.keys(out).map((id) => out[id]);
  }

  window.AWGear = { claseOf, isCommander, isMonster, common, exclusive, find, factionId, unitFaction, optionsFor, allies };
})();
