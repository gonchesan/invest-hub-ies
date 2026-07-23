// Importar funciones de autenticación desde el módulo de utilidades
import { AUTH_ROUTES, PUBLIC_ROUTES } from '../constants.d.js';
import { isAuthenticated, getSession, logout } from '../utils/auth.js';

// Verifica si una ruta está activa en la URL actual
const isActive = (route) => {
  if (route === '/') {
    return window.location.pathname === '/';
  }

  return window.location.pathname.startsWith(route);
};

// Estilos para los links del navbar (activos vs inactivos)
const getNavLinkClass = (route) => {
  const baseClass = 'transition-colors';

  // Estilos cuando el link está activo (verde oscuro + subrayado)
  const activeClass = 'text-[#4d6300] font-bold border-b-2 border-[#d4ff5d]';

  // Estilos cuando el link no está activo (gris + efecto hover)
  const inactiveClass = 'text-[#2d2e34]/70 hover:text-[#4d6300]';

  return isActive(route)
    ? `${baseClass} ${activeClass}`
    : `${baseClass} ${inactiveClass}`;
};

// Estilos de links para auth
const getAuthLinkClass = (link) => {
  const baseClass =
    'text-sm font-bold rounded-full transition-colors cursor-pointer';

  if (link === '/auth/register') {
    return `${baseClass} bg-primary-container text-on-primary-fixed px-6 py-2 hover:scale-105 shadow-sm transition-transform`;
  }

  return `${baseClass} px-4 py-2 text-on-surface hover:bg-surface-container-low`;
};

// Renderiza los botones de incio y registro
function renderGuestButtons() {
  return AUTH_ROUTES.map((route) => {
    return `
      <a
        href="${route.link}"
        class="${getAuthLinkClass(route.link)}"
      >
        ${route.label}
      </a>
    `;
  }).join('');
}

// Renderiza el menu y el login
function renderUserMenu() {
  const session = getSession();

  const initial = session?.email?.[0]?.toUpperCase() || 'U';

  return `
    <details class="relative">
      <summary
        class="list-none cursor-pointer flex items-center"
        aria-label="Abrir menú de usuario"
      >
      <div aria-hidden="true" class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold capitalize">${initial}</div>
      </summary>

      <div
        class="absolute right-0 mt-3 w-56 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden z-50"
      >
        <div class="px-4 py-3 border-b border-gray-100">
          <p class="text-sm font-semibold text-gray-900">
            ${session?.name || 'Usuario invitado'}
          </p>

          <p class="text-xs text-gray-500 truncate">
            ${session.email}
          </p>
        </div>

        <div class="py-2">
          <a
            href="/perfil"
            class="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
          >
            Tu perfil
          </a>

          <a
            href="/configuracion"
            class="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
          >
            Configuración
          </a>

          <button
            id="logout-button"
            class="w-full text-left px-4 py-3 text-sm hover:bg-primary-container/20 text-primary-dim transition-colors cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </details>
  `;
}

// Renderiza un link de navegación para el menú mobile expandible
const renderMobileNavLink = (route) => `
  <a
    href="${route.link}"
    class="block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
      isActive(route.link)
        ? 'bg-primary-container text-on-primary-container'
        : 'text-on-surface hover:bg-surface-container-low'
    }"
    ${isActive(route.link) ? 'aria-current="page"' : ''}
  >
    ${route.label}
  </a>
`;

// Funcion que se encarga de renderizar todo el componente
export function renderNavbar() {
  const navbarContainer = document.querySelector('header');

  const visibleRoutes = isAuthenticated()
    ? PUBLIC_ROUTES
    : PUBLIC_ROUTES.slice(0, -1);

  const renderNavLink = (route) => `
    <a
      href="${route.link}"
      class="${getNavLinkClass(route.link)}"
      ${isActive(route.link) ? 'aria-current="page"' : ''}
    >
      ${route.label}
    </a>
  `;

  const navbarHTML = `
    <nav
      aria-label="Navegación principal"
      class="sticky top-0 z-50 relative flex justify-between items-center w-full px-6 py-4 bg-[#f7f6fe] bg-opacity-90 backdrop-blur-md"
    >
      <div class="flex items-center gap-4">
        <a href="/">
          <img
            class="h-12 w-full object-cover"
            alt="Invest hub logo"
            src="/src/assets/invest-hub-logo.svg"
            loading="lazy"
          />
        </a>
        <span aria-hidden="true" class="h-8 w-1 bg-gray-300"></span>

        <div class="hidden md:flex items-center gap-6 font-plus-jakarta text-sm font-medium">
          ${visibleRoutes.map(renderNavLink).join('')}
        </div>
      </div>

      <div class="flex items-center gap-4">
        ${isAuthenticated() ? renderUserMenu() : renderGuestButtons()}

        <button
          id="mobile-menu-toggle"
          type="button"
          class="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors"
          aria-expanded="false"
          aria-controls="mobile-menu"
          aria-label="Abrir menú de navegación"
        >
          <span id="mobile-menu-icon" aria-hidden="true" class="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        class="hidden md:hidden flex-col gap-1 absolute inset-x-0 top-full px-6 py-4 bg-[#f7f6fe] shadow-lg border-t border-gray-200/60 font-plus-jakarta"
      >
        ${visibleRoutes.map(renderMobileNavLink).join('')}
      </div>
    </nav>
  `;

  navbarContainer.innerHTML = navbarHTML;

  /*
   |--------------------------------------------------------------------------
   | Logout Event
   |--------------------------------------------------------------------------
   */

  const logoutButton = document.getElementById('logout-button');

  logoutButton?.addEventListener('click', () => {
    logout();
  });

  /*
   |--------------------------------------------------------------------------
   | Mobile Menu Toggle
   |--------------------------------------------------------------------------
   */

  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');

  mobileMenuToggle?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    const isOpen = !mobileMenu.classList.contains('hidden');

    mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenuIcon.textContent = isOpen ? 'close' : 'menu';
  });
}
