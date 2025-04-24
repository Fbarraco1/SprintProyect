import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { tareaStore } from "../../../store/backLogStore";
import style from "./Modal.module.css";
import { ITarea } from "../../../types/ITarea";
import { useSprint } from "../../../hooks/useSprint";
import { sprintStore } from "../../../store/sprintStore";


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
  const { crearTareaSprint, putEditarTareaSprint } = useSprint();

  // Obtener el ID del sprint activo desde el store
  const sprintActivoId = sprintStore((state) => state.sprintActivo?.id);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!sprintActivoId) {
        console.error("El ID del sprint activo no está definido.");
        return;
      }

      // Verificar si hay una tarea activa (editar) o si se está creando una nueva tarea
      if (tareaActiva) {
        // Editar tarea existente
        await putEditarTareaSprint(sprintActivoId, formValues);
      } else {
        // Crear nueva tarea
        await crearTareaSprint(sprintActivoId, { ...formValues, id: new Date().toISOString() });
      }

      // Cerrar el modal y limpiar el formulario
      handleClose();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
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
