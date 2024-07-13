# Proyecto: Hazte Analista – Frontend

Desarrollo y mantenimiento: [@gabo-hacStyle](https://github.com/gabo-hacStyle)

## Índice

- Herramientas y lenguajes de desarrollo
- Instalación
- Estructura del proyecto
  - Actions
  - App
  - Components
  - Auth
  - Dashboard
  - Form
  - DashboadDataForm
  - Contexts
  - Hooks
  - Lib
  - Public
  - Service
  - Utils
- Middleware
- 

## Herramientas y lenguajes de desarrollo

- Next.js como framework SSR [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) an interactive Next.js tutorial.
- React como librería de JavaScript (usando TypeScript) [Reactjs](https://react.dev/)
- Tailwind CSS para el manejo de estilos, animaciones y diseño responsive. [Tailwind](https://tailwindcss.com/)
- Shadcn-ui para componentes de UI preconstruidos [Shadcn](https://ui.shadcn.com/docs)
- Zustand para el manejo de estados globales [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

## APIs externas

- Privy.io para autenticación de usuarios (documentación de Privy.io)
- Coinmarketcap para datos de las criptomonedas en tiempo real

## Instalación

1. Clonar el proyecto:

```bash
git clone url
```
2. Instalación de paquetes
```bash
npm i
npm run dev
```
3. Variables de entorno (la de privy)

## Estructura del proyecto

### Actions

Acciones del servidor. Funciones lanzadas desde el lado del cliente para ser ejecutadas en el lado del servidor, mejorando el rendimiento en el cliente. Cada lógica de la aplicación (proyectos, lecciones, etc.) tiene un archivo `.ts` donde se ejecutan las acciones. En cada archivo se importan los módulos encargados de realizar el fetch al servicio de la API correspondiente y se maneja la lógica correspondiente.

### App

Manejo de rutas, páginas estáticas y dinámicas. Agrupación de rutas para definir dos partes generales de la plataforma: la página de autenticación (Auth) y las páginas cuando el usuario ya está logueado. Este último grupo incluye rutas como Dashboard y Lessons (o metodología 4e). La ruta raíz ('/') es la de inicio de sesión y se encuentra en el grupo de rutas de autenticación (auth) en el archivo `page.tsx`.

Para entender mejor la estructura de Next.js para definir rutas, layouts y páginas, visita la documentación de Next.js App Router. [Nexjs app Router](https://nextjs.org/docs/app)

### Components

Componentes de ReactJS reutilizables y específicos para el modelado de las páginas y sus funcionalidades respectivas.

#### Carpeta `shared`

Contiene componentes reutilizables que no pertenecen a una sección específica, como la barra de navegación (Navbar) o el pie de página (Footer).

#### Carpeta `ui`

Aquí se encuentran los componentes puramente de interfaz de usuario (UI), provenientes de la librería Shadcn. Estos incluyen diálogos emergentes (pop-ups), tarjetas (cards), botones, campos de entrada (inputs), selecciones (selects), tablas y formularios (sin funcionalidades específicas).

#### Carpeta `Auth`

Contiene el componente `PrivyBox`, que se encarga de llamar a la API de Privy para la autenticación de usuarios. No existe una acción del servidor (server action) en esta lógica, ya que Privy maneja todo internamente.

#### Carpeta `Dashboard`

Aquí se encuentran los componentes relacionados con la pantalla principal, incluyendo las lecciones.

#### Carpeta `Form`

Contiene todos los componentes que trabajan dentro del formulario, organizados de manera modular.

- ### `DashboardDataForm.tsx`

Este archivo contiene toda la lógica del formulario, incluyendo el manejo de errores, la generación automática de ciertos números (como el market cap) y la función encargada de enviar el formulario.

- Los demás componentes contienen el contenido que se renderizará en el `DashboardDataForm`, de forma modular y separada.

#### Carpeta `Context`

Aquí se encuentra un contexto global simple del lado del cliente, sin el uso de la librería Zustand. Este contexto maneja el estado del sidebar para determinar si está activo o no. Este estado se consume en ciertos componentes para cambiar sus estilos.

#### Carpeta `Hooks`

Contiene hooks específicos para el manejo de estado global más complejo, utilizando la librería externa Zustand. Algunos ejemplos incluyen la lógica para cerrar automáticamente los diálogos, cambiar entre pestañas durante el proceso de incorporación en dispositivos móviles y manejar la información del usuario que se actualiza dinámicamente sin necesidad de recargar la página.

#### Carpeta `Lib`

Aquí se guardan algunas constantes y datos hardcodeados (que se irán eliminando a medida que se integre el backend). Las constantes incluyen códigos hexadecimales de colores utilizados en el dashboard y se exportan para su uso en la configuración de temas de Tailwind CSS.

#### Carpeta `Public`

Contiene todos los archivos de imágenes y logotipos utilizados en la aplicación.

#### Carpeta `Services`

En esta carpeta se realizan exclusivamente las solicitudes a las APIs mediante métodos HTTP. Además, se maneja el caché según sea necesario.

#### Carpeta `Utils`

Aquí se encuentran diversas utilidades para el manejo de lógicas dentro de las server actions después de realizar las solicitudes a las APIs. También se incluyen utilidades para el manejo de lecciones, como buscar la última lección o los módulos disponibles. El archivo `values.ts` proporciona valores necesarios para varios componentes, como datos almacenados en el localStorage. El archivo `index.ts` contiene datos hardcodeados en arreglos, optimizando el uso de métodos de arreglos en TypeScript (JS) en los componentes donde se necesiten mapear o filtrar datos.

## Middleware

En este middleware se configura lo siguiente:
- Cada vez que se borra la cookie en el servidor de Privy con el token de usuario (cada 30 minutos), se redirige a una página de actualización para volver a adquirir ese valor (usando el token de sesión, que no expira) y establecerlo correctamente.
- Se bloquea el acceso a ciertas rutas y se redirecciona según el estado de inicio de sesión del cliente.

