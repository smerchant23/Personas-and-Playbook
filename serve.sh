#!/usr/bin/env bash
# Serves the static site on a fixed local port. No install required (Python 3).
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

# Default port (override: PORT=9000 ./serve.sh). 8765 avoids many blocked ranges.
PORT="${PORT:-8765}"

echo ""
echo "  Personas — interview playbooks"
echo "  ─────────────────────────────"
echo "  Open this in your browser:"
echo "    http://127.0.0.1:${PORT}/"
echo "  Optional:"
echo "    http://personas.localtest.me:${PORT}/"
echo ""
echo "  Stop: Ctrl+C in this terminal"
echo ""

python3 -m http.server "$PORT" --bind 127.0.0.1 &
SRV_PID=$!
trap 'kill "$SRV_PID" 2>/dev/null; exit 130' INT TERM
sleep 0.35
if command -v open >/dev/null 2>&1; then
  open "http://127.0.0.1:${PORT}/"
fi
wait "$SRV_PID"
