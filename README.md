# Proyecto de Crowdfunding

## Información del Estudiante

- Alumno: Sanchez Garay, Gonzalo
- Asignatura: Aplicaicones Web 1

---

### 📝 Descripción del Proyecto

Este proyecto consiste en el desarrollo de una landing page para una plataforma
de Crowdfunding (recaudación de fondos). El objetivo principal es ofrecer una
interfaz moderna, intuitiva y responsive que permita a los usuarios visualizar
campañas, conocer metas de recaudación y gestionar aportes. Para el diseño y la
maquetación se ha utilizado Tailwind CSS.

---

### 🌐 Demo en Producción

El proyecto se encuentra desplegado en Vercel y puede visitarse en:

🔗 **[https://invest-hub-ies.vercel.app/](https://invest-hub-ies.vercel.app/)**

---

### 🛠️ Tecnologías Utilizadas

- **JavaScript (ES6+)**: lógica de la aplicación con módulos nativos, sin
  bundler ni transpilación.
- **Router SPA propio** (`src/router.js`): navegación entre páginas basada en la
  History API y `fetch()`, sin recargar el navegador.
- **Capa de servicios** (`src/services/`): módulos dedicados a consumir la API
  REST del proyecto (ver sección [🔌 Servicios y consumo de la API](#-servicios-y-consumo-de-la-api)).
- **Tailwind CSS v4**: sistema de estilos utilitario con un tema custom
  (`src/input.css`) inspirado en una paleta tipo Material You.
- **PostCSS + Autoprefixer**: procesamiento y compatibilidad del CSS generado.
- **localStorage / sessionStorage**: persistencia de la sesión del usuario (con
  soporte para "Mantener sesión iniciada"), favoritos y contribuciones
  simuladas.
- **Node.js / npm**: entorno y gestor de paquetes para las herramientas de
  desarrollo.
- **concurrently** y **serve**: ejecución simultánea del watcher de Tailwind y
  de un servidor estático local.
- **Vercel**: plataforma de despliegue del sitio.

> Nota: el proyecto no utiliza frameworks de frontend (React, Vue, Angular).
> Los proyectos y los perfiles de usuario se obtienen de una API REST externa
> (ver sección siguiente); las contribuciones a proyectos siguen siendo
> **simuladas** y no persisten en la API.

---

### 🛠️ Requerimientos Previos

Antes de iniciar, asegúrate de tener instalados los siguientes componentes:

- `Node.js` (versión 18.0 o superior recomendada)
- `npm` (incluido con Node.js)

---

### 🚀 Cómo levantar el proyecto

Sigue estos pasos para ejecutar el entorno de desarrollo localmente:

1. **Clonar el repositorio o descargar los archivos:**

- Asegúrate de estar dentro de la carpeta raíz del proyecto.

2. **Instalar dependencias:**

- Ejecuta el siguiente comando para instalar Tailwind CSS y las herramientas
  necesarias (como _concurrently_ y _serve_):

```bash
    npm install
```

3. **Ejecutar el entorno de desarrollo:**

- Para compilar el CSS en tiempo real y levantar el servidor local
  simultáneamente, utiliza el script configurado:

```bash
    npm run dev
```

4. **Ver el proyecto:**

- Una vez ejecutado, abre tu navegador en la dirección que te indique el
  terminal (normalmente `http://localhost:3000`).

- Alternativamente, podés ver la versión ya desplegada en
  [https://invest-hub-ies.vercel.app/](https://invest-hub-ies.vercel.app/) sin
  necesidad de instalar nada.

---

### 🔌 Servicios y consumo de la API

La aplicación consume la API pública desplegada en
**[https://inevst-hub-api.vercel.app](https://inevst-hub-api.vercel.app)**. Todo
el acceso a esta API está centralizado en la carpeta `src/services/`, para que
las páginas y componentes no llamen a `fetch()` directamente:

- **`src/services/projects.service.js`**
  - `getProjects()`: obtiene el listado completo de proyectos desde
    `GET /projects` y lo cachea en memoria para evitar refetch en cada
    navegación.
  - `getProjectById(id)`: reutiliza `getProjects()` y busca un proyecto por su
    `id` (usado en la página de detalle).
- **`src/services/profiles.service.js`**
  - `findProfileByEmail(email)`: consulta `GET /profiles?email=...` para
    verificar si ya existe un perfil con ese correo.
  - `createProfile(profile)`: crea un nuevo perfil con `POST /profiles`.
- **`src/services/auth.service.js`**: construido sobre `profiles.service.js`,
  concentra las reglas de negocio de autenticación (detalladas en la sección
  siguiente).

Los proyectos que antes estaban hardcodeados en `src/constants.d.js` ahora se
obtienen en su totalidad desde la API, tanto en el listado (`Proyectos`), el
inicio (proyectos destacados), el detalle de cada proyecto y la sección de
favoritos.

---

### 🔐 Registro e inicio de sesión (Sign up / Sign in)

El registro y el inicio de sesión dejaron de ser simulados: ahora validan los
datos ingresados y los contrastan contra los perfiles reales de la API.

- **Validaciones de formulario** (`src/utils/validators.js`): antes de llamar
  a la API se valida en el cliente que:
  - el correo tenga un formato válido,
  - la contraseña tenga al menos 8 caracteres, un número y un símbolo (para el
    registro),
  - los campos obligatorios (nombre, apellido, fecha de nacimiento) estén
    completos.

- **Inicio de sesión** (`src/pages/auth/login.js` → `login()` en
  `auth.service.js`):
  1. Busca el perfil por correo con `findProfileByEmail(email)`.
  2. Si no existe o la contraseña no coincide con la almacenada en la API, se
     muestra el error "El correo o la contraseña son incorrectos.".
  3. Si coincide, se guarda la sesión (sin la contraseña) con `saveSession()`
     y se redirige al inicio.
  4. Si el usuario marca **"Mantener sesión iniciada"** (`remember = true`),
     `saveSession()` persiste el perfil en `localStorage` en lugar de
     `sessionStorage`, por lo que la sesión sobrevive al cerrar el navegador.

- **Registro** (`src/pages/auth/register.js` → `register()` en
  `auth.service.js`):
  1. Verifica con `findProfileByEmail(email)` si el correo ya está en uso.
  2. Si ya existe una cuenta con ese correo, se muestra el error "Ya existe
     una cuenta registrada con ese correo." y no se crea el perfil.
  3. Si el correo está disponible, crea el perfil con `createProfile()`
     (`POST /profiles`) y guarda automáticamente la sesión del nuevo usuario.

Ambos formularios muestran los errores en un mensaje inline (`role="alert"`)
debajo de los campos, y redirigen automáticamente al inicio si el usuario ya
tiene una sesión activa e intenta volver a entrar a `Auth`.

---

### 📌 Uso de la Plataforma

- **Explorar proyectos**: desde la sección `Proyectos` es posible ver el listado
  completo, filtrarlo por categoría y buscar por texto.
- **Ver el detalle**: al ingresar a un proyecto se muestra su descripción,
  progreso de recaudación, recompensas y un formulario para "invertir"
  (contribución simulada, sin pasarela de pago real).
- **Registrarse / Iniciar sesión**: desde `Auth` se puede crear una cuenta o
  iniciar sesión contra la API de perfiles (ver
  [🔐 Registro e inicio de sesión](#-registro-e-inicio-de-sesión-sign-up--sign-in)).
- **Favoritos**: estando logueado, se pueden marcar proyectos como favoritos y
  consultarlos luego en la sección `Mis Inversiones` / `Favoritos`.

---
