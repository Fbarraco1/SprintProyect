import { FC } from "react"
import { ITarea } from "../../../types/ITarea"
import styles from "./cardList.module.css"
import { useTareas } from "../../../hooks/useTareas"

type ICardList ={
    tarea: ITarea
    handleOpenModalEdit: (tarea: ITarea) =>void    
}

export const CardList: FC<ICardList>= ({tarea, handleOpenModalEdit}) => {

    const{eliminarTarea} = useTareas()
    const eliminarTareaByid = () =>{
        eliminarTarea(tarea.id!)
    }
    const editarTarea = () =>{
        handleOpenModalEdit(tarea)
    }

  return (
    <div className={styles.containerCard}>
        <div>
            <h3>Titulo: {tarea.titulo}</h3>
            <p>Descripcion: {tarea.descripcion}</p>
            <p><b>Fecha Limite: {tarea.fechaLimite}</b></p>
        </div>
        <div className={styles.actionCard}>
            <button onClick={eliminarTareaByid}>Eliminar</button>
            <button onClick={editarTarea}>Editar</button>
        </div>
    </div>
  )
}
