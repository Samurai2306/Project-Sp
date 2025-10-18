/**
 * 🧠 ИНТЕЛЛЕКТУАЛЬНОЕ УПРАВЛЕНИЕ ДАННЫМИ
 * Система приоритизации, инвалидации и синхронизации данных
 */

class SmartDataManager {
    constructor() {
        this.dataCache = new Map();
        this.pendingRequests = new Map();
        this.dataPriorities = new Map();
        this.invalidationRules = new Map();
        this.syncQueue = [];
        this.isOnline = navigator.onLine;
        
        this.init();
    }

    /**
     * 🚀 ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ
     */
    init() {
        console.log('🧠 Инициализация интеллектуального управления данными...');
        
        // Настройка приоритетов данных
        this.setupDataPriorities();
        
        // Настройка правил инвалидации
        this.setupInvalidationRules();
        
        // Мониторинг состояния сети
        this.setupNetworkMonitoring();
        
        // Автоматическая синхронизация
        this.setupAutoSync();
        
        console.log('✅ Система управления данными инициализирована');
    }

    /**
     * 📊 НАСТРОЙКА ПРИОРИТЕТОВ ДАННЫХ
     */
    setupDataPriorities() {
        // Критические данные (загружаются сразу)
        this.dataPriorities.set('user-profile', 1);
        this.dataPriorities.set('navigation', 1);
        this.dataPriorities.set('critical-images', 1);
        
        // Важные данные (загружаются после критических)
        this.dataPriorities.set('projects-data', 2);
        this.dataPriorities.set('skills-data', 2);
        this.dataPriorities.set('games-data', 2);
        
        // Средней важности (загружаются в фоне)
        this.dataPriorities.set('analytics', 3);
        this.dataPriorities.set('user-preferences', 3);
        
        // Низкой важности (загружаются по требованию)
        this.dataPriorities.set('background-images', 4);
        this.dataPriorities.set('optional-content', 4);
    }

    /**
     * ⏰ НАСТРОЙКА ПРАВИЛ ИНВАЛИДАЦИИ
     */
    setupInvalidationRules() {
        // Инвалидация по времени
        this.invalidationRules.set('user-profile', { type: 'time', value: 3600000 }); // 1 час
        this.invalidationRules.set('projects-data', { type: 'time', value: 1800000 }); // 30 минут
        this.invalidationRules.set('skills-data', { type: 'time', value: 7200000 }); // 2 часа
        this.invalidationRules.set('games-data', { type: 'time', value: 86400000 }); // 24 часа
        
        // Инвалидация по событиям
        this.invalidationRules.set('navigation', { type: 'event', value: 'route-change' });
        this.invalidationRules.set('user-preferences', { type: 'event', value: 'preference-change' });
        
        // Инвалидация по версии
        this.invalidationRules.set('critical-images', { type: 'version', value: '1.0.0' });
    }

