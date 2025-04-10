import { FC } from "react"
import { ITarea } from "../../../types/ITarea"
import styles from "./cardList.module.css"
import { useTarea } from "../../../hooks/useTareas"

type ICardList ={
    tarea: ITarea
    handleOpenModalEdit: (tarea: ITarea) =>void    
}

export const CardList: FC<ICardList>= ({tarea, handleOpenModalEdit}) => {

    const{eliminarTarea} = useTarea()
    const eliminarTareaByid = () =>{
        eliminarTarea(tarea.id!)
    }
    const editarTarea = () =>{
        handleOpenModalEdit(tarea)
    }

  return (
    <div className={styles.containerCard}>
        <div className={styles.infoCard}>
            <h3>Titulo: {tarea.titulo}</h3>
            <p>Descripcion: {tarea.descripcion}</p>
            <p><b>Fecha Limite: {tarea.fechaLimite}</b></p>
        </div>
        <div className={styles.actionCard}>
            <button className={styles.sendBackLogButton}>Enviar a</button>
            <span onClick={eliminarTareaByid} className={styles.icon}>&#128465;</span> {/* Icono de la basura */}
            <span onClick={editarTarea} className={styles.icon}>&#9998;</span> {/* Icono del lápiz */}
        </div>
    </div>
  )
}
