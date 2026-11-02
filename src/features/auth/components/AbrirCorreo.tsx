import { Mail } from "lucide-react";
import { boton } from "@/components/Formulario";

const BUZONES = [
  { nombre: "Gmail", href: "https://mail.google.com/mail/u/0/#inbox" },
  { nombre: "Outlook", href: "https://outlook.live.com/mail/0/" },
];

export function AbrirCorreo() {
  return (
    <div className="flex gap-2">
      {BUZONES.map(({ nombre, href }) => (
        <a
          key={nombre}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${boton("normal", "mediano")} flex-1`}
        >
          <Mail size={14} />
          Abrir {nombre}
        </a>
      ))}
    </div>
  );
}
