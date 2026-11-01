import Link from "next/link";
import { LEGAL_UPDATED, SITE_NAME } from "@/lib/site";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <Link href="/" className="text-sm text-muted hover:text-accent">
        ← {SITE_NAME}
      </Link>
      <h1 className="mt-8 font-display text-4xl font-semibold sm:text-5xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Última actualización: {LEGAL_UPDATED}
      </p>
      <div className="mt-10 space-y-5 leading-relaxed [&_a]:text-accent [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </main>
  );
}
