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
  [/Saca 1 daño a sí mismo/g, 'Inflige 1 de daño a sí mismo'], [/Ignera la Armadura/g, 'Ignora la Armadura'],
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
const REVISAR = ['arcanite_token']; // el efecto de NotebookLM no coincide con el del manual ya cargado
pendObjetos.forEach((r) => {
  const m = String(r.restriccion_es || '').match(/\((\d+) GP/);
  if (!(r.id in costes)) return avisos.push('objeto sin equivalente: ' + r.id);
  if (REVISAR.includes(r.id) || (m && Number(m[1]) !== costes[r.id])) return avisos.push('objeto NO aplicado (revisar): ' + r.id + (m ? ' · NotebookLM ' + m[1] + ' GP vs compendio ' + costes[r.id] + ' GP' : ''));
  out.objetos[r.id] = { nombre: limpiaNombre(limpia(r.nombre_es)), resumen: limpia(r.resumen_es), detalles: limpia(r.detalles_es), restriccion: limpia(r.restriccion_es) };
});
fs.writeFileSync(path.join(root, 'datos_traducciones_es.js'),
  '// Generado por tools/build_traducciones.js a partir de traducciones/fuentes/*.json. No editar a mano.\n' +
  'const traduccionesES = ' + JSON.stringify(out, null, 2) + ';\n');

console.log('rasgos traducidos:', Object.keys(out.rasgos).length, '· objetos:', Object.keys(out.objetos).length, '· textos base en inglés aplicados:', base);
avisos.forEach((a) => console.log(' -', a));
