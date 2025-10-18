// Класс MobilePortfolio — основной управляющий компонент мобильной версии портфолио
// В этом классе реализованы все ключевые функции интерфейса: навигация, сенсорные события, плавная прокрутка, анимации, оптимизация производительности и визуальные эффекты
// Каждый метод класса отвечает за отдельную часть пользовательского взаимодействия или визуального оформления
class MobilePortfolio {
    constructor() {
        // this.isMobileMenuOpen — переменная, определяющая, открыто ли мобильное меню
        this.isMobileMenuOpen = false;
        // При создании экземпляра класса сразу запускается инициализация всех функций интерфейса
        this.init();
    }

    init() {
        // Запуск инициализации мобильной навигации (бургер-меню)
        this.initMobileNavigation(); // отвечает за открытие/закрытие меню на мобильных устройствах
        // Подключение обработчиков сенсорных событий (тач, свайп)
        this.initTouchEvents(); // обеспечивает поддержку мобильных жестов
        // Включение плавной прокрутки по якорным ссылкам
        this.initSmoothScroll(); // делает переходы по разделам страницы плавными
        // Запуск анимаций появления и движения элементов интерфейса
        this.initAnimations(); // отвечает за визуальные эффекты при взаимодействии
        // Оптимизация производительности: отключение неиспользуемых обработчиков, уменьшение нагрузки
        this.initPerformanceOptimizations();
        // Установка состояния загрузки: плавное появление страницы после загрузки
        this.setupLoadingState();
        // Запуск фоновой анимации кубиков (визуальный эффект на главном экране)
        this.initCubeBgAnimation();
        // Кастомные курсоры отключены
        // Инициализация скролл-теллинга
        this.initScrollTelling();
        // Инициализация 3D объектов - отключено по запросу
        // this.initThreeJS();
        // Инициализация магнитных эффектов
        this.initMagneticEffects();
        // Инициализация анимации дисплея
        this.initDisplayAnimation();
    }
    /**
     * Метод initCubeBgAnimation — создает мягкую и приятную фоновую анимацию.
     * Использует библиотеку GSAP для плавных 3D-анимаций с уменьшенной интенсивностью.
     */
    initCubeBgAnimation() {
        // Проверяем, что библиотека GSAP загружена и есть элемент для анимации
        if (!window.gsap || !document.querySelector('.pov')) return;
        
        // Уменьшенное количество кубиков для более спокойной анимации
        const n = 10;
        
        // Мягкие параметры для граней кубика
        const rots = [
            { ry: 270, a:0.4 }, // левая грань - увеличенная прозрачность для видимости
            { ry: 0,   a:0.7 }, // передняя грань
            { ry: 90,  a:0.3 }, // правая грань
            { ry: 180, a:0.1 }  // задняя грань
        ];

        // Устанавливаем стили для граней кубика (3D-эффект) - уменьшенный размер
        gsap.set('.face', {
            z: 120, // уменьшено с 200
            rotateY: i => rots[i].ry,
            transformOrigin: '50% 50% -121px' // уменьшено с -201px
        });

        // Генерируем и анимируем каждый кубик с более мягкими параметрами
        for (let i=0; i<n; i++){
            let die = document.querySelector('.die');
            let cube = die.querySelector('.cube');
            
            if (i>0){    
                let clone = die.cloneNode(true);
                document.querySelector('.tray').append(clone);
                cube = clone.querySelector('.cube');
            }
            
            // Более медленная и плавная анимация
            gsap.timeline({repeat:-1, yoyo:true, defaults:{ease:'power2.inOut', duration:2}})
            .fromTo(cube, {
                rotateY:-35 // уменьшенный угол вращения
            },{
                rotateY:35,
                ease:'power2.inOut',
                duration:10 // медленнее
            })
            // Более мягкие цвета с фиолетовыми оттенками (уменьшенная яркость)
            .fromTo(cube.querySelectorAll('.face'), {
                color:(j)=>'hsl('+(i/n*40+280)+', 25%,'+(35*[rots[3].a, rots[0].a, rots[1].a][j])+'%)'
            },{
                color:(j)=>'hsl('+(i/n*40+280)+', 20%,'+(30*[rots[0].a, rots[1].a, rots[2].a][j])+'%)'
            }, 0)
            .to(cube.querySelectorAll('.face'), {
                color:(j)=>'hsl('+(i/n*40+280)+', 15%,'+(25*[rots[1].a, rots[2].a, rots[3].a][j])+'%)'
            }, 1)
            .progress(i/n);
        }

        // Очень мягкая анимация всей ленты
        gsap.timeline()
            // Минимальное вертикальное покачивание
            .from('.tray', {yPercent:-0.5, duration:5, ease:'power1.inOut', yoyo:true, repeat:-1}, 0)
            // Очень небольшое горизонтальное покачивание
            .fromTo('.tray', {rotate:-1},{rotate:1, duration:7, ease:'power1.inOut', yoyo:true, repeat:-1}, 0)
            // Плавное появление кубиков
            .from('.die', {duration:0.5, opacity:0, stagger:{each:0.1, ease:'power2.in'}}, 0)
            // Очень небольшая пульсация
            .to('.tray', {scale:1.01, duration:4, ease:'power2.inOut', yoyo:true, repeat:-1}, 0);

        // Масштабирование анимации под размер окна браузера
        window.addEventListener('resize', setCubeBgScale);
        setCubeBgScale();
        
        function setCubeBgScale() {
            const h = n*12; // уменьшенная высота
            gsap.set('.tray', {height:h});
            gsap.set('.pov', {scale:window.innerHeight/h});
        }
    }

    // Setup loading state
    setupLoadingState() {
        window.addEventListener('load', () => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        });

        // Fallback in case load event doesn't fire
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 1000);
    }

    // Mobile navigation with touch gestures
    initMobileNavigation() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navList = document.querySelector('.neo-nav__list');
        const navLinks = document.querySelectorAll('.neo-nav__link');

        if (toggle && navList) {
            // Create professional burger menu lines if they don't exist
            if (!toggle.querySelector('span')) {
                toggle.innerHTML = '<span></span><span></span><span></span>';
            }
            
            // Add accessibility attributes
            toggle.setAttribute('aria-label', 'Открыть меню');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('role', 'button');
            
            // Toggle menu
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });

            // Close menu when clicking on links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isMobileMenuOpen && !navList.contains(e.target) && !toggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const navList = document.querySelector('.neo-nav__list');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (navList && toggle) {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
            navList.classList.toggle('active');
            toggle.classList.toggle('active');
            
            // Update accessibility attributes
            toggle.setAttribute('aria-expanded', this.isMobileMenuOpen);
            toggle.setAttribute('aria-label', this.isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню');
            
            // Prevent body scroll when menu is open
            if (this.isMobileMenuOpen) {
                document.body.style.overflow = 'hidden';
                document.body.classList.add('menu-open');
            } else {
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
            }
        }
    }

    closeMobileMenu() {
        const navList = document.querySelector('.neo-nav__list');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (navList && toggle) {
            this.isMobileMenuOpen = false;
            navList.classList.remove('active');
            toggle.classList.remove('active');
            
            // Update accessibility attributes
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Открыть меню');
            
            // Restore body scroll
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }
    }

    // Touch event optimizations
    initTouchEvents() {
        // Add touch-specific classes for better UX
        if ('ontouchstart' in window) {
            document.documentElement.classList.add('touch-device');
        }

        // Prevent zoom on double tap for buttons
        const buttons = document.querySelectorAll('button, .glass-button');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                // Add active state
                this.style.transform = 'scale(0.98)';
            });

            button.addEventListener('touchend', function() {
                // Remove active state
                this.style.transform = '';
            });
        });
        
        // Mobile-specific optimizations
        this.optimizeForMobile();
    }
    
    // Mobile performance optimizations
    optimizeForMobile() {
        // Detect mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Reduce animation complexity on mobile
            document.body.classList.add('mobile-device');
            
            // Optimize images for mobile
            this.optimizeImagesForMobile();
            
            // Reduce particle effects on mobile
            const particleCanvas = document.querySelector('.particle-canvas');
            if (particleCanvas) {
                particleCanvas.style.display = 'none';
            }
            
            // Optimize scroll performance
            this.optimizeScrollForMobile();
        }
    }
    
    // Optimize images for mobile devices
    optimizeImagesForMobile() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading optimization
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Optimize image rendering
            img.style.imageRendering = 'auto';
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });
    }
    
    // Optimize scroll performance for mobile
    optimizeScrollForMobile() {
        let scrollTimeout;
        
        const handleScroll = () => {
            // Throttle scroll events on mobile
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Mobile-specific scroll handling
                this.handleMobileScroll();
            }, 16); // ~60fps
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Handle mobile scroll events
    handleMobileScroll() {
        // Add mobile-specific scroll optimizations
        const scrollY = window.scrollY;
        
        // Optimize parallax effects for mobile
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Smooth scroll with mobile optimizations
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 80; // Account for fixed header
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            }.bind(this));
        });
    }

    // Performance-optimized animations
    initAnimations() {
        this.initLazyLoading();
        this.initIntersectionObserver();
        this.initPerformanceCounters();
        this.initTypingAnimation();
        this.initMarqueeAnimation();
    }

    // Typing animation for subtitle
    initTypingAnimation() {
        const subtitle = document.querySelector('.typing-animation');
        if (!subtitle) return;

        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(subtitle);
    }

    // Infinite marquee for skills
    initMarqueeAnimation() {
        const marquee = document.querySelector('.marquee-track');
        if (!marquee) return;

        const clone = marquee.cloneNode(true);
        marquee.parentNode.appendChild(clone);

        if (typeof gsap !== 'undefined') {
            gsap.to('.marquee-track', {
                x: '-50%',
                duration: 20,
                repeat: -1,
                ease: 'linear'
            });
        }
    }

    // Lazy loading for images
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Intersection Observer for animations
    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate counters if element has data-count
                    const counters = entry.target.querySelectorAll('[data-count]');
                    counters.forEach(counter => {
                        this.animateCounter(counter);
                    });
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('.skills-category, .aspiration-card, .project-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Animated counters
    animateCounter(counter) {
        const targetStr = counter.getAttribute('data-count');
        const isInfinity = counter.getAttribute('data-infinity') === 'true';
        const hasDecimal = targetStr.includes('.');
        const target = parseFloat(targetStr);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                if (hasDecimal) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.floor(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                // Достигли целевого значения
                if (hasDecimal) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = Math.floor(target);
                }
                
                // Если это счётчик с бесконечностью, продолжаем анимацию
                if (isInfinity) {
                    setTimeout(() => {
                        this.animateToInfinity(counter, target);
                    }, 500);
                }
            }
        };

        updateCounter();
    }
    
    // Анимация превращения в бесконечность
    animateToInfinity(counter, startValue) {
        const maxValue = 999;
        const duration = 1500;
        const totalSteps = 60;
        const stepDuration = duration / totalSteps;
        let currentStep = 0;
        
        const updateToInfinity = () => {
            currentStep++;
            const progress = currentStep / totalSteps;
            
            // Экспоненциальное ускорение
            const easedProgress = Math.pow(progress, 2);
            const current = startValue + (maxValue - startValue) * easedProgress;
            
            if (currentStep < totalSteps) {
                counter.textContent = Math.floor(current);
                setTimeout(updateToInfinity, stepDuration);
            } else {
                // Быстрый счёт до большого числа
                counter.textContent = '999+';
                
                // Превращаем в бесконечность
                setTimeout(() => {
                    counter.classList.add('transforming-to-infinity');
                    setTimeout(() => {
                        counter.textContent = '∞';
                        counter.classList.remove('transforming-to-infinity');
                        counter.classList.add('is-infinity');
                    }, 300);
                }, 300);
            }
        };
        
        updateToInfinity();
    }

    // Performance monitoring
    initPerformanceCounters() {
        // Only animate counters when they come into view
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    // Performance optimizations
    initPerformanceOptimizations() {
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Preload critical images
        this.preloadCriticalImages();
        
        // Initialize particle effect only on desktop
        if (window.innerWidth > 768) {
            this.initParticleEffect();
        }
        
        // Initialize image optimization
        this.initImageOptimization();
        
        // Lazy load heavy features
        this.initLazyLoading();
        
        // Performance monitoring
        this.initPerformanceMonitoring();
        
        // 🚀 ИНТЕГРАЦИЯ С СИСТЕМОЙ ОПТИМИЗАЦИИ
        this.integrateWithOptimizationSystem();
    }
    
    // 🚀 ИНТЕГРАЦИЯ С СИСТЕМОЙ ОПТИМИЗАЦИИ
    integrateWithOptimizationSystem() {
        // Интеграция с Performance Optimizer
        if (window.performanceOptimizer) {
            console.log('🔗 Интеграция с системой оптимизации производительности...');
            
            // Передаем управление анимациями системе оптимизации
            this.optimizeAnimationsWithSystem();
            
            // Интеграция с системой кэширования
            this.integrateWithCachingSystem();
        }
        
        // Интеграция с Smart Data Manager
        if (window.smartDataManager) {
            console.log('🔗 Интеграция с системой управления данными...');
            
            // Предзагрузка данных проектов
            this.preloadProjectsData();
            
            // Интеграция с системой приоритизации
            this.integrateWithDataPriorities();
        }
    }
    
    // 🎯 ОПТИМИЗАЦИЯ АНИМАЦИЙ С СИСТЕМОЙ
    optimizeAnimationsWithSystem() {
        // Адаптивная оптимизация анимаций
        const connectionSpeed = window.performanceOptimizer.connectionSpeed;
        
        if (connectionSpeed.effectiveType === 'slow-2g' || connectionSpeed.effectiveType === '2g') {
            // Отключаем тяжелые анимации на медленном соединении
            document.documentElement.classList.add('slow-connection');
            this.disableHeavyAnimations();
        }
        
        // Мониторинг FPS и адаптация
        this.setupFPSMonitoring();
    }
    
    // 📊 МОНИТОРИНГ FPS
    setupFPSMonitoring() {
        let fps = 0;
        let lastTime = performance.now();
        
        const measureFPS = () => {
            const now = performance.now();
            fps = 1000 / (now - lastTime);
            lastTime = now;
            
            // Адаптация производительности
            if (fps < 30) {
                this.adaptPerformanceForLowFPS();
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        measureFPS();
    }
    
    // ⚡ АДАПТАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ
    adaptPerformanceForLowFPS() {
        // Уменьшаем качество анимаций
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        
        // Отключаем тяжелые эффекты
        this.disableHeavyAnimations();
        
        // Уменьшаем количество частиц
        this.reduceParticleCount();
    }
    
    // 🎨 ОТКЛЮЧЕНИЕ ТЯЖЕЛЫХ АНИМАЦИЙ
    disableHeavyAnimations() {
        // Отключаем частицы
        const particleCanvas = document.querySelector('.particle-canvas');
        if (particleCanvas) {
            particleCanvas.style.display = 'none';
        }
        
        // Уменьшаем количество кубиков
        const cubes = document.querySelectorAll('.die');
        if (cubes.length > 3) {
            for (let i = 3; i < cubes.length; i++) {
                cubes[i].style.display = 'none';
            }
        }
        
        // Отключаем сложные анимации
        document.documentElement.classList.add('reduced-motion');
    }
    
    // 🔢 УМЕНЬШЕНИЕ КОЛИЧЕСТВА ЧАСТИЦ
    reduceParticleCount() {
        // Уменьшаем количество частиц в 2 раза
        if (this.particleCount) {
            this.particleCount = Math.floor(this.particleCount / 2);
        }
    }
    
    // 💾 ИНТЕГРАЦИЯ С СИСТЕМОЙ КЭШИРОВАНИЯ
    integrateWithCachingSystem() {
        // Кэшируем критические изображения
        const criticalImages = [
            'assets/images/LOGO.png',
            'assets/images/1.jpg',
            'assets/images/2.jpg',
            'assets/images/3.jpg'
        ];
        
        criticalImages.forEach(src => {
            window.performanceOptimizer.preloadResource({
                url: src,
                type: 'image',
                priority: window.performanceOptimizer.priorities.CRITICAL
            });
        });
    }
    
    // 📦 ПРЕДЗАГРУЗКА ДАННЫХ ПРОЕКТОВ
    preloadProjectsData() {
        // Предзагружаем данные проектов
        window.smartDataManager.loadData('projects-data', '/api/projects', {
            priority: 2,
            timeout: 5000
        }).then(data => {
            console.log('📦 Данные проектов предзагружены:', data);
        }).catch(error => {
            console.warn('❌ Ошибка предзагрузки данных проектов:', error);
        });
    }
    
    // 🎯 ИНТЕГРАЦИЯ С ПРИОРИТЕТАМИ ДАННЫХ
    integrateWithDataPriorities() {
        // Настраиваем приоритеты для различных типов данных
        const dataPriorities = {
            'user-profile': 1,
            'projects-data': 2,
            'skills-data': 2,
            'games-data': 3,
            'analytics': 4
        };
        
        // Применяем приоритеты
        Object.entries(dataPriorities).forEach(([key, priority]) => {
            window.smartDataManager.dataPriorities.set(key, priority);
        });
    }

    handleResize() {
        // Update any layout-specific calculations
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    preloadCriticalImages() {
        // Preload hero images or critical above-the-fold images
        const criticalImages = [
            'assets/images/1.jpg',
            'assets/images/2.jpg',
            'assets/images/3.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onerror = () => {
                console.warn(`Failed to preload image: ${src}`);
            };
        });
    }
    
    initImageOptimization() {
        // Implement responsive images
        this.setupResponsiveImages();
        
        // Add intersection observer for lazy loading
        this.setupLazyLoading();
        
        // Optimize image loading based on connection
        this.optimizeForConnection();
    }
    
    setupResponsiveImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            // Add loading placeholder
            img.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
            img.style.backgroundSize = '200% 100%';
            img.style.animation = 'shimmer 1.5s infinite';
        });
    }
    
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    optimizeForConnection() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            // Reduce image quality on slow connections
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.documentElement.classList.add('slow-connection');
            }
            
            // Preload less on slow connections
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g') {
                this.preloadCriticalImages = () => {}; // Disable preloading
            }
        }
    }

    // Gentle Particle Background Effect
    initParticleEffect() {
        const canvas = document.createElement('canvas');
        canvas.className = 'particle-canvas';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        let mouseX = 0, mouseY = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class GentleParticle {
            constructor() {
                this.reset();
                this.originalX = this.x;
                this.originalY = this.y;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.hue = 250 + Math.random() * 40; // Purple range
                this.originalX = this.x;
                this.originalY = this.y;
            }

            update() {
                // Gentle floating motion
                this.x += this.speedX + Math.sin(Date.now() * 0.001 + this.originalX * 0.01) * 0.1;
                this.y += this.speedY + Math.cos(Date.now() * 0.001 + this.originalY * 0.01) * 0.1;
                
                // Mouse interaction (subtle)
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    this.x -= dx * force * 0.01;
                    this.y -= dy * force * 0.01;
                }

                // Soft boundary reset
                if (this.x < -50 || this.x > canvas.width + 50) this.reset();
                if (this.y < -50 || this.y > canvas.height + 50) this.reset();
            }

            draw() {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
                gradient.addColorStop(0, `hsla(${this.hue}, 60%, 70%, ${this.opacity})`);
                gradient.addColorStop(1, `hsla(${this.hue}, 60%, 70%, 0)`);
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(30, Math.floor(window.innerWidth / 30));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new GentleParticle());
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            animationId = requestAnimationFrame(animateParticles);
        };

        const stopParticles = () => {
            cancelAnimationFrame(animationId);
        };

        // Mouse tracking for gentle interaction
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Initialize
        resizeCanvas();
        initParticles();
        
        // Only animate when page is visible
        if (document.visibilityState === 'visible') {
            animateParticles();
        }

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                animateParticles();
            } else {
                stopParticles();
            }
        });

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // Custom cursor disabled

    // Scroll Telling
    initScrollTelling() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll revealing
        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
            observer.observe(el);
        });
        
        // Parallax scrolling
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Three.js 3D Objects
    initThreeJS() {
        if (!window.THREE) return;
        
        const container = document.querySelector('.hero-visual');
        if (!container) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(300, 300);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        
        // Create floating geometric shapes
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0x8B5FBF,
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        
        const shapes = [];
        for (let i = 0; i < 5; i++) {
            const shape = new THREE.Mesh(geometry, material.clone());
            shape.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            shape.scale.setScalar(Math.random() * 0.5 + 0.5);
            scene.add(shape);
            shapes.push(shape);
        }
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        camera.position.z = 5;
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            shapes.forEach((shape, index) => {
                shape.rotation.x += 0.01 * (index + 1);
                shape.rotation.y += 0.01 * (index + 1);
                shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            });
            
            renderer.render(scene, camera);
        };
        animate();
        
        // Resize handler
        window.addEventListener('resize', () => {
            const width = 300;
            const height = 300;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });
    }

    // Magnetic Effects
    initMagneticEffects() {
        const magneticElements = document.querySelectorAll('.magnetic, .glass-button, .contact-card');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 50;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const moveX = x * force * 0.3;
                    const moveY = y * force * 0.3;
                    
                    el.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
                }
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }

    // Performance Monitoring
    initPerformanceMonitoring() {
        // Monitor FPS
        let fps = 0;
        let lastTime = performance.now();
        
        const measureFPS = () => {
            const now = performance.now();
            fps = 1000 / (now - lastTime);
            lastTime = now;
            
            // Reduce effects if FPS is low
            if (fps < 30) {
                document.documentElement.style.setProperty('--animation-duration', '0.1s');
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        if (window.innerWidth > 768) {
            measureFPS();
        }
        
        // Monitor memory usage
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
                    console.warn('High memory usage detected');
                    // Disable heavy animations
                    document.documentElement.classList.add('low-performance');
                }
            }, 5000);
        }
    }

    // Lazy Loading for Heavy Features
    initLazyLoading() {
        const lazyFeatures = [
            { selector: '.three-js-container', load: () => this.initThreeJS() },
            { selector: '.particle-canvas', load: () => this.initParticleEffect() }
        ];
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const feature = lazyFeatures.find(f => 
                        entry.target.matches(f.selector)
                    );
                    if (feature) {
                        feature.load();
                        observer.unobserve(entry.target);
                    }
                }
            });
        });
        
        lazyFeatures.forEach(feature => {
            const elements = document.querySelectorAll(feature.selector);
            elements.forEach(el => observer.observe(el));
        });
    }

    // Display Animation
    initDisplayAnimation() {
        const displayScreen = document.querySelector('.display-screen');
        if (!displayScreen) return;

        // Add random glitch effects
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                displayScreen.style.filter = 'hue-rotate(90deg) saturate(1.5)';
                setTimeout(() => {
                    displayScreen.style.filter = 'none';
                }, 100);
            }
        }, 2000);

        // Add subtle screen flicker
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance
                displayScreen.style.opacity = '0.98';
                setTimeout(() => {
                    displayScreen.style.opacity = '1';
                }, 50);
            }
        }, 3000);

        // Hide all output lines initially
        const outputs = document.querySelectorAll('.code-line.output');
        outputs.forEach(output => {
            output.style.opacity = '0';
            output.style.display = 'none';
        });

        // Add typing effect to commands
        const commands = document.querySelectorAll('.command.typing');
        commands.forEach((command, index) => {
            const text = command.textContent;
            command.textContent = '';
            command.style.borderRight = '2px solid #A78BFA';
            
            setTimeout(() => {
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        command.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    } else {
                        // Убираем курсор и показываем output
                        setTimeout(() => {
                            command.style.borderRight = 'none';
                            
                            // Находим следующую output строку и показываем её
                            const parentLine = command.closest('.code-line');
                            let nextElement = parentLine.nextElementSibling;
                            
                            if (nextElement && nextElement.classList.contains('output')) {
                                nextElement.style.display = 'block';
                                setTimeout(() => {
                                    nextElement.style.opacity = '1';
                                }, 50);
                            }
                        }, 500);
                    }
                };
                typeWriter();
            }, index * 2000);
        });
    }
}

// Pulse animation for CTA buttons
class PulseAnimation {
    constructor() {
        this.buttons = document.querySelectorAll('.pulse-animation');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            setInterval(() => {
                button.classList.add('pulse');
                setTimeout(() => {
                    button.classList.remove('pulse');
                }, 1000);
            }, 3000);
        });
    }
}

// Theme Manager with persistence and graceful fallback
const ThemeManager = {
    storageKey: 'site-theme',
    metaTheme: null,
    getPreferred() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved === 'light' || saved === 'dark') return saved;
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        return prefersLight ? 'light' : 'dark';
    },
    apply(theme) {
        const body = document.body;
        body.classList.remove('theme-light', 'theme-dark');
        body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
        this.updateMeta(theme);
        this.updateToggleThumb(theme);
    },
    updateMeta(theme) {
        if (!this.metaTheme) {
            this.metaTheme = document.querySelector('meta[name="theme-color"]');
        }
        if (this.metaTheme) {
            const color = theme === 'light' ? '#E8D5C4' : '#0a0a0f';
            this.metaTheme.setAttribute('content', color);
        }
    },
    mountToggle() {
        const btn = document.querySelector('.theme-toggle');
        if (!btn) return;
        
        btn.setAttribute('aria-label', 'Переключить тему');
        btn.setAttribute('title', 'Переключить тему');
        btn.addEventListener('click', () => {
            const current = document.body.classList.contains('theme-light') ? 'light' : 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            localStorage.setItem(this.storageKey, next);
            this.apply(next);
        });
    },
    updateToggleThumb(theme) {
        const isLight = theme === 'light';
        const sun = document.querySelector('.theme-toggle__icon--sun');
        const moon = document.querySelector('.theme-toggle__icon--moon');
        if (sun && moon) {
            sun.style.opacity = isLight ? '1' : '0';
            moon.style.opacity = isLight ? '0' : '1';
        }
    },
    listenSystemChanges() {
        if (!window.matchMedia) return;
        const mql = window.matchMedia('(prefers-color-scheme: light)');
        const handler = (e) => {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) return; // respect explicit user choice
            this.apply(e.matches ? 'light' : 'dark');
        };
        if (typeof mql.addEventListener === 'function') {
            mql.addEventListener('change', handler);
        } else if (typeof mql.addListener === 'function') {
            mql.addListener(handler);
        }
    },
    init() {
        const theme = this.getPreferred();
        this.apply(theme);
        this.mountToggle();
        this.listenSystemChanges();
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Theme manager
    ThemeManager.init();
    // UI modules
    new MobilePortfolio();
    new PulseAnimation();
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('Page load time is slow, consider optimization');
        }
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Script error:', e.error);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MobilePortfolio, PulseAnimation };
}