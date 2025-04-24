import { FC } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./ModalVerSprint.module.css";

interface Props {
  sprint: ISprint | null;
  onClose: () => void;
}

export const VerSprintModal: FC<Props> = ({ sprint, onClose }) => {
  if (!sprint) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()} // Evita que se cierre si haces click dentro del modal
      >
        <h2>{sprint.nombre}</h2>
        <p><strong>Inicio:</strong> {sprint.fechaInicio}</p>
        <p><strong>Cierre:</strong> {sprint.fechaCierre}</p>

        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};
