import { z } from "zod";

export const loginValidatorSchema = z.object({
  email: z.string().email("El correo ingresado no es válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener más de 6 caracteres")
    .max(100),
});

export type LoginValidatorType = z.infer<typeof loginValidatorSchema>;