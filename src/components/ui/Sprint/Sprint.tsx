import { useState } from "react";
import { ISprint } from "../../../types/ISprint"; 
import { ModalSprint } from "../ModalTareaSprint/ModalTareaSprint";
import { SprintTaskCard } from "../sprintTaskCard/SprintTaskCard";
import styles from "./Sprint.module.css";
import { updateSprintController } from "../../../data/sprintController";
import { sprintStore } from "../../../store/sprintStore";

type IPropsSprint = {
  sprint: ISprint;
};

export const Sprint = ({ sprint }: IPropsSprint) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Traer el sprint actualizado desde el store
  const sprintData = sprintStore((state) =>
    state.sprints.find((s) => s.id === sprint.id)
  );

  const updateSprint = sprintStore((state) => state.editarUnSprint);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {  
    setIsModalOpen(false);
  };

  const handleAddTask = async (newTask: any) => {
    if (!sprintData) return;

    const updatedSprint = {
      ...sprintData,
      tareas: [...(sprintData.tareas ?? []), newTask],
    };

    updateSprint(updatedSprint); // actualiza en Zustand
    await updateSprintController(updatedSprint); // y opcionalmente en la BD
  };

  if (!sprintData) return <p>Sprint no encontrado</p>;

  return (
    <div className={styles.sprintScreen}>
      {/* Cabecera */}
      <h1 className={styles.containerTitleAndButton}>
        <strong>Sprint: {sprintData.nombre}</strong>
      </h1>
      <div className={styles.containerTitleAndButton}>
        <h2>Tareas del Sprint:</h2>
        <button onClick={handleOpenModal}>Crear Tarea</button>
      </div>

      {/* Contenedor de columnas */}
      <div className={styles.columnsContainer}>
        {/* Columna Pendiente */}
        <div className={styles.columnPendient}>
          <h3>Pendiente</h3>
          {sprintData.tareas
            ?.filter((tarea) => tarea.estado === "pendiente")
            .map((tarea) => (
              <SprintTaskCard key={tarea.id} tarea={tarea} />
            )) ?? <p>No hay tareas pendientes.</p>}
        </div>

        {/* Columna En progreso */}
        <div className={styles.columnProgress}>
          <h3>En progreso</h3>
          {sprintData.tareas
            ?.filter((tarea) => tarea.estado === "en progreso")
            .map((tarea) => (
              <SprintTaskCard key={tarea.id} tarea={tarea} />
            )) ?? <p>No hay tareas en progreso.</p>}
        </div>

        {/* Columna Completada */}
        <div className={styles.columnCompleted}>
          <h3>Completada</h3>
          {sprintData.tareas
            ?.filter((tarea) => tarea.estado === "completada")
            .map((tarea) => (
              <SprintTaskCard key={tarea.id} tarea={tarea} />
            )) ?? <p>No hay tareas completadas.</p>}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalSprint
          handleCloseModal={handleCloseModal}
          handleAddTask={handleAddTask} // Pasar la función al modal
        />
      )}
    </div>
  );
};