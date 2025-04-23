import { useEffect, useState } from "react";
import { tareaStore } from "../../../store/backLogStore"
import styles from "./ListTareas.module.css"
import { CardList } from "../cardList/cardList";
import { Modal } from "../ModalTarea/Modal";
import { ITarea } from "../../../types/ITarea";
import { useTarea } from "../../../hooks/useTareas";

export const ListTareas = () => {

    const setTareaActiva = tareaStore((state)=> state.setTareaActiva)
    const {getTareas, tareas} = useTarea();


    useEffect(()=> {
        getTareas();
        console.log(tareas)
    },[])

    const [openModalTarea, setOpenModalTarea] = useState(false);
    const handleOpenModalEdit = (tarea: ITarea) => {
        setTareaActiva(tarea)
        setOpenModalTarea(true)
    }

    const handleCloseModal = () => {
        setOpenModalTarea(false);
        
    }



  return (
    <>
    <div className={styles.containerPrincipal}>
        <h1  className={styles.containerTitleAndButton}><strong>Backlog</strong></h1>
        <div className={styles.containerTitleAndButton}>
            <h2>Tareas en el Backlog</h2>
            <button onClick={()=>{setOpenModalTarea(true)}}>Crear Tarea</button>
        </div>
        <div className={styles.containerList}>
            {tareas.length > 0 ? (
            tareas.map((el) => <CardList 
                        key={el.id} 
                        handleOpenModalEdit={handleOpenModalEdit}
                        tarea={el} />)
            ):(
            <div>
                <h3>No hay tareas</h3>
            </div>)}
        </div>
        {openModalTarea && <Modal handleCloseModal={handleCloseModal}/>}
    </div>
    </>

  )
}
