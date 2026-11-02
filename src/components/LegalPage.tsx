import { Check } from "lucide-react";
import { CONTACT_EMAIL, LEGAL_UPDATED } from "@/lib/site";
import { Imprimir } from "./legal/Imprimir";

export type Seccion = { titulo: string; contenido: React.ReactNode };

const PROSA =
  "text-[15.5px] leading-[1.7] text-pretty [&_a]:text-foreground [&_a]:underline [&_li]:pl-1 [&_p+p]:mt-3 [&_ul+p]:mt-3[&_strong]:font-medium [&_strong]:text-foreground [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5";

export function Tarjeta({
  titulo,
  icono,
  children,
}: {
  titulo: React.ReactNode;
  icono?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border-suave bg-surface">
      <div className="flex items-center gap-2 border-b border-linea px-4 py-3 text-[13px] font-medium text-foreground">
        {icono}
        {titulo}
      </div>
      {children}
    </div>
  );
}

export function EncabezadoLegal({ titulo, lectura }: { titulo: string; lectura: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[11px] font-medium tracking-[0.2em] text-accent uppercase">Legal</span>
      <h1 className="font-display text-[32px] leading-[1.12] font-bold text-balance text-foreground sm:text-[38px]">
        {titulo}
      </h1>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-tenue">
        <span>Última actualización: {LEGAL_UPDATED}</span>
        <span aria-hidden className="text-border">·</span>
        <span>{lectura}</span>
        <Imprimir />
      </div>
    </div>
  );
}

export function LegalPage({
  titulo,
  lectura,
  resumen,
  secciones,
}: {
  titulo: string;
  lectura: string;
  resumen: string[];
  secciones: Seccion[];
}) {
  return (
    <main className="flex-1 bg-background px-4 pt-10 pb-16 sm:px-6 lg:px-16 lg:pt-12 lg:pb-[72px]">
      <div className="mx-auto grid max-w-[972px] gap-[72px] lg:grid-cols-[220px_minmax(0,680px)]">
        <aside className="no-imprimir sticky top-20 hidden flex-col gap-5 self-start lg:flex">
          <nav className="flex flex-col gap-0.5">
            <span className="px-2.5 pb-2 text-[11px] font-medium tracking-[0.12em] text-tenue uppercase">
              En esta página
            </span>
            {secciones.map((s, i) => (
              <a
                key={s.titulo}
                href={`#seccion-${i + 1}`}
                className="flex gap-2 rounded-lg px-2.5 py-1.5 text-[13px] leading-snug text-muted no-underline transition-colors hover:bg-realce hover:text-foreground"
              >
                <span className="min-w-3.5 font-display font-semibold text-accent">{i + 1}</span>
                {s.titulo}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-1.5 rounded-xl border border-border-suave bg-surface p-3.5">
            <span className="text-[13px] font-medium text-foreground">¿Tienes preguntas?</span>
            <span className="text-[12.5px] leading-normal text-tenue">Escríbenos a</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="-mt-1 text-[12.5px] [overflow-wrap:anywhere] text-foreground underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </aside>

        <article className="flex min-w-0 flex-col gap-8">
          <EncabezadoLegal titulo={titulo} lectura={lectura} />
          <Tarjeta titulo="En resumen">
            <ul className="flex flex-col gap-2.5 px-[18px] py-3.5">
              {resumen.map((t) => (
                <li key={t} className="flex gap-2.5 text-[14.5px] leading-[1.55]">
                  <Check size={15} className="mt-[3px] shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </Tarjeta>
          {secciones.map((s, i) => (
            <section
              key={s.titulo}
              id={`seccion-${i + 1}`}
              className="flex scroll-mt-20 flex-col gap-2.5 border-t border-linea pt-6"
            >
              <h2 className="flex gap-2.5 font-display text-[21px] leading-[1.3] font-semibold text-foreground">
                <span className="text-accent">{i + 1}.</span>
                {s.titulo}
              </h2>
              <div className={PROSA}>{s.contenido}</div>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
