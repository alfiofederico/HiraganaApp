const CACHE_NAME = "hiragana-puzzle-v3"; // ⬅️ bump this for every update
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/hiragana_puzzles.json",
  "/icon-192.png",
  "/icon-512.png",
  // add other files like CSS or audio if needed
];

// Install & cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate & remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Serve from cache or fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
