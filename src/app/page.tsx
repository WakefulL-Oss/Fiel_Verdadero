import { Menora } from "@/components/marca/Menora";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <Menora className="h-20 w-auto text-foreground" />
      <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-tight sm:text-5xl">
        Escribe, comparte y estudia sermones
      </h1>
      <p className="mt-4 max-w-xl text-muted">Gratis, siempre.</p>
    </main>
  );
}
