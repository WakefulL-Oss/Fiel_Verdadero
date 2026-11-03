import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PRIVADO = "/dashboard";

function esPrivada(pathname: string) {
  return pathname === PRIVADO || pathname.startsWith(`${PRIVADO}/`);
}

function aLogin(request: NextRequest) {
  const login = request.nextUrl.clone();
  login.pathname = "/login";
  login.search = `?next=${encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)}`;
  return NextResponse.redirect(login);
}

// Filtro optimista: la verificación real vive junto a los datos (lib/sesion.ts) y en RLS.
export async function proxy(request: NextRequest) {
  const privada = esPrivada(request.nextUrl.pathname);
  const conSesion = request.cookies.getAll().some((c) => c.name.startsWith("sb-"));
  if (!conSesion) return privada ? aLogin(request) : NextResponse.next();

  let response = NextResponse.next({ request });
  let cabeceras: Record<string, string> = {};
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
          cabeceras = headers;
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  if (!data?.claims.sub && privada) {
    const redireccion = aLogin(request);
    response.cookies.getAll().forEach((c) => redireccion.cookies.set(c));
    response = redireccion;
  }
  // Una respuesta que renueva la sesión nunca debe quedar en una caché compartida.
  Object.entries(cabeceras).forEach(([clave, valor]) => response.headers.set(clave, valor));
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest.webmanifest|robots.txt|sitemap.xml|marca/|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)",
  ],
};
