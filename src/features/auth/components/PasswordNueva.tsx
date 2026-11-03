"use client";

import { Circle, CircleCheck } from "lucide-react";
import { useState } from "react";
import { CampoPassword } from "@/components/CampoPassword";
import { Grupo } from "@/components/Formulario";

const REGLAS = [
  { texto: "Mínimo 8 caracteres", cumple: (p: string) => p.length >= 8 },
  { texto: "Una letra y un número", cumple: (p: string) => /[A-Za-z]/.test(p) && /\d/.test(p) },
];

export function PasswordNueva({ etiqueta = "Contraseña" }: { etiqueta?: string }) {
  const [valor, setValor] = useState("");
  const [visibles, setVisibles] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <Grupo etiqueta={etiqueta} htmlFor="password">
        <CampoPassword
          id="password"
          name="password"
          autoComplete="new-password"
          placeholder="Mínimo 8 caracteres"
          minLength={8}
          maxLength={72}
          required
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          onFocus={() => setVisibles(true)}
        />
      </Grupo>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-(--ease-salida) ${visibles ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <ul className="flex flex-col gap-1 overflow-hidden">
          {REGLAS.map(({ texto, cumple }) => {
            const ok = cumple(valor);
            return (
              <li
                key={texto}
                className={`flex items-center gap-1.5 text-[12.5px] transition-colors ${ok ? "text-exito" : "text-tenue"}`}
              >
                {ok ? <CircleCheck size={13} /> : <Circle size={13} />}
                {texto}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
