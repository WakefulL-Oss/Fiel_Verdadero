import type { Metadata } from "next";
import { Suspense } from "react";
import { Tarjeta } from "@/components/Tarjeta";
import { ListaPropios } from "@/features/sermones/components/ListaPropios";

export const metadata: Metadata = { title: "Mis publicaciones" };

export default function Publicaciones() {
  return (
    <div className="mx-auto max-w-[45rem]">
      <h1 className="sr-only">Mis publicaciones</h1>
      <Tarjeta>
        <Suspense fallback={<p className="px-4 py-3 text-sm text-tenue">…</p>}>
          <ListaPropios estado="publicado" vacio="Aún no has publicado sermones." />
        </Suspense>
      </Tarjeta>
    </div>
  );
}
