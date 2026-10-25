const CACHE_NAME = 'archena-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/archie.svg',
  './assets/athena.svg'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(caches.match(evt.request).then((res) => res || fetch(evt.request)));
});