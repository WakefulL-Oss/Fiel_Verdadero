import { z } from "zod";

export const correoSchema = z.object({
  correo: z.string().trim().toLowerCase().max(254).pipe(z.email("Correo no válido")),
});

export const codigoSchema = correoSchema.extend({
  codigo: z.string().trim().regex(/^\d{6,8}$/, "Código no válido"),
});
