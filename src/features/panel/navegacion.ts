import { FilePenLine, House, Library, ScrollText, type LucideIcon } from "lucide-react";

export type Seccion = { href: string; etiqueta: string; Icono: LucideIcon };

export const INICIO: Seccion = { href: "/dashboard", etiqueta: "Inicio", Icono: House };
export const CREAR = { href: "/dashboard/sermones/nuevo", etiqueta: "Crear sermón" };

// Grupos bajo «Crear sermón», separados por una línea.
export const GRUPOS: Seccion[][] = [
  [{ href: "/dashboard/sermones", etiqueta: "Sermones", Icono: ScrollText }],
  [
    { href: "/dashboard/borradores", etiqueta: "Borradores", Icono: FilePenLine },
    { href: "/dashboard/publicaciones", etiqueta: "Mis publicaciones", Icono: Library },
  ],
];

const TODAS = [INICIO, CREAR, ...GRUPOS.flat()];

function coincide(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// La ruta más específica gana: en /dashboard/sermones/nuevo se marca «Crear sermón», no «Sermones».
export function seccionActual(pathname: string) {
  return TODAS.filter((s) => coincide(pathname, s.href)).sort((a, b) => b.href.length - a.href.length)[0];
}
