# Contract acceptance — first draft

Verified 2 October 2026. Build and type checks complete without errors or warnings. The owner placeholders and Arabic native-speaker approval are intentionally outstanding content tasks, not invented business facts.

## Checklist

- [x] Arabic `/` is `lang="ar" dir="rtl"`; English `/en/` is `lang="en" dir="ltr"`. Header and mobile language links point to the equivalent homepage. No redirects or stored choice.
- [x] Shared components use logical spacing/positioning, with no physical left/right CSS properties. Floating WhatsApp changes sides; directional arrows flip; the menu and slider respond correctly in RTL/LTR.
- [x] Phone, mixed placeholder text, numeric prices, and language labels use bidi isolation or explicit LTR direction; no reversed phone number.
- [x] Shared config and language imports drive relevant header, hero, contact, schema, and footer fields; domain also drives robots and sitemap at build time.
- [x] WhatsApp uses `https://wa.me/962771559900` with correctly encoded language-specific text; telephone links use `tel:+962771559900`. Destination URLs verified without initiating a call or sending a message.
- [x] Facebook is `https://www.facebook.com/quickdrycleanjo`; directions use `https://share.google/pVEZY1WdLjaEmwwD8`.
- [x] 24-hour availability appears in each hero/contact/title; schema specifies all 7 days, `00:00` to `23:59`.
- [x] Soft Boutique tokens only, including the contract-permitted darker terracotta CTA. Automated contrast checks pass; cream is not placed on sage.
- [x] CSS-only 8-second sun/moon animation; reduced motion gives a static sun. Native range comparison supports arrows, Home/End, and pointer dragging with correctly oriented labels and values.
- [x] Per-page canonical, `ar`/`en`/`x-default` alternates, 150–160-character descriptions, OG/Twitter metadata, generated sitemap, and parseable LocalBusiness JSON-LD are present. Schema type exists in Schema.org. Domain/address/coordinates/price range require owner completion before production indexing.
- [x] No external client JavaScript, tracking, client framework, or unused production dependencies. Self-hosted subset fonts. Dev-only browser tools do not appear in static output.

## Additional quality checks

- [x] Both routes checked at **320, 768, 1280, and 1920px**, including full-page screenshots. The six requested 320/768/1280 screenshots visually inspected.
- [x] No horizontal page overflow or runtime errors at those widths. The narrow price table scrolls within its own labeled focusable region.
- [x] Axe WCAG 2 A/AA and 2.1 AA: zero violations on all eight route/viewport combinations.
- [x] One H1 per page; logical section headings; skip link; visible keyboard focus; keyboard-operable mobile menu with Escape and focus return.
- [x] WebP images have dimensions, translated alt text and lazy loading below the fold. No lazy-loaded hero/LCP image (hero is text).
- [x] Empty email/Instagram hidden; empty map iframe omitted and replaced by directions card. Footer has clearance for fixed contact controls.
- [x] Hanger SVG logo/divider and SVG/PNG favicons present; social placeholder is 1200×630.
- [x] Static build contains only **827 bytes of application JS per homepage**, inlined by Astro, well below 30 KB (JSON-LD excluded).

## Local Lighthouse mobile measurements

Latest runs against the production build, headless Microsoft Edge, default mobile simulation:

| Route | Performance | Accessibility | Best Practices | SEO | CLS | LCP |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 100 | 100 | 100 | 100 | 0.0046 | 1.52 s |
| `/en/` | 100 | 100 | 100 | 100 | 0.0002 | 1.43 s |

Reports are in `qa-output/lighthouse-ar.json` and `qa-output/lighthouse-en.json`; browser results in `qa-output/browser-results.json`. These are local lab measurements. Recheck on the real domain after replacing placeholders. Native-speaker proofreading, real-world phone/map availability, and business facts still require owner verification.
