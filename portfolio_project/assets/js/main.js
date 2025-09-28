// Enhanced animations and interactions
class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initCounterAnimation();
        this.initTypingAnimation();
        this.initMarqueeAnimation();
        this.initScrollAnimations();
        this.initFloatingEffects();
        this.initParticleEffect();
        this.initNavigation();
    }

    // Animated counters for statistics
    initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        if (!counters.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
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
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
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

        let animation;
        if (typeof gsap !== 'undefined') {
            animation = gsap.to('.marquee-track', {
                x: '-50%',
                duration: 20,
                repeat: -1,
                ease: 'linear'
            });
        } else {
            // Fallback CSS animation
            marquee.style.animation = 'marquee 20s linear infinite';
            clone.style.animation = 'marquee 20s linear infinite';
        }
    }

    // Scroll animations
    initScrollAnimations() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            gsap.utils.toArray('.aspiration-card, .project-card, .skills-category').forEach(element => {
                gsap.fromTo(element, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // Parallax effect for hero
            gsap.to('.hero', {
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        } else {
            // Fallback: simple intersection observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.aspiration-card, .project-card, .skills-category').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }

    // Floating elements animation
    initFloatingEffects() {
        // Floating cards
        const floatingCard = document.querySelector('.floating-card');
        if (floatingCard) {
            if (typeof gsap !== 'undefined') {
                gsap.to('.floating-card', {
                    y: -20,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut'
                });
            }
        }

        // Floating orbs
        const projectOrb = document.querySelector('.project-orb');
        if (projectOrb) {
            if (typeof gsap !== 'undefined') {
                gsap.to('.project-orb', {
                    rotation: 360,
                    duration: 20,
                    repeat: -1,
                    ease: 'none'
                });
            } else {
                projectOrb.style.animation = 'float 3s ease-in-out infinite';
            }
        }
    }

    // Particle background effect
    initParticleEffect() {
        const canvas = document.createElement('canvas');
        canvas.className = 'particle-canvas';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];

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
            
            requestAnimationFrame(animateParticles);
        };

        // Initialize
        resizeCanvas();
        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // Enhanced navigation with smooth scroll
    initNavigation() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.innerHTML = '☰';
        mobileMenuToggle.className = 'mobile-menu-toggle';
        
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(mobileMenuToggle);

            mobileMenuToggle.addEventListener('click', () => {
                const navList = document.querySelector('.neo-nav__list');
                if (navList) {
                    navList.classList.toggle('mobile-open');
                }
            });

            // Mobile menu styles
            const mobileStyles = `
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: block;
                        background: var(--color-glass);
                        backdrop-filter: var(--blur-intensity);
                        border: 1px solid var(--color-border);
                        color: var(--color-text);
                        padding: 0.5rem 1rem;
                        border-radius: var(--border-radius);
                        cursor: pointer;
                    }
                    
                    .neo-nav__list {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background: var(--color-bg);
                        backdrop-filter: blur(20px);
                        flex-direction: column;
                        padding: 1rem;
                    }
                    
                    .neo-nav__list.mobile-open {
                        display: flex;
                    }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = mobileStyles;
            document.head.appendChild(styleSheet);
        }
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

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
    new PulseAnimation();
});

// Utility functions
class PortfolioUtils {
    static formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static isMobile() {
        return window.innerWidth <= 768;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioAnimations, PortfolioUtils };
} else {
    window.PortfolioAnimations = PortfolioAnimations;
    window.PortfolioUtils = PortfolioUtils;
}