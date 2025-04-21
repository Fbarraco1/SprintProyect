export interface ITarea {
  id: string;
  nombre: string; // Cambiado de titulo a nombre
  descripcion: string;
  fechaCierre: string; // Cambiado de fechaLimite a fechaCierre
  estado: "pendiente" | "en progreso" | "completada";
}