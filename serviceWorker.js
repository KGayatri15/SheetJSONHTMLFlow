var cacheName = 'static'
var cacheAssets = [
    'index.html',
    '/beauty/index.css',
    'Integration/HttpService.js',
    '/Integration/Authorization.js'
]
self.addEventListener("install",e=>{
    e.waitUntil(
        caches.open(cacheName)//cache Name
        .then(cache =>{
            return cache.addAll(cacheAssets);//caching files
        })
        .then(()=>self.skipWaiting())
    );
    console.log("Install !");
});
self.addEventListener("fetch",e=>{
    console.log('Service Worker:Fetching');
    e.respondWith(
        fetch(e.request)
        .catch(()=>caches.match(e.request))
    );
});
self.addEventListener('activate',e=>{
    console.log("Service Worker : Activated");//Removing unwanted cache
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache != cacheName){
                        console.log('Service Worker:Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})
