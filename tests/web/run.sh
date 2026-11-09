#!/usr/bin/env bash
# Pruebas de la web en Chrome sin cabeza, con Supabase simulado (stub.js) y un guion (driver.js)
# que imprime el resultado en <pre id="testout">. Uso: tests/web/run.sh [games|editor|campaigns ...]
set -u
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CHROME=${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser || command -v chrome)}
[ -n "$CHROME" ] || { echo "No encuentro Chrome/Chromium"; exit 2; }
SUITES=${*:-games editor campaigns}
fail=0
for s in $SUITES; do
  T=$(mktemp -d)
  cp "$ROOT"/*.js "$ROOT"/index.html "$ROOT"/manifest.webmanifest "$T"/ 2>/dev/null
  cp "$ROOT/tests/web/$s/stub.js" "$ROOT/tests/web/$s/driver.js" "$T"/
  python3 - "$T/index.html" <<'PY'
import sys,re
p=sys.argv[1]; s=open(p).read()
s=re.sub(r'<script src="https://cdn\.jsdelivr\.net/npm/@supabase[^"]*"></script>','<script src="stub.js"></script>',s)
s=s.replace('</body>','<script src="driver.js"></script></body>')
open(p,'w').write(s)
PY
  out=$("$CHROME" --headless=new --no-sandbox --disable-gpu --allow-file-access-from-files --virtual-time-budget=60000 --dump-dom "file://$T/index.html" 2>/dev/null | python3 -c "
import sys,re,html
d=sys.stdin.read();m=re.search(r'<pre id=\"testout\">(.*?)</pre>',d,re.S)
print(html.unescape(m.group(1)) if m else 'SIN SALIDA')")
  ok=$(printf '%s\n' "$out" | grep -c '^OK  ')
  bad=$(printf '%s\n' "$out" | grep -v '^OK  ' | grep -v '^errores globales: ninguno$' | grep -v '^$')
  if [ -n "$bad" ]; then echo "FALLA $s ($ok OK)"; printf '%s\n' "$bad" | cut -c1-3000; fail=1; else echo "OK    $s ($ok comprobaciones)"; fi
  rm -rf "$T"
done
exit $fail
