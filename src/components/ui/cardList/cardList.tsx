import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./cardList.module.css";
import { useTarea } from "../../../hooks/useTareas";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { SprintSelector } from "../SprintSelector/SprintSelector";
import { ModalVerTarea } from "../modalVerTarea/ModalVerTarea";
import Swal from "sweetalert2";

type ICardList = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardList: FC<ICardList> = ({ tarea, handleOpenModalEdit }) => {
  const { eliminarTarea } = useTarea();
  const [modalTarea, setModalTarea] = useState<ITarea | null>(null);

  const eliminarTareaByid = () => {
    eliminarTarea(tarea.id!);
    Swal.fire("Tarea eliminada", "La Tarea se ha eliminado correctamente", "success");
    
  };

  const editarTarea = () => {
    handleOpenModalEdit(tarea);
  };

  const verTarea = () => {
    setModalTarea(tarea);
  };

  return (
    <div className={styles.containerCard}>
      <div className={styles.infoCard}>
        <h3>Titulo: {tarea.nombre}</h3>
        <h4>Descripcion: {tarea.descripcion}</h4>
        <h4><b>Fecha Limite: {tarea.fechaCierre}</b></h4>
      </div>
      <div className={styles.actionCard}>
        <SprintSelector tarea={tarea} />
        
        <span onClick={eliminarTareaByid} className={styles.icon}>
          <Trash2 size={20} />
        </span>

        <span onClick={editarTarea} className={styles.icon}>
          <Pencil size={20} />
        </span>

        <span onClick={verTarea} className={styles.icon}>
          <Eye size={20} />
        </span>
      </div>

      {/* Renderizar el modal solo si hay una tarea seleccionada */}
      {modalTarea && (
        <ModalVerTarea tarea={modalTarea} handleClose={() => setModalTarea(null)} />
      )}
    </div>
  );
};