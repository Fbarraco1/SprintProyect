import axios from "axios";
import { ISprint } from "../types/ISprint";

const API_URL = "http://localhost:3000/sprints";

export const getAllSprints = async () =>{
    try {
        const response = await axios.get<ISprint[]>(API_URL)
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const postNuevoSprint = async (nuevoSprint: ISprint) =>{
    try {
        const response = await axios.post<ISprint>(API_URL,{
            ...nuevoSprint,
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const editarSprint = async (sprintActualizado: ISprint) =>{
    try {
        const response = await axios.put<ISprint>(`${API_URL}/${sprintActualizado.id}`,{
            ...sprintActualizado,
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const eliminarSprintPorID = async (idSprint: string) =>{
    try {
        const response = await axios.delete<ISprint>(`${API_URL}/${idSprint}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
};