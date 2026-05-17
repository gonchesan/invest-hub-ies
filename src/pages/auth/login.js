import { saveSession } from '../../utils/auth.js';
import router from '../../router.js';

const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value; // Usar password para validar que existe
  const remember = document.getElementById('login-remember').checked;

  const userData = {
    email,
  };

  saveSession(userData, remember);

  router.navigate('/');
  console.log('Sesión guardada');
});

const usuarioLogueado =
  JSON.parse(localStorage.getItem('INVEST_HUB_USER')) ||
  JSON.parse(sessionStorage.getItem('INVEST_HUB_USER'));

if (usuarioLogueado) {
  console.log('Usuario logueado:', usuarioLogueado);
}

// const usuarioLogueado = sessionStorage.getItem('INVEST_HUB_USER');

// 📌 REDIRECCIONES CONDICIONALES
// Si estoy en login y ya hay sesión activa → redirigir al inicio
if (
  (window.location.pathname.includes('/auth/login') ||
    window.location.pathname.includes('/auth/register')) &&
  usuarioLogueado
) {
  window.location.href = '/';
}

// Si NO estoy en login.html y tampoco hay sesión → redirijo al login
// El operador ! significa "NO". !usuarioLogueado = "no hay usuario logueado"
// if (!window.location.pathname.includes("login.html") && !usuarioLogueado) {
//     window.location.href = "login.html";
// }

// 📌 MOSTRAR EL NOMBRE DEL USUARIO EN EL BOTÓN DE LOGOUT
if (usuarioLogueado) {
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.textContent = `🚪 Cerrar sesión (${usuarioLogueado})`;
  }
}
