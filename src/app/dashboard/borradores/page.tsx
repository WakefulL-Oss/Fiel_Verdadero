import type { Metadata } from "next";
import { Suspense } from "react";
import { Tarjeta } from "@/components/Tarjeta";
import { ListaPropios } from "@/features/sermones/components/ListaPropios";

export const metadata: Metadata = { title: "Borradores" };

export default function Borradores() {
  return (
    <div className="mx-auto max-w-[45rem]">
      <h1 className="sr-only">Borradores</h1>
      <Tarjeta>
        <Suspense fallback={<p className="px-4 py-3 text-sm text-tenue">…</p>}>
          <ListaPropios estado="borrador" vacio="No tienes borradores." />
        </Suspense>
      </Tarjeta>
    </div>
  );
}
