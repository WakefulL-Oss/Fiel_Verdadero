import Link from "next/link";
import { Menora } from "./Menora";

export function Nombre({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold text-foreground ${className}`}>
      Fiel <span className="font-medium italic text-accent">y</span> Verdadero
    </span>
  );
}

export function Logo({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <Link href="/" className="flex flex-col items-center gap-3">
        <Menora className="h-16 w-auto text-foreground" />
        <Nombre className="text-2xl" />
      </Link>
    );
  }
  return (
    <Link href="/" aria-label="Fiel y Verdadero, inicio" className="flex items-center gap-2.5">
      <Menora simplificada className="h-6 w-auto text-foreground" />
      <span className="h-5 w-px bg-border" aria-hidden />
      <Nombre className="text-lg leading-none" />
    </Link>
  );
}
