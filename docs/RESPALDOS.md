# Respaldos de la base de datos

Supabase Free no incluye copias de seguridad. El esquema ya está respaldado en `supabase/migrations/` (git); aquí se respaldan los **datos** de producción (sermones, perfiles, notas privadas, usuarios).

**Los respaldos nunca van a git.** Contienen correos y notas privadas. `.gitignore` ya excluye `/respaldos/`, `*.dump`, `*.backup`, `*.age` y `*.gpg`. Guárdalos fuera del repositorio, cifrados.

## Frecuencia

- Producción: cada semana y siempre antes de aplicar una migración (`db push`).
- `fiel-dev`: no necesita respaldo.
- Prueba de restauración cada 3 meses en `fiel-dev`: un respaldo sin probar no cuenta.

## Requisitos (una vez)

1. Instala las herramientas cliente de PostgreSQL (incluyen `pg_dump` y `pg_restore`), versión igual o mayor a la del proyecto Supabase.
2. Supabase → botón **Connect** → **Session pooler** → copia la cadena de conexión de **producción** (lleva la contraseña de la BD; si no la recuerdas, Project Settings → Database → Reset password).

## Crear el respaldo (PowerShell)

```powershell
$env:DB_URL = "postgresql://postgres.<ref>:<contraseña>@aws-0-<región>.pooler.supabase.com:5432/postgres"
New-Item -ItemType Directory -Force respaldos | Out-Null
$f = "respaldos/fiel-$(Get-Date -Format yyyy-MM-dd).dump"
pg_dump $env:DB_URL --format=custom --no-owner --no-privileges --schema=public --schema=auth -f $f
Remove-Item Env:DB_URL
```

- La variable vive solo en esa sesión: no guardes la cadena en scripts, `.env*` ni historial compartido.
- `--schema=auth` incluye usuarios (correos). Sin eso, los sermones quedarían sin autores al restaurar.
- Storage (portadas) no entra en el dump. Las portadas se pueden volver a subir; si importan, descárgalas aparte desde el dashboard.

## Cifrar y guardar

Cifra el archivo antes de moverlo (con 7-Zip, AES-256, o `age`):

```powershell
7z a -p -mhe=on "$f.7z" $f
Remove-Item $f
```

Guarda el `.7z` en un disco externo o nube personal (no en una carpeta pública ni en el repo) y conserva al menos los últimos 4 semanales y 3 mensuales. La contraseña del archivo va en tu gestor de contraseñas, no junto al archivo.

## Restaurar (en `fiel-dev` para probar)

```powershell
$env:DB_URL = "<cadena del proyecto fiel-dev>"
pg_restore --clean --if-exists --no-owner --no-privileges --dbname=$env:DB_URL respaldos/fiel-AAAA-MM-DD.dump
Remove-Item Env:DB_URL
```

Restaurar en producción solo ante una pérdida real, y primero haz un respaldo del estado actual. Verifica después: conteo de sermones, un inicio de sesión y una página pública.
