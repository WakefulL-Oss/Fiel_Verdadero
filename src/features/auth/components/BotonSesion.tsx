import Link from "next/link";
import { ESTILO_BOTON } from "@/components/Formulario";
import { cerrarSesion } from "../actions";
import { obtenerUsuario } from "../queries";

export async function BotonSesion() {
  const usuario = await obtenerUsuario();

  if (!usuario) {
    return (
      <Link href="/login" className={`${ESTILO_BOTON.secundario} py-1.5`}>
        Entrar
      </Link>
    );
  }
  return (
    <form action={cerrarSesion}>
      <button className="text-sm text-muted hover:text-foreground">Salir</button>
    </form>
  );
}
