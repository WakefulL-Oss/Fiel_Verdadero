import Link from "next/link";
import { cerrarSesion } from "../actions";
import { obtenerUsuario } from "../queries";

export async function BotonSesion() {
  const usuario = await obtenerUsuario();
  const estilo = "text-sm text-muted hover:text-accent";

  if (!usuario) {
    return (
      <Link href="/login" className={estilo}>
        Entrar
      </Link>
    );
  }
  return (
    <form action={cerrarSesion}>
      <button className={estilo}>Salir</button>
    </form>
  );
}
