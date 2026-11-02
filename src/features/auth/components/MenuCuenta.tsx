"use client";

import { LayoutDashboard, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { startTransition } from "react";
import { OpcionesTema } from "@/components/SelectorTema";
import {
  Menu,
  MenuContenido,
  MenuDisparador,
  MenuEtiqueta,
  MenuItem,
  MenuSeparador,
} from "@/components/ui/Menu";
import { cerrarSesion } from "../actions";

export function MenuCuenta({ nombre, correo }: { nombre: string; correo: string }) {
  const inicial = (nombre || correo).trim().charAt(0).toUpperCase() || "?";

  return (
    <Menu>
      <MenuDisparador
        aria-label="Menú de la cuenta"
        className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[#3a1e3c] font-display text-[13px] font-semibold text-[#d9ae52] ring-1 ring-border transition-[box-shadow] hover:ring-border-fuerte data-[state=open]:ring-2 data-[state=open]:ring-accent"
      >
        {inicial}
      </MenuDisparador>
      <MenuContenido align="end" className="w-56">
        <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-foreground">
          <UserRound size={12} className="shrink-0" />
          <span className="truncate">{correo}</span>
        </div>
        <MenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard size={12} />
            Dashboard
          </Link>
        </MenuItem>
        <MenuSeparador />
        <MenuEtiqueta>Tema</MenuEtiqueta>
        <OpcionesTema />
        <MenuSeparador />
        <MenuItem onSelect={() => startTransition(cerrarSesion)}>
          <LogOut size={12} />
          Cerrar sesión
        </MenuItem>
      </MenuContenido>
    </Menu>
  );
}
