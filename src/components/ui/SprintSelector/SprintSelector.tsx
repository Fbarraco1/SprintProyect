import { useState } from "react";
import { sprintStore } from "../../../store/sprintStore";
import { tareaStore } from "../../../store/backLogStore";
import { updateSprintController } from "../../../data/sprintController";
import { deleteBackLogController } from "../../../data/backLogController";
import { ITarea } from "../../../types/ITarea";
import styles from "./sprintSelector.module.css";
import { Forward } from "lucide-react";

interface SprintSelectorProps {
    tarea: ITarea;
    onSuccess?: () => void;
}

export const SprintSelector: React.FC<SprintSelectorProps> = ({ tarea, onSuccess }) => {
    // Problema: La forma en que estás accediendo al store está causando un bucle infinito
    // Solución: Usar el selector de Zustand correctamente
    const sprints = sprintStore(state => state.sprints);
    const eliminarUnaTarea = tareaStore(state => state.eliminarUnaTarea);

    const [selectedSprint, setSelectedSprint] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleMoveTask = async () => {
        if (!selectedSprint) {
            alert("Selecciona un sprint");
            return;
        }

        // Encontrar el sprint seleccionado
        const sprint = sprints.find((s) => s.id === selectedSprint);
        if (!sprint) return;

        try {
            // Crear una copia del sprint con la tarea agregada
            const sprintActualizado = {
                ...sprint,
                tareas: sprint.tareas ? [...sprint.tareas, tarea] : [tarea],
            };

            // Actualizar el sprint en la API y eliminar la tarea del Backlog
            await updateSprintController(sprintActualizado);
            await deleteBackLogController(tarea.id!);

            // Actualizar el estado global (Zustand)
            eliminarUnaTarea(tarea.id!);

            alert(`Tarea movida al Sprint "${sprint.nombre}"`);
            
            // Cerrar el selector y ejecutar callback si existe
            setIsOpen(false);
            setSelectedSprint("");
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Error al mover la tarea:", error);
            alert("Ocurrió un error al mover la tarea");
        }
    };

    return (
        <div className={styles.sprintSelectorContainer}>
            {!isOpen ? (
                <button 
                    className={styles.sendBackLogButton}
                    onClick={() => setIsOpen(true)}
                >
                    Enviar a <Forward size={16} className={styles.iconForward} />
                </button>
            ) : (
                <div className={styles.selectorDropdown}>
                    <select 
                        value={selectedSprint} 
                        onChange={(e) => setSelectedSprint(e.target.value)}
                        className={styles.sprintSelect}
                    >
                        <option value="">Selecciona un Sprint</option>
                        {sprints.map((sprint) => (
                            <option key={sprint.id} value={sprint.id}>
                                {sprint.nombre}
                            </option>
                        ))}
                    </select>
                    <div className={styles.actionButtons}>
                        <button 
                            onClick={handleMoveTask}
                            className={styles.confirmButton}
                        >
                            Enviar
                        </button>
                        <button 
                            onClick={() => {
                                setIsOpen(false);
                                setSelectedSprint("");
                            }}
                            className={styles.cancelButton}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};