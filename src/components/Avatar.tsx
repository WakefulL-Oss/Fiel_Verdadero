function iniciales(nombre: string) {
  const letras = nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p.charAt(0))
    .join("");
  return letras.toUpperCase() || "?";
}

const TAMANOS = {
  chico: "size-8 text-[11px]",
  mediano: "size-9 text-xs",
  grande: "size-10 text-[13px]",
};

export function Avatar({ nombre, tamano = "mediano" }: { nombre: string; tamano?: keyof typeof TAMANOS }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#3a1e3c] font-display font-semibold text-[#d9ae52] ${TAMANOS[tamano]}`}
    >
      {iniciales(nombre)}
    </span>
  );
}
