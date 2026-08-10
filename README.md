# Dank Booking

Travel booking website for Dank Booking — an independent booking agent offering
car rental, hotels, flights, transfers, and onsen/spa/activities (Thailand &
worldwide) with discounts up to 40%.

## Stack

- `index.html` — the entire site (HTML + CSS + JS in one file, 4 languages: th/en/zh/ja). No build step.
- `api/chat.js` — Vercel serverless proxy for the AI chat assistant (Anthropic API).
- `assets/` — photos (to be added later).

## Run locally

Open `index.html` directly in a browser, or:

```
npx serve .        # static only
npx vercel dev     # static + /api/chat
```

## Deploy

Connect the repo to Vercel (or run `vercel`). No build configuration needed.
For the AI chat to work in production, set the `ANTHROPIC_API_KEY` environment
variable in Vercel → Project → Settings → Environment Variables. Without the
key the site still works — the chat shows a fallback message pointing to
WhatsApp/phone.

## Editing contact details

All contact info lives in one place: the `const CONTACT = {...}` object near the
top of the `<script>` in `index.html`. The LINE ID is currently an empty
placeholder — once a real LINE ID is set there, all LINE buttons appear
automatically.
