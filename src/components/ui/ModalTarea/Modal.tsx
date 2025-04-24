import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { tareaStore } from "../../../store/backLogStore";
import style from "./Modal.module.css";
import { ITarea } from "../../../types/ITarea";
import { useTarea } from "../../../hooks/useTareas";
import { tareaSchema } from "../../../schemas/tareaSchema";
import Swal from "sweetalert2";


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
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    useEffect(() => {
      if (tareaActiva) {
        setFormValues(tareaActiva);
      } else {
        setFormValues(initialState); // limpia el formulario al crear nueva tarea
      }
    }, [tareaActiva]);
  
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      const updatedValues = { ...formValues, [name]: value };
      setFormValues(updatedValues);
  
      // Validación instantánea para el campo usando Yup
      tareaSchema
        .validateAt(name, updatedValues)
        .then(() => {
          setFormErrors((prev) => ({ ...prev, [name]: "" }));
        })
        .catch((validationError: any) => {
          setFormErrors((prev) => ({ ...prev, [name]: validationError.message }));
        });
    };
  

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
    
      try {
        // Validamos todo el formulario; abortEarly: false recopila todos los errores.
        await tareaSchema.validate(formValues, { abortEarly: false });
    
        // Si la validación es exitosa, continúa con la acción correspondiente.
        if (tareaActiva) {
          putTareaEditar(formValues);
          Swal.fire("Tarea actualizada", "Los cambios se guardaron correctamente", "success");
        } else {
          crearTarea({ ...formValues, id: new Date().toISOString() });
          Swal.fire("Tarea creada", "La tarea se ha agregado correctamente", "success");
        }
    
        handleClose(); // Cierra el modal tras la validación exitosa.
      } catch (err: any) {
        // Capturamos y asignamos los errores a cada campo
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });
        setFormErrors(validationErrors);
    
        // 🔥 Cierra el modal antes de mostrar el error
        handleClose();
    
        // 🔥 Mostrar alerta con los mensajes de error
        Swal.fire({
          icon: "error",
          title: "Error en el formulario",
          html: Object.values(validationErrors).map(msg => <p>${msg}</p>).join(""),
        });
      }
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
              value={formValues.nombre}
              autoComplete="off"
              name="nombre"
            />
             {formErrors.nombre && (
              <span className={style.errorMsg}>{formErrors.nombre}</span>
            )}

            <textarea
              placeholder="Ingrese una descripción"
              onChange={handleChange}
              value={formValues.descripcion}
              name="descripcion"
            />
            {formErrors.descripcion && (
              <span className={style.errorMsg}>{formErrors.descripcion}</span>
            )}

            <input
              type="date"
              onChange={handleChange}
              value={formValues.fechaCierre}
              autoComplete="off"
              name="fechaCierre"
            />
            {formErrors.fechaCierre && (
              <span className={style.errorMsg}>{formErrors.fechaCierre}</span>
            )}

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