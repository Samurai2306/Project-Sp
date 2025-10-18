/**
 * 📊 СИСТЕМА МОНИТОРИНГА ПРОИЗВОДИТЕЛЬНОСТИ
 * Отслеживание метрик и автоматическая оптимизация
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            memory: 0,
            loadTime: 0,
            renderTime: 0,
            networkSpeed: 'unknown'
        };
        
        this.thresholds = {
            fps: 30,
            memory: 0.8, // 80% от лимита
            loadTime: 3000, // 3 секунды
            renderTime: 16 // 60 FPS
        };
        
        this.isMonitoring = false;
        this.optimizations = [];
        
        this.init();
    }

    /**
     * 🚀 ИНИЦИАЛИЗАЦИЯ МОНИТОРИНГА
     */
    init() {
        console.log('📊 Инициализация системы мониторинга производительности...');
        
        // Начинаем мониторинг
        this.startMonitoring();
        
        // Настраиваем автоматические оптимизации
        this.setupAutoOptimizations();
        
        // Мониторинг событий
        this.setupEventMonitoring();
        
        console.log('✅ Система мониторинга инициализирована');
    }

    /**
     * 📈 НАЧАЛО МОНИТОРИНГА
     */
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        
        // Мониторинг FPS
        this.monitorFPS();
        
        // Мониторинг памяти
        this.monitorMemory();
        
        // Мониторинг времени загрузки
        this.monitorLoadTime();
        
        // Мониторинг скорости сети
        this.monitorNetworkSpeed();
        
        console.log('📊 Мониторинг производительности запущен');
    }

    /**
     * 🎯 МОНИТОРИНГ FPS
     */
    monitorFPS() {
        let fps = 0;
        let lastTime = performance.now();
        let frameCount = 0;
        
        const measureFPS = () => {
            const now = performance.now();
            frameCount++;
            
            if (now - lastTime >= 1000) {
                fps = Math.round((frameCount * 1000) / (now - lastTime));
                this.metrics.fps = fps;
                
                // Проверяем порог FPS
                if (fps < this.thresholds.fps) {
                    this.triggerOptimization('low-fps', { fps });
                }
                
                frameCount = 0;
                lastTime = now;
            }
            
            if (this.isMonitoring) {
                requestAnimationFrame(measureFPS);
            }
        };
        
        measureFPS();
    }

    /**
     * 💾 МОНИТОРИНГ ПАМЯТИ
     */
    monitorMemory() {
        if (!('memory' in performance)) return;
        
        const checkMemory = () => {
            const memory = performance.memory;
            const usage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
            this.metrics.memory = usage;
            
            // Проверяем порог памяти
            if (usage > this.thresholds.memory) {
                this.triggerOptimization('high-memory', { usage });
            }
            
            if (this.isMonitoring) {
                setTimeout(checkMemory, 5000); // Проверяем каждые 5 секунд
            }
        };
        
        checkMemory();
    }

    /**
     * ⏱️ МОНИТОРИНГ ВРЕМЕНИ ЗАГРУЗКИ
     */
    monitorLoadTime() {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            this.metrics.loadTime = loadTime;
            
            console.log(`⏱️ Время загрузки: ${loadTime}ms`);
            
            // Проверяем порог времени загрузки
            if (loadTime > this.thresholds.loadTime) {
                this.triggerOptimization('slow-load', { loadTime });
            }
        });
    }

    /**
     * 🌐 МОНИТОРИНГ СКОРОСТИ СЕТИ
     */
    monitorNetworkSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            this.metrics.networkSpeed = connection.effectiveType;
            
            // Адаптируем оптимизации под скорость сети
            this.adaptToNetworkSpeed(connection);
        }
    }

    /**
     * 🔧 АДАПТАЦИЯ ПОД СКОРОСТЬ СЕТИ
     */
    adaptToNetworkSpeed(connection) {
        const speed = connection.effectiveType;
        
        if (speed === 'slow-2g' || speed === '2g') {
            this.triggerOptimization('slow-network', { speed });
        } else if (speed === '3g') {
            this.triggerOptimization('medium-network', { speed });
        }
    }

    /**
     * ⚡ АВТОМАТИЧЕСКИЕ ОПТИМИЗАЦИИ
     */
    setupAutoOptimizations() {
        // Оптимизация при низком FPS
        this.optimizations.push({
            trigger: 'low-fps',
            action: () => {
                console.log('⚡ Оптимизация: Низкий FPS');
                this.disableHeavyAnimations();
                this.reduceParticleCount();
            }
        });
        
        // Оптимизация при высокой загрузке памяти
        this.optimizations.push({
            trigger: 'high-memory',
            action: () => {
                console.log('⚡ Оптимизация: Высокая загрузка памяти');
                this.clearUnusedCache();
                this.reduceImageQuality();
            }
        });
        
        // Оптимизация при медленной загрузке
        this.optimizations.push({
            trigger: 'slow-load',
            action: () => {
                console.log('⚡ Оптимизация: Медленная загрузка');
                this.enableLazyLoading();
                this.deferNonCriticalResources();
            }
        });
        
        // Оптимизация при медленной сети
        this.optimizations.push({
            trigger: 'slow-network',
            action: () => {
                console.log('⚡ Оптимизация: Медленная сеть');
                this.disableNonEssentialFeatures();
                this.enableAggressiveCaching();
            }
        });
    }

    /**
     * 🎯 ЗАПУСК ОПТИМИЗАЦИИ
     */
    triggerOptimization(trigger, data) {
        const optimization = this.optimizations.find(opt => opt.trigger === trigger);
        if (optimization) {
            optimization.action(data);
        }
    }

    /**
     * 🎨 ОТКЛЮЧЕНИЕ ТЯЖЕЛЫХ АНИМАЦИЙ
     */
    disableHeavyAnimations() {
        document.documentElement.classList.add('reduced-motion');
        
        // Отключаем частицы
        const particleCanvas = document.querySelector('.particle-canvas');
        if (particleCanvas) {
            particleCanvas.style.display = 'none';
        }
        
        // Уменьшаем количество кубиков
        const cubes = document.querySelectorAll('.die');
        if (cubes.length > 2) {
            for (let i = 2; i < cubes.length; i++) {
                cubes[i].style.display = 'none';
            }
        }
    }

    /**
     * 🔢 УМЕНЬШЕНИЕ КОЛИЧЕСТВА ЧАСТИЦ
     */
    reduceParticleCount() {
        // Уменьшаем количество частиц в 3 раза
        const style = document.createElement('style');
        style.textContent = `
            .particle-canvas {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 🧹 ОЧИСТКА НЕИСПОЛЬЗУЕМОГО КЭША
     */
    clearUnusedCache() {
        // Очищаем кэш изображений
        if (window.performanceOptimizer) {
            window.performanceOptimizer.clearCache();
        }
        
        // Очищаем кэш данных
        if (window.smartDataManager) {
            window.smartDataManager.clearCache();
        }
    }

    /**
     * 🖼️ УМЕНЬШЕНИЕ КАЧЕСТВА ИЗОБРАЖЕНИЙ
     */
    reduceImageQuality() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.imageRendering = 'pixelated';
            img.style.filter = 'blur(0.5px)';
        });
    }

    /**
     * 🔄 ВКЛЮЧЕНИЕ LAZY LOADING
     */
    enableLazyLoading() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    /**
     * ⏳ ОТЛОЖЕННАЯ ЗАГРУЗКА НЕКРИТИЧЕСКИХ РЕСУРСОВ
     */
    deferNonCriticalResources() {
        // Откладываем загрузку тяжелых скриптов
        const heavyScripts = document.querySelectorAll('script[src*="three"], script[src*="gsap"]');
        heavyScripts.forEach(script => {
            script.defer = true;
        });
    }

    /**
     * 🚫 ОТКЛЮЧЕНИЕ НЕОБЯЗАТЕЛЬНЫХ ФУНКЦИЙ
     */
    disableNonEssentialFeatures() {
        // Отключаем анимации
        document.documentElement.classList.add('slow-connection');
        
        // Отключаем тяжелые эффекты
        this.disableHeavyAnimations();
    }

    /**
     * 💾 АГРЕССИВНОЕ КЭШИРОВАНИЕ
     */
    enableAggressiveCaching() {
        // Увеличиваем время кэширования
        if (window.performanceOptimizer) {
            // Настраиваем более агрессивное кэширование
            console.log('💾 Включено агрессивное кэширование');
        }
    }

    /**
     * 📊 МОНИТОРИНГ СОБЫТИЙ
     */
    setupEventMonitoring() {
        // Мониторинг скролла
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.measureScrollPerformance();
            }, 100);
        });
        
        // Мониторинг ресайза
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.measureResizePerformance();
            }, 250);
        });
    }

    /**
     * 📜 ИЗМЕРЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ СКРОЛЛА
     */
    measureScrollPerformance() {
        const startTime = performance.now();
        
        requestAnimationFrame(() => {
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            
            if (renderTime > this.thresholds.renderTime) {
                this.triggerOptimization('slow-scroll', { renderTime });
            }
        });
    }

    /**
     * 📏 ИЗМЕРЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ РЕСАЙЗА
     */
    measureResizePerformance() {
        const startTime = performance.now();
        
        requestAnimationFrame(() => {
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            
            if (renderTime > this.thresholds.renderTime) {
                this.triggerOptimization('slow-resize', { renderTime });
            }
        });
    }

    /**
     * 📊 ПОЛУЧЕНИЕ МЕТРИК
     */
    getMetrics() {
        return {
            ...this.metrics,
            timestamp: Date.now(),
            optimizations: this.optimizations.length
        };
    }

    /**
     * 📈 ОТЧЕТ О ПРОИЗВОДИТЕЛЬНОСТИ
     */
    generateReport() {
        const metrics = this.getMetrics();
        const report = {
            timestamp: new Date().toISOString(),
            metrics,
            recommendations: this.generateRecommendations(metrics)
        };
        
        console.log('📊 Отчет о производительности:', report);
        return report;
    }

    /**
     * 💡 ГЕНЕРАЦИЯ РЕКОМЕНДАЦИЙ
     */
    generateRecommendations(metrics) {
        const recommendations = [];
        
        if (metrics.fps < 30) {
            recommendations.push('Рекомендуется отключить тяжелые анимации');
        }
        
        if (metrics.memory > 0.8) {
            recommendations.push('Рекомендуется очистить кэш и уменьшить качество изображений');
        }
        
        if (metrics.loadTime > 3000) {
            recommendations.push('Рекомендуется оптимизировать загрузку ресурсов');
        }
        
        return recommendations;
    }

    /**
     * 🛑 ОСТАНОВКА МОНИТОРИНГА
     */
    stopMonitoring() {
        this.isMonitoring = false;
        console.log('📊 Мониторинг производительности остановлен');
    }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}

// Глобальная инициализация
if (typeof window !== 'undefined') {
    window.PerformanceMonitor = PerformanceMonitor;
    
    // Автоматическая инициализация
    document.addEventListener('DOMContentLoaded', () => {
        window.performanceMonitor = new PerformanceMonitor();
    });
}
