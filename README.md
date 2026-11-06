# ArcWorlde Assist

Compendio de reglas de ArcWorlde con cuentas de usuario y bandas guardadas en Supabase.
Próximas fases: partidas únicas y campañas con invitaciones.

## Estructura

- `index.html`: compendio (reglas, facciones, campaña, escenarios) y menú.
- `usuarios.js`: cuentas (email y Google) y sección **Mis Bandas**. Se engancha al menú sin tocar el compendio.
- `config.js`: URL y clave pública (publishable) de Supabase.
- `supabase/migrations/`: tablas y reglas de seguridad (RLS).
- `sw.js` y `manifest.webmanifest`: PWA.
- `*_old.*`, `app_old.js`: versiones antiguas, sin uso.

## Puesta en marcha de Supabase

1. **Base de datos.** Aplica `supabase/migrations/20261106120000_init.sql`:
   automáticamente si la integración Supabase–GitHub apunta a este repositorio y a la rama que uses,
   o pegándolo a mano en *SQL Editor* del panel de Supabase.
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

## Miniaturas (pendiente)

Cuando exista `datos_minis.js` (objeto global `datosMinis` con `facciones[].unidades[]`),
se añade `<script src="datos_minis.js"></script>` antes de `usuarios.js` en `index.html`.
El editor de bandas ya ofrece el catálogo por facción en cuanto detecta esos datos.
