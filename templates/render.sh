#!/usr/bin/env bash
# Render a Med&X template to a PNG of the exact pixel size, with headless Chrome.
#
#   templates/render.sh <template> <values.json> <out.png> [--scale 2] [--serif-fallback]
#
#   <template>        a file in templates/ (big-number-feed, ticket-story, ...) or a path to one
#   <values.json>     the texts and the photo path (see examples/*.json)
#   --scale 2         a high-resolution copy at 2x (2160 x 2700 for a feed post)
#   --serif-fallback  render with Newsreader even when New York is on this Mac (to check the non-Mac look)
#
# Needs Google Chrome (or Chromium) and python3. Set CHROME=/path/to/chrome to choose a browser.
# Fails (exit 1) when a face or photo did not load, text leaves the canvas or its box, a placeholder is left
# unfilled, or the PNG is not the exact size.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
[ $# -ge 3 ] || { sed -n '2,15p' "$0"; exit 2; }
TPL="$1"; VALUES="$2"; OUT="$3"; shift 3
SCALE=1; FILL_FLAGS=()
while [ $# -gt 0 ]; do
  case "$1" in
    --scale) SCALE="$2"; shift 2 ;;
    --serif-fallback) FILL_FLAGS+=(--serif-fallback); shift ;;
    *) echo "unknown option: $1" >&2; exit 2 ;;
  esac
done

[ -f "$TPL" ] || TPL="$HERE/${TPL%.html}.html"
[ -f "$TPL" ] || { echo "template not found: $TPL" >&2; exit 1; }
[ -f "$VALUES" ] || { echo "values file not found: $VALUES" >&2; exit 1; }

if [ -z "${CHROME:-}" ]; then
  for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
           "/Applications/Chromium.app/Contents/MacOS/Chromium" \
           "$(command -v google-chrome 2>/dev/null || true)" "$(command -v chromium 2>/dev/null || true)" \
           "$(command -v chromium-browser 2>/dev/null || true)"; do
    if [ -n "$c" ] && [ -x "$c" ]; then CHROME="$c"; break; fi
  done
fi
[ -n "${CHROME:-}" ] && [ -x "$CHROME" ] || { echo "Chrome not found. Install Google Chrome or set CHROME=/path/to/chrome" >&2; exit 1; }

SIZE="$(grep -o 'data-size="[0-9]*x[0-9]*"' "$TPL" | head -1 | grep -o '[0-9]*x[0-9]*')"
[ -n "$SIZE" ] || { echo "template has no data-size" >&2; exit 1; }
W="${SIZE%x*}"; H="${SIZE#*x}"
EXPECT="$(( W * SCALE ))x$(( H * SCALE ))"

TMP="$(dirname "$TPL")/.render-$$.html"
PROFILE="$(mktemp -d "${TMPDIR:-/tmp}/medx-chrome.XXXXXX")"
cleanup() { rm -f "$TMP"; rm -rf "$PROFILE"; }
trap cleanup EXIT

python3 "$HERE/fill.py" "$TPL" "$VALUES" "$TMP" ${FILL_FLAGS[@]+"${FILL_FLAGS[@]}"}
URL="$(python3 -c 'import pathlib,sys; print(pathlib.Path(sys.argv[1]).resolve().as_uri())' "$TMP")"

chrome() {  # runs Chrome with a 90 s watchdog (macOS has no `timeout`)
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run --no-default-browser-check \
    --user-data-dir="$PROFILE" --force-device-scale-factor="$SCALE" --window-size="$W,$H" \
    --virtual-time-budget=10000 "$@" "$URL" 2>/dev/null &
  local pid=$!
  ( sleep 90; kill "$pid" 2>/dev/null ) >/dev/null 2>&1 & local dog=$!
  wait "$pid"; local rc=$?
  kill "$dog" 2>/dev/null || true; wait "$dog" 2>/dev/null || true
  return $rc
}

DOM="$(chrome --dump-dom)"
STATUS="$(printf '%s' "$DOM" | grep -o 'data-medx-status="[A-Z]*"' | head -1 | cut -d'"' -f2 || true)"
REPORT="$(printf '%s' "$DOM" | grep -o 'data-medx-report="[^"]*"' | head -1 | cut -d'"' -f2 | sed 's/&amp;/\&/g; s/&quot;/"/g; s/&#39;/'"'"'/g' || true)"

mkdir -p "$(dirname "$OUT")"
chrome --screenshot="$OUT" >/dev/null
GOT="$(python3 "$HERE/fill.py" --png-size "$OUT")"

if [ "$STATUS" != "OK" ]; then
  echo "FAIL $(basename "$OUT"): ${REPORT:-the page did not finish its checks}" >&2; exit 1
fi
if [ "$GOT" != "$EXPECT" ]; then
  echo "FAIL $(basename "$OUT"): PNG is $GOT, expected $EXPECT" >&2; exit 1
fi
echo "OK $OUT ($GOT) ${REPORT}"
