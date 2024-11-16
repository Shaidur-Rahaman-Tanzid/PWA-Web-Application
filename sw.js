const CACHE_NAME = 'pwa-cache-v1';
const ASSETS_TO_CACHE = [
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './images/icon.png',
    './images/icon.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching all assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
