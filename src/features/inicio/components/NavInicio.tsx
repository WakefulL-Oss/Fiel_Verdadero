import { ENLACE_NAV } from "@/components/Encabezado";

const ENLACES = [
  { href: "#escribir", texto: "Escribir" },
  { href: "#compartir", texto: "Compartir" },
  { href: "#pdf", texto: "PDF" },
];

export function NavInicio() {
  return (
    <nav className="flex h-full items-stretch">
      {ENLACES.map(({ href, texto }) => (
        <a key={href} href={href} className={`${ENLACE_NAV} text-foreground`}>
          {texto}
        </a>
      ))}
    </nav>
  );
}
