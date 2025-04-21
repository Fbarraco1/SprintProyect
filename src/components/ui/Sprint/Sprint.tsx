import { useState } from "react";
import { ISprint } from "../../../types/ISprint"; // Asegúrate de que ISprint esté correctamente definido
import { ModalSprint } from "../ModalTareaSprint/ModalSprint";
import { SprintTaskCard } from "../sprintTaskCard/SprintTaskCard";
import styles from "./Sprint.module.css";
import { updateSprintController } from "../../../data/sprintController";

type IPropsSprint = {
  sprint: ISprint;
};

export const Sprint = ({ sprint }: IPropsSprint) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sprintData, setSprintData] = useState<ISprint>(sprint); // Estado local para el sprint

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = async (newTask: any) => {
    // Actualizar el estado local del sprint
    setSprintData((prevSprint) => {
      const updatedSprint = {
        ...prevSprint,
        tareas: [...(prevSprint.tareas ?? []), newTask],
      };

      // Actualizar el sprint en la base de datos
      updateSprintController(updatedSprint);

      return updatedSprint;
    });
  };

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
        <div className={styles.column}>
          <h3>Pendiente</h3>
          {sprintData.tareas
            ?.filter((tarea) => tarea.estado === "pendiente")
            .map((tarea) => (
              <SprintTaskCard key={tarea.id} tarea={tarea} />
            )) ?? <p>No hay tareas pendientes.</p>}
        </div>

        {/* Columna En progreso */}
        <div className={styles.column}>
          <h3>En progreso</h3>
          {sprintData.tareas
            ?.filter((tarea) => tarea.estado === "en progreso")
            .map((tarea) => (
              <SprintTaskCard key={tarea.id} tarea={tarea} />
            )) ?? <p>No hay tareas en progreso.</p>}
        </div>

        {/* Columna Completada */}
        <div className={styles.column}>
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