const CACHE='stockiq-v2';
const ASSETS=['./','./index.html','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))))});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('script.google.com')){e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));return}
  e.respondWith(caches.match(e.request).then(c=>{const f=fetch(e.request).then(r=>{const cl=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,cl));return r});return c||f}))
});
