import { LogoCompacto } from "./marca/Logo";

export function Encabezado({
  seccion,
  children,
}: {
  seccion?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="no-imprimir sticky top-0 z-10 border-b border-border-suave bg-background/90 backdrop-blur">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
        <LogoCompacto />
        {seccion && (
          <span className="hidden items-center gap-4 sm:flex">
            <span aria-hidden className="text-lg font-light text-border">/</span>
            <span className="text-[13.5px] text-tenue">{seccion}</span>
          </span>
        )}
        <div className="ml-auto flex items-center gap-0.5">{children}</div>
      </div>
    </header>
  );
}
