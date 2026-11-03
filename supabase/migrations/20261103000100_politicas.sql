-- Endurece avatar, vistas, portadas y reportes.

-- Avatar: solo URL https sin espacios. El registro (incluido Facebook después) manda el
-- avatar en metadatos que controla quien se registra; si no es válido se descarta.
create function public.es_url_https(url text) returns boolean
language sql immutable as $$
  select url ~ '^https://[^[:space:]]+$' and char_length(url) <= 500
$$;

update perfiles set avatar_url = null
  where avatar_url is not null and not es_url_https(avatar_url);
alter table perfiles add constraint perfiles_avatar_url_https
  check (avatar_url is null or es_url_https(avatar_url));

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  avatar text := new.raw_user_meta_data->>'avatar_url';
begin
  if not es_url_https(avatar) then avatar := null; end if;
  insert into perfiles (id, nombre_completo, avatar_url)
  values (new.id,
          coalesce(new.raw_user_meta_data->>'full_name',
                   new.raw_user_meta_data->>'name', 'Usuario'),
          avatar);
  return new;
end $$;

-- Vistas: una por usuario con sesión, por sermón y por día. Sin sesión no se cuenta,
-- porque no hay forma fiable de distinguir visitantes anónimos desde la base.
create table public.sermon_vistas (
  sermon_id uuid not null references sermones on delete cascade,
  perfil_id uuid not null references perfiles on delete cascade,
  dia       date not null default current_date,
  primary key (sermon_id, perfil_id, dia)
);
-- Sin políticas: solo la escribe incrementar_vistas (security definer).
alter table sermon_vistas enable row level security;
revoke all on sermon_vistas from anon, authenticated;

create or replace function public.incrementar_vistas(p_slug text) returns void
language plpgsql security definer set search_path = public as $$
declare
  sermon uuid;
begin
  if auth.uid() is null then return; end if;
  select id into sermon from sermones where slug = p_slug and estado = 'publicado';
  if sermon is null then return; end if;
  insert into sermon_vistas (sermon_id, perfil_id) values (sermon, auth.uid())
    on conflict do nothing;
  if found then
    update sermones set vistas = vistas + 1 where id = sermon;
  end if;
end $$;
revoke execute on function public.incrementar_vistas(text) from public, anon;
grant execute on function public.incrementar_vistas(text) to authenticated;

-- Portadas: el bucket es público, así que la URL de cada archivo se sirve sin política.
-- La lectura por API (listar) queda solo para la carpeta propia; se añade update para
-- poder reemplazar una portada.
drop policy portadas_read on storage.objects;
create policy portadas_select_propio on storage.objects for select to authenticated
  using (bucket_id = 'portadas'
         and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy portadas_update on storage.objects for update to authenticated
  using (bucket_id = 'portadas'
         and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'portadas'
              and (storage.foldername(name))[1] = (select auth.uid())::text);

-- Reportes: solo de sermones publicados.
drop policy reportes_insert on reportes;
create policy reportes_insert on reportes for insert to authenticated
  with check (reportante = (select auth.uid())
              and exists (select 1 from sermones s
                          where s.id = sermon_id and s.estado = 'publicado'));
