import type { Metadata } from "next";
import { Suspense } from "react";
import { AccesoDividido } from "@/features/auth/components/Acceso";
import { RegistroForm } from "@/features/auth/components/RegistroForm";

export const metadata: Metadata = { title: "Crear cuenta" };

const VERSICULO = {
  texto: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
  cita: "Salmo 119:105",
};

async function Formulario({ searchParams }: Pick<PageProps<"/registro">, "searchParams">) {
  const { confirmar } = await searchParams;
  return <RegistroForm correoInicial={typeof confirmar === "string" ? confirmar : undefined} />;
}

export default function Registro(props: PageProps<"/registro">) {
  return (
    <AccesoDividido versiculo={VERSICULO}>
      <Suspense>
        <Formulario searchParams={props.searchParams} />
      </Suspense>
    </AccesoDividido>
  );
}
