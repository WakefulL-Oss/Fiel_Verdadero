import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { exigirUsuario } from "@/lib/sesion";
import { clientePublico } from "@/lib/supabase/publico";
import { createClient } from "@/lib/supabase/server";
import type { EstadoPropio } from "./types";

// Los errores se lanzan para que nunca quede en caché una lista vacía falsa.

// Público y compartido entre visitantes: caché del servidor, se invalida con la etiqueta.
export async function obtenerRecientes(limite = 20) {
  "use cache";
  cacheTag("sermones");
  cacheLife("minutes");

  const { data, error } = await clientePublico()
    .from("sermones")
    .select(
      "id, titulo, slug, resumen, pasaje_texto, publicado_en, autor:perfiles!sermones_autor_id_fkey(nombre_completo)",
    )
    .eq("estado", "publicado")
    .order("publicado_en", { ascending: false })
    .limit(limite);
  if (error) throw error;
  return data;
}

export async function obtenerPropios(estado: EstadoPropio, limite = 50) {
  const usuario = await exigirUsuario();
  return propiosDe(usuario.id, estado, limite);
}

// Sin exportar: el id sale de la sesión. Caché privada (solo el navegador del usuario).
// El filtro por autor hace falta aunque exista RLS, porque un moderador puede leer los de todos.
async function propiosDe(id: string, estado: EstadoPropio, limite: number) {
  "use cache: private";
  cacheTag(`sermones:${id}`);
  cacheLife({ stale: 300 });

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sermones")
    .select("id, titulo, slug, actualizado_en")
    .eq("autor_id", id)
    .eq("estado", estado)
    .order("actualizado_en", { ascending: false })
    .limit(limite);
  if (error) throw error;
  return data;
}
