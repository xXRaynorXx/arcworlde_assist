#!/usr/bin/env bash
# Pruebas de la base de datos: levanta un PostgreSQL temporal, aplica todas las migraciones
# y ejecuta tests/sql/*.sql comparando la salida con tests/sql/expected/*.out.
#   tests/run_sql.sh            comprueba
#   tests/run_sql.sh --update   regenera los .out esperados
#   tests/run_sql.sh --schema   regenera supabase/schema.sql
set -u
cd "$(dirname "$0")/.."
BIN=$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | sort -V | tail -1)
[ -n "$BIN" ] || { echo "No encuentro PostgreSQL (se necesita initdb/pg_ctl)"; exit 2; }
DIR=$(mktemp -d); PORT=${PGTEST_PORT:-55432}
RUN=""; if [ "$(id -u)" = 0 ]; then chown postgres "$DIR"; RUN="su postgres -c"; fi
sh() { if [ -n "$RUN" ]; then $RUN "$*"; else bash -c "$*"; fi; }
cleanup() { sh "$BIN/pg_ctl -D $DIR stop -m immediate >/dev/null 2>&1"; rm -rf "$DIR"; }
trap cleanup EXIT
sh "$BIN/initdb -D $DIR -U postgres -A trust >/dev/null" || exit 2
sh "$BIN/pg_ctl -D $DIR -o '-p $PORT -k /tmp' -l $DIR/log -w start >/dev/null" || exit 2
P="$BIN/psql -h /tmp -p $PORT -U postgres -q"
$P -c "create database t" >/dev/null
P="$P -d t"
$P -v ON_ERROR_STOP=1 -f tests/sql/00_auth_stub.sql >/dev/null || exit 2
for f in supabase/migrations/*.sql; do
  $P -v ON_ERROR_STOP=1 -f "$f" >/dev/null 2>"$DIR/mig.err" || { echo "FALLA migración $f"; cat "$DIR/mig.err"; exit 1; }
done
if [ "${1:-}" = "--schema" ]; then
  { echo "-- Esquema resultante de aplicar TODAS las migraciones (solo lectura; generado con tests/run_sql.sh --schema)."
    echo "-- Para una base nueva usa las migraciones por orden; este archivo sirve para ver el estado final de tablas y funciones."
    "$BIN/pg_dump" -h /tmp -p $PORT -U postgres -d t -s -n public --no-owner | grep -v '^\\\(restrict\|unrestrict\)' ; } > supabase/schema.sql
  echo "supabase/schema.sql generado ($(wc -l < supabase/schema.sql) líneas)"; exit 0
fi
mkdir -p tests/sql/expected
fail=0
# Cada fichero parte del estado que dejó el anterior (como un recorrido real)
for f in tests/sql/[1-9]*.sql; do
  n=$(basename "$f" .sql)
  $P -f "$f" 2>&1 | sed -E 's#^psql:[^:]*:([0-9]+):#psql:\1:#' | grep -v '^$' > "$DIR/$n.out"
  if [ "${1:-}" = "--update" ]; then cp "$DIR/$n.out" "tests/sql/expected/$n.out"; echo "actualizado $n"
  elif diff -u "tests/sql/expected/$n.out" "$DIR/$n.out" >"$DIR/$n.diff"; then echo "OK    $n"
  else echo "FALLA $n"; cat "$DIR/$n.diff"; fail=1; fi
done
exit $fail
