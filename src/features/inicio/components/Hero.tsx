import { VistaPrevia } from "./VistaPrevia";

export function Hero({ acciones }: { acciones: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-border-suave">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:22px_22px] opacity-70 [mask-image:radial-gradient(ellipse_70%_65%_at_50%_30%,#000_0%,transparent_75%)]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-16 pb-14 text-center sm:px-6 sm:pt-24 sm:pb-20 lg:px-8">
        <h1 className="entrada max-w-3xl font-display text-[40px] leading-[1.08] font-bold text-balance text-foreground sm:text-[56px]">
          Escribe, comparte y estudia sermones
        </h1>
        <p
          className="entrada mt-5 max-w-xl text-[17px] leading-relaxed text-pretty"
          style={{ "--retraso": "70ms" } as React.CSSProperties}
        >
          Una biblioteca gratuita en español para quien predica y enseña. Sin publicidad y sin costo.
        </p>
        <div className="entrada mt-8" style={{ "--retraso": "140ms" } as React.CSSProperties}>
          {acciones}
        </div>
        <div className="mt-14 flex w-full justify-center sm:mt-16">
          <VistaPrevia />
        </div>
      </div>
    </section>
  );
}
