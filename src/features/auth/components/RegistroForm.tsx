"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Boton, Campo, MensajeForm } from "@/components/Formulario";
import { Turnstile } from "@/components/Turnstile";
import { reenviarCodigo, registrar, verificarRegistro, type EstadoAuth } from "../actions";
import { CampoCodigo } from "./CampoCodigo";

export function RegistroForm({ correoInicial }: { correoInicial?: string }) {
  const inicial: EstadoAuth = correoInicial
    ? { paso: "codigo", correo: correoInicial, aviso: "Confirma tu correo con el código que te enviamos" }
    : { paso: "datos" };
  const [registro, registrarAccion, registrando] = useActionState(registrar, inicial);
  const [verificado, verificarAccion, verificando] = useActionState(verificarRegistro, {
    paso: "codigo",
  } as EstadoAuth);
  const [reenvio, reenviarAccion, reenviando] = useActionState(reenviarCodigo, {
    paso: "codigo",
  } as EstadoAuth);

  if (registro.paso === "datos") {
    return (
      <form action={registrarAccion} className="space-y-3">
        <Campo
          name="correo"
          type="email"
          autoComplete="email"
          placeholder="Correo"
          defaultValue={registro.correo}
          required
        />
        <Campo
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Contraseña (mín. 8, letras y números)"
          minLength={8}
          maxLength={72}
          required
        />
        <Turnstile reinicio={registro} />
        <MensajeForm error={registro.error} />
        <Boton disabled={registrando}>{registrando ? "Creando…" : "Crear cuenta"}</Boton>
        <p className="text-sm text-muted">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="hover:text-foreground">
            Entrar
          </Link>
        </p>
      </form>
    );
  }

  return (
    <div className="space-y-3">
      <form action={verificarAccion} className="space-y-3">
        <p className="text-sm text-muted">Código enviado a {registro.correo}</p>
        <input type="hidden" name="correo" value={registro.correo} />
        <CampoCodigo />
        <MensajeForm error={verificado.error} aviso={registro.aviso} />
        <Boton disabled={verificando}>{verificando ? "Verificando…" : "Verificar"}</Boton>
      </form>
      <form action={reenviarAccion} className="text-sm">
        <input type="hidden" name="correo" value={registro.correo} />
        <Turnstile reinicio={reenvio} />
        <button disabled={reenviando} className="text-muted hover:text-foreground">
          Reenviar código
        </button>
        <MensajeForm error={reenvio.error} aviso={reenvio.aviso} />
      </form>
    </div>
  );
}
