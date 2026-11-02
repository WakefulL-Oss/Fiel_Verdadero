import { Encabezado } from "@/components/Encabezado";
import { Footer } from "@/components/Footer";
import { NavLegal } from "@/components/legal/NavLegal";
import { BotonSesion } from "@/features/auth/components/BotonSesion";

export default function LayoutLegal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Encabezado
        seccion="Legal"
        nav={<NavLegal className="flex" />}
        subnav={<NavLegal className="flex h-10" />}
      >
        <BotonSesion />
      </Encabezado>
      {children}
      <Footer />
    </>
  );
}
