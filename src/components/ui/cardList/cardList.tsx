import { FC } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./cardList.module.css";
import { useTareas } from "../../../hooks/useTareas";
import { Trash2, Pencil, Eye, Forward  } from "lucide-react"; // Importamos los iconos

type ICardList = {
    tarea: ITarea;
    handleOpenModalEdit: (tarea: ITarea) => void;    
};

export const CardList: FC<ICardList> = ({ tarea, handleOpenModalEdit }) => {
    const { eliminarTarea } = useTareas();

    const eliminarTareaByid = () => {
        eliminarTarea(tarea.id!);
    };

    const editarTarea = () => {
        handleOpenModalEdit(tarea);
    };

    const verTarea = () => {
        handleOpenModalEdit(tarea);
    };

    return (
        <div className={styles.containerCard}>
            <div className={styles.infoCard}>
                <h3>Titulo: {tarea.titulo}</h3>
                <h4>Descripcion: {tarea.descripcion}</h4>
                <h4><b>Fecha Limite: {tarea.fechaLimite}</b></h4>
            </div>
            <div className={styles.actionCard}>
            <button className={styles.sendBackLogButton}>
                Enviar a <Forward size={16} className={styles.iconForward} />
            </button>

                
                {/* Icono de eliminar */}
                <span onClick={eliminarTareaByid} className={styles.icon}>
                    <Trash2 size={20} />
                </span>

                {/* Icono de editar */}
                <span onClick={editarTarea} className={styles.icon}>
                    <Pencil size={20} />
                </span>

                 {/* Icono de ver */}
                <span onClick={verTarea} className={styles.icon}>
                    <Eye size={20} />
                </span>
                
            </div>
        </div>
    );
};
