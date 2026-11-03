import Link from "next/link";
import { Avatar } from "@/components/Avatar";

export function Compositor({ nombre }: { nombre: string }) {
  const primero = nombre.split(" ")[0];
  return (
    <Link
      href="/dashboard/sermones/nuevo"
      className="flex items-center gap-3 rounded-xl border border-border-suave bg-surface p-3 no-underline transition-colors hover:border-border"
    >
      <Avatar nombre={nombre} tamano="grande" />
      <span className="flex h-10 min-w-0 flex-1 items-center rounded-full border border-border-suave bg-background px-4 text-sm text-tenue">
        <span className="truncate">¿Qué te ha hablado Dios hoy{primero ? `, ${primero}` : ""}?</span>
      </span>
    </Link>
  );
}
