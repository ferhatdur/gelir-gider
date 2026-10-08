// Finans Takip 2026-10-08 security release. HTML is network-first; no financial API caching.
const CACHE='finans-takip-static-20261008-security1';
self.addEventListener('install',event=>{self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys()){if(key!==CACHE)await caches.delete(key)}await self.clients.claim()})())});
self.addEventListener('fetch',event=>{
  const req=event.request,url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==self.location.origin)return;
  if(req.mode==='navigate'||url.pathname.endsWith('/index.html')){
    event.respondWith(fetch(new Request(req,{cache:'no-store'})).catch(async()=>{const saved=await caches.match(req);return saved||new Response('Çevrimdışısınız. İnternet bağlantınızı kontrol edin.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}));
    return;
  }
  // Static assets are fetched normally; never cache personal data, sessions or API responses.
});
