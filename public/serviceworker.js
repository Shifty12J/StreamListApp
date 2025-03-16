/* eslint-disable no-restricted-globals */
const CACHE_NAME = "streamlist-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/static/js/bundle.js",
    "/play-button192.png", //icon
    "/play-button512.png", //icon
    "/ezlogo.png", 
    "/TMDBlogo.png",
];

// install the service worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// start the service worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            )
        )
    );
});

// get requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});