"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ENLACES_LEGALES } from "../Footer";

export function NavLegal({ className = "" }: { className?: string }) {
  const ruta = usePathname();
  return (
    <nav className={`items-center gap-0.5 ${className}`}>
      {ENLACES_LEGALES.map(({ href, texto }) => {
        const activo = ruta === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={activo ? "page" : undefined}
            className={`flex h-8 shrink-0 items-center rounded-lg px-2.5 text-[13px] whitespace-nowrap transition-colors hover:bg-realce hover:text-foreground ${
              activo ? "bg-realce font-medium text-foreground" : "text-muted"
            }`}
          >
            {texto}
          </Link>
        );
      })}
    </nav>
  );
}
