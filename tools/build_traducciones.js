#!/usr/bin/env node
// Genera datos_traducciones_es.js a partir de los JSON que devuelve NotebookLM (traducciones/fuentes/*.json).
// El tipo de cada archivo sale del prefijo: rasgos_*.json, (próximamente objetos_*, reglas_*, saberes_*, unidades_*).
// Los archivos pueden llevar texto detrás del JSON (la lista de dudas): se lee solo el primer array.
// Uso: node tools/build_traducciones.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const dir = path.join(root, 'traducciones', 'fuentes');
const key = (n) => String(n || '').toLowerCase().replace(/[‘’`´]/g, "'").trim();
// Primer array JSON de un texto (ignora lo que haya antes y después)
function firstArray(text) {
  const i = text.indexOf('[');
  let depth = 0, inStr = false, esc = false;
  for (let j = i; j < text.length; j++) {
    const c = text[j];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true; else if (c === '[') depth++; else if (c === ']' && --depth === 0) return JSON.parse(text.slice(i, j + 1));
  }
  throw new Error('JSON sin cerrar');
}
// "Seres Fae (Fae Beings) - Dark Lords" -> "Seres Fae (Fae Beings)"
const limpiaNombre = (n) => String(n || '').replace(/\s+-\s+[^()]*$/, '').trim();
// Erratas conocidas de las respuestas de NotebookLM (se corrigen al generar; los JSON de fuentes no se tocan)
const ERRATAS = [
  [/Ignores terreno difícil/g, 'Ignora el terreno difícil'], [/Ignera la penalización/g, 'Ignora la penalización'],
  [/Saca 1 daño a sí mismo/g, 'Inflige 1 de daño a sí mismo'], [/Órden:/g, 'Orden:'], [/Ignera la Armadura/g, 'Ignora la Armadura'],
  [/Señor Oscuro Invoque esbirros/g, 'Señor Oscuro invocar esbirros'], [/puede Invoque criaturas/g, 'puede invocar criaturas'],
  [/para Invoque criaturas/g, 'para invocar criaturas']
];
const limpia = (t) => ERRATAS.reduce((x, [re, to]) => x.replace(re, to), String(t || ''));

// Los nombres pueden repetirse (Bones, Fae Beings, Raiser of the Dead...): la 1ª aparición es "nombre", la 2ª "nombre#2", etc.
// Es el mismo orden que el diccionario de rasgos del compendio.
const out = { rasgos: {}, objetos: {}, reglas: {}, saberes: {}, unidades: {} };
const en = {};   // "nombre" / "nombre#2" -> texto literal en inglés (para el texto base del compendio)
const avisos = [];
const pendObjetos = [];
const pendReglas = [];
fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort().forEach((f) => {
  const kind = f.split('_')[0];
  if (kind === 'glosario') return;
  const arr = firstArray(fs.readFileSync(path.join(dir, f), 'utf8'));
  const visto = {};
  arr.forEach((r) => {
    if (kind === 'rasgos') {
      const base = key(r.en);
      visto[base] = (visto[base] || 0) + 1;
      const k = visto[base] > 1 ? base + '#' + visto[base] : base;
      out.rasgos[k] = { nombre: limpiaNombre(limpia(r.nombre_es)), resumen: limpia(r.resumen_es), detalles: limpia(r.detalles_es) };
      if (r.detalles_en) en[k] = r.detalles_en;
    } else if (kind === 'objetos') {
      pendObjetos.push(r);
    } else if (kind === 'saberes') {
      // saberes_texto_*.json: traducción propia de reglas de saber y efectos (desde el inglés del compendio).
      // Los demás saberes_*.json (NotebookLM) solo aportan los nombres: cambió exigencias, alcances y efectos de los hechizos.
      const sk = key(r.saber);
      const sab = (out.saberes[sk] = out.saberes[sk] || { nombre: '', reglas: '', hechizos: {} });
      const texto = f.startsWith('saberes_texto');
      if (texto) {
        if (r.reglas_saber_es) sab.reglas = r.reglas_saber_es;
      } else sab.nombre = limpiaNombre(limpia(r.saber_es));
      (r.hechizos || []).forEach((h) => {
        const hk = key(h.nombre);
        const x = (sab.hechizos[hk] = sab.hechizos[hk] || { nombre: '', efecto: '' });
        if (texto) x.efecto = h.efecto_es; else x.nombre = limpiaNombre(limpia(h.nombre_es));
      });
    } else if (kind === 'reglas') {
      pendReglas.push(r);
    } else avisos.push('tipo de archivo sin soporte todavía: ' + f);
  });
});
// Texto base (inglés literal) en el diccionario de rasgos de datos_minis.js
const mp = path.join(root, 'datos_minis.js');
let src = fs.readFileSync(mp, 'utf8');
const head = 'const compendioArcWorlde = ', i0 = src.indexOf(head), j0 = src.indexOf('\n}\n', i0) + 2;
const comp = JSON.parse(src.slice(i0 + head.length, j0));
const cuenta = {};
let base = 0;
Object.keys(comp.diccionario_rasgos).forEach((dk) => {
  const b = key(dk.split(' / ').pop());
  cuenta[b] = (cuenta[b] || 0) + 1;
  const k = cuenta[b] > 1 ? b + '#' + cuenta[b] : b;
  if (en[k]) { comp.diccionario_rasgos[dk] = { resumen: '', detalles: en[k] }; base++; }
});
if (base) fs.writeFileSync(mp, src.slice(0, i0 + head.length) + JSON.stringify(comp, null, 2) + src.slice(j0));
// Objetos: solo se aplica la traducción si el coste que cita coincide con el del compendio y no está en REVISAR (se avisa del resto)
const costes = {};
(comp.armeria_comun || []).forEach((a) => { costes[a.id] = a.coste; });
(comp.facciones || []).forEach((f) => (f.armeria_exclusiva || []).forEach((a) => { costes[a.id] = a.coste; }));
// Los 7 del lote 2/3 cuyo coste de NotebookLM difiere: el usuario decide que vale el del compendio (se aplica el texto, con el coste del compendio)
const COSTE_COMPENDIO = ['fell_scholar', 'stolen_arcloque_pistol', 'hangmans_noose', 'blood_stone', 'sacrificial_blade', 'faeblade', 'pet_droggo',
  'shield', 'two_handed_weapon', 'light_armour', 'heavy_armour', 'volley_gun', 'camouflaged_pelt', 'ugly', 'monster_rider', 'animal_totem', 'sacred_blade', 'familiar_jar'];
const REVISAR = [];
// Ficha de Arcanita: el efecto de NotebookLM no coincide con el del manual cargado; se traduce el del compendio
const MANUAL = { arcanite_token: { detalles: 'Un fragmento brillante de Arcanita. Un solo uso. Al usarlo, elige un efecto: • Otorga +1 AP al personaje durante su Activación. • Añade un D6 extra a cualquier tirada. • Permite Lanzar otro Hechizo. • Permite Repetir tirada de un D6.', restriccion: 'Un solo uso (10 GP).' } }; // el efecto de NotebookLM no coincide con el del manual ya cargado
pendObjetos.forEach((r) => {
  const m = String(r.restriccion_es || '').match(/\((\d+) GP/);
  if (!(r.id in costes)) return avisos.push('objeto sin equivalente: ' + r.id);
  if (MANUAL[r.id]) { r.detalles_es = MANUAL[r.id].detalles; r.restriccion_es = MANUAL[r.id].restriccion; }
  if (COSTE_COMPENDIO.includes(r.id) && m) r.restriccion_es = r.restriccion_es.replace(/\(\d+ GP/, '(' + costes[r.id] + ' GP');
  else if (REVISAR.includes(r.id) || (m && Number(m[1]) !== costes[r.id])) return avisos.push('objeto NO aplicado (revisar): ' + r.id + (m ? ' · NotebookLM ' + m[1] + ' GP vs compendio ' + costes[r.id] + ' GP' : ''));
  out.objetos[r.id] = { nombre: limpiaNombre(limpia(r.nombre_es)), resumen: limpia(r.resumen_es), detalles: limpia(r.detalles_es), restriccion: limpia(r.restriccion_es) };
});
// Reglas de facción: NotebookLM inventó la mecánica de las órdenes y cambió la de Raiser of the Dead; para esas se traduce el texto en inglés del compendio
const reglasBase = {};
(comp.facciones || [])
  .forEach((f) => (f.reglas_faccion || []).forEach((r) => { reglasBase[r.id] = r; }));
const MANUAL_REGLAS = {
  swords_for_hire_alliance: 'En las peligrosas y salvajes tierras de ArcWorlde a veces hace falta un poco de músculo extra, y muchos guerreros recorren el campo ofreciendo sus servicios. Cualquier Facción puede contratar Personajes del reglamento de Espadas de Alquiler (Swords for Hire) de la web de Warp Miniatures. Son mercenarios que lucharán por cualquiera, siempre que tenga los GP para pagarles.',
  order_as_one_halfling: 'Hasta tres Personajes de la misma Clase pueden Activarse juntos. Todos los Ataques realizados deben dirigirse al mismo objetivo y se resuelven uno tras otro.',
  order_stand_firm_halfling: 'Hasta tres Personajes de la misma Clase superan automáticamente todos los Chequeos de Valentía hasta el final de la Ronda.',
  order_together_imperial: 'Hasta cuatro Personajes de la misma Clase pueden Activarse juntos. Si sus Ataques se dirigen al mismo objetivo, ganan +1 al Power.',
  order_hold_imperial: 'Hasta cuatro Personajes de la misma Clase superan automáticamente todos los Chequeos de Valentía hasta el final de la Ronda.',
  order_volley_imperial: 'Hasta cuatro Personajes de la misma Clase pueden Activarse juntos. Cualquier tirada de Hazaña fallida en un Ataque a distancia puede Repetirse.',
  order_form_up_imperial: 'Aunque ya se hayan Activado, hasta cuatro Personajes de la misma Clase pueden realizar un único movimiento de 2" si no están en contacto de peana con un Personaje enemigo.',
  raiser_of_the_dead: 'Un Personaje con el Rasgo Invocador de No-Muertos (Raiser of the Dead) puede intentar resucitar a Personajes aliados caídos con el Rasgo Resucitado (Risen). Cuando un Personaje Resucitado queda Noqueado, coloca la miniatura de lado o usa una ficha para marcar dónde cayó. Para resucitar a un Personaje Noqueado, el Invocador debe realizar una Hazaña estando a 6" o menos del marcador: para Unidades o Bestias, una Hazaña Media; para Élites o Irregulares, una Hazaña Difícil; para Pesadas o Personajes aliados sin el Rasgo Resucitado, una Hazaña Legendaria. Los Personajes resucitados con éxito se colocan de nuevo en el tablero donde cayeron y pueden Activarse con normalidad, pero con el 50% de sus HP iniciales, redondeando hacia arriba.'
};
pendReglas.forEach((r) => {
  const b = reglasBase[r.id];
  if (!b) return avisos.push('regla sin equivalente: ' + r.id);
  out.reglas[r.id] = {
    nombre: limpiaNombre(limpia(r.nombre_es)), resumen: limpia(r.resumen_es),
    detalles: MANUAL_REGLAS[r.id] || limpia(r.detalles_es),
    restriccion: MANUAL_REGLAS[r.id] ? (b.restriccion || '') : limpia(r.restriccion_es)
  };
  if (MANUAL_REGLAS[r.id] && b.resumen) out.reglas[r.id].resumen = b.resumen;
});
fs.writeFileSync(path.join(root, 'datos_traducciones_es.js'),
  '// Generado por tools/build_traducciones.js a partir de traducciones/fuentes/*.json. No editar a mano.\n' +
  'const traduccionesES = ' + JSON.stringify(out, null, 2) + ';\n');

console.log('rasgos traducidos:', Object.keys(out.rasgos).length, '· objetos:', Object.keys(out.objetos).length, '· textos base en inglés aplicados:', base);
avisos.forEach((a) => console.log(' -', a));
