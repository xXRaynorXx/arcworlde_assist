/* ArcWorlde Assist: idiomas de la interfaz (castellano por defecto, inglés).
 *
 *  - El castellano es el texto original del código: la clave de traducción ES el texto en castellano.
 *  - i18n_en.js define window.AW_EN (texto en castellano -> inglés) y window.AW_EN_RE (patrones con números o nombres).
 *  - Todo texto que aparece en pantalla se traduce solo (texto de la página, placeholder, title, aria-label...),
 *    tanto el de index.html como el que generan los módulos, sin tener que envolver cada cadena.
 *  - AWI18n.t(texto, {vars}) sirve para cadenas armadas en el código (toasts, confirmaciones...): usa {nombre} como hueco.
 *  - AWI18n.missing() devuelve los textos en castellano que se han visto en pantalla sin traducción (para completar el diccionario).
 */
(function () {
  'use strict';
  const KEY = 'aw_lang';
  const LANGS = [['es', 'ES', 'Castellano'], ['en', 'EN', 'English']];
  let lang = 'es';
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && LANGS.some((l) => l[0] === saved)) lang = saved;
  } catch (e) { /* sin almacenamiento: castellano */ }

  const dict = () => window.AW_EN || {};
  const patterns = () => window.AW_EN_RE || [];
  const missing = new Set();
  const norm = (s) => String(s).replace(/\s+/g, ' ').trim();
  const fill = (s, vars) => (vars ? s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m)) : s);

  // Traduce un texto en castellano. Devuelve null si no hay traducción
  function lookup(src) {
    const k = norm(src);
    if (!k) return null;
    const d = dict();
    if (d[k] != null) return d[k];
    // Dos puntos finales: "Ataques:"
    if (k.length > 1 && k.endsWith(':')) { const r = lookup(k.slice(0, -1)); if (r != null) return r + ':'; }
    // Números: "Misión 3 de 5" se busca como "Misión # de #" y los números se recolocan en la traducción
    if (/\d/.test(k)) {
      const nums = k.match(/\d+(?:[.,]\d+)?/g);
      const tpl = d[k.replace(/\d+(?:[.,]\d+)?/g, '#')];
      if (tpl != null) { let i = 0; return tpl.replace(/#/g, () => nums[i++] != null ? nums[i - 1] : '#'); }
    }
    // Fragmentos y plantillas: se aplican todos los que coincidan
    let res = k, changed = false;
    for (const [re, to] of patterns()) {
      re.lastIndex = 0;
      if (re.test(res)) { re.lastIndex = 0; res = res.replace(re, to); changed = true; }
    }
    if (changed) return res;
    // Emojis o símbolos delante: "🛡️ Mis Bandas"
    const m = /^([^\p{L}\p{N}]+)(.+)$/u.exec(k);
    if (m && m[2] !== k) { const r = lookup(m[2]); if (r != null) return m[1] + r; }
    return null;
  }

  function t(src, vars) {
    if (lang === 'es') return fill(src, vars);
    const r = lookup(src);
    if (r == null) { if (norm(src)) missing.add(norm(src)); return fill(src, vars); }
    return fill(r, vars);
  }

  /* ------------------------------------------------------------ DOM */
  const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  const SKIP = /^(SCRIPT|STYLE|TEXTAREA|INPUT|CODE|PRE)$/;
  const origText = new WeakMap();           // nodo de texto -> texto original (castellano)
  const origAttr = new WeakMap();           // elemento -> {atributo: original}
  let observer = null;

  const hasLetters = (s) => /\p{L}/u.test(s);
  function textNode(n) {
    const p = n.parentNode;
    if (!p || SKIP.test(p.nodeName) || (p.closest && p.closest('[data-no-i18n]'))) return;
    if (!origText.has(n)) {
      if (!hasLetters(n.nodeValue)) return;
      origText.set(n, n.nodeValue);
    }
    const src = origText.get(n);
    let out = src;
    if (lang !== 'es') {
      const r = lookup(src);
      if (r != null) out = src.match(/^\s*/)[0] + r + src.match(/\s*$/)[0];
      else if (norm(src)) missing.add(norm(src));
    }
    if (n.nodeValue !== out) n.nodeValue = out;
  }
  function attrs(el) {
    if (!el.getAttribute || (el.closest && el.closest('[data-no-i18n]'))) return;
    ATTRS.forEach((a) => {
      if (!el.hasAttribute(a)) return;
      let o = origAttr.get(el);
      if (!o) { o = {}; origAttr.set(el, o); }
      if (!(a in o)) { if (!hasLetters(el.getAttribute(a))) return; o[a] = el.getAttribute(a); }
      let out = o[a];
      if (lang !== 'es') {
        const r = lookup(o[a]);
        if (r != null) out = r; else if (norm(o[a])) missing.add(norm(o[a]));
      }
      if (el.getAttribute(a) !== out) el.setAttribute(a, out);
    });
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) return textNode(root);
    if (root.nodeType !== 1) return;
    if (SKIP.test(root.nodeName) && root.nodeName !== 'INPUT' && root.nodeName !== 'TEXTAREA') return;
    attrs(root);
    for (let c = root.firstChild; c; c = c.nextSibling) walk(c);
  }
  function applyAll() {
    if (observer) observer.disconnect();
    walk(document.body);
    document.documentElement.lang = lang;
    document.title = t('ArcWorlde - Asistente');
    if (observer) observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  function onMutations(records) {
    observer.disconnect();
    records.forEach((r) => {
      if (r.type === 'characterData') {
        // Cambio de texto hecho por el código: es el nuevo original
        origText.delete(r.target);
        textNode(r.target);
      } else r.addedNodes.forEach((n) => walk(n));
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* ------------------------------------------------------------ selector */
  const listeners = [];
  function renderSwitches() {
    document.querySelectorAll('[data-lang-switch]').forEach((box) => {
      box.setAttribute('data-no-i18n', '');
      box.innerHTML = LANGS.map(([id, short, name]) =>
        '<button type="button" data-lang="' + id + '" title="' + name + '" aria-pressed="' + (id === lang) + '" class="px-2 py-1 text-xs font-semibold rounded ' +
        (id === lang ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800') + '">' + short + '</button>').join('');
    });
  }
  function setLang(l) {
    if (!LANGS.some((x) => x[0] === l) || l === lang) return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) { /* sin almacenamiento */ }
    renderSwitches();
    // Vuelve a pintar la pantalla actual y traduce lo que quedó estático
    if (typeof window.renderSidebar === 'function') window.renderSidebar();
    if (typeof window.renderContent === 'function') window.renderContent();
    applyAll();
    listeners.forEach((f) => f(lang));
  }

  function start() {
    observer = new MutationObserver(onMutations);
    renderSwitches();
    applyAll();
    document.addEventListener('click', (ev) => {
      const b = ev.target.closest && ev.target.closest('[data-lang-switch] [data-lang]');
      if (b) setLang(b.getAttribute('data-lang'));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  window.AWI18n = {
    t, lookup, setLang, applyAll,
    lang: () => lang,
    langs: () => LANGS.map((l) => l[0]),
    missing: () => Array.from(missing).sort(),
    clearMissing: () => missing.clear(),
    onChange: (f) => listeners.push(f)
  };
})();
