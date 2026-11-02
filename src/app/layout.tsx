import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Lora, Roboto } from "next/font/google";
import { Encabezado } from "@/components/Encabezado";
import { Footer } from "@/components/Footer";
import { BotonSesion } from "@/features/auth/components/BotonSesion";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Fiel y Verdadero",
    template: "%s | Fiel y Verdadero",
  },
  description:
    "Escribe, comparte y estudia sermones. Una biblioteca gratuita para la iglesia de habla hispana.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0ec" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1019" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${lora.variable} ${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Encabezado>
          <Suspense>
            <BotonSesion />
          </Suspense>
        </Encabezado>
        {children}
        <Footer />
      </body>
    </html>
  );
}
