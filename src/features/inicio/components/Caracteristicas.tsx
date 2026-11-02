const BLOQUES = [
  {
    id: "escribir",
    titulo: "Un editor hecho para predicar",
    texto:
      "Organiza el mensaje en puntos y subpuntos, cita los pasajes donde los necesitas y guarda borradores que solo tú ves.",
    lista: ["Borradores y notas privadas", "Citas bíblicas en cada punto", "Etiquetas por tema y series"],
  },
  {
    id: "compartir",
    titulo: "Publica cuando estés listo",
    texto:
      "Cada sermón publicado tiene su propia página, con tu nombre como autor, lista para compartir por enlace.",
    lista: ["Tú decides qué se publica", "Búsqueda por tema y pasaje", "Reportes y moderación"],
  },
  {
    id: "pdf",
    titulo: "Llévalo al púlpito",
    texto:
      "Descarga el sermón en PDF con un formato limpio para imprimir o proyectar. Se genera en tu navegador.",
    lista: ["Pie de página con la marca", "Sin cuentas ni costos extra", "Tu contenido sigue siendo tuyo"],
  },
];

export function Caracteristicas() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="grid gap-x-12 gap-y-14 md:grid-cols-3">
        {BLOQUES.map((b) => (
          <article key={b.id} id={b.id} className="scroll-mt-24 border-t border-border pt-6">
            <h2 className="font-display text-[23px] leading-[1.25] font-semibold text-balance text-foreground">
              {b.titulo}
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-pretty">{b.texto}</p>
            <ul className="mt-5 flex flex-col gap-2 text-[14px]">
              {b.lista.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
