import { CardSprint } from "../cardSprint/CardSprint";
import styles from "./SideBar.module.css";

const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.backlogButtonContainer}>
        <button className={styles.backlogButton}>Backlog</button>
      </div>
      <div className={styles.sprintSection}>
        <h1 className={styles.sprintTitle}>Lista de Sprints</h1>
        <hr className={styles.divider} />
        <button className={styles.createSprintButton}>Crear Sprint</button>
        <div className={styles.cardSprintList}>
            <CardSprint />
        </div>
      </div>
    </div>
  );
};

export default SideBar;