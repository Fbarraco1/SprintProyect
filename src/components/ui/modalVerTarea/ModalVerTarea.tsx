import { FC } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./modalVerTarea.module.css";

type ModalVerTareaProps = {
  tarea: ITarea | null;
  handleClose: () => void;
};

export const ModalVerTarea: FC<ModalVerTareaProps> = ({ tarea, handleClose }) => {
  if (!tarea) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <h2>{tarea.nombre}</h2>
        <p>{tarea.descripcion}</p>
        <p>Fecha límite: {tarea.fechaCierre}</p>
        <button onClick={handleClose}>Cerrar</button>
      </div>
    </div>
  );
};