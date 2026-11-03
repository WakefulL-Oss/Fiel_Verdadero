import { obtenerRecientes } from "../queries";
import { TarjetaSermon } from "./TarjetaSermon";

export async function Recientes() {
  const sermones = await obtenerRecientes();
  if (sermones.length === 0) {
    return <p className="text-sm text-tenue">Aún no hay sermones publicados.</p>;
  }
  return (
    <div className="flex flex-col gap-3">
      {sermones.map((s) => (
        <TarjetaSermon key={s.id} sermon={s} />
      ))}
    </div>
  );
}
