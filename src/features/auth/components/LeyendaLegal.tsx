import Link from "next/link";

// Solo en el primer paso del registro: se oculta cuando la página muestra el paso 2 (Pasos actual=2).
export function LeyendaLegal({ centrada = false }: { centrada?: boolean }) {
  return (
    <p className={`text-center text-xs leading-normal text-tenue ${centrada ? "" : "sm:text-left"} [body:has([data-actual='2'])_&]:hidden`}>
      Al continuar, aceptas los{" "}
      <Link href="/terminos" className="text-muted underline">Términos</Link> y la{" "}
      <Link href="/privacidad" className="text-muted underline">Política de privacidad</Link>.
    </p>
  );
}
