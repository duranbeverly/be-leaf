"""Build step: the home-page photo on S3 is 6604 px wide (several MB). Download it once and
save phone- and desktop-sized WebP copies the app serves itself. If the download fails, the
page falls back to the original photo, so the build never breaks over it."""
import io
import os
import urllib.request

from PIL import Image

SRC = "https://be-leaf.s3.amazonaws.com/plants_landscape4.jpg"
OUT = os.path.join(os.path.dirname(__file__), "..", "react-app", "public", "img")

try:
    data = urllib.request.urlopen(SRC, timeout=60).read()
    im = Image.open(io.BytesIO(data)).convert("RGB")
    os.makedirs(OUT, exist_ok=True)
    for width in (960, 1920):
        copy = im.copy()
        copy.thumbnail((width, width * 2))
        copy.save(os.path.join(OUT, f"hero-{width}.webp"), "WEBP", quality=78, method=6)
    print("hero images ready")
except Exception as e:  # noqa: BLE001 - never fail the build over an image
    print(f"skipping hero optimization: {e}")
