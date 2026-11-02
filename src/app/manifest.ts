import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fiel y Verdadero",
    short_name: "Fiel y Verdadero",
    description: "Escribe, comparte y estudia sermones.",
    lang: "es",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F0EC",
    theme_color: "#3A1E3C",
    icons: [
      { src: "/marca/icono-pwa-192.png", sizes: "192x192", type: "image/png" },
      { src: "/marca/icono-pwa-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
