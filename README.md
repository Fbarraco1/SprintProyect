# SprintProyect

Tablero académico de gestión de trabajo al estilo Scrum. Permite mantener un backlog, organizar tareas dentro de sprints y seguir su avance mediante los estados **pendiente**, **en progreso** y **completada**.

## Funcionalidades

- Creación y administración de tareas.
- Backlog de tareas pendientes de asignación.
- Creación de sprints con fechas y tareas asociadas.
- Cambio de estado y seguimiento de tareas.
- Formularios validados y confirmaciones visuales.
- Persistencia local mediante una API simulada.

## Tecnologías

- React y TypeScript
- Vite
- Zustand
- React Router
- React Hook Form y Yup
- Axios
- JSON Server
- SweetAlert2
- Lucide React

## Ejecución local

Requisitos: Node.js y npm. El proyecto necesita **dos procesos en paralelo**: el frontend de Vite y el mock backend de JSON Server.

```bash
git clone https://github.com/Fbarraco1/SprintProyect.git
cd SprintProyect
npm install
```

En una terminal, iniciar el mock backend:

```bash
npm run bdDev
```

Este comando sirve el contenido de `db.json` en `http://localhost:3000`.

En otra terminal, iniciar el frontend:

```bash
npm run dev
```

Vite mostrará la dirección local. Sin JSON Server, la aplicación no puede cargar ni guardar el backlog y los sprints.

## Build

```bash
npm run build
npm run preview
```

El resultado se genera en `dist/`, que no se versiona. También está disponible `npm run lint`.

## Datos simulados

`db.json` contiene el backlog y la lista de sprints utilizados por JSON Server. Cada tarea registra nombre, descripción, fecha de cierre y estado.

## Contexto y colaboración

Proyecto colaborativo desarrollado con fines académicos para Laboratorio IV. El historial Git permite verificar la participación de **Juan Emilio Frery (`Juani17`)** en las rutas de sprint y backlog, lógica de eliminación de tareas dentro de un sprint y estilos. La documentación se limita a esos aportes verificables.

## Estado

Ejercicio académico con backend simulado; no se presenta como un sistema preparado para producción.
