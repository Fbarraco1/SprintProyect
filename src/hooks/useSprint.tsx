import { ISprint } from "../types/ISprint";

import { sprintStore } from "../store/sprintStore";
import { createSprintController, createTareaSprintController, deleteSprintController, getSprintsController, updateSprintController } from "../data/sprintController";
import { tareaStore } from "../store/backLogStore";
import { updateTareaSprintController } from "../data/sprintController";
import { ITarea } from "../types/ITarea";

export const useSprint = () => {
  // Obtenemos los setters y getters del store
  const sprints = sprintStore((state) => state.sprints);
  const setArraySprint = sprintStore((state) => state.setArraySprint);
  const agregarNuevoSprint = sprintStore((state) => state.agregarNuevoSprint);
  const editarUnaTarea = tareaStore((state) => state.editarUnaTarea);
  const editarUnSprint = sprintStore((state) => state.editarUnSprint);
  const eliminarUnSprint = sprintStore((state) => state.eliminarUnSprint);
  const agregarNuevaTarea = tareaStore((state) => state.agregarNuevaTarea);
  

  // Función para obtener los sprints desde el controlador
  const getSprints = async () => {
    try {
      const sprintsData = await getSprintsController();
      if (sprintsData) {
        setArraySprint(sprintsData);
      }console.log("Sprints obtenidos:", sprintsData);
    } catch (error) {
      console.error("Error al obtener sprints:", error);
    }
  };

  // Función para crear un nuevo sprint
  const crearSprint = async (nuevoSprint: ISprint) => {
    try {
      const sprintCreado = await createSprintController(nuevoSprint);
      if (sprintCreado) {
        agregarNuevoSprint(sprintCreado);
        await getSprints(); // Actualiza el store con la lista completa
      }
      return sprintCreado;
    } catch (error) {
      console.error("Error al crear sprint:", error);
    }
  };

  // Función para editar un sprint existente
  const putSprintEditar = async (sprintActualizado: ISprint) => {
    try {
      const sprintEditado = await updateSprintController(sprintActualizado);
      if (sprintEditado) {
        editarUnSprint(sprintEditado);
        await getSprints(); // Actualiza el store con la lista completa
      }
      return sprintEditado;
    } catch (error) {
      console.error("Error al editar sprint:", error);
    }
  };

    const crearTareaSprint = async (sprintId: string, nuevaTarea: ITarea) => {
      try {
        const tareaCreada = await createTareaSprintController(sprintId, nuevaTarea);
        if (tareaCreada) {
          agregarNuevaTarea(tareaCreada);
          await getSprints(); // Actualiza el store con la lista completa
        }
        return tareaCreada;
      } catch (error) {
        console.error("Error al crear tarea:", error);
      }
    };

  const putEditarTareaSprint = async (sprintId: string, tareaActualizada: ITarea) => {
    try {
      // Llamar al controlador para actualizar la tarea en el sprint
      const tareaEditada = await updateTareaSprintController(sprintId, tareaActualizada);

      if (tareaEditada) {
        // Actualizar la tarea en el store
        editarUnaTarea(tareaEditada);

        // Actualizar la lista de sprints en el store
        await getSprints();
      }

      return tareaEditada;
    } catch (error) {
      console.error("Error al editar tarea en sprint:", error);
    }
  };

  // Función para eliminar un sprint
  const eliminarSprint = async (idSprint: string) => {
    try {
      await deleteSprintController(idSprint);
      eliminarUnSprint(idSprint);
      await getSprints(); // Actualiza el store con la lista completa
    } catch (error) {
      console.error("Error al eliminar sprint:", error);
    }
  };

  return {
    sprints,
    getSprints,
    crearSprint,
    putSprintEditar,
    eliminarSprint,
    putEditarTareaSprint,
    crearTareaSprint
  };
};