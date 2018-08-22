var cacheName = 'spinner';
// I don't know to use relative or absolute paths here.
var filesToCache = [
    './',
    './index.html',
    './css',
    './css/master.css',
    './icons',
    './icons/source.svg',
    './js',
    './js/app.js',
    './js/service-worker.js'
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
        console.log('[service-worker] Install Event');
        e.waitUntil(
            caches.open(cacheName).then(
                function(cache) {
                    console.log('[service-worker] Caching app shell');
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
