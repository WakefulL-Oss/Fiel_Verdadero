import Link from "next/link";
import { LogIn } from "lucide-react";
import { BotonTema } from "@/components/BotonTema";
import { ESTILO_BOTON } from "@/components/Formulario";
import { EnlacesLegales } from "@/components/Footer";
import { Logo, LogoApilado } from "@/components/marca/Logo";

type Enlace = { pregunta: string; texto: string; href: string };

function Invitacion({ pregunta, texto, href }: Enlace) {
  return (
    <span className="text-[13.5px] text-tenue">
      {pregunta}{" "}
      <Link href={href} className="font-medium text-foreground no-underline hover:underline">
        {texto}
      </Link>
    </span>
  );
}

export function AccesoCentrado({ enlace, children }: { enlace: Enlace; children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:22px_22px] opacity-70 [mask-image:radial-gradient(ellipse_55%_60%_at_50%_45%,#000_0%,transparent_75%)]"
      />
      <header className="relative flex h-[60px] shrink-0 items-center justify-end gap-3 px-4 sm:px-7">
        <Invitacion {...enlace} />
        <BotonTema />
      </header>
      <main className="relative flex flex-1 items-center justify-center px-4 pb-10">
        <div className="flex w-full max-w-[372px] flex-col gap-6">
          <LogoApilado />
          {children}
        </div>
      </main>
      <footer className="relative flex h-[52px] shrink-0 items-center justify-center">
        <EnlacesLegales />
      </footer>
    </div>
  );
}

export function AccesoDividido({
  versiculo,
  children,
}: {
  versiculo: { texto: string; cita: string };
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-panel">
      <div className="flex w-full flex-col border-border-suave bg-background lg:w-[620px] lg:shrink-0 lg:border-r">
        <header className="flex h-[84px] shrink-0 items-center justify-between gap-4 px-4 sm:px-12">
          <Logo grande />
          <div className="flex items-center gap-2">
            <Link href="/login" className={`${ESTILO_BOTON.secundarioChico} lg:hidden`}>
              Entrar
            </Link>
            <span className="lg:hidden">
              <BotonTema />
            </span>
          </div>
        </header>
        <main className="flex flex-1 items-center px-4 pb-14 sm:pl-[112px]">
          <div className="flex w-full max-w-[372px] flex-col gap-6">{children}</div>
        </main>
        <footer className="flex h-14 shrink-0 items-center px-4 sm:pl-[112px]">
          <EnlacesLegales />
        </footer>
      </div>
      <div className="hidden min-w-0 flex-1 flex-col lg:flex">
        <div className="flex h-[84px] shrink-0 items-center justify-end gap-3 px-8">
          <BotonTema />
          <Link href="/login" className={`${ESTILO_BOTON.secundarioChico} hover:border-foreground`}>
            <LogIn size={15} />
            Iniciar sesión
          </Link>
        </div>
        <figure className="flex flex-1 items-center pr-[88px] pb-[84px] pl-[112px]">
          <div className="relative flex max-w-[470px] flex-col gap-7">
            <span
              aria-hidden
              className="absolute -top-[34px] -left-[58px] font-display text-[120px] leading-none font-bold text-cita"
            >
              “
            </span>
            <blockquote className="relative font-display text-[31px] leading-[1.38] font-medium text-pretty text-foreground">
              «{versiculo.texto}»
            </blockquote>
            <figcaption className="flex items-center gap-3.5">
              <span aria-hidden className="h-[1.5px] w-8 bg-accent" />
              <span className="text-sm font-medium text-muted">{versiculo.cita}</span>
              <span className="text-[13px] text-tenue">RVR1960</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </div>
  );
}

export function Titulo({
  titulo,
  children,
  centrado = false,
}: {
  titulo: string;
  children?: React.ReactNode;
  centrado?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 ${centrado ? "text-center" : ""}`}>
      <h1
        className={`font-display text-balance text-foreground ${
          centrado ? "text-2xl leading-[1.2] font-semibold" : "text-[30px] leading-[1.15] font-bold"
        }`}
      >
        {titulo}
      </h1>
      {children && <p className="text-[14.5px] leading-[1.55] text-pretty">{children}</p>}
    </div>
  );
}

export function Pasos({ total, actual }: { total: number; actual: number }) {
  return (
    <div className="flex gap-1.5" aria-label={`Paso ${actual} de ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1 w-6 rounded-sm transition-colors duration-200 ${i < actual ? "bg-primario" : "bg-border-suave"}`}
        />
      ))}
    </div>
  );
}
