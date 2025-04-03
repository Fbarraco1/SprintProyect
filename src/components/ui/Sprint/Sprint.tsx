import { SprintTaskCard } from '../sprintTaskCard/SprintTaskCard';
import styles from './Sprint.module.css';

export const Sprint = () => {
    return (
        <div className={styles.sprintScreen}>
            {/* Cabecera */}
            <h1 className={styles.containerTitleAndButton}><strong>Sprint: Nombre del Sprint</strong></h1>
            <div className={styles.containerTitleAndButton}>
                <h2>Tareas del Sprint:</h2>
                <button>Crear Tarea</button>
            </div>

            {/* Contenedor de columnas */}
            <div className={styles.columnsContainer}>
                {/* Columna Pendiente */}
                <div className={styles.column}>
                    <h3>Pendiente</h3>
                    <SprintTaskCard />
                    <SprintTaskCard />
                </div>

                {/* Columna En progreso */}
                <div className={styles.column}>
                    <h3>En progreso</h3>
                    <SprintTaskCard />
                </div>

                {/* Columna Completada */}
                <div className={styles.column}>
                    <h3>Completada</h3>
                    <SprintTaskCard />
                    <SprintTaskCard />
                </div>
            </div>
        </div>
    );
};