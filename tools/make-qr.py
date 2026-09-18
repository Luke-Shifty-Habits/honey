"""Generate the QR code for the jar labels.

    pip install segno
    python tools/make-qr.py https://yourname.github.io/honey/

Writes qr-label.svg (vector — best for printing) and qr-label.png.
"""
import sys
import segno

url = sys.argv[1] if len(sys.argv) > 1 else "https://example.github.io/honey/"

qr = segno.make(url, error="h")  # high error correction survives sticky labels
qr.save("qr-label.svg", scale=10, border=4, dark="#4a2f10")
qr.save("qr-label.png", scale=20, border=4, dark="#4a2f10")
print("Wrote qr-label.svg and qr-label.png for", url)
