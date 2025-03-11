const CACHE_NAME = "lunanthus-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/pages/html/about.html",
  "/pages/css/style.css",
  "/pages/js/app.js",
  "/lunanthus/spa/router.js"
];

// インストール処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// フェッチ時のキャッシュ処理
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response ? response : fetch(event.request);
      })
  );
});

// アクティベート時の古いキャッシュ削除
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
