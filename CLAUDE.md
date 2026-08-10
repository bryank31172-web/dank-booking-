# Dank Booking Website

Bilingual note: the owner (Bryan) communicates in Thai. Reply in Thai or simple English.

## What this is
Marketing + quote-request website for **Dank Booking** — an independent travel
booking agent (Bryan's reseller business) offering car rental, hotels, flights,
transfers, and onsen/spa/activities in Thailand & worldwide with discounts up to
40%. There are NO live inventory APIs: customers submit a quote request (or chat
directly), Bryan quotes manually with his trade discounts, then confirms the
booking. Single-page static site (`index.html`) + one Vercel serverless function
(`api/chat.js`). Same architecture as the sibling repo `dtswebsite`.

## Stack & structure
- `index.html` — the entire site: HTML + CSS + JS in one file (intentional; keep it that way unless asked).
- `api/chat.js` — hardened proxy for the AI chat assistant → Anthropic API. Model + max_tokens pinned server-side; client sends only `{messages}`. Requires `ANTHROPIC_API_KEY` env var on Vercel; without it the chat degrades to a "contact us on WhatsApp/phone" message.
- `assets/` — empty for now; real photos to be added later.

## Key systems inside index.html (search these markers)
- `const CONTACT =` — single source of truth for all contact details (LINE ID, WhatsApp, phone, email). `hydrateContacts()` stamps them into every `[data-contact]` element. **`lineId` is a ★ PLACEHOLDER (empty string)** — while empty, every `.line-only` element (LINE contact card + LINE send button) is hidden automatically.
- `const SERVICES =` — 5 services (car / hotel / flight / transfer / activity) with per-language names, descriptions, discount badge text, and a partner site (`site` + `url`) shown as a "browse options" link on each card: car → QEEQ (m.qeeq.com), hotel → Agoda, flight → SmartFares, transfer → Daytrip, activity → Trazy. Plain homepage links per Bryan's instruction — swap in affiliate/agent tracking URLs here if he gets them. Drives the services grid, marquee, form checkboxes, quote message, and chatbot context.
- `const T =` — i18n dictionary, 4 languages: th (default), en, zh, ja. Every UI string has a key; `setLang()` walks `[data-i18n]` / `[data-ph]` and re-runs the dynamic renderers.
- Quote form: multi-service checkboxes with progressive disclosure (`syncFormVisibility()` — pickup/dropoff shows for car/transfer, class for flight, stars for hotel). `buildQuoteMessage()` composes a structured text message in the current language; "send via" buttons: mailto, `wa.me` deep link with prefilled text, LINE (copy to clipboard + open profile — LINE can't prefill), plain copy. Service card CTA pre-checks that service via `preselectService()`.
- AI chat: FAB bottom-right → `/api/chat`. System context built live from SERVICES + CONTACT; instructed never to invent prices or confirm bookings.
- Fail-safe: `.js .reveal` pattern — if JS crashes, content still displays.

## Brand
Ocean teal #0E7C86 (primary), deep teal #0A5960, ink #14262B, sand #F7F3EA (bg),
shell #EFE9DA, sunset orange #F28C38 (CTA/accent), deal red #E24E4E (discount
badges). Fonts: Prompt (display) + Archivo + IBM Plex Mono + Noto Sans Thai/SC/JP.
Fresh, warm travel feel. Thai is the primary language.

## Facts (do not invent others)
- Phone / WhatsApp: 082-829-8995 (+66 82-829-8995). Email: bryank31172@gmail.com.
- LINE ID: not yet provided — placeholder, kept empty in CONTACT.
- Discounts: car 30–40%, hotel 30–40%, flight up to 20–30%, transfer 40%, onsen/spa/activities 30–40%. All "up to" figures vs standard retail rates, confirmed at quoting.
- Coverage: Thailand & worldwide, all services.
- Partner browse sites (chosen by Bryan): flights smartfares.com, transfers daytrip.com, activities trazy.com, car rental m.qeeq.com, hotels agoda.com.

## Pending tasks
1. Real LINE ID → set `CONTACT.lineId` in index.html (LINE UI appears automatically).
2. Set `ANTHROPIC_API_KEY` on Vercel so the AI chat works in production.
3. Real photos in `assets/` (hero currently uses CSS art — replace if Bryan supplies photos/video).
4. Confirm the response-time promise and the footer disclaimer wording with Bryan.
5. Connect repo to Vercel; custom domain later if wanted.

## Deploy
Static + api/ works on Vercel out of the box: `vercel` or connect the GitHub repo. No build step.
