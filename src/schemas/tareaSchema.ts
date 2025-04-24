// schemas/tareaSchema.ts
import * as yup from 'yup';

export const tareaSchema = yup.object({
  nombre: yup.string()
    .required('El nombre de la tarea es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres'),
  descripcion: yup.string()
    .required('La descripción es obligatoria')
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  fechaCierre: yup.string()
    .required('La fecha de cierre es obligatoria')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'El formato de fecha debe ser DD-MM-AAAA'),
  estado: yup.string()
    .oneOf(['pendiente', 'en progreso', 'completada'], 'Estado inválido')
    .default('pendiente')
});