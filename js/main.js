// @ts-check
import { initLayout } from './components/layout.js';

document.addEventListener('DOMContentLoaded', async () => {
    const activePage = document.body.dataset.page || 'inicio';
    initLayout(activePage);

    switch (activePage) {
        case 'inicio': {
            const { initHomePage } = await import('./pages/home.js');
            initHomePage();
            break;
        }
        case 'servicios': {
            const { initServiciosPage } = await import('./pages/servicios.js');
            initServiciosPage();
            break;
        }
        case 'blog': {
            const { initBlogPage } = await import('./pages/blog.js');
            initBlogPage();
            break;
        }
        case 'contacto': {
            const { initContactoPage } = await import('./pages/contacto.js');
            initContactoPage();
            break;
        }
        default:
            break;
    }
});
