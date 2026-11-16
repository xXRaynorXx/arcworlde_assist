#!/usr/bin/env bash
# Lista los textos en castellano que salen en pantalla sin traducción al inglés (completa i18n_en.js).
# Ejecuta los guiones de tests/web con la web en inglés y recoge AWI18n.missing() al terminar.
# Uso: tests/web/i18n_scan.sh [games|editor|campaigns ...]   (sale por stdout, uno por línea)
set -u
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CHROME=${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser || command -v chrome)}
[ -n "$CHROME" ] || { echo "No encuentro Chrome/Chromium"; exit 2; }
SUITES=${*:-games editor campaigns}
ALL=$(mktemp)
for s in $SUITES; do
  T=$(mktemp -d)
  cp "$ROOT"/*.js "$ROOT"/index.html "$ROOT"/manifest.webmanifest "$T"/ 2>/dev/null
  cp "$ROOT/tests/web/$s/stub.js" "$ROOT/tests/web/$s/driver.js" "$T"/
  python3 - "$T/index.html" <<'PY'
import sys,re
p=sys.argv[1]; s=open(p).read()
s=re.sub(r'<script src="https://cdn\.jsdelivr\.net/npm/@supabase[^"]*"></script>','<script src="stub.js"></script>',s)
s=s.replace('<head>','<head><script>try{localStorage.setItem("aw_lang","en")}catch(e){}</script>',1)
s=s.replace('</body>','<script src="driver.js"></script><script>(function(){var t=setInterval(function(){var p=document.getElementById("testout");if(p&&window.AWI18n){clearInterval(t);p.textContent+="\\n@@MISSING@@\\n"+AWI18n.missing().join("\\n")}},200)})()</script></body>')
open(p,'w').write(s)
PY
  "$CHROME" --headless=new --no-sandbox --disable-gpu --allow-file-access-from-files --virtual-time-budget=60000 --dump-dom "file://$T/index.html" 2>/dev/null | python3 -c "
import sys,re,html
d=sys.stdin.read();m=re.search(r'<pre id=\"testout\">(.*?)</pre>',d,re.S)
t=html.unescape(m.group(1)) if m else ''
print(t.split('@@MISSING@@',1)[1].strip() if '@@MISSING@@' in t else '')" >> "$ALL"
  rm -rf "$T"
done
sort -u "$ALL" | grep -v '^$'
rm -f "$ALL"
