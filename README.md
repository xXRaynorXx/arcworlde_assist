# ArcWorlde Assist

Compendio de reglas de ArcWorlde con cuentas de usuario y bandas guardadas en Supabase.
Próximas fases: partidas únicas y campañas con invitaciones.

## Estructura

- `index.html`: compendio (reglas, facciones, campaña, escenarios) y menú.
- `usuarios.js`: cuentas (email y Google) y sección **Mis Bandas**. Se engancha al menú sin tocar el compendio.
- `partidas.js`: sección **Partidas** (crear con nº de jugadores, invitar con código o enlace, elegir banda, OK de cada jugador, empezar, rondas con eventos ArcDeck, puntuar y cerrar).
- `campanas.js`: sección **Campañas** (misiones, fondo de cada banda y libro de caja, tiradas compartidas de comerciante, lesiones y aventuras entre partidas, eventos de ronda, clasificación y ganador).
- `datos_campana.js`: tablas de comerciante, lesiones y aventuras entre partidas.
- `fichas.js`: ficha de banda (atributos, ataques, rasgos) y seguimiento en partida de vida, atributos y lesiones.
- `datos_facciones.js`: reglas de facción, rasgos de unidad y armería exclusiva de las 11 facciones (se muestran en *Reglas de Facciones*).
- `datos_minis.js`: compendio completo (`compendioArcWorlde`): facciones y miniaturas, armería común, diccionario de rasgos (`datosRasgos`) y sistema de campaña. Es la fuente de las miniaturas y de las descripciones de rasgos.
- `armeria.js`: armería común + ayudas para el equipo de cada facción; el constructor de bandas suma su coste.
- `datos_arcdeck.js`: tabla de eventos ArcDeck (Bosque de Mildaark y Tierras de Vauhaemia).
- `datos_minis.js`: catálogo de miniaturas y reglas de composición de banda.
- `config.js`: URL y clave pública (publishable) de Supabase.
- `supabase/migrations/`: tablas y reglas de seguridad (RLS).
- `sw.js` y `manifest.webmanifest`: PWA.
- `app.js`, `datos_reglas.js`: lógica y datos del compendio (antes dentro de `index.html`).
- `util.js`: utilidades comunes (escape de HTML, avisos, diálogo de confirmación, barra de carga).
- `router.js`: rutas con `#` (`#/campanas/<id>`, `#/partidas/<id>`, `#/bandas`, `#/s/<seccion>`): recargar, compartir enlaces y botón atrás.
- `tests/`: `tests/run_sql.sh` (PostgreSQL temporal + migraciones + pruebas SQL con salida esperada) y `tests/web/run.sh` (Chrome sin cabeza con Supabase simulado). Se lanzan solos en cada PR (`.github/workflows/tests.yml`).
- `supabase/schema.sql`: estado final del esquema (solo lectura; se regenera con `tests/run_sql.sh --schema`).

## Puesta en marcha de Supabase

1. **Base de datos.** Aplica los archivos de `supabase/migrations/` **en orden** (por nombre):
   `..._init.sql`, `..._games_hardening.sql`, `..._fix_select_policies.sql` y `..._players_ready_arcdeck.sql` y `..._roster_state.sql`, más las posteriores por orden de nombre (las de campañas son `20261106220000_campaigns_phase1.sql` `20261107000000_campaigns_band_management.sql` y `20261107010000_campaigns_vp_traits.sql` y `20261107020000_campaigns_owner_undo.sql`).
   Se hace solo si la integración Supabase–GitHub apunta a este repositorio y a la rama que uses,
   o pegándolos a mano, uno tras otro, en *SQL Editor* del panel de Supabase.
   Cada archivo se ejecuta una sola vez.
2. **URLs de acceso.** En *Authentication → URL Configuration*:
   - *Site URL*: la dirección donde publiques la web.
   - *Redirect URLs*: la misma dirección (y `http://localhost:8000/` si pruebas en local).
3. **Email.** Por defecto Supabase exige confirmar el correo al registrarse.
   Se puede desactivar en *Authentication → Providers → Email* mientras pruebas.
4. **Google.** En *Authentication → Providers → Google*:
   - Crea un cliente OAuth (tipo *Web*) en Google Cloud Console → APIs y servicios → Credenciales.
   - En Google, añade como URI de redirección autorizada la que muestra Supabase en ese panel
     (`https://<proyecto>.supabase.co/auth/v1/callback`).
   - Copia el *Client ID* y el *Client Secret* en Supabase y activa el proveedor.

## Probar en local

```
python3 -m http.server 8000
```

y abre `http://localhost:8000/`.

## Miniaturas

`datos_minis.js` define el objeto global `datosMinis` con `reglas_banda` y
`facciones[].unidades[]` (id, nombre, tipo, coste, stats, ataques, rasgos, límites y equipo permitido).
Se carga en `index.html` antes de `usuarios.js`. El editor de bandas ofrece el catálogo de la facción
elegida, agrupado por tipo, y avisa si la banda no cumple `reglas_banda` o los límites `max_por_banda`.
Para cambiar costes o añadir miniaturas basta con editar ese archivo.
