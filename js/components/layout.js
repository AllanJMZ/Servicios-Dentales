// @ts-check

/**
 * @typedef {Object} NavItem
 * @property {string} key
 * @property {string} label
 * @property {string} href
 */

/** @type {NavItem[]} */
const NAV_ITEMS = [
    { key: 'inicio', label: 'Inicio', href: 'index.html' },
    { key: 'nosotros', label: 'Nosotros', href: 'nosotros.html' },
    { key: 'servicios', label: 'Servicios', href: 'servicios.html' },
    { key: 'blog', label: 'Blog', href: 'blog.html' },
    { key: 'contacto', label: 'Contacto', href: 'contacto.html' }
];

/**
 * Renderiza el encabezado y pie de página compartidos en todas las vistas.
 * @param {string} activePage
 */
export function initLayout(activePage) {
    renderHeader(activePage);
    renderFooter();
}

/**
 * @param {string} activePage
 */
function renderHeader(activePage) {
    const header = document.getElementById('site-header');
    if (!header) return;

    const linksMarkup = NAV_ITEMS.map((item) => {
        const isActive = item.key === activePage;
        const activeClass = isActive ? ' class="active"' : '';
        const ariaCurrent = isActive ? ' aria-current="page"' : '';
        return `<li><a href="${item.href}"${activeClass}${ariaCurrent}>${item.label}</a></li>`;
    }).join('');

    header.innerHTML = `
        <div class="header-inner">
            <div class="logo">
                <a href="index.html">
                    <img src="img/logo1.2.jpg" alt="Logo Consultorio Dental">
                </a>
            </div>

            <button
                type="button"
                class="nav-toggle"
                aria-expanded="false"
                aria-controls="main-nav"
                aria-label="Abrir menú de navegación"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav id="main-nav" class="nav" aria-label="Navegación principal">
                <ul>${linksMarkup}</ul>
            </nav>
        </div>
    `;

    const toggleBtn = header.querySelector('.nav-toggle');
    const nav = header.querySelector('#main-nav');
    if (!toggleBtn || !nav) return;

    const closeMenu = () => {
        nav.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Abrir menú de navegación');
    };

    toggleBtn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
        toggleBtn.setAttribute(
            'aria-label',
            isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
        );
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('is-open')) {
            closeMenu();
        }
    });
}

function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const year = new Date().getFullYear();

    footer.innerHTML = `
        <section class="footer-icons-container">
            <div class="icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <span class="flaticon-001-facebook"></span>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <span class="flaticon-002-twitter"></span>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <span class="flaticon-011-instagram"></span>
                </a>
            </div>
            <p class="footer-copy">&copy; ${year} Consultorio Dental — Cuidando tu sonrisa</p>
        </section>
    `;
}

