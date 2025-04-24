import { FC, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./CardSprint.module.css";
import { useSprint } from "../../../hooks/useSprint";
import { sprintStore } from "../../../store/sprintStore";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { VerSprintModal } from "../modalVerSprint/ModalVerSprint";
import Swal from "sweetalert2";

type ISprintList = {
  sprint: ISprint;
  handleOpenModalEdit: (sprint: ISprint) => void;
};

export const CardSprint: FC<ISprintList> = ({ sprint, handleOpenModalEdit }) => {
  const { eliminarSprint } = useSprint();
  const setSprintActivo = sprintStore((state) => state.setSprintActivo);
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);

  const eliminarSprintById = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el sprint "${sprint.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          eliminarSprint(sprint.id!);
          Swal.fire(
            '¡Eliminado!',
            'El sprint ha sido eliminado correctamente.',
            'success'
          );
        } catch (error) {
          console.error("Error al eliminar el sprint:", error);
          Swal.fire(
            'Error',
            'No se pudo eliminar el sprint.',
            'error'
          );
        }
      }
    });
  };

  const editarSprint = () => {
    console.log("Editando sprint:", sprint.id);
    handleOpenModalEdit(sprint);
  };

  const verSprint = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalVisible(true);
  };

  const handleActivarSprint = () => {
    const sprintActivo = sprintStore.getState().sprintActivo;
    if (sprintActivo?.id === sprint.id) return;

    setSprintActivo(sprint);
    navigate(`/sprint/${sprint.id}`);
  };

  return (
    <>
      <div className={styles.cardSprint}>
        <h2 onClick={handleActivarSprint} className={styles.sprintTitle}>{sprint.nombre}</h2>
        <div className={styles.dateFields}>
          <p className={styles.dateField}>Inicio: {sprint.fechaInicio}</p>
          <p className={styles.dateField}>Cierre: {sprint.fechaCierre}</p>
        </div>
        <div className={styles.iconsContainer}>
          <span onClick={verSprint} className={styles.icon}>
            <Eye size={20} />
          </span>
          <span onClick={editarSprint} className={`${styles.icon} ${styles.editIcon}`}>
            <Pencil size={20} />
          </span>
          <span onClick={eliminarSprintById} className={`${styles.icon} ${styles.deleteIcon}`}>
            <Trash2 size={20} />
          </span>
        </div>
      </div>

      {modalVisible && (
        <VerSprintModal sprint={sprint} onClose={() => setModalVisible(false)} />
      )}
    </>
  );
};