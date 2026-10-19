"""Warn (as GitHub Actions annotations) about hard-coded image URLs that no longer load.

Scans react-app/src and app/seeds for image URLs and sends a HEAD request to each.
Never fails the build: missing images are handled by fallbacks in the UI.
"""
import pathlib
import re
import sys
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL_RE = re.compile(r"https?://[^\s\"'`)]+\.(?:jpg|jpeg|png|gif|webp)", re.I)

urls = set()
for folder in ("react-app/src", "app/seeds"):
    for path in (ROOT / folder).rglob("*"):
        if path.suffix in (".js", ".py", ".css"):
            urls.update(URL_RE.findall(path.read_text(encoding="utf-8", errors="ignore")))

missing = []
for url in sorted(urls):
    try:
        req = urllib.request.Request(url, method="HEAD")
        status = urllib.request.urlopen(req, timeout=15).status
    except urllib.error.HTTPError as e:
        status = e.code
    except Exception as e:  # network trouble shouldn't break CI
        status = type(e).__name__
    if status != 200:
        missing.append(url)
        print(f"::warning title=Image link {status}::{url}")

print(f"{len(urls) - len(missing)}/{len(urls)} image links OK")
sys.exit(0)
