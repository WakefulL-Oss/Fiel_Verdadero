import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { rutaSegura } from "@/lib/ruta-segura";

export const metadata: Metadata = { title: "Entrar" };

async function Formulario({ searchParams }: Pick<PageProps<"/login">, "searchParams">) {
  const { next } = await searchParams;
  const destino = typeof next === "string" ? rutaSegura(next) : undefined;
  return <LoginForm next={destino} />;
}

export default function Login(props: PageProps<"/login">) {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-16">
      <h1 className="mb-6 font-display text-3xl font-semibold">Entrar</h1>
      <Suspense>
        <Formulario searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}
