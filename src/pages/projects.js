import router from '../router.js';
import '../components/project-card.component.js';
import { createProjectCard } from '../components/project-card.component.js';
import { PROJECTS } from '../constants.d.js';

const projectsContainer = document.querySelector('#projects-container');

const renderProjects = (projects) => {
  if (projectsContainer) {
    projectsContainer.innerHTML = projects.map(createProjectCard).join('');
  }
};

let currentCategory = 'Todos';
let searchTerm = '';

const filterProjects = () => {
  return PROJECTS.filter((project) => {
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
    filters.addEventListener('click', (e) => {
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
      });

      button.classList.remove(
        'bg-surface-container-highest',
        'text-on-surface-variant',
      );

      button.classList.add('bg-primary-container', 'text-on-primary-container');

      renderProjects(filterProjects());
    });
  }
};

router.onRouteChange((_) => {
  renderProjects(filterProjects());
  initProjectFilters();
});

// Search bar focus effect
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('focus', () => {
  searchInput.parentElement.classList.add('scale-[1.02]');
});
searchInput.addEventListener('blur', () => {
  searchInput.parentElement.classList.remove('scale-[1.02]');
});

searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  renderProjects(filterProjects());
});
