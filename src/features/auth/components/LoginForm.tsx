"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Boton, Campo, MensajeForm } from "@/components/Formulario";
import { iniciarSesion, type EstadoAuth } from "../actions";

export function LoginForm({ next }: { next?: string }) {
  const [estado, accion, pendiente] = useActionState(iniciarSesion, {
    paso: "datos",
  } as EstadoAuth);

  return (
    <form action={accion} className="space-y-3">
      {next && <input type="hidden" name="next" value={next} />}
      <Campo
        name="correo"
        type="email"
        autoComplete="email"
        placeholder="Correo"
        required
      />
      <Campo
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Contraseña"
        maxLength={72}
        required
      />
      <MensajeForm error={estado.error} />
      <Boton disabled={pendiente}>{pendiente ? "Entrando…" : "Entrar"}</Boton>
      <p className="flex justify-between text-sm text-muted">
        <Link href="/recuperar" className="hover:text-accent">
          Olvidé mi contraseña
        </Link>
        <Link href="/registro" className="hover:text-accent">
          Crear cuenta
        </Link>
      </p>
    </form>
  );
}
