# Gomed Consultants — Website

Single-page marketing site for MBBS-abroad admissions consulting.

## Structure

```
Gomed-website/
├── index.html        Page markup + meta tags
├── style.css         All styles
├── script.js         Nav toggle + EmailJS form submission
├── assets/
│   └── favicon.svg   Brand monogram used as the site favicon
├── images/           Drop photos here (hero image, OG cover, etc.)
├── fonts/            Reserved for custom web fonts (none in use yet — currently system fonts only)
├── robots.txt
├── sitemap.xml
└── README.md
```

## Before you deploy — checklist

### 1. Domain ✅
Live domain: `gomedconsultancy.in` (purchased via GoDaddy). All canonical URLs, Open Graph/Twitter meta tags, JSON-LD, `robots.txt` and `sitemap.xml` now point at `https://www.gomedconsultancy.in`.

To go live, point the domain at your hosting provider:
- **If using Netlify/Vercel/Cloudflare Pages**: add `gomedconsultancy.in` and `www.gomedconsultancy.in` as custom domains in that provider's dashboard, then update the GoDaddy DNS records (usually an `A`/`ALIAS` record for the root domain and a `CNAME` for `www`) with the values the provider gives you.
- **If using GoDaddy's own hosting**: upload this folder via GoDaddy's file manager/FTP.
- DNS changes can take up to 24–48 hours to propagate.

### 2. Wire up the contact form (EmailJS)
The forms currently show a fake success message until configured. To make them actually deliver enquiries to your inbox:
1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Add an **Email Service** (e.g. connect your Gmail) → copy its **Service ID**.
3. Create an **Email Template** using these variable names (matches the form field `name` attributes): `{{user_name}}`, `{{user_phone}}`, `{{user_email}}`, `{{country}}`, `{{message}}`, `{{form_type}}`.
4. Copy your **Public Key** from Account → General.
5. Open `script.js` and fill in `EMAILJS_CONFIG` at the top with your Public Key, Service ID, and Template ID.

Until those three values are filled in, the site will log a warning to the console and just show the demo "thank you" message without sending anything.

### 3. Add real images
No photos are wired in yet (the design currently uses emoji/flags and CSS gradients only). If you want a hero photo, logo image, or an Open Graph share image:
- Drop files into `images/` or `assets/`
- Compress them first (e.g. via [squoosh.app](https://squoosh.app) or `.webp` export) — aim under ~200KB per image for good Lighthouse scores
- Reference them in `index.html` with `<img>` tags, and add `width`/`height` attributes to avoid layout shift
- Update the `og:image` / `twitter:image` meta tags to point at your real image once you add one (currently pointing at `images/og-cover.jpg`, which doesn't exist yet)

### 4. Google Analytics
In `index.html`, uncomment the GA4 block (search for "Google Analytics (GA4)") and replace both instances of `G-XXXXXXXXXX` with your real Measurement ID from [analytics.google.com](https://analytics.google.com).

### 5. Google Search Console
1. Add your property at [search.google.com/search-console](https://search.google.com/search-console).
2. Use the "HTML tag" verification method → copy the content value into the commented `google-site-verification` meta tag in `index.html` and uncomment it.
3. Once live, submit `sitemap.xml` under Search Console → Sitemaps.

### 6. Favicon fallback (optional but recommended)
`assets/favicon.svg` covers all modern browsers. For older browsers / better OS integration, generate a full favicon set at [realfavicongenerator.net](https://realfavicongenerator.net), drop the output into `assets/`, and add the extra `<link>` tags it gives you.

### 7. Performance / Lighthouse
The page currently has no external images or webfonts, so it should already score well. When you add photos:
- Use `loading="lazy"` on any images below the fold
- Serve `.webp`/`.avif` where possible
- Keep the EmailJS `<script>` tag at the bottom of `<body>` (already done) so it doesn't block rendering

## Local preview
Just open `index.html` in a browser, or serve the folder with any static file server, e.g.:
```
npx serve .
```

## Deploying
Any static host works — Netlify, Vercel, GitHub Pages, or Cloudflare Pages. Drag-and-drop the whole `Gomed-website/` folder, or connect the git repo for auto-deploys on push.
