import { getProjects } from '../services/projects.service.js';
import { formatArs, getPercentage } from '../utils/currency.js';
import {
  getFavoriteProjectIds,
  getProjectContributionTotal,
  removeFavoriteProject,
} from '../utils/project-storage.js';

const renderEmptyState = (container) => {
  container.innerHTML = `
    <div class="bg-surface-container-lowest p-10 rounded-2xl ambient-shadow text-center">
      <span aria-hidden="true" class="material-symbols-outlined text-5xl text-outline mb-4">favorite</span>
      <h3 class="text-2xl font-bold text-on-surface mb-2">No guardaste proyectos todavía</h3>
      <p class="text-on-surface-variant mb-6">Explora el archivo y marca proyectos como favoritos para verlos aquí.</p>
      <a href="/projects" class="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-bold">
        Explorar proyectos
        <span aria-hidden="true" class="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>
  `;
};

const createFavoriteRow = (project) => {
  const contribution = getProjectContributionTotal(project.id);
  const collected = project.collected + contribution;
  const percentage = getPercentage(collected, project.goal);

  return `
    <article class="bg-surface-container-lowest p-6 rounded-2xl hover:bg-white transition-all ambient-shadow group">
      <div class="grid grid-cols-1 md:grid-cols-7 items-center gap-6">
        <a href="/projects/${project.id}" class="md:col-span-3 flex items-center gap-4">
          <div class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-variant">
            <img class="w-full h-full object-cover" alt="${project.title}" src="${project.image}">
          </div>
          <div>
            <h3 class="font-bold text-on-surface text-lg group-hover:text-primary transition-colors">${project.title}</h3>
            <p class="text-on-surface-variant text-sm">${project.category}</p>
          </div>
        </a>

        <div>
          <span class="block text-xs font-bold text-on-surface-variant uppercase mb-1">Recaudado</span>
          <span class="font-bold text-on-surface">${formatArs(collected)}</span>
        </div>

        <div>
          <span class="block text-xs font-bold text-on-surface-variant uppercase mb-1">Progreso</span>
          <span class="font-bold text-primary">${percentage}%</span>
        </div>

        <div>
          <span class="block text-xs font-bold text-on-surface-variant uppercase mb-1">Tu aporte</span>
          <span class="font-bold text-on-surface">${formatArs(contribution)}</span>
        </div>

        <div class="flex justify-end gap-2">
          <a class="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-primary hover:text-white transition-all" href="/projects/${project.id}" aria-label="Ver detalle de ${project.title}">
            <span aria-hidden="true" class="material-symbols-outlined">arrow_forward</span>
          </a>
          <button class="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-error-container hover:text-on-error-container transition-all cursor-pointer" data-remove-favorite="${project.id}" aria-label="Eliminar ${project.title} de favoritos">
            <span aria-hidden="true" class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </article>
  `;
};

const renderStats = (projects) => {
  const contributionTotals = projects.map((project) =>
    getProjectContributionTotal(project.id),
  );
  const total = contributionTotals.reduce((sum, value) => sum + value, 0);
  const contributedCount = contributionTotals.filter(
    (value) => value > 0,
  ).length;

  document.querySelector('#favorites-count').textContent = projects.length;
  document.querySelector('#contributed-count').textContent = contributedCount;
  document.querySelector('#contributed-total').textContent = formatArs(total);
};

const renderFavorites = async () => {
  const container = document.querySelector('#favorite-projects-container');
  if (!container) return;

  const favoriteIds = getFavoriteProjectIds();
  const allProjects = await getProjects();
  const projects = allProjects.filter((project) =>
    favoriteIds.includes(project.id),
  );

  renderStats(projects);

  if (!projects.length) {
    renderEmptyState(container);
    return;
  }

  container.innerHTML = projects.map(createFavoriteRow).join('');
};

export default {
  mount() {
    renderFavorites();

    document
      .querySelector('#favorite-projects-container')
      ?.addEventListener('click', (e) => {
        const button = e.target.closest('[data-remove-favorite]');
        if (!button) return;

        removeFavoriteProject(button.dataset.removeFavorite);
        renderFavorites();
      });
  },
};
