import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const obtenerUsuario = cache(async () => {
  await connection();
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
});

export const obtenerPerfil = cache(async (id: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("perfiles")
    .select("nombre_completo")
    .eq("id", id)
    .single();
  return data;
});
