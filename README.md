# ArcWorlde Assist

Compendio de reglas de ArcWorlde con cuentas de usuario y bandas guardadas en Supabase.
Próximas fases: partidas únicas y campañas con invitaciones.

## Estructura

- `index.html`: compendio (reglas, facciones, campaña, escenarios) y menú.
- `usuarios.js`: cuentas (email y Google) y sección **Mis Bandas**. Se engancha al menú sin tocar el compendio.
- `partidas.js`: sección **Partidas** (crear con nº de jugadores, invitar con código o enlace, elegir banda, OK de cada jugador, empezar, rondas con eventos ArcDeck, puntuar y cerrar).
- `fichas.js`: ficha de banda (atributos, ataques, rasgos) y seguimiento en partida de vida, atributos y lesiones.
- `datos_arcdeck.js`: tabla de eventos ArcDeck (Bosque de Mildaark y Tierras de Vauhaemia).
- `datos_minis.js`: catálogo de miniaturas y reglas de composición de banda.
- `config.js`: URL y clave pública (publishable) de Supabase.
- `supabase/migrations/`: tablas y reglas de seguridad (RLS).
- `sw.js` y `manifest.webmanifest`: PWA.
- `*_old.*`, `app_old.js`: versiones antiguas, sin uso.

## Puesta en marcha de Supabase

1. **Base de datos.** Aplica los archivos de `supabase/migrations/` **en orden** (por nombre):
   `..._init.sql`, `..._games_hardening.sql`, `..._fix_select_policies.sql` y `..._players_ready_arcdeck.sql` y `..._roster_state.sql`.
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
