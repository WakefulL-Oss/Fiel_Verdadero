"use client";

import { useActionState } from "react";
import { enviarCodigo, verificarCodigo, type EstadoLogin } from "../actions";

const campo =
  "w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent";
const boton =
  "w-full rounded-md bg-accent px-3 py-2 font-medium text-background disabled:opacity-60";

export function LoginForm({ next }: { next?: string }) {
  const inicial: EstadoLogin = { paso: "correo" };
  const [pedido, pedir, pidiendo] = useActionState(enviarCodigo, inicial);
  const [verificado, verificar, verificando] = useActionState(verificarCodigo, {
    paso: "codigo",
  });

  if (pedido.paso === "correo") {
    return (
      <form action={pedir} className="space-y-3">
        <input
          name="correo"
          type="email"
          autoComplete="email"
          placeholder="Correo"
          defaultValue={pedido.correo}
          required
          className={campo}
        />
        {pedido.error && <p role="alert" className="text-sm text-red-600">{pedido.error}</p>}
        <button disabled={pidiendo} className={boton}>
          {pidiendo ? "Enviando…" : "Enviar código"}
        </button>
      </form>
    );
  }

  return (
    <form action={verificar} className="space-y-3">
      <p className="text-sm text-muted">Código enviado a {pedido.correo}</p>
      <input type="hidden" name="correo" value={pedido.correo} />
      {next && <input type="hidden" name="next" value={next} />}
      <input
        name="codigo"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="\d{6,8}"
        maxLength={8}
        placeholder="00000000"
        required
        autoFocus
        className={`${campo} text-center text-xl tracking-[0.4em]`}
      />
      {verificado.error && (
        <p role="alert" className="text-sm text-red-600">{verificado.error}</p>
      )}
      <button disabled={verificando} className={boton}>
        {verificando ? "Verificando…" : "Entrar"}
      </button>
    </form>
  );
}
