// Zona fija: el servidor y la caché deben producir el mismo texto para todos.
const CORTA = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function fechaCorta(iso: string) {
  return CORTA.format(new Date(iso));
}
