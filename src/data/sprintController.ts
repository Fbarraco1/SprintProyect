import { ISprint } from "../types/ISprint";
import { getSprintList, putSprintList } from "../http/sprintList";


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