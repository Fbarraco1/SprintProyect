import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import style from "./ModalSprint.module.css"
import { sprintStore } from "../../../store/sprintStore"
import { useSprints } from "../../../hooks/useSprints"
import { ISprint } from "../../../types/ISprint"

type IModalSprint = {
    handleCloseModal: VoidFunction
}

const initialState: ISprint ={
    titulo: "",
    fechaInicio: "",
    fechaFin: "",
}
export const ModalSprint :FC<IModalSprint>= ({handleCloseModal}) => {
    const sprintActivo = sprintStore((state)=> state.sprintActivo)
    const setSprintActivo = sprintStore((state)=> state.setSprintActivo)

    const {crearSprint, putSprintEditar} = useSprints()

    const [formValues, setFormValues] = useState<ISprint>(initialState)

 // Actualiza esto
    useEffect(() => {
        if (sprintActivo) {
            setFormValues(sprintActivo)
        } else {
            setFormValues(initialState) // Resetea el formulario si no hay sprint activo
        }
    }, [sprintActivo]) // Agrega sprintActivo como dependencia

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target
        setFormValues((prev)=>({...prev, [`${name}`]: value}))
    }

    const handleSubmit = (e: FormEvent)=>{
        e.preventDefault();
        if (sprintActivo) {
            putSprintEditar(formValues);
        }else{
            crearSprint({...formValues, id: new Date().toDateString()});
        }
        setSprintActivo(null);
        handleCloseModal();
    }
    return (
    <div className={style.containerPrincipalModal}>
        <div className={style.contentPopUp}>
            <div>
                <h3>{sprintActivo ? "Editar Sprint" : "Crear Sprint"}</h3>
            </div>
            <form onSubmit={handleSubmit} className={style.formContent}>
                <div>
                    <input placeholder="Ingrese un titulo" onChange={handleChange} type="text" required value={formValues.titulo} autoComplete="off" name='titulo'/>
                    <input type="date" onChange={handleChange} required value={formValues.fechaInicio} autoComplete="off" name='fechaInicio'/>
                    <input type="date" onChange={handleChange} required value={formValues.fechaFin} autoComplete="off" name='fechaFin'/>
                </div>
                <div className={style.buttonCard}>
                    <button onClick={handleCloseModal}>Cancelar</button>
                    <button type="submit"> {sprintActivo ? "Editar Sprint" : "Crear Sprint"}</button>
                </div>
            </form>
        </div>
    </div>
  )
}
