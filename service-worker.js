/* Pasos Seguros — Service Worker
   Estrategia: precache del "app shell" + cache-first para activos del mismo origen.
   Es lo que hace que la PWA funcione SIN CONEXIÓN, el valor central del proyecto. */

const CACHE = 'pasos-seguros-v7';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/styles.css?v=7',
  './assets/js/data.js?v=7',
  './assets/js/i18n.js?v=7',
  './assets/js/app.js?v=7',
  './assets/img/logo-mark.svg',
  './assets/img/logo-steps.svg',
  './assets/img/generated/welcome-bg.svg',
  './assets/img/generated/pitch-art.svg',
  './assets/img/generated/cat-ssr.svg',
  './assets/img/generated/cat-prevencion.svg',
  './assets/img/generated/cat-embarazo.svg',
  './assets/img/generated/cat-bienestar.svg',
  './assets/img/generated/cat-proteccion.svg',
  './assets/img/generated/avatar-aguila.svg',
  './assets/img/generated/avatar-hoja.svg',
  './assets/img/generated/avatar-sol.svg',
  './assets/img/generated/avatar-montana.svg',
  './assets/img/generated/avatar-ola.svg',
  './assets/img/generated/avatar-estrella.svg',
  './assets/img/generated/avatar-luna.svg',
  './assets/img/generated/avatar-brujula.svg',
  './assets/img/generated/avatar-paloma.svg',
  './assets/img/generated/avatar-girasol.svg',
  './assets/img/generated/avatar-abeja.svg',
  './assets/img/generated/avatar-destello.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/favicon-32.png',
];

// Precarga el shell durante la instalación.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

// Limpia versiones antiguas del caché.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Estrategia: stale-while-revalidate para activos del mismo origen
// (sirve la caché al instante para que funcione SIN CONEXIÓN, y refresca en segundo
// plano cuando hay red). Las navegaciones usan red primero con respaldo offline.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('./index.html', copy)).catch(() => {}); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(req).then((cached) => {
        const network = fetch(req).then((res) => { cache.put(req, res.clone()).catch(() => {}); return res; }).catch(() => cached);
        return cached || network;
      })
    )
  );
});
