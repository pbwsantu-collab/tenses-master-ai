const STATIC_CACHE = 'tma-static-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(STATIC_CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== STATIC_CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(STATIC_CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
