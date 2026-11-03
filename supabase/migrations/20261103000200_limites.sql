-- Límites de tamaño y de cantidad. La validación de la app (zod) solo protege nuestros
-- formularios; la API de Supabase acepta llamadas directas con la clave pública, así que
-- la base es la última barrera. Valores, motivos y cómo cambiarlos: docs/LIMITES.md.
-- Cada límite tiene nombre propio (constraint o `hint`) para que la app muestre un
-- mensaje claro en vez de un error genérico.

-- Perfiles ------------------------------------------------------------------------------

-- Ajusta datos existentes antes de exigir los límites.
update perfiles set nombre_completo = 'Usuario' where char_length(trim(nombre_completo)) = 0;
update perfiles set nombre_completo = left(trim(nombre_completo), 100)
  where char_length(nombre_completo) > 100;
update perfiles set iglesia = left(iglesia, 150) where char_length(iglesia) > 150;

alter table perfiles
  add constraint perfiles_nombre_largo check (char_length(trim(nombre_completo)) between 1 and 100),
  add constraint perfiles_iglesia_largo check (char_length(iglesia) <= 150);

-- El nombre del registro llega en metadatos que controla quien se registra: se recorta
-- en lugar de rechazar, para que un nombre raro nunca impida crear la cuenta.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  avatar text := new.raw_user_meta_data->>'avatar_url';
begin
  if not es_url_https(avatar) then avatar := null; end if;
  insert into perfiles (id, nombre_completo, avatar_url)
  values (new.id,
          coalesce(nullif(left(trim(new.raw_user_meta_data->>'full_name'), 100), ''),
                   nullif(left(trim(new.raw_user_meta_data->>'name'), 100), ''),
                   'Usuario'),
          avatar);
  return new;
end $$;

-- Sermones ------------------------------------------------------------------------------

-- `tamano`: bytes del contenido tal como se guarda (JSON de Tiptap como texto). Se calcula
-- solo y sirve para el límite por sermón y para la cuota por autor sin releer el JSON.
alter table sermones
  add column tamano integer generated always as (octet_length(contenido::text)) stored;

alter table sermones
  add constraint sermones_contenido_objeto check (jsonb_typeof(contenido) = 'object'),
  add constraint sermones_contenido_tamano check (tamano <= 1048576),
  add constraint sermones_pasaje_largo check (char_length(pasaje_texto) <= 300),
  add constraint sermones_portada_https check (portada_url is null or es_url_https(portada_url));

-- Cuota por autor: suma de `tamano` de todos sus sermones. Es AFTER porque las columnas
-- generadas se calculan después de los triggers BEFORE.
create function public.sermones_cuota() returns trigger
language plpgsql as $$
begin
  if (select sum(tamano) from sermones where autor_id = new.autor_id) > 52428800 then
    raise exception 'Tus sermones ya ocupan el espacio máximo (50 MB)'
      using hint = 'cuota_autor';
  end if;
  return null;
end $$;
create trigger sermones_cuota
  after insert or update of contenido on sermones
  for each row execute function public.sermones_cuota();

-- Sermones nuevos por día (borradores o publicados). El de publicaciones (10 al día) sigue
-- en sermones_before_write. Editar un sermón existente no cuenta.
create function public.sermones_limite_diario() returns trigger
language plpgsql as $$
begin
  if (select count(*) from sermones
      where autor_id = new.autor_id and creado_en > now() - interval '1 day') >= 30 then
    raise exception 'Llegaste al máximo de sermones nuevos por día (30)'
      using hint = 'limite_diario';
  end if;
  return new;
end $$;
create trigger sermones_limite_diario
  before insert on sermones
  for each row execute function public.sermones_limite_diario();

-- Notas privadas y series ----------------------------------------------------------------

alter table sermon_notas
  add constraint sermon_notas_largo check (char_length(notas) <= 100000);

alter table series
  add constraint series_descripcion_largo check (char_length(descripcion) <= 1000);

-- Citas y etiquetas por sermón -----------------------------------------------------------

-- Rangos de la Biblia: el capítulo más largo es Salmos (150) y el versículo más alto,
-- Salmos 119:176.
alter table sermon_citas
  add constraint sermon_citas_capitulo check (capitulo between 1 and 150),
  add constraint sermon_citas_versiculos check (
    (vers_ini is null or vers_ini between 1 and 176)
    and (vers_fin is null or (vers_ini is not null and vers_fin between vers_ini and 176)));

create function public.limite_por_sermon() returns trigger
language plpgsql as $$
declare
  maximo int := tg_argv[0]::int;
  cuenta int;
begin
  execute format('select count(*) from %I where sermon_id = $1', tg_table_name)
    into cuenta using new.sermon_id;
  if cuenta >= maximo then
    raise exception 'Máximo % por sermón', maximo using hint = tg_argv[1];
  end if;
  return new;
end $$;
create trigger sermon_citas_limite
  before insert on sermon_citas
  for each row execute function public.limite_por_sermon('200', 'limite_citas');
create trigger sermon_etiquetas_limite
  before insert on sermon_etiquetas
  for each row execute function public.limite_por_sermon('10', 'limite_etiquetas');

-- Vistas: se limpian las de días anteriores al contar, así la tabla no crece sin fin.
create or replace function public.incrementar_vistas(p_slug text) returns void
language plpgsql security definer set search_path = public as $$
declare
  sermon uuid;
begin
  if auth.uid() is null then return; end if;
  select id into sermon from sermones where slug = p_slug and estado = 'publicado';
  if sermon is null then return; end if;
  delete from sermon_vistas where sermon_id = sermon and dia < current_date;
  insert into sermon_vistas (sermon_id, perfil_id) values (sermon, auth.uid())
    on conflict do nothing;
  if found then
    update sermones set vistas = vistas + 1 where id = sermon;
  end if;
end $$;
