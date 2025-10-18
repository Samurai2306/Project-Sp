/**
 * 🔧 SERVICE WORKER ДЛЯ ОПТИМИЗАЦИИ ПРОИЗВОДИТЕЛЬНОСТИ
 * Интеллектуальное кэширование и офлайн-поддержка
 */

const CACHE_NAME = 'portfolio-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Критические ресурсы для немедленного кэширования
const CRITICAL_RESOURCES = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/css/text-animation.css',
    '/assets/css/fonts.css',
    '/assets/js/main.js',
    '/assets/js/text-animation.js',
    '/assets/js/performance-optimizer.js',
    '/assets/images/LOGO.png',
    '/assets/fonts/minecraft.ttf',
    '/assets/fonts/belarus.otf',
    '/assets/fonts/Cakra-Normal.otf',
    '/assets/fonts/noodles.otf'
];

// Ресурсы для предзагрузки
const PRELOAD_RESOURCES = [
    '/assets/images/1.jpg',
    '/assets/images/2.jpg',
    '/assets/images/3.jpg',
    '/assets/icons/icons8-github.svg',
    '/assets/icons/icons8-tg.svg',
    '/assets/icons/icons8-gmail.svg',
    '/assets/icons/icons8-vk.svg',
    '/assets/icons/MyLifeTime.jpg',
    '/assets/icons/MestoSlov.png',
    '/assets/icons/development_icon_131032.svg',
    '/assets/icons/web_development_coding_code_browse_browser_icon-icons.com_59980.svg',
    '/assets/icons/stopwatch_watch_timer_time_clock_deadline_icon_220238.svg',
    '/assets/icons/3586372-brain-creative-idea-mind_107940.svg',
    '/assets/icons/devices_78336.svg'
];

// Страницы для кэширования
const PAGES = [
    '/',
    '/index.html',
    '/projects.html',
    '/games.html',
    '/skills.html',
    '/order.html',
    '/contacts.html'
];

/**
 * 🚀 УСТАНОВКА SERVICE WORKER
 */
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Установка...');
    
    event.waitUntil(
        Promise.all([
            // Кэшируем критические ресурсы
            caches.open(STATIC_CACHE).then(cache => {
                console.log('📦 Кэширование критических ресурсов...');
                return cache.addAll(CRITICAL_RESOURCES);
            }),
            
            // Предзагружаем важные ресурсы
            caches.open(DYNAMIC_CACHE).then(cache => {
                console.log('🔄 Предзагрузка ресурсов...');
                return cache.addAll(PRELOAD_RESOURCES);
            })
        ]).then(() => {
            console.log('✅ Service Worker: Установлен успешно');
            return self.skipWaiting();
        })
    );
});

/**
 * 🔄 АКТИВАЦИЯ SERVICE WORKER
 */
self.addEventListener('activate', (event) => {
    console.log('🔧 Service Worker: Активация...');
    
    event.waitUntil(
        Promise.all([
            // Очищаем старые кэши
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('🧹 Удаление старого кэша:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // Берем контроль над всеми клиентами
            self.clients.claim()
        ]).then(() => {
            console.log('✅ Service Worker: Активирован');
        })
    );
});

/**
 * 🌐 ОБРАБОТКА ЗАПРОСОВ
 */
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Пропускаем внешние запросы
    if (url.origin !== location.origin) {
        return;
    }
    
    // Стратегия кэширования в зависимости от типа ресурса
    if (request.destination === 'document') {
        event.respondWith(handlePageRequest(request));
    } else if (request.destination === 'image' || request.destination === 'font') {
        event.respondWith(handleAssetRequest(request));
    } else if (request.destination === 'script' || request.destination === 'style') {
        event.respondWith(handleResourceRequest(request));
    } else {
        event.respondWith(handleGenericRequest(request));
    }
});

/**
 * 📄 ОБРАБОТКА ЗАПРОСОВ СТРАНИЦ
 */
