import Link from "next/link";
import { Suspense } from "react";
import { ESTILO_BOTON } from "@/components/Formulario";
import { obtenerUsuario } from "../queries";

function Visitante({ grande }: { grande: boolean }) {
  const entrar = (
    <Link href="/login" className={grande ? ESTILO_BOTON.secundarioGrande : ESTILO_BOTON.secundarioChico}>
      Entrar
    </Link>
  );
  const registro = (
    <Link href="/registro" className={grande ? ESTILO_BOTON.primario : ESTILO_BOTON.primarioChico}>
      {grande ? "Crear cuenta gratis" : "Crear cuenta"}
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
    <div className="flex gap-2">
      {entrar}
      <span className="hidden sm:inline-flex">{registro}</span>
    </div>
  );
}

async function SegunSesion({ grande }: { grande: boolean }) {
  const usuario = await obtenerUsuario();
  if (!usuario) return <Visitante grande={grande} />;
  return (
    <Link href="/dashboard" className={grande ? ESTILO_BOTON.primario : ESTILO_BOTON.primarioChico}>
      {grande ? "Ir al dashboard" : "Dashboard"}
    </Link>
  );
}

export function BotonSesion({ grande = false }: { grande?: boolean }) {
  return (
    <Suspense fallback={<Visitante grande={grande} />}>
      <SegunSesion grande={grande} />
    </Suspense>
  );
}
