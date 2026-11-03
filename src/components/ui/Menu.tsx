"use client";

import * as DM from "@radix-ui/react-dropdown-menu";
import { Circle } from "lucide-react";

const ITEM =
  "relative flex cursor-pointer select-none items-center gap-2 rounded-[5px] py-1.5 text-xs text-muted no-underline outline-none transition-colors data-[highlighted]:bg-realce data-[highlighted]:text-foreground";

export function Menu(props: DM.DropdownMenuProps) {
  return <DM.Root modal={false} {...props} />;
}

export const MenuDisparador = DM.Trigger;
export const MenuRadioGrupo = DM.RadioGroup;

export function MenuContenido({ className = "", ...props }: DM.DropdownMenuContentProps) {
  return (
    <DM.Portal>
      <DM.Content
        sideOffset={6}
        collisionPadding={8}
        {...props}
        className={`menu-contenido z-50 min-w-32 overflow-hidden rounded-md border border-border-suave bg-surface p-1.5 shadow-[var(--sombra-menu)] ${className}`}
      />
    </DM.Portal>
  );
}

export function MenuItem({ className = "", ...props }: DM.DropdownMenuItemProps) {
  return <DM.Item {...props} className={`${ITEM} px-2.5 ${className}`} />;
}

export function MenuRadioItem({ children, ...props }: DM.DropdownMenuRadioItemProps) {
  return (
    <DM.RadioItem {...props} className={`${ITEM} pr-2 pl-8`}>
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <DM.ItemIndicator>
          <Circle className="size-2 fill-current" />
        </DM.ItemIndicator>
      </span>
      {children}
    </DM.RadioItem>
  );
}

export function MenuEtiqueta(props: DM.DropdownMenuLabelProps) {
  return <DM.Label {...props} className="px-2 py-1.5 text-xs text-tenue" />;
}

export function MenuSeparador() {
  return <DM.Separator className="-mx-1 my-1 h-px bg-border-suave" />;
}
