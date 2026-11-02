import type { Metadata } from "next";
import {
  Clock,
  Database,
  FileDown,
  Info,
  KeyRound,
  Mail,
  ScrollText,
  Trash2,
  UserRound,
} from "lucide-react";
import { ESTILO_BOTON } from "@/components/Formulario";
import { EncabezadoLegal, Tarjeta } from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Eliminar mis datos" };

const SE_ELIMINA = [
  { icono: UserRound, texto: "Perfil: nombre, foto, iglesia y biografía" },
  { icono: KeyRound, texto: "Correo y datos de inicio de sesión" },
  { icono: ScrollText, texto: "Sermones, borradores, notas privadas y portadas" },
];

const SE_CONSERVA = [
  { icono: Database, texto: "Copias de seguridad cifradas, hasta tres meses" },
  { icono: FileDown, texto: "PDF que otras personas ya descargaron (no podemos retirarlos)" },
];

const ASUNTO = encodeURIComponent("Eliminar mis datos");

function Lista({ items }: { items: typeof SE_ELIMINA }) {
  return (
    <ul className="flex flex-col gap-2.5 px-4 py-3.5">
      {items.map(({ icono: Icono, texto }) => (
        <li key={texto} className="flex gap-2.5 text-sm leading-normal">
          <Icono size={15} className="mt-0.5 shrink-0 text-tenue" />
          {texto}
        </li>
      ))}
    </ul>
  );
}

export default function EliminarDatos() {
  return (
    <main className="flex flex-1 justify-center bg-background px-4 pt-10 pb-16 sm:px-6 lg:px-16 lg:pt-12 lg:pb-[72px]">
      <div className="flex w-full max-w-[720px] flex-col gap-7">
        <div className="flex flex-col gap-2.5">
          <EncabezadoLegal titulo="Eliminar tu cuenta y tus datos" lectura="2 min de lectura" />
          <p className="text-[15.5px] leading-[1.65] text-pretty">
            Puedes pedir en cualquier momento que borremos tu cuenta de {SITE_NAME} y todo lo que
            has publicado, incluidos los datos que recibimos si entraste con Facebook. Procesamos
            la solicitud en un máximo de 30 días y te confirmamos por correo.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Tarjeta titulo="Se elimina" icono={<Trash2 size={14} />}>
            <Lista items={SE_ELIMINA} />
          </Tarjeta>
          <Tarjeta titulo="Se conserva por un tiempo" icono={<Clock size={14} />}>
            <Lista items={SE_CONSERVA} />
          </Tarjeta>
        </div>

        <div className="overflow-hidden rounded-xl border border-border-suave bg-surface">
          <div className="flex flex-col gap-0.5 border-b border-linea px-[18px] py-3.5">
            <h2 className="font-display text-[17px] font-semibold text-foreground">
              Solicitar eliminación
            </h2>
            <span className="text-[13px] text-tenue">No necesitas haber iniciado sesión.</span>
          </div>
          <div className="flex flex-col gap-4 p-[18px] text-sm leading-normal">
            <ol className="list-decimal space-y-1.5 pl-5">
              <li>
                Escribe a{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                desde el correo con el que creaste tu cuenta.
              </li>
              <li>
                Usa el asunto <strong className="font-medium text-foreground">«Eliminar mis datos»</strong>.
              </li>
              <li>Si entraste con Facebook, indica el nombre que aparece en tu perfil.</li>
            </ol>
            <div className="flex gap-2.5 rounded-lg border border-aviso-borde bg-aviso px-3 py-2.5 text-[13px] leading-normal text-aviso-texto">
              <Info size={15} className="mt-px shrink-0" />
              <span>
                Quitar el acceso desde Facebook (<em>Configuración → Apps y sitios web</em>) no
                borra lo que ya guardamos; para eso usa esta solicitud.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-linea bg-background px-[18px] py-2.5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[12.5px] text-tenue">El borrado no se puede deshacer.</span>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${ASUNTO}`}
              className={`${ESTILO_BOTON.primarioChico} no-underline`}
            >
              <Mail size={14} />
              Escribir solicitud
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
