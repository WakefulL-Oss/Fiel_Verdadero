"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Boton, Campo, Grupo, MensajeForm } from "@/components/Formulario";
import { CAPTCHA_ACTIVO, Turnstile } from "@/components/Turnstile";
import { reenviarCodigo, registrar, verificarRegistro, type EstadoAuth } from "../actions";
import { Pasos, Titulo } from "./Acceso";
import { CampoCodigo } from "./CampoCodigo";
import { PasswordNueva } from "./PasswordNueva";

const ESPERA = 60;

function useCuentaAtras() {
  const [segundos, setSegundos] = useState(ESPERA);
  useEffect(() => {
    const id = setInterval(() => setSegundos((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  return [segundos, () => setSegundos(ESPERA)] as const;
}

export function RegistroForm({ correoInicial }: { correoInicial?: string }) {
  const inicial: EstadoAuth = correoInicial
    ? { paso: "codigo", correo: correoInicial, aviso: "Confirma tu correo con el código que te enviamos" }
    : { paso: "datos" };
  const [registro, registrarAccion, registrando] = useActionState(registrar, inicial);
  const [verificado, verificarAccion, verificando] = useActionState(verificarRegistro, {
    paso: "codigo",
  } as EstadoAuth);
  const [captcha, setCaptcha] = useState("");

  if (registro.paso === "datos") {
    return (
      <>
        <Pasos total={2} actual={1} />
        <Titulo titulo="Crea tu cuenta">
          Escribe, guarda y comparte sermones con tu nombre. Te enviaremos un código para verificar
          el correo.
        </Titulo>
        <form action={registrarAccion} className="flex flex-col gap-3.5">
          <Grupo etiqueta="Nombre" htmlFor="nombre">
            <Campo
              id="nombre"
              name="nombre"
              autoComplete="name"
              placeholder="Cómo te verán otros"
              maxLength={80}
              defaultValue={registro.nombre}
              required
            />
          </Grupo>
          <Grupo etiqueta="Correo electrónico" htmlFor="correo">
            <Campo
              id="correo"
              name="correo"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              defaultValue={registro.correo}
              required
            />
          </Grupo>
          <PasswordNueva />
          <MensajeForm error={registro.error} />
          <Boton disabled={registrando || (CAPTCHA_ACTIVO && !captcha)} className="w-full">
            {registrando ? "Creando…" : "Continuar"}
            <ArrowRight size={15} />
          </Boton>
          <Turnstile reinicio={registro} alCambiar={setCaptcha} />
        </form>
      </>
    );
  }

  return (
    <>
      <Pasos total={2} actual={2} />
      <Titulo titulo="Revisa tu correo">
        Escribe el código que enviamos a{" "}
        <strong className="font-medium break-all text-foreground">{registro.correo}</strong>
      </Titulo>
      <form action={verificarAccion} className="flex flex-col gap-3.5">
        <input type="hidden" name="correo" value={registro.correo} />
        <CampoCodigo />
        <MensajeForm error={verificado.error} aviso={registro.aviso} />
        <Boton disabled={verificando} className="w-full">
          {verificando ? "Verificando…" : "Verificar"}
        </Boton>
      </form>
      <Reenvio correo={registro.correo} />
    </>
  );
}

function Reenvio({ correo }: { correo?: string }) {
  const [reenvio, reenviarAccion, reenviando] = useActionState(reenviarCodigo, {
    paso: "codigo",
  } as EstadoAuth);
  const [segundos, reiniciarCuenta] = useCuentaAtras();

  return (
    <form
      action={reenviarAccion}
      onSubmit={reiniciarCuenta}
      className="flex flex-col gap-2 border-t border-linea pt-3.5 text-[13px]"
    >
      <input type="hidden" name="correo" value={correo} />
      <div className="flex items-center justify-between">
        <a href="/registro" className="flex items-center gap-1.5 text-muted no-underline hover:text-foreground">
          <ArrowLeft size={13} />
          Otro correo
        </a>
        {segundos > 0 ? (
          <span className="text-tenue tabular-nums">
            Reenviar en 0:{String(segundos).padStart(2, "0")}
          </span>
        ) : (
          <button disabled={reenviando} className="font-medium text-foreground hover:underline">
            Reenviar código
          </button>
        )}
      </div>
      <Turnstile reinicio={reenvio} />
      <MensajeForm error={reenvio.error} aviso={reenvio.aviso} />
    </form>
  );
}
