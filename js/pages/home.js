// @ts-check
import { SERVICES } from '../data/services.js';

/**
 * Inicializa la sección de servicios destacados en la página de inicio.
 */
export function initHomePage() {
    const grid = document.getElementById('home-services-grid');
    if (!grid) return;

    const featured = SERVICES.filter((service) => service.featuredOnHome);
    grid.innerHTML = '';

    featured.forEach((service) => {
        const article = document.createElement('article');
        article.className = 'home-about';

        article.innerHTML = `
            <div class="home-about-media">
                <img src="${service.image}" alt="${service.imageAlt}">
            </div>
            <span class="category-badge">${service.category}</span>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <h3>Tiempo de recuperación</h3>
            <p>${service.recoveryTime}</p>
            <h3>Costo</h3>
            <div class="home-about-footer">
                <p class="price-tag">${service.priceLabel}</p>
                <a href="contacto.html?servicio=${encodeURIComponent(service.id)}" class="card-cta-link">
                    Agendar &rarr;
                </a>
            </div>
        `;

        grid.appendChild(article);
    });
}

