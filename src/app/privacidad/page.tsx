import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        {SITE_NAME} es un proyecto gratuito y sin fines comerciales para escribir,
        compartir y estudiar sermones. Esta política explica qué datos
        guardamos y cómo los tratamos.
      </p>

      <h2>Datos que recopilamos</h2>
      <ul>
        <li>
          <strong>Cuenta:</strong> tu correo electrónico, y si entras con
          Facebook, el nombre y la foto de perfil que Facebook comparte con
          nosotros.
        </li>
        <li>
          <strong>Contenido:</strong> los sermones, notas, etiquetas e imágenes
          de portada que tú escribes o subes.
        </li>
        <li>
          <strong>Técnicos:</strong> cookies de sesión necesarias para mantenerte
          conectado y registros básicos de funcionamiento del servidor.
        </li>
      </ul>

      <h2>Para qué los usamos</h2>
      <ul>
        <li>Crear y mantener tu cuenta, y permitirte iniciar sesión.</li>
        <li>Mostrar los sermones que decidas publicar.</li>
        <li>Enviarte el código de acceso a tu correo.</li>
        <li>Mantener la seguridad del sitio y moderar contenido reportado.</li>
      </ul>
      <p>
        No vendemos tus datos, no mostramos publicidad y no usamos tu
        información para perfiles comerciales.
      </p>

      <h2>Qué es público y qué es privado</h2>
      <p>
        Solo los sermones que marques como <em>publicados</em> son visibles para
        cualquier persona, junto con el nombre de su autor. Los borradores y las
        notas privadas solo las ves tú. Tu correo nunca se muestra públicamente.
      </p>

      <h2>Proveedores que tratan datos</h2>
      <ul>
        <li>Supabase: base de datos, autenticación y almacenamiento de imágenes.</li>
        <li>Vercel: alojamiento del sitio web.</li>
        <li>Resend: envío de los correos con tu código de acceso.</li>
        <li>Meta (Facebook): solo si eliges iniciar sesión con Facebook.</li>
      </ul>

      <h2>Tus derechos</h2>
      <p>
        Puedes pedir en cualquier momento acceder a tus datos, corregirlos o
        eliminar tu cuenta y todo tu contenido. Consulta{" "}
        <a href="/eliminar-datos">cómo eliminar tus datos</a>.
      </p>

      <h2>Conservación</h2>
      <p>
        Conservamos tus datos mientras tu cuenta exista. Al eliminarla, borramos
        tu perfil y tu contenido.
      </p>

      <h2>Menores de edad</h2>
      <p>
        El sitio no está dirigido a menores de 13 años y no recopilamos
        conscientemente sus datos.
      </p>

      <h2>Cambios y contacto</h2>
      <p>
        Podemos actualizar esta política y publicaremos aquí la fecha del
        cambio. Para cualquier consulta escribe a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
