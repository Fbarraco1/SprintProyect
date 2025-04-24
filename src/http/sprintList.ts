import axios from "axios";
import { ISprint } from "../types/ISprint";
import { API_URL } from "../utils/constantes";
import { ISprintList } from "../types/ISprintList";
import { ITarea } from "../types/ITarea";


// Esta función obtiene la lista completa de sprints
export const getSprintList = async (): Promise<ISprintList | undefined> => {
  try {
    const response = await axios.get<ISprintList>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de sprints:", error);
    return undefined;
  }
};

// Esta función actualiza la lista completa de sprints
export const putSprintList = async (sprints: ISprint[]): Promise<ISprintList | undefined> => {
  try {
    const response = await axios.put<ISprintList>(API_URL, {
      sprints: sprints,
    });
    return response.data;
  } catch (error) {
    console.error("Error al modificar base de datos:", error);
    return undefined;
  }
};

export const editarTareaSprint = async (sprintId: string, tareaActualizada: ITarea) => {
  try {
    // Obtener la lista completa de sprints desde el servidor
    const sprintList = await getSprintList();

    if (!sprintList || !sprintList.sprints) {
      console.error("No se pudo obtener la lista de sprints o está vacía.");
      return;
    }

    // Encontrar el sprint correspondiente al sprintId
    const sprint = sprintList.sprints.find((s) => s.id === sprintId);

    if (!sprint) {
      console.error(`No se encontró el sprint con ID: ${sprintId}`);
      return;
    }

    // Actualizar la tarea en el array de tareas del sprint
    const tareasActualizadas = sprint.tareas?.map((tarea) =>
      tarea.id === tareaActualizada.id ? { ...tarea, ...tareaActualizada } : tarea
    );

    // Crear un nuevo sprint con las tareas actualizadas
    const sprintActualizado = { ...sprint, tareas: tareasActualizadas };

    // Reemplazar el sprint actualizado en la lista de sprints
    const sprintsActualizados = sprintList.sprints.map((s) =>
      s.id === sprintId ? sprintActualizado : s
    );

    // Guardar la lista completa de sprints actualizada en el servidor
    const putResponse = await putSprintList(sprintsActualizados);

    return putResponse; // Retornar la respuesta del servidor
  } catch (error) {
    console.error("Error al editar tarea en sprint:", error);
    throw error; // Lanzar el error para que pueda ser manejado por el llamador
  }
};

export const eliminarTareaSprint = async (sprintId: string, tareaActualizada: ITarea) => {
  try {
    // Obtener la lista completa de sprints desde el servidor
    const sprintList = await getSprintList();

    if (!sprintList || !sprintList.sprints) {
      console.error("No se pudo obtener la lista de sprints o está vacía.");
      return;
    }

    // Encontrar el sprint correspondiente al sprintId
    const sprint = sprintList.sprints.find((s) => s.id === sprintId);

    if (!sprint) {
      console.error(`No se encontró el sprint con ID: ${sprintId}`);
      return;
    }

    // Filtrar la tarea eliminada de la lista de tareas
    const tareasActualizadas = sprint.tareas?.filter((tarea) => tarea.id !== tareaActualizada.id) || [];

    // Crear un nuevo sprint con las tareas actualizadas
    const sprintActualizado = { ...sprint, tareas: tareasActualizadas };

    // Reemplazar el sprint actualizado en la lista de sprints
    const sprintsActualizados = sprintList.sprints.map((s) =>
      s.id === sprintId ? sprintActualizado : s
    );

    // Guardar la lista completa de sprints actualizada en el servidor
    const putResponse = await putSprintList(sprintsActualizados);

    return putResponse; // Retornar la respuesta del servidor
  } catch (error) {
    console.error("Error al eliminar tarea en sprint:", error);
    throw error; // Lanzar el error para que pueda ser manejado por el llamador
  }
};

