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
// Nombres que se repiten en varias facciones con textos distintos: no se traducen por nombre (se hará por id en las reglas de facción)
const AMBIGUOS = new Set(['fae beings']);
// "Seres Fae (Fae Beings) - Dark Lords" -> "Seres Fae (Fae Beings)"
const limpiaNombre = (n) => String(n || '').replace(/\s+-\s+[^()]*$/, '').trim();

const out = { rasgos: {}, objetos: {}, reglas: {}, saberes: {}, unidades: {} };
const avisos = [];
fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort().forEach((f) => {
  const kind = f.split('_')[0];
  if (kind === 'glosario') return;
  const arr = firstArray(fs.readFileSync(path.join(dir, f), 'utf8'));
  arr.forEach((r) => {
    if (kind === 'rasgos') {
      const k = key(r.en);
      if (AMBIGUOS.has(k)) { avisos.push('ambiguo, se omite: ' + r.en); return; }
      if (out.rasgos[k]) { avisos.push('repetido, se conserva el primero: ' + r.en); return; }
      out.rasgos[k] = { nombre: limpiaNombre(r.nombre_es), resumen: r.resumen_es || '', detalles: r.detalles_es || '' };
    } else avisos.push('tipo de archivo sin soporte todavía: ' + f);
  });
});
const js = '// Generado por tools/build_traducciones.js a partir de traducciones/fuentes/*.json. No editar a mano.\n' +
  'const traduccionesES = ' + JSON.stringify(out, null, 2) + ';\n';
fs.writeFileSync(path.join(root, 'datos_traducciones_es.js'), js);
console.log('rasgos traducidos:', Object.keys(out.rasgos).length);
avisos.forEach((a) => console.log(' -', a));
