import Link from "next/link";
import { Menora } from "./Menora";

export function Nombre({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display leading-none font-bold whitespace-nowrap text-foreground ${className}`}>
      Fiel <i className="font-medium text-accent">y</i> Verdadero
    </span>
  );
}

export function IconoApp({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-[27%] bg-[#3a1e3c] text-[#f5f0ec] [--accent:#d9ae52] ${className}`}
    >
      <Menora simplificada className="h-[62%] w-auto" />
    </span>
  );
}

export function LogoCompacto() {
  return (
    <Link href="/" aria-label="Fiel y Verdadero, inicio" className="flex items-center gap-2.5">
      <IconoApp className="size-[26px]" />
      <Nombre className="text-[15px]" />
    </Link>
  );
}

export function LogoHorizontal() {
  return (
    <Link href="/" aria-label="Fiel y Verdadero, inicio" className="flex items-center gap-[18px]">
      <Menora className="h-[38px] w-auto text-foreground" />
      <span aria-hidden className="h-8 w-[1.5px] bg-border" />
      <Nombre className="text-2xl" />
    </Link>
  );
}

export function LogoApilado() {
  return (
    <Link href="/" aria-label="Fiel y Verdadero, inicio" className="flex flex-col items-center gap-3.5 pb-1">
      <Menora className="h-[50px] w-auto text-foreground" />
      <Nombre className="text-[21px]" />
      <span aria-hidden className="h-[1.5px] w-7 bg-accent" />
    </Link>
  );
}
