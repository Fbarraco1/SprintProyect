import { FC } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./CardSprint.module.css";
import { useSprints } from "../../../hooks/useSprints";
import { sprintStore } from "../../../store/sprintStore";

type ISprintList = {
  sprint: ISprint;
  handleOpenModalEdit: (sprint: ISprint) => void;
};

export const CardSprint: FC<ISprintList> = ({ sprint, handleOpenModalEdit }) => {
  const { eliminarSprint } = useSprints();
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

  const handleActivarSprint = () => {
    setSprintActivo(sprint);
  };

  return (
    <div className={styles.cardSprint}>
      <h2 onClick={handleActivarSprint} className={styles.sprintTitle}>{sprint.titulo}</h2>
      <div className={styles.dateFields}>
        <p className={styles.dateField}>Inicio: {sprint.fechaInicio}</p>
        <p className={styles.dateField}>Cierre: {sprint.fechaFin}</p>
      </div>
      <div className={styles.iconsContainer}>
        <span 
          
          className={styles.icon}>&#128065;</span>
          
        <span 
          onClick={editarSprint} 
          className={`${styles.icon} ${styles.editIcon}`}>&#9998;</span>
          
        <span 
          onClick={eliminarSprintById} 
          className={`${styles.icon} ${styles.deleteIcon}`}>&#128465;</span>
      </div>
    </div>
  );
};