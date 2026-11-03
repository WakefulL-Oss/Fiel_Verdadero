import type { Metadata } from "next";
import { Suspense } from "react";
import { AccesoDividido } from "@/features/auth/components/Acceso";
import { LeyendaLegal } from "@/features/auth/components/LeyendaLegal";
import { RegistroForm } from "@/features/auth/components/RegistroForm";

export const metadata: Metadata = { title: "Crear cuenta" };

const VERSICULO = {
  texto:
    "Entonces vi el cielo abierto; y he aquí un caballo blanco, y el que lo montaba se llamaba Fiel\u00a0y\u00a0Verdadero, y con justicia juzga y pelea.",
  cita: "Apocalipsis 19:11",
};

async function Formulario({ searchParams }: Pick<PageProps<"/registro">, "searchParams">) {
  const { confirmar } = await searchParams;
  return <RegistroForm correoInicial={typeof confirmar === "string" ? confirmar : undefined} />;
}

export default function Registro(props: PageProps<"/registro">) {
  return (
    <AccesoDividido versiculo={VERSICULO} pie={<LeyendaLegal />}>
      <Suspense>
        <Formulario searchParams={props.searchParams} />
      </Suspense>
    </AccesoDividido>
  );
}
