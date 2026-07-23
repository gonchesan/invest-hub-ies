const PROJECTS_API_URL = 'https://inevst-hub-api.vercel.app/projects';

let projectsCache = null;

/**
 * Obtiene todos los proyectos desde la API.
 * Cachea el resultado en memoria para evitar refetch en cada navegación.
 */
export const getProjects = async () => {
  if (projectsCache) return projectsCache;

  const response = await fetch(PROJECTS_API_URL);

  if (!response.ok) {
    throw new Error(`Error ${response.status} al obtener los proyectos`);
  }

  projectsCache = await response.json();

  return projectsCache;
};

export const getProjectById = async (id) => {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
};
