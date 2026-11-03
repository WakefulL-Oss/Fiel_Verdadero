import { BookOpen } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { fechaCorta } from "@/lib/fecha";
import type { SermonReciente } from "../types";

export function TarjetaSermon({ sermon }: { sermon: SermonReciente }) {
  const autor = sermon.autor?.nombre_completo ?? "";

  return (
    <article className="rounded-xl border border-border-suave bg-surface">
      <header className="flex items-center gap-2.5 px-4 pt-3.5">
        <Avatar nombre={autor} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-[13.5px] font-medium text-foreground">{autor}</span>
            <span className="shrink-0 rounded-full border border-aviso-borde bg-aviso px-2 text-[11px] leading-[18px] font-medium text-aviso-texto">
              Sermón
            </span>
          </div>
          {sermon.publicado_en && (
            <time dateTime={sermon.publicado_en} className="text-xs text-tenue">
              {fechaCorta(sermon.publicado_en)}
            </time>
          )}
        </div>
      </header>
      <div className="m-4 mt-3 rounded-lg border border-border-suave bg-background p-4">
        <h2 className="font-display text-xl leading-snug font-semibold text-foreground">{sermon.titulo}</h2>
        {sermon.resumen && <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed">{sermon.resumen}</p>}
        {sermon.pasaje_texto && (
          <p className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-foreground">
            <BookOpen size={14} className="shrink-0 text-tenue" />
            {sermon.pasaje_texto}
          </p>
        )}
      </div>
    </article>
  );
}
