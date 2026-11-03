"use client";

import { useEffect, useRef, useState } from "react";
import { MensajeForm } from "./Formulario";

type Widget = {
  render(
    el: HTMLElement,
    opciones: {
      sitekey: string;
      appearance: "interaction-only";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ): string;
  reset(id: string): void;
  remove(id: string): void;
};

declare global {
  interface Window {
    turnstile?: Widget;
  }
}

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const ESPERA_MAXIMA = 20_000;

export const CAPTCHA_ACTIVO = Boolean(SITE_KEY);

function cargarScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.turnstile) return resolve();
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("turnstile")), { once: true });
  });
}

// Oculto: solo se muestra si Cloudflare exige interacción. `alCambiar` avisa si hay token vigente.
export function Turnstile({
  reinicio,
  alCambiar,
}: {
  reinicio?: unknown;
  alCambiar?: (token: string) => void;
}) {
  const contenedor = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>(undefined);
  const [token, setToken] = useState("");
  const [fallo, setFallo] = useState(false);

  useEffect(() => {
    if (!SITE_KEY) return;
    let activo = true;
    cargarScript()
      .then(() => {
        if (!activo || !contenedor.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(contenedor.current, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          callback: (nuevo) => {
            setToken(nuevo);
            setFallo(false);
          },
          "expired-callback": () => setToken(""),
          "error-callback": () => {
            setToken("");
            setFallo(true);
          },
        });
      })
      .catch(() => {
        if (activo) setFallo(true);
      });
    return () => {
      activo = false;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (!SITE_KEY || token) return;
    const espera = setTimeout(() => setFallo(true), ESPERA_MAXIMA);
    return () => clearTimeout(espera);
  }, [token]);

  useEffect(() => {
    alCambiar?.(token);
  }, [token, alCambiar]);

  useEffect(() => {
    if (!widgetId.current) return;
    window.turnstile?.reset(widgetId.current);
    setToken("");
    setFallo(false);
  }, [reinicio]);

  if (!SITE_KEY) return null;
  return (
    <>
      <div ref={contenedor} />
      {fallo && <MensajeForm error="No se pudo completar la verificación. Desactiva bloqueadores de contenido y recarga la página." />}
      <input type="hidden" name="captcha" value={token} />
    </>
  );
}
