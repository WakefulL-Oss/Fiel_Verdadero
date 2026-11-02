# Fiel y Verdadero

Biblioteca gratuita de sermones en español: escribe, publica, comparte y descarga sermones en PDF. Proyecto sin fines comerciales, con costo de infraestructura de $0.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend / SSR | Next.js 16 (App Router) + TypeScript |
| Estilos | Tailwind CSS 4 · Lora + Roboto |
| Base de datos, Auth, Storage | Supabase (Postgres, plan Free) |
| Hosting | Vercel (plan Hobby) |
| Correo (códigos de acceso) | Resend (plan Free) vía SMTP en Supabase |
| Inicio de sesión | Código por correo + Facebook |
| PDF | `@react-pdf/renderer`, generado en el navegador (pendiente) |

## Ejecutar en local

```bash
npm install
cp .env.example .env.local   # en Windows CMD: copy .env.example .env.local
# llena NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

Abre http://localhost:3000. Otros comandos: `npm run build`, `npm run lint`, `npx tsc --noEmit`.

## Base de datos

Las migraciones viven en `supabase/migrations/`. Para aplicarlas al proyecto enlazado:

```bash
npx supabase login
npx supabase link --project-ref <REF-DE-20-LETRAS>
npx supabase db push --linked
```

## Documentación

- [Estado del proyecto](docs/ESTADO.md)
- [Arquitectura](docs/ARQUITECTURA.md)
- [Guía de configuración](docs/GUIA-CONFIGURACION.md)

## Seguridad

`.env.local` está en `.gitignore`. Nunca subas la `service_role key`, la contraseña de la base de datos, el App Secret de Facebook ni la API key de Resend.

## Licencia

[PolyForm Noncommercial 1.0.0](LICENSE) con aviso bilingüe (ver [NOTICE.md](NOTICE.md)). Uso gratuito y no comercial; prohibido vender, cobrar o monetizar. Nombre y marca reservados.
