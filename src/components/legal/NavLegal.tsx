"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ENLACES_LEGALES } from "../Footer";

export function NavLegal() {
  const ruta = usePathname();
  return (
    <nav className="hidden items-center gap-0.5 md:flex">
      {ENLACES_LEGALES.map(({ href, texto }) => {
        const activo = ruta === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={activo ? "page" : undefined}
            className={`flex h-8 items-center rounded-lg px-2.5 text-[13px] transition-colors hover:bg-realce hover:text-foreground ${
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
