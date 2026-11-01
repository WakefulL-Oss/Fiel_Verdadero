# Guía de configuración

Pasos para montar el proyecto desde cero. Marca con ✅ lo que ya hiciste.

## 1. Local

1. `npm install`
2. Copia `.env.example` a `.env.local` y llena los valores de Supabase.
3. `npm run dev` → http://localhost:3000

## 2. Supabase

1. supabase.com → New project (plan Free, región cercana, guarda la contraseña de la BD).
2. Project Settings → API: copia la URL y la clave pública (`anon` o `sb_publishable_...`).
3. Terminal, en la carpeta del proyecto (usa el **ref real** de 20 letras que sale en la URL del dashboard, sin `<>`):
   ```
   npx supabase login
   npx supabase link --project-ref abcdefghijklmnopqrst
   npx supabase db push --linked
   ```
4. Verifica en Table Editor 8 tablas con RLS activo y en Storage el bucket `portadas`.
5. Authentication → Sign In / Providers → Email: activado.
6. Authentication → URL Configuration:
   - Site URL: `https://tudominio.com`
   - Redirect URLs: `https://tudominio.com/**`, `https://*.vercel.app/**`, `http://localhost:3000/**`

## 3. GitHub y Vercel

1. Sube el proyecto a GitHub (`git push -u origin main`). Comprueba antes con `git status` que `.env.local` no aparece.
2. vercel.com → Add New Project → importa el repo (Next.js, raíz `./`).
3. Variables de entorno: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`.
4. Las variables `NEXT_PUBLIC_*` son públicas por diseño (van al navegador). Los secretos (service_role, contraseña de BD, App Secret de Facebook, API key de Resend) nunca llevan ese prefijo.
5. Cada push a `main` despliega solo. Cambiar una variable requiere **Redeploy**.

## 4. Dominio (Namecheap → Vercel)

1. Vercel → Settings → Domains → agrega `tudominio.com` y `www`.
2. Namecheap → Domain List → Manage → Advanced DNS: borra los registros de parking y crea el **A** (`@`) y el **CNAME** (`www`) con los valores que muestra Vercel. Nameservers en Namecheap BasicDNS.
3. Espera el check verde en Vercel (HTTPS automático).
4. Actualiza `NEXT_PUBLIC_SITE_URL` y haz Redeploy.
5. Namecheap → Email Forwarding: `contacto@tudominio.com` → tu Gmail.

## 5. Correo (Resend)

1. resend.com → Domains → Add Domain → pega los registros DNS en Namecheap (en Host solo el subdominio, p. ej. `send` o `resend._domainkey`) → Verify.
2. API Keys → crea una con *Sending access* y guárdala fuera del repo.
3. Supabase → Authentication → Emails → SMTP Settings → Custom SMTP:
   host `smtp.resend.com`, puerto `465`, usuario `resend`, contraseña = API key, remitente `no-reply@tudominio.com`.
4. Authentication → Rate Limits: sube el límite de correos por hora.
5. Authentication → Emails → plantillas **Magic link** y **Confirm sign up** con el código:
   ```html
   <h2>Tu código de acceso</h2>
   <p>Usa este código para entrar a <strong>Fiel y Verdadero</strong>:</p>
   <p style="font-size:32px;font-weight:bold;letter-spacing:6px;">{{ .Token }}</p>
   <p>El código vence en una hora. Si tú no lo pediste, ignora este correo.</p>
   ```
   Asunto: `Tu código para entrar a Fiel y Verdadero`.

## 6. Facebook Login

Requiere que `/privacidad`, `/terminos` y `/eliminar-datos` ya estén en línea.

1. developers.facebook.com → My Apps → Create App → caso de uso **Authenticate and request data from users with Facebook Login**.
2. Settings → Basic: correo de contacto, URL de privacidad (`https://tudominio.com/privacidad`), URL de términos (`/terminos`), URL de instrucciones de eliminación de datos (`/eliminar-datos`), categoría e ícono.
3. Facebook Login → Settings → Valid OAuth Redirect URIs: `https://<ref>.supabase.co/auth/v1/callback`.
4. Copia App ID y App Secret a Supabase → Authentication → Sign In / Providers → Facebook.
5. Permisos: solo `email` y `public_profile`.
6. Cambia la app de *Development* a **Live** (ver explicación abajo).

### Modo Development vs Live

- **Development:** solo pueden iniciar sesión tú, los administradores y los testers que agregues en la app. Sirve para probar.
- **Live:** cualquier persona con cuenta de Facebook puede iniciar sesión. Meta exige para activarlo la URL de privacidad, la de eliminación de datos y datos de contacto completos. Con solo `email` y `public_profile` no hace falta revisión de permisos. Verifica los requisitos vigentes en el panel de Meta.

## 7. Administrador

Tras tu primer inicio de sesión, en Supabase → SQL Editor:

```sql
update perfiles set rol = 'admin' where id = '<tu-uuid-de-auth.users>';
```

## 8. Mantenimiento

- **Keep-alive:** Supabase Free pausa el proyecto tras ~7 días sin actividad (pendiente un cron en GitHub Actions).
- **Backups:** el plan Free no los incluye; haz un `pg_dump` periódico.
- **Migraciones:** nunca edites una ya aplicada; crea otra con `npx supabase migration new <nombre>`.
