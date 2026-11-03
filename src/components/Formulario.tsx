import type { ComponentProps } from "react";

// Botones al estilo de Supabase (packages/ui Button): sombras en vez de borde, curva
// cubic-bezier(0.22,1,0.36,1) de 200 ms y escala 0.97 al pulsar.
const BASE =
  "relative inline-flex cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap no-underline transition-[background-color,color,scale] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const VARIANTES = {
  primario:
    "bg-primario bg-[linear-gradient(to_bottom,rgb(255_255_255/0.015),rgb(0_0_0/0.01))] text-primario-texto shadow-[var(--sombra-boton-elevada)] hover:bg-primario-hover",
  normal: "bg-surface text-foreground shadow-[var(--sombra-boton)] hover:bg-realce",
  suave:
    "bg-surface text-foreground shadow-[var(--sombra-boton)] hover:bg-[color-mix(in_srgb,var(--realce)_30%,var(--surface))]",
  texto: "text-muted hover:bg-realce hover:text-foreground",
};

const TAMANOS = {
  chico: "h-[26px] rounded-md px-2.5 text-xs",
  mediano: "h-[34px] rounded-[9px] px-3 text-sm",
  grande: "h-[38px] rounded-[9px] px-4 text-sm",
};

type Variante = keyof typeof VARIANTES;
type Tamano = keyof typeof TAMANOS;

export function boton(variante: Variante = "primario", tamano: Tamano = "grande") {
  return `${BASE} ${VARIANTES[variante]} ${TAMANOS[tamano]}`;
}

const ESTILO_CAMPO =
  "h-9 w-full rounded-lg border border-border bg-surface px-2.5 text-sm text-foreground outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-tenue hover:border-border-fuerte focus:border-foco";

function Etiqueta({ className = "", ...props }: ComponentProps<"label">) {
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
  variante,
  tamano,
  className = "",
  ...props
}: ComponentProps<"button"> & { variante?: Variante; tamano?: Tamano }) {
  return <button {...props} className={`${boton(variante, tamano)} ${className}`} />;
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
