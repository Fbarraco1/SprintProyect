import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import style from "./ModalSprint.module.css"
import { sprintStore } from "../../../store/sprintStore"
import { ISprint } from "../../../types/ISprint"
import { useSprint } from "../../../hooks/useSprint"

type IModalSprint = {
    handleCloseModal: VoidFunction
}

const initialState: ISprint = {
    id: "",
    nombre: "",
    fechaInicio: "",
    fechaCierre: "",
}

export const ModalSprint: FC<IModalSprint> = ({ handleCloseModal }) => {
    const sprintActivo = sprintStore((state) => state.sprintActivo)
    const setSprintActivo = sprintStore((state) => state.setSprintActivo)

    const { crearSprint, putSprintEditar } = useSprint()

    const [formValues, setFormValues] = useState<ISprint>(initialState)

    useEffect(() => {
        if (sprintActivo) {
            setFormValues(sprintActivo)
        } else {
            setFormValues(initialState) // Resetea el formulario si no hay sprint activo
        }
    }, [sprintActivo])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    const generateUniqueId = (): string => {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            if (sprintActivo) {
                await putSprintEditar(formValues);
            } else {
                const nuevoSprint = {
                    ...formValues,
                    id: generateUniqueId()
                };
                await crearSprint(nuevoSprint);
            }
            setSprintActivo(null);
            handleCloseModal();
        } catch (error) {
            console.error("Error al procesar el formulario:", error);
        }
    }

    return (
        <div className={style.containerPrincipalModal}>
            <div className={style.contentPopUp}>
                <div>
                    <h3>{sprintActivo ? "Editar Sprint" : "Crear Sprint"}</h3>
                </div>
                <form onSubmit={handleSubmit} className={style.formContent}>
                    <div>
                        <input 
                            placeholder="Ingrese un título" 
                            onChange={handleChange} 
                            type="text" 
                            required 
                            value={formValues.nombre} 
                            autoComplete="off" 
                            name="nombre"
                        />
                        <input 
                            type="date" 
                            onChange={handleChange} 
                            required 
                            value={formValues.fechaInicio} 
                            autoComplete="off" 
                            name="fechaInicio"
                        />
                        <input 
                            type="date" 
                            onChange={handleChange} 
                            required 
                            value={formValues.fechaCierre} 
                            autoComplete="off" 
                            name="fechaCierre"
                        />
                    </div>
                    <div className={style.buttonCard}>
                        <button type="button" onClick={handleCloseModal}>Cancelar</button>
                        <button type="submit">{sprintActivo ? "Editar Sprint" : "Crear Sprint"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}