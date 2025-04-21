import styles from "./sprintTaskCard.module.css";
import { ITarea } from "../../../types/ITarea";
import { Eye, Pencil, Trash2 } from "lucide-react";

type Props = {
  tarea: ITarea;
};

export const SprintTaskCard = ({ tarea }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <h4>{tarea.nombre}</h4> {/* Cambiado de titulo a nombre */}
      <p>{tarea.descripcion}</p>
      <p>Fecha límite: {tarea.fechaCierre}</p> {/* Cambiado de fechaLimite a fechaCierre */}

      <button className={styles.moveBtn}>Enviar a: Completada</button>
      <button className={styles.moveBtn}>Enviar a: Backlog</button>

      <div className={styles.icons}>
        <span><Eye size={20} /></span>
        <span><Pencil size={20} /></span>
        <span><Trash2 size={20} /></span>
      </div>
    </div>
  );
};