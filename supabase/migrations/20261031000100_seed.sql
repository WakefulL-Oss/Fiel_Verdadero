insert into public.etiquetas (nombre, slug) values
  ('Fe','fe'),('Perdón','perdon'),('Matrimonio','matrimonio'),('Familia','familia'),
  ('Oración','oracion'),('Salvación','salvacion'),('Evangelismo','evangelismo'),
  ('Liderazgo','liderazgo'),('Juventud','juventud'),('Finanzas','finanzas'),
  ('Sanidad','sanidad'),('Avivamiento','avivamiento')
on conflict do nothing;
