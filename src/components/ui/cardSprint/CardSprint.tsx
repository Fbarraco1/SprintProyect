import { FC } from 'react';
import { ISprint } from '../../../types/ISprint';
import styles from'./CardSprint.module.css';
import { useSprints } from '../../../hooks/useSprints';

type ISprintList ={
  sprint: ISprint
  handleOpenModalEdit: (sprint: ISprint) =>void    
}

export const CardSprint : FC<ISprintList>= ({sprint, handleOpenModalEdit}) => {
    const{eliminarSprint} = useSprints()
        const eliminarSprintByid = () =>{
          eliminarSprint(sprint.id!)
        }
        const editarSprint = () =>{
            handleOpenModalEdit(sprint)
        }

    return (
        <div className={styles.cardSprint}>
          <h2 className={styles.sprintTitle}>{sprint.titulo}</h2>
          <div className={styles.dateFields}>
            <p className={styles.dateField}>Inicio: {sprint.fechaInicio}</p>
            <p className={styles.dateField}>Cierre: {sprint.fechaFin}</p>
          </div>
          <div className={styles.iconsContainer}>
            <span className={styles.icon}>&#128065;</span> {/* Icono del ojo */}
            <span onClick={editarSprint} className={styles.icon}>&#9998;</span> {/* Icono del lápiz */}
            <span  onClick={eliminarSprintByid} className={styles.icon}>&#128465;</span> {/* Icono de la basura */}
          </div>
        </div>
      );
}
