import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface ISprintStore {
    sprints: ISprint[]
    sprintActivo: ISprint | null
    setSprintActivo: (sprintActivo: ISprint | null) => void
    setArraySprint: (arrayDeSprint: ISprint[]) => void
    agregarNuevoSprint: (nuevoSprint: ISprint) => void
    editarUnSprint: (sprintActualizado: ISprint) => void
    eliminarUnSprint: (idSprint: string) => void
    eliminarTareaDeSprint: (sprintId: string, tareaId: string) => void
}

export const sprintStore = create<ISprintStore>((set) => ({
    sprints: [],
    sprintActivo: null,

    setArraySprint: (arrayDeSprint) => set(() => ({ sprints: arrayDeSprint })),
    agregarNuevoSprint: (nuevoSprint) => set((state) => ({ sprints: [...state.sprints, nuevoSprint] })),
    editarUnSprint: (sprintEditado) => 
        set((state) => {
            const arregloSprints = state.sprints.map((sprint) => 
                sprint.id === sprintEditado.id ? { ...sprint, ...sprintEditado } : sprint
            );
            return { sprints: arregloSprints };
        }),

    eliminarUnSprint: (idSprint) => 
        set((state) => {
            const arregloSprints = state.sprints.filter((sprint) => sprint.id !== idSprint);
            return { sprints: arregloSprints };
        }),

    setSprintActivo: (sprintActivoIn) => set(() => ({ sprintActivo: sprintActivoIn })),
    eliminarTareaDeSprint: (sprintId, tareaId) =>
        set((state) => ({
          sprints: state.sprints.map((sprint) =>
            sprint.id === sprintId
              ? { ...sprint, tareas: (sprint.tareas ?? []).filter((t) => t.id !== tareaId) }
              : sprint
          ),
        })),
      
}))