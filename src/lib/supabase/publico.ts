import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./tipos";

// Cliente sin cookies (rol anon): solo para datos públicos dentro de `use cache`,
// donde no se puede leer la sesión. RLS limita lo que devuelve.
export function clientePublico() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
