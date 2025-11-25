const CACHE_NAME = "money-manager-tracker";

const PRECACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon.png",
  "logo.png",
  "vite.svg",
];

self.addEventListener("install", (event) => {
  console.log("SW Installed");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("SW Activated");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((cached) => {
        if (cached) return cached;
        return fetch("/index.html");
      })
    );
    return;
  }

  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((res) => {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
            return res;
          })
          .catch(() => null);
      })
    );
    return;
  }

  if (PRECACHE.includes(url.pathname)) {
    event.respondWith(caches.match(req));
    return;
  }

  event.respondWith(fetch(req).catch(() => caches.match(req)));
});
