// Projects data with detailed information
const projectsData = [
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
        this.setupImageFallbacks();
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
                <img src="${project.image}" alt="${project.title}" loading="lazy" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                ${project.featured ? '<span class="featured-badge">⭐ Избранный</span>' : ''}
                ${project.status === 'in-progress' ? '<span class="status-badge">🚧 В разработке</span>' : ''}
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">${tagsHTML}</div>
                <div class="project-actions">
                    <button class="view-details" data-id="${project.id}">Подробнее</button>
                    ${project.liveUrl !== '#' ? `<a href="${project.liveUrl}" class="view-live" target="_blank" rel="noopener">Live Demo</a>` : ''}
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

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
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
        
        // Focus trap for accessibility
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    setupImageFallbacks() {
        // Add error handling for images
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
            }
        }, true);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();
});

// Handle responsive images
function handleImageResponsiveness() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading lazy for better performance
        if (!img.loading) {
            img.loading = 'lazy';
        }
    });
}

document.addEventListener('DOMContentLoaded', handleImageResponsiveness);