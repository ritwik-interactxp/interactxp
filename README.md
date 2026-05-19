# InteractXP Website

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Static Export  
**Hosting:** Cloudflare Pages  
**Domain:** interactxp.in

---

## Getting Started

```bash
npm install
npm run dev        # localhost:3000
npm run build      # generates /out directory
```

---

## Project Structure

```
app/
  layout.tsx       # Root layout — fonts, global SEO metadata, JSON-LD
  globals.css      # Design system — colors, components, animations
  page.tsx         # Homepage
  relay/           # Relay product page
  photobooth/      # AI Photobooth product page
  services/        # Services page
  about/           # About page
  contact/         # Contact page
  sitemap.ts       # Auto-generated sitemap.xml
  robots.ts        # Auto-generated robots.txt

components/
  layout/
    Navbar.tsx
    Footer.tsx

public/
  images/
    relay-hero.png  # Your Relay hero image — replace og-default.png with a proper OG image
    og-default.png  # TODO: Create 1200x630px OG image
    logo.png        # TODO: Add your logo PNG
  favicon.ico       # TODO: Add favicon
  icon.svg          # TODO: Add SVG icon
```

---

## TODO Before Launch

### Assets needed
- [ ] `public/favicon.ico` — 32x32 favicon
- [ ] `public/icon.svg` — SVG icon for browsers
- [ ] `public/apple-touch-icon.png` — 180x180px
- [ ] `public/images/og-default.png` — 1200x630px Open Graph image
- [ ] `public/images/og-photobooth.png` — 1200x630px OG for photobooth page
- [ ] `public/images/logo.png` — Logo for JSON-LD schema

### Contact form
The contact page uses a basic `mailto:` form. For production, replace with:
- **Formspree** (free, no backend needed): https://formspree.io
- Or **Web3Forms**: https://web3forms.com
- Replace the form `action` and `method` accordingly

### Content
- [ ] Review all copy and adjust as needed
- [ ] Add actual project screenshots/images when ready
- [ ] Update JSON-LD `sameAs` in `layout.tsx` with social profiles

---

## Cloudflare Pages Setup

1. Push code to GitHub/GitLab
2. Go to Cloudflare Pages → Create Application → Connect to Git
3. Set:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** 20 (Environment variable: `NODE_VERSION=20`)
4. Add custom domain: `interactxp.in`
5. Cloudflare will auto-provision SSL

**Why Cloudflare over Namecheap Stellar:**
- Global CDN edge network (vs single shared server)
- Unlimited bandwidth free
- Automatic HTTPS/SSL
- Built-in DDoS protection
- Better Core Web Vitals = better SEO

---

## SEO Implemented

- ✅ `<title>` and `<meta description>` per page via `generateMetadata`
- ✅ Open Graph tags (title, description, image, url)
- ✅ Twitter Card tags
- ✅ Canonical URLs on every page
- ✅ `robots.txt` auto-generated
- ✅ `sitemap.xml` auto-generated with priority weights
- ✅ JSON-LD Organization schema on root
- ✅ JSON-LD SoftwareApplication schema on /relay
- ✅ JSON-LD Product schema on /photobooth
- ✅ Semantic HTML throughout (h1, h2, etc.)
- ✅ Descriptive `alt` text on all images
- ✅ `rel="canonical"` on all pages
- ✅ Fast fonts via `next/font` (no render blocking)
- ✅ `loading="priority"` on above-fold images
- ✅ Static export = maximum performance

---

## Fonts Used

- **Syne** — Display/headings (distinctive, premium)
- **DM Sans** — Body text (clean, readable)
- **JetBrains Mono** — Labels, tags, code elements
