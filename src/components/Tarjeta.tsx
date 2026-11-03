export function Tarjeta({
  titulo,
  accion,
  children,
}: {
  titulo?: string;
  accion?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border-suave bg-surface">
      {titulo && (
        <div className="flex items-center justify-between gap-3 border-b border-linea px-4 py-2.5">
          <h2 className="text-[13px] font-medium text-foreground">{titulo}</h2>
          {accion}
        </div>
      )}
      {children}
    </section>
  );
}
