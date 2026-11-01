# Estado del proyecto

Última actualización: 31 de octubre de 2026.

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

## Pendiente (en orden)

1. [ ] Poner `NEXT_PUBLIC_CONTACT_EMAIL` en Vercel y activar Email Forwarding en Namecheap para ese buzón.
2. [ ] Crear la app de Facebook (usa las tres URLs legales), pasarla a modo Live y activarla en Supabase.
3. [ ] Login: página `/login` (código por correo + botón Facebook), `/auth/callback`, refresco de sesión con `proxy` de Next 16.
4. [ ] Hacerte admin: `update perfiles set rol = 'admin' where id = '<tu-uuid>';`
5. [ ] Editor de sermones (Tiptap), borradores y notas privadas.
6. [ ] Página pública de cada sermón con ISR y metadatos Open Graph.
7. [ ] Generación de PDF en el navegador.
8. [ ] Búsqueda en español, etiquetas y citas bíblicas.
9. [ ] Biblia de dominio público (RV 1909 u otra) como JSON estático.
10. [ ] Subida de portadas (WebP, máx. 300 KB).
11. [ ] Reportes y panel de moderación.
12. [ ] Keep-alive de Supabase (el plan Free pausa tras ~7 días sin actividad) y export periódico con `pg_dump`.
13. [ ] Logo.
