import styles from "./sprintTaskCard.module.css";
import { ITarea } from "../../../types/ITarea";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { tareaStore } from "../../../store/backLogStore";
import { useSprint } from "../../../hooks/useSprint";
import { sprintStore } from "../../../store/sprintStore";
import { ModalSprint } from "../ModalTareaSprint/ModalTareaSprint";
import { useTarea } from "../../../hooks/useTareas";
import { ModalVerTarea } from "../modalVerTarea/ModalVerTarea";
import Swal from "sweetalert2";

type Props = {
  tarea: ITarea;
};

export const SprintTaskCard = ({ tarea }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerTareaOpen, setIsVerTareaOpen] = useState(false);
  const [mostrarOpciones, setmostrarOpciones] = useState(false);

  const { crearTarea } = useTarea();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { eliminarTareaSprint } = useTarea();
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const { putEditarTareaSprint } = useSprint();

  const sprintActivoId = sprintStore((state) => state.sprintActivo?.id);

  const handleEditTask = () => {
    setTareaActiva(tarea);
    openModal();
  };

  const handleEstadoChange = async (nuevoEstado: "en progreso" | "completada") => {
    try {
      if (!sprintActivoId) {
        console.error("El ID del sprint activo no está definido.");
        return;
      }

      const tareaActualizada = { ...tarea, estado: nuevoEstado };
      await putEditarTareaSprint(sprintActivoId, tareaActualizada);
      setmostrarOpciones(false);
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea:", error);
    }
  };

  const handleEliminarTarea = async () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la tarea "${tarea.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (!sprintActivoId) {
            console.error("El ID del sprint activo no está definido.");
            return;
          }

          await eliminarTareaSprint(sprintActivoId, tarea);
        } catch (error) {
          console.error("Error al eliminar la tarea del sprint:", error);
        }
      }
    });
  };

  const handleEnviarAlBacklog = async () => {
    try {
      if (!sprintActivoId) {
        console.error("El ID del sprint activo no está definido.");
        return;
      }

      await eliminarTareaSprint(sprintActivoId, tarea);
      await crearTarea({ ...tarea, id: new Date().toISOString() });
      Swal.fire("Tarea enviada al Backlog", "La Tarea se ha enviado correctamente", "success");
    } catch (error) {
      console.error("Error al enviar la tarea al Backlog:", error);
    }
  }

  const handleVerTarea = () => {
    setIsVerTareaOpen(true);
  };

  const closeVerTarea = () => {
    setIsVerTareaOpen(false);
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

      <button onClick={handleEnviarAlBacklog} className={styles.moveBtn}>Enviar a: Backlog</button>

      <div className={styles.icons}>
        <span onClick={handleVerTarea}><Eye size={20} /></span>
        <span onClick={handleEditTask}><Pencil size={20} /></span>
        <span onClick={handleEliminarTarea}><Trash2 size={20} /></span>
      </div>

      {isModalOpen && <ModalSprint handleCloseModal={closeModal} />}
      {isVerTareaOpen && <ModalVerTarea tarea={tarea} handleClose={closeVerTarea} />}
    </div>
  );
};