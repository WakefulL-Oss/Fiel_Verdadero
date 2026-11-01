import type { ComponentProps } from "react";

export function Campo({ className = "", ...props }: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={`w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent ${className}`}
    />
  );
}

export function Boton({ className = "", ...props }: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={`w-full rounded-md bg-accent px-3 py-2 font-medium text-background disabled:opacity-60 ${className}`}
    />
  );
}

export function MensajeForm({ error, aviso }: { error?: string; aviso?: string }) {
  if (error) {
    return (
      <p role="alert" className="text-sm text-red-600 dark:text-red-400">
        {error}
      </p>
    );
  }
  return aviso ? <p className="text-sm text-muted">{aviso}</p> : null;
}
