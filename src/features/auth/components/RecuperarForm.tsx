"use client";

import { useActionState } from "react";
import { Boton, Campo, MensajeForm } from "@/components/Formulario";
import { Turnstile } from "@/components/Turnstile";
import {
  cambiarPassword,
  pedirRecuperacion,
  verificarRecuperacion,
  type EstadoAuth,
} from "../actions";
import { CampoCodigo } from "./CampoCodigo";

export function RecuperarForm() {
  const [pedido, pedirAccion, pidiendo] = useActionState(pedirRecuperacion, {
    paso: "datos",
  } as EstadoAuth);
  const [verificado, verificarAccion, verificando] = useActionState(verificarRecuperacion, {
    paso: "codigo",
  } as EstadoAuth);
  const [cambio, cambiarAccion, cambiando] = useActionState(cambiarPassword, {
    paso: "password",
  } as EstadoAuth);

  if (verificado.paso === "password") {
    return (
      <form action={cambiarAccion} className="space-y-3">
        <Campo
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Contraseña nueva (mín. 8, letras y números)"
          minLength={8}
          maxLength={72}
          required
          autoFocus
        />
        <MensajeForm error={cambio.error} />
        <Boton disabled={cambiando}>{cambiando ? "Guardando…" : "Guardar contraseña"}</Boton>
      </form>
    );
  }

  if (pedido.paso === "datos") {
    return (
      <form action={pedirAccion} className="space-y-3">
        <Campo
          name="correo"
          type="email"
          autoComplete="email"
          placeholder="Correo"
          defaultValue={pedido.correo}
          required
        />
        <Turnstile reinicio={pedido} />
        <MensajeForm error={pedido.error} />
        <Boton disabled={pidiendo}>{pidiendo ? "Enviando…" : "Enviar código"}</Boton>
      </form>
    );
  }

  return (
    <form action={verificarAccion} className="space-y-3">
      <p className="text-sm text-muted">Si el correo existe, enviamos un código a {pedido.correo}</p>
      <input type="hidden" name="correo" value={pedido.correo} />
      <CampoCodigo />
      <MensajeForm error={verificado.error} />
      <Boton disabled={verificando}>{verificando ? "Verificando…" : "Verificar"}</Boton>
    </form>
  );
}
