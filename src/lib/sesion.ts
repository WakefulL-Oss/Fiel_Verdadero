import "server-only";
import { cacheLife } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export type UsuarioActual = { id: string; correo: string };

// getClaims verifica la firma del JWT; basta para lecturas, que además protege RLS.
// Las acciones sensibles (cambiar contraseña o correo) usan getUser.
// La caché privada vive solo en el navegador de esta sesión, nunca en el servidor.
export async function obtenerUsuario(): Promise<UsuarioActual | null> {
  "use cache: private";
  cacheLife({ stale: 300 });

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims.sub) return null;
  return { id: data.claims.sub, correo: data.claims.email ?? "" };
}

export async function exigirUsuario(desde = "/dashboard") {
  const usuario = await obtenerUsuario();
  if (!usuario) redirect(`/login?next=${encodeURIComponent(desde)}`);
  return usuario;
}
