# Seguridad

## Sesión

- Login con correo y contraseña (Supabase Auth, hash bcrypt; la app nunca guarda contraseñas). El código por correo (6–8 dígitos) se usa solo para verificar el registro y para recuperar la contraseña. Facebook queda pendiente de verificación en Meta.
- Contraseñas: 8–72 caracteres con letra y número (zod en `schema.ts` y mínimo en Supabase). Se permite pegar desde gestores de contraseñas.
- Mensajes genéricos: "Correo o contraseña incorrectos"; la recuperación responde igual exista o no el correo.
- Con contraseñas, el CAPTCHA (Cloudflare Turnstile) en registro, login, recuperación y reenvío de código es **obligatorio** antes del lanzamiento (credential stuffing). Implementado en `src/components/Turnstile.tsx`; el token viaja como `captchaToken` a Supabase, que lo valida con la Secret Key (guardada solo en su panel). Pasos en `GUIA-CONFIGURACION.md`, sección 10.
- Opcional posterior: comprobar contraseñas filtradas (Have I Been Pwned por prefijo de hash); implica mencionarlo en `/privacidad`.
- Cookies de sesión con `@supabase/ssr`. `src/proxy.ts` las refresca en cada petición que tenga cookie `sb-*`.
- Decisiones de acceso en servidor: `supabase.auth.getUser()`. Nunca confiar en `getSession()` ni en datos del cliente.
- Redirecciones (`next`, `/auth/callback`): solo rutas relativas propias (`src/lib/ruta-segura.ts`), contra *open redirect*.
- Entradas de formularios validadas con zod en `schema.ts`; los errores al usuario son genéricos (no revelan si un correo existe).

### Configuración en Supabase (cada proyecto, prod y dev)

- Authentication → Providers → Email: **Confirm email** activado, longitud mínima de contraseña **8** con letras y números, expiración del código **600 s** (10 min).
- Authentication → Sessions/Refresh tokens: rotación activada (por defecto).
- Authentication → Rate Limits: dejar activos los límites de envío y verificación por IP.
- Authentication → Attack Protection: activar CAPTCHA (Turnstile, gratis) antes del lanzamiento público para evitar bombardeo de correos.
- URL Configuration: **producción solo el dominio** (`https://tudominio.com/**`). `http://localhost:3000/**` y `https://*.vercel.app/**` solo en `fiel-dev`.

### Cabeceras HTTP (`next.config.ts`)

CSP (`default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, `form-action 'self'`, orígenes de Supabase en `connect-src` e `img-src`, y `challenges.cloudflare.com` para Turnstile), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. Vercel agrega HSTS. `script-src` conserva `'unsafe-inline'`: una CSP con nonce obliga a renderizado dinámico y rompería el ISR; el riesgo de XSS se cubre con la regla de contenido de abajo.

## Datos

- RLS activo en todas las tablas y en `storage.objects`. El navegador consulta Supabase directo, así que **la seguridad vive en las políticas**, no en el código de la app.
- `revoke update (rol, id, creado_en) on perfiles from authenticated`: nadie se sube el rol.
- Funciones `security definer` siempre con `set search_path = public`.
- Antes de cada release: Supabase → Advisors → Security, sin tablas sin RLS.
- Claves: solo la `anon` va al navegador. `service_role`, contraseña de BD, App Secret de Meta y API key de Resend solo en secrets (Vercel, GitHub, Supabase) y nunca con prefijo `NEXT_PUBLIC_`.
- Cuentas con 2FA: GitHub, Vercel, Supabase, Namecheap, Resend, Meta. Activar *secret scanning* y *push protection* en GitHub; proteger `main` (cambios solo por PR).
- Borrado de datos: las FK usan `on delete cascade` desde `auth.users`; el procedimiento público está en `/eliminar-datos`.

## Contenido de sermones (JSON de Tiptap): guardado y renderizado

**Decisión:** guardar solo JSON (`sermones.contenido`, jsonb), nunca HTML, y renderizarlo con una lista blanca de nodos hacia elementos React. Sin `dangerouslySetInnerHTML`, sin `generateHTML` + sanitizador.

Por qué: el navegador escribe en Supabase directo, así que cualquier usuario puede guardar un JSON arbitrario saltándose la validación de la app. La defensa real tiene que estar en **el renderizado** (y en la BD), no solo al guardar.

1. **Esquema único** en `src/features/sermones/schema.ts` (zod): tipos permitidos `doc`, `paragraph`, `heading` (niveles 2–3), `blockquote`, `bulletList`, `orderedList`, `listItem`, `hardBreak`, `text`; marcas `bold`, `italic`, `link`. Cualquier otro tipo o atributo desconocido se descarta o falla.
2. **Renderizado:** un componente servidor recorre el JSON y mapea cada tipo permitido a su elemento; el texto va como nodo de texto (React lo escapa). Ante JSON inválido, falla cerrado (no muestra el contenido). El PDF consume el mismo JSON validado.
3. **Enlaces:** solo `https:`, `http:` y `mailto:`; siempre `rel="noopener noreferrer nofollow ugc"`. Se rechaza `javascript:`, `data:` y similares.
4. **Sin imágenes ni HTML incrustado** en el cuerpo. Las portadas viven en Storage (WebP, máx. 300 KB, tipo y tamaño forzados en la configuración del bucket).
5. **Límites en la BD** (migración nueva): `check (jsonb_typeof(contenido) = 'object' and pg_column_size(contenido) < 200000)`. Límites de profundidad y de nodos en el esquema zod.
6. **Capa extra:** la CSP bloquea `object-src`, `frame-ancestors` y orígenes no listados.

Pendiente de implementar con el editor (paso 5 de `ESTADO.md`).
