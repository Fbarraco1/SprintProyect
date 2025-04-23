import styles from "./sprintTaskCard.module.css";
import { ITarea } from "../../../types/ITarea";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { tareaStore } from "../../../store/backLogStore";
import { Modal } from "../ModalTarea/Modal";
import { useTarea } from "../../../hooks/useTareas";

type Props = {
  tarea: ITarea;
};

export const SprintTaskCard = ({ tarea }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mostrarOpciones, setmostrarOpciones] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const { putTareaEditar } = useTarea();

  const handleEditTask = () => {
    setTareaActiva(tarea);
    openModal();
  };

  const handleEstadoChange = (nuevoEstado: "en progreso" | "completada") => {
    putTareaEditar({ ...tarea, estado: nuevoEstado });
    setmostrarOpciones(false); // Ocultar el menú
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
