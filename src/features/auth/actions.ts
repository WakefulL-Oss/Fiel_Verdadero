"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { rutaSegura } from "@/lib/ruta-segura";
import { codigoSchema, correoSchema } from "./schema";

export type EstadoLogin = {
  paso: "correo" | "codigo";
  correo?: string;
  error?: string;
};

export async function enviarCodigo(
  _previo: EstadoLogin,
  formData: FormData,
): Promise<EstadoLogin> {
  const datos = correoSchema.safeParse({ correo: formData.get("correo") });
  if (!datos.success) {
    return { paso: "correo", error: datos.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: datos.data.correo,
    options: { shouldCreateUser: true },
  });
  if (error) {
    return { paso: "correo", correo: datos.data.correo, error: "No pudimos enviar el código. Intenta en un minuto." };
  }
  return { paso: "codigo", correo: datos.data.correo };
}

export async function verificarCodigo(
  _previo: EstadoLogin,
  formData: FormData,
): Promise<EstadoLogin> {
  const datos = codigoSchema.safeParse({
    correo: formData.get("correo"),
    codigo: formData.get("codigo"),
  });
  if (!datos.success) {
    return {
      paso: "codigo",
      correo: String(formData.get("correo") ?? ""),
      error: datos.error.issues[0].message,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email: datos.data.correo,
    token: datos.data.codigo,
    type: "email",
  });
  if (error) {
    return { paso: "codigo", correo: datos.data.correo, error: "Código incorrecto o vencido" };
  }
  redirect(rutaSegura(formData.get("next")?.toString()));
}

export async function cerrarSesion() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
