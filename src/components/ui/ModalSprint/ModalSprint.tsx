import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import style from "./ModalSprint.module.css";
import { sprintStore } from "../../../store/sprintStore";
import { ISprint } from "../../../types/ISprint";
import { useSprint } from "../../../hooks/useSprint";
import Swal from "sweetalert2";

import { sprintSchema } from "../../../schemas/sprintSchema"; // Importa tu schema

const initialState: ISprint = {
  id: "",
  nombre: "",
  fechaInicio: "",
  fechaCierre: "",
};

type IModalSprint = {
  handleCloseModal: VoidFunction;
};

export const ModalSprint: FC<IModalSprint> = ({ handleCloseModal }) => {
  const sprintActivo = sprintStore((state) => state.sprintActivo);
  const setSprintActivo = sprintStore((state) => state.setSprintActivo);
  const { crearSprint, putSprintEditar } = useSprint();

  const [formValues, setFormValues] = useState<ISprint>(initialState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (sprintActivo) {
      setFormValues(sprintActivo);
    } else {
      setFormValues(initialState);
    }
  }, [sprintActivo]);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);

    try {
      await sprintSchema.validateAt(name, updatedValues);
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
      await sprintSchema.validate(formValues, { abortEarly: false });
  
      if (sprintActivo) {
        await putSprintEditar(formValues);
        Swal.fire("Sprint actualizado", "Los cambios se guardaron correctamente", "success");
      } else {
        await crearSprint({ ...formValues, id: generateUniqueId() });
        Swal.fire("Sprint creado", "El Sprint se ha creado correctamente", "success");
      }
  
      setSprintActivo(null);
      handleCloseModal();
    } catch (err: any) {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setFormErrors(validationErrors);
  
      // 🔥 Mostrar alerta de error con los mensajes de validación
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
          <h3>{sprintActivo ? "Editar Sprint" : "Crear Sprint"}</h3>
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
            <input
              type="date"
              onChange={handleChange}
              value={formValues.fechaInicio}
              autoComplete="off"
              name="fechaInicio"
            />
            {formErrors.fechaInicio && (
              <span className={style.errorMsg}>{formErrors.fechaInicio}</span>
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
            <button type="button" onClick={handleCloseModal}>Cancelar</button>
            <button type="submit">{sprintActivo ? "Editar Sprint" : "Crear Sprint"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};