import type { obtenerPropios, obtenerRecientes } from "./queries";

export type EstadoPropio = "borrador" | "publicado";
export type SermonReciente = Awaited<ReturnType<typeof obtenerRecientes>>[number];
export type SermonPropio = Awaited<ReturnType<typeof obtenerPropios>>[number];
