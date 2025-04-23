import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { tareaStore } from "../../../store/backLogStore";
import style from "./Modal.module.css";
import { ITarea } from "../../../types/ITarea";
import { useTarea } from "../../../hooks/useTareas";



const initialState: ITarea = {
  id: "",
  estado: "pendiente",
  nombre: "",
  descripcion: "",
  fechaCierre: "",
};
// Define the IModal interface
interface IModal {
  handleCloseModal: () => void;
}


export const Modal = ({ handleCloseModal }: IModal) => {
    const tareaActiva = tareaStore((state) => state.tareaActiva);
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);
    const { crearTarea, putTareaEditar } = useTarea();
  
    const [formValues, setFormValues] = useState<ITarea>(initialState);
  
    useEffect(() => {
      if (tareaActiva) {
        setFormValues(tareaActiva);
      } else {
        setFormValues(initialState); // limpia el formulario al crear nueva tarea
      }
    }, [tareaActiva]);
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (tareaActiva) {
        putTareaEditar(formValues);
      } else {
        crearTarea({ ...formValues, id: new Date().toISOString() });
      }
      handleClose(); 
    };
  
    const handleClose = () => {
      setFormValues(initialState); // resetea el formulario primero
      setTareaActiva(null);
      handleCloseModal();
      
    };
    

  return (
    <div className={style.containerPrincipalModal}>
      <div className={style.contentPopUp}>
        <div>
          <h3>{tareaActiva ? "Editar tarea" : "Crear Tarea"}</h3>
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
            <textarea
              placeholder="Ingrese una descripción"
              onChange={handleChange}
              required
              value={formValues.descripcion}
              name="descripcion"
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
            <button type="button" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit">
              {tareaActiva ? "Editar tarea" : "Crear tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
