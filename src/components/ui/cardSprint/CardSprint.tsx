import { FC } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./CardSprint.module.css";
import { useSprint } from "../../../hooks/useSprint";
import { sprintStore } from "../../../store/sprintStore";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";

type ISprintList = {
  sprint: ISprint;
  handleOpenModalEdit: (sprint: ISprint) => void;
};

export const CardSprint: FC<ISprintList> = ({ sprint, handleOpenModalEdit }) => {
  const { eliminarSprint } = useSprint();
  const setSprintActivo = sprintStore((state) => state.setSprintActivo);
  const eliminarSprintById = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); // Añadir esto para asegurar
    eliminarSprint(sprint.id!);
  };

  const editarSprint = () => {
    
    console.log("Editando sprint:", sprint.id); // Añade este log para depuración
    handleOpenModalEdit(sprint);
  };

  const navigate = useNavigate();

  const handleActivarSprint = () => {
    const sprintActivo = sprintStore.getState().sprintActivo;
    if (sprintActivo?.id === sprint.id) return;
    
    setSprintActivo(sprint);
    navigate(`/sprint/${sprint.id}`);
  };

  return (
    <div className={styles.cardSprint}>
      <h2 onClick={handleActivarSprint} className={styles.sprintTitle}>{sprint.nombre}</h2>
      <div className={styles.dateFields}>
        <p className={styles.dateField}>Inicio: {sprint.fechaInicio}</p>
        <p className={styles.dateField}>Cierre: {sprint.fechaCierre}</p>
      </div>
      <div className={styles.iconsContainer}>
        <span 
          
          className={styles.icon}><Eye size={20} /></span>
          
        <span 
          onClick={editarSprint} 
          className={`${styles.icon} ${styles.editIcon}`}><Pencil size={20} /></span>
          
        <span 
          onClick={eliminarSprintById} 
          className={`${styles.icon} ${styles.deleteIcon}`}><Trash2 size={20} /></span>
      </div>
      
    </div>
  );
};