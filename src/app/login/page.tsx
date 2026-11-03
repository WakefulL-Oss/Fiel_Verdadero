import type { Metadata } from "next";
import { Suspense } from "react";
import { AccesoCentrado } from "@/features/auth/components/Acceso";
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
    <AccesoCentrado
      enlace={{ pregunta: "¿Nuevo aquí?", texto: "Crear cuenta", href: "/registro" }}
      enlaceMovil={{ pregunta: "¿No tienes cuenta?", texto: "Regístrate", href: "/registro" }}
    >
      <Suspense>
        <Formulario searchParams={props.searchParams} />
      </Suspense>
    </AccesoCentrado>
  );
}
