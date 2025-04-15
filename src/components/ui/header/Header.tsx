import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { sprintStore } from "../../../store/sprintStore";
import { ISprint } from "../../../types/ISprint";

export const Header = () => {
  const navigate = useNavigate();
  const setSprintActivo = sprintStore((state: { setSprintActivo: (sprint: ISprint | null) => void }) => state.setSprintActivo);

  const handleBackToBacklog = () => {
    setSprintActivo(null);
    navigate('/backlog');
  };

  return (
    <div className={styles.containerHeader}>
      <div className={styles.containerTitleHeader}>
        <h2>Aplicacion de tareas</h2>
      </div>
      <button 
        onClick={handleBackToBacklog}
        className={styles.backButton}
      >
        Volver al Backlog
      </button>
    </div>
  );
};
