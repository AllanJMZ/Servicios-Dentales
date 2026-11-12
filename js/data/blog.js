// @ts-check

/**
 * @typedef {Object} BlogTip
 * @property {string} label
 * @property {string} detail
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} date
 * @property {string} author
 * @property {string} readTime
 * @property {string} image
 * @property {string} imageAlt
 * @property {string} excerpt
 * @property {BlogTip[]} [tips]
 * @property {string[]} [paragraphs]
 */

/** @type {BlogPost[]} */
export const BLOG_POSTS = [
    {
        id: 'cuidado-dental',
        title: 'Consejos para un mejor cuidado dental',
        category: 'Higiene',
        date: '20/04/23',
        author: 'Mauricio',
        readTime: '3 min de lectura',
        image: 'img/blog1.jpg',
        imageAlt: 'Consejos para un mejor cuidado dental',
        excerpt:
            'Hábitos diarios sencillos como el cepillado correcto, el uso de hilo dental y revisiones periódicas protegen tu salud bucal a largo plazo.',
        tips: [
            {
                label: 'Cepíllate los dientes dos veces al día',
                detail: 'Cepilla tus dientes al menos dos veces al día durante dos minutos cada vez.'
            },
            {
                label: 'Elige los productos adecuados',
                detail: 'Usa una pasta de dientes con flúor y un cepillo de cerdas suaves para evitar dañar las encías.'
            },
            {
                label: 'Usa hilo dental diariamente',
                detail: 'Elimina los restos de comida y la placa que se acumulan entre los dientes y debajo de la línea de las encías para prevenir caries y enfermedad periodontal.'
            },
            {
                label: 'Limita los alimentos y bebidas azucaradas',
                detail: 'Reducir el consumo de azúcares disminuye el riesgo de caries; prioriza frutas y verduras.'
            },
            {
                label: 'Visita al dentista regularmente',
                detail: 'Acude a revisión y limpieza al menos una vez al año para detectar problemas a tiempo.'
            },
            {
                label: 'Evita el tabaco',
                detail: 'Fumar incrementa el riesgo de enfermedad de las encías y cáncer oral.'
            }
        ],
        paragraphs: [
            'La prevención es la herramienta más efectiva y económica en odontología. Mantener una rutina constante reduce significativamente la aparición de caries, gingivitis y sensibilidad dental.',
            'Si notas sangrado al cepillarte o dolor persistente al masticar, agenda una valoración para atender el problema en sus etapas iniciales.'
        ]
    },
    {
        id: 'blanqueamiento-casero',
        title: 'Blanqueamiento casero ¿Realmente funciona?',
        category: 'Estética',
        date: '23/04/23',
        author: 'Mauricio',
        readTime: '3 min de lectura',
        image: 'img/blog2.jpg',
        imageAlt: 'Blanqueamiento dental casero',
        excerpt:
            'Analizamos qué tan efectivos y seguros son los remedios caseros frente a los tratamientos supervisados por un especialista.',
        paragraphs: [
            'El blanqueamiento dental casero puede ser efectivo en algunos casos, dependiendo de la causa de las manchas en los dientes y de la técnica utilizada. Sin embargo, los resultados pueden variar y algunos métodos pueden resultar perjudiciales si no se aplican correctamente.',
            'Algunos métodos caseros populares incluyen el uso de bicarbonato de sodio, carbón activado, fresas o limón. Estos tienen riesgos asociados: el bicarbonato y el carbón activado pueden resultar demasiado abrasivos, y el ácido frecuente de los cítricos puede desgastar el esmalte dental.',
            'Por ello, es recomendable consultar con un dentista antes de probar cualquier método de blanqueamiento y mantener una buena higiene diaria mediante el cepillado dos veces al día y el uso de hilo dental.'
        ]
    }
];

