import { useParams, useNavigate } from "react-router-dom";
import { useSprint } from "../../../hooks/useSprint";
import { Sprint } from "../../ui/Sprint/Sprint";
import styles from "./SprintScreen.module.css";
import { Header } from "../../ui/header/Header";
import SideBar from "../../ui/sideBar/SideBar";
import { sprintStore } from "../../../store/sprintStore";

export const SprintScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sprints } = useSprint();
  const sprint = sprints.find((s) => s.id === id);

  const setSprintActivo = sprintStore((state) => state.setSprintActivo);

  const handleBackToBacklog = () => {
    setSprintActivo(null);
    navigate('/backlog');
  };

  return (
    <div>
      <Header/>
      <div className={styles.mainContainer}>
        <SideBar />
        <div className={styles.contentContainer}>
          <button 
            onClick={handleBackToBacklog}
            className={styles.backButton}
          >
            Volver al Backlog
          </button>
          {sprint ? <Sprint sprint={sprint} /> : <p>Cargando sprint...</p>}
        </div>
      </div>
    </div>
  );
};
