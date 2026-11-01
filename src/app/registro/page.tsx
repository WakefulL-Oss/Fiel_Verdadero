import type { Metadata } from "next";
import { Suspense } from "react";
import { RegistroForm } from "@/features/auth/components/RegistroForm";

export const metadata: Metadata = { title: "Crear cuenta" };

async function Formulario({ searchParams }: Pick<PageProps<"/registro">, "searchParams">) {
  const { confirmar } = await searchParams;
  return <RegistroForm correoInicial={typeof confirmar === "string" ? confirmar : undefined} />;
}

export default function Registro(props: PageProps<"/registro">) {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-16">
      <h1 className="mb-6 font-display text-3xl font-semibold">Crear cuenta</h1>
      <Suspense>
        <Formulario searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
