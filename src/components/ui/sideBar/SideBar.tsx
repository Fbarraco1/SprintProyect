import { useEffect, useState } from "react";
import styles from "./SideBar.module.css";
import { sprintStore } from "../../../store/sprintStore";
import { ISprint } from "../../../types/ISprint";
import { CardSprint } from "../cardSprint/CardSprint";
import { ModalSprint } from "../ModalSprint/ModalSprint";
import { useSprint } from "../../../hooks/useSprint"; // Importamos el hook
import { useNavigate } from "react-router";

const SideBar = () => {
  // Obtener funciones y estados de los sprints
    const navigate = useNavigate();
  
  const setSprintActivo = sprintStore((state) => state.setSprintActivo);
  const { getSprints, sprints } = useSprint();

  // Efecto para obtener los sprints al cargar el componente
  useEffect(() => {
    getSprints();
  }, []);

  // Estado para manejar el modal
  const [openModalSprint, setOpenModalSprint] = useState(false);

  const handleOpenModalEdit = (sprint: ISprint) => {
    setSprintActivo(sprint);
    setOpenModalSprint(true);
  };

  const handleCloseModal = () => {
    setOpenModalSprint(false);
    setSprintActivo(null); // Limpiamos el sprint activo al cerrar el modal
  };

  const handleBackToBacklog = () => {
    setSprintActivo(null);
    navigate('/backlog');
  };

  return (
    <div className={styles.sideBar}>
      <div className={styles.backlogButtonContainer}>
        <button onClick={handleBackToBacklog} className={styles.backlogButton}>Backlog</button>
      </div>
      <div className={styles.sprintSection}>
        <h1 className={styles.sprintTitle}>Lista de Sprints</h1>
        <hr className={styles.divider} />
        <button
          className={styles.createSprintButton}
          onClick={() => {
            setSprintActivo(null); // Aseguramos que no haya sprint activo al crear uno nuevo
            setOpenModalSprint(true);
          }}
        >
          Crear Sprint
        </button>
        <div className={styles.cardSprintList}>
          {sprints.length > 0 ? (
            sprints.map((el) => (
              <CardSprint 
                key={el.id} 
                sprint={el} 
                handleOpenModalEdit={handleOpenModalEdit} 
              />
            ))
          ) : (
            <div>
              <h3>No hay sprints</h3>
            </div>
          )}
        </div>
        {openModalSprint && <ModalSprint handleCloseModal={handleCloseModal} />}
      </div>
    </div>
  );
};

export default SideBar;