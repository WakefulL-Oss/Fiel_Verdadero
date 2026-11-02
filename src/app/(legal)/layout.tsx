
import { Encabezado } from "@/components/Encabezado";
import { Footer } from "@/components/Footer";
import { NavLegal } from "@/components/legal/NavLegal";
import { BotonSesion } from "@/features/auth/components/BotonSesion";

export default function LayoutLegal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Encabezado seccion="Legal" subnav={<NavLegal className="flex" />}>
        <NavLegal className="hidden md:flex" />
        <span aria-hidden className="mx-2.5 hidden h-5 w-px bg-border-suave md:block" />
        <BotonSesion />
      </Encabezado>
      {children}
      <Footer />
    </>
  );
}
