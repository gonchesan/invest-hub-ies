import router from '../router.js';
import '../components/project-card.component.js';
import {
  createUrgentCard,
  URGENT_PROJECTS,
} from '../components/project-card.component.js';

const urgentProjectsContainer = document.querySelector('#urgent-projects');

router.onRouteChange((_) => {
  urgentProjectsContainer.innerHTML = '';

  URGENT_PROJECTS.forEach((project) => {
    urgentProjectsContainer.innerHTML += createUrgentCard(project);
  });
});
