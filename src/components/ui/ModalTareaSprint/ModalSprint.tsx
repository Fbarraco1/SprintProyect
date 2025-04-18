import { ChangeEvent, FC, FormEvent, useState } from "react";
import style from "./ModalSprint.module.css";

type IModalSprint = {
  handleCloseModal: VoidFunction;
  handleAddTask: (newTask: any) => void; // Función para agregar tareas al sprint
};

const initialState = {
  id: "",
  nombre: "",
  descripcion: "",
  fechaCierre: "",
  estado: "pendiente", // Estado inicial por defecto
};

export const ModalSprint: FC<IModalSprint> = ({
  handleCloseModal,
  handleAddTask,
}) => {
  const [formValues, setFormValues] = useState(initialState);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Generar un ID único para la tarea
  const generateUniqueId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      const newTask = {
        ...formValues,
        id: generateUniqueId(), // Generar un ID único para la tarea
      };

      handleAddTask(newTask); // Llamar a la función para agregar la tarea al sprint
      handleCloseModal(); // Cerrar el modal
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
    }
  };

  return (
    <div className={style.containerPrincipalModal}>
      <div className={style.contentPopUp}>
        <div>
          <h3>Crear Tarea</h3>
        </div>
        <form onSubmit={handleSubmit} className={style.formContent}>
          <div>
            <input
              placeholder="Ingrese un título para la tarea"
              onChange={handleChange}
              type="text"
              required
              value={formValues.nombre}
              autoComplete="off"
              name="nombre"
            />
            <input
              placeholder="Ingrese una descripción para la tarea"
              type="text"
              onChange={handleChange}
              required
              value={formValues.descripcion}
              autoComplete="off"
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
            <button type="button" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="submit">Crear Tarea</button>
          </div>
        </form>
      </div>
    </div>
  );
};