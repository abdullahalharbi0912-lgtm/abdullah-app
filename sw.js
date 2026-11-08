// يُولَّد عند البناء. تغيّر الاسم يعني نسخة جديدة وتنظيف القديمة.
const CACHE = 'desk-ba622dac50';
const SHELL = ["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png","./portrait.jpg","./profile.pdf","./fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2","./fonts/ibm-plex-sans-arabic-latin-400-normal.woff2","./fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2","./fonts/ibm-plex-sans-arabic-latin-500-normal.woff2","./fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2","./fonts/ibm-plex-sans-arabic-latin-600-normal.woff2","./fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2","./fonts/ibm-plex-sans-arabic-latin-700-normal.woff2"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  if (new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(hit => hit || fetch(r).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); }
    return res;
  }).catch(() => caches.match('./index.html'))));
});
