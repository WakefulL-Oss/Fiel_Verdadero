import type { ComponentProps } from "react";

const BASE_BOTON =
  "inline-flex items-center justify-center rounded-[10px] px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60";

export const ESTILO_BOTON = {
  primario: `${BASE_BOTON} bg-primario text-primario-texto hover:opacity-90`,
  secundario: `${BASE_BOTON} text-foreground ring-[1.5px] ring-inset ring-border hover:bg-surface`,
};

export function Campo({ className = "", ...props }: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={`w-full rounded-[10px] border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground ${className}`}
    />
  );
}

export function Boton({
  variante = "primario",
  className = "",
  ...props
}: ComponentProps<"button"> & { variante?: keyof typeof ESTILO_BOTON }) {
  return <button {...props} className={`w-full ${ESTILO_BOTON[variante]} ${className}`} />;
}

export function MensajeForm({ error, aviso }: { error?: string; aviso?: string }) {
  if (error) {
    return (
      <p role="alert" className="text-sm text-error">
        {error}
      </p>
    );
  }
  return aviso ? <p className="text-sm text-muted">{aviso}</p> : null;
}
