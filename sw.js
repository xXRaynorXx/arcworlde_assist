const CACHE_NAME = "arcworlde-assist-v41";
const APP_SHELL = [
  "./",
  "./index.html",
  "./config.js",
  "./datos_minis.js",
  "./compendio.js",
  "./armeria.js",
  "./datos_campana.js",
  "./datos_reglas.js",
  "./app.js",
  "./util.js",
  "./router.js",
  "./datos_arcdeck.js",
  "./usuarios.js",
  "./fichas.js",
  "./partidas.js",
  "./campanas.js",
  "./manifest.webmanifest",
  "./fire.png"
];

// Instala el service worker y guarda los archivos básicos.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// Elimina cachés antiguas y activa el nuevo service worker.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Para páginas HTML, intenta primero la red para evitar servir una versión vieja.
// Si no hay conexión, usa la copia guardada. Para otros recursos, prueba caché y luego red.
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(async () => {
          return (await caches.match(request)) ||
                 (await caches.match("./index.html")) ||
                 Response.error();
        })
    );
    return;
  }

  // Scripts y estilos propios: red primero para que los cambios lleguen al instante.
  if (/\.(js|css)$/.test(url.pathname)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) || Response.error())
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
