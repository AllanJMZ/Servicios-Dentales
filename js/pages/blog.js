// @ts-check
import { BLOG_POSTS } from '../data/blog.js';

/**
 * Inicializa la lista de entradas de blog con filtros y modal de lectura.
 */
export function initBlogPage() {
    const searchInput = /** @type {HTMLInputElement | null} */ (
        document.getElementById('blog-search')
    );
    const categoriesContainer = document.getElementById('blog-categories');
    const postsContainer = document.getElementById('blog-posts');
    const modal = /** @type {HTMLDialogElement | null} */ (
        document.getElementById('blog-modal')
    );

    if (!postsContainer) return;

    let activeCategory = 'Todos';
    let searchTerm = '';

    const categories = ['Todos', ...new Set(BLOG_POSTS.map((post) => post.category))];

    const renderCategoryChips = () => {
        if (!categoriesContainer) return;
        categoriesContainer.innerHTML = '';

        categories.forEach((category) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = category === activeCategory ? 'filter-chip active' : 'filter-chip';
            btn.textContent = category;
            btn.setAttribute('aria-pressed', String(category === activeCategory));

            btn.addEventListener('click', () => {
                activeCategory = category;
                renderCategoryChips();
                renderPosts();
            });

            categoriesContainer.appendChild(btn);
        });
    };

    /**
     * @param {import('../data/blog.js').BlogPost} post
     */
    const openArticleModal = (post) => {
        if (!modal) return;

        const titleEl = modal.querySelector('#blog-modal-title');
        const metaEl = modal.querySelector('#blog-modal-meta');
        const imgEl = /** @type {HTMLImageElement | null} */ (
            modal.querySelector('#blog-modal-image')
        );
        const bodyEl = modal.querySelector('#blog-modal-body');

        if (titleEl) titleEl.textContent = post.title;
        if (metaEl) {
            metaEl.textContent = `${post.category} · Escrito el ${post.date} por ${post.author} · ${post.readTime}`;
        }
        if (imgEl) {
            imgEl.src = post.image;
            imgEl.alt = post.imageAlt;
        }
        if (bodyEl) {
            bodyEl.innerHTML = '';

            if (post.tips?.length) {
                const ul = document.createElement('ul');
                ul.className = 'blog-list';
                post.tips.forEach((tip) => {
                    const li = document.createElement('li');
                    const strong = document.createElement('strong');
                    strong.textContent = `${tip.label}: `;
                    li.appendChild(strong);
                    li.appendChild(document.createTextNode(tip.detail));
                    ul.appendChild(li);
                });
                bodyEl.appendChild(ul);
            }

            (post.paragraphs ?? []).forEach((paragraph) => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                bodyEl.appendChild(p);
            });
        }

        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }
    };

    const closeModal = () => {
        if (!modal) return;
        if (typeof modal.close === 'function') {
            modal.close();
        } else {
            modal.removeAttribute('open');
        }
    };

    modal?.querySelector('#blog-modal-close')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    const renderPosts = () => {
        const query = searchTerm.trim().toLowerCase();

        const filtered = BLOG_POSTS.filter((post) => {
            const matchesCategory =
                activeCategory === 'Todos' || post.category === activeCategory;
            const searchableText = [
                post.title,
                post.category,
                post.excerpt,
                ...(post.paragraphs ?? []),
                ...(post.tips?.map((tip) => `${tip.label} ${tip.detail}`) ?? [])
            ]
                .join(' ')
                .toLowerCase();

            return matchesCategory && (!query || searchableText.includes(query));
        });

        postsContainer.innerHTML = '';

        if (filtered.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <p>No encontramos artículos que coincidan con tu búsqueda.</p>
                <button type="button" class="btn btn-primary" id="reset-blog-filters">
                    Ver todos los artículos
                </button>
            `;
            postsContainer.appendChild(emptyState);
            document.getElementById('reset-blog-filters')?.addEventListener('click', () => {
                activeCategory = 'Todos';
                searchTerm = '';
                if (searchInput) searchInput.value = '';
                renderCategoryChips();
                renderPosts();
            });
            return;
        }

        filtered.forEach((post, index) => {
            const article = document.createElement('article');
            const isReversed = index % 2 === 1;
            article.className = isReversed
                ? 'entrada-blog-division segunda-entrada'
                : 'entrada-blog-division';

            const imageBlock = `
                <div class="imagen">
                    <img src="${post.image}" alt="${post.imageAlt}">
                </div>
            `;

            const tipsList = post.tips?.length
                ? `<ul class="blog-list">${post.tips
                      .slice(0, 4)
                      .map((tip) => `<li><strong>${tip.label}:</strong> ${tip.detail}</li>`)
                      .join('')}</ul>`
                : '';

            const paragraphsMarkup = !post.tips?.length
                ? (post.paragraphs ?? []).slice(0, 2).map((text) => `<p>${text}</p>`).join('')
                : `<p>${post.excerpt}</p>`;

            const textBlock = `
                <div class="texto-entrada">
                    <span class="category-badge">${post.category}</span>
                    <h2>${post.title}</h2>
                    <p class="blog-meta">
                        Escrito el: <span>${post.date}</span> por: <span>${post.author}</span> · ${post.readTime}
                    </p>
                    ${paragraphsMarkup}
                    ${tipsList}
                    <div class="blog-actions">
                        <button type="button" class="btn btn-primary blog-read-more" data-post-id="${post.id}">
                            Leer artículo completo
                        </button>
                    </div>
                </div>
            `;

            article.innerHTML = isReversed ? `${textBlock}${imageBlock}` : `${imageBlock}${textBlock}`;
            postsContainer.appendChild(article);

            article.querySelector('.blog-read-more')?.addEventListener('click', () => {
                openArticleModal(post);
            });
        });
    };

    searchInput?.addEventListener('input', (event) => {
        const target = /** @type {HTMLInputElement} */ (event.target);
        searchTerm = target.value;
        renderPosts();
    });

    renderCategoryChips();
    renderPosts();
}

