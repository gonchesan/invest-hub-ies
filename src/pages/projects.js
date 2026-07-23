import router from '../router.js';
import { createProjectCard } from '../components/project-card.component.js';
import { getProjects } from '../services/projects.service.js';

const projectsContainer = document.querySelector('#projects-container');

const renderProjects = (projects) => {
  if (projectsContainer) {
    projectsContainer.innerHTML = projects.map(createProjectCard).join('');
  }
};

let currentCategory = 'Todos';
let searchTerm = '';

const filterProjects = async () => {
  const projects = await getProjects();

  return projects.filter((project) => {
    const matchesCategory =
      currentCategory === 'Todos' || project.category === currentCategory;

    const query = searchTerm.trim().toLowerCase();

    const matchesSearch =
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.shortDescription.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
};

export const initProjectFilters = () => {
  const filters = document.querySelector('#projects-filters');

  if (filters) {
    filters.addEventListener('click', async (e) => {
      const button = e.target.closest('button');

      if (!button) return;

      currentCategory = button.dataset.category;

      // Actualizar estilos activos
      filters.querySelectorAll('button').forEach((btn) => {
        btn.classList.remove(
          'bg-primary-container',
          'text-on-primary-container',
        );

        btn.classList.add(
          'bg-surface-container-highest',
          'text-on-surface-variant',
        );

        btn.setAttribute('aria-pressed', 'false');
      });

      button.classList.remove(
        'bg-surface-container-highest',
        'text-on-surface-variant',
      );

      button.classList.add('bg-primary-container', 'text-on-primary-container');
      button.setAttribute('aria-pressed', 'true');

      renderProjects(await filterProjects());
    });
  }
};

router.onRouteChange(async (_) => {
  renderProjects(await filterProjects());
  initProjectFilters();
});

// Search bar focus effect
const searchInput = document.querySelector('#projects-search');
searchInput.addEventListener('focus', () => {
  searchInput.parentElement.classList.add('scale-[1.02]');
});
searchInput.addEventListener('blur', () => {
  searchInput.parentElement.classList.remove('scale-[1.02]');
});

searchInput.addEventListener('input', async (e) => {
  searchTerm = e.target.value;
  renderProjects(await filterProjects());
});
