# Quick Dry Clean | السريع للغسيل الجاف

First draft: Astro 7, Tailwind CSS 4, static HTML, Arabic at `/` and English at `/en/`. Prepared for Cloudflare Pages. No backend, ordering, payment, cookies, analytics, or client framework. The only application JavaScript controls the navigation and comparison slider.

## Run and build

Use Node.js 24 LTS (minimum 22.12) and npm.

```sh
npm install
npm run dev
```

Visit `http://localhost:4321/` and `http://localhost:4321/en/`.

```sh
npm run check
npm run build
npm run preview
```

`dist/` is the complete deployable site. Do not upload the source directory or `node_modules` as the published directory. Dependencies are locked in `package-lock.json`. Self-hosted fonts load only Cairo 400/700 (Arabic and Latin), Fraunces 600 (Latin), and Inter 400/700 (Latin), using `font-display: swap`.

## Owner editing guide

- `src/config/site.ts`: domain, telephone, WhatsApp, social URLs, optional email, map link/embed, coordinates, currency code, delivery availability, and **all unknown owner-supplied values** in `placeholders`.
- `src/i18n/ar.ts` and `src/i18n/en.ts`: all translated interface and business copy. Localized unknown values are imported from `site.ts` to avoid duplicating placeholders. Arabic text has `// REVIEW: native speaker check` comments.
- `src/config/prices.ts`: exports the required array of bilingual category/item/price records. It currently maps three zero-price draft examples from `site.ts` and labels from the language files. To add rows, extend the price values and corresponding translated categories/items together; the table automatically groups matching categories. Numeric `0.00` values are deliberately fake and **not free-service offers**.
- `src/styles/global.css` and `tailwind.config.mjs`: shared logical styling and Soft Boutique color tokens. Terracotta buttons use the permitted darker shade `#B84A33` for contrast.

After changing the city, rewrite both SEO descriptions to remain 150–160 characters. The draft descriptions are 159 Arabic / 150 English characters. Rebuild after every content change; the domain flows into canonical links, alternates, JSON-LD, the sitemap, and robots.txt. Currency display labels live in both language files (`د.أ` / `JD`); update those if changing `currencyCode`.

## Every owner placeholder

All values below are centralized in `src/config/site.ts`:

1. Real domain (`siteUrl`, currently `https://example.com`).
2. Optional email (`email`, currently hidden).
3. Google Maps embed URL (`mapsEmbedUrl`, optional; the functional directions card is used when empty).
4. Exact latitude and longitude (`geo`, currently `0, 0`).
5. Confirm currency (`currencyCode`, currently JOD).
6. City in Arabic and English (`placeholders.ar/en.city`).
7. Street address in Arabic and English (`placeholders.ar/en.address`).
8. Late-night drop-off / collection instructions in both languages (`nightPickupNote`).
9. Approved shop story in both languages (`story`).
10. Three service descriptions in both languages (`serviceDescriptions`).
11. Confirm actual services/garments and three real prices (`prices`, currently `[0, 0, 0]`; draft rows: suit dry cleaning, shirt washing, shirt ironing).
12. Confirmed schema price range (`priceRange`).
13. Real matching before/after images (`images.before`, `images.after`).
14. Real shop photo (`images.shop`).
15. Approved 1200×630 social preview (`images.social`).

Instagram is optional and hidden when empty. Delivery is false; enable only when confirmed. The supplied phone, WhatsApp number, Facebook URL, and directions URL are already filled. Review the aspirational quality/trust copy before publishing; no years, awards, address, or turnaround guarantees have been invented.

## Replace images

The three WebP images are generated fictional illustrations, explicitly labeled on the page. Replace `public/images/placeholder-before.webp` and `placeholder-after.webp` with an aligned pair of the same garment (800×700), and `placeholder-shop.webp` with the real shop (900×700). Replace `og-image.png` (1200×630). Keep filenames to avoid config edits, or change their paths in `site.ts`. Keep explicit dimensions synchronized if using different aspect ratios. Update translated alt text and remove draft-image notices only after real assets are supplied. The favicon SVG and 32×32 PNG are the shared hanger motif.

## Cloudflare Pages deployment

1. Put the source and lockfile in a Git repository and connect it to a new Cloudflare Pages project.
2. Choose Astro (static), root directory `/`, build command `npm run build`, output directory `dist`.
3. Set `NODE_VERSION=24` if the build environment needs an explicit version. No adapter or server bindings are required.
4. Set the real `siteUrl` before the production build, replace all placeholders, proofread Arabic, and deploy. Connect the custom domain in Pages.
5. Check `/`, `/en/`, `/404.html`, `/robots.txt`, and `/sitemap.xml` on the deployed domain. Rerun Lighthouse on the production URLs.

See the [official Cloudflare Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/). This handoff prepares deployment; it has not published the business site.

## Decisions where the contract overlaps

- The contract asks both for all placeholders in one config and localized fields/prices in separate files. Unknown values live in `site.ts`; the i18n files and `prices.ts` import them. Interface labels explaining that content is a placeholder remain translated UI copy.
- Fake prices are `0.00` with a conspicuous placeholder disclaimer, avoiding plausible invented prices.
- The requested simple 404 is Arabic, with the shared language switcher linking to the English homepage.
- The sitemap integration produces `sitemap-index.xml` and `sitemap-0.xml`. A postbuild step creates the requested `sitemap.xml` alias and regenerates `public/robots.txt` and `dist/robots.txt` from that generated canonical domain.
- The `DryCleaningOrLaundry` schema type is [valid in Schema.org](https://schema.org/DryCleaningOrLaundry). Required draft geo/address/priceRange fields remain placeholders; correct them before asking search engines to index production.
- A native range input overlays the comparison image. It supports pointer/touch dragging, arrows, Home, and End; RTL reverses the reading direction and corresponding labels. Focus outlines surround the image.
- No pickup/delivery claims appear while `delivery` is false. The 24/7 service claim comes directly from the contract; collection timing is explicitly unknown.

## Verification

Run `npm run check` and `npm run build`. To repeat the browser checks with installed Microsoft Edge and the preview server running:

```sh
node scripts/qa.mjs
node scripts/arabic-review.mjs
```

The browser script checks `/` and `/en/` at 320, 768, 1280, and 1920px: correct language/direction, no page overflow, language links, pointer and keyboard slider controls, mobile menu dismissal, reduced motion, metadata length, schema, contact destinations, loaded images, runtime errors, and axe accessibility. Screenshots and machine reports are written to ignored `qa-output/`. The only intended horizontal scrolling is the price table at very narrow widths. Lighthouse and axe are dev dependencies only; they are never shipped.

Full verification and contract acceptance checklist: [ACCEPTANCE.md](ACCEPTANCE.md). Full Arabic proofreading list, including alt text, accessibility labels, metadata, and config placeholders: [ARABIC_REVIEW.md](ARABIC_REVIEW.md).

## After launch

- [ ] Verify the Google Business Profile, set every day to **Open 24 hours**, and link the site.
- [ ] Verify the actual domain in Google Search Console.
- [ ] Submit `https://YOUR-DOMAIN/sitemap.xml`.
- [ ] Check indexed titles, snippets, Arabic/English alternate URLs, and business details.
- [ ] Rerun mobile Lighthouse after replacing photos, copy, or fonts; local lab scores are not guarantees for production networks.
