# Handoff: Marca «Fiel y Verdadero»

## Overview
Identidad visual de **Fiel y Verdadero**, app web (y futura app móvil) cristiana para escribir sermones desde cero, compartirlos, exportarlos a PDF y publicar ideas, citas, frases y estudios. El símbolo es una menorá de 7 brazos; la llama central (en oro) representa a Cristo, «Fiel y Verdadero» (Ap 19:11).

## About the Design Files
Los archivos de este paquete son **referencias de diseño**. `referencia/Logos Fiel y Verdadero.dc.html` es un prototipo en HTML que muestra cómo se ve y se usa la marca, no código para copiar directo. La tarea es **recrear estos diseños en el entorno del proyecto** (React/Next, Vue, React Native, Flutter, etc.) con sus patrones. Si aún no hay código, elige el framework más adecuado. Los **SVG y PNG de `menora/`, `icono-app/`, `favicon/`, `redes/` y `png/` sí son assets finales** y se usan tal cual.

## Fidelity
**Alta fidelidad (hi-fi).** Colores, tipografías y proporciones son finales.

## Design Tokens

### Colores (paleta «Púrpura real»)
| Token | Hex | Uso |
|---|---|---|
| `--fv-purpura` | `#3A1E3C` | Tinta principal, títulos, fondo de iconos y botones primarios |
| `--fv-oro` | `#B8892E` | Llama, acentos, la «y» del logo (sobre fondo claro) |
| `--fv-oro-claro` | `#D9AE52` | Oro sobre fondo púrpura (más contraste) |
| `--fv-marfil` | `#F5F0EC` | Fondo de página/tarjetas, texto sobre púrpura |
| `--fv-texto` | `#5C4A5C` | Texto de párrafo y secundario |
| `--fv-linea` | `#D6C8CC` | Bordes y separadores |
| `--fv-linea-suave` | `#E6DCDD` | Bordes sutiles |

```css
:root{
  --fv-purpura:#3A1E3C; --fv-oro:#B8892E; --fv-oro-claro:#D9AE52;
  --fv-marfil:#F5F0EC; --fv-texto:#5C4A5C; --fv-linea:#D6C8CC; --fv-linea-suave:#E6DCDD;
  --fv-font-titulo:'Lora', Georgia, serif;
  --fv-font-texto:'Roboto', Arial, sans-serif;
  --fv-font-hebreo:'Frank Ruhl Libre', serif;
}
```

### Tipografía (Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=Roboto:wght@400;500&family=Frank+Ruhl+Libre:wght@700&display=swap" rel="stylesheet">
```
| Estilo | Fuente | Tamaño / peso / interlineado |
|---|---|---|
| H1 | Lora | 34–46px · 700 · 1.1 |
| H2 | Lora | 23–28px · 600 · 1.2 |
| H3 | Lora | 18–20px · 600 · 1.3 |
| Cuerpo | Roboto | 15–16px · 400 · 1.6 |
| Etiqueta / overline | Roboto | 11–12px · 500 · MAYÚSCULAS · letter-spacing .2em · color oro |
| Cita | Lora itálica | 16–18px · 500 · borde izquierdo 3px oro, padding-left 14px |
| Hebreo (נאמן ואמת) | Frank Ruhl Libre | 700 · `dir="rtl"` |

### Otros
- Radio de botones: 9–10px. Tarjetas: 14–20px. Icono iOS: 22.5% del lado.
- Botón primario: fondo `#3A1E3C`, texto `#F5F0EC`, Roboto 14px/500, padding 10px 16px.
- Botón secundario: transparente, borde interior 1.5px `#D6C8CC`, texto `#3A1E3C`.
- Sombra de tarjeta/página: `0 1px 2px rgba(58,30,60,.12), 0 8px 24px rgba(58,30,60,.08)`.

## Logotipo — reglas
- Texto del logo: `Fiel y Verdadero` en Lora 700. La **«y» va en itálica 500 y en oro**.
- Logo horizontal: menorá + separador vertical 1.5px (`#D6C8CC`) + nombre. Separación de 18px.
- Pie de PDF: `FIEL` · menorá · `VERDADERO` en Lora 600, mayúsculas, letter-spacing .14em, separación de 7–18px.
- Sobre fondo púrpura: la menorá y el texto van en marfil, y la llama y la «y» en `#D9AE52`.
- Menos de 32px: usa `menora-simplificada.svg` o `favicon-16.svg` (sin puntos ni brazos internos).
- Deja alrededor del logo un espacio libre igual al alto de la llama.

## Assets
```
menora/            Solo la menorá, fondo transparente (SVG)
  menora-color.svg              púrpura + llama oro (fondos claros)
  menora-color-fondo-oscuro.svg marfil + llama oro claro (fondos púrpura)
  menora-blanca.svg / menora-negra.svg   un solo color
  menora-simplificada.svg       para tamaños pequeños
icono-app/         Menorá sobre fondo púrpura
  icono-ios.svg                 con esquinas (preview, PWA)
  icono-ios-sin-esquinas.svg    cuadrado lleno: iOS y Android lo recortan solos
  icono-android.svg             circular
favicon/           favicon.svg (32–48px), favicon-16.svg
redes/             foto-perfil.svg (círculo púrpura)
logos/             Logos con texto (SVG, usan Lora vía @import)
  logo-horizontal.svg, logo-horizontal-oscuro.svg, logo-vertical.svg,
  nombre.svg, nombre-blanco.svg, pie-pdf.svg
png/               PNG listos: favicon 16/32/48, apple-touch-icon-180,
                   icono-app-1024 (App Store), icono-pwa-192/512,
                   icono-android-512, foto-perfil-800, menorá 1000px (4 colores)
referencia/        Logos Fiel y Verdadero.dc.html (hoja de marca completa)
```
**Nota:** los SVG de `logos/` usan texto con Lora. En producción conviene renderizar el logo como componente (SVG de la menorá + texto HTML con la fuente cargada) o convertir el texto a trazos en Figma o Illustrator antes de usarlo como imagen.

### Integración web sugerida
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">
<meta name="theme-color" content="#3A1E3C">
```
`manifest.json`: `icono-pwa-192.png` y `icono-pwa-512.png`, `background_color: "#F5F0EC"`, `theme_color: "#3A1E3C"`.

## Screens / Views (hoja de marca)
1. Logo horizontal: header y navbar, con un ejemplo de barra de navegación (Sermones, Estudios, Citas, Comunidad y el botón «Crear sermón»).
2. Logo vertical: login, pantalla de carga y portada de PDF.
3. Solo el nombre: footer y marca de agua.
4. Favicon.
5. Icono de app (iOS y Android).
6. Un solo color (blanco y negro).
7. Imagen para compartir 1200×630: fondo púrpura, la menorá enorme cortada a la mitad en el borde izquierdo (≈116% del alto, trazo fino) y el texto en la mitad derecha (overline «SERMÓN», título Lora 700, autor y cita, logo pequeño).
8. Foto de perfil circular.
9. Pie de página PDF: título del sermón a la izquierda, `FIEL ◆ VERDADERO` al centro y número de página a la derecha, sobre una línea superior de 1px `#E6DCDD`.
