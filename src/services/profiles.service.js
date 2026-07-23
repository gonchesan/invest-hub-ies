const PROFILES_API_URL = 'https://inevst-hub-api.vercel.app/profiles';

export const findProfileByEmail = async (email) => {
  const response = await fetch(
    `${PROFILES_API_URL}?email=${encodeURIComponent(email)}`,
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar perfiles`);
  }

  const profiles = await response.json();

  return profiles[0] || null;
};

export const createProfile = async (profile) => {
  const response = await fetch(PROFILES_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status} al crear el perfil`);
  }

  return response.json();
};
