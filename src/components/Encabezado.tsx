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
      <div className="mx-auto flex h-16 max-w-[75rem] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />
        {seccion && (
          <span className="hidden items-center gap-4 sm:flex">
            <span aria-hidden className="text-lg font-light text-border">/</span>
            <span className="text-[13.5px] text-tenue">{seccion}</span>
          </span>
        )}
        {nav && <div className="hidden h-full md:flex">{nav}</div>}
        <div className="ml-auto flex items-center gap-2">{children}</div>
      </div>
      {subnav && (
        <div className="overflow-x-auto border-t border-linea px-2.5 md:hidden">{subnav}</div>
      )}
    </header>
  );
}

// Enlace de navegación al estilo de Supabase: sin fondo; el texto se ilumina al pasar el cursor.
export const ENLACE_NAV =
  "flex h-full items-center px-2.5 text-sm font-medium no-underline transition-colors duration-200 hover:text-accent focus-visible:text-accent";
