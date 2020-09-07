const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

// Install SW
this.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache);
      })
      .catch(e => console.log('Could not install: ', e))
  )
})
// Listen for requests 
this.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then((res) => {
        return res || fetch(e.request) //Cache-first
          .then(resCache => {
            let responseClone = resCache.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(e.request, responseClone);
            })
            return resCache;
          })
          .catch((e) => console.log('res cache', e))
        })
      .catch(() => caches.match('offline.html'))
  )
})

// Activate the SW
this.addEventListener('activate', e => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  e.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      ))
      .catch(e => console.log('Could not activate'))
  )
})
