import { Campo } from "@/components/Formulario";

export function CampoCodigo() {
  return (
    <Campo
      name="codigo"
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="\d{6,8}"
      maxLength={8}
      placeholder="00000000"
      required
      autoFocus
      className="text-center text-xl tracking-[0.4em]"
    />
  );
}
