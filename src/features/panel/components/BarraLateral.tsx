"use client";

import { PanelLeftDashed, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Tecla } from "@/components/Formulario";
import {
  Menu,
  MenuContenido,
  MenuDisparador,
  MenuEtiqueta,
  MenuRadioGrupo,
  MenuRadioItem,
} from "@/components/ui/Menu";
import { guardarBarra, leerBarra, type ModoBarra } from "@/lib/barra";
import { CREAR, GRUPOS, INICIO, seccionActual, type Seccion } from "../navegacion";

const ITEM =
  "flex h-10 shrink-0 items-center rounded-lg text-[13.5px] whitespace-nowrap no-underline outline-none transition-colors focus-visible:bg-realce";
const NORMAL = "text-muted hover:bg-realce hover:text-foreground";
const ACTIVO = "bg-realce font-medium text-foreground";

function Item({ seccion, activo }: { seccion: Seccion; activo: boolean }) {
  const { href, etiqueta, Icono } = seccion;
  return (
    <Link
      href={href}
      title={etiqueta}
      aria-current={activo ? "page" : undefined}
      className={`${ITEM} ${activo ? ACTIVO : NORMAL}`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center">
        <Icono size={18} strokeWidth={1.75} />
      </span>
      <span className="barra-etiqueta truncate pr-2">{etiqueta}</span>
    </Link>
  );
}

const IGNORAR = 'input, textarea, select, [role="menu"], [role="dialog"], [role="listbox"]';

function esCampo(objetivo: EventTarget | null) {
  return objetivo instanceof HTMLElement && (objetivo.isContentEditable || !!objetivo.closest(IGNORAR));
}

// En modo cursor, la barra sigue abierta mientras su menú lo esté (el menú vive en un portal).
function ControlBarra({ alAbrir }: { alAbrir: (abierto: boolean) => void }) {
  const [modo, setModo] = useState<ModoBarra>(leerBarra);

  function cambiar(valor: string) {
    const nuevo = valor as ModoBarra;
    setModo(nuevo);
    guardarBarra(nuevo);
  }

  return (
    <Menu onOpenChange={alAbrir}>
      <MenuDisparador title="Barra lateral" className={`${ITEM} ${NORMAL} hidden cursor-pointer md:flex`}>
        <span className="flex size-10 shrink-0 items-center justify-center">
          <PanelLeftDashed size={18} strokeWidth={1.75} />
        </span>
        <span className="barra-etiqueta truncate pr-2">Barra lateral</span>
      </MenuDisparador>
      <MenuContenido side="right" align="end" className="w-56">
        <MenuEtiqueta>Control de la barra lateral</MenuEtiqueta>
        <MenuRadioGrupo value={modo} onValueChange={cambiar}>
          <MenuRadioItem value="expandida">Expandida</MenuRadioItem>
          <MenuRadioItem value="contraida">Contraída</MenuRadioItem>
          <MenuRadioItem value="cursor">Expandir al pasar el cursor</MenuRadioItem>
        </MenuRadioGrupo>
      </MenuContenido>
    </Menu>
  );
}

export function BarraLateral() {
  const actual = seccionActual(usePathname())?.href;
  const router = useRouter();
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    function alPulsar(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== "c" || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.repeat) return;
      if (esCampo(e.target)) return;
      router.push(CREAR.href);
    }
    addEventListener("keydown", alPulsar);
    return () => removeEventListener("keydown", alPulsar);
  }, [router]);

  return (
    <aside className="barra no-imprimir relative z-20 shrink-0 bg-background">
      <nav
        aria-label="Escritorio"
        data-abierta={menuAbierto || undefined}
        className="barra-panel sticky top-12 flex min-h-[calc(100dvh-3rem)] flex-col gap-0.5 overflow-hidden border-r border-border-suave bg-background p-2"
      >
        <Item seccion={INICIO} activo={actual === INICIO.href} />
        <Link
          href={CREAR.href}
          title={`${CREAR.etiqueta} (C)`}
          aria-current={actual === CREAR.href ? "page" : undefined}
          className={`${ITEM} ${actual === CREAR.href ? ACTIVO : NORMAL} text-foreground`}
        >
          <span className="flex size-10 shrink-0 items-center justify-center">
            <span className="flex size-[26px] items-center justify-center rounded-md bg-[#3a1e3c] text-[#d9ae52]">
              <Plus size={15} strokeWidth={2.25} />
            </span>
          </span>
          <span className="barra-etiqueta flex flex-1 items-center justify-between gap-2 pr-2 font-medium">
            {CREAR.etiqueta}
            <Tecla>C</Tecla>
          </span>
        </Link>
        {GRUPOS.map((grupo, i) => (
          <Fragment key={i}>
            <div aria-hidden className="mx-2 my-1.5 h-px shrink-0 bg-border-suave" />
            {grupo.map((s) => (
              <Item key={s.href} seccion={s} activo={actual === s.href} />
            ))}
          </Fragment>
        ))}
        <div className="flex-1" />
        <ControlBarra alAbrir={setMenuAbierto} />
      </nav>
    </aside>
  );
}
