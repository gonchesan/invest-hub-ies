const FAVORITES_KEY = 'INVEST_HUB_FAVORITE_PROJECTS';
const CONTRIBUTIONS_KEY = 'INVEST_HUB_PROJECT_CONTRIBUTIONS';

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`No se pudo leer ${key}`, error);
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFavoriteProjectIds = () => {
  return readJson(FAVORITES_KEY, []);
};

export const isFavoriteProject = (projectId) => {
  return getFavoriteProjectIds().includes(projectId);
};

export const toggleFavoriteProject = (projectId) => {
  const favorites = getFavoriteProjectIds();
  const nextFavorites = favorites.includes(projectId)
    ? favorites.filter((id) => id !== projectId)
    : [...favorites, projectId];

  writeJson(FAVORITES_KEY, nextFavorites);

  return nextFavorites.includes(projectId);
};

export const removeFavoriteProject = (projectId) => {
  const nextFavorites = getFavoriteProjectIds().filter(
    (id) => id !== projectId,
  );
  writeJson(FAVORITES_KEY, nextFavorites);
};

export const getContributions = () => {
  return readJson(CONTRIBUTIONS_KEY, {});
};

export const getProjectContributionTotal = (projectId) => {
  const contributions = getContributions();
  return (
    contributions[projectId]?.reduce((total, item) => total + item.amount, 0) ||
    0
  );
};

export const addProjectContribution = (projectId, amount) => {
  const contributions = getContributions();
  const projectContributions = contributions[projectId] || [];

  const nextContribution = {
    amount,
    date: new Date().toISOString(),
  };

  contributions[projectId] = [...projectContributions, nextContribution];
  writeJson(CONTRIBUTIONS_KEY, contributions);

  return nextContribution;
};
