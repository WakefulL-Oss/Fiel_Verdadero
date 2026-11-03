import { z } from "zod";

export const correoSchema = z.object({
  correo: z.string().trim().toLowerCase().max(254).pipe(z.email("Correo no válido")),
});

const passwordSchema = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .max(72, "Máximo 72 caracteres")
  .regex(/[A-Za-z]/, "Incluye al menos una letra")
  .regex(/\d/, "Incluye al menos un número");

export const loginSchema = correoSchema.extend({
  password: z.string().min(1, "Escribe tu contraseña").max(72),
});

export const registroSchema = correoSchema.extend({
  nombre: z.string().trim().min(2, "Escribe tu nombre").max(80, "Máximo 80 caracteres"),
  password: passwordSchema,
});

export const codigoSchema = correoSchema.extend({
  codigo: z.string().trim().regex(/^\d{6,8}$/, "Código no válido"),
});

export const nuevaPasswordSchema = z.object({ password: passwordSchema });
