export function Cierre({ acciones }: { acciones: React.ReactNode }) {
  return (
    <section className="border-t border-border-suave bg-panel">
      <div className="mx-auto flex max-w-[75rem] flex-col items-center gap-10 px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <figure className="flex max-w-3xl flex-col items-center gap-5">
          <blockquote className="font-display text-[26px] leading-[1.4] font-medium text-balance text-foreground sm:text-[32px]">
            «Entonces vi el cielo abierto; y he aquí un caballo blanco, y el que lo montaba se llamaba
            Fiel y Verdadero, y con justicia juzga y pelea.»
          </blockquote>
          <figcaption className="flex items-center gap-3.5 text-sm">
            <span aria-hidden className="h-[1.5px] w-8 bg-accent" />
            <span className="font-medium text-muted">Apocalipsis 19:11</span>
            <span className="text-tenue">RVR1960</span>
          </figcaption>
        </figure>
        <div className="flex flex-col items-center gap-5 border-t border-border pt-10">
          <h2 className="font-display text-[26px] leading-tight font-semibold text-foreground">
            Empieza a escribir hoy
          </h2>
          {acciones}
        </div>
      </div>
    </section>
  );
}
