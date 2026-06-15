import { PROJECTS } from '../constants.d.js';
import { formatArs, getPercentage } from '../utils/currency.js';
import {
  addProjectContribution,
  getProjectContributionTotal,
  isFavoriteProject,
  toggleFavoriteProject,
} from '../utils/project-storage.js';
import { isAuthenticated } from '../utils/auth.js';

const getProjectIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const queryId = params.get('id');

  if (queryId) return queryId;

  const parts = window.location.pathname.split('/').filter(Boolean);
  return parts[parts.length - 1];
};

const formatDate = (value) => {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
};

const getDaysLeft = (deadline) => {
  const today = new Date();
  const end = new Date(`${deadline}T23:59:59`);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

  return Math.max(diff, 0);
};

const renderNotFound = (container) => {
  container.innerHTML = `
    <section class="min-h-[480px] flex flex-col items-center justify-center text-center gap-5">
      <span class="material-symbols-outlined text-6xl text-outline">search_off</span>
      <h1 class="font-display text-4xl font-extrabold text-on-surface">Proyecto no encontrado</h1>
      <p class="max-w-xl text-on-surface-variant">El proyecto seleccionado no existe o ya no está disponible.</p>
      <a href="/projects" class="px-6 py-3 rounded-full bg-primary-container text-on-primary-container font-bold">
        Volver a proyectos
      </a>
    </section>
  `;
};

