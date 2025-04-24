import axios from "axios";
import { ITarea } from "../types/ITarea";
import { putBackLogList } from "../http/backLogList";

const API_URL = "http://localhost:3000/backlog"; // URL de la API para obtener los backlogs

// Función para obtener todos los proyectos
export const getBackLogsController = async (): Promise<
  ITarea[] | undefined
> => {
  try {
    // Hacemos una petición GET a la API para obtener las tareas
    const response = await axios.get<{ tareas: ITarea[] }>(API_URL);
    return response.data.tareas; // Retornamos la lista de tareas
  } catch (error) {
    console.log("Problemas en getBackLogsController", error); // Manejamos errores
  }
};
  
  // Obtiene un backlog por ID
  export const getBackLogByIdController = async (id: string): Promise<ITarea | null> => {
    try {
      const backlogDb = await getBackLogsController();
      if (backlogDb) {
        const backlog = backlogDb.find((b) => b.id === id);
        return backlog || null;
      }
      return null;
    } catch (error) {
      console.error(`Error al traer backlog ${id}:`, error);
      return null;
    }
  };
  
  // Crea un nuevo backlog
  export const createBackLogController = async (nuevoBacklog: ITarea): Promise<ITarea | undefined> => {
    try {
      const backlogDb = await getBackLogsController();
      if (backlogDb) {
        await putBackLogList([...backlogDb, nuevoBacklog]);
      } else {
        await putBackLogList([nuevoBacklog]);
      }
      return nuevoBacklog;
    } catch (error) {
      console.error("Error al crear backlog:", error);
    }
  };
  
  // Actualiza un backlog existente
  export const updateBackLogController = async (backlogActualizado: ITarea): Promise<ITarea | undefined> => {
    try {
      const backlogDb = await getBackLogsController();
      if (backlogDb) {
        const resultado = backlogDb.map((b) => b.id === backlogActualizado.id ? { ...b, ...backlogActualizado } : b);
        await putBackLogList(resultado);
      }
      return backlogActualizado;
    } catch (error) {
      console.error("Error al actualizar backlog");
    }}

  export const deleteBackLogController = async (id: string) => {
        const backlogDb = await getBackLogsController();
      try {
        if(backlogDb) {
          const result = backlogDb.filter((tarea) => tarea.id !== id);
          await putBackLogList(result);
        }
      } catch (error) {
        console.error("Error al eliminar proyecto: ", error)
  }
        
}