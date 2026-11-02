"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ENLACE_NAV } from "../Encabezado";
import { ENLACES_LEGALES } from "../Footer";

export function NavLegal({ className = "" }: { className?: string }) {
  const ruta = usePathname();
  return (
    <nav className={`h-full items-stretch ${className}`}>
      {ENLACES_LEGALES.map(({ href, texto }) => {
        const activo = ruta === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={activo ? "page" : undefined}
            className={`${ENLACE_NAV} shrink-0 whitespace-nowrap ${activo ? "text-foreground" : "text-tenue"}`}
          >
            {texto}
          </Link>
        );
      })}
    </nav>
  );
}
