import type { Metadata } from "next";
import { LegalPage, type Seccion } from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Política de privacidad" };

const resumen = [
  "Solo pedimos lo necesario para tu cuenta: nombre, correo y contraseña.",
  "No vendemos tus datos ni mostramos publicidad.",
  "Puedes pedir que eliminemos tu cuenta y todo tu contenido cuando quieras.",
];

const secciones: Seccion[] = [
  {
    titulo: "Quién es responsable",
    contenido: (
      <p>
        {SITE_NAME} es un proyecto gratuito y sin fines comerciales para escribir, compartir y
        estudiar sermones. Para cualquier consulta escribe a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    ),
  },
  {
    titulo: "Qué datos recopilamos",
    contenido: (
      <ul>
        <li>
          <strong>Cuenta:</strong> tu nombre, tu correo electrónico y tu contraseña (guardada
          cifrada, nunca en texto legible). Si entras con Facebook, el nombre y la foto de perfil
          que Facebook comparte con nosotros.
        </li>
        <li>
          <strong>Contenido:</strong> los sermones, notas, etiquetas e imágenes de portada que
          escribes o subes.
        </li>
        <li>
          <strong>Técnicos:</strong> cookies de sesión necesarias para mantenerte conectado y
          registros básicos de funcionamiento del servidor.
        </li>
      </ul>
    ),
  },
  {
    titulo: "Para qué los usamos",
    contenido: (
      <>
        <ul>
          <li>Crear y mantener tu cuenta, y permitirte iniciar sesión.</li>
          <li>Mostrar los sermones que decidas publicar.</li>
          <li>
            Enviarte los códigos de verificación de tu correo y de recuperación de contraseña.
          </li>
          <li>Mantener la seguridad del sitio y moderar contenido reportado.</li>
        </ul>
        <p>
          No vendemos tus datos, no mostramos publicidad y no usamos tu información para perfiles
          comerciales.
        </p>
      </>
    ),
  },
  {
    titulo: "Qué es público y qué es privado",
    contenido: (
      <p>
        Solo los sermones que marques como <em>publicados</em> son visibles para cualquier
        persona, junto con el nombre de su autor. Los borradores y las notas privadas solo las ves
        tú. Tu correo nunca se muestra públicamente.
      </p>
    ),
  },
  {
    titulo: "Con quién los compartimos",
    contenido: (
      <ul>
        <li>Supabase: base de datos, autenticación y almacenamiento de imágenes.</li>
        <li>Vercel: alojamiento del sitio web.</li>
        <li>Resend: envío de los correos con tus códigos de verificación y recuperación.</li>
        <li>Cloudflare Turnstile: verificación anti-bots en los formularios de cuenta.</li>
        <li>Meta (Facebook): solo si eliges iniciar sesión con Facebook.</li>
      </ul>
    ),
  },
  {
    titulo: "Cuánto tiempo los guardamos",
    contenido: (
      <p>
        Mientras tu cuenta exista. Al eliminarla, borramos tu perfil y tu contenido. Las copias de
        seguridad cifradas se renuevan y desaparecen en un máximo de tres meses.
      </p>
    ),
  },
  {
    titulo: "Tus derechos",
    contenido: (
      <p>
        Puedes pedir en cualquier momento acceder a tus datos, corregirlos o eliminar tu cuenta y
        todo tu contenido. Consulta <a href="/eliminar-datos">cómo eliminar tus datos</a>.
      </p>
    ),
  },
  {
    titulo: "Menores de edad",
    contenido: (
      <p>
        El sitio no está dirigido a menores de 13 años y no recopilamos conscientemente sus datos.
      </p>
    ),
  },
  {
    titulo: "Cambios",
    contenido: (
      <p>Podemos actualizar esta política y publicaremos aquí la fecha del cambio.</p>
    ),
  },
];

export default function Privacidad() {
  return (
    <LegalPage
      titulo="Política de privacidad"
      lectura="4 min de lectura"
      resumen={resumen}
      secciones={secciones}
    />
  );
}
