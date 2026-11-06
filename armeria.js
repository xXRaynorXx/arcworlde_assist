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
  // Identificadores de facción que difieren entre datos_minis.js y datos_facciones.js
  const ALIAS = { ourks: "ourk" };

  function factionId(name) {
    if (!name) return null;
    const n = String(name).trim().toLowerCase();
    if (typeof datosMinis !== "undefined" && datosMinis.facciones) {
      const f = datosMinis.facciones.find((x) => x.id === n || String(x.nombre).toLowerCase() === n);
      if (f) return ALIAS[f.id] || f.id;
    }
    if (typeof faccionesCompendioDB !== "undefined") {
      const k = Object.keys(faccionesCompendioDB).find((id) => id === n || String(faccionesCompendioDB[id].nombre).toLowerCase() === n);
      if (k) return k;
    }
    return null;
  }
  function exclusive(name) {
    const id = factionId(name);
    return id && typeof armeriaExclusivaDB !== "undefined" ? armeriaExclusivaDB.filter((a) => a.faccion_id === id) : [];
  }
  function find(origen, id, factionName) {
    if (origen === "comun") return armeriaComunDB.find((a) => a.id === id) || null;
    return exclusive(factionName).find((a) => a.id === id) || null;
  }
  window.AWGear = { common: () => armeriaComunDB, exclusive, find, factionId };
})();
