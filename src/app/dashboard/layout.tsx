import { BotonSesion } from "@/features/auth/components/BotonSesion";
import { BarraLateral } from "@/features/panel/components/BarraLateral";
import { CabeceraPanel } from "@/features/panel/components/CabeceraPanel";

// Shell estático: sin leer la sesión aquí, para que se prerenderice y no frene a {children}.
// La cuenta llega en streaming (BotonSesion) y cada página verifica la sesión junto a sus datos.
export default function LayoutDashboard({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <CabeceraPanel>
        <BotonSesion dashboard={false} />
      </CabeceraPanel>
      <div className="flex flex-1">
        <BarraLateral />
        <main className="min-w-0 flex-1 bg-panel px-4 py-6 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
