import type { Metadata } from "next";
import { Suspense } from "react";
import { Recientes } from "@/features/sermones/components/Recientes";

export const metadata: Metadata = { title: "Sermones" };

export default function Sermones() {
  return (
    <div className="mx-auto max-w-[37.5rem]">
      <h1 className="sr-only">Sermones</h1>
      <Suspense fallback={<p className="text-sm text-tenue">…</p>}>
        <Recientes />
      </Suspense>
    </div>
  );
}
