import type { Metadata } from "next";

export const metadata: Metadata = { title: "Crear sermón" };

export default function NuevoSermon() {
  return (
    <div className="mx-auto max-w-[45rem]">
      <h1 className="sr-only">Crear sermón</h1>
      <p className="text-sm text-tenue">El editor aún no está disponible.</p>
    </div>
  );
}
