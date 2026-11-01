export function rutaSegura(destino: string | null | undefined, porDefecto = "/") {
  if (!destino || !destino.startsWith("/") || destino.startsWith("//") || destino.includes("\\")) {
    return porDefecto;
  }
  return destino;
}
