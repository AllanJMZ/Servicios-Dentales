// @ts-check
import { SERVICES } from '../data/services.js';

const DRAFT_STORAGE_KEY = 'servicios-dentales:contact-draft';

/**
 * Inicializa el formulario de contacto con validación en tiempo real,
 * preselección de servicio desde URL y respaldo de borrador en localStorage.
 */
export function initContactoPage() {
    const form = /** @type {HTMLFormElement | null} */ (
        document.getElementById('contact-form')
    );
    const serviceSelect = /** @type {HTMLSelectElement | null} */ (
        document.getElementById('servicio')
    );
    const feedback = document.getElementById('form-feedback');
    const preselectedNotice = document.getElementById('preselected-service-note');

    if (!form) return;

    // Poblar selector de servicios desde la fuente única de datos
    if (serviceSelect) {
        SERVICES.forEach((service) => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = `${service.title} (${service.priceLabel})`;
            serviceSelect.appendChild(option);
        });
    }

    // Restaurar borrador si existe
    restoreDraft(form);

    // Si viene ?servicio=... desde Inicio o Servicios, preseleccionar el servicio
    const params = new URLSearchParams(window.location.search);
    const requestedServiceId = params.get('servicio');
    if (requestedServiceId && serviceSelect) {
        const matched = SERVICES.find((service) => service.id === requestedServiceId);
        if (matched) {
            serviceSelect.value = matched.id;
            if (preselectedNotice) {
                preselectedNotice.textContent = `Has seleccionado consultar sobre: ${matched.title} (${matched.priceLabel}).`;
                preselectedNotice.classList.add('visible');
            }
        }
    }

    const fieldIds = [
        'nombre',
        'apellido-paterno',
        'apellido-materno',
        'correo',
        'telefono',
        'servicio',
        'comentario'
    ];

    // Validación reactiva y guardado automático del borrador
    fieldIds.forEach((id) => {
        const field = /** @type {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null} */ (
            document.getElementById(id)
        );
        if (!field) return;

        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.getAttribute('aria-invalid') === 'true') {
                validateField(field);
            }
            saveDraft(form);
        });
        field.addEventListener('change', () => saveDraft(form));
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isFormValid = true;
        /** @type {HTMLElement | null} */
        let firstInvalid = null;

        fieldIds.forEach((id) => {
            const field = /** @type {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null} */ (
                document.getElementById(id)
            );
            if (!field) return;

            const valid = validateField(field);
            if (!valid) {
                isFormValid = false;
                if (!firstInvalid) firstInvalid = field;
            }
        });

        if (!isFormValid) {
            firstInvalid?.focus();
            return;
        }

        const nombre = getFieldValue('nombre');
        const correo = getFieldValue('correo');
        const selectedOption = serviceSelect?.selectedOptions?.[0]?.textContent ?? 'Consulta general';

        if (feedback) {
            feedback.innerHTML = '';

            const title = document.createElement('strong');
            title.textContent = `¡Gracias, ${nombre}! Tu solicitud fue registrada correctamente.`;

            const summary = document.createElement('p');
            summary.textContent = `Motivo: ${selectedOption}. Te responderemos pronto al correo ${correo}.`;

            feedback.appendChild(title);
            feedback.appendChild(summary);
            feedback.classList.add('visible');
        }

        clearDraft();
        form.reset();
        fieldIds.forEach((id) => clearFieldState(id));
        preselectedNotice?.classList.remove('visible');
    });
}

/**
 * @param {string} id
 * @returns {string}
 */
function getFieldValue(id) {
    const el = /** @type {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null} */ (
        document.getElementById(id)
    );
    return el ? el.value.trim() : '';
}

/**
 * @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} field
 * @returns {boolean}
 */
function validateField(field) {
    const value = field.value.trim();
    let errorMessage = '';

    switch (field.id) {
        case 'nombre':
        case 'apellido-paterno':
        case 'apellido-materno': {
            if (!value) {
                errorMessage = 'Este campo es obligatorio.';
            } else if (value.length < 2) {
                errorMessage = 'Debe contener al menos 2 caracteres.';
            } else if (/^\d+$/.test(value)) {
                errorMessage = 'Ingresa un texto válido sin solo números.';
            }
            break;
        }
        case 'correo': {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!value) {
                errorMessage = 'Ingresa tu correo electrónico.';
            } else if (!emailRegex.test(value)) {
                errorMessage = 'El formato del correo no parece válido (ej. nombre@correo.com).';
            }
            break;
        }
        case 'telefono': {
            const digitsOnly = value.replace(/\D/g, '');
            if (!value) {
                errorMessage = 'Ingresa un número de teléfono.';
            } else if (digitsOnly.length !== 10) {
                errorMessage = 'El teléfono debe tener exactamente 10 dígitos.';
            }
            break;
        }
        case 'comentario': {
            if (value && value.length < 10) {
                errorMessage = 'Si agregas un comentario, escribe al menos 10 caracteres.';
            }
            break;
        }
        default:
            break;
    }

    const errorEl = document.getElementById(`error-${field.id}`);
    if (errorMessage) {
        field.setAttribute('aria-invalid', 'true');
        field.classList.add('is-invalid');
        if (errorEl) errorEl.textContent = errorMessage;
        return false;
    }

    field.removeAttribute('aria-invalid');
    field.classList.remove('is-invalid');
    if (errorEl) errorEl.textContent = '';
    return true;
}

/**
 * @param {string} id
 */
function clearFieldState(id) {
    const field = document.getElementById(id);
    const errorEl = document.getElementById(`error-${id}`);
    field?.removeAttribute('aria-invalid');
    field?.classList.remove('is-invalid');
    if (errorEl) errorEl.textContent = '';
}

/**
 * @param {HTMLFormElement} form
 */
function saveDraft(form) {
    try {
        const formData = new FormData(form);
        /** @type {Record<string, string>} */
        const draft = {};
        formData.forEach((value, key) => {
            if (typeof value === 'string') {
                draft[key] = value;
            }
        });
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
        // Ignorar si localStorage no está disponible
    }
}

/**
 * @param {HTMLFormElement} form
 */
function restoreDraft(form) {
    try {
        const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (!raw) return;

        const draft = /** @type {Record<string, string>} */ (JSON.parse(raw));
        Object.entries(draft).forEach(([name, value]) => {
            const field = form.elements.namedItem(name);
            if (
                field instanceof HTMLInputElement ||
                field instanceof HTMLTextAreaElement ||
                field instanceof HTMLSelectElement
            ) {
                field.value = value;
            }
        });
    } catch {
        // Ignorar borradores corruptos
    }
}

function clearDraft() {
    try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
        // Ignorar si localStorage no está disponible
    }
}

