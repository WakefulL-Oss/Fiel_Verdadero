import { fechaCorta } from "@/lib/fecha";
import { obtenerPropios } from "../queries";
import type { EstadoPropio } from "../types";

export async function ListaPropios({
  estado,
  vacio,
  limite,
}: {
  estado: EstadoPropio;
  vacio: string;
  limite?: number;
}) {
  const sermones = await obtenerPropios(estado, limite);
  if (sermones.length === 0) return <p className="px-4 py-3 text-sm text-tenue">{vacio}</p>;
  return (
    <ul className="divide-y divide-linea">
      {sermones.map((s) => (
        <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
          <span className="truncate text-sm text-foreground">{s.titulo}</span>
          <time dateTime={s.actualizado_en} className="shrink-0 text-xs text-tenue">
            {fechaCorta(s.actualizado_en)}
          </time>
        </li>
      ))}
    </ul>
  );
}
