#!/usr/bin/env python3
"""Fill a Med&X template with values from a JSON file. Python 3 standard library only.

  fill.py <template.html> <values.json> <out.html> [--serif-fallback]
  fill.py --png-size <file.png>          prints WIDTHxHEIGHT

Placeholders are {{KEY}} (required) or {{KEY|default}} (optional, the default is used when the key is missing).
Values are HTML-escaped. A key whose name starts with PHOTO and ends in a file name (PHOTO, PHOTO_2) is a path:
relative paths are read from the folder of the JSON file, and the file must exist."""
import html
import json
import pathlib
import re
import struct
import sys

PH = re.compile(r"\{\{([A-Z0-9_]+)(?:\|([^}]*))?\}\}")


def png_size(path):
    with open(path, "rb") as f:
        head = f.read(24)
    if head[:8] != b"\x89PNG\r\n\x1a\n":
        sys.exit(f"not a PNG: {path}")
    w, h = struct.unpack(">II", head[16:24])
    return f"{w}x{h}"


def main(argv):
    if len(argv) == 3 and argv[1] == "--png-size":
        print(png_size(argv[2]))
        return
    if len(argv) < 4:
        sys.exit(__doc__)
    tpl, vals_path, out = map(pathlib.Path, argv[1:4])
    fallback = "--serif-fallback" in argv[4:]
    text = tpl.read_text(encoding="utf-8")
    values = json.loads(vals_path.read_text(encoding="utf-8"))
    values = {k: v for k, v in values.items() if not k.startswith("_")}  # "_comment" keys are notes
    base = vals_path.resolve().parent
    missing, used = [], set()

    def value(m):
        key, default = m.group(1), m.group(2)
        used.add(key)
        if key in values:
            v = str(values[key])
        elif default is not None:
            v = default
        else:
            missing.append(key)
            return m.group(0)
        if key.startswith("PHOTO") and re.search(r"\.(jpe?g|png|webp|avif|svg)$", v, re.I):
            p = pathlib.Path(v).expanduser()
            p = p if p.is_absolute() else (base / p)
            if not p.exists():
                sys.exit(f"photo not found for {key}: {p}")
            return p.resolve().as_uri()
        return html.escape(v, quote=True)

    filled = PH.sub(value, text)
    if missing:
        sys.exit("missing values: " + ", ".join(sorted(set(missing))))
    unknown = sorted(set(values) - used)
    if unknown:
        print("note: keys not used by this template: " + ", ".join(unknown), file=sys.stderr)
    if fallback:
        filled = re.sub(r"<html([^>]*?)class=\"", r'<html\1class="serif-fallback ', filled, count=1) \
            if re.search(r"<html[^>]*class=\"", filled) else filled.replace("<html", '<html class="serif-fallback"', 1)
    out.write_text(filled, encoding="utf-8")


if __name__ == "__main__":
    main(sys.argv)
