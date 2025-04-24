import { ChangeEvent, FC, FormEvent, useState } from "react";
import style from "./ModalTareaSprint.module.css";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { tareaSchema } from "../../../schemas/tareaSchema";

type IModalSprint = {
  handleCloseModal: VoidFunction;
  handleAddTask: (newTask: any) => void;
};

const initialState = {
  id: "",
  nombre: "",
  descripcion: "",
  fechaCierre: "",
  estado: "pendiente",
};

export const ModalSprint: FC<IModalSprint> = ({
  handleCloseModal,
  handleAddTask,
}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);

    try {
      await tareaSchema.validateAt(name, updatedValues);
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err: any) {
      setFormErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const generateUniqueId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await tareaSchema.validate(formValues, { abortEarly: false });

      const newTask = { ...formValues, id: generateUniqueId() };
      handleAddTask(newTask);

      Swal.fire("Tarea creada", "La tarea se ha agregado correctamente", "success");
      handleCloseModal();
    } catch (err: any) {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setFormErrors(validationErrors);
      handleCloseModal();
      Swal.fire({
        icon: "error",
        title: "Error en el formulario",
        html: Object.values(validationErrors).map(msg => `<p>${msg}</p>`).join(""),
      });
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
              value={formValues.nombre}
              autoComplete="off"
              name="nombre"
            />
            {formErrors.nombre && (
              <span className={style.errorMsg}>{formErrors.nombre}</span>
            )}

            <input
              placeholder="Ingrese una descripción para la tarea"
              type="text"
              onChange={handleChange}
              value={formValues.descripcion}
              autoComplete="off"
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