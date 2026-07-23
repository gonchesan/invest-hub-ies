import { saveSession, requireGuest } from '../../utils/auth.js';
import router from '../../router.js';
import { login } from '../../services/auth.service.js';
import { validateLogin } from '../../utils/validators.js';

requireGuest('/');

const form = document.getElementById('login-form');
const errorMessage = document.getElementById('login-error');

const showError = (message) => {
  if (!errorMessage) return;

  errorMessage.textContent = message;
  errorMessage.classList.toggle('hidden', !message);
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const remember = document.getElementById('login-remember').checked;

  const errors = validateLogin({ email, password });
  const firstError = Object.values(errors)[0];

  if (firstError) {
    showError(firstError);
    return;
  }

  try {
    const profile = await login(email, password);
    saveSession(profile, remember);
    showError('');
    router.navigate('/');
  } catch (error) {
    showError(error.message);
  }
});
