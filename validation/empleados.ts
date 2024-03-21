import {z} from "zod";

export const empleadoValidatorSchema = z.object({
    nombre: z.string().min(10, "debe colocar el nombre completo.").max(200),
    cedula_Pasaporte: z.string().min(9, "Valide que la cedula tiene todos los caracteres.").max(15, "La cedula o pasaporte no pude ser mayor a 11 o 15 respectivamente."),
    puesto: z.string(),
    departamento: z.string()
})

export type EmpleadoValidatorType = z.infer<typeof empleadoValidatorSchema>;