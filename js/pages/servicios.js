// @ts-check
import { SERVICES, getServiceCategories } from '../data/services.js';

/**
 * Inicializa el catálogo interactivo de servicios (búsqueda + filtro por categoría).
 */
export function initServiciosPage() {
    const searchInput = /** @type {HTMLInputElement | null} */ (
        document.getElementById('services-search')
    );
    const categoriesContainer = document.getElementById('services-categories');
    const resultsCount = document.getElementById('services-count');
    const catalogRoot = document.getElementById('services-catalog');

    if (!categoriesContainer || !catalogRoot) return;

    let activeCategory = 'Todos';
    let searchTerm = '';

    const categories = getServiceCategories();

    const renderCategoryButtons = () => {
        categoriesContainer.innerHTML = '';
        categories.forEach((category) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = category === activeCategory ? 'filter-chip active' : 'filter-chip';
            btn.textContent = category;
            btn.setAttribute('aria-pressed', String(category === activeCategory));

            btn.addEventListener('click', () => {
                activeCategory = category;
                renderCategoryButtons();
                renderCatalog();
            });

            categoriesContainer.appendChild(btn);
        });
    };

    const renderCatalog = () => {
        const normalizedQuery = searchTerm.trim().toLowerCase();

        const filtered = SERVICES.filter((service) => {
            const matchesCategory =
                activeCategory === 'Todos' || service.category === activeCategory;
            const matchesQuery =
                !normalizedQuery ||
                service.title.toLowerCase().includes(normalizedQuery) ||
                service.description.toLowerCase().includes(normalizedQuery) ||
                service.category.toLowerCase().includes(normalizedQuery);
            return matchesCategory && matchesQuery;
        });

        if (resultsCount) {
            resultsCount.textContent =
                filtered.length === 1
                    ? 'Mostrando 1 tratamiento'
                    : `Mostrando ${filtered.length} tratamientos`;
        }

        catalogRoot.innerHTML = '';

        if (filtered.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <p>No encontramos tratamientos que coincidan con tu búsqueda.</p>
                <button type="button" class="btn btn-primary" id="reset-services-filters">
                    Mostrar todos los servicios
                </button>
            `;
            catalogRoot.appendChild(emptyState);

            const resetBtn = document.getElementById('reset-services-filters');
            resetBtn?.addEventListener('click', () => {
                activeCategory = 'Todos';
                searchTerm = '';
                if (searchInput) searchInput.value = '';
                renderCategoryButtons();
                renderCatalog();
            });
            return;
        }

        const isDefaultView = activeCategory === 'Todos' && !normalizedQuery;
        const primaryService = isDefaultView
            ? filtered.find((service) => service.isPrimary)
            : undefined;
        const secondaryServices = primaryService
            ? filtered.filter((service) => service.id !== primaryService.id)
            : filtered;

        const gridSection = document.createElement('div');
        gridSection.className = primaryService ? 'home-grid' : 'home-grid home-grid--full';

        if (primaryService) {
            const featuredArticle = createPrimaryServiceCard(primaryService);
            gridSection.appendChild(featuredArticle);
        }

        const cardsWrapper = document.createElement('div');
        cardsWrapper.className = 'servicios';

        secondaryServices.forEach((service) => {
            cardsWrapper.appendChild(createServiceCard(service));
        });

        gridSection.appendChild(cardsWrapper);
        catalogRoot.appendChild(gridSection);
    };

    searchInput?.addEventListener('input', (event) => {
        const target = /** @type {HTMLInputElement} */ (event.target);
        searchTerm = target.value;
        renderCatalog();
    });

    renderCategoryButtons();
    renderCatalog();
}

/**
 * @param {import('../data/services.js').DentalService} service
 * @returns {HTMLElement}
 */
function createPrimaryServiceCard(service) {
    const article = document.createElement('article');
    article.className = 'servicio-principal';

    const tipsMarkup = (service.tips ?? [])
        .map((tip) => {
            const [title, ...rest] = tip.split(':');
            const detail = rest.join(':').trim();
            return `<li><strong>${title}:</strong> ${detail}</li>`;
        })
        .join('');

    article.innerHTML = `
        <img src="${service.image}" alt="${service.imageAlt}">
        <span class="category-badge">${service.category}</span>
        <h3>${service.title}</h3>
        <p>${service.description}</p>

        <h3>Tiempo de recuperación</h3>
        <p>${service.recoveryTime}</p>

        <h3>Costo</h3>
        <p class="service-price">${service.priceLabel}</p>

        <h3>Recomendaciones Generales</h3>
        ${tipsMarkup ? `<ul class="service-tips">${tipsMarkup}</ul>` : `<p>${service.recommendations}</p>`}

        <div class="service-card-actions">
            <a href="contacto.html?servicio=${encodeURIComponent(service.id)}" class="btn btn-primary service-cta-btn">
                Agendar consulta
            </a>
        </div>
    `;

    return article;
}

/**
 * @param {import('../data/services.js').DentalService} service
 * @returns {HTMLElement}
 */
function createServiceCard(service) {
    const article = document.createElement('article');
    article.className = 'home-service';

    article.innerHTML = `
        <div class="service-logo">
            <img src="${service.image}" alt="${service.imageAlt}">
            <span class="category-badge">${service.category}</span>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>

        <div class="service-info">
            <h3>Tiempo de recuperación</h3>
            <p>${service.recoveryTime}</p>
            <h3>Costo</h3>
            <p class="service-price">${service.priceLabel}</p>
            <h3>Recomendaciones Generales</h3>
            <p>${service.recommendations}</p>
            <div class="service-card-actions">
                <a href="contacto.html?servicio=${encodeURIComponent(service.id)}" class="btn btn-primary service-cta-btn">
                    Agendar consulta
                </a>
            </div>
        </div>
    `;

    return article;
}

