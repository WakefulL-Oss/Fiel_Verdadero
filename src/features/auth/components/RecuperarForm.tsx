"use client";

import { useActionState, useState } from "react";
import { Boton, Campo, Grupo, MensajeForm, Tecla } from "@/components/Formulario";
import { CAPTCHA_ACTIVO, Turnstile } from "@/components/Turnstile";
import {
  cambiarPassword,
  pedirRecuperacion,
  verificarRecuperacion,
  type EstadoAuth,
} from "../actions";
import { Titulo } from "./Acceso";
import { CampoCodigo } from "./CampoCodigo";
import { PasswordNueva } from "./PasswordNueva";

const PASOS = [
  { titulo: "Te enviamos un código", detalle: "Llega en menos de un minuto" },
  { titulo: "Lo escribes aquí", detalle: "Revisa también la carpeta de spam" },
  { titulo: "Eliges una contraseña nueva", detalle: "Y entras directamente" },
];

function ListaPasos({ actual }: { actual: number }) {
  return (
    <ol className="flex flex-col rounded-xl border border-border-suave bg-surface p-4">
      {PASOS.map(({ titulo, detalle }, i) => {
        const n = i + 1;
        const hecho = n <= actual;
        return (
          <li key={titulo} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`flex size-[22px] items-center justify-center rounded-full text-[11.5px] font-medium transition-colors ${
                  hecho ? "bg-primario text-primario-texto" : "border border-border bg-surface text-tenue"
                }`}
              >
                {n}
              </span>
              {n < PASOS.length && <span aria-hidden className="my-1 w-px flex-1 bg-border-suave" />}
            </div>
            <div className={`flex min-w-0 flex-1 flex-col gap-0.5 ${n < PASOS.length ? "pb-3.5" : ""}`}>
              <span className={`text-[13.5px] font-medium ${n === actual ? "text-foreground" : "text-muted"}`}>
                {titulo}
              </span>
              <span className="text-[12.5px] text-tenue">{detalle}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function RecuperarForm() {
  const [pedido, pedirAccion, pidiendo] = useActionState(pedirRecuperacion, {
    paso: "datos",
  } as EstadoAuth);
  const [captcha, setCaptcha] = useState("");
  const [verificado, verificarAccion, verificando] = useActionState(verificarRecuperacion, {
    paso: "codigo",
  } as EstadoAuth);
  const [cambio, cambiarAccion, cambiando] = useActionState(cambiarPassword, {
    paso: "password",
  } as EstadoAuth);

  if (verificado.paso === "password") {
    return (
      <>
        <Titulo titulo="Elige una contraseña nueva" />
        <form action={cambiarAccion} className="flex flex-col gap-3.5">
          <PasswordNueva etiqueta="Contraseña nueva" />
          <MensajeForm error={cambio.error} />
          <Boton disabled={cambiando} className="w-full">
            {cambiando ? "Guardando…" : "Guardar y entrar"}
          </Boton>
        </form>
        <ListaPasos actual={3} />
      </>
    );
  }

  if (pedido.paso === "datos") {
    return (
      <>
        <Titulo titulo="Recupera tu contraseña">
          Sin prisa. Son tres pasos y tu contenido sigue a salvo.
        </Titulo>
        <form action={pedirAccion} className="flex flex-col gap-3">
          <Grupo etiqueta="Correo de tu cuenta" htmlFor="correo">
            <Campo
              id="correo"
              name="correo"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              defaultValue={pedido.correo}
              required
            />
          </Grupo>
          <MensajeForm error={pedido.error} />
          <Boton disabled={pidiendo || (CAPTCHA_ACTIVO && !captcha)} className="w-full">
            {pidiendo ? "Enviando…" : "Enviarme un código"}
            <span className="hidden sm:inline-flex">
              <Tecla oscura>↵</Tecla>
            </span>
          </Boton>
          <Turnstile reinicio={pedido} alCambiar={setCaptcha} />
        </form>
        <ListaPasos actual={1} />
      </>
    );
  }

  return (
    <>
      <Titulo titulo="Revisa tu correo">
        Si existe una cuenta con{" "}
        <strong className="font-medium break-all text-foreground">{pedido.correo}</strong>, te
        enviamos un código.
      </Titulo>
      <form action={verificarAccion} className="flex flex-col gap-3.5">
        <input type="hidden" name="correo" value={pedido.correo} />
        <CampoCodigo />
        <MensajeForm error={verificado.error} />
        <Boton disabled={verificando} className="w-full">
          {verificando ? "Verificando…" : "Verificar"}
        </Boton>
      </form>
      <ListaPasos actual={2} />
    </>
  );
}
