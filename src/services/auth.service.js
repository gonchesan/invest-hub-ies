import { findProfileByEmail, createProfile } from './profiles.service.js';

const toSessionProfile = (profile) => {
  const { password, ...sessionProfile } = profile;
  return sessionProfile;
};

/**
 * Autentica un perfil contra la API. Falla si el email no existe
 * o si la contraseña no coincide con la registrada.
 */
export const login = async (email, password) => {
  const profile = await findProfileByEmail(email);

  if (!profile || profile.password !== password) {
    throw new Error('El correo o la contraseña son incorrectos.');
  }

  return toSessionProfile(profile);
};

/**
 * Crea un nuevo perfil en la API. Falla si el email ya está en uso.
 */
export const register = async ({ email, password, name, surname, birthdate }) => {
  const existingProfile = await findProfileByEmail(email);

  if (existingProfile) {
    throw new Error('Ya existe una cuenta registrada con ese correo.');
  }

  const profile = await createProfile({
    id: `profile-${Date.now()}`,
    email,
    password,
    name,
    surname,
    birthdate,
  });

  return toSessionProfile(profile);
};
