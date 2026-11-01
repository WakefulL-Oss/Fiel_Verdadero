import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Eliminar mis datos" };

export default function EliminarDatos() {
  return (
    <LegalPage title="Eliminar mis datos">
      <p>
        Puedes pedir en cualquier momento que eliminemos tu cuenta de{" "}
        {SITE_NAME} y todos los datos asociados, incluidos los que recibimos al
        iniciar sesión con Facebook.
      </p>

      <h2>Cómo solicitarlo</h2>
      <ol className="list-decimal space-y-2 pl-6">
        <li>
          Escribe a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{" "}
          desde el correo con el que creaste tu cuenta.
        </li>
        <li>
          Usa el asunto <strong>«Eliminar mis datos»</strong>.
        </li>
        <li>
          Si entraste con Facebook, indica también el nombre que aparece en tu
          perfil para poder identificar tu cuenta.
        </li>
      </ol>

      <h2>Qué eliminamos</h2>
      <ul>
        <li>Tu perfil (nombre, foto, iglesia y biografía).</li>
        <li>Tu correo y los datos de inicio de sesión.</li>
        <li>Tus sermones, borradores, notas privadas e imágenes de portada.</li>
      </ul>

      <h2>Plazo</h2>
      <p>
        Procesamos la solicitud en un máximo de 30 días y te confirmaremos por
        correo cuando esté terminada.
      </p>

      <h2>Datos en Facebook</h2>
      <p>
        También puedes quitar el acceso de {SITE_NAME} desde tu cuenta de
        Facebook, en <em>Configuración → Seguridad e inicio de sesión → Apps y
        sitios web</em>. Esto no elimina los datos que ya guardamos; para eso
        usa el procedimiento de arriba.
      </p>
    </LegalPage>
  );
}
