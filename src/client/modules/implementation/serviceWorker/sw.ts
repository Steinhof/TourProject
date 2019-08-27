// const VERSION = 'v1';
// const PRE_CACHE_NAME = 'pre-cache';
// const CACHE_DYNAMIC_NAME = 'dynamic';
// const RESPONSE_200 = 200;
//
// const immutableRequests: string[] = [
//     '/img/favicon/comodo_dragon.ico',
//     '/img/img--left-min.png',
//     '/img/img--right-min.png',
//     '/img/photo-camera.svg',
//     '/fonts/Gingham.woff',
//     '/fonts/Gingham.woff2',
// ];
//
// const mutableRequests: string[] = ['/css/style.min.css', '/js/main.js'];
//
// self.addEventListener('install', event => {
//     // @ts-ignore
//     event.waitUntil(
//         caches.open(`${PRE_CACHE_NAME}-${VERSION}`).then(cache => {
//             const newImmutableRequests: string[] = [];
//             return Promise.all(
//                 immutableRequests.map(url => {
//                     return caches.match(url).then(response => {
//                         if (response) {
//                             return cache.put(url, response);
//                         }
//                         newImmutableRequests.push(url);
//                         return Promise.resolve();
//                     });
//                 }),
//             ).then(() => {
//                 return cache.addAll(
//                     newImmutableRequests.concat(mutableRequests),
//                 );
//             });
//         }),
//     );
// });
//
// self.addEventListener('fetch', event => {
//     // @ts-ignore
//     event.respondWith(
//         // @ts-ignore
//         caches.match(event.request).then(
//             response =>
//                 // @ts-ignore
//                 response ||
//                 fetch(event.request).then(networkResponse => {
//                     const cacheResp = networkResponse.clone();
//
//                     if (
//                         [0, RESPONSE_200].includes(networkResponse.status) &&
//                         // @ts-ignore
//                         event.request.url.indexOf('chrome-extension')
//                     ) {
//                         caches
//                             .open(`${CACHE_DYNAMIC_NAME}-${VERSION}`)
//                             .then(cache =>
//                                 // @ts-ignore
//                                 cache.put(event.request, cacheResp),
//                             );
//                     }
//
//                     return networkResponse;
//                 }),
//         ),
//     );
// });
//
// self.addEventListener('activate', event => {
//     // @ts-ignore
//     event.waitUntil(
//         caches.keys().then(cacheNames => {
//             cacheNames.forEach(item => {
//                 if (item.indexOf(VERSION) < 0) {
//                     return caches.delete(item);
//                 }
//             });
//         }),
//     );
// });
//
// function getResponse() {
//     return fetch('https://jsonplaceholder.typicode.com/todos/1')
//         .then(response => response.json()).catch(err => console.log('HELL NO', err))
//         .then(json => console.log(json, 'hello'));
// }
//
//
// self.addEventListener('sync', (event) => {
//     // @ts-ignore
//     if (event.tag === 'send-messages') {
//         // @ts-ignore
//         event.waitUntil(getResponse());
//     } else {
//         console.log('Cant sync');
//     }
// });
