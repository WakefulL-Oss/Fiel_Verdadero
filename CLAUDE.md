# Fiel y Verdadero

Biblioteca gratuita de sermones en español (escribir, publicar, compartir, PDF). Sin fines comerciales, costo $0. Ver @AGENTS.md (Next 16 ≠ el que conoces: leer `node_modules/next/dist/docs/` antes de usar APIs nuevas; `middleware` ahora es `proxy`).

## Infra
- **Ramas:** trabajar siempre en `fiel` (local y remota); `main` = producción, solo por PR desde `fiel`. Nunca push directo a `main`. Local usa el proyecto Supabase `fiel-dev`, no producción.
- **Front/SSR:** Next.js 16 App Router + TS + Tailwind 4 → Vercel Hobby (deploy a producción en push a `main`; otras ramas = Preview).
- **Datos/Auth/Storage:** Supabase Free (Postgres + RLS). El navegador consulta Supabase directo; sin backend propio.
- **Login:** correo + contraseña (Supabase Auth); código por correo (Resend vía SMTP) solo para verificar el registro y recuperar la contraseña; Facebook después. Sin Google, sin Auth UI.
- **PDF:** `@react-pdf/renderer` en el cliente (import dinámico). Cero cómputo de servidor.
- **Dominio:** Namecheap → Vercel. Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`.
- **Migraciones:** `supabase/migrations/`, `npx supabase db push --linked`. Nunca editar una aplicada; crear otra.

## Comandos
`npm run dev` · `npm run build` · `npm run lint` · `npx tsc --noEmit` (los tres últimos deben pasar antes de commit).

## Estructura (por módulos)
```
src/app/            rutas finas: solo componen, sin lógica
src/features/<x>/   módulo por dominio (sermones, auth, biblia, pdf, moderacion)
  components/ actions.ts queries.ts types.ts schema.ts
src/components/     UI compartida genérica (sin lógica de dominio)
src/lib/            supabase/{client,server}.ts, site.ts, utilidades puras
src/data/           JSON estático (Biblia dominio público, libros)
supabase/migrations SQL versionado
docs/               ESTADO.md, ARQUITECTURA.md, GUIA-CONFIGURACION.md, marca/ (fuente de la marca, no se sirve)
src/components/marca/ Menora y Logo como componentes (siguen el modo oscuro)
public/marca/       solo los assets servidos (iconos PWA)
```
Un módulo no importa de otro `features/*`; comparte vía `lib/` o `components/`.

## Reglas de código
- Server Components por defecto; `"use client"` solo donde haya estado/eventos.
- Acceso a datos solo en `queries.ts` (lectura) y `actions.ts` (escritura); componentes no llaman a Supabase directo.
- Validar entradas con esquema (`schema.ts`) en el borde; tipos de BD generados, no a mano.
- Seguridad vive en RLS, no en el cliente. Nunca usar `service_role` en código del navegador ni con prefijo `NEXT_PUBLIC_`.
- Contenido público con ISR (`revalidate` / `revalidatePath` al publicar), no SSG puro.
- Funciones pequeñas, un propósito; sin código muerto ni comentarios que repitan el código.
- Texto de UI en español; identificadores de dominio en español como en la BD (`sermones`, `perfiles`).
- Carga pesada (PDF, editor) con `dynamic import`. Imágenes: WebP ≤ 300 KB.

## Front compacto
- Densidad alta: espaciado reducido, `max-w` de lectura, sin heros vacíos ni relleno.
- Sin textos explicativos, subtítulos ni instrucciones innecesarias; etiquetas cortas, estados vacíos de una línea.
- Marca en `docs/marca/README.md` (paleta púrpura real, Lora + Roboto). Tokens de `globals.css` (`background`, `surface`, `foreground`, `muted`, `accent` = oro, `border`, `border-suave`, `primario`, `error`); `font-display` (Lora) solo en títulos. El oro no se usa en texto pequeño (contraste). Soportar modo oscuro.
- Mobile-first; componentes reutilizables en `src/components/` antes de duplicar clases.

## Seguridad y licencia
- `.env*` ignorado (excepto `.env.example`). No pegar secretos en chats, código ni commits.
- Licencia PolyForm Noncommercial: no agregar publicidad, cobros ni monetización. Nombre y marca reservados.
- Páginas legales (`/privacidad`, `/terminos`, `/eliminar-datos`) son requisito de Meta: no romper sus rutas.

## Estado
Ver `docs/ESTADO.md` y actualizarlo al terminar cada tarea.
