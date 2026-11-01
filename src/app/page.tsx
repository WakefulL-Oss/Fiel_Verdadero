import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted">
          Biblioteca de sermones
        </p>
        <h1 className="font-display text-5xl font-semibold sm:text-7xl">
          Fiel y Verdadero
        </h1>
        <p className="mt-6 max-w-xl text-lg font-light text-muted">
          Escribe, comparte y estudia sermones. Gratis, siempre.
        </p>
      </main>
      <Footer />
    </>
  );
}
