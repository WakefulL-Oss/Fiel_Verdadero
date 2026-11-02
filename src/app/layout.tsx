import type { Metadata, Viewport } from "next";
import { Lora, Roboto } from "next/font/google";
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
    { media: "(prefers-color-scheme: light)", color: "#fbf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#161015" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${lora.variable} ${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
