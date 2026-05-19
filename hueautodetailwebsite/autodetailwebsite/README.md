# Hue Auto Detailing Website

Static website for Hue Auto Detailing.

## Files

- `index.html` - page content, contact links, packages, and form fields.
- `styles.css` - responsive layout, colors, typography, and section styling.
- `script.js` - mobile navigation, image carousel, before/after sliders, copyright year, and the mailto booking request.
- `images/` - web-ready gallery images exported as JPG at `1920x1080`.
- `brand/` - optimized Hue logo PNGs and the local heading font.

## Customize

Update the placeholder phone number and email in `index.html` and `script.js`:

- `(555) 555-0142`
- `hello@hueautodetailing.com`

The current gallery photos have already been converted to `.jpg` files at `1920x1080`.

## Preview

Open `index.html` directly in a browser, or run a local server from this folder:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8000/`.
