-- Fiel y Verdadero — esquema inicial

create extension if not exists unaccent;
create extension if not exists pg_trgm;

create type rol_usuario    as enum ('usuario','moderador','admin');
create type sermon_estado  as enum ('borrador','publicado','oculto');
create type reporte_estado as enum ('pendiente','revisado','descartado');

-- Perfiles
create table public.perfiles (
  id              uuid primary key references auth.users on delete cascade,
  username        text unique check (username ~ '^[a-z0-9_]{3,30}$'),
  nombre_completo text not null,
  iglesia         text,
  bio             text check (char_length(bio) <= 500),
  avatar_url      text,
  rol             rol_usuario not null default 'usuario',
  creado_en       timestamptz not null default now()
);

create function public.es_moderador() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from perfiles
                 where id = auth.uid() and rol in ('moderador','admin'));
$$;

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into perfiles (id, nombre_completo, avatar_url)
  values (new.id,
          coalesce(new.raw_user_meta_data->>'full_name',
                   new.raw_user_meta_data->>'name', 'Usuario'),
          new.raw_user_meta_data->>'avatar_url');
  return new;
end $$;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

-- Series
create table public.series (
  id          uuid primary key default gen_random_uuid(),
  autor_id    uuid not null references perfiles on delete cascade,
  titulo      text not null check (char_length(titulo) between 3 and 150),
  descripcion text,
  creado_en   timestamptz not null default now()
);

-- Sermones
create table public.sermones (
  id             uuid primary key default gen_random_uuid(),
  autor_id       uuid not null references perfiles on delete cascade,
  serie_id       uuid references series on delete set null,
  titulo         text not null check (char_length(titulo) between 3 and 200),
  slug           text not null unique check (slug ~ '^[a-z0-9-]{3,120}$'),
  resumen        text check (char_length(resumen) <= 400),
  pasaje_texto   text,
  contenido      jsonb not null default '{}',
  portada_url    text,
  estado         sermon_estado not null default 'borrador',
  publicado_en   timestamptz,
  vistas         integer not null default 0,
  busqueda       tsvector,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);
create index sermones_busqueda_idx on sermones using gin (busqueda);
create index sermones_publicados_idx on sermones (publicado_en desc)
  where estado = 'publicado';
create index sermones_autor_idx on sermones (autor_id);

create function public.sermones_before_write() returns trigger
language plpgsql as $$
begin
  new.actualizado_en = now();
  if new.estado = 'publicado' and (tg_op = 'INSERT' or old.estado <> 'publicado') then
    new.publicado_en = coalesce(new.publicado_en, now());
    if (select count(*) from sermones
        where autor_id = new.autor_id and estado = 'publicado'
          and publicado_en > now() - interval '1 day') >= 10 then
      raise exception 'Límite diario de publicaciones alcanzado';
    end if;
  end if;
  new.busqueda :=
      setweight(to_tsvector('spanish', unaccent(coalesce(new.titulo,''))), 'A')
   || setweight(to_tsvector('spanish', unaccent(coalesce(new.pasaje_texto,''))), 'B')
   || setweight(to_tsvector('spanish', unaccent(coalesce(new.resumen,''))), 'C');
  return new;
end $$;
create trigger sermones_before_write
  before insert or update on sermones
  for each row execute function public.sermones_before_write();

create function public.sermones_proteger_oculto() returns trigger
language plpgsql as $$
begin
  if tg_op = 'UPDATE' and old.estado = 'oculto'
     and new.estado <> 'oculto' and not es_moderador() then
    raise exception 'Sermón oculto por moderación';
  end if;
  return new;
end $$;
create trigger sermones_proteger_oculto
  before update on sermones
  for each row execute function public.sermones_proteger_oculto();

-- Notas privadas (solo el autor)
create table public.sermon_notas (
  sermon_id      uuid primary key references sermones on delete cascade,
  notas          text not null default '',
  actualizado_en timestamptz not null default now()
);

-- Citas bíblicas
create table public.sermon_citas (
  id        bigint generated always as identity primary key,
  sermon_id uuid not null references sermones on delete cascade,
  libro     smallint not null check (libro between 1 and 66),
  capitulo  smallint not null,
  vers_ini  smallint,
  vers_fin  smallint
);
create index sermon_citas_libro_idx on sermon_citas (libro, capitulo);
create index sermon_citas_sermon_idx on sermon_citas (sermon_id);

