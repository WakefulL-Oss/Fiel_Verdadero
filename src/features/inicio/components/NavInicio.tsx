const ENLACES = [
  { href: "#escribir", texto: "Escribir" },
  { href: "#compartir", texto: "Compartir" },
  { href: "#pdf", texto: "PDF" },
];

export function NavInicio() {
  return ENLACES.map(({ href, texto }) => (
    <a
      key={href}
      href={href}
      className="rounded-lg px-3 py-1.5 text-[13.5px] text-muted no-underline transition-colors hover:bg-realce hover:text-foreground"
    >
      {texto}
    </a>
  ));
}
