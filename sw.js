
const CACHE_TAG = 'offline-page-v7';

self.addEventListener('install', event => {
    console.log("Intall...")

    self.skipWaiting()

    event.waitUntil(
        caches.open(CACHE_TAG).then(cache => {
            cache.add('offline/index.html')
            cache.add('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css')
        })
    )
})

self.addEventListener('activate', event => {
    console.log("Activate")
    event.waitUntil(
        caches.keys().then(cacheList => {
            
            return cacheList.filter(cacheItem => {
                return cacheItem !== CACHE_TAG
            })

        }).then(cacheToDelete => {
            console.log(cacheToDelete)
            return Promise.all(cacheToDelete.map(item => caches.delete(item)))
        })
    )
})

self.addEventListener('fetch', event => {
    console.log("FETCH EVENT", event);
     if(event.request.mode === 'navigate'){
        event.respondWith(
            fetch(event.request).then(response => {
                console.log("Requisição passou")
                return response
            }).catch(erro => {
                console.log("Requisição não passou")
                return caches.open(CACHE_TAG).then(cache => {
                    return cache.match('offline/index.html')
                })
            })
        )
    }
})