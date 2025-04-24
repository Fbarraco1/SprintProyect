import { ITarea } from "../types/ITarea";

import { tareaStore } from "../store/backLogStore";
import { createBackLogController, deleteBackLogController, getBackLogsController, updateBackLogController } from "../data/backLogController";
import { eliminarTareaDelSprintController } from "../data/sprintController";
import { sprintStore } from "../store/sprintStore";


export const useTarea = () => {
  // Obtenemos los getters y setters del store
  const tareas = tareaStore((state) => state.tareas);
  const setArrayTareas = tareaStore((state) => state.setArrayTareas);
  const agregarNuevaTarea = tareaStore((state) => state.agregarNuevaTarea);
  const editarUnaTarea = tareaStore((state) => state.editarUnaTarea);
  const eliminarUnaTarea = tareaStore((state) => state.eliminarUnaTarea);

  // Función para obtener las tareas desde el controlador
  const getTareas = async () => {
    try {
      const tareasData = await getBackLogsController();
      if (tareasData) {
        setArrayTareas(tareasData);
      }
      console.log("Tareas obtenidas:", tareasData);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  // Función para crear una nueva tarea
  const crearTarea = async (nuevaTarea: ITarea) => {
    try {
      const tareaCreada = await createBackLogController(nuevaTarea);
      if (tareaCreada) {
        agregarNuevaTarea(tareaCreada);
        await getTareas(); // Actualiza el store con la lista completa
      }
      return tareaCreada;
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  // Función para editar una tarea existente en backlog
  const putTareaEditar = async (tareaActualizada: ITarea) => {
    try {
      const tareaEditada = await updateBackLogController(tareaActualizada);
      if (tareaEditada) {
        editarUnaTarea(tareaEditada);
        await getTareas(); // Actualiza el store con la lista completa
      }
      return tareaEditada;
    } catch (error) {
      console.error("Error al editar tarea:", error);
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = async (idTarea: string) => {
    try {
      await deleteBackLogController(idTarea);
      eliminarUnaTarea(idTarea);
      await getTareas(); // Actualiza el store con la lista completa
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const eliminarTareaSprint = async (sprintId: string, tareaActualizada: ITarea) => {
    try {
      const tareaEliminada = await eliminarTareaDelSprintController(sprintId, tareaActualizada);
      if (tareaEliminada) {
        sprintStore.getState().eliminarTareaDeSprint(sprintId, tareaEliminada.id); // Actualiza el store
      }
    } catch (error) {
      console.error("Error al eliminar tarea del sprint:", error);
    }
  }
  return {
    tareas,
    getTareas,
    crearTarea,
    putTareaEditar,
    eliminarTarea,
    agregarNuevaTarea,
    eliminarTareaSprint,
  };
};
