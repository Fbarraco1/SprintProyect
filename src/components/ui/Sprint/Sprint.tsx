import { ISprint } from "../../../types/ISprint";
import { SprintTaskCard } from "../sprintTaskCard/SprintTaskCard";
import styles from "./Sprint.module.css";

type IPropsSprint = {
  sprint: ISprint;
};

export const Sprint = ({ sprint }: IPropsSprint) => {
    return (
      <div className={styles.sprintScreen}>
        {/* Cabecera */}
        <h1 className={styles.containerTitleAndButton}>
          <strong>Sprint: {sprint.nombre}</strong>
        </h1>
        <div className={styles.containerTitleAndButton}>
          <h2>Tareas del Sprint:</h2>
          <button>Crear Tarea</button>
        </div>
  
        {/* Contenedor de columnas */}
        <div className={styles.columnsContainer}>
          {/* Columna Pendiente */}
          <div className={styles.column}>
            <h3>Pendiente</h3>
            {sprint.tareas?.filter((tarea) => tarea.estado === "pendiente").map((tarea) => (
              <SprintTaskCard key={tarea.id} tarea={tarea} />
            )) ?? <p>No hay tareas pendientes.</p>}
          </div>
  
          {/* Columna En progreso */}
          <div className={styles.column}>
            <h3>En progreso</h3>
            {sprint.tareas?.filter((tarea) => tarea.estado === "en progreso").map((tarea) => (
              <SprintTaskCard key={tarea.id} tarea={tarea} />
            )) ?? <p>No hay tareas en progreso.</p>}
          </div>
  
          {/* Columna Completada */}
          <div className={styles.column}>
            <h3>Completada</h3>
            {sprint.tareas?.filter((tarea) => tarea.estado === "completada").map((tarea) => (
              <SprintTaskCard key={tarea.id} tarea={tarea} />
            )) ?? <p>No hay tareas completadas.</p>}
          </div>
        </div>
      </div>
    );
  };