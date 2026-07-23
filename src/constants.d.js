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
