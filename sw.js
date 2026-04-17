// v4 — HTML nooit cachen, altijd vers van netwerk
const CACHE_NAME = 'herbalroot-v4';

const PRECACHE_URLS = [
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // Nooit cachen: Firebase, Wikipedia, externe APIs
  const neverCache = [
    'firestore.googleapis.com','firebase.googleapis.com',
    'identitytoolkit.googleapis.com','securetoken.googleapis.com',
    'en.wikipedia.org','ipapi.co','nominatim.openstreetmap.org','picsum.photos'
  ];
  if (neverCache.some(h => url.hostname.includes(h))) return;

  // HTML — altijd van netwerk, nooit uit cache
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // JS en JSON — altijd van netwerk (zodat updates meteen zichtbaar zijn)
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Google Fonts — cache na eerste fetch
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => cached ||
          fetch(event.request).then(res => { cache.put(event.request, res.clone()); return res; })
        )
      )
    );
    return;
  }

  // Overige assets (icons, afbeeldingen) — cache first
  event.respondWith(
    caches.match(event.request).then(cached => cached ||
      fetch(event.request).then(res => {
        if (res.ok && url.origin === self.location.origin) {
          caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
        }
        return res;
      }).catch(() => caches.match('./index.html'))
    )
  );
});
