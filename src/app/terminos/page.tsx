import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Términos de uso" };

export default function Terminos() {
  return (
    <LegalPage title="Términos de uso">
      <p>
        Al usar {SITE_NAME} aceptas estos términos. Si no estás de acuerdo, por
        favor no uses el sitio.
      </p>

      <h2>El servicio</h2>
      <p>
        {SITE_NAME} es una plataforma gratuita y sin fines comerciales donde
        puedes escribir sermones, publicarlos, compartirlos y descargarlos en
        PDF. No cobramos por su uso ni mostramos publicidad.
      </p>

      <h2>Tu contenido</h2>
      <ul>
        <li>Tú conservas la propiedad de los sermones que escribes.</li>
        <li>
          Al publicar un sermón, nos autorizas a mostrarlo, permitir que otras
          personas lo lean, lo descarguen en PDF y lo compartan con tu nombre
          como autor.
        </li>
        <li>
          Puedes despublicar o eliminar tu contenido cuando quieras. Las copias
          que otras personas ya hayan descargado no podemos retirarlas.
        </li>
        <li>
          Eres responsable de que tu contenido sea tuyo o tengas permiso para
          usarlo. Si citas textos de otros autores, indica la fuente.
        </li>
      </ul>

      <h2>Conducta no permitida</h2>
      <ul>
        <li>Publicar contenido plagiado o que infrinja derechos de autor.</li>
        <li>Contenido ilegal, violento, sexual, difamatorio o que promueva el odio.</li>
        <li>Spam, publicidad, estafas o intentos de vender algo a otros usuarios.</li>
        <li>Intentar dañar, saturar o acceder sin permiso al sitio o a cuentas ajenas.</li>
        <li>Suplantar la identidad de otra persona o iglesia.</li>
      </ul>

      <h2>Moderación</h2>
      <p>
        Los usuarios pueden reportar contenido. Podemos ocultar o eliminar
        sermones y suspender cuentas que incumplan estos términos, con o sin
        aviso previo.
      </p>

      <h2>Sin garantías</h2>
      <p>
        El servicio se ofrece «tal cual», sin garantías de disponibilidad o de
        que esté libre de errores. Los sermones expresan la opinión de sus
        autores y no representan necesariamente la postura de {SITE_NAME}.
      </p>

      <h2>Cambios y contacto</h2>
      <p>
        Podemos modificar estos términos y publicaremos aquí la nueva versión.
        Para dudas o reportes escribe a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
