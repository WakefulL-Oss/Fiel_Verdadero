import Link from "next/link";
import { Menora } from "./Menora";

function Nombre({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display leading-none font-bold whitespace-nowrap text-foreground ${className}`}>
      Fiel <i className="font-medium text-accent">y</i> Verdadero
    </span>
  );
}

export function Logo({ grande = false }: { grande?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Fiel y Verdadero, inicio"
      className="flex items-center gap-2"
    >
      <Menora className={`h-8 w-auto text-foreground ${grande ? "sm:h-[38px]" : ""}`} />
      <Nombre className="text-xl sm:text-2xl" />
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
