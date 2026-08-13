# Halo Technologies — haloled.in

Static marketing site for Halo Technologies, Kattappana, Idukki, Kerala.

LED video walls & digital signage · CCTV & security · vehicle and bus CCTV ·
GPS & dash cam · IoT & automation · solar · inverters · lithium batteries.

## Stack

Plain HTML, CSS and vanilla JS. No build step, no dependencies, no framework.
Deployed on Cloudflare Pages straight from this repo — push to `main` and it goes live.

```
index.html          single page, all sections
css/style.css       design system + layout
js/script.js        nav, scroll reveal, lightbox, WhatsApp enquiry
assets/             logo, brochure, photos, favicon
robots.txt
sitemap.xml
```

## Local preview

No server required — open `index.html` directly. Or:

```sh
python3 -m http.server 8000
# http://localhost:8000
```

## Deployment

Cloudflare Pages, connected to this repo's `main` branch.

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | *(empty)* |
| Build output directory | `/` |

Custom domains: `haloled.in` and `www.haloled.in`.

## Editing common things

**Phone / WhatsApp number** — it appears in four places, all of which must be
changed together:

- `js/script.js` → the `WHATSAPP` constant (digits only, e.g. `917594992523`)
- `index.html` → the `.wa-fab` floating button `href`
- `index.html` → every `tel:` link (hero button, contact list, footer)
- `index.html` → the `telephone` field in the JSON-LD block

**Contact email** — `mailto:` links in the contact section and footer, plus the
JSON-LD `email` field.

**Adding project photos** — drop them in `assets/`, then add a `.shot` button to
the `#brochure` section following the existing pattern:

```html
<button class="shot reveal" data-full="assets/your-photo.jpg" aria-label="View ... full size">
  <img src="assets/your-photo.jpg" alt="Describe the photo" loading="lazy">
</button>
```

Compress anything large before committing — aim for under ~300 KB per image.

**Exact street address** — the map currently points at Kattappana town, not a
specific building. Update the `src` on the `.map` iframe and the `address` block
in the JSON-LD once the full address is confirmed.

## Notes

- The enquiry form has no backend. It opens WhatsApp with the fields pre-filled,
  which is the standard pattern for this kind of site and needs no server.
- The logo (`assets/logo.png`) was extracted from the business card artwork. If a
  vector original (SVG/AI/EPS) turns up, swap it in — it will render sharper.
