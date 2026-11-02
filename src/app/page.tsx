import { Encabezado } from "@/components/Encabezado";
import { Footer } from "@/components/Footer";
import { BotonSesion } from "@/features/auth/components/BotonSesion";
import { Caracteristicas } from "@/features/inicio/components/Caracteristicas";
import { Cierre } from "@/features/inicio/components/Cierre";
import { Hero } from "@/features/inicio/components/Hero";
import { NavInicio } from "@/features/inicio/components/NavInicio";

export default function Home() {
  return (
    <>
      <Encabezado nav={<NavInicio />}>
        <BotonSesion />
      </Encabezado>
      <main className="flex-1">
        <Hero acciones={<BotonSesion grande />} />
        <Caracteristicas />
        <Cierre acciones={<BotonSesion grande />} />
      </main>
      <Footer />
    </>
  );
}
