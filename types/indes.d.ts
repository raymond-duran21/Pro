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
  codigo_Invi_Mived:string;
  codigo_Bienes_Nacionales: string;
  disco_Duro: string;
  memoria_Ram: string;
  procesador: string;
  so: string;
  nombre_Equipo: string;
  dominio_Azure: string;
  direccion: string;
  departamento: string;
  programas: string;
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
  codigo_Invi_Mived:string;
  codigo_Bienes_Nacionales: string;
  disco_Duro: string;
  memoria_Ram: string;
  procesador: string;
  so: string;
  nombre_Equipo: string;
  dominio_Azure: string;
  direccion: string;
  departamento: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
}

export interface UpdateEquipo {
  id: number;
  disco_Duro: string;
  memoria_Ram: string;
  so: string;
  nombre_Equipo: string;
  dominio_Azure: string;
  direccion: string;
  departamento: string;
  observaciones: string;
}

export interface Asignaciones {
  id:number,
  empleadoId: string,
  nombreEmpleado: string,
  tipo: string,
  departamento: string,
  equipoId: string,
  estado: string,
  fecha_Asignacion: Date,
}

export interface CreateAsignaciones {
  empleadoId: string,
  nombreEmpleado: string,
  tipo: string,
  departamento: string,
  equipoId: string,
}

export interface Docking {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  codigo_Invi_Mived:string;
  codigo_Bienes_Nacionales: string;
  despacho_Ministro_Viceministerio: string;
  direccion: string;
  departamento: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
  fechaAsignacion: Date;
}

export interface CreateDocking {
  marca: string;
  modelo: string;
  serial: string;
  codigo_Invi_Mived:string;
  codigo_Bienes_Nacionales: string;
  despacho_Ministro_Viceministerio: string;
  direccion: string;
  departamento: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
}

export interface UpdateDocking {
  id: number;
  despacho_Ministro_Viceministerio: string;
  direccion: string;
  departamento: string;
  observaciones: string;
}

export interface ImpresoraLocal {
  id: number;
  tipo: string;
  tipo_Imp: string;
  marca: string;
  modelo: string;
  serial: string;
  codigo_Invi_Mived:string;
  codigo_Bienes_Nacionales: string;
  direccion: string;
  departamento: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
  obsoleto: string;
  fechaAsignacion: Date;
}

export interface CreateImpresoraLocal {
  tipo_Imp: string;
  marca: string;
  modelo: string;
  serial: string;
  codigo_Invi_Mived:string;
  codigo_Bienes_Nacionales: string;
  direccion: string;
  departamento: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
  obsoleto: string;
}

export interface UpdateImpresoraLocal {
  id: number;
  direccion: string;
  departamento: string;
  observaciones: string;
  obsoleto: string;
}

export interface Monitor {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  pulgadas: string;
  serial: string;
  codigo_Invi_Mived:string;
  codigo_Bienes_Nacionales: string;
  direccion: string;
  departamento: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
  fechaAsignacion: Date;
}

export interface CreateMonitor {
  marca: string;
  modelo: string;
  pulgadas: string;
  serial: string;
  codigo_Invi_Mived:string;
  codigo_Bienes_Nacionales: string;
  direccion: string;
  departamento: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
}

export interface UpdateMonitor {
  id: number;
  direccion: string;
  departamento: string;
  observaciones: string;
}

export interface Scanner_Ups {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  codigo_Invi_Mived:string;
  codigo_Bienes_Nacionales: string;
  direccion: string;
  departamento: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
  fechaAsignacion: Date;
}

export interface CreateScanner_Ups {
  marca: string;
  modelo: string;
  serial: string;
  codigo_Invi_Mived:string;
  codigo_Bienes_Nacionales: string;
  direccion: string;
  departamento: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
}

export interface UpdateScanner_Ups {
  id: number;
  direccion: string;
  departamento: string;
  observaciones: string;
}

export interface AsignacionEquipo {
  serial: string;
}

export interface Programas {
  id: number;
  programa: string;
  estado: string;
}

export interface CreatePrograma {
  programa: string;
  estado: string;
}

export interface AsignarProgramasEquipos{
  equipoId: number;
  programaId: number[];
}

export interface Flotas {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  numero: string;
  datos: string;
  direccion: string;
  departamento: string;
  edificio:string;
  observaciones: string;
  empleados_Cedula: string;
  estado: string;
  fecha_Asignacion: Date,
}

export interface CreateFlota {
  marca: string;
  modelo: string;
  serial: string;
  numero: string;
  datos: string;
  direccion: string;
  departamento: string;
  edificio:string;
  observaciones: string;
}

export interface UpdateFlota {
  id: number;
  numero: string;
  datos: string;
  direccion: string;
  edificio:string;
  observaciones: string;
}

export interface Tabletas {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  codigo_SIAB: string;
  numero: string;
  direccion: string;
  departamento: string;
  edificio:string;
  fechaAdquisicion: Date;
  observaciones: string;
  empleados_Cedula: string;
  estado: string;
  fecha_Asignacion: Date,
}

export interface CreateTableta {
  marca: string;
  modelo: string;
  serial: string;
  codigo_SIAB: string;
  numero: string;
  direccion: string;
  departamento: string;
  edificio:string;
  fechaAdquisicion: Date;
  observaciones: string;
}

export interface UpdateTableta {
  id: number;
  numero: string;
  direccion: string;
  edificio:string;
  observaciones: string;
}

export interface AuditoriaResult{
  data: Auditoria[];
}

export interface EquipoWithPrograma {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  codigo_Invi_Mived:string;
  codigo_Bienes_Nacionales: string;
  disco_Duro: string;
  memoria_Ram: string;
  procesador: string;
  so: string;
  nombre_Equipo: string;
  dominio_Azure: string;
  direccion: string;
  departamento: string;
  empleados_Cedula: string;
  observaciones: string;
  estado: string;
  fechaAsignacion: string;
  programas: Programas[]
}

export interface Other {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  direccion: string;
  departamento: string;
  empleados_Cedula: string;
  fechaAsignacion: string;
  observaciones: string;
  estado: string;
}

export interface ViewFlotas {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  numero: string;
  datos: string;
  direccion: string;
  departamento: string;
  edificio:string;
  observaciones: string;
  empleados_Cedula: string;
  estado: string;
  fecha_Asignacion: string,
}

export interface ViewTabletas {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  codigo_SIAB: string;
  numero: string;
  direccion: string;
  departamento: string;
  edificio:string;
  fechaAdquisicion: string;
  observaciones: string;
  empleados_Cedula: string;
  estado: string;
  fecha_Asignacion: string,
}