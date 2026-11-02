import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const ENLACES_LEGALES = [
  { href: "/privacidad", texto: "Privacidad" },
  { href: "/terminos", texto: "Términos" },
  { href: "/eliminar-datos", texto: "Eliminar datos" },
] as const;

export function EnlacesLegales({ className = "" }: { className?: string }) {
  return (
    <nav className={`flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-tenue ${className}`}>
      {ENLACES_LEGALES.map(({ href, texto }) => (
        <Link key={href} href={href} className="transition-colors hover:text-foreground">
          {texto}
        </Link>
      ))}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="no-imprimir border-t border-border-suave bg-panel">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-[12.5px] text-tenue sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0 lg:px-8">
        <span>© 2026 {SITE_NAME}</span>
        <div className="flex flex-wrap gap-x-[18px] gap-y-2">
          <EnlacesLegales />
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-foreground">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
