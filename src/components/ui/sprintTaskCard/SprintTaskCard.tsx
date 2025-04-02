import styles from'./sprintTaskCard.module.css';
export const SprintTaskCard = () => {
  return (
    <div className={styles.cardContainer}>
      <h4>Título de la tarea</h4>
      <p>Descripción de la tarea...</p>
      <p>Fecha límite: 2025-03-10</p>
      
      <button className={styles.moveBtn}>Enviar a: Completada</button>
      <button className={styles.moveBtn}>Enviar a: Backlog</button>
      
      <div className={styles.icons}>
        <span>👁️</span>
        <span>✏️</span>
        <span>🗑️</span>
      </div>
    </div>
  );
};
