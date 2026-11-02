"use client";

import { useEffect, useRef, useState } from "react";

type Widget = {
  render(
    el: HTMLElement,
    opciones: {
      sitekey: string;
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

function cargarScript() {
  return new Promise<void>((resolve) => {
    if (window.turnstile) return resolve();
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => resolve(), { once: true });
  });
}

export function Turnstile({ reinicio }: { reinicio?: unknown }) {
  const contenedor = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>(undefined);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!SITE_KEY) return;
    let activo = true;
    cargarScript().then(() => {
      if (!activo || !contenedor.current || !window.turnstile) return;
      widgetId.current = window.turnstile.render(contenedor.current, {
        sitekey: SITE_KEY,
        callback: setToken,
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    });
    return () => {
      activo = false;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (!widgetId.current) return;
    window.turnstile?.reset(widgetId.current);
    setToken("");
  }, [reinicio]);

  if (!SITE_KEY) return null;
  return (
    <>
      <div ref={contenedor} />
      <input type="hidden" name="captcha" value={token} />
    </>
  );
}
