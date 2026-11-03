"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { CampoPassword } from "@/components/CampoPassword";
import { Boton, Campo, Grupo, MensajeForm } from "@/components/Formulario";
import { CAPTCHA_ACTIVO, Turnstile } from "@/components/Turnstile";
import { iniciarSesion, type EstadoAuth } from "../actions";
import { Titulo } from "./Acceso";

export function LoginForm({ next }: { next?: string }) {
  const [estado, accion, pendiente] = useActionState(iniciarSesion, {
    paso: "datos",
  } as EstadoAuth);
  const [captcha, setCaptcha] = useState("");

  return (
    <>
      <Titulo titulo="Entra a tu cuenta" centrado>
        Continúa aprendiendo...
      </Titulo>
      <form action={accion} className="flex flex-col gap-3.5">
        {next && <input type="hidden" name="next" value={next} />}
        <Grupo etiqueta="Correo electrónico" htmlFor="correo">
          <Campo
            id="correo"
            name="correo"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            defaultValue={estado.correo}
            required
          />
        </Grupo>
        <Grupo
          etiqueta="Contraseña"
          htmlFor="password"
          extra={
            <Link href="/recuperar" className="text-[12.5px] whitespace-nowrap text-tenue no-underline hover:text-foreground">
              ¿La olvidaste?
            </Link>
          }
        >
          <CampoPassword
            id="password"
            name="password"
            autoComplete="current-password"
            maxLength={72}
            required
          />
        </Grupo>
        <Turnstile reinicio={estado} alCambiar={setCaptcha} />
        <MensajeForm error={estado.error} />
        <Boton disabled={pendiente || (CAPTCHA_ACTIVO && !captcha)} className="w-full">
          {pendiente ? "Entrando…" : "Entrar"}
        </Boton>
      </form>
    </>
  );
}