async function handlePageRequest(request) {
    try {
        // Сначала пробуем кэш
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('📄 Страница из кэша:', request.url);
            return cachedResponse;
        }
        
        // Если нет в кэше, загружаем из сети
        const networkResponse = await fetch(request);
        
        // Кэшируем для будущего использования
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.warn('❌ Ошибка загрузки страницы:', error);
        
        // Возвращаем офлайн-страницу
        return new Response(`
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Офлайн | Глеб Чернов</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        text-align: center; 
                        padding: 50px; 
                        background: #0a0a0f; 
                        color: white; 
                    }
                    .offline-message { 
                        max-width: 500px; 
                        margin: 0 auto; 
                    }
                    .retry-btn { 
                        background: #8B5FBF; 
                        color: white; 
                        border: none; 
                        padding: 10px 20px; 
                        border-radius: 5px; 
                        cursor: pointer; 
                        margin-top: 20px; 
                    }
                </style>
            </head>
            <body>
                <div class="offline-message">
                    <h1>🔌 Офлайн режим</h1>
                    <p>Похоже, у вас нет подключения к интернету.</p>
                    <p>Некоторые функции могут быть недоступны.</p>
                    <button class="retry-btn" onclick="location.reload()">Попробовать снова</button>
                </div>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html' }
        });
    }
}

/**
 * 🖼️ ОБРАБОТКА ЗАПРОСОВ АССЕТОВ
 */
async function handleAssetRequest(request) {
    try {
        // Сначала пробуем кэш
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('🖼️ Ассет из кэша:', request.url);
            return cachedResponse;
        }
        
        // Загружаем из сети
        const networkResponse = await fetch(request);
        
        // Кэшируем для будущего использования
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.warn('❌ Ошибка загрузки ассета:', error);
        
        // Возвращаем placeholder для изображений
        if (request.destination === 'image') {
            return new Response(`
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#1a1a2a"/>
                    <text x="50%" y="50%" text-anchor="middle" fill="#8B5FBF" font-family="Arial" font-size="14">
                        Изображение недоступно
                    </text>
                </svg>
            `, {
                headers: { 'Content-Type': 'image/svg+xml' }
            });
        }
        
        throw error;
    }
}

/**
 * 📜 ОБРАБОТКА ЗАПРОСОВ РЕСУРСОВ
 */
async function handleResourceRequest(request) {
    try {
        // Сначала пробуем кэш
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('📜 Ресурс из кэша:', request.url);
            return cachedResponse;
        }
        
        // Загружаем из сети
        const networkResponse = await fetch(request);
        
        // Кэшируем для будущего использования
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.warn('❌ Ошибка загрузки ресурса:', error);
        throw error;
    }
}

/**
 * 🔄 ОБРАБОТКА ОБЩИХ ЗАПРОСОВ
 */
async function handleGenericRequest(request) {
    try {
        // Сначала пробуем кэш
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Загружаем из сети
        const networkResponse = await fetch(request);
        
        // Кэшируем для будущего использования
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.warn('❌ Ошибка загрузки:', error);
        throw error;
    }
}

/**
 * 📨 ОБРАБОТКА СООБЩЕНИЙ
 */
self.addEventListener('message', (event) => {
    const { type, data } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'CLEAR_CACHE':
            clearAllCaches();
            break;
            
        case 'GET_CACHE_SIZE':
            getCacheSize().then(size => {
                event.ports[0].postMessage({ type: 'CACHE_SIZE', size });
            });
            break;
            
        case 'PRELOAD_RESOURCES':
            preloadResources(data.resources);
            break;
    }
});

/**
 * 🧹 ОЧИСТКА ВСЕХ КЭШЕЙ
 */
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('🧹 Все кэши очищены');
}

/**
 * 📊 ПОЛУЧЕНИЕ РАЗМЕРА КЭША
 */
async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        totalSize += keys.length;
    }
    
    return totalSize;
}

/**
 * 🔄 ПРЕДЗАГРУЗКА РЕСУРСОВ
 */
async function preloadResources(resources) {
    const cache = await caches.open(DYNAMIC_CACHE);
    
    for (const resource of resources) {
        try {
            const response = await fetch(resource);
            if (response.ok) {
                await cache.put(resource, response);
                console.log('📦 Ресурс предзагружен:', resource);
            }
        } catch (error) {
            console.warn('❌ Ошибка предзагрузки:', resource, error);
        }
    }
}

/**
 * 🔔 УВЕДОМЛЕНИЯ
 */
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body,
            icon: '/assets/images/LOGO.png',
            badge: '/assets/images/LOGO.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

/**
 * 🔔 ОБРАБОТКА КЛИКОВ ПО УВЕДОМЛЕНИЯМ
 */
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});

console.log('🔧 Service Worker загружен и готов к работе');
