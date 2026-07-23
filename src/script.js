// Importar router, componente navbar y funciones de autenticación
import router from './router.js';
import { renderNavbar } from './components/navbar.component.js';
import { requireAuth, isAuthenticated, getSession } from './utils/auth.js';
import { renderFooter } from './components/footer.component.js';

// Renderizar la barra de navegación al cargar
renderNavbar();
renderFooter();

// Obtener el contenedor del navbar
const navbarContainer = document.querySelector('header');
const footerContainer = document.querySelector('footer');
const appContainer = document.getElementById('app');
const routeAnnouncer = document.getElementById('route-announcer');

/*
 |--------------------------------------------------------------------------
 | ACCESIBILIDAD EN NAVEGACIÓN SPA
 |--------------------------------------------------------------------------
 | Al no haber recarga de página entre rutas, lectores de pantalla y
 | usuarios de teclado no reciben ninguna señal de que el contenido
 | cambió. Actualizamos el <title>, movemos el foco al contenido nuevo
 | y anunciamos la navegación en una región "aria-live".
 */

const ROUTE_TITLES = [
  { pattern: /^\/$/, title: 'Inicio' },
  { pattern: /^\/projects\/[^/]+$/, title: 'Detalle del proyecto' },
  { pattern: /^\/projects/, title: 'Proyectos' },
  { pattern: /^\/invests/, title: 'Favoritos' },
  { pattern: /^\/auth\/login/, title: 'Iniciar sesión' },
  { pattern: /^\/auth\/register/, title: 'Crear cuenta' },
];

const getRouteTitle = (path) => {
  const match = ROUTE_TITLES.find((route) => route.pattern.test(path));
  return match?.title || 'Página no encontrada';
};

const announceRouteChange = (path) => {
  const pageTitle = getRouteTitle(path);

  document.title = `${pageTitle} · Invest Hub`;

  if (appContainer) {
    appContainer.focus();
  }

  if (routeAnnouncer) {
    routeAnnouncer.textContent = `Navegaste a ${pageTitle}`;
  }
};

// Ejecutar cuando la ruta cambia
router.onRouteChange((path) => {
  announceRouteChange(path);

  /*
   |--------------------------------------------------------------------------
   | AUTH ROUTES - Detectar si estamos en una página de autenticación
   |--------------------------------------------------------------------------
   */

  const isAuthRoute =
    path.includes('/auth/login') || path.includes('/auth/register');

  /*
   |--------------------------------------------------------------------------
   | NAVBAR - Mostrar/ocultar navbar según la ruta
   |--------------------------------------------------------------------------
   */
  // Ocultar navbar en páginas de login y registro
  navbarContainer.classList.toggle('hidden', isAuthRoute);
  footerContainer.classList.toggle('hidden', isAuthRoute);

  /*
   |--------------------------------------------------------------------------
   | ROUTE GUARDS - Definir rutas protegidas y rutas para invitados
   |--------------------------------------------------------------------------
   */

  // Rutas que requieren autenticación
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];

  // Rutas solo para usuarios no autenticados
  const guestRoutes = ['/auth/login', '/auth/register'];

  /*
   |--------------------------------------------------------------------------
   | PROTECTED - Redirigir a login si intenta acceder sin autenticarse
   |--------------------------------------------------------------------------
   */

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );

  if (isProtectedRoute) {
    requireAuth('/auth/login');
  }

  /*
   |--------------------------------------------------------------------------
   | USER UI - Mostrar información si está autenticado
   |--------------------------------------------------------------------------
   */

  if (isAuthenticated()) {
    const user = getSession();

    // console.log('Usuario logueado:', user);
  }

  // Re-renderizar navbar para actualizar el menú de usuario
  renderNavbar();
});
