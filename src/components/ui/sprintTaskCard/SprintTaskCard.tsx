import styles from "./sprintTaskCard.module.css";
import { ITarea } from "../../../types/ITarea";

type Props = {
  tarea: ITarea;
};

export const SprintTaskCard = ({ tarea }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <h4>{tarea.titulo}</h4>
      <p>{tarea.descripcion}</p>
      <p>Fecha límite: {tarea.fechaLimite}</p>

      <button className={styles.moveBtn}>Enviar a: Completada</button>
      <button className={styles.moveBtn}>Enviar a: Backlog</button>

      <div className={styles.icons}>
        <span>👁️</span>
        <span>✏️</span>
        <span>🗑️</span>
      </div>
    </div>
  );
};