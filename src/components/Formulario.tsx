import type { ComponentProps } from "react";

const PULSAR = "transition-[background-color,border-color,transform] duration-150 ease-salida active:scale-[0.97]";

const PRIMARIO = `inline-flex items-center justify-center gap-2 rounded-lg border border-primario bg-primario font-medium whitespace-nowrap text-primario-texto hover:bg-primario-hover disabled:opacity-60 ${PULSAR}`;
const SECUNDARIO = `inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface font-medium whitespace-nowrap text-foreground hover:border-border-fuerte hover:bg-panel disabled:opacity-60 ${PULSAR}`;

export const ESTILO_BOTON = {
  primario: `${PRIMARIO} h-[38px] px-4 text-sm`,
  secundario: `${SECUNDARIO} h-9 px-3 text-[13.5px]`,
  primarioChico: `${PRIMARIO} h-8 px-3 text-[13px]`,
  secundarioChico: `${SECUNDARIO} h-8 px-3 text-[13px]`,
  fantasma: `inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[13px] font-medium text-muted hover:bg-realce hover:text-foreground ${PULSAR}`,
};

export const ESTILO_CAMPO =
  "h-9 w-full rounded-lg border border-border bg-surface px-2.5 text-sm text-foreground outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-tenue hover:border-border-fuerte focus:border-accent focus:shadow-[0_0_0_3px_var(--anillo)]";

export function Etiqueta({ className = "", ...props }: ComponentProps<"label">) {
  return (
    <label {...props} className={`text-[13px] font-medium whitespace-nowrap text-foreground ${className}`} />
  );
}

export function Campo({ className = "", ...props }: ComponentProps<"input">) {
  return <input {...props} className={`${ESTILO_CAMPO} ${className}`} />;
}

export function Grupo({
  etiqueta,
  htmlFor,
  extra,
  children,
}: {
  etiqueta: string;
  htmlFor: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <Etiqueta htmlFor={htmlFor}>{etiqueta}</Etiqueta>
        {extra}
      </div>
      {children}
    </div>
  );
}

export function Tecla({ children, oscura = false }: { children: React.ReactNode; oscura?: boolean }) {
  const color = oscura
    ? "border-white/25 bg-white/10 text-primario-texto"
    : "border-border-suave bg-panel text-muted";
  return (
    <kbd
      className={`inline-flex h-[18px] min-w-[18px] items-center justify-center rounded border px-1 font-sans text-[11px] font-medium ${color}`}
    >
      {children}
    </kbd>
  );
}

export function Boton({
  variante = "primario",
  className = "",
  ...props
}: ComponentProps<"button"> & { variante?: keyof typeof ESTILO_BOTON }) {
  return <button {...props} className={`${ESTILO_BOTON[variante]} ${className}`} />;
}

export function MensajeForm({ error, aviso }: { error?: string; aviso?: string }) {
  if (error) {
    return (
      <p role="alert" className="text-[13px] text-error">
        {error}
      </p>
    );
  }
  return aviso ? (
    <p role="status" className="text-[13px] text-tenue">
      {aviso}
    </p>
  ) : null;
}
