// Armería para construir bandas: la común (extraída de las Reglas de Campaña) y la exclusiva de cada
// facción (armeriaExclusivaDB, en datos_facciones.js). Cada objeto tiene coste en GP.
const armeriaComunDB = [
  {
    "id": "arcanite_token",
    "origen": "comun",
    "nombre": "Cristal de Arcanita",
    "tipo": "Consumible",
    "coste": 10,
    "resumen": "Otorga ventajas mágicas o tácticas inmediatas.",
    "detalles": "Efectos: +1 AP, +1D6 a una tirada, permitir lanzar otro hechizo o repetir 1D6 fallido.",
    "restriccion": "De un solo uso (One use only)"
  },
  {
    "id": "torch",
    "origen": "comun",
    "nombre": "Antorcha",
    "tipo": "Consumible",
    "coste": 10,
    "resumen": "El portador cuenta como Fearsome (Temible) frente a Bestias y Monstruos.",
    "detalles": "Efectos: +1 Power en ataques cuerpo a cuerpo contra objetivos Flammable (Inflamables).",
    "restriccion": "Desventaja: los ataques a distancia contra el portador pueden repetir los fallos."
  },
  {
    "id": "shield",
    "origen": "comun",
    "nombre": "Escudo",
    "tipo": "Equipo",
    "coste": 15,
    "resumen": "Permite repetir una Tirada de Defensa fallida por ronda.",
    "detalles": "Efecto: Se puede repetir 1 dado de defensa en cada ronda.",
    "restriccion": ""
  },
  {
    "id": "two_handed_weapon",
    "origen": "comun",
    "nombre": "Arma a Dos Manos",
    "tipo": "Equipo",
    "coste": 10,
    "resumen": "Arma Pesada que otorga bonus de Power en los ataques.",
    "detalles": "Efecto: Otorga +2 Power en todos los ataques cuerpo a cuerpo.",
    "restriccion": "Invalida tus Éxitos Críticos defensivos, son considerados Fallos."
  },
  {
    "id": "dual_weapon",
    "origen": "comun",
    "nombre": "Armas Dobles",
    "tipo": "Equipo",
    "coste": 10,
    "resumen": "Permite repetir dados de ataque cuerpo a cuerpo.",
    "detalles": "Efectos: Permite repetir todos los resultados de '1' en tiradas de ataque cuerpo a cuerpo.",
    "restriccion": "Solo se permite repetir una vez por ronda."
  },
  {
    "id": "spear",
    "origen": "comun",
    "nombre": "Lanza",
    "tipo": "Equipo",
    "coste": 10,
    "resumen": "Ataques cuerpo a cuerpo hasta 2 pulgadas de distancia.",
    "detalles": "Efecto: Permite atacar a objetivos a 2\" incluso a través de aliados.",
    "restriccion": ""
  },
  {
    "id": "light_armour",
    "origen": "comun",
    "nombre": "Armadura Ligera",
    "tipo": "Equipo",
    "coste": 20,
    "resumen": "Armadura que bloquea dados de daño.",
    "detalles": "Efectos: Otorga +1 al Valor de Armadura.",
    "restriccion": ""
  },
  {
    "id": "heavy_armour",
    "origen": "comun",
    "nombre": "Armadura Pesada",
    "tipo": "Equipo",
    "coste": 35,
    "resumen": "Armadura que bloquea dados de daño.",
    "detalles": "Efectos: Otorga +2 al Valor de Armadura.",
    "restriccion": "Aumenta en +1 la dificultad de todas las tiradas de Leg It."
  }
];

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
    if (typeof armeriaExclusivaDB !== "undefined") {
      const a = armeriaExclusivaDB.find((x) => x.faccion_id === n || String(x.faccion_nombre).toLowerCase() === n);
      if (a) return a.faccion_id;
    }
    return null;
  }
  function faction(name) {
    const id = factionId(name);
    return factions().find((f) => f.id === id) || null;
  }

  // Armería común: la del compendio (con campos resumen/detalles como el resto)
  function common() {
    const c = comp();
    if (!c || !c.armeria_comun) return armeriaComunDB;
    return c.armeria_comun.map((a) => ({
      id: a.id, origen: "comun", nombre: a.nombre, tipo: a.tipo, coste: a.coste,
      resumen: "", detalles: a.efecto || a.resumen || "", restriccion: a.restriccion || ""
    }));
  }
  function exclusive(name) {
    const f = faction(name);
    if (f && f.armeria_exclusiva) return f.armeria_exclusiva;
    const id = factionId(name);
    return id && typeof armeriaExclusivaDB !== "undefined" ? armeriaExclusivaDB.filter((a) => a.faccion_id === id) : [];
  }
  function find(origen, id, factionName) {
    if (origen === "comun") return common().find((a) => a.id === id) || armeriaComunDB.find((a) => a.id === id) || null;
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
    vampire_lord: "vampire",
    vampire_thrall: "thrall",
    ancient_grave_lord: "grave_lord"
  };
  const canonId = (id) => LEGACY_UNIT_ID[id] || id;
  // Clase de una miniatura (campo "clase" del compendio; "tipo" en fichas antiguas)
  const claseOf = (u) => (u && (u.clase || u.tipo)) || "";
  const isCommander = (u) => /^(commander|comandante)$/.test(claseOf(u));
  // Monstruos y bestias: no compran armería común
  const isMonster = (u) => /^(monstruo|monster|heavy|beast)$/.test(claseOf(u));

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
      // Fichas antiguas (sin clase) sin equipo listado: se ofrece toda la armería de la facción, salvo a los monstruos. En las nuevas, vacío = nada
      // Con equipo_permitido: lo que la ficha cita de cualquier armería de facción (los mercenarios usan la de otras)
      exclusive: allowed.size
        ? factions().reduce((all, x) => all.concat((x.armeria_exclusiva || []).filter((a) => allowed.has(a.id) && !all.some((b) => b.id === a.id))), [])
        : u.clase ? [] : (f.armeria_exclusiva || []).filter(() => !isMonster(u))
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

  window.AWGear = { canonId, claseOf, isCommander, isMonster, common, exclusive, find, factionId, unitFaction, optionsFor, allies };
})();
