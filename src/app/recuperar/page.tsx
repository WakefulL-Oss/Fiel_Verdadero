import type { Metadata } from "next";
import { AccesoDividido } from "@/features/auth/components/Acceso";
import { RecuperarForm } from "@/features/auth/components/RecuperarForm";

export const metadata: Metadata = { title: "Recuperar contraseña" };

const VERSICULO = {
  texto: "Nuevas son cada mañana; grande es tu fidelidad.",
  cita: "Lamentaciones 3:23",
};

export default function Recuperar() {
  return (
    <AccesoDividido versiculo={VERSICULO}>
      <RecuperarForm />
    </AccesoDividido>
  );
}
