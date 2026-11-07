/* ArcWorlde Assist: utilidades compartidas (se carga antes que usuarios.js).
 * AWUtil.esc        escapa texto para HTML
 * AWUtil.toast      aviso breve (los de error duran más y se pueden cerrar)
 * AWUtil.confirm    diálogo de confirmación propio: await AWUtil.confirm('¿Seguro?') -> true/false
 * AWUtil.pname/gpFmt/pct   formatos usados por campañas y partidas
 * AWUtil.rpc        llama a una función de Supabase con "cargando", aviso de error y de éxito
 * AWUtil.busy       marca la pantalla como ocupada mientras dura una promesa
 */
(function () {
  'use strict';

  const esc = (s) =>
    String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function toast(text, type) {
    let box = document.getElementById('aw-toasts');
    if (!box) {
      box = document.createElement('div');
      box.id = 'aw-toasts';
      box.setAttribute('role', 'status');
      box.setAttribute('aria-live', 'polite');
      box.className = 'fixed bottom-4 right-4 left-4 sm:left-auto z-[60] flex flex-col gap-2 items-end pointer-events-none';
      document.body.appendChild(box);
    }
    const isErr = type === 'error';
    const el = document.createElement('div');
    el.className =
      'pointer-events-auto max-w-md px-4 py-3 rounded-xl text-sm font-medium shadow-2xl border flex items-start gap-3 ' +
      (isErr ? 'bg-rose-950 text-rose-200 border-rose-800' : 'bg-emerald-950 text-emerald-200 border-emerald-800');
    const span = document.createElement('span');
    span.textContent = text;
    el.appendChild(span);
    if (isErr) {
      el.setAttribute('role', 'alert');
      const x = document.createElement('button');
      x.type = 'button';
      x.setAttribute('aria-label', 'Cerrar aviso');
      x.className = 'ml-auto px-2 -my-1 text-lg leading-none opacity-70 hover:opacity-100';
      x.textContent = '×';
      x.onclick = () => el.remove();
      el.appendChild(x);
    }
    box.appendChild(el);
    setTimeout(() => el.remove(), isErr ? 8000 : 3500);
  }

  // Diálogo de confirmación (reemplaza a window.confirm). Devuelve una promesa de true/false.
  function confirmDialog(message, opts) {
    opts = opts || {};
    return new Promise((resolve) => {
      const prev = document.activeElement;
      const wrap = document.createElement('div');
      wrap.className = 'fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 bg-black/70';
      wrap.innerHTML =
        '<div role="alertdialog" aria-modal="true" aria-labelledby="aw-cf-t" class="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl">' +
        '<p id="aw-cf-t" class="text-slate-100 whitespace-pre-line"></p>' +
        '<div class="mt-5 flex justify-end gap-2">' +
        '<button type="button" data-no class="px-4 py-2 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800">' + esc(opts.no || 'Cancelar') + '</button>' +
        '<button type="button" data-yes class="px-4 py-2 rounded-lg font-semibold ' +
        (opts.danger ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-amber-500 hover:bg-amber-400 text-slate-900') + '">' + esc(opts.yes || 'Aceptar') + '</button>' +
        '</div></div>';
      wrap.querySelector('#aw-cf-t').textContent = message;
      const done = (v) => {
        document.removeEventListener('keydown', onKey, true);
        wrap.remove();
        if (prev && prev.focus) try { prev.focus(); } catch (e) { /* ignore */ }
        resolve(v);
      };
      const onKey = (e) => {
        if (e.key === 'Escape') { e.stopPropagation(); done(false); }
      };
      wrap.querySelector('[data-yes]').onclick = () => done(true);
      wrap.querySelector('[data-no]').onclick = () => done(false);
      wrap.addEventListener('click', (e) => { if (e.target === wrap) done(false); });
      document.addEventListener('keydown', onKey, true);
      document.body.appendChild(wrap);
      wrap.querySelector(opts.danger ? '[data-no]' : '[data-yes]').focus();
    });
  }

  // Barra de "cargando" arriba del todo mientras haya operaciones en curso
  let pending = 0;
  function busy(promise) {
    pending++;
    let bar = document.getElementById('aw-busy');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'aw-busy';
      bar.setAttribute('aria-hidden', 'true');
      bar.className = 'fixed top-0 left-0 right-0 h-1 z-[80] bg-amber-400 animate-pulse';
      document.body.appendChild(bar);
    }
    bar.style.display = 'block';
    document.body.setAttribute('aria-busy', 'true');
    const end = () => {
      pending = Math.max(0, pending - 1);
      if (!pending) {
        bar.style.display = 'none';
        document.body.removeAttribute('aria-busy');
      }
    };
    return Promise.resolve(promise).then((v) => { end(); return v; }, (e) => { end(); throw e; });
  }

  const pname = (p) => (p && p.profiles && p.profiles.display_name) || 'Jugador';
  const gpFmt = (n) => (Number(n) || 0) + ' GP';
  const pct = (n) => (n > 0 ? '+' : '') + n + '%';

  window.AWUtil = { esc, toast, confirm: confirmDialog, busy, pname, gpFmt, pct };
})();
