import { BotonTema } from "./BotonTema";
import { Logo } from "./marca/Logo";

export function Encabezado({
  seccion,
  nav,
  subnav,
  children,
}: {
  seccion?: string;
  nav?: React.ReactNode;
  subnav?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="no-imprimir sticky top-0 z-10 border-b border-border-suave bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />
        {seccion && (
          <span className="hidden items-center gap-4 sm:flex">
            <span aria-hidden className="text-lg font-light text-border">/</span>
            <span className="text-[13.5px] text-tenue">{seccion}</span>
          </span>
        )}
        {nav && <nav className="hidden items-center gap-1 md:flex">{nav}</nav>}
        <div className="ml-auto flex items-center gap-2">
          {children}
          <BotonTema />
        </div>
      </div>
      {subnav && (
        <div className="overflow-x-auto border-t border-linea px-2.5 py-1.5 md:hidden">{subnav}</div>
      )}
    </header>
  );
}
