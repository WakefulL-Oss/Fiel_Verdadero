const ROMANOS = ["I", "II", "III"];

const PUNTOS = [
  {
    titulo: "Dios busca lo que se ha perdido",
    cita: "Lucas 15:4",
    sub: ["El valor de una sola oveja", "La iniciativa siempre es del pastor"],
  },
  {
    titulo: "La búsqueda no se detiene hasta encontrar",
    cita: "Lucas 15:5",
    sub: ["«Hasta encontrarla»: la perseverancia de Dios", "Sobre sus hombros: cargar al débil"],
  },
  {
    titulo: "El cielo celebra el arrepentimiento",
    cita: "Lucas 15:7",
    sub: ["Un gozo que se comparte", "Nuestra respuesta: buscar con Él"],
  },
];

const PESTANAS = ["Estructura", "Versículo", "PDF"];

export function VistaPrevia() {
  return (
    <div
      aria-hidden
      className="entrada w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-surface text-left shadow-[0_24px_60px_-28px_rgb(58_30_60/0.35)]"
      style={{ "--retraso": "200ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border-suave px-4 py-3 sm:px-5">
        <span className="truncate font-display text-[17px] font-semibold text-foreground">
          El pastor que deja las 99
        </span>
        <span className="shrink-0 rounded-full border border-aviso-borde bg-aviso px-2 text-[11px] leading-5 font-medium text-aviso-texto">
          Borrador
        </span>
      </div>
      <div className="flex gap-0.5 border-b border-border-suave px-3 sm:px-4">
        {PESTANAS.map((p, i) => (
          <span
            key={p}
            className={`px-2.5 py-2.5 text-[13px] ${
              i === 0 ? "font-medium text-foreground shadow-[inset_0_-2px_0_var(--foreground)]" : "text-tenue"
            }`}
          >
            {p}
          </span>
        ))}
      </div>
      <ol className="flex flex-col gap-4 px-4 py-5 sm:px-5">
        {PUNTOS.map((p, i) => (
          <li key={p.titulo} className="flex gap-3">
            <span className="w-7 shrink-0 font-display text-[15px] font-semibold text-accent">
              {ROMANOS[i]}.
            </span>
            <div className="flex min-w-0 flex-col gap-1.5">
              <div className="flex flex-wrap items-baseline gap-x-2.5">
                <span className="text-[15px] font-medium text-foreground">{p.titulo}</span>
                <span className="text-[12.5px] text-tenue">{p.cita}</span>
              </div>
              <ul className="flex flex-col gap-1 text-[13.5px]">
                {p.sub.map((s, k) => (
                  <li key={s}>
                    <span className="mr-2 text-tenue">{"abc"[k]}.</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
