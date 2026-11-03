import { LogoCompacto } from "@/components/marca/Logo";
import { SeccionActual } from "./SeccionActual";

export function CabeceraPanel({ children }: { children: React.ReactNode }) {
  return (
    <header className="no-imprimir sticky top-0 z-30 flex min-h-12 items-center gap-3 border-b border-border-suave bg-background px-4">
      <LogoCompacto href="/dashboard" />
      <SeccionActual />
      <div className="ml-auto flex items-center gap-2">{children}</div>
    </header>
  );
}
