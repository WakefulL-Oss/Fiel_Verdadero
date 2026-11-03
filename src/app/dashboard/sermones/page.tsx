import type { Metadata } from "next";
import { Recientes } from "@/features/sermones/components/Recientes";

export const metadata: Metadata = { title: "Sermones" };

export default function Sermones() {
  return (
    <div className="mx-auto max-w-[37.5rem]">
      <h1 className="sr-only">Sermones</h1>
      <Recientes />
    </div>
  );
}
