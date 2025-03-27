import styles from'./CardSprint.module.css';

export const CardSprint = () => {
    return (
        <div className={styles.cardSprint}>
          <h2 className={styles.sprintTitle}>Sprint ejemplo</h2>
          <div className={styles.dateFields}>
            <p className={styles.dateField}>Inicio: 2025-03-04</p>
            <p className={styles.dateField}>Cierre: 2025-03-10</p>
          </div>
          <div className={styles.iconsContainer}>
            <span className={styles.icon}>&#128065;</span> {/* Icono del ojo */}
            <span className={styles.icon}>&#9998;</span> {/* Icono del lápiz */}
            <span className={styles.icon}>&#128465;</span> {/* Icono de la basura */}
          </div>
        </div>
      );
}
