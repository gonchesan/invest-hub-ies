const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mínimo 8 caracteres, incluyendo al menos un número y un símbolo.
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export const isValidEmail = (email) => EMAIL_PATTERN.test(email);

export const isValidPassword = (password) => PASSWORD_PATTERN.test(password);

export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!isValidEmail(email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  if (!password) {
    errors.password = 'Ingresa tu contraseña.';
  }

  return errors;
};

export const validateRegister = ({ name, surname, email, password, birthdate }) => {
  const errors = {};

  if (!name?.trim()) {
    errors.name = 'Ingresa tu nombre.';
  }

  if (!surname?.trim()) {
    errors.surname = 'Ingresa tu apellido.';
  }

  if (!isValidEmail(email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  if (!isValidPassword(password)) {
    errors.password =
      'La contraseña debe tener al menos 8 caracteres, un número y un símbolo.';
  }

  if (!birthdate) {
    errors.birthdate = 'Ingresa tu fecha de nacimiento.';
  }

  return errors;
};
