import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Tarjeta } from "@/components/Tarjeta";
import { obtenerPerfil } from "@/features/auth/queries";
import { Compositor } from "@/features/sermones/components/Compositor";
import { ListaPropios } from "@/features/sermones/components/ListaPropios";
import { Recientes } from "@/features/sermones/components/Recientes";

export const metadata: Metadata = { title: "Inicio" };

async function CompositorUsuario() {
  const perfil = await obtenerPerfil();
  if (!perfil) redirect("/login?next=/dashboard");
  return <Compositor nombre={perfil.nombre} />;
}

const HUECO = <div className="min-h-[66px] rounded-xl border border-border-suave bg-surface" />;

export default function Inicio() {
  return (
    <div className="mx-auto flex max-w-[57rem] gap-6">
      <h1 className="sr-only">Inicio</h1>
      <div className="flex min-w-0 max-w-[37.5rem] flex-1 flex-col gap-4">
        <Suspense fallback={HUECO}>
          <CompositorUsuario />
        </Suspense>
        <Recientes />
      </div>
      <aside className="hidden w-[18.75rem] shrink-0 xl:block">
        <Tarjeta
          titulo="Tus borradores"
          accion={
            <Link href="/dashboard/borradores" className="text-xs text-muted hover:text-foreground">
              Ver todos
            </Link>
          }
        >
          <Suspense fallback={<p className="px-4 py-3 text-sm text-tenue">…</p>}>
            <ListaPropios estado="borrador" vacio="No tienes borradores." limite={5} />
          </Suspense>
        </Tarjeta>
      </aside>
    </div>
  );
}