-- Etiquetas
create table public.etiquetas (
  id     serial primary key,
  nombre text not null unique,
  slug   text not null unique
);
create table public.sermon_etiquetas (
  sermon_id   uuid not null references sermones on delete cascade,
  etiqueta_id int  not null references etiquetas on delete cascade,
  primary key (sermon_id, etiqueta_id)
);

-- Reportes
create table public.reportes (
  id         bigint generated always as identity primary key,
  sermon_id  uuid not null references sermones on delete cascade,
  reportante uuid references perfiles on delete set null,
  motivo     text not null check (char_length(motivo) between 5 and 500),
  estado     reporte_estado not null default 'pendiente',
  creado_en  timestamptz not null default now(),
  unique (sermon_id, reportante)
);

-- RLS
alter table perfiles         enable row level security;
alter table series           enable row level security;
alter table sermones         enable row level security;
alter table sermon_notas     enable row level security;
alter table sermon_citas     enable row level security;
alter table etiquetas        enable row level security;
alter table sermon_etiquetas enable row level security;
alter table reportes         enable row level security;

create policy perfiles_select on perfiles for select using (true);
create policy perfiles_update on perfiles for update
  using (id = auth.uid()) with check (id = auth.uid());
revoke update (rol, id, creado_en) on perfiles from authenticated;

create policy series_select on series for select using (true);
create policy series_write  on series for all
  using (autor_id = auth.uid()) with check (autor_id = auth.uid());

create policy sermones_select_publico on sermones for select
  using (estado = 'publicado');
create policy sermones_select_propio on sermones for select
  using (autor_id = auth.uid() or es_moderador());
create policy sermones_insert on sermones for insert
  with check (autor_id = auth.uid() and estado in ('borrador','publicado'));
create policy sermones_update on sermones for update
  using (autor_id = auth.uid() or es_moderador())
  with check (
    (autor_id = auth.uid() and estado in ('borrador','publicado'))
    or es_moderador());
create policy sermones_delete on sermones for delete
  using (autor_id = auth.uid() or es_moderador());

create policy notas_owner on sermon_notas for all
  using (exists (select 1 from sermones s
                 where s.id = sermon_id and s.autor_id = auth.uid()))
  with check (exists (select 1 from sermones s
                      where s.id = sermon_id and s.autor_id = auth.uid()));

create policy citas_select on sermon_citas for select
  using (exists (select 1 from sermones s where s.id = sermon_id));
create policy citas_write on sermon_citas for all
  using (exists (select 1 from sermones s where s.id = sermon_id and s.autor_id = auth.uid()))
  with check (exists (select 1 from sermones s where s.id = sermon_id and s.autor_id = auth.uid()));

create policy setq_select on sermon_etiquetas for select
  using (exists (select 1 from sermones s where s.id = sermon_id));
create policy setq_write on sermon_etiquetas for all
  using (exists (select 1 from sermones s where s.id = sermon_id and s.autor_id = auth.uid()))
  with check (exists (select 1 from sermones s where s.id = sermon_id and s.autor_id = auth.uid()));

create policy etiquetas_select on etiquetas for select using (true);
create policy etiquetas_write on etiquetas for all
  using (es_moderador()) with check (es_moderador());

create policy reportes_insert on reportes for insert
  with check (reportante = auth.uid());
create policy reportes_mod on reportes for select using (es_moderador());
create policy reportes_mod_upd on reportes for update using (es_moderador());

-- Vistas
create function public.incrementar_vistas(p_slug text) returns void
language sql security definer set search_path = public as $$
  update sermones set vistas = vistas + 1
  where slug = p_slug and estado = 'publicado';
$$;
grant execute on function public.incrementar_vistas to anon, authenticated;

-- Búsqueda
create function public.buscar_sermones(q text, p_limit int default 20, p_offset int default 0)
returns setof sermones language sql stable as $$
  select * from sermones
  where estado = 'publicado'
    and busqueda @@ websearch_to_tsquery('spanish', unaccent(q))
  order by ts_rank(busqueda, websearch_to_tsquery('spanish', unaccent(q))) desc
  limit p_limit offset p_offset;
$$;

-- Storage: portadas (max 300 KB)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portadas','portadas', true, 307200, array['image/webp','image/jpeg','image/png']);

create policy portadas_read on storage.objects for select
  using (bucket_id = 'portadas');
create policy portadas_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'portadas'
              and (storage.foldername(name))[1] = auth.uid()::text);
create policy portadas_delete on storage.objects for delete to authenticated
  using (bucket_id = 'portadas'
         and (storage.foldername(name))[1] = auth.uid()::text);
