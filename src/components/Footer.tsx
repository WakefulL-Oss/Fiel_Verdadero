import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted">
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <Link href="/privacidad" className="hover:text-accent">
          Privacidad
        </Link>
        <Link href="/terminos" className="hover:text-accent">
          Términos
        </Link>
        <Link href="/eliminar-datos" className="hover:text-accent">
          Eliminar mis datos
        </Link>
      </nav>
      <p className="mt-4">
        © 2026 {SITE_NAME}. Proyecto gratuito y sin fines comerciales.
      </p>
    </footer>
  );
}
