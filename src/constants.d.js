// Rutas que todos pueden ver
export const PUBLIC_ROUTES = [
  { link: '/', label: 'Inicio' },
  { link: '/projects', label: 'Proyectos' },
  { link: '/invests', label: 'Favoritos' },
];

// Rutas para usuarios no autenticados (login y registro)
export const AUTH_ROUTES = [
  { link: '/auth/login', label: 'Iniciar sesión' },
  { link: '/auth/register', label: 'Registrarme' },
];

export const PROJECTS = [
  {
    id: 'quantum-neural-lab',
    title: 'Quantum Neural Lab',
    category: 'Tecnología',
    lastHours: 48,
    shortDescription:
      'Desarrollo de procesadores orgánicos inspirados en el cerebro humano.',
    description:
      'Quantum Neural Lab desarrolla procesadores orgánicos inspirados en redes neuronales biológicas para acelerar tareas de inteligencia artificial con menor consumo energético. La ronda financiará prototipos funcionales, validación de laboratorio y acuerdos piloto con centros de investigación.',
    goal: 900000,
    collected: 528000,
    deadline: '2026-08-14',
    creator: 'Dra. Valentina Cruz',
    rewards: [
      'Acceso anticipado al reporte técnico trimestral.',
      'Invitación a una demo privada del prototipo.',
    ],
    image: '/src/assets/q-neural-lab.webp',
    featured: true,
  },
  {
    id: 'verde-vertical-madrid',
    title: 'Verde Vertical Madrid',
    category: 'Sostenibilidad',
    lastHours: 24,
    shortDescription:
      'Transformación de edificios industriales en pulmones urbanos sostenibles.',
    description:
      'Verde Vertical Madrid reconvierte fachadas industriales en jardines verticales de alta eficiencia hídrica. El proyecto combina sensores ambientales, especies nativas y mantenimiento predictivo para mejorar la calidad del aire en zonas urbanas densas.',
    goal: 2000000,
    collected: 1700000,
    deadline: '2026-07-15',
    creator: 'EcoDistrito Studio',
    rewards: [
      'Certificado digital de impacto ambiental.',
      'Visita guiada al primer edificio intervenido.',
    ],
    image: '/src/assets/verde-vertical-madrid.jpg',
    featured: true,
  },
  {
    id: 'aero-drone-delivery',
    title: 'Aero-Drone Delivery',
    category: 'Tecnología',
    lastHours: 12,
    shortDescription:
      'Logística aérea autónoma para suministros médicos de emergencia.',
    description:
      'Aero-Drone Delivery construye una red de drones autónomos para transportar insumos médicos críticos en corredores urbanos y rurales. La financiación permitirá ampliar la flota de prueba, certificar rutas y fortalecer el sistema de despacho.',
    goal: 500000,
    collected: 475000,
    deadline: '2026-06-28',
    creator: 'Matías Romero',
    rewards: [
      'Mención en el panel de fundadores.',
      'Acceso a métricas de vuelos piloto.',
    ],
    image: '/src/assets/aero-drone-delivery.webp',
    featured: true,
  },
  {
    id: 'galeria-inmersiva-neo',
    title: 'Galería Inmersiva NEO',
    category: 'Arte',
    lastHours: 0,
    shortDescription:
      'Plataforma de exposición para artistas digitales que fusiona realidad aumentada con espacios físicos minimalistas.',
    description:
      'Galería Inmersiva NEO conecta artistas digitales con salas físicas mediante experiencias de realidad aumentada. La plataforma busca producir muestras itinerantes, licenciar obras y ofrecer herramientas de curaduría para espacios culturales.',
    goal: 80000,
    collected: 89500,
    deadline: '2026-05-30',
    creator: 'Colectivo NEO',
    rewards: [
      'Pase para la muestra inaugural.',
      'Print digital certificado de una obra seleccionada.',
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWb9huKp3aw3i_PgVqdsoWH7OnGd25a0wcHBQacD5aQTj9cOTpSEPGdkbd-YfimN2PcBzazHaXrPlhro-UVS97WiM1kyFVQekT1rz0M_8p88utRwHGdh6SyHnBnlh44tw-jCJIkSBPGB8HTsZZm1gTIeCnnyGUsClNkA2SJSgjZWK4FmumQ01lXenTAZ0abcRZp6iM-5wGGFB-gstwJpJ1v9HaJOJ98YULS9Mqbv0tHqy7qIQ8ln2FHmPsJS8TyCFmK9876nVLxQ',
    featured: false,
  },
  {
    id: 'sentinel-ai-sec',
    title: 'Sentinel AI Sec',
    category: 'Tecnología',
    lastHours: 504, // 21 días
    shortDescription:
      'Seguridad proactiva basada en IA para la protección de activos digitales en entornos de finanzas descentralizadas.',
    description:
      'Sentinel AI Sec monitorea transacciones y contratos inteligentes para detectar amenazas antes de que afecten fondos de usuarios. La inversión cubrirá auditorías externas, infraestructura de análisis y expansión comercial en fintechs regionales.',
    goal: 500000,
    collected: 340000,
    deadline: '2026-07-06',
    creator: 'Lucía Barrenechea',
    rewards: [
      'Acceso beta al dashboard de monitoreo.',
      'Sesión de revisión de seguridad para inversores.',
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUVOizVUkEPvjmoGLFGwWUsG0QYb8k9C_pxdPnDrhMBcP9tKk3MhCQn2yNMPtJ1EG0b_QFW0l7ctsSlJQA63G8ryb5T0V3JTm19jQvup5q8-Fpm_CUxtugaQ_ibNPmHSezr29ij6jcD-za9YDF6tnYLEaS90dDcfXY_jmbOcsUBwcuYguuqtxipQczJDAE6uNkh5MeJ_W5b8GWHZmSQvMHjbJ89P_FTaMKUai-4NCbQcm6I7Pr8ruwBWjBg4MMXkV5bQ9-rJPE2A',
    featured: false,
  },
  {
    id: 'agua-pura-descentralizada',
    title: 'Agua Pura Descentralizada',
    category: 'Impacto',
    lastHours: 1080, // 45 días
    shortDescription:
      'Sistemas de purificación de agua compactos operados por energía cinética para comunidades rurales aisladas.',
    description:
      'Agua Pura Descentralizada instala unidades de purificación compactas que funcionan con energía cinética y mantenimiento local. El objetivo es desplegar pilotos en comunidades aisladas y medir reducción de enfermedades asociadas al agua.',
    goal: 57000,
    collected: 12500,
    deadline: '2026-07-30',
    creator: 'Fundación Río Claro',
    rewards: [
      'Reporte de impacto por comunidad beneficiada.',
      'Nombre del aportante en una unidad piloto.',
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAnWwJpv95ZICKjEhZrvWOaQG2aC1Cfu0m8ZKn1BG0Z7iP468WesxCNyhkJJn2x9xd2H-nbwIflMwkF_MFzZI9eeTBuj38_CvNi_hLyIfagSvhAOflFd-rWiadkVpojLurZySbyiJhMAKt8e0R-600CMazm4KX8dDm1vLPiYpbE0jfbAN8HBMGZHnzabkgag8Bl5zwzy_j9EC4PoW8iRG7q0cmOZcYVt2vuyUd4fAJNors6Vm-XNWzubkh5VlgqU6BZ5LGnWm459A',
    featured: false,
  },
  {
    id: 'mobiliario-circular-pro',
    title: 'Mobiliario Circular Pro',
    category: 'Sostenibilidad',
    lastHours: 48, // 2 días
    shortDescription:
      'Producción de mobiliario de oficina ergonómico fabricado íntegramente con plásticos recuperados del océano.',
    description:
      'Mobiliario Circular Pro fabrica escritorios, sillas y paneles acústicos con plásticos recuperados del océano. La campaña financiará moldes industriales, acuerdos con recolectores y certificación de trazabilidad del material.',
    goal: 81000,
    collected: 74000,
    deadline: '2026-08-01',
    creator: 'Circular Works',
    rewards: [
      'Descuento preferencial en la primera línea comercial.',
      'Placa de reconocimiento en el showroom.',
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIBQruC2E95rMVo-lzsQIu_jlHVANqt_yOs9-ZTR_PH1uv3b5mi8yea9tN32D9DrEr6PLpWzA4FinZMRfJgtIKcE70kBbCCTuKvBA_-4VmT1buQQmQVedfBT8JoAgQMAT2XG3JOVCXGB5ju9VwgsI8XkqP77YPisKMTlyU-1IgTbtoatK9JoeHYn9mQeqohBuHR7Pw6qQKmlS8kNdk7BTQYjd6KU_zEAkra2rXXe4c9OsFkZMYVEPdpNy4XN5aq4kMZ8gLIHQuJg',
    featured: false,
  },
];
