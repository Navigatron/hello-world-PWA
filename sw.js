var cacheName = 'hello-world-page';
var filesToCache = [
    '/',
    '/index.html',
    '/master.css'
];

/*
    Promises execute async.
    They're declared, but not necesarily run.

    event.waitUntil keeps, for example, the install event
    'in progress' while it waits for the promises to run.

    Essentially, "Install is not done until this promise is done."

*/

/*
    On Install,
    Cache all the files we need.
    Install isn't complete until the promises run.
*/
self.addEventListener(
    'install',
    function(e) {
        console.log('[ServiceWorker] Install');
        e.waitUntil(
            caches.open(cacheName).then(
                function(cache) {
                    console.log('[ServiceWorker] Caching app shell');
                    return cache.addAll(filesToCache);
                }
            )
        );
    }
);

/*
    On Activate,
    claim clients?
*/
self.addEventListener(
    'activate',
    event => {
        event.waitUntil(self.clients.claim());
    }
);

/*
    When fetching a thing,
    see if it's in the cache.
    If so, return that.
    Otherwise, make a network request.
*/
self.addEventListener(
    'fetch',
    event => {
        event.respondWith(
            caches.match(event.request, {ignoreSearch:true}).then(
                response => {
                    return response || fetch(event.request);
                }
            )
        );
    }
);
