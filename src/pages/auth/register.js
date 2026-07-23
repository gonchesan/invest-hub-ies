import { saveSession, requireGuest } from '../../utils/auth.js';
import router from '../../router.js';
import { register } from '../../services/auth.service.js';
import { validateRegister } from '../../utils/validators.js';

requireGuest('/');

const form = document.getElementById('register-form');
const errorMessage = document.getElementById('register-error');

const showError = (message) => {
  if (!errorMessage) return;

  errorMessage.textContent = message;
  errorMessage.classList.toggle('hidden', !message);
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('register-firstname').value.trim();
  const surname = document.getElementById('register-lastname').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const birthdate = document.getElementById('register-birthdate').value;
  const password = document.getElementById('register-password').value;

  const errors = validateRegister({
    name,
    surname,
    email,
    password,
    birthdate,
  });
  const firstError = Object.values(errors)[0];

  if (firstError) {
    showError(firstError);
    return;
  }

  try {
    const profile = await register({ name, surname, email, password, birthdate });
    saveSession(profile);
    showError('');
    router.navigate('/');
  } catch (error) {
    showError(error.message);
  }
});
