# Estado del proyecto

Última actualización: 3 de noviembre de 2026.

## Hecho

- [x] Proyecto Next.js 16 + TypeScript + Tailwind, fuentes Lora y Roboto.
- [x] Portada provisional (sin logo) con pie de página.
- [x] Esquema de base de datos y políticas RLS (`supabase/migrations/20261031000000_init.sql`) y etiquetas semilla.
- [x] Migraciones aplicadas al proyecto remoto de Supabase.
- [x] Clientes de Supabase para servidor (`server.ts`, con sesión) y público sin cookies (`publico.ts`, para `use cache`); tipos generados en `tipos.ts` (`npm run tipos`). El cliente de navegador se crea con el editor.
- [x] Licencia PolyForm Noncommercial + `NOTICE.md` bilingüe.
- [x] `.env.local` ignorado por git; `.env.example` versionado.
- [x] Repositorio en GitHub y despliegue automático en Vercel.
- [x] Dominio de Namecheap conectado a Vercel.
- [x] Resend con dominio verificado y SMTP personalizado en Supabase.
- [x] Plantillas de correo (Magic link y Confirm sign up) con código de 6 dígitos.
- [x] Páginas legales: `/privacidad`, `/terminos`, `/eliminar-datos`.
- [x] `NEXT_PUBLIC_CONTACT_EMAIL` en Vercel y reenvío de correo en Namecheap.
- [x] Rama de trabajo `fiel` (local y remota); `main` queda como producción.
- [x] Login con correo y contraseña: `/login`, `/registro` (código solo al registrarse), `/recuperar`, `/auth/callback`, `src/proxy.ts` (refresco de sesión); botón Entrar/Salir en la portada.
- [x] Cabeceras de seguridad (CSP y otras) en `next.config.ts`.
- [x] CAPTCHA (Turnstile) integrado en registro, login, recuperación y reenvío; falta activarlo en Cloudflare y Supabase.
- [x] Subagentes `planer`, `ena` y `revi` en `.claude/agents/`.
- [x] Docs de seguridad (`SEGURIDAD.md`) y respaldos (`RESPALDOS.md`); respaldos excluidos de git.
- [x] Workflow keep-alive y Dependabot en `.github/`.
- [x] Marca aplicada: paleta púrpura real (claro y oscuro), Lora, `Menora`/`Logo` en `src/components/marca/`, favicon, `apple-icon`, `manifest`. Fuente de la marca en `docs/marca/`.
- [x] Vistas según el mockup v2 (`docs/diseno/`): `/login` centrado, `/registro` y `/recuperar` divididos con versículo, páginas legales con índice y resumen, `/eliminar-datos` con tarjetas. El registro pide nombre (va a `perfiles.nombre_completo`) y aceptar los términos.
- [x] Landing en `/` (header y pie centrados, vista previa del editor, bloques Escribir/Compartir/PDF) y `/dashboard` (protegido en `src/proxy.ts` y en la página). Tras entrar, login, registro y recuperación llevan a `/dashboard`. El botón de sesión del header muestra Entrar/Crear cuenta o Dashboard según la sesión, con la parte dinámica en streaming (Suspense) sobre una página estática.
- [x] Header, botones y menús al estilo de Supabase (`docs/diseno/SUPABASE.md`): logo sin separador, enlaces que se iluminan, botones «Iniciar sesión» y «Comienza aquí», avatar con inicial y menú de cuenta (Dashboard, Tema, Cerrar sesión), selector de tema en el pie para visitantes. Tokens con `light-dark()`.

