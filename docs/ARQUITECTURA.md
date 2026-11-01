# Arquitectura

Arquitectura serverless de costo $0. No hay servidor propio: el sitio es estático/SSR en Vercel y los datos viven en Supabase, que el navegador consulta directamente.

## Flujo

```
                 ┌──────────────────────────┐
                 │   Navegador del usuario  │
                 └───────┬──────────────┬───┘
       páginas, JS, CSS  │              │  Auth / consultas REST / imágenes
                         ▼              ▼
              ┌────────────────┐   ┌───────────────────────────┐
              │ Vercel (Next)  │   │ Supabase                  │
              │ SSR + ISR + CDN│   │  Postgres + RLS           │
              └───────▲────────┘   │  Auth (GoTrue)            │
                      │ deploy     │  PostgREST (API REST)     │
              ┌───────┴────────┐   │  Storage (portadas)       │
              │ GitHub (main)  │   └───────────┬───────────────┘
              └────────────────┘               │ SMTP
                                               ▼
                                     Resend (correo con código)
```

- `main` = producción: un push a `main` despliega en Vercel. `fiel` = trabajo diario: un push a `fiel` solo crea un Preview. Producción se actualiza con un PR de `fiel` a `main`.
- Dos proyectos Supabase: producción y `fiel-dev` (local y Previews).
- Las migraciones de BD no pasan por Vercel: se aplican con `npx supabase db push --linked`.
- El PDF se genera en el navegador del usuario; el servidor no gasta cómputo.

## Autenticación

1. **Código por correo:** el usuario escribe su correo, Supabase envía un código de 6 dígitos (vía Resend) y la app lo valida con `verifyOtp`. No hay redirecciones ni contraseñas.
2. **Facebook:** OAuth con permisos `email` y `public_profile`. El callback de Supabase es `https://<ref>.supabase.co/auth/v1/callback`.
3. Si ambos métodos usan el mismo correo verificado, Supabase vincula las identidades en una sola cuenta.
4. Un trigger crea el `perfil` al registrarse (`handle_new_user`).

Todos los usuarios viven en el proyecto de Supabase del propietario (`auth.users` + `perfiles`): se pueden exportar, bloquear o eliminar sin depender de un tercero.

## Modelo de datos

| Tabla | Propósito |
|---|---|
| `perfiles` | Datos públicos del usuario y `rol` (usuario, moderador, admin) |
| `series` | Agrupa sermones de un autor |
| `sermones` | Contenido (Tiptap en `jsonb`), `slug`, `estado` (borrador, publicado, oculto), vector de búsqueda |
| `sermon_notas` | Notas privadas del predicador, en tabla aparte para que la lectura pública nunca las exponga |
| `sermon_citas` | Citas bíblicas estructuradas (libro 1–66, capítulo, versículos) |
| `etiquetas`, `sermon_etiquetas` | Temas |
| `reportes` | Denuncias de contenido |

## Seguridad (RLS y triggers)

- RLS activo en todas las tablas. Lectura pública solo de sermones `publicado`.
- `rol`, `id` y `creado_en` de `perfiles` no se pueden modificar desde el cliente.
- Máximo 10 sermones publicados por usuario cada 24 horas.
- Un sermón `oculto` por moderación no puede ser republicado por su autor; solo un moderador.
- Contador de vistas por función `incrementar_vistas` (no se abre UPDATE al público).
- Búsqueda en español con `tsvector` mantenido por trigger e índice GIN (`buscar_sermones`).
- Storage: bucket `portadas`, máx. 300 KB, solo WebP/JPEG/PNG, cada usuario escribe solo en su carpeta.

## Límites del plan gratuito y mitigaciones

| Recurso | Límite | Mitigación |
|---|---|---|
| Supabase BD | 500 MB | Texto ligero; ~15 KB por sermón |
| Supabase inactividad | Pausa a ~7 días sin uso | Cron keep-alive en GitHub Actions |
| Supabase backups | No incluidos | `pg_dump` manual y cifrado, ver `docs/RESPALDOS.md` |
| Storage | 1 GB | Compresión a WebP en cliente, tope 300 KB |
| Vercel | 100 GB/mes, solo uso no comercial | ISR y caché de CDN |
| Resend | 3,000 correos/mes, 100/día | Código en lugar de enlaces; límite de envíos por hora |

## Decisiones

- **Sin Supabase Auth UI:** sin mantenimiento activo y su flujo de correo/contraseña exige SMTP; se hacen botones propios.
- **Sin Google:** para evitar cualquier riesgo de facturación en Google Cloud.
- **ISR en vez de SSG puro:** el contenido lo crean usuarios en cualquier momento.
- **Biblia fuera de la BD:** JSON estático de dominio público. La RV 1960 tiene derechos de autor, no se usa.
- **Licencia:** PolyForm Noncommercial; el contenido de los usuarios se rige por los [términos de uso](/terminos).
