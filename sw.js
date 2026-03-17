const CACHE_NAME = 'festie-cache-v1'; // Change this on update to trigger the update process
const URLS_TO_CACHE = [
    '/',
    'index.html',
    'dashboard.html',
    'innerDashboard.html',
    'allCandidates.html',
    'allPrograms.html',
    'addSection.html',
    'addTeam.html',
    'addUser.html',
    'registrdProgram.html',
    'viewCandidateData.html',
    'viewProgramData.html',
    'viewSectionData.html',
    'viewTeamData.html',
    'teamDash.html',
    'tmPrograms.html',
    'tmTopicReg.html',
    // Add other important assets like CSS, JS, and fonts
    'https://cdn.tailwindcss.com',
    'https://cdn-uicons.flaticon.com/2.1.0/uicons-regular-rounded/css/uicons-regular-rounded.css',
    'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js',
    'https://cdn.jsdelivr.net/npm/toastify-js'
];

// Install event: cache the app shell
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching App Shell');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event: serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

// Message event: listen for skipWaiting
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});