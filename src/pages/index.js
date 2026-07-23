import router from '../router.js';
import { createUrgentCard } from '../components/project-card.component.js';
import { getProjects } from '../services/projects.service.js';

const urgentProjectsContainer = document.querySelector('#urgent-projects');

router.onRouteChange(async (_) => {
  urgentProjectsContainer.innerHTML = '';

  const projects = await getProjects();
  const urgent_projects = projects.filter((p) => p.featured);
  urgent_projects.forEach((project) => {
    urgentProjectsContainer.innerHTML += createUrgentCard(project);
  });
});
