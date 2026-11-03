const BASE = "http://local.invalid";

// Solo rutas internas. Se interpreta como lo haría el navegador (que descarta tabuladores y
// saltos de línea), así que `/\t/otro.com` o `/%5Cotro.com` no escapan del sitio.
export function rutaSegura(destino: string | null | undefined, porDefecto = "/") {
  if (!destino || !destino.startsWith("/") || /[\u0000-\u001f\u007f\\]/.test(destino)) {
    return porDefecto;
  }
  try {
    const url = new URL(destino, BASE);
    if (url.origin !== BASE || url.pathname.startsWith("//")) return porDefecto;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return porDefecto;
  }
}
