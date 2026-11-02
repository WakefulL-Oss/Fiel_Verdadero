"use client";

import { Printer } from "lucide-react";
import { ESTILO_BOTON } from "../Formulario";

export function Imprimir() {
  return (
    <button onClick={() => window.print()} className={`${ESTILO_BOTON.fantasma} no-imprimir ml-auto`}>
      <Printer size={14} />
      Imprimir
    </button>
  );
}
