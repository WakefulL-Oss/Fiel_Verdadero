import Link from "next/link";
import { LogIn } from "lucide-react";
import { EnlacesLegales } from "@/components/Footer";
import { boton } from "@/components/Formulario";
import { Logo, LogoApilado } from "@/components/marca/Logo";
import { SelectorTema } from "@/components/SelectorTema";
import { LeyendaLegal } from "./LeyendaLegal";

// Separación lateral del borde en móvil, compartida por login, registro y recuperar.
const MARGEN_MOVIL = "px-8";

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

export function AccesoCentrado({
  enlace,
  enlaceMovil,
  children,
}: {
  enlace: Enlace;
  enlaceMovil: Enlace;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border-fuerte)_1px,transparent_1px)] [background-size:22px_22px] opacity-70 [mask-image:radial-gradient(ellipse_100%_60%_at_50%_45%,#000_0%,transparent_75%)] sm:[mask-image:radial-gradient(ellipse_55%_60%_at_50%_45%,#000_0%,transparent_75%)]"
      />
      <header className={`relative flex h-[60px] shrink-0 items-center justify-end ${MARGEN_MOVIL} sm:px-7`}>
        <span className="hidden sm:inline">
          <Invitacion {...enlace} />
        </span>
      </header>
      <main className={`relative flex flex-1 items-center justify-center ${MARGEN_MOVIL} pb-10`}>
        <div className="flex w-full max-w-[372px] flex-col gap-6">
          <LogoApilado />
          {children}
          <div className="text-center sm:hidden">
            <Invitacion {...enlaceMovil} />
          </div>
        </div>
      </main>
      <footer className={`relative flex min-h-[52px] shrink-0 items-center justify-center ${MARGEN_MOVIL} pb-4`}>
        <LeyendaLegal centrada />
      </footer>
    </div>
  );
}

export function AccesoDividido({
  versiculo,
  pie,
  children,
}: {
  versiculo: { texto: string; cita: string };
  pie?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-panel [--alto-cabecera:clamp(56px,9dvh,84px)] [--alto-pie:clamp(52px,8dvh,64px)]">
      <div className="flex w-full flex-col border-border-suave bg-background lg:w-[620px] lg:shrink-0 lg:border-r">
        <header className={`flex h-(--alto-cabecera) shrink-0 items-center justify-between gap-4 ${MARGEN_MOVIL} sm:px-12`}>
          <Logo grande />
        </header>
        <main className={`flex flex-1 items-center ${MARGEN_MOVIL} pb-[clamp(0px,4dvh,56px)] sm:pl-[112px]`}>
          <div className="flex w-full max-w-[372px] flex-col gap-6">
            {children}
            <div className="text-center lg:hidden">
              <Invitacion pregunta="¿Ya tienes cuenta?" texto="Inicia sesión" href="/login" />
            </div>
          </div>
        </main>
        <footer className={`flex min-h-(--alto-pie) shrink-0 items-center gap-5 ${MARGEN_MOVIL} pb-4 sm:pl-[112px]`}>
          {pie ?? (
            <>
              <EnlacesLegales />
              <SelectorTema />
            </>
          )}
        </footer>
      </div>
      <div className="hidden min-w-0 flex-1 flex-col lg:flex">
        <div className="flex h-(--alto-cabecera) shrink-0 items-center justify-end px-8">
          <Link href="/login" className={boton("normal", "chico")}>
            <LogIn size={14} />
            Iniciar sesión
          </Link>
        </div>
        <figure className="flex flex-1 items-center pr-[clamp(32px,6vw,88px)] pb-(--alto-cabecera) pl-[clamp(56px,8vw,112px)]">
          <div className="relative flex max-w-[580px] flex-col gap-7">
            <span
              aria-hidden
              className="absolute -top-[34px] -left-[58px] font-display text-[120px] leading-none font-bold text-cita"
            >
              “
            </span>
            <blockquote className="relative font-display text-[clamp(24px,2.4vw,31px)] leading-[1.38] font-medium text-pretty text-foreground">
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
    <div className="flex gap-1.5" data-actual={actual} aria-label={`Paso ${actual} de ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1 w-6 rounded-sm transition-colors duration-200 ${i < actual ? "bg-primario" : "bg-border-suave"}`}
        />
      ))}
    </div>
  );
}
