import { LEGAL_UPDATED } from "@/lib/site";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
      <h1 className="text-balance font-display text-4xl font-bold leading-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted">Última actualización: {LEGAL_UPDATED}</p>
      <div className="mt-8 space-y-4 leading-relaxed text-muted [&_a]:text-foreground [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </main>
  );
}
