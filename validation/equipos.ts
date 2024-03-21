import {z} from "zod";


export const equipoValidatorSchema = z.object({
    tipo: z.string().min(1, "Este campo es requerido."),
    marca: z.string().min(1, "Este campo es requerido."),
    modelo: z.string().min(1, "Este campo es requerido."),
    serial: z.string().min(1, "Este campo es requerido."),
    almacenamiento: z.string(),
    memoria_Ram: z.string(),
    procesador: z.string(),
    so: z.string(),
    nombre_Equipo: z.string(),
    observaciones: z.string().nullable()
})

export type EquipoValidatorType = z.infer<typeof equipoValidatorSchema>;
