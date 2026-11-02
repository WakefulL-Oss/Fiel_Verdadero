import { ESTILO_BOTON } from "@/components/Formulario";
import { cerrarSesion } from "../actions";

export function BotonSalir() {
  return (
    <form action={cerrarSesion}>
      <button className={ESTILO_BOTON.secundarioChico}>Salir</button>
    </form>
  );
}
