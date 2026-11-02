import Link from "next/link";
import { Nombre } from "./marca/Logo";

const ENLACES = [
  { href: "/privacidad", texto: "Privacidad" },
  { href: "/terminos", texto: "Términos" },
  { href: "/eliminar-datos", texto: "Eliminar mis datos" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-suave">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <Nombre /> · © 2026 · Gratuito y sin fines comerciales
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {ENLACES.map(({ href, texto }) => (
            <Link key={href} href={href} className="hover:text-foreground">
              {texto}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
