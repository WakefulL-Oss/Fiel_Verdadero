"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { guardarTema, leerTema, type Tema } from "@/lib/tema";
import { Menu, MenuContenido, MenuDisparador, MenuRadioGrupo, MenuRadioItem } from "./ui/Menu";

const OPCIONES: { valor: Tema; texto: string }[] = [
  { valor: "dark", texto: "Oscuro" },
  { valor: "light", texto: "Claro" },
  { valor: "system", texto: "Sistema" },
];

// Se monta solo al abrir el menú, así que leer localStorage aquí no afecta la hidratación.
export function OpcionesTema() {
  const [tema, setTema] = useState<Tema>(leerTema);
  return (
    <MenuRadioGrupo
      value={tema}
      onValueChange={(valor) => {
        setTema(valor as Tema);
        guardarTema(valor as Tema);
      }}
    >
      {OPCIONES.map(({ valor, texto }) => (
        <MenuRadioItem key={valor} value={valor}>
          {texto}
        </MenuRadioItem>
      ))}
    </MenuRadioGrupo>
  );
}

export function SelectorTema() {
  return (
    <Menu>
      <MenuDisparador
        aria-label="Cambiar tema"
        className="no-imprimir flex size-7 items-center justify-center rounded-md text-tenue transition-colors hover:text-foreground data-[state=open]:text-foreground"
      >
        <Moon size={16} className="hidden in-data-[theme=dark]:block" />
        <Sun size={16} className="in-data-[theme=dark]:hidden" />
      </MenuDisparador>
      <MenuContenido align="end" className="w-40">
        <OpcionesTema />
      </MenuContenido>
    </Menu>
  );
}
