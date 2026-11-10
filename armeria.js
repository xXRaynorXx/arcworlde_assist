// Armería para construir bandas: la común (extraída de las Reglas de Campaña) y la exclusiva de cada
// facción (armeria_exclusiva del compendio, datos_minis.js). Cada objeto tiene coste en GP.

(function () {
  // Ids de equipo mal escritos en equipo_permitido del compendio (se corrigen aquí hasta que se arreglen en los datos)
  const GEAR_ALIAS = {
    montura_halfling: "halfling_mount",
    arma_distancia_halfling: "halfling_ranged_weapon",
    almuerzo_llevar: "packed_lunch",
    estandarte_pueblo: "town_banner",
    hobgoblin_ranged_weapon: "dark_lord_ranged_weapon",
    ourk_boglin_ranged_weapon: "ourk_ranged_weapon",
    ourk_boglin_mount: "ourk_mount",
    shapeshifter_bloodline: "shapeshifter",
    fell_scholar_bloodline: "fell_scholar",
    musical_instrument: "boglin_musical_instrument"
  };
  // Cómo se nombran las facciones en el texto de las reglas de facción (para saber quiénes son aliadas)
  const FACTION_WORDS = {
    imperial: /imperial/i, halfling: /halfling/i, wizards: /wizards/i, wild_elves: /wild elves/i,
    dark_lords: /dark lords/i, undead_raiders: /undead raiders/i, vampires: /vampires/i,
    ancient_dead: /ancient dead/i, ourks: /ourks/i, gremlins: /gremlins/i, beastfolk: /beastfolk/i
  };

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

  // Ids antiguos (en castellano / sin prefijo) de bandas ya guardadas -> id actual del compendio
  const LEGACY_UNIT_ID = {
    sheriff: "halfling_sheriff",
    battle_cook: "halfling_battle_cook",
    town_guard: "halfling_town_guard",
    thing_flinger: "halfling_thing_flinger",
    monster_hunter: "halfling_monster_hunter",
    archmage: "wizard",
    battle_wizard: "apprentice",
    enchanted_sentinel: "sentinel",
    gremlin_chief: "the_great_gremlin",
    gremlin_warrior: "gremlin_scamp",
    vampire_lord: "vampire_supreme",
    vampire_thrall: "thrall",
    ancient_grave_lord: "grave_lord",
    harbinger: "undead_harbinger",
    undead_raider: "undead_bandit"
  };
  const canonId = (id) => LEGACY_UNIT_ID[id] || id;
  // Clase de una miniatura (campo "clase" del compendio)
  const claseOf = (u) => (u && u.clase) || "";
  const isCommander = (u) => /^commander$/.test(claseOf(u));
  // Monstruos y bestias: no compran armería común
  const isMonster = (u) => /^(monster|heavy|beast)$/.test(claseOf(u));

  // Facción de una miniatura del catálogo
  function unitFaction(unitId) {
    unitId = canonId(unitId);
    const f = factions().find((x) => (x.unidades || []).some((u) => u.id === unitId));
    return f ? f.id : null;
  }
  // Equipo que puede comprar una miniatura del catálogo: la armería común (salvo monstruos) y lo que
  // su ficha permite de la armería de su facción (equipo_permitido).
  function optionsFor(unitId) {
    unitId = canonId(unitId);
    const fid = unitFaction(unitId);
    const f = factions().find((x) => x.id === fid);
    const u = f && f.unidades.find((x) => x.id === unitId);
    if (!u) return null;
    const allowed = new Set((u.equipo_permitido || []).map((id) => GEAR_ALIAS[id] || id));
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
      if (!/reclutar|incluir/i.test(t)) return;
      Object.keys(FACTION_WORDS).forEach((id) => {
        if (id !== f.id && FACTION_WORDS[id].test(t)) out[id] = { id, regla: r.nombre };
      });
    });
    return Object.keys(out).map((id) => out[id]);
  }

  window.AWGear = { aliasEquipo: (id) => GEAR_ALIAS[id] || id, canonId, claseOf, isCommander, isMonster, common, exclusive, find, factionId, unitFaction, optionsFor, allies };
})();
