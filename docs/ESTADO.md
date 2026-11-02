# Estado del proyecto

Última actualización: 1 de noviembre de 2026.

## Hecho

- [x] Proyecto Next.js 16 + TypeScript + Tailwind, fuentes Cormorant Garamond y Roboto, paleta clara y oscura.
- [x] Portada provisional (sin logo) con pie de página.
- [x] Esquema de base de datos y políticas RLS (`supabase/migrations/20261031000000_init.sql`) y etiquetas semilla.
- [x] Migraciones aplicadas al proyecto remoto de Supabase.
- [x] Clientes de Supabase para navegador y servidor (`src/lib/supabase/`).
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

## Pendiente (en orden)

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
11. [ ] Subida de portadas (WebP, máx. 300 KB).
12. [ ] Reportes y panel de moderación.
13. [ ] Primer respaldo manual de producción (`RESPALDOS.md`).
14. [ ] Logo (hay un icono provisional con la letra F en `src/app/icon.svg`).
