import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Encabezado } from "@/components/Encabezado";
import { Footer } from "@/components/Footer";
import { BotonSalir } from "@/features/auth/components/BotonSalir";
import { obtenerPerfil, obtenerUsuario } from "@/features/auth/queries";

export const metadata: Metadata = { title: "Dashboard" };

async function Bienvenida() {
  const usuario = await obtenerUsuario();
  if (!usuario) redirect("/login?next=/dashboard");
  const perfil = await obtenerPerfil(usuario.id);
  const nombre = perfil?.nombre_completo?.split(" ")[0];

  return (
    <>
      <h1 className="font-display text-[28px] leading-tight font-bold text-foreground">
        {nombre ? `Hola, ${nombre}` : "Hola"}
      </h1>
      <p className="mt-6 rounded-xl border border-border-suave bg-surface px-5 py-4 text-[14.5px]">
        Todavía no tienes sermones. El editor llegará pronto.
      </p>
    </>
  );
}

export default function Dashboard() {
  return (
    <>
      <Encabezado seccion="Dashboard">
        <BotonSalir />
      </Encabezado>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-9 w-48 rounded-lg bg-realce" />}>
          <Bienvenida />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
