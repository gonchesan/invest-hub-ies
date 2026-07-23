/**
 * Router simple sin dependencias externas
 * Usa History API para manejar rutas SPA
 * Las URLs se ven como /auth/login pero cargan archivos de src/pages/auth/login.html
 */

class SimpleRouter {
  constructor() {
    this.currentRoute = null;
    this.routes = new Map();
    this.appContainer = null;

    // listeners
    this.routeListeners = [];

    this.init();
  }

  init() {
    this.appContainer = document.getElementById('app');

    if (!this.appContainer) {
      console.warn('Router: No se encontró elemento #app');
      return;
    }

    // Interceptar clicks en links internos
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');

      if (!link) return;

      const href = link.getAttribute('href');

      // Solo interceptar links internos (que empiezan con /)
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        this.navigate(href);
      }
    });

    // Manejar botones atrás/adelante del navegador
    window.addEventListener('popstate', () => {
      this.loadPage(window.location.pathname);
    });

    // Cargar página inicial
    this.loadPage(window.location.pathname || '/');
  }

  onRouteChange(callback) {
    this.routeListeners.push(callback);
  }

  notifyRouteChange(path) {
    this.routeListeners.forEach((callback) => callback(path));
  }

  /**
   * Navegar a una ruta
   * @param {string} path - Ruta a navegar (ej: /auth/login)
   */
  navigate(path) {
    window.history.pushState(null, null, path);
    this.loadPage(path);
  }

  /**
   * Cargar página desde src/pages/
   * /auth/login -> src/pages/auth/login.html
   * / -> src/pages/index.html
   */
  async loadPage(path) {
    try {
      // Limpiar path
      let cleanPath = path.replace(/\/$/, '') || '/';
      const pagePath = this.resolvePagePath(cleanPath);

      // Determinar archivo a cargar
      let filePath =
        pagePath === '/'
          ? '/src/pages/index.html'
          : `/src/pages${pagePath}.html`;

      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${filePath}`);
      }

      const html = await response.text();

      if (this.currentPage?.unmount) {
        this.currentPage.unmount();
      }

      // Reemplazar contenido
      this.appContainer.innerHTML = html;

      // Ejecutar scripts en la página cargada
      await this.loadPageScript(pagePath);

      // this.executeScripts(this.appContainer);

      // Scroll al inicio
      window.scrollTo({ top: 0, behavior: 'smooth' });

      this.currentRoute = path;

      // 👇 Avisar cambio de ruta
      this.notifyRouteChange(path);
    } catch (error) {
      console.error('❌ Error al cargar página:', error);
      this.appContainer.innerHTML = `
      <!-- Main Content: 404 Canvas -->
      <div class="min-h-[819px] flex flex-col items-center justify-center px-6 py-12 text-center overflow-hidden relative">
        <!-- Abstract Decorative Element (Glassmorphism) -->
        <div aria-hidden="true" class="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/20 rounded-full blur-[100px] -z-10"></div>
        <div aria-hidden="true" class="absolute -bottom-24 -right-24 w-96 h-96 bg-tertiary-container/30 rounded-full blur-[100px] -z-10"></div>
        <!-- 404 Impactful Visual -->
        <div class="relative mb-8">
          <h1 class="font-display font-extrabold text-[12rem] leading-none text-on-surface/5 select-none md:text-[18rem]">404</h1>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="p-1 rounded-full bg-surface-container-lowest shadow-[0px_20px_40px_rgba(45,46,52,0.06)]">
              <div class="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden flex items-center justify-center bg-inverse-surface">
                <img class="w-full h-full object-cover opacity-80 mix-blend-luminosity" alt="" src="/src/assets/404.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-2xl mx-auto space-y-6">
          <h2 class="font-display text-4xl md:text-5xl font-bold tracking-tight text-on-background"> El futuro no está en esta dirección. </h2>
          <p class="font-body text-lg text-on-surface-variant max-w-lg mx-auto"> Incluso los intercambios más curados tienen sus vacíos. La página que buscas ha sido archivada o nunca llegó a ser parte de nuestra visión. </p>
          <div class="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a class="px-8 py-4 bg-primary-container text-on-primary-fixed font-bold rounded-full transition-transform active:scale-95 hover:shadow-lg hover:shadow-primary-container/20 flex items-center gap-2 group" href="/">
              <span aria-hidden="true" class="material-symbols-outlined">arrow_back</span> Volver al Inicio </a>
            <a class="px-8 py-4 bg-surface-container-lowest text-on-background font-semibold rounded-full border border-outline-variant/10 transition-all hover:bg-surface-container-low flex items-center gap-2" href="/projects">
              <span aria-hidden="true" class="material-symbols-outlined">explore</span> Explorar Proyectos </a>
          </div>
        </div>
      </div>
      `;
    }
  }

  /**
   * Resolver rutas dinámicas hacia una página existente.
   * Ej: /projects/quantum-neural-lab -> /project-detail
   */
  resolvePagePath(path) {
    const projectDetailRoutes = [
      /^\/projects\/[^/]+$/,
      /^\/project-detail\/[^/]+$/,
    ];

    if (projectDetailRoutes.some((route) => route.test(path))) {
      return '/project-detail';
    }

    return path;
  }

  async loadPageScript(path) {
    try {
      const modulePath =
        path === '/' ? '/src/pages/index.js' : `/src/pages${path}.js`;

      /*
     |--------------------------------------------------------------------------
     | Evitar cache del import
     |--------------------------------------------------------------------------
     */

      const module = await import(`${modulePath}?update=${Date.now()}`);

      this.currentPage = module.default;

      if (this.currentPage?.mount) {
        this.currentPage.mount();
      }
    } catch (error) {
      console.warn('No JS for page:', path);
    }
  }

  /**
   * Ejecutar scripts contenidos en el HTML cargado
   * Necesario porque innerHTML no ejecuta scripts
   */
  executeScripts(container) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');

      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }

      newScript.async = true;
      document.body.appendChild(newScript);
    });
  }
}

const router = new SimpleRouter();

export default router;
