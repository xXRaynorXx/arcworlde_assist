/* ArcWorlde Assist: rutas con # para poder recargar, compartir enlaces y usar el botón "atrás".
 *   #/s/<seccion>      secciones del compendio
 *   #/bandas  #/cuenta
 *   #/campanas  #/campanas/<id>
 *   #/partidas  #/partidas/<id>
 * La URL se actualiza sola después de cada pantalla; al pulsar atrás/adelante se reabre la pantalla.
 */
(function () {
  'use strict';
  const AW = window.AW;
  if (!AW) return;

  let ready = false;     // hasta aplicar la ruta inicial no se toca la URL
  let applying = false;  // true mientras se abre una pantalla desde la URL
  let first = false;     // la primera URL reemplaza a la de entrada (no añade un paso de historial)
  let pendingDetail = null; // detalle (campaña/partida) que espera a que haya sesión
  const UUID = /^[\w-]{1,64}$/;

  function current() {
    const s = typeof currentSectionId === 'string' ? currentSectionId : '';
    if (s === 'app_campaigns') {
      const w = AW.c && AW.c.where ? AW.c.where() : {};
      return '#/campanas' + (w.id ? '/' + w.id : '');
    }
    if (s === 'app_games') {
      const w = AW.g && AW.g.where ? AW.g.where() : {};
      return '#/partidas' + (w.id ? '/' + w.id : '');
    }
    if (s === 'app_bands') return '#/bandas';
    if (s === 'app_account') return '#/cuenta';
    return s ? '#/s/' + s : '';
  }

  function sync() {
    if (!ready || applying) return;
    const h = current();
    if (!h || h === location.hash) return;
    const url = location.pathname + location.search + h;
    if (!first) { first = true; history.replaceState(null, '', url); } else history.pushState(null, '', url);
  }

  async function apply(hash, opts) {
    opts = opts || {};
    const m = String(hash || '').match(/^#\/([^/]*)\/?([^/]*)$/);
    if (!m) return false;
    const [, kind, arg] = m;
    applying = true;
    try {
      if (kind === 's' && arg) {
        if (typeof dbUnificada !== 'undefined' && dbUnificada.some((x) => x.id === arg)) AW.go(arg);
        else return false;
      } else if (kind === 'bandas') AW.go('app_bands');
      else if (kind === 'cuenta') AW.go('app_account');
      else if (kind === 'campanas' || kind === 'partidas') {
        const isC = kind === 'campanas';
        const mod = isC ? AW.c : AW.g;
        if (!mod) return false;
        if (isC && AW.g && AW.g.reset && AW.g.where().view === 'detail') AW.g.reset();
        const user = AW.api && AW.api.state && AW.api.state.user;
        if (arg && UUID.test(arg)) {
          if (!user) {
            pendingDetail = hash;
            AW.go(isC ? 'app_campaigns' : 'app_games');
          } else if (mod.where().id !== arg || opts.force) {
            await mod.open(arg);
          } else AW.go(isC ? 'app_campaigns' : 'app_games');
        } else {
          AW.go(isC ? 'app_campaigns' : 'app_games');
          if (mod.where().view === 'detail') mod.back();
        }
      } else return false;
    } finally {
      applying = false;
    }
    return true;
  }

  window.addEventListener('popstate', () => {
    if (location.hash) apply(location.hash, { force: true });
  });

  AW.hooks.afterRender.push(sync);
  // El compendio no pasa por renderApp: se engancha a renderContent
  const origContent = window.renderContent;
  window.renderContent = function () {
    const r = origContent.apply(this, arguments);
    sync();
    return r;
  };

  // Cuando llega la sesión se puede abrir el detalle pendiente (recarga con #/campanas/<id>)
  AW.hooks.userChanged.push((user) => {
    if (user && pendingDetail) {
      const h = pendingDetail;
      pendingDetail = null;
      setTimeout(() => apply(h, { force: true }), 50);
    }
  });

  function start() {
    const h = location.hash;
    const go = h ? apply(h) : Promise.resolve(false);
    Promise.resolve(go).then(() => {
      ready = true;
      if (h) sync();
    });
    if (!h) ready = true;
  }
  if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', () => setTimeout(start, 0));
  else setTimeout(start, 0);

  AW.nav = { apply, current };
})();
