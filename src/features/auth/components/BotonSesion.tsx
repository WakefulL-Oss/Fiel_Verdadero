import Link from "next/link";
import { Suspense } from "react";
import { boton } from "@/components/Formulario";
import { obtenerPerfil } from "../queries";
import { MenuCuenta } from "./MenuCuenta";

function Visitante({ grande }: { grande: boolean }) {
  const tam = grande ? "grande" : "chico";
  const entrar = (
    <Link href="/login" className={boton("normal", tam)}>
      Iniciar sesión
    </Link>
  );
  const registro = (
    <Link href="/registro" className={boton("primario", tam)}>
      Comienza aquí
    </Link>
  );
  if (grande) {
    return (
      <div className="flex gap-2">
        {registro}
        {entrar}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      {entrar}
      <span className="hidden sm:inline-flex">{registro}</span>
    </div>
  );
}

async function SegunSesion({ grande, dashboard }: { grande: boolean; dashboard: boolean }) {
  const perfil = await obtenerPerfil();
  if (!perfil) return <Visitante grande={grande} />;
  if (grande) {
    return (
      <Link href="/dashboard" className={boton("primario", "grande")}>
        Ir al dashboard
      </Link>
    );
  }
  return (
    <div className="flex items-center gap-2">
      {dashboard && (
        <span className="hidden sm:inline-flex">
          <Link href="/dashboard" className={boton("suave", "chico")}>
            Dashboard
          </Link>
        </span>
      )}
      <MenuCuenta nombre={perfil.nombre} correo={perfil.correo} />
    </div>
  );
}

// Como en supabase.com: mientras se resuelve la sesión el espacio queda reservado pero
// invisible, y el resultado aparece con un fundido. Así nunca se ve "Iniciar sesión" a quien ya entró.
export function BotonSesion({ grande = false, dashboard = true }: { grande?: boolean; dashboard?: boolean }) {
  return (
    <Suspense
      fallback={
        <div className="invisible">
          <Visitante grande={grande} />
        </div>
      }
    >
      <div className="aparecer">
        <SegunSesion grande={grande} dashboard={dashboard} />
      </div>
    </Suspense>
  );
}
