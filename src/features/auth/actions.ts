"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { rutaSegura } from "@/lib/ruta-segura";
import {
  codigoSchema,
  correoSchema,
  loginSchema,
  nuevaPasswordSchema,
  registroSchema,
} from "./schema";

export type EstadoAuth = {
  paso: "datos" | "codigo" | "password";
  correo?: string;
  nombre?: string;
  error?: string;
  aviso?: string;
};

const GENERICO = "No pudimos completar la acción. Intenta de nuevo.";

function mensaje(codigo?: string, porDefecto = GENERICO) {
  if (codigo === "over_request_rate_limit" || codigo === "over_email_send_rate_limit") {
    return "Demasiados intentos. Espera un minuto.";
  }
  if (codigo === "captcha_failed") return "Verificación fallida. Inténtalo de nuevo.";
  return porDefecto;
}

function captchaDe(formData: FormData) {
  return formData.get("captcha")?.toString() || undefined;
}

function correoDe(formData: FormData) {
  return String(formData.get("correo") ?? "");
}

export async function iniciarSesion(
  _previo: EstadoAuth,
  formData: FormData,
): Promise<EstadoAuth> {
  const datos = loginSchema.safeParse({
    correo: formData.get("correo"),
    password: formData.get("password"),
  });
  if (!datos.success) {
    return { paso: "datos", correo: correoDe(formData), error: datos.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: datos.data.correo,
    password: datos.data.password,
    options: { captchaToken: captchaDe(formData) },
  });
  if (error) {
    if (error.code === "email_not_confirmed") {
      redirect(`/registro?confirmar=${encodeURIComponent(datos.data.correo)}`);
    }
    return {
      paso: "datos",
      correo: datos.data.correo,
      error: mensaje(error.code, "Correo o contraseña incorrectos"),
    };
  }
  redirect(rutaSegura(formData.get("next")?.toString()));
}

export async function registrar(
  _previo: EstadoAuth,
  formData: FormData,
): Promise<EstadoAuth> {
  const nombre = String(formData.get("nombre") ?? "");
  const datos = registroSchema.safeParse({
    nombre,
    correo: formData.get("correo"),
    password: formData.get("password"),
    acepto: formData.get("acepto"),
  });
  if (!datos.success) {
    return { paso: "datos", nombre, correo: correoDe(formData), error: datos.error.issues[0].message };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: datos.data.correo,
    password: datos.data.password,
    options: { captchaToken: captchaDe(formData), data: { full_name: datos.data.nombre } },
  });
  if (error) {
    return {
      paso: "datos",
      nombre,
      correo: datos.data.correo,
      error: mensaje(
        error.code,
        error.code === "weak_password" ? "La contraseña es muy débil" : GENERICO,
      ),
    };
  }
  if (data.session) redirect("/");
  return { paso: "codigo", correo: datos.data.correo };
}

export async function verificarRegistro(
  _previo: EstadoAuth,
  formData: FormData,
): Promise<EstadoAuth> {
  const datos = codigoSchema.safeParse({
    correo: formData.get("correo"),
    codigo: formData.get("codigo"),
  });
  if (!datos.success) {
    return { paso: "codigo", correo: correoDe(formData), error: datos.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email: datos.data.correo,
    token: datos.data.codigo,
    type: "signup",
  });
  if (error) {
    return { paso: "codigo", correo: datos.data.correo, error: "Código incorrecto o vencido" };
  }
  redirect("/");
}

export async function reenviarCodigo(
  _previo: EstadoAuth,
  formData: FormData,
): Promise<EstadoAuth> {
  const datos = correoSchema.safeParse({ correo: formData.get("correo") });
  if (!datos.success) return { paso: "codigo", error: datos.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: datos.data.correo,
    options: { captchaToken: captchaDe(formData) },
  });
  if (error) return { paso: "codigo", correo: datos.data.correo, error: mensaje(error.code) };
  return { paso: "codigo", correo: datos.data.correo, aviso: "Código reenviado" };
}

export async function pedirRecuperacion(
  _previo: EstadoAuth,
  formData: FormData,
): Promise<EstadoAuth> {
  const datos = correoSchema.safeParse({ correo: formData.get("correo") });
  if (!datos.success) return { paso: "datos", error: datos.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(datos.data.correo, {
    captchaToken: captchaDe(formData),
  });
  if (
    error?.code === "over_request_rate_limit" ||
    error?.code === "over_email_send_rate_limit" ||
    error?.code === "captcha_failed"
  ) {
    return { paso: "datos", correo: datos.data.correo, error: mensaje(error.code) };
  }
  return { paso: "codigo", correo: datos.data.correo };
}

export async function verificarRecuperacion(
  _previo: EstadoAuth,
  formData: FormData,
): Promise<EstadoAuth> {
  const datos = codigoSchema.safeParse({
    correo: formData.get("correo"),
    codigo: formData.get("codigo"),
  });
  if (!datos.success) {
    return { paso: "codigo", correo: correoDe(formData), error: datos.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email: datos.data.correo,
    token: datos.data.codigo,
    type: "recovery",
  });
  if (error) {
    return { paso: "codigo", correo: datos.data.correo, error: "Código incorrecto o vencido" };
  }
  return { paso: "password", correo: datos.data.correo };
}

export async function cambiarPassword(
  _previo: EstadoAuth,
  formData: FormData,
): Promise<EstadoAuth> {
  const datos = nuevaPasswordSchema.safeParse({ password: formData.get("password") });
  if (!datos.success) return { paso: "password", error: datos.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: datos.data.password });
  if (error) {
    return {
      paso: "password",
      error: error.code === "weak_password" ? "La contraseña es muy débil" : "Sesión vencida. Pide un código nuevo.",
    };
  }
  redirect("/");
}

export async function cerrarSesion() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
