# Límites de la base de datos

Definidos en `supabase/migrations/20261103000200_limites.sql`.

## Por qué existen

La app valida con zod (`schema.ts`), pero eso solo protege **nuestros formularios**. La API de Supabase es pública (la clave `sb_publishable_` está en el navegador a propósito) y cualquiera puede llamarla directo. Los límites en Postgres son la última barrera y se cumplen siempre, venga de donde venga la escritura.

Protegen tres cosas:
1. **El espacio del plan gratuito** (500 MB de base de datos). Sin topes, una sola cuenta podría llenarlo.
2. **El rendimiento**: filas gigantes hacen lentas las listas, la búsqueda y el PDF.
3. **La integridad**: citas bíblicas imposibles, URLs que no son `https`, contenido que no es un documento.

**Principio de diseño:** los límites del contenido son **muy holgados**. Ningún sermón real debe acercarse a ellos; existen para frenar abuso, no para limitar a quien escribe.

## Tabla de límites

### Sermones

| Límite | Valor | Cómo se ve al fallar | Nombre |
|---|---|---|---|
| Tamaño del contenido | **1 MB** (1 048 576 bytes) por sermón | constraint | `sermones_contenido_tamano` |
| Contenido es un documento | JSON de tipo objeto | constraint | `sermones_contenido_objeto` |
| Cuota por autor | **50 MB** sumando todos sus sermones | excepción, `hint` | `cuota_autor` |
| Sermones nuevos por día | **30** (borradores o publicados) | excepción, `hint` | `limite_diario` |
| Publicaciones por día | 10 (desde la migración inicial) | excepción | mensaje «Límite diario de publicaciones alcanzado» |
| Título | 3–200 caracteres (inicial) | constraint | `sermones_titulo_check` |
| Resumen | ≤ 400 caracteres (inicial) | constraint | `sermones_resumen_check` |
| Pasaje (texto libre, p. ej. «Juan 10:1-18») | ≤ 300 caracteres | constraint | `sermones_pasaje_largo` |
| Portada | URL `https://` de ≤ 500 caracteres | constraint | `sermones_portada_https` |

**Cuánto cabe en 1 MB.** El tamaño se mide como el JSON de Tiptap guardado en texto (columna generada `sermones.tamano`).
- Un sermón de una hora (8–9 mil palabras) ocupa entre 100 y 150 KB, porque el JSON pesa entre 1.5 y 2 veces el texto plano.
- 1 MB equivale a unas **80–100 mil palabras**: diez sermones largos en uno solo.
- El cuerpo no lleva imágenes (`SEGURIDAD.md`), así que nada infla el tamaño de golpe.

**Cuánto cabe en 50 MB.** Unos 350 sermones de una hora, o alrededor de 1000 de tamaño típico (unos 50 KB). Solo cuenta el contenido; título y resumen son despreciables. Al borrar un sermón se libera su espacio.

**Por qué 30 nuevos al día.** Nadie escribe 30 sermones en un día. Con este límite, una cuenta abusiva tarda días en llegar a su cuota y da tiempo de detectarla. **Editar un sermón existente no cuenta**, así que el autoguardado del editor no consume este límite.

### Perfiles

| Límite | Valor | Nombre |
|---|---|---|
| Nombre | 1–100 caracteres (el formulario pide 2–80) | `perfiles_nombre_largo` |
| Iglesia | ≤ 150 caracteres | `perfiles_iglesia_largo` |
| Bio | ≤ 500 caracteres (inicial) | `perfiles_bio_check` |
| Usuario | `a-z 0-9 _`, 3–30 (inicial) | `perfiles_username_check` |
| Avatar | URL `https://` de ≤ 500 caracteres | `perfiles_avatar_url_https` |

En el registro, `handle_new_user` **recorta** el nombre a 100 caracteres y descarta un avatar inválido, en lugar de rechazarlos. Así un dato raro en los metadatos nunca impide crear la cuenta.

### Otros

| Tabla | Límite | Valor | Nombre |
|---|---|---|---|
| `sermon_notas` | Notas privadas | ≤ 100 000 caracteres (unas 16 mil palabras) | `sermon_notas_largo` |
| `series` | Descripción | ≤ 1000 caracteres | `series_descripcion_largo` |
| `series` | Título | 3–150 (inicial) | `series_titulo_check` |
| `sermon_citas` | Citas por sermón | **200** | `hint`: `limite_citas` |
| `sermon_citas` | Capítulo | 1–150 (Salmos tiene 150) | `sermon_citas_capitulo` |
| `sermon_citas` | Versículos | 1–176 (Salmos 119:176), fin ≥ inicio, fin solo con inicio | `sermon_citas_versiculos` |
| `sermon_etiquetas` | Etiquetas por sermón | **10** | `hint`: `limite_etiquetas` |
| `reportes` | Motivo | 5–500 (inicial) | `reportes_motivo_check` |
| `sermon_vistas` | Limpieza | al contar una vista se borran las de días anteriores de ese sermón | — |

## Cómo los ve la app

- **Constraint (`check`)**: Postgres devuelve el código `23514`, y supabase-js pone el nombre del constraint en `error.message`. Ejemplo: `new row for relation "sermones" violates check constraint "sermones_contenido_tamano"`.
- **Excepción de trigger**: el código es `P0001`, `error.message` trae el texto en español y `error.hint` la clave (`cuota_autor`, `limite_diario`, `limite_citas`, `limite_etiquetas`).

El editor debe traducir esas claves a mensajes cortos en `actions.ts`, nunca mostrar el error crudo. Además, debe **validar antes en el cliente con los mismos números** (zod), para avisar mientras se escribe, por ejemplo con un indicador de tamaño al acercarse a 1 MB. Que el límite de la base salte debe ser excepcional.

**Mantener sincronizados:** si cambia un número aquí, cambia también en el `schema.ts` del módulo correspondiente.

## Cómo cambiar un límite

Nunca editar una migración aplicada. Crear una nueva:

```sql
-- Constraint: se reemplaza.
alter table sermones drop constraint sermones_contenido_tamano;
alter table sermones add constraint sermones_contenido_tamano check (tamano <= 2097152);

-- Trigger: se redefine la función con el valor nuevo.
create or replace function public.sermones_cuota() returns trigger ...
```

Después: `npx supabase db push --linked`, `npm run tipos`, y actualizar esta tabla y el `schema.ts` correspondiente.

## Vigilancia

- **Espacio usado:** Supabase → Project Settings → Usage (base de datos, de 500 MB).
- **Autores que más ocupan:**
  ```sql
  select autor_id, count(*), pg_size_pretty(sum(tamano)::bigint)
  from sermones group by autor_id order by sum(tamano) desc limit 10;
  ```
- Si el proyecto se acerca a 400 MB, revisar esa consulta antes de subir de plan.
