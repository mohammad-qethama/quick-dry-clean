# BUILD CONTRACT: Quick Dry Clean | السريع للغسيل الجاف (Bilingual Website, First Draft)

You are building a small, fast, static, **bilingual (Arabic primary, English secondary)** marketing website for a local dry cleaning, washing and ironing shop that is **open 24 hours, 7 days a week**. The goal is a digital footprint: customers find the shop, trust it, and contact it in one tap. Follow this contract exactly. Anything marked `[PLACEHOLDER]` must be kept in ONE config file so the owner can swap it later.

---

## 1. Goals and non-goals

**Goals**
- Show what the shop does, roughly what it costs, where it is, and how to reach it.
- Make "Open 24/7" the most memorable fact on the site.
- Convert visitors with one-tap WhatsApp and Call buttons.
- Rank locally on Google in BOTH Arabic and English.

**Non-goals (do NOT build)**
- No user accounts, login, payments, online ordering, or database.
- No backend or server code. No CMS in this draft.
- No cookie banner or analytics scripts in this draft.

---

## 2. Tech stack (mandatory)

- **Framework:** Astro (latest stable), static output (`output: 'static'`)
- **Styling:** Tailwind CSS, using **logical properties** everywhere (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`, `start-*`, `end-*`) so one set of components works in both RTL and LTR. Do not hardcode `left`/`right`.
- **i18n:** Astro built-in i18n routing (see section 4)
- **Language:** TypeScript where needed; minimal client-side JavaScript
- **Fonts:** Arabic: **Cairo** (headings and body). English: **Fraunces** (headings) and **Inter** (body). Load only the weights used, `display=swap`, subset by language (`arabic` + `latin`).
- **Icons:** inline SVG (no icon font)
- **Hosting target:** Cloudflare Pages (`npm run build` → `dist/`)
- **Package manager:** npm

---

## 3. Single source of truth

### `src/config/site.ts` (language-independent facts)

```ts
export const site = {
  siteUrl: "https://example.com",            // [PLACEHOLDER: real domain]
  phoneDisplay: "07 7155 9900",
  phoneIntl: "+962771559900",                 // for tel: links
  whatsapp: "962771559900",                   // digits only, for wa.me links
  email: "",                                  // [PLACEHOLDER] hide if empty
  facebook: "https://www.facebook.com/quickdrycleanjo",
  instagram: "",                              // hide icon if empty
  mapsLink: "https://share.google/pVEZY1WdLjaEmwwD8",   // "Get directions" button
  mapsEmbedUrl: "",                           // [PLACEHOLDER: Google Maps > Share > Embed a map > copy src]
  geo: { lat: 0, lng: 0 },                    // [PLACEHOLDER]
  currencyCode: "JOD",                        // [PLACEHOLDER: confirm]
  delivery: false                             // if true, show pickup/delivery content
};
```

Notes:
- The phone is a Jordanian mobile number, so the international form is +962 7 7155 9900 (the leading 0 is dropped).
- If `mapsEmbedUrl` is empty, do NOT render a broken iframe. Render a styled "map card" with the address and a big "Get directions" button instead.
- If `email` or a social link is empty, hide that element completely.

### `src/i18n/ar.ts` and `src/i18n/en.ts` (all visible text, per language)

Every user-visible string, plus the per-language business fields below, lives in these files. Components never contain hardcoded copy.

| Field | Arabic (`ar`) | English (`en`) |
|---|---|---|
| name | السريع للغسيل الجاف | Quick Dry Clean |
| tagline | ملابس نظيفة وجاهزة… في أي ساعة | Fresh clothes, any hour. |
| hours | مفتوح 24 ساعة، 7 أيام في الأسبوع | Open 24 hours, 7 days a week |
| city | [PLACEHOLDER: المدينة] | [PLACEHOLDER: City] |
| address | [PLACEHOLDER: العنوان] | [PLACEHOLDER: Street address] |
| nightPickupNote | [PLACEHOLDER: كيف يعمل التسليم الليلي] | [PLACEHOLDER: how late-night drop-off works] |
| whatsappText | مرحباً، أرغب بالاستفسار عن خدماتكم | Hi, I'd like to ask about your service |

**Arabic copy quality rules (important):**
- Write natural, clear Modern Standard Arabic with a warm, friendly tone. It must read like it was written by an Arabic speaker, NOT a word-for-word translation of the English.
- Use Western digits (0-9) in both languages (prices, phone, hours), as is common in Jordan.
- Keep copy short and scannable.
- Mark every Arabic string the agent wrote with a comment `// REVIEW: native speaker check` so the owner can proofread.

### `src/config/prices.ts`
An array of `{ category: {ar,en}, item: {ar,en}, price: number, note?: {ar,en} }`. Use clearly fake placeholder prices marked `[PLACEHOLDER]`; render them with the currency from the active language (ar: "دينار" or "د.أ", en: "JD").

---

## 4. Language and routing

- **Arabic is the default and primary language**, served at `/` with `<html lang="ar" dir="rtl">`.
- **English is served at `/en/`** with `<html lang="en" dir="ltr">`.
- Astro config: `i18n: { defaultLocale: "ar", locales: ["ar","en"], routing: { prefixDefaultLocale: false } }`.
- **Language switcher** in the header (and mobile menu): shows "EN" on the Arabic page and "عربي" on the English page, linking to the equivalent page. Do not auto-redirect by browser language and do not store the choice.
- Add `hreflang` alternates (`ar`, `en`, `x-default` → Arabic) on both pages.
- Use **one shared set of components** that take a `lang` prop and read from the i18n files.
- Phone numbers, URLs and Latin text inside Arabic text must be wrapped in `<bdi>` or `dir="ltr"` spans so they do not render reversed.
- Directional icons (arrows, chevrons) must flip in RTL.

---

## 5. Design direction

**Mood:** crisp, fresh, warm, boutique-clean, with a subtle day-to-night feel because the shop never closes. The owner chose the **Soft Boutique** palette.

**Palette (Tailwind theme colors and CSS variables):**
- `cream`: `#FBF7F2` (page background)
- `charcoal`: `#2B2D2F` (main text and dark sections)
- `sage`: `#8AA399` (secondary surfaces, cards, dividers)
- `terracotta`: `#C8553D` (primary CTAs and the "24/7" highlight)
- `sage-light`: `#E4ECE8` (tint of sage for card backgrounds)
- `muted`: `#5E6368` (secondary text)
- Dark sections: `charcoal` background, `cream` text.
- **Contrast rules:** never put white/cream text on `sage`. Terracotta buttons use bold text of at least 18px (or darken to `#B84A33`) so they pass WCAG AA. All text must meet AA.

**Typography:** bold, large, friendly headings (Cairo in Arabic; Fraunces in English). Arabic needs slightly larger body size and more line height (about 1.8) than English. Fluid sizes with `clamp()`. Generous white space.

**Unique touches (implement all three):**
1. **Hanger motif:** a simple inline-SVG clothes hanger used in the logo mark and as a section divider.
2. **Sun-to-moon "24/7" badge:** an animated SVG (a sun gradually turning into a moon over ~8s, looping, CSS-only) beside the hours text in the hero. Sun in terracotta, moon in cream on a charcoal disc. Respect `prefers-reduced-motion` (show a static icon).
3. **Before → After slider:** one draggable comparison slider on a garment (two placeholder images: wrinkled/stained shirt vs pressed/clean). Keyboard accessible (arrow keys), no external library, and it must behave correctly in RTL (labels "قبل / بعد" and "Before / After" placed correctly).

**Layout rules:** mobile-first, max content width 1100px, rounded corners (12-16px), soft shadows, no stock-photo clutter. Placeholder images in `/public/images/placeholder-*.webp` with explicit width/height and translated `alt` text.

---

## 6. Page structure

Single-page site per language (`/` Arabic, `/en/` English) with anchored sections, plus a simple 404. Sticky header.

**Header (sticky):** logo (hanger mark + shop name in the active language), links: Services, Prices, How it works, Contact, language switcher, and a terracotta WhatsApp button. Mobile: accessible hamburger menu.

**1. Hero**
- H1: tagline from i18n.
- One line of subtext about dry cleaning, washing and ironing in the city.
- Sun-to-moon badge with the hours text.
- Two buttons: "WhatsApp" (primary) and "Call now" (secondary outline, opens `tel:`).

**2. Services** (id `services`): 3 cards: Dry cleaning (غسيل جاف), Washing & laundry (غسيل), Ironing & pressing (كوي). Each: inline SVG icon, title, 1-2 sentence placeholder description.

**3. Before/After** (id `quality`): the slider plus one short quality promise line.

**4. How it works** (id `how-it-works`): 3 steps: Drop off → We clean → Pick up (استلام → تنظيف → تسليم). Include `nightPickupNote` below. If `site.delivery` is true, add a pickup/delivery item.

**5. Prices** (id `prices`): clean table from `prices.ts`, grouped by category, with the note "Prices may vary by fabric and condition, ask us for a quote" (translated). Scrolls horizontally on very small screens.

**6. About** (id `about`): short placeholder story, one shop photo placeholder, 3 trust points (e.g., Open 24/7, Careful with every fabric, Quick turnaround).

**7. Contact** (id `contact`, dark section):
- Large hours line ("مفتوح 24 ساعة، 7 أيام في الأسبوع")
- Address, phone (`tel:`), WhatsApp (`wa.me` link with the language-specific prefilled text), Facebook link
- Map embed (lazy-loaded) or map card fallback (see section 3), plus a "Get directions" button to `site.mapsLink`

**8. Footer:** shop name, hanger mark, Facebook icon (and Instagram if set), © year.

**Floating contact buttons:** a sticky circular WhatsApp button positioned with `end-4 bottom-4` (flips automatically in RTL), plus on mobile a bottom bar with "Call" and "WhatsApp" side by side. They must never cover footer content (add bottom padding to the page).

---

## 7. SEO and local search (required, per language)

- **Arabic title:** `غسيل جاف وكوي على مدار الساعة في [المدينة] | السريع للغسيل الجاف`
- **English title:** `24 Hour Dry Cleaning & Ironing in [City] | Quick Dry Clean`
- A meta description per language (150-160 chars) mentioning 24-hour service, dry cleaning, washing, ironing and the city.
- One H1 per page; logical H2/H3 hierarchy.
- Open Graph and Twitter tags per language; `og:locale` = `ar_JO` (Arabic page, with `en_US` as alternate) and `en_US` (English page, with `ar_JO` as alternate). Placeholder social image 1200×630.
- Canonical URL per page, `hreflang` as in section 4.
- `robots.txt` and auto-generated `sitemap.xml` (`@astrojs/sitemap`, with i18n alternates).
- **JSON-LD `LocalBusiness` (type `DryCleaningOrLaundry` if valid, otherwise `LocalBusiness`)** generated from config: `name` and `alternateName` (both language names), `address`, `telephone` (+962771559900), `url`, `sameAs` (Facebook), `openingHoursSpecification` for all 7 days 00:00-23:59, `geo`, `priceRange`, `areaServed`, `inLanguage` (`ar`, `en`).
- Favicon set from the hanger mark (`favicon.svg` plus PNG fallback).

---

## 8. Performance, accessibility, quality bars

- Lighthouse (mobile) targets: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100, on BOTH language pages.
- Images: WebP/AVIF, lazy-loaded below the fold, explicit dimensions; the hero/LCP element is not lazy.
- Total JS shipped < 30 KB (only for the mobile menu and the slider).
- Semantic HTML, visible focus states, skip-to-content link, keyboard-usable controls, `aria-label` on icon-only buttons (translated), `prefers-reduced-motion` respected.
- CLS < 0.05. Works from 320px to 1920px, in both RTL and LTR, with no overflow or mirrored-wrong elements.

---

## 9. Project structure

```
/
├─ astro.config.mjs
├─ tailwind.config.mjs
├─ package.json
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ images/ (placeholder-*.webp, og-image.png)
└─ src/
   ├─ config/ (site.ts, prices.ts)
   ├─ i18n/ (ar.ts, en.ts, utils.ts)
   ├─ layouts/BaseLayout.astro        // sets lang, dir, hreflang, meta
   ├─ components/
   │   Header, LangSwitcher, Hero, SunMoonBadge, Services, BeforeAfter,
   │   HowItWorks, Prices, About, Contact, Footer, FloatingCta, Schema
   ├─ pages/
   │   index.astro        // Arabic (default)
   │   en/index.astro     // English
   │   404.astro
   └─ styles/global.css
```

---

## 10. Deliverables

1. A complete, buildable project in the structure above.
2. `npm install && npm run dev` runs locally; `npm run build` produces `dist/` with no errors or warnings.
3. `README.md` covering: editing `site.ts`, the two i18n files and `prices.ts`; replacing images; deploying to Cloudflare Pages (build command `npm run build`, output directory `dist`); and an "after launch" checklist (Google Business Profile with hours set to Open 24 hours, link the website, verify the domain, submit the sitemap in Search Console).
4. At the end of your final message: a list of every `[PLACEHOLDER]` the owner must fill in, and a list of the Arabic strings flagged for native-speaker review.

---

## 11. Acceptance checklist (self-verify before finishing)

- [ ] Arabic page at `/` renders fully RTL; English at `/en/` renders fully LTR; the switcher links to the equivalent page.
- [ ] No hardcoded `left`/`right` spacing; the floating button, icons, slider and menu behave correctly in both directions.
- [ ] Phone number and other Latin text never render reversed inside Arabic text.
- [ ] Changing a value in `site.ts` or the i18n files updates header, hero, contact, schema and footer.
- [ ] WhatsApp (`wa.me/962771559900` with the language-specific text) and Call (`tel:+962771559900`) work.
- [ ] Facebook link points to https://www.facebook.com/quickdrycleanjo; "Get directions" uses the provided location link.
- [ ] "Open 24/7" appears in the hero, contact section, title tag and schema, in both languages.
- [ ] Colors come only from the Soft Boutique palette; contrast meets AA.
- [ ] Sun-to-moon badge and slider work, are keyboard accessible, and respect reduced motion.
- [ ] `hreflang`, canonical, per-language meta tags, sitemap and JSON-LD are present and valid.
- [ ] No external JS libraries, no tracking, no unused dependencies.

---

## 12. Rules of engagement

- Do not add features outside this contract. If something is ambiguous, choose the simplest option and note it in the README.
- Use natural placeholder text, not "lorem ipsum", in the correct language.
- Keep code clean, commented where non-obvious, and consistent in style.
- Do not invent business facts (prices, awards, years in business, address). Use clearly marked placeholders.
