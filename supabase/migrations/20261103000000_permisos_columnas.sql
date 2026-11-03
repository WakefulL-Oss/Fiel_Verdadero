-- Permisos por columna. Un `revoke` de columnas no anula el `grant` de tabla que Supabase
-- da por defecto, así que se revoca la tabla entera y se concede solo lo editable.

-- Perfiles: nadie cambia su propio rol, id ni fecha; el rol no se expone. Toda columna nueva
-- necesita su propio `grant select` (y `select *` falla para anon/authenticated).
-- El trigger es una segunda barrera por si un `grant` futuro vuelve a abrir la tabla.
revoke update, select on perfiles from anon, authenticated;
grant update (username, nombre_completo, iglesia, bio, avatar_url) on perfiles to authenticated;
grant select (id, username, nombre_completo, iglesia, bio, avatar_url, creado_en)
  on perfiles to anon, authenticated;

create function public.perfiles_proteger_rol() returns trigger
language plpgsql as $$
begin
  if new.rol is distinct from old.rol and current_user in ('anon', 'authenticated') then
    raise exception 'No se puede cambiar el rol';
  end if;
  return new;
end $$;
create trigger perfiles_proteger_rol
  before update on perfiles
  for each row execute function public.perfiles_proteger_rol();

-- Sermones: vistas, publicado_en, busqueda y fechas solo los escriben triggers y funciones.
revoke insert, update on sermones from anon, authenticated;
grant insert (autor_id, serie_id, titulo, slug, resumen, pasaje_texto, contenido, portada_url, estado)
  on sermones to authenticated;
grant update (serie_id, titulo, slug, resumen, pasaje_texto, contenido, portada_url, estado)
  on sermones to authenticated;

-- RLS: `(select ...)` se evalúa una vez por consulta, no por fila.
drop policy perfiles_update on perfiles;
create policy perfiles_update on perfiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

drop policy sermones_select_propio on sermones;
create policy sermones_select_propio on sermones for select to authenticated
  using (autor_id = (select auth.uid()) or (select es_moderador()));

drop policy sermones_insert on sermones;
create policy sermones_insert on sermones for insert to authenticated
  with check (autor_id = (select auth.uid()) and estado in ('borrador','publicado'));

drop policy sermones_update on sermones;
create policy sermones_update on sermones for update to authenticated
  using (autor_id = (select auth.uid()) or (select es_moderador()))
  with check (
    (autor_id = (select auth.uid()) and estado in ('borrador','publicado'))
    or (select es_moderador()));

drop policy sermones_delete on sermones;
create policy sermones_delete on sermones for delete to authenticated
  using (autor_id = (select auth.uid()) or (select es_moderador()));

-- Listas del escritorio: borradores y publicaciones propias, recientes primero.
drop index sermones_autor_idx;
create index sermones_autor_estado_idx on sermones (autor_id, estado, actualizado_en desc);
