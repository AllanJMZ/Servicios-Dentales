// @ts-check

/**
 * @typedef {Object} DentalService
 * @property {string} id
 * @property {string} title
 * @property {'Preventiva' | 'Estética' | 'Rehabilitación' | 'Cirugía'} category
 * @property {string} description
 * @property {string} recoveryTime
 * @property {string} priceLabel
 * @property {string} recommendations
 * @property {string[]} [tips]
 * @property {string} image
 * @property {string} imageAlt
 * @property {boolean} [featuredOnHome]
 * @property {boolean} [isPrimary]
 */

/** @type {DentalService[]} */
export const SERVICES = [
    {
        id: 'limpieza',
        title: 'Limpieza dental y examen oral',
        category: 'Preventiva',
        description:
            'Este servicio incluye la limpieza de los dientes, eliminación de la placa y el sarro, y un examen completo de la boca para detectar cualquier problema dental o bucal.',
        recoveryTime: 'No requiere tiempo de recuperación; puedes retomar tus actividades diarias de inmediato.',
        priceLabel: '$499',
        recommendations: 'Programar limpiezas dentales regulares cada 6 a 12 meses.',
        image: 'img/Examen.png',
        imageAlt: 'Limpieza dental y examen oral',
        featuredOnHome: true
    },
    {
        id: 'caries',
        title: 'Tratamientos de caries',
        category: 'Preventiva',
        description:
            'Los tratamientos de caries pueden incluir la eliminación de la caries y la aplicación de una obturación dental (empaste).',
        recoveryTime: 'El tiempo de recuperación de un tratamiento de caries puede tomar de 5 a 10 días.',
        priceLabel: '$345',
        recommendations: 'Mantener una buena higiene dental y programar revisiones regulares.',
        image: 'img/caries.png',
        imageAlt: 'Tratamientos de caries',
        featuredOnHome: true
    },
    {
        id: 'protesis',
        title: 'Prótesis dentales',
        category: 'Rehabilitación',
        description:
            'Las prótesis dentales se utilizan para reemplazar uno o más dientes faltantes o dañados. Las dentaduras y las prótesis parciales son los tipos más comunes de prótesis dentales.',
        recoveryTime:
            'El tiempo de recuperación de una prótesis dental puede variar dependiendo del tipo de prótesis y del procedimiento utilizado para colocarla.',
        priceLabel: '$800 - $3,500',
        recommendations: 'Mantener higiene diaria de la prótesis y acudir a revisiones periódicas.',
        tips: [
            'Evaluación exhaustiva: Evaluamos la estructura dental, encías y mandíbula para asegurar que la prótesis sea cómoda y adecuada.',
            'Materiales de alta calidad: Utilizamos materiales duraderos que garantizan longevidad y funcionalidad.',
            'Ajustes necesarios: Realizamos los ajustes posteriores requeridos para lograr un calce cómodo.',
            'Buen cuidado oral: Recomendamos limpieza diaria de la prótesis y visitas periódicas de seguimiento.',
            'Tu satisfacción: Nuestro equipo está disponible para resolver cualquier pregunta o inquietud en todo momento.'
        ],
        image: 'img/protesis.png',
        imageAlt: 'Prótesis dentales',
        featuredOnHome: true,
        isPrimary: true
    },
    {
        id: 'blanqueamiento',
        title: 'Blanqueamiento',
        category: 'Estética',
        description: 'Procedimiento estético para mejorar el aspecto y tono natural de los dientes.',
        recoveryTime: '1 a 3 días de sensibilidad dental leve.',
        priceLabel: '$1,599',
        recommendations: 'Evitar alimentos y bebidas que manchan los dientes durante los primeros días.',
        image: 'img/bl.png',
        imageAlt: 'Blanqueamiento dental'
    },
    {
        id: 'endodoncia',
        title: 'Endodoncia',
        category: 'Rehabilitación',
        description: 'Procedimiento especializado para salvar un diente dañado o infectado.',
        recoveryTime: 'El tiempo de recuperación de una endodoncia puede tomar de 10 a 15 días.',
        priceLabel: '$1,299',
        recommendations: 'Evitar masticar con el diente tratado hasta la restauración definitiva y mantener buena higiene.',
        image: 'img/end.png',
        imageAlt: 'Tratamiento de endodoncia'
    },
    {
        id: 'extracciones',
        title: 'Extracciones',
        category: 'Cirugía',
        description: 'Procedimiento seguro para extraer un diente dañado o problemático.',
        recoveryTime: 'El tiempo de recuperación de una extracción puede tomar de 10 a 15 días.',
        priceLabel: '$449',
        recommendations: 'Evitar masticar en el área afectada y seguir las indicaciones postoperatorias del dentista.',
        image: 'img/ext.png',
        imageAlt: 'Extracciones dentales'
    },
    {
        id: 'ortodoncia',
        title: 'Ortodoncia',
        category: 'Estética',
        description: 'Procedimiento para corregir problemas de alineación dental y mordida.',
        recoveryTime: 'El tratamiento completo puede tomar de varios meses a años según cada caso.',
        priceLabel: '$999 - $9,999',
        recommendations: 'Usar correctamente los dispositivos de ortodoncia y mantener una higiene dental rigurosa.',
        image: 'img/or.png',
        imageAlt: 'Ortodoncia'
    }
];

/**
 * Obtiene la lista de categorías disponibles en el catálogo.
 * @returns {string[]}
 */
export function getServiceCategories() {
    const categories = new Set(SERVICES.map((service) => service.category));
    return ['Todos', ...categories];
}