    /**
     * 🌐 МОНИТОРИНГ СОСТОЯНИЯ СЕТИ
     */
    setupNetworkMonitoring() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('🌐 Соединение восстановлено');
            this.processSyncQueue();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('🔌 Соединение потеряно');
        });
    }

    /**
     * 🔄 АВТОМАТИЧЕСКАЯ СИНХРОНИЗАЦИЯ
     */
    setupAutoSync() {
        // Синхронизация каждые 5 минут
        setInterval(() => {
            if (this.isOnline) {
                this.syncData();
            }
        }, 300000);
        
        // Синхронизация при изменении видимости страницы
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.isOnline) {
                this.syncData();
            }
        });
    }

    /**
     * 📦 ЗАГРУЗКА ДАННЫХ С ПРИОРИТИЗАЦИЕЙ
     */
    async loadData(key, url, options = {}) {
        // Проверяем кэш
        const cached = this.getCachedData(key);
        if (cached && !this.isDataInvalid(key, cached)) {
            console.log(`📦 Данные ${key} загружены из кэша`);
            return cached.data;
        }
        
        // Проверяем, не загружается ли уже
        if (this.pendingRequests.has(key)) {
            console.log(`⏳ Ожидание загрузки ${key}...`);
            return this.pendingRequests.get(key);
        }
        
        // Создаем промис для загрузки
        const loadPromise = this.fetchData(url, options);
        this.pendingRequests.set(key, loadPromise);
        
        try {
            const data = await loadPromise;
            
            // Сохраняем в кэш
            this.setCachedData(key, data, options);
            
            // Удаляем из ожидающих
            this.pendingRequests.delete(key);
            
            console.log(`✅ Данные ${key} загружены успешно`);
            return data;
        } catch (error) {
            this.pendingRequests.delete(key);
            console.error(`❌ Ошибка загрузки ${key}:`, error);
            throw error;
        }
    }

    /**
     * 🌐 ЗАГРУЗКА ДАННЫХ
     */
    async fetchData(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    /**
     * 💾 ПОЛУЧЕНИЕ ДАННЫХ ИЗ КЭША
     */
    getCachedData(key) {
        const cached = this.dataCache.get(key);
        if (!cached) return null;
        
        return {
            data: cached.data,
            timestamp: cached.timestamp,
            version: cached.version
        };
    }

    /**
     * 💾 СОХРАНЕНИЕ ДАННЫХ В КЭШ
     */
    setCachedData(key, data, options = {}) {
        this.dataCache.set(key, {
            data,
            timestamp: Date.now(),
            version: options.version || '1.0.0'
        });
    }

    /**
     * ⏰ ПРОВЕРКА ИНВАЛИДАЦИИ ДАННЫХ
     */
    isDataInvalid(key, cached) {
        const rule = this.invalidationRules.get(key);
        if (!rule) return false;
        
        switch (rule.type) {
            case 'time':
                return Date.now() - cached.timestamp > rule.value;
            case 'version':
                return cached.version !== rule.value;
            case 'event':
                // Проверяем, произошло ли событие
                return this.hasEventOccurred(rule.value);
            default:
                return false;
        }
    }

    /**
     * 📅 ПРОВЕРКА СОБЫТИЙ
     */
    hasEventOccurred(eventType) {
        // Простая реализация - в реальном приложении можно использовать EventBus
        return false;
    }

    /**
     * 🔄 СИНХРОНИЗАЦИЯ ДАННЫХ
     */
    async syncData() {
        if (!this.isOnline) {
            console.log('🔌 Офлайн режим - синхронизация отложена');
            return;
        }
        
        console.log('🔄 Начало синхронизации данных...');
        
        const syncPromises = [];
        
        // Синхронизируем данные по приоритету
        for (const [key, priority] of this.dataPriorities) {
            if (priority <= 2) { // Критические и важные данные
                syncPromises.push(this.syncDataKey(key));
            }
        }
        
        try {
            await Promise.all(syncPromises);
            console.log('✅ Синхронизация завершена');
        } catch (error) {
            console.error('❌ Ошибка синхронизации:', error);
        }
    }

    /**
     * 🔄 СИНХРОНИЗАЦИЯ КОНКРЕТНЫХ ДАННЫХ
     */
    async syncDataKey(key) {
        try {
            // Здесь можно добавить логику синхронизации с сервером
            console.log(`🔄 Синхронизация ${key}...`);
            
            // Обновляем timestamp
            const cached = this.dataCache.get(key);
            if (cached) {
                cached.timestamp = Date.now();
            }
        } catch (error) {
            console.error(`❌ Ошибка синхронизации ${key}:`, error);
        }
    }

    /**
     * 📋 ОБРАБОТКА ОЧЕРЕДИ СИНХРОНИЗАЦИИ
     */
    async processSyncQueue() {
        if (this.syncQueue.length === 0) return;
        
        console.log(`📋 Обработка очереди синхронизации (${this.syncQueue.length} элементов)...`);
        
        const queue = [...this.syncQueue];
        this.syncQueue = [];
        
        for (const item of queue) {
            try {
                await this.syncDataKey(item.key);
            } catch (error) {
                console.error(`❌ Ошибка синхронизации ${item.key}:`, error);
                // Возвращаем в очередь при ошибке
                this.syncQueue.push(item);
            }
        }
    }

    /**
     * 🎯 ПРЕДЗАГРУЗКА ДАННЫХ
     */
    async preloadData(dataConfig) {
        const preloadPromises = [];
        
        for (const config of dataConfig) {
            const { key, url, priority = 3 } = config;
            
            // Предзагружаем только если данные не в кэше или устарели
            const cached = this.getCachedData(key);
            if (!cached || this.isDataInvalid(key, cached)) {
                preloadPromises.push(
                    this.loadData(key, url, { priority })
                );
            }
        }
        
        try {
            await Promise.all(preloadPromises);
            console.log('✅ Предзагрузка данных завершена');
        } catch (error) {
            console.error('❌ Ошибка предзагрузки:', error);
        }
    }

    /**
     * 🧹 ОЧИСТКА КЭША
     */
    clearCache(pattern = null) {
        if (pattern) {
            // Очищаем по паттерну
            for (const key of this.dataCache.keys()) {
                if (key.includes(pattern)) {
                    this.dataCache.delete(key);
                }
            }
        } else {
            // Очищаем весь кэш
            this.dataCache.clear();
        }
        
        console.log('🧹 Кэш очищен');
    }

    /**
     * 📊 СТАТИСТИКА ДАННЫХ
     */
    getDataStats() {
        const stats = {
            totalKeys: this.dataCache.size,
            pendingRequests: this.pendingRequests.size,
            syncQueueLength: this.syncQueue.length,
            isOnline: this.isOnline,
            cacheSize: this.calculateCacheSize()
        };
        
        return stats;
    }

    /**
     * 📏 РАСЧЕТ РАЗМЕРА КЭША
     */
    calculateCacheSize() {
        let totalSize = 0;
        
        for (const [key, value] of this.dataCache) {
            totalSize += JSON.stringify(value).length;
        }
        
        return totalSize;
    }

    /**
     * 🎯 ОПТИМИЗАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ
     */
    optimizePerformance() {
        // Очищаем старые данные
        const now = Date.now();
        const maxAge = 24 * 60 * 60 * 1000; // 24 часа
        
        for (const [key, value] of this.dataCache) {
            if (now - value.timestamp > maxAge) {
                this.dataCache.delete(key);
            }
        }
        
        // Ограничиваем размер кэша
        const maxCacheSize = 50; // Максимум 50 элементов
        if (this.dataCache.size > maxCacheSize) {
            const entries = Array.from(this.dataCache.entries());
            entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
            
            const toDelete = entries.slice(0, this.dataCache.size - maxCacheSize);
            toDelete.forEach(([key]) => this.dataCache.delete(key));
        }
        
        console.log('⚡ Производительность оптимизирована');
    }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartDataManager;
}

// Глобальная инициализация
if (typeof window !== 'undefined') {
    window.SmartDataManager = SmartDataManager;
    
    // Автоматическая инициализация
    document.addEventListener('DOMContentLoaded', () => {
        window.smartDataManager = new SmartDataManager();
    });
}
