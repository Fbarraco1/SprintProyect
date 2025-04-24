import styles from "./sprintTaskCard.module.css";
import { ITarea } from "../../../types/ITarea";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { tareaStore } from "../../../store/backLogStore";
import { Modal } from "../ModalTarea/Modal";
import { useSprint } from "../../../hooks/useSprint";
import { sprintStore } from "../../../store/sprintStore";
type Props = {
  tarea: ITarea;
};

export const SprintTaskCard = ({ tarea }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mostrarOpciones, setmostrarOpciones] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const { putEditarTareaSprint } = useSprint();

  // Obtener el ID del sprint activo desde el store
  const sprintActivoId = sprintStore((state) => state.sprintActivo?.id);

  const handleEditTask = () => {
    setTareaActiva(tarea);
    openModal();
  };

  const handleEstadoChange = async (nuevoEstado: "en progreso" | "completada") => {
    try {
      // Usar el ID del sprint activo desde el store
      if (!sprintActivoId) {
        console.error("El ID del sprint activo no está definido.");
        return;
      }

      const tareaActualizada = { ...tarea, estado: nuevoEstado };
      await putEditarTareaSprint(sprintActivoId, tareaActualizada);

      console.log(`Tarea actualizada a estado: ${nuevoEstado}`);
      setmostrarOpciones(false); // Ocultar el menú
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea:", error);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <h4>{tarea.nombre}</h4>
      <p>{tarea.descripcion}</p>
      <p>Fecha límite: {tarea.fechaCierre}</p>

      <div className={styles.dropdownWrapper}>
        <button className={styles.moveBtn} onClick={() => setmostrarOpciones(!mostrarOpciones)}>
          Enviar a:
        </button>
        {mostrarOpciones && (
          <ul className={styles.opciones}>
            <li onClick={() => handleEstadoChange("en progreso")}>En progreso</li>
            <li onClick={() => handleEstadoChange("completada")}>Completada</li>
          </ul>
        )}
      </div>

      <button className={styles.moveBtn}>Enviar a: Backlog</button>

      <div className={styles.icons}>
        <span><Eye size={20} /></span>
        <span onClick={handleEditTask}><Pencil size={20} /></span>
        <span><Trash2 size={20} /></span>
      </div>

      {isModalOpen && <Modal handleCloseModal={closeModal} />}
    </div>
  );
};
