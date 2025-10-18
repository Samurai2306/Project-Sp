/**
 * 🚀 СИСТЕМА ОПТИМИЗАЦИИ ПРОИЗВОДИТЕЛЬНОСТИ
 * Интеллектуальная предзагрузка данных и многоуровневое кэширование
 * 
 * Функции:
 * - Предзагрузка критических ресурсов
 * - Многоуровневое кэширование (Memory → LocalStorage → Service Worker)
 * - Интеллектуальное управление данными
 * - Оптимизация загрузки ресурсов
 */

class PerformanceOptimizer {
    constructor() {
        this.cache = new Map();
        this.storageCache = new Map();
        this.preloadQueue = [];
        this.isInitialized = false;
        this.connectionSpeed = this.detectConnectionSpeed();
        
        // Приоритеты загрузки
        this.priorities = {
            CRITICAL: 1,    // Критически важные ресурсы
            HIGH: 2,        // Важные ресурсы
            MEDIUM: 3,       // Средней важности
            LOW: 4,         // Низкой важности
            BACKGROUND: 5   // Фоновая загрузка
        };
        
        this.init();
    }

    /**
     * 🎯 ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ ОПТИМИЗАЦИИ
     */
    init() {
        if (this.isInitialized) return;
        
        console.log('🚀 Инициализация системы оптимизации производительности...');
        
        // Инициализация кэша
        this.initCache();
        
        // Предзагрузка критических ресурсов
        this.preloadCriticalResources();
        
        // Настройка Service Worker
        this.setupServiceWorker();
        
        // Оптимизация изображений
        this.optimizeImages();
        
        // Интеллектуальная предзагрузка
        this.setupIntelligentPreloading();
        
        this.isInitialized = true;
        console.log('✅ Система оптимизации инициализирована');
    }

    /**
     * 🧠 МНОГОУРОВНЕВОЕ КЭШИРОВАНИЕ
     */
    initCache() {
        // Уровень 1: In-memory кэш (мгновенный доступ)
        this.memoryCache = new Map();
        
        // Уровень 2: LocalStorage кэш (persistent)
        this.storageCache = new Map();
        this.loadStorageCache();
        
        // Уровень 3: Service Worker кэш (офлайн)
        this.serviceWorkerCache = null;
        
        console.log('💾 Многоуровневая система кэширования инициализирована');
    }

    /**
     * 📦 ПРЕДЗАГРУЗКА КРИТИЧЕСКИХ РЕСУРСОВ
     */
    preloadCriticalResources() {
        const criticalResources = [
            // Критические изображения
            { url: 'assets/images/LOGO.png', type: 'image', priority: this.priorities.CRITICAL },
            { url: 'assets/images/1.jpg', type: 'image', priority: this.priorities.CRITICAL },
            
            // Критические шрифты
            { url: 'assets/fonts/minecraft.ttf', type: 'font', priority: this.priorities.CRITICAL },
            { url: 'assets/fonts/belarus.otf', type: 'font', priority: this.priorities.CRITICAL },
            
            // Критические иконки
            { url: 'assets/icons/icons8-github.svg', type: 'image', priority: this.priorities.HIGH },
            { url: 'assets/icons/icons8-tg.svg', type: 'image', priority: this.priorities.HIGH },
            { url: 'assets/icons/icons8-gmail.svg', type: 'image', priority: this.priorities.HIGH },
            { url: 'assets/icons/icons8-vk.svg', type: 'image', priority: this.priorities.HIGH }
        ];

        // Предзагрузка с приоритизацией
        criticalResources
            .sort((a, b) => a.priority - b.priority)
            .forEach(resource => {
                this.preloadResource(resource);
            });
    }

    /**
     * 🔄 ПРЕДЗАГРУЗКА РЕСУРСА
     */
    async preloadResource(resource) {
        try {
            // Проверяем кэш
            const cached = this.getFromCache(resource.url);
            if (cached) {
                console.log(`✅ Ресурс ${resource.url} найден в кэше`);
                return cached;
            }

            // Загружаем ресурс
            const startTime = performance.now();
            const data = await this.fetchResource(resource);
            const loadTime = performance.now() - startTime;

            // Сохраняем в кэш
            this.setCache(resource.url, data, resource.type);
            
            console.log(`📦 Ресурс ${resource.url} загружен за ${loadTime.toFixed(2)}ms`);
            return data;
        } catch (error) {
            console.warn(`❌ Ошибка загрузки ${resource.url}:`, error);
            return null;
        }
    }

    /**
     * 🌐 ЗАГРУЗКА РЕСУРСА
     */
    async fetchResource(resource) {
        switch (resource.type) {
            case 'image':
                return this.loadImage(resource.url);
            case 'font':
                return this.loadFont(resource.url);
            case 'data':
                return this.loadData(resource.url);
            default:
                return fetch(resource.url).then(response => response.blob());
        }
    }

    /**
     * 🖼️ ЗАГРУЗКА ИЗОБРАЖЕНИЯ
     */
    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    /**
     * 🔤 ЗАГРУЗКА ШРИФТА
     */
    loadFont(url) {
        return new Promise((resolve, reject) => {
            const font = new FontFace('CustomFont', `url(${url})`);
            font.load().then(resolve).catch(reject);
        });
    }

    /**
     * 📊 ЗАГРУЗКА ДАННЫХ
     */
    async loadData(url) {
        const response = await fetch(url);
        return response.json();
    }

    /**
     * 💾 УПРАВЛЕНИЕ КЭШЕМ
     */
    getFromCache(key) {
        // Проверяем memory cache
        if (this.memoryCache.has(key)) {
            return this.memoryCache.get(key);
        }
        
        // Проверяем storage cache
        if (this.storageCache.has(key)) {
            const data = this.storageCache.get(key);
            // Восстанавливаем в memory cache
            this.memoryCache.set(key, data);
            return data;
        }
        
        return null;
    }

    setCache(key, data, type) {
        // Сохраняем в memory cache
        this.memoryCache.set(key, data);
        
        // Сохраняем в storage cache (если возможно)
        if (this.canUseStorage()) {
            this.storageCache.set(key, data);
            this.saveStorageCache();
        }
    }

    /**
     * 🗄️ LOCALSTORAGE УПРАВЛЕНИЕ
     */
    canUseStorage() {
        try {
            return typeof Storage !== 'undefined' && localStorage;
        } catch (e) {
            return false;
        }
    }

    loadStorageCache() {
        if (!this.canUseStorage()) return;
        
        try {
            const cached = localStorage.getItem('performance_cache');
            if (cached) {
                const data = JSON.parse(cached);
                this.storageCache = new Map(data);
                console.log(`📦 Загружено ${this.storageCache.size} элементов из кэша`);
            }
        } catch (error) {
            console.warn('❌ Ошибка загрузки кэша:', error);
        }
    }

    saveStorageCache() {
        if (!this.canUseStorage()) return;
        
        try {
            const data = Array.from(this.storageCache.entries());
            localStorage.setItem('performance_cache', JSON.stringify(data));
        } catch (error) {
            console.warn('❌ Ошибка сохранения кэша:', error);
        }
    }

    /**
     * 🔧 SERVICE WORKER НАСТРОЙКА
     */
    async setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('🔧 Service Worker зарегистрирован:', registration);
                
                // Настраиваем кэширование
                this.serviceWorkerCache = registration;
            } catch (error) {
                console.warn('❌ Ошибка регистрации Service Worker:', error);
            }
        }
    }

    /**
     * 🖼️ ОПТИМИЗАЦИЯ ИЗОБРАЖЕНИЙ
     */
    optimizeImages() {
        // Lazy loading для всех изображений
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });

        // Intersection Observer для lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * 🧠 ИНТЕЛЛЕКТУАЛЬНАЯ ПРЕДЗАГРУЗКА
     */
    setupIntelligentPreloading() {
        // Предзагрузка на основе пользовательского поведения
        this.setupHoverPreloading();
        this.setupScrollPreloading();
        this.setupInteractionPreloading();
    }

    /**
     * 🖱️ ПРЕДЗАГРУЗКА ПРИ НАВЕДЕНИИ
     */
    setupHoverPreloading() {
        const hoverElements = document.querySelectorAll('a[href], .project-card, .game-card');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.preloadOnHover(element);
            });
        });
    }

    preloadOnHover(element) {
        // Предзагружаем ресурсы связанные с элементом
        const href = element.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                this.preloadElementResources(target);
            }
        }
    }

    /**
     * 📜 ПРЕДЗАГРУЗКА ПРИ СКРОЛЛЕ
     */
    setupScrollPreloading() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.preloadVisibleElements();
            }, 100);
        });
    }

    preloadVisibleElements() {
        const visibleElements = document.querySelectorAll('.scroll-reveal, .project-card, .game-card');
        
        visibleElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                this.preloadElementResources(element);
            }
        });
    }

    /**
     * 🎮 ПРЕДЗАГРУЗКА ПРИ ВЗАИМОДЕЙСТВИИ
     */
    setupInteractionPreloading() {
        // Предзагрузка при клике на кнопки
        document.addEventListener('click', (e) => {
            if (e.target.matches('.glass-button, .filter-btn, .game-btn')) {
                this.preloadInteractionResources(e.target);
            }
        });
    }

    preloadInteractionResources(element) {
        // Предзагружаем ресурсы для интерактивных элементов
        const relatedImages = element.querySelectorAll('img');
        relatedImages.forEach(img => {
            if (img.dataset.src) {
                this.preloadResource({
                    url: img.dataset.src,
                    type: 'image',
                    priority: this.priorities.MEDIUM
                });
            }
        });
    }

    /**
     * 🔍 ПРЕДЗАГРУЗКА РЕСУРСОВ ЭЛЕМЕНТА
     */
    preloadElementResources(element) {
        // Изображения
        const images = element.querySelectorAll('img[src], img[data-src]');
        images.forEach(img => {
            const src = img.src || img.dataset.src;
            if (src) {
                this.preloadResource({
                    url: src,
                    type: 'image',
                    priority: this.priorities.MEDIUM
                });
            }
        });

        // Иконки
        const icons = element.querySelectorAll('[class*="icon"]');
        icons.forEach(icon => {
            const backgroundImage = getComputedStyle(icon).backgroundImage;
            if (backgroundImage && backgroundImage !== 'none') {
                const url = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
                if (url) {
                    this.preloadResource({
                        url: url[1],
                        type: 'image',
                        priority: this.priorities.LOW
                    });
                }
            }
        });
    }

    /**
     * 📊 ОПРЕДЕЛЕНИЕ СКОРОСТИ СОЕДИНЕНИЯ
     */
    detectConnectionSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            return {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt
            };
        }
        return { effectiveType: '4g', downlink: 10, rtt: 50 };
    }

    /**
     * 🎯 ПРИОРИТИЗАЦИЯ ЗАГРУЗКИ
     */
    prioritizeLoading() {
        const isSlowConnection = this.connectionSpeed.effectiveType === 'slow-2g' || 
                                 this.connectionSpeed.effectiveType === '2g';
        
        if (isSlowConnection) {
            // Отключаем тяжелые анимации на медленном соединении
            document.documentElement.classList.add('slow-connection');
            this.disableHeavyAnimations();
        }
    }

    disableHeavyAnimations() {
        // Отключаем частицы и тяжелые анимации
        const particleCanvas = document.querySelector('.particle-canvas');
        if (particleCanvas) {
            particleCanvas.style.display = 'none';
        }
        
        // Уменьшаем количество кубиков
        const cubes = document.querySelectorAll('.die');
        if (cubes.length > 5) {
            for (let i = 5; i < cubes.length; i++) {
                cubes[i].style.display = 'none';
            }
        }
    }

    /**
     * 📈 МОНИТОРИНГ ПРОИЗВОДИТЕЛЬНОСТИ
     */
    startPerformanceMonitoring() {
        // Мониторинг FPS
        let fps = 0;
        let lastTime = performance.now();
        
        const measureFPS = () => {
            const now = performance.now();
            fps = 1000 / (now - lastTime);
            lastTime = now;
            
            // Адаптация производительности
            if (fps < 30) {
                this.adaptPerformance();
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        measureFPS();
    }

    adaptPerformance() {
        // Уменьшаем качество анимаций при низком FPS
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        
        // Отключаем тяжелые эффекты
        this.disableHeavyAnimations();
    }

    /**
     * 🧹 ОЧИСТКА КЭША
     */
    clearCache() {
        this.memoryCache.clear();
        this.storageCache.clear();
        
        if (this.canUseStorage()) {
            localStorage.removeItem('performance_cache');
        }
        
        console.log('🧹 Кэш очищен');
    }

    /**
     * 📊 СТАТИСТИКА ПРОИЗВОДИТЕЛЬНОСТИ
     */
    getPerformanceStats() {
        return {
            memoryCacheSize: this.memoryCache.size,
            storageCacheSize: this.storageCache.size,
            connectionSpeed: this.connectionSpeed,
            isServiceWorkerActive: !!this.serviceWorkerCache
        };
    }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}

// Глобальная инициализация
if (typeof window !== 'undefined') {
    window.PerformanceOptimizer = PerformanceOptimizer;
    
    // Автоматическая инициализация
    document.addEventListener('DOMContentLoaded', () => {
        window.performanceOptimizer = new PerformanceOptimizer();
    });
}
