import Link from "next/link";
import { ESTILO_BOTON } from "@/components/Formulario";
import { cerrarSesion } from "../actions";
import { obtenerUsuario } from "../queries";

export async function BotonSesion() {
  const usuario = await obtenerUsuario();

  if (!usuario) {
    return (
      <div className="flex gap-2">
        <Link href="/login" className={ESTILO_BOTON.secundarioChico}>
          Entrar
        </Link>
        <Link href="/registro" className={ESTILO_BOTON.primarioChico}>
          Crear cuenta
        </Link>
      </div>
    );
  }
  return (
    <form action={cerrarSesion}>
      <button className={ESTILO_BOTON.secundarioChico}>Salir</button>
    </form>
  );
}
