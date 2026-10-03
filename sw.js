// Guarda la app en el móvil para que funcione en obra sin internet.
const CACHE = "flecha-v13";
const FICHEROS = ["./", "./index.html", "./manifest.json", "./icono.svg"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHEROS))));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n))))));
// Red primero (para recibir las actualizaciones), caché si no hay red.
self.addEventListener("fetch", e => e.respondWith(
  fetch(e.request, {cache: "no-cache"}).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request))));
