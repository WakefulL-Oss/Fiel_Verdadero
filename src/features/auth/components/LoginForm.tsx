"use client";

import Link from "next/link";
import { useActionState } from "react";
import { CampoPassword } from "@/components/CampoPassword";
import { Boton, Campo, Grupo, MensajeForm, Tecla } from "@/components/Formulario";
import { Turnstile } from "@/components/Turnstile";
import { iniciarSesion, type EstadoAuth } from "../actions";
import { Titulo } from "./Acceso";

export function LoginForm({ next }: { next?: string }) {
  const [estado, accion, pendiente] = useActionState(iniciarSesion, {
    paso: "datos",
  } as EstadoAuth);

  return (
    <>
      <Titulo titulo="Entra a tu cuenta" centrado>
        Continúa tu estudio donde lo dejaste.
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
        <Turnstile reinicio={estado} />
        <MensajeForm error={estado.error} />
        <Boton disabled={pendiente} className="w-full">
          {pendiente ? "Entrando…" : "Entrar"}
          <span className="hidden sm:inline-flex">
            <Tecla oscura>↵</Tecla>
          </span>
        </Boton>
      </form>
    </>
  );
}
