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
    }
    /**
     * Метод initCubeBgAnimation — отвечает за создание и анимацию фоновой ленты кубиков на главном экране.
     * Использует библиотеку GSAP для сложных 3D-анимаций.
     * 1. Проверяет наличие GSAP и нужного DOM-элемента.
     * 2. Генерирует несколько кубиков, каждый с уникальными параметрами цвета и вращения.
     * 3. Для каждого кубика запускает бесконечную анимацию вращения и смены цвета граней.
     * 4. Анимирует всю ленту кубиков: покачивание, масштаб, плавное появление.
     * 5. Автоматически подстраивает масштаб под размер окна браузера.
     */
    initCubeBgAnimation() {
        // Проверяем, что библиотека GSAP загружена и есть элемент для анимации
        if (!window.gsap || !document.querySelector('.pov')) return;
        // Количество кубиков в ленте
        const n = 19;
        // Массив параметров для каждой грани кубика: угол поворота и прозрачность
        const rots = [
            { ry: 270, a:0.5 }, // левая грань
            { ry: 0,   a:0.85 }, // передняя грань
            { ry: 90,  a:0.4 }, // правая грань
            { ry: 180, a:0.0 }  // задняя грань
        ];

        // Устанавливаем стили для граней кубика (3D-эффект)
        gsap.set('.face', {
            z: 200, // отдаление по оси Z
            rotateY: i => rots[i].ry, // угол поворота для каждой грани
            transformOrigin: '50% 50% -201px' // точка трансформации для 3D
        });

        // Генерируем и анимируем каждый кубик
        for (let i=0; i<n; i++){
            let die = document.querySelector('.die'); // исходный кубик
            let cube = die.querySelector('.cube');
            // Клонируем кубик, если это не первый (создаём "ленту" кубиков)
            if (i>0){    
                let clone = die.cloneNode(true);
                document.querySelector('.tray').append(clone);
                cube = clone.querySelector('.cube');
            }
            // Анимация вращения кубика и плавной смены цвета граней
            gsap.timeline({repeat:-1, yoyo:true, defaults:{ease:'power3.inOut', duration:1}})
            // Вращение кубика по оси Y (создаёт эффект движения надписей)
            .fromTo(cube, {
                rotateY:-90
            },{
                rotateY:90,
                ease:'power1.inOut',
                duration:7 // медленно, чтобы надписи были читаемы
            })
            // Плавная смена цвета граней (начальный -> промежуточный)
            .fromTo(cube.querySelectorAll('.face'), {
                color:(j)=>'hsl('+(i/n*75+240)+', 45%,'+(55*[rots[3].a, rots[0].a, rots[1].a][j])+'%)'
            },{
                color:(j)=>'hsl('+(i/n*75+240)+', 40%,'+(45*[rots[0].a, rots[1].a, rots[2].a][j])+'%)'
            }, 0)
            // Плавная смена цвета граней (промежуточный -> конечный)
            .to(cube.querySelectorAll('.face'), {
                color:(j)=>'hsl('+(i/n*75+240)+', 35%,'+(35*[rots[1].a, rots[2].a, rots[3].a][j])+'%)'
            }, 1)
            // Смещение прогресса анимации для эффекта волны
            .progress(i/n);
        }

        // Анимация всей ленты кубиков: покачивание, вращение, масштаб
        gsap.timeline()
            // Вертикальное покачивание всей ленты
            .from('.tray', {yPercent:-3, duration:2, ease:'power1.inOut', yoyo:true, repeat:-1}, 0)
            // Горизонтальное покачивание всей ленты (уменьшен угол)
            .fromTo('.tray', {rotate:-5},{rotate:5, duration:4, ease:'power1.inOut', yoyo:true, repeat:-1}, 0)
            // Плавное появление кубиков
            .from('.die', {duration:0.01, opacity:0, stagger:{each:-0.05, ease:'power1.in'}}, 0)
            // Пульсация масштаба всей ленты (уменьшена)
            .to('.tray', {scale:1.05, duration:2, ease:'power3.inOut', yoyo:true, repeat:-1}, 0);

        // Масштабирование анимации под размер окна браузера
        window.addEventListener('resize', setCubeBgScale);
        setCubeBgScale();
        // Функция для установки масштаба и высоты ленты кубиков
        function setCubeBgScale() {
            const h = n*12; // высота ленты зависит от количества кубиков
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
            navList.classList.toggle('mobile-open');
            toggle.textContent = this.isMobileMenuOpen ? '✕' : '☰';
            toggle.setAttribute('aria-label', this.isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
        }
    }

    closeMobileMenu() {
        const navList = document.querySelector('.neo-nav__list');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (navList && toggle) {
            this.isMobileMenuOpen = false;
            navList.classList.remove('mobile-open');
            toggle.textContent = '☰';
            toggle.setAttribute('aria-label', 'Открыть меню');
            document.body.style.overflow = '';
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
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
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
        
        // Initialize particle effect
        this.initParticleEffect();
    }

    handleResize() {
        // Update any layout-specific calculations
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    preloadCriticalImages() {
        // Preload hero images or critical above-the-fold images
        const criticalImages = [
            // Add paths to critical images here
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Particle background effect
    initParticleEffect() {
        const canvas = document.createElement('canvas');
        canvas.className = 'particle-canvas';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.color = `rgba(${139 + Math.floor(Math.random() * 50)}, ${95 + Math.floor(Math.random() * 50)}, ${191 + Math.floor(Math.random() * 50)}, ${Math.random() * 0.3 + 0.1})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.reset();
                if (this.y < 0 || this.y > canvas.height) this.reset();
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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