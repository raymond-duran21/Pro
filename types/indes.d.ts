export interface LinkItem {
  name: string;
  url: string;
  rol:string
}

export interface Empleados{
  id: number;
  nombre : string;
  cedula_Pasaporte : string;
  entidad: string;
  direccion : string;
  departamento : string;
  equipos : List<>
}

export interface AllEmpleados{
    count: Number;
    Data: Empleados[];
}

export interface Equipos {
  id: Number;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  almacenamiento: string;
  memoria_Ram: string;
  procesador: string;
  so: string;
  nombre_Equipo: string;
  empleadosId: Number;
  observaciones: string;
  fechaAsignacion: Date
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