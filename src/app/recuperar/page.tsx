import type { Metadata } from "next";
import { RecuperarForm } from "@/features/auth/components/RecuperarForm";

export const metadata: Metadata = { title: "Recuperar contraseña" };

export default function Recuperar() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-16">
      <h1 className="mb-6 font-display text-3xl font-semibold">Recuperar contraseña</h1>
      <RecuperarForm />
    </main>
  );
}
