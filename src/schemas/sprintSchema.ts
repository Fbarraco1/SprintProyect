import * as Yup from "yup";

export const sprintSchema = Yup.object().shape({
  nombre: Yup.string()
    .required("El nombre del Sprint es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres"),

  fechaInicio: Yup.date()
    .required("La fecha de inicio es obligatoria")
    .typeError("Debe ingresar una fecha válida"),

  fechaCierre: Yup.date()
    .required("La fecha de cierre es obligatoria")
    .typeError("Debe ingresar una fecha válida")
    .when("fechaInicio", (fechaInicio, schema) => 
      fechaInicio 
        ? schema.min(fechaInicio, "La fecha de cierre debe ser posterior a la fecha de inicio")
        : schema
    ),
});
