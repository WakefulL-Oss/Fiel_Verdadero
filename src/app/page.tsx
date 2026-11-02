import { Suspense } from "react";
import { Encabezado } from "@/components/Encabezado";
import { Footer } from "@/components/Footer";
import { Menora } from "@/components/marca/Menora";
import { BotonSesion } from "@/features/auth/components/BotonSesion";

export default function Home() {
  return (
    <>
      <Encabezado>
        <Suspense>
          <BotonSesion />
        </Suspense>
      </Encabezado>
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <Menora className="h-16 w-auto text-foreground" />
        <h1 className="mt-6 font-display text-[34px] leading-[1.1] font-bold text-balance text-foreground sm:text-[44px]">
          Escribe, comparte y estudia sermones
        </h1>
        <p className="mt-3 text-[15px]">Gratis, siempre.</p>
      </main>
      <Footer />
    </>
  );
}
