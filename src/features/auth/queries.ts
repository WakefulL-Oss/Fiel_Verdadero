import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { obtenerUsuario } from "@/lib/sesion";
import { clientePublico } from "@/lib/supabase/publico";

export type Perfil = { nombre: string; correo: string };

export async function obtenerPerfil(): Promise<Perfil | null> {
  const usuario = await obtenerUsuario();
  if (!usuario) return null;
  const nombre = await nombrePorId(usuario.id);
  return { nombre, correo: usuario.correo };
}

// Sin exportar: el id sale siempre de la sesión, nunca de quien llama.
async function nombrePorId(id: string) {
  "use cache";
  cacheTag(`perfil:${id}`);
  cacheLife("hours");

  const { data, error } = await clientePublico()
    .from("perfiles")
    .select("nombre_completo")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data?.nombre_completo ?? "";
}
