"use client";

import { usePathname } from "next/navigation";
import { seccionActual } from "../navegacion";

export function SeccionActual() {
  const seccion = seccionActual(usePathname());
  if (!seccion) return null;
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span aria-hidden className="text-lg font-light text-border">/</span>
      <span className="truncate text-[13.5px] text-foreground">{seccion.etiqueta}</span>
    </span>
  );
}
