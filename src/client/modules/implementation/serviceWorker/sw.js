const VERSION = 'v1';
const PRE_CACHE_NAME = 'pre-cache';
const DYNAMIC_CACHE_NAME = 'dynamic';
const RESPONSE_200 = 200;

const STATIC_FILES = ['/', '/img/favicon/comodo_dragon.ico'];

const MUTABLE_FILES = [];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(`${PRE_CACHE_NAME}-${VERSION}`).then(cache => {
            const NEW_STATIC_FILES = [];
            return Promise.all(
                STATIC_FILES.map(url => {
                    return caches.match(url).then(response => {
                        if (response) {
                            return cache.put(url, response);
                        }
                        NEW_STATIC_FILES.push(url);
                        return Promise.resolve();
                    });
                }),
            )
                .then(() => {
                    return cache.addAll(NEW_STATIC_FILES.concat(MUTABLE_FILES));
                })
                .catch(err => console.error(err));
        }),
    );
});

self.addEventListener('fetch', event => {
    const { request } = event;
    event.respondWith(
        caches.match(request).then(response => {
            return (
                response ||
                fetch(event.request).then(response => {
                    const cacheResp = response.clone();

                    // only cache is the status is OK, not a chrome-extension URL & not POST
                    if (
                        [0, RESPONSE_200].includes(response.status) &&
                        request.url.indexOf('chrome-extension')
                    ) {
                        caches
                            .open(`${DYNAMIC_CACHE_NAME}-${VERSION}`)
                            .then(cache => {
                                cache.put(request, cacheResp);
                            });
                    }

                    return response;
                })
            );
        }),
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.forEach(item => {
                if (item.indexOf(VERSION) < 0) {
                    return caches.delete(item);
                }
            });
        }),
    );
    console.log('SW activate');
});