const renderProject = (container, project) => {
  const userContribution = getProjectContributionTotal(project.id);
  const collected = project.collected + userContribution;
  const percentage = getPercentage(collected, project.goal);
  const isLoggedIn = isAuthenticated();
  const favorite = isLoggedIn && isFavoriteProject(project.id);
  const favoriteButtonClass = isLoggedIn
    ? 'text-on-surface-variant hover:bg-surface-container cursor-pointer'
    : 'text-outline opacity-60 cursor-not-allowed';
  const contributionControlClass = isLoggedIn
    ? 'cursor-pointer hover:scale-[1.02] active:scale-95'
    : 'cursor-not-allowed opacity-60';
  const daysLeft = getDaysLeft(project.deadline);

  container.innerHTML = `
    <header class="mb-12">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div class="max-w-4xl">
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-bold font-label uppercase tracking-widest">
              ${project.category}
            </span>
            <span class="flex items-center gap-1 text-on-surface-variant text-sm font-medium">
              <span class="material-symbols-outlined text-sm">event</span>
              Fecha límite: ${formatDate(project.deadline)}
            </span>
          </div>
          <h1 class="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-tight">
            ${project.title}
          </h1>
          <p class="mt-5 text-lg text-on-surface-variant leading-relaxed">${project.shortDescription}</p>
        </div>

        <button
          type="button"
          id="favorite-detail-button"
          class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-outline-variant/30 transition-all ${favoriteButtonClass}"
          ${isLoggedIn ? '' : 'disabled'}>
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' ${favorite ? 1 : 0};">favorite</span>
          ${isLoggedIn ? (favorite ? 'Quitar de favoritos' : 'Agregar a favoritos') : 'Inicia sesión para guardar'}
        </button>
      </div>

      <div class="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden ambient-shadow">
        <img class="w-full h-full object-cover" alt="${project.title}" src="${project.image}">
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <section class="lg:col-span-8 space-y-10">
        <div>
          <h2 class="font-headline text-2xl font-bold mb-4">Sobre el proyecto</h2>
          <p class="text-on-surface-variant text-lg leading-relaxed font-body">${project.description}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-surface-container-low p-6 rounded-2xl">
            <span class="text-xs text-on-surface-variant uppercase font-bold tracking-widest">Creador</span>
            <p class="text-xl font-headline font-bold mt-2">${project.creator}</p>
          </div>
          <div class="bg-surface-container-low p-6 rounded-2xl">
            <span class="text-xs text-on-surface-variant uppercase font-bold tracking-widest">Categoría</span>
            <p class="text-xl font-headline font-bold mt-2">${project.category}</p>
          </div>
        </div>

        <div>
          <h2 class="font-headline text-2xl font-bold mb-4">Recompensas</h2>
          ${
            project.rewards?.length
              ? `<ul class="space-y-3">${project.rewards
                  .map(
                    (reward) => `
                      <li class="flex gap-3 bg-surface-container-lowest p-4 rounded-xl ambient-shadow">
                        <span class="material-symbols-outlined text-primary">redeem</span>
                        <span class="text-on-surface-variant">${reward}</span>
                      </li>
                    `,
                  )
                  .join('')}</ul>`
              : '<p class="text-on-surface-variant">Este proyecto no tiene recompensas asociadas.</p>'
          }
        </div>
      </section>

      <aside class="lg:col-span-4">
        <div class="sticky top-28 bg-surface-container-lowest rounded-2xl p-8 ambient-shadow border border-surface-variant/10">
          <div class="space-y-8">
            <div>
              <div class="flex justify-between items-end mb-2 gap-4">
                <span id="collected-amount" class="font-display text-4xl font-black text-on-surface">${formatArs(collected)}</span>
                <span id="funding-percentage" class="font-label text-primary font-bold">${percentage}%</span>
              </div>
              <div class="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div id="funding-progress" class="bg-primary h-full transition-all duration-700 ease-out" style="width: ${Math.min(percentage, 100)}%"></div>
              </div>
              <p class="text-sm text-on-surface-variant mt-3">
                recaudados de una meta de <span class="font-bold">${formatArs(project.goal)}</span>
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-surface-container-low rounded-xl">
                <p class="text-xs text-on-surface-variant uppercase font-bold tracking-tighter">Tu aporte</p>
                <p id="user-contribution" class="text-xl font-headline font-bold">${formatArs(userContribution)}</p>
              </div>
              <div class="p-4 bg-surface-container-low rounded-xl">
                <p class="text-xs text-on-surface-variant uppercase font-bold tracking-tighter">Días restantes</p>
                <p class="text-xl font-headline font-bold">${daysLeft}</p>
              </div>
            </div>

            <form id="contribution-form" class="space-y-3">
              <label class="block text-sm font-bold text-on-surface" for="contribution-amount">Contribución simulada</label>
              <input
                id="contribution-amount"
                class="w-full bg-surface-container-low border border-outline-variant/30 rounded-full py-4 px-5 focus:ring-2 focus:ring-primary/20 text-on-surface ${isLoggedIn ? '' : 'cursor-not-allowed opacity-60'}"
                min="1"
                placeholder="Monto en ARS"
                required
                ${isLoggedIn ? '' : 'disabled'}
                type="number">
              <button
                class="w-full py-4 rounded-full bg-primary-container text-on-primary-container font-headline font-extrabold text-lg shadow-lg shadow-primary-container/30 transition-all ${contributionControlClass}"
                ${isLoggedIn ? '' : 'disabled'}>
                ${isLoggedIn ? 'Contribuir' : 'Inicia sesión para contribuir'}
              </button>
              <p id="contribution-feedback" class="min-h-5 text-sm ${isLoggedIn ? 'text-primary' : 'text-on-surface-variant'} font-semibold">
                ${isLoggedIn ? '' : 'Necesitas iniciar sesión para guardar favoritos o realizar contribuciones.'}
              </p>
            </form>
          </div>
        </div>
      </aside>
    </div>
  `;
};

const bindEvents = (container, project) => {
  container
    .querySelector('#favorite-detail-button')
    ?.addEventListener('click', () => {
      if (!isAuthenticated()) return;

      toggleFavoriteProject(project.id);
      renderProject(container, project);
      bindEvents(container, project);
    });

  container
    .querySelector('#contribution-form')
    ?.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!isAuthenticated()) return;

      const input = container.querySelector('#contribution-amount');
      const amount = Number(input.value);

      if (!Number.isFinite(amount) || amount <= 0) return;

      addProjectContribution(project.id, amount);
      renderProject(container, project);
      bindEvents(container, project);

      const feedback = container.querySelector('#contribution-feedback');
      if (feedback) {
        feedback.textContent = `Contribución de ${formatArs(amount)} registrada.`;
      }
    });
};

export default {
  mount() {
    const container = document.querySelector('#project-detail-container');
    if (!container) return;

    const project = PROJECTS.find((item) => item.id === getProjectIdFromUrl());

    if (!project) {
      renderNotFound(container);
      return;
    }

    renderProject(container, project);
    bindEvents(container, project);
  },
};
