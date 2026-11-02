"use client";

import { Printer } from "lucide-react";
import { boton } from "../Formulario";

export function Imprimir() {
  return (
    <button onClick={() => window.print()} className={`${boton("texto", "chico")} no-imprimir ml-auto`}>
      <Printer size={14} />
      Imprimir
    </button>
  );
}
