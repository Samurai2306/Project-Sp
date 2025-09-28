const projectsData = [
    {
        id: 1,
        title: "Образовательная LMS платформа",
        description: "Полнофункциональная система управления обучением с видео-стримингом, тестированием и аналитикой успеваемости. Реализована система реального времени для интерактивных занятий.",
        fullDescription: "Это масштабный проект образовательной платформы, который включает в себя все современные функции для дистанционного обучения. Система поддерживает потоковую передачу видео, интерактивные тесты, домашние задания и подробную аналитику для преподавателей. Особенность проекта - модульная архитектура, позволяющая легко расширять функциональность.",
        technologies: ["React", "Node.js", "MongoDB", "WebRTC", "Redis", "Docker"],
        category: "fullstack",
        image: "assets/images/project1.jpg",
        liveUrl: "https://education-platform.demo.com",
        githubUrl: "https://github.com/Sabitoshi/education-platform",
        featured: true,
        status: "completed"
    },
    {
        id: 2,
        title: "Десктопный клиент для управления проектами",
        description: "Кроссплатформенное приложение для управления задачами с оффлайн-режимом и синхронизацией в облаке. Интуитивный интерфейс и высокая производительность.",
        fullDescription: "Десктопное приложение, разработанное с использованием Electron и React. Поддерживает все основные функции управления проектами: канбан-доски, временные линии, уведомления. Особенность - умная синхронизация, позволяющая работать оффлайн с последующей синхронизацией при появлении интернета.",
        technologies: ["Electron", "React", "SQLite", "WebSocket", "IndexedDB"],
        category: "desktop",
        image: "assets/images/project2.jpg",
        liveUrl: "#",
        githubUrl: "https://github.com/Sabitoshi/task-manager-desktop",
        featured: true,
        status: "completed"
    },
    {
        id: 3,
        title: "E-commerce платформа",
        description: "Многофункциональный интернет-магазин с системой рекомендаций, интеграцией платежей и админ-панелью для управления контентом.",
        fullDescription: "Современная e-commerce платформа с акцентом на пользовательский опыт. Включает умную систему рекомендаций на основе машинного обучения, несколько вариантов оплаты, систему отзывов и рейтингов. Админ-панель позволяет полностью управлять каталогом, заказами и клиентами.",
        technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "Algolia"],
        category: "web",
        image: "assets/images/project3.jpg",
        liveUrl: "https://store.demo.com",
        githubUrl: "https://github.com/Sabitoshi/ecommerce-platform",
        featured: false,
        status: "completed"
    },
    {
        id: 4,
        title: "Система мониторинга серверов",
        description: "Веб-приложение для мониторинга состояния серверов и IT-инфраструктуры с оповещениями и аналитикой в реальном времени.",
        fullDescription: "Комплексная система мониторинга, позволяющая отслеживать состояние серверов, сетевого оборудования и приложений. Включает дашборды с графиками, систему оповещений через различные каналы (Email, Telegram, Slack) и историю инцидентов.",
        technologies: ["React", "Python", "FastAPI", "PostgreSQL", "WebSocket"],
        category: "fullstack",
        image: "assets/images/project4.jpg",
        liveUrl: "https://monitoring.demo.com",
        githubUrl: "https://github.com/Sabitoshi/server-monitoring",
        featured: false,
        status: "in-progress"
    },
    {
        id: 5,
        title: "Мобильное приложение для фитнеса",
        description: "React Native приложение с трекингом тренировок, питанием и прогрессом. Интеграция с wearable устройствами.",
        fullDescription: "Кроссплатформенное мобильное приложение для ведения здорового образа жизни. Включает планировщик тренировок, трекинг питания, мониторинг прогресса и социальные функции. Интегрируется с популярными фитнес-трекерами и умными часами.",
        technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Apple HealthKit"],
        category: "web",
        image: "assets/images/project5.jpg",
        liveUrl: "#",
        githubUrl: "https://github.com/Sabitoshi/fitness-app",
        featured: false,
        status: "completed"
    },
    {
        id: 6,
        title: "API для социальной сети разработчиков",
        description: "Масштабируемый backend для социальной платформы с реальным временем, уведомлениями и системой репутации.",
        fullDescription: "Высоконагруженный backend для социальной сети, ориентированной на разработчиков. Включает систему постов, комментариев, лайков, подписок, личных сообщений и уведомлений в реальном времени. Реализована система репутации на основе активности пользователей.",
        technologies: ["Node.js", "GraphQL", "PostgreSQL", "Redis", "WebSocket"],
        category: "web",
        image: "assets/images/project6.jpg",
        liveUrl: "https://api.dev-community.com",
        githubUrl: "https://github.com/Sabitoshi/dev-social-api",
        featured: false,
        status: "completed"
    }
];

// Projects management class
class ProjectsManager {
    constructor() {
        this.projects = projectsData;
        this.filteredProjects = [...this.projects];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderProjects();
        this.initFilters();
        this.initModal();
    }

    renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        this.filteredProjects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            grid.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = `project-card glass-card ${project.category} ${project.featured ? 'featured' : ''}`;
        
        const tagsHTML = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                ${project.featured ? '<span class="featured-badge">⭐ Избранный</span>' : ''}
                ${project.status === 'in-progress' ? '<span class="status-badge">🚧 В разработке</span>' : ''}
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">${tagsHTML}</div>
                <div class="project-actions">
                    <button class="view-details" data-id="${project.id}">Подробнее</button>
                    ${project.liveUrl !== '#' ? `<a href="${project.liveUrl}" class="view-live" target="_blank">Live Demo</a>` : ''}
                </div>
            </div>
        `;

        return card;
    }

    initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (!filterBtns.length) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                const filter = btn.dataset.filter;
                this.currentFilter = filter;
                
                if (filter === 'all') {
                    this.filteredProjects = [...this.projects];
                } else {
                    this.filteredProjects = this.projects.filter(project => 
                        project.category === filter
                    );
                }
                
                this.renderProjects();
            });
        });
    }

    initModal() {
        const modal = document.getElementById('projectModal');
        const closeBtn = document.querySelector('.close-modal');
        
        if (!modal || !closeBtn) return;

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // View details buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-details')) {
                const projectId = parseInt(e.target.dataset.id);
                this.openProjectModal(projectId);
            }
        });
    }

    openProjectModal(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        const modal = document.getElementById('projectModal');
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalTech = document.getElementById('modalTech');
        const modalLive = document.getElementById('modalLive');
        const modalGitHub = document.getElementById('modalGitHub');

        if (!modal || !modalImg || !modalTitle || !modalDescription || !modalTech || !modalLive || !modalGitHub) return;

        // Set modal content
        modalImg.src = project.image;
        modalImg.alt = project.title;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.fullDescription;

        // Technologies
        modalTech.innerHTML = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        // Links
        modalLive.href = project.liveUrl;
        modalGitHub.href = project.githubUrl;

        if (project.liveUrl === '#') {
            modalLive.style.display = 'none';
        } else {
            modalLive.style.display = 'inline-block';
        }

        // Show modal
        modal.style.display = 'block';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();
});