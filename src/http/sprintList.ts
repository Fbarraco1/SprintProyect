import axios from "axios";
import { ISprint } from "../types/ISprint";
import { API_URL } from "../utils/constantes";
import { ISprintList } from "../types/ISprintList";


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