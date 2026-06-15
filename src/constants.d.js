// Rutas que todos pueden ver
export const PUBLIC_ROUTES = [
  { link: '/', label: 'Inicio' },
  { link: '/projects', label: 'Proyectos' },
  { link: '/invests', label: 'Inversiones' },
  { link: '/project-detail', label: 'Inversiones' },
];

// Rutas para usuarios no autenticados (login y registro)
export const AUTH_ROUTES = [
  { link: '/auth/login', label: 'Iniciar sesión' },
  { link: '/auth/register', label: 'Registrarme' },
];

export const PROJECTS = [
  {
    title: 'Quantum Neural Lab',
    category: 'Tecnología',
    lastHours: 48,
    shortDescription:
      'Desarrollo de procesadores orgánicos inspirados en el cerebro humano.',
    goal: 900000,
    link: '#',
    collected: 528000,
    image: './src/assets/q-neural-lab.webp',
    featured: true,
  },
  {
    title: 'Verde Vertical Madrid',
    category: 'Sostenibilidad',
    lastHours: 24,
    shortDescription:
      'Transformación de edificios industriales en pulmones urbanos sostenibles.',
    goal: 2000000,
    link: '#',
    collected: 1700000,
    image: './src/assets/verde-vertical-madrid.jpg',
    featured: true,
  },
  {
    title: 'Aero-Drone Delivery',
    category: 'Tecnología',
    lastHours: 12,
    shortDescription:
      'Logística aérea autónoma para suministros médicos de emergencia.',
    goal: 500000,
    link: '#',
    collected: 475000,
    image: './src/assets/aero-drone-delivery.webp',
    featured: true,
  },
  {
    title: 'Galería Inmersiva NEO',
    category: 'Arte',
    lastHours: 0,
    shortDescription:
      'Plataforma de exposición para artistas digitales que fusiona realidad aumentada con espacios físicos minimalistas.',
    goal: 80000,
    collected: 89500,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWb9huKp3aw3i_PgVqdsoWH7OnGd25a0wcHBQacD5aQTj9cOTpSEPGdkbd-YfimN2PcBzazHaXrPlhro-UVS97WiM1kyFVQekT1rz0M_8p88utRwHGdh6SyHnBnlh44tw-jCJIkSBPGB8HTsZZm1gTIeCnnyGUsClNkA2SJSgjZWK4FmumQ01lXenTAZ0abcRZp6iM-5wGGFB-gstwJpJ1v9HaJOJ98YULS9Mqbv0tHqy7qIQ8ln2FHmPsJS8TyCFmK9876nVLxQ',
    link: '#',
    featured: false,
  },
  {
    title: 'Sentinel AI Sec',
    category: 'Tecnología',
    lastHours: 504, // 21 días
    shortDescription:
      'Seguridad proactiva basada en IA para la protección de activos digitales en entornos de finanzas descentralizadas.',
    goal: 500000,
    collected: 340000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUVOizVUkEPvjmoGLFGwWUsG0QYb8k9C_pxdPnDrhMBcP9tKk3MhCQn2yNMPtJ1EG0b_QFW0l7ctsSlJQA63G8ryb5T0V3JTm19jQvup5q8-Fpm_CUxtugaQ_ibNPmHSezr29ij6jcD-za9YDF6tnYLEaS90dDcfXY_jmbOcsUBwcuYguuqtxipQczJDAE6uNkh5MeJ_W5b8GWHZmSQvMHjbJ89P_FTaMKUai-4NCbQcm6I7Pr8ruwBWjBg4MMXkV5bQ9-rJPE2A',
    link: '#',
    featured: false,
  },
  {
    title: 'Agua Pura Descentralizada',
    category: 'Impacto',
    lastHours: 1080, // 45 días
    shortDescription:
      'Sistemas de purificación de agua compactos operados por energía cinética para comunidades rurales aisladas.',
    goal: 57000,
    collected: 12500,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAnWwJpv95ZICKjEhZrvWOaQG2aC1Cfu0m8ZKn1BG0Z7iP468WesxCNyhkJJn2x9xd2H-nbwIflMwkF_MFzZI9eeTBuj38_CvNi_hLyIfagSvhAOflFd-rWiadkVpojLurZySbyiJhMAKt8e0R-600CMazm4KX8dDm1vLPiYpbE0jfbAN8HBMGZHnzabkgag8Bl5zwzy_j9EC4PoW8iRG7q0cmOZcYVt2vuyUd4fAJNors6Vm-XNWzubkh5VlgqU6BZ5LGnWm459A',
    link: '#',
    featured: false,
  },
  {
    title: 'Mobiliario Circular Pro',
    category: 'Sostenibilidad',
    lastHours: 48, // 2 días
    shortDescription:
      'Producción de mobiliario de oficina ergonómico fabricado íntegramente con plásticos recuperados del océano.',
    goal: 81000,
    collected: 74000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIBQruC2E95rMVo-lzsQIu_jlHVANqt_yOs9-ZTR_PH1uv3b5mi8yea9tN32D9DrEr6PLpWzA4FinZMRfJgtIKcE70kBbCCTuKvBA_-4VmT1buQQmQVedfBT8JoAgQMAT2XG3JOVCXGB5ju9VwgsI8XkqP77YPisKMTlyU-1IgTbtoatK9JoeHYn9mQeqohBuHR7Pw6qQKmlS8kNdk7BTQYjd6KU_zEAkra2rXXe4c9OsFkZMYVEPdpNy4XN5aq4kMZ8gLIHQuJg',
    link: '#',
    featured: false,
  },
];
