export type ModoBarra = "expandida" | "contraida" | "cursor";

const CLAVE = "barra";

// Como SCRIPT_TEMA: aplica el modo guardado antes de pintar para que la barra no salte.
export const SCRIPT_BARRA = `(function(){try{var m=localStorage.getItem("${CLAVE}");if(m==="contraida"||m==="cursor")document.documentElement.dataset.barra=m}catch(e){}})()`;

export function leerBarra(): ModoBarra {
  try {
    const m = localStorage.getItem(CLAVE);
    return m === "contraida" || m === "cursor" ? m : "expandida";
  } catch {
    return "expandida";
  }
}

export function guardarBarra(modo: ModoBarra) {
  try {
    localStorage.setItem(CLAVE, modo);
  } catch {}
  if (modo === "expandida") delete document.documentElement.dataset.barra;
  else document.documentElement.dataset.barra = modo;
}
