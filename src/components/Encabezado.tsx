import { Logo } from "./marca/Logo";

export function Encabezado({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 border-b border-border-suave bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Logo />
        <div className="flex items-center gap-3">{children}</div>
      </div>
    </header>
  );
}
