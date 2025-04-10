import { Header } from "../../ui/header/Header";
import SideBar from "../../ui/sideBar/SideBar";
import { Sprint } from "../../ui/Sprint/Sprint";
import styles from './SprintScreen.module.css';
import { useParams } from "react-router-dom";
import { useSprint } from "../../../hooks/useSprint";

export const SprintScreen = () => {
  const { id } = useParams();
  const { sprints } = useSprint();
  const sprint = sprints.find((s) => s.id === id);

  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <SideBar />
        <div className={styles.content}>
          {sprint ? (
            <Sprint sprint={sprint} />
          ) : (
            <p style={{ padding: "1rem" }}>Cargando sprint...</p>
          )}
        </div>
      </div>
    </div>
  );
};
