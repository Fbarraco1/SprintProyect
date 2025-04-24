import { ISprint } from "../types/ISprint";
import { getSprintList, putSprintList } from "../http/sprintList";
import { editarTareaSprint } from "../http/sprintList";
import { ITarea } from "../types/ITarea";

// Obtiene todos los sprints
export const getSprintsController = async (): Promise<ISprint[] | undefined> => {
  try {
    const response = await getSprintList();
    if (response && response.sprints) {
      return response.sprints;
    }
    return [];
  } catch (error) {
    console.error("Error al traer sprints:", error);
    return [];
  }
};
  
  export const getSprintByIdController = async (id: string) => {
    try {
      const sprintDb = await getSprintsController();
  
      if (sprintDb) {
        const sprintForId = sprintDb.find((sprint) => sprint.id === id)
        return sprintForId;
      }
      return null;
    } catch(error) {
      console.error(`Error al traer sprint ${id}: `, error)
    }
  }
  
  export const createSprintController = async (sprintNuevo: ISprint) => {
    try{
      const sprintDb = await getSprintsController();
      if (sprintDb) {
        await putSprintList([...sprintDb, sprintNuevo]);
      } else {
        await putSprintList([sprintNuevo])
      }
  
      return sprintNuevo;
    } catch(error) {  
      console.error("Error al crear sprint: ", error)
    }
  }

export const createTareaSprintController = async (sprintId: string, nuevaTarea: ITarea): Promise<ITarea | undefined> => {
  try {
    // Obtener la lista completa de sprints
    const sprintDb = await getSprintsController();

    if (!sprintDb) {
      console.error("No se pudo obtener la lista de sprints.");
      return;
    }

    // Encontrar el sprint activo por su ID
    const sprintActivo = sprintDb.find((sprint) => sprint.id === sprintId);

    if (!sprintActivo) {
      console.error(`No se encontró el sprint con ID: ${sprintId}`);
      return;
    }

    // Agregar la nueva tarea al array de tareas del sprint activo
    const tareasActualizadas = [...(sprintActivo.tareas || []), nuevaTarea];

    // Crear un nuevo sprint con las tareas actualizadas
    const sprintActualizado = { ...sprintActivo, tareas: tareasActualizadas };

    // Actualizar la lista completa de sprints
    const sprintsActualizados = sprintDb.map((sprint) =>
      sprint.id === sprintId ? sprintActualizado : sprint
    );

    // Guardar la lista completa de sprints actualizada
    await putSprintList(sprintsActualizados);

    return nuevaTarea;
  } catch (error) {
    console.error("Error al crear tarea en el sprint activo:", error);
  }
};
  
  export const updateSprintController = async (sprintActualizado: ISprint) => {
    
  try {
    const sprintDb = await getSprintsController();
    if (sprintDb) {
      const result = sprintDb.map((sprint) => sprint.id === sprintActualizado.id ? {...sprint, ...sprintActualizado} : sprint);
      await putSprintList(result);
    }
    
    return sprintActualizado;
  } catch (error) {
    console.error("Error al actualizar sprint: ", error)
  }
  }
  export const updateTareaSprintController = async (sprintId: string, tareaActualizada: ITarea): Promise<ITarea | undefined> => {
  try {
    // Actualizar la tarea en la base de datos de tareas
    const tareaBd = await editarTareaSprint(sprintId, tareaActualizada);

    if (tareaBd) {
      // Obtener la lista completa de sprints
      const sprintDb = await getSprintsController();

      if (sprintDb) {
        // Buscar el sprint que contiene la tarea actualizada
        const sprintActualizado = sprintDb.find((sprint) => sprint.id === sprintId);

        if (sprintActualizado) {
          // Actualizar la lista de tareas dentro del sprint
          const tareasActualizadas = sprintActualizado.tareas?.map((tarea) =>
            tarea.id === tareaActualizada.id ? { ...tarea, ...tareaActualizada } : tarea
          );

          // Crear un nuevo sprint con las tareas actualizadas
          const sprintConTareasActualizadas = {
            ...sprintActualizado,
            tareas: tareasActualizadas,
          };

          // Actualizar la lista completa de sprints
          const sprintsActualizados = sprintDb.map((sprint) =>
            sprint.id === sprintConTareasActualizadas.id ? sprintConTareasActualizadas : sprint
          );

          // Guardar los cambios en la base de datos
          await putSprintList(sprintsActualizados);
        }
      }
    }

    return tareaActualizada;
  } catch (error) {
    console.error("Error al actualizar tarea en sprint: ", error);
  }
};
export const eliminarTareaDelSprintController = async (sprintId: string, tareaActualizada: ITarea): Promise<ITarea | undefined> => {
  try {
    // Obtener la lista completa de sprints
    const sprintDb = await getSprintsController();

    if (!sprintDb) {
      console.error("No se pudo obtener la lista de sprints.");
      return;
    }

    // Encontrar el sprint activo por su ID
    const sprintActivo = sprintDb.find((sprint) => sprint.id === sprintId);

    if (!sprintActivo) {
      console.error(`No se encontró el sprint con ID: ${sprintId}`);
      return;
    }

    // Encontrar la tarea a eliminar
    const tareaAEliminar = sprintActivo.tareas?.find((tarea) => tarea.id === tareaActualizada.id);

    if (!tareaAEliminar) {
      console.error(`No se encontró la tarea con ID: ${tareaActualizada.id} en el sprint ${sprintId}`);
      return;
    }

    // Filtrar la tarea eliminada de la lista de tareas
    const tareasActualizadas = sprintActivo.tareas?.filter((tarea) => tarea.id !== tareaActualizada.id) || [];

    // Crear un nuevo sprint con las tareas actualizadas
    const sprintActualizado = { ...sprintActivo, tareas: tareasActualizadas };

    // Actualizar la lista completa de sprints
    const sprintsActualizados = sprintDb.map((sprint) =>
      sprint.id === sprintId ? sprintActualizado : sprint
    );

    // Guardar la lista completa de sprints actualizada
    await putSprintList(sprintsActualizados);

    // Retornar la tarea eliminada
    return tareaAEliminar;
  } catch (error) {
    console.error("Error al eliminar tarea del sprint: ", error);
  }
};
  
  
  export const deleteSprintController = async (id: string) => {
    const sprintDb = await getSprintsController();
  try {
    if(sprintDb) {
      const result = sprintDb.filter((sprint) => sprint.id !== id);
      await putSprintList(result);
    }
  } catch (error) {
    console.error("Error al eliminar proyecto: ", error)
  }
    
  }

