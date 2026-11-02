# Patrones tomados de Supabase

Extraídos de supabase.com y de su repo (`packages/ui`, `packages/ui-patterns`, `apps/www/components/Nav`). Solo diseño e interacción; los colores son los de nuestra marca.

## Botones (`boton()` en `src/components/Formulario.tsx`)

| Tamaño | Alto | Texto | Padding | Radio | Uso |
|---|---|---|---|---|---|
| `chico` | 26px | 12px | 10px | 6px | Header, acciones secundarias |
| `mediano` | 34px | 14px | 12px | 9px | Botones dentro de formularios |
| `grande` | 38px | 14px | 16px | 9px | CTA principal, envío de formularios |

- Sin borde: el contorno sale de sombras internas (`--sombra-boton`, `--sombra-boton-elevada` en `globals.css`). En oscuro el borde interno es claro.
- `primario`: fondo de marca y un degradado casi invisible. `normal`: superficie elevada; al pasar el cursor, `realce`. `texto`: sin fondo hasta el hover.
- Transición de `background-color, color, scale` en 200 ms con `cubic-bezier(0.22,1,0.36,1)`, y `scale(0.97)` al pulsar (solo con `motion-safe`).

## Navegación del header (`ENLACE_NAV` en `src/components/Encabezado.tsx`)

- Header de 64px con contenedor centrado (`max-w-7xl`). Los enlaces ocupan todo el alto.
- Enlaces de 14px `font-medium`, sin fondo. Al pasar el cursor o con foco, el texto se ilumina (`text-accent`). La página activa va en `foreground`.

## Menús desplegables (`src/components/ui/Menu.tsx`, Radix DropdownMenu)

- `modal={false}`, contenido con `sideOffset` 6, radio de 6px, borde suave, `p-1` y sombra media.
- Ítems de 12px con `px-2 py-1.5` y radio de 5px. El resaltado (teclado o cursor) usa el fondo `realce` y el texto `foreground`.
- Opciones de radio con sangría `pl-8` y un punto de 8px como indicador. Etiquetas de grupo en 12px `tenue`. Separador de 1px a todo el ancho.
- Animación: entra en 160 ms (opacidad y `scale(0.96)`, desplazado 4px desde el lado del disparador) y sale más rápido, en 110 ms. Crece desde el disparador (`--radix-dropdown-menu-content-transform-origin`). Con movimiento reducido, solo opacidad.

## Sesión en páginas públicas

- Supabase (`apps/www/components/Nav/index.tsx`): la página es estática y la sesión se lee en el navegador (`useIsLoggedIn`). Mientras carga, los botones quedan en `opacity-0` y luego aparecen con un fundido.
- Nosotros: misma experiencia, pero la sesión se resuelve en el servidor desde la cookie y llega por streaming (`BotonSesion` con `Suspense`). El hueco queda reservado e invisible mientras tanto (`invisible`) y el resultado aparece con `.aparecer`.
- Con sesión: botón «Dashboard» y avatar redondo de 30px con la inicial (`MenuCuenta`). El menú del avatar trae correo, Dashboard, Tema (Oscuro / Claro / Sistema) y Cerrar sesión, en ese orden, como `AuthenticatedDropdownMenu`.
- Sin sesión, el selector de tema va en el pie de página (`SelectorTema`), como en supabase.com.
