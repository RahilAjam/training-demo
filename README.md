# Thrive Drive Academy — Demo Website Template

A plain static-site demo template for a local driving school in Bengaluru, India. Built mobile-first for phone pitching.

## Tech

- `index.html` — shell, loads `data.js` then `script.js`
- `style.css` — all styling, one accent colour + neutrals as CSS variables
- `script.js` — builds the entire page from `data.js` (no hard-coded business content)
- `data.js` — all business-specific content (name, phone, WhatsApp, address, hours, services, reviews, map link)
- `/images` — folder for photos (uses CSS gradients / SVG placeholders if empty)

No frameworks, no npm, no build step, no external JS libraries (one Google Font: DM Sans). Total page weight under 1 MB.

## How to reuse for a new client

1. Copy this folder to a new client folder.
2. Edit only `data.js` — replace the sample/placeholder values with the real business's verified details.
3. Open `index.html` in a browser. The page builds itself from `data.js`.
4. Add real photos to `/images` if available; otherwise the SVG/CSS placeholders show.

## Content rules

- Never invent reviews, awards, prices, or claims. Use clearly marked placeholders like `[Add real review]`.
- All business content lives in `data.js`. `index.html` must not contain business names, phone numbers, addresses, etc.
- Write natural, short, human copy in Indian English.
- Footer note: "Demo website by Molla Rahil Ajam | 9641100957".

## Mobile

- Sticky bottom bar on mobile: "Call" (tel:) + "WhatsApp" (wa.me with prefilled message).
- Designed to look right at 360px, then scale up to desktop.
- 16px minimum body text, 44px minimum tap targets.
- Google Maps embed iframe or "Get directions" button using the map link from `data.js`.

## Verification

Open `_verify.html` in a browser to check layout at 360px, 412px, and 768px widths (scroll width, overflow, link count, min tap target).

## Developer

Demo website by Molla Rahil Ajam | 9641100957