- [x] Shell del escritorio en `/dashboard/*` (diseño «2a Inicio»): header de 48px con sección actual, barra lateral con modos expandida / contraída / al pasar el cursor (guardado en el navegador, sin salto al cargar), atajo `C` para crear. Vistas: Inicio (compositor, sermones recientes, tus borradores), Sermones, Borradores, Mis publicaciones y Crear sermón (marcador hasta el editor). Lo que el diseño muestra sin función real (búsqueda, notificaciones, likes, comentarios, seguir, versículo del día, estudios, citas, comunidad, guardados, ajustes) no se incluyó.
- [x] Sesión y caché: `lib/sesion.ts` (`obtenerUsuario` con `getClaims` y `use cache: private`, `exigirUsuario`); nombre desde `perfiles` en `use cache` con etiqueta `perfil:<id>`; sermones públicos en `use cache` con etiqueta `sermones`; los propios en caché privada con etiqueta `sermones:<id>`. Proxy: verifica claims, conserva `next`, aplica las cabeceras anti‑caché de `@supabase/ssr`. Cerrar sesión: solo este dispositivo y `refresh()`.
- [x] Seguridad: `rutaSegura` interpreta la URL (sin caracteres de control); HSTS, COOP, `X-Frame-Options` y `upgrade-insecure-requests`; el build falla sin `NEXT_PUBLIC_SUPABASE_URL`.
- [x] Migraciones de permisos aplicadas y probadas en remoto: `permisos_columnas` (nadie se cambia el `rol`, columnas editables restringidas, `rol` oculto, índice de borradores) y `politicas` (avatar solo https, vistas una por usuario y día, portadas sin listado público y con `update`, reportes solo de sermones publicados). Claves JWT: el proyecto publica una llave ES256 y la app usa la clave `sb_publishable_`.

## Pendiente (en orden)

0. [x] Migración `20261103000200_limites.sql` aplicada y tipos regenerados (`sermones.tamano`). Detalle en `docs/LIMITES.md`.

1. [ ] Crear el proyecto Supabase `fiel-dev`, apuntar `.env.local` a él y configurar Vercel *Preview* (`GUIA-CONFIGURACION.md`, sección 9). Hasta entonces `npm run dev` usa la BD de producción.
2. [ ] Secrets de GitHub para el keep-alive y fusionar `fiel` en `main` para que el cron funcione.
3. [ ] Ajustes de Auth en Supabase: Confirm email, contraseña mínima 8, plantilla **Reset password** con código (`GUIA-CONFIGURACION.md`, sección 5), OTP a 10 min, Redirect URLs de producción solo con el dominio.
3b. [ ] CAPTCHA: crear widget en Cloudflare, Site Key en Vercel y `.env.local`, desplegar, y al final pegar la Secret Key en Supabase (`GUIA-CONFIGURACION.md`, sección 10).
4. [ ] Probar registro, login y recuperación de punta a punta en local (con `fiel-dev`) y hacerte admin: `update perfiles set rol = 'admin' where id = '<tu-uuid>';`. Tu cuenta antigua (creada por código) no tiene contraseña: usa "Olvidé mi contraseña".
5. [ ] Facebook: app creada en Meta, **en pausa** (Meta pide verificación del negocio para publicar). Retomar después; el login por código ya funciona sin él.
6. [ ] Editor de sermones (Tiptap), borradores y notas privadas, con el esquema de contenido de `SEGURIDAD.md`.
7. [ ] Página pública de cada sermón con ISR y metadatos Open Graph.
8. [ ] Generación de PDF en el navegador.
9. [ ] Búsqueda en español, etiquetas y citas bíblicas.
10. [ ] Biblia de dominio público (RV 1909 u otra) como JSON estático.
11. [ ] Subida de portadas y fotos de perfil (WebP, máx. 300 KB). Avatar: guardar solo la ruta en Storage (`<id>/avatar.webp`), no URLs externas; con Facebook, copiar la foto a Storage al entrar. Migración: `avatar_url` debe ser ruta de la carpeta propia.
12. [ ] Reportes y panel de moderación.
13. [ ] Primer respaldo manual de producción (`RESPALDOS.md`).
14. [ ] Al llegar el editor: enlazar filas de borradores a `/dashboard/sermones/[id]/editar`, invalidar con `updateTag('sermones:<id>')`, `updateTag('sermones')` al publicar y `updateTag('perfil:<id>')` al editar el perfil.
15. [ ] Facebook: si el login abre una ventana emergente, cambiar `Cross-Origin-Opener-Policy` a `same-origin-allow-popups`.
16. [ ] Revisar: en Supabase → JWT Keys, que la llave **actual** sea ECC P-256 (no solo en espera); CSP sin `'unsafe-inline'` (hash de `SCRIPT_TEMA`) si Next lo permite con PPR.
