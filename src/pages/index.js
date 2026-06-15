import router from '../router.js';
import '../components/project-card.component.js';
import {
  createUrgentCard,
  PROJECTS,
} from '../components/project-card.component.js';

const urgentProjectsContainer = document.querySelector('#urgent-projects');

router.onRouteChange((_) => {
  urgentProjectsContainer.innerHTML = '';

  const urgent_projects = PROJECTS.filter((p) => p.featured);
  urgent_projects.forEach((project) => {
    urgentProjectsContainer.innerHTML += createUrgentCard(project);
  });
});
