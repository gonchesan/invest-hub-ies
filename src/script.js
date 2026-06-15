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

// Ejecutar cuando la ruta cambia
router.onRouteChange((path) => {
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
