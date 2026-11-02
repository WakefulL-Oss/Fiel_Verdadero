import type { Metadata } from "next";
import { LegalPage, type Seccion } from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Términos de uso" };

const resumen = [
  "Eres el autor de lo que escribes; nosotros solo lo mostramos.",
  "Publica con respeto: sin odio, plagio ni contenido ajeno sin permiso.",
  "El servicio es gratuito, sin publicidad y se ofrece tal cual.",
];

const secciones: Seccion[] = [
  {
    titulo: "Aceptación",
    contenido: (
      <p>
        Al usar {SITE_NAME} aceptas estos términos. Si no estás de acuerdo, por favor no uses el
        sitio.
      </p>
    ),
  },
  {
    titulo: "El servicio",
    contenido: (
      <p>
        {SITE_NAME} es una plataforma gratuita y sin fines comerciales donde puedes escribir
        sermones, publicarlos, compartirlos y descargarlos en PDF. No cobramos por su uso ni
        mostramos publicidad.
      </p>
    ),
  },
  {
    titulo: "Tu contenido",
    contenido: (
      <ul>
        <li>Tú conservas la propiedad de los sermones que escribes.</li>
        <li>
          Al publicar un sermón, nos autorizas a mostrarlo y a permitir que otras personas lo lean,
          lo descarguen en PDF y lo compartan con tu nombre como autor.
        </li>
        <li>
          Puedes despublicar o eliminar tu contenido cuando quieras. Las copias que otras personas
          ya hayan descargado no podemos retirarlas.
        </li>
        <li>
          Eres responsable de que tu contenido sea tuyo o tengas permiso para usarlo. Si citas
          textos de otros autores, indica la fuente.
        </li>
      </ul>
    ),
  },
  {
    titulo: "Conducta no permitida",
    contenido: (
      <ul>
        <li>Publicar contenido plagiado o que infrinja derechos de autor.</li>
        <li>Contenido ilegal, violento, sexual, difamatorio o que promueva el odio.</li>
        <li>Spam, publicidad, estafas o intentos de vender algo a otros usuarios.</li>
        <li>Intentar dañar, saturar o acceder sin permiso al sitio o a cuentas ajenas.</li>
        <li>Suplantar la identidad de otra persona o iglesia.</li>
      </ul>
    ),
  },
  {
    titulo: "Moderación",
    contenido: (
      <p>
        Los usuarios pueden reportar contenido. Podemos ocultar o eliminar sermones y suspender
        cuentas que incumplan estos términos, con o sin aviso previo.
      </p>
    ),
  },
  {
    titulo: "Sin garantías",
    contenido: (
      <p>
        El servicio se ofrece «tal cual», sin garantías de disponibilidad o de que esté libre de
        errores. Los sermones expresan la opinión de sus autores y no representan necesariamente la
        postura de {SITE_NAME}.
      </p>
    ),
  },
  {
    titulo: "Cambios y contacto",
    contenido: (
      <p>
        Podemos modificar estos términos y publicaremos aquí la nueva versión. Para dudas o
        reportes escribe a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    ),
  },
];

export default function Terminos() {
  return (
    <LegalPage
      titulo="Términos de uso"
      lectura="3 min de lectura"
      resumen={resumen}
      secciones={secciones}
    />
  );
}
