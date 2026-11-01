import { createClient } from "@/lib/supabase/server";

export async function obtenerUsuario() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}
