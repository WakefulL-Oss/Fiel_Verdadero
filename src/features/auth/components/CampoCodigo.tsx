export function CampoCodigo() {
  return (
    <input
      name="codigo"
      aria-label="Código"
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="\d{6,8}"
      maxLength={8}
      placeholder="00000000"
      required
      autoFocus
      className="h-[60px] w-full rounded-[10px] border border-border bg-surface text-center font-display text-[26px] font-semibold tracking-[0.35em] text-foreground outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-border hover:border-border-fuerte focus:border-foco"
    />
  );
}
