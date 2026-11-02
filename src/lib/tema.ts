export type Tema = "light" | "dark" | "system";

const CLAVE = "tema";
const OSCURO = "(prefers-color-scheme: dark)";

// Script fijo (sin datos de usuario) que corre antes de pintar: aplica el tema guardado o el
// del sistema, y sigue al sistema si cambia mientras no haya una elección explícita.
export const SCRIPT_TEMA = `(function(){function a(){var t;try{t=localStorage.getItem("${CLAVE}")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("${OSCURO}").matches?"dark":"light";document.documentElement.dataset.theme=t}a();matchMedia("${OSCURO}").addEventListener("change",a)})()`;

export function leerTema(): Tema {
  try {
    const t = localStorage.getItem(CLAVE);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

export function guardarTema(tema: Tema) {
  try {
    localStorage.setItem(CLAVE, tema);
  } catch {}
  const oscuro = tema === "dark" || (tema === "system" && matchMedia(OSCURO).matches);
  document.documentElement.dataset.theme = oscuro ? "dark" : "light";
}
