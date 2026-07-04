package handlers

import "net/http"

// serviceWorker serves /sw.js — a vanilla PWA service worker equivalent to the
// Serwist config in site/src/app/sw.ts: skipWaiting + clientsClaim +
// navigationPreload, runtime caching, and an offline fallback to /~offline for
// document navigations.
func (h *Handler) serviceWorker(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/javascript; charset=utf-8")
	w.Header().Set("Service-Worker-Allowed", "/")
	w.Header().Set("Cache-Control", "public, max-age=0, must-revalidate")
	_, _ = w.Write([]byte(serviceWorkerJS))
}

const serviceWorkerJS = `// Pelangi Capsule Hostel — service worker (ported from Serwist sw.ts)
const CACHE = 'pelangi-v1';
const OFFLINE_URL = '/~offline';
const PRECACHE = [OFFLINE_URL, '/static/css/app.css', '/static/js/app.js', '/favicon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.enable(); } catch (e) {}
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Document navigations: network-first, fall back to offline page.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preload = await event.preloadResponse;
        if (preload) return preload;
        return await fetch(req);
      } catch (e) {
        const cache = await caches.open(CACHE);
        const offline = await cache.match(OFFLINE_URL);
        return offline || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
    })());
    return;
  }

  // Static assets / images: cache-first with background fill.
  const dest = req.destination;
  if (req.url.indexOf('/static/') !== -1 || req.url.indexOf('/images/') !== -1 ||
      dest === 'image' || dest === 'style' || dest === 'script' || dest === 'font') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const res = await fetch(req);
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      } catch (e) {
        return cached || Response.error();
      }
    })());
  }
});
`
