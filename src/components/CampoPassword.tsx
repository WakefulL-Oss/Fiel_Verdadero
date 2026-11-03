"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { Campo } from "./Formulario";

export function CampoPassword(props: Omit<ComponentProps<"input">, "type">) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Campo {...props} type={visible ? "text" : "password"} className="pr-10" />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        className="absolute top-1 right-1 flex size-7 items-center justify-center cursor-pointer rounded-md border border-border-suave bg-realce/50 text-muted transition-colors hover:border-border hover:bg-realce hover:text-foreground focus-visible:bg-realce focus-visible:text-foreground focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-border-fuerte"
      >
        {visible ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}
