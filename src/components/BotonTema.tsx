"use client";

import { Moon, Sun } from "lucide-react";

export function BotonTema() {
  function alternar() {
    const raiz = document.documentElement;
    const siguiente = raiz.dataset.theme === "dark" ? "light" : "dark";
    raiz.dataset.theme = siguiente;
    try {
      localStorage.setItem("tema", siguiente);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label="Cambiar entre modo claro y oscuro"
      className="no-imprimir flex size-8 shrink-0 items-center justify-center rounded-lg text-muted transition-[background-color,transform] duration-150 ease-salida hover:bg-realce hover:text-foreground active:scale-[0.97]"
    >
      <Sun size={16} className="hidden in-data-[theme=dark]:block" />
      <Moon size={16} className="in-data-[theme=dark]:hidden" />
    </button>
  );
}
