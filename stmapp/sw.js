// STM Salam App - Service Worker (PWA)
// CACHE_NAME v4 clears older app shells that could keep the refresh banner
// or old startup code alive in installed PWAs.
const CACHE_NAME = 'stmapp-v4';

// Only cache assets that definitely exist — removed menu.js/checkout.js
// which don't exist and caused addAll() to fail, aborting the whole install.
const STATIC_ASSETS = [
  '/stmapp/index.html',
  '/stmapp/menu.html',
  '/stmapp/checkout.html',
  '/stmapp/orders.html',
  '/stmapp/profile.html',
  '/stmapp/support.html',
  '/stmapp/css/app.css',
  '/stmapp/js/app.js',
  '/stmapp/manifest.json',
];

// -- INSTALL ------------------------------------------------------------------
// Cache static assets. Do not force immediate worker takeover from install;
// that can trigger repeated page loads in installed PWAs.
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Use individual adds so one failure doesn't abort everything
      return Promise.allSettled(
        STATIC_ASSETS.map(function(url) {
          return cache.add(url).catch(function(err) {
            console.warn('[SW] Could not cache:', url, err);
          });
        })
      );
    })
  );
  // No forced waiting bypass here.
});

// -- ACTIVATE -----------------------------------------------------------------
// Clean up old caches from previous versions.
// Do not force existing pages under this worker from activate; they will use
// the new worker naturally on the next normal navigation.
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(k) { return k !== CACHE_NAME; })
          .map(function(k) {
            console.log('[SW] Removing old cache:', k);
            return caches.delete(k);
          })
      );
    })
  );
  // No forced client takeover here.
});

function cacheResponse(cache, request, response) {
  if (response && response.status === 200 && response.type !== 'opaque') {
    cache.put(request, response.clone());
  }
  return response;
}

function offlineFallback(request) {
  return caches.match(request).then(function(cached) {
    return cached || caches.match('/stmapp/index.html');
  });
}

// -- FETCH --------------------------------------------------------------------
self.addEventListener('fetch', function(event) {
  var url;
  try { url = new URL(event.request.url); } catch(e) { return; }

  // Skip non-GET, extensions, and non-http(s) protocols
  if (
    event.request.method !== 'GET' ||
    url.protocol === 'chrome-extension:' ||
    (url.protocol !== 'http:' && url.protocol !== 'https:')
  ) {
    return;
  }

  // Network-first for external APIs and Firebase. No refresh/reload is triggered.
  if (
    url.hostname.includes('firestore') ||
    url.hostname.includes('firebase') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('cloudfunctions') ||
    url.hostname.includes('unsplash') ||
    url.hostname.includes('fonts.g') ||
    url.pathname.includes('/api/')
  ) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Network-first for the app shell so installed PWAs pick up fixed startup code.
  // Cached files are used only as the offline fallback.
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return fetch(event.request)
        .then(function(response) {
          return cacheResponse(cache, event.request, response);
        })
        .catch(function() {
          return offlineFallback(event.request);
        });
    })
  );
});
