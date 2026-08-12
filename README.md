SprintProyect

Tablero de gestión de sprints al estilo Scrum, desarrollado como trabajo práctico universitario (Laboratorio 4). Permite administrar un backlog de tareas y organizarlas dentro de sprints, haciendo seguimiento del estado de cada una a lo largo de su ciclo de vida.

✨ Funcionalidades
📋 Backlog — listado de tareas pendientes de asignar a un sprint.
🏃 Sprints — creación de sprints con fecha de inicio y cierre, cada uno con sus propias tareas asociadas.
✅ Estados de tarea — seguimiento del progreso mediante estados: pendiente, en progreso, completada.
📝 Formularios validados — carga y edición de tareas con validación de datos.
🔔 Alertas visuales — confirmaciones y notificaciones de acciones mediante SweetAlert2.
🧩 Stack Tecnológico
React — Librería para la construcción de interfaces de usuario.
TypeScript — Tipado estático sobre JavaScript.
Vite — Entorno de desarrollo y build.
Zustand — Manejo de estado global de la aplicación.
React Router DOM — Enrutamiento entre vistas (backlog, sprints, etc.).
React Hook Form + Yup — Manejo y validación de formularios.
Axios — Cliente HTTP para consumir la API simulada.
json-server — Backend simulado (mock API) para persistir backlog y sprints durante el desarrollo.
SweetAlert2 — Alertas y confirmaciones visuales.
Lucide React — Íconos.
⚙️ Requisitos previos
Node.js (versión 18 o superior recomendada)
npm (incluido con Node.js)
🚀 Instalación y ejecución en desarrollo

Este proyecto necesita dos procesos corriendo en paralelo: el servidor de desarrollo de Vite y el mock backend (json-server).

Clonar el repositorio
bash
   git clone https://github.com/Fbarraco1/SprintProyect.git
   cd SprintProyect
Instalar las dependencias
bash
   npm install
Levantar el backend simulado (json-server) En una terminal:
bash
   npm run bdDev

Esto expone los datos de db.json (backlog y sprints) en http://localhost:3000.

Levantar la aplicación En otra terminal:
bash
   npm run dev
Abrir la aplicación Acceder desde el navegador a la URL que indique la consola (por defecto suele ser http://localhost:5173).

⚠️ Si json-server no está corriendo, la aplicación no va a poder cargar ni guardar el backlog ni los sprints.

📦 Build para producción
bash
npm run build

Los archivos generados se guardan en la carpeta dist/.

Para previsualizar el build localmente:

bash
npm run preview
🗃️ Modelo de datos (mock API)

Los datos se organizan en dos grandes bloques dentro de db.json:

backlog.tareas — tareas aún no asignadas a ningún sprint, cada una con nombre, descripción, fecha de cierre y estado.
sprintList.sprints — sprints, cada uno con nombre, fecha de inicio, fecha de cierre y su propia lista de tareas asociadas.

Cada tarea tiene un estado que representa su avance: pendiente, en progreso o completada.

📁 Estructura del proyecto (resumen)
SprintProyect/
├── public/            # Archivos estáticos
├── src/                # Código fuente de la aplicación
├── db.json             # Base de datos simulada (json-server)
├── index.html           # Punto de entrada HTML
├── vite.config.ts        # Configuración de Vite
├── tsconfig.json         # Configuración de TypeScript
└── package.json
🎓 Contexto

Proyecto desarrollado con fines académicos (Laboratorio 4), como práctica de manejo de estado en React con Zustand, formularios validados y consumo de una API simulada con json-server.
