const AUTH_KEY = 'INVEST_HUB_USER';

/**
 * Retorna el storage correcto dependiendo
 * de si el usuario quiere mantener sesión.
 */
export function getAuthStorage(remember = false) {
  return remember ? localStorage : sessionStorage;
}

/**
 * Guarda la sesión del usuario.
 */
export function saveSession(data, remember = false) {
  // Limpiar ambos storages antes de guardar
  clearSession();

  getAuthStorage(remember).setItem(AUTH_KEY, JSON.stringify(data));
}

/**
 * Obtiene la sesión actual.
 * Busca primero en localStorage y luego en sessionStorage.
 */
export function getSession() {
  const localSession = localStorage.getItem(AUTH_KEY);

  if (localSession) {
    return JSON.parse(localSession);
  }

  const sessionSession = sessionStorage.getItem(AUTH_KEY);

  if (sessionSession) {
    return JSON.parse(sessionSession);
  }

  return null;
}

/**
 * Verifica si el usuario está autenticado.
 */
export function isAuthenticated() {
  return !!getSession();
}

/**
 * Actualiza parcialmente la sesión.
 */
export function updateSession(newData) {
  const currentSession = getSession();

  if (!currentSession) return;

  const updatedSession = {
    ...currentSession,
    ...newData,
  };

  saveSession(updatedSession, isPersistentSession());
}

/**
 * Elimina toda la sesión.
 */
export function clearSession() {
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
}

/**
 * Logout completo.
 */
export function logout(redirectTo = '/auth/login') {
  clearSession();

  window.history.pushState({}, '', redirectTo);

  window.dispatchEvent(new PopStateEvent('popstate'));
}

/**
 * Retorna true si la sesión es persistente.
 */
export function isPersistentSession() {
  return !!localStorage.getItem(AUTH_KEY);
}

/**
 * Redirecciona si NO está autenticado.
 */
export function requireAuth(redirectTo = '/auth/login') {
  if (!isAuthenticated()) {
    window.history.pushState({}, '', redirectTo);

    window.dispatchEvent(new PopStateEvent('popstate'));

    return false;
  }

  return true;
}

/**
 * Redirecciona si YA está autenticado.
 */
export function requireGuest(redirectTo = '/') {
  if (isAuthenticated()) {
    window.history.pushState({}, '', redirectTo);

    window.dispatchEvent(new PopStateEvent('popstate'));

    return false;
  }

  return true;
}
