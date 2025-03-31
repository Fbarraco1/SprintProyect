import Swal from "sweetalert2";
import { useShallow } from "zustand/shallow";
import { sprintStore } from "../store/sprintStore";
import { ISprint } from "../types/ISprint";
import { editarSprint, eliminarSprintPorID, getAllSprints, postNuevoSprint } from "../http/sprint";

export const useSprints = () => {
const {sprints, setArraySprint, agregarNuevoSprint, eliminarUnSprint,editarUnSprint } = sprintStore(
        useShallow((state)=>({
        sprints: state.sprints,
        setArraySprint: state.setArraySprint,
        agregarNuevoSprint: state.agregarNuevoSprint,
        eliminarUnSprint: state.eliminarUnSprint,
        editarUnSprint: state.editarUnSprint
    })))        

    const getSprints = async() =>{
        const data = await getAllSprints();
        if(data) setArraySprint(data)
    }

    const crearSprint = async (nuevoSprint: ISprint)=>{
        agregarNuevoSprint(nuevoSprint)
        try {
            await postNuevoSprint(nuevoSprint)
            Swal.fire("Exito", "Sprint creado correctamente", "success")
        } catch (error) {
            console.log("Algo salio mal al crear un sprint")
            eliminarUnSprint(nuevoSprint.id!)
        }
    }

    const putSprintEditar = async (sprintEditado: ISprint)=>{
        const estadoPrevio = sprints.find((el)=> el.id == sprintEditado.id);
        editarUnSprint(sprintEditado);
        try {
            await editarSprint(sprintEditado)
            Swal.fire("Exito", "Sprint editado correctamente", "success")

        } catch (error) {
            if (estadoPrevio) editarUnSprint(estadoPrevio);
            console.log("Algo salio mal al editar un sprint")

        }
    }

    const eliminarSprint = async (idSprint: string)=>{
        const estadoPrevio = sprints.find((el)=> el.id == idSprint);
        const confirm = await Swal.fire({
            title: "Estas seguro?",
            text: "Esta accion no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"
        });

        if(!confirm.isConfirmed) return;
        eliminarSprint(idSprint)
        try {
            await eliminarSprintPorID(idSprint)
            Swal.fire("Eliminado", "Sprint fue eliminado correctamente", "success")

        } catch (error) {
            if (estadoPrevio) agregarNuevoSprint(estadoPrevio);
            console.log("Algo salio mal al eliminar")
        }
    }
  return {
    getSprints,crearSprint,putSprintEditar,eliminarSprint, sprints,
  }
}
