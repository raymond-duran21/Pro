export interface LinkItem {
  name: string;
  url: string;
  rol:string
}

export interface Empleados{
  id: number;
  nombre : string;
  cedula_Pasaporte : string;
  puesto : string;
  departamento : string;
}

export interface AllEmpleados{
    Data: Empleados[];
}

export interface Equipos {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  almacenamiento: string;
  memoria_Ram: string;
  procesador: string;
  so: string;
  nombre_Equipo: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
  fechaAsignacion: Date;
}
export interface AllEquipos{
  count: number;
  Data: Equipos[];
}

export interface Auditoria {
  id: number;
  valor_Anterior: string;
  valor_Nuevo: string;
  accion: string;
  usuario: string;
  fecha: Date
}

export interface CreateEmpleados {
  nombre : string;
  cedula_Pasaporte : string;
  puesto : string;
  departamento : string;
}

export interface UpdateEmpleado{
  id: number;
  puesto: string;
  departamento: string;
}

export interface CreateEquipo {
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  almacenamiento: string;
  memoria_Ram: string;
  procesador: string;
  so: string;
  nombre_Equipo: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
}

export interface UpdateEquipo {
  id: number;
  almacenamiento: string;
  memoria_Ram: string;
  so: string;
  nombre_Equipo: string;
  observaciones: string;
}

export interface Asignaciones {
  id:number,
  empleadoId: string,
  nombreEmpleado: string,
  departamento: string,
  equipoId: string,
  nombre_Equipo: string,
  estado: string,
  fecha_Asignacion: Date,
}

export interface CreateAsignaciones {
  empleadoId: string,
  nombreEmpleado: string,
  departamento: string,
  equipoId: string,
  nombre_Equipo: string,
}