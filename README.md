# Norwell Brasil — Multilingual Seafood Website

A responsive React/TypeScript website presenting Norwell's seafood portfolio and its Brazilian representative, BridgePoint. Visitors explore products in Portuguese, English, Spanish or Norwegian, then send a structured quote or market-entry inquiry through WhatsApp.

The engineering focus is a fast static deployment with localized discovery metadata, responsive media and an accessible contact flow. There is no application backend or simulated form-submission success.

## Explore the experience

1. Browse the homepage, company information and product catalogue.
2. Switch language while staying on the current page.
3. Choose a seafood quote or Brazilian-market inquiry; complete the validated form and continue to WhatsApp.

## Run and verify

```bash
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

The development URL is normally `http://localhost:5173`. `build` verifies source assets, checks TypeScript, builds with Vite, generates localized route HTML and validates the resulting output.

```bash
npx playwright install chromium
npm run test:e2e
npm run test:a11y
npm run verify:infra
```

The [CI workflow](.github/workflows/ci.yml) defines build, Chromium end-to-end/accessibility and Docker checks. These cover documented viewport/language/navigation cases and automated Axe rules; they do not replace manual accessibility review or prove every browser/device combination. No fresh test result is asserted by this documentation revision.

## Architecture and content map

| Location | Responsibility |
| --- | --- |
| [src/data](src/data) | Company identity, products, representative, navigation and editorial content. |
| [src/i18n](src/i18n) | Translation catalogues and language loading. |
| [src/components](src/components) | Page sections, shared UI, logo and responsive image behavior. |
| [scripts/generate-route-html.mjs](scripts/generate-route-html.mjs) | Static metadata for localized routes and compatibility gateways. |
| [scripts/verify-build.mjs](scripts/verify-build.mjs) | Generated output checks. |
| [deploy](deploy) | Nginx hosting examples. |

Portuguese phrases are source keys; add matching English, Spanish and Norwegian entries when changing text. Company/contact/canonical settings belong in `src/data/company.ts`; blank optional business fields are hidden instead of being invented. The contact form validates data, composes a message and opens WhatsApp; it does not store submissions in a CRM.

## Localization, rendering and media trade-offs

| Choice | Benefit | Cost or boundary |
| --- | --- | --- |
| React/Vite with generated route HTML | Keeps hosting static while giving crawlers and social previews route-specific metadata. | Build-time generation and client navigation must agree; this is not an SSR application server. |
| Stable `/pt`, `/en`, `/es`, `/no` URLs | Makes language variants shareable and indexable. | Canonical, `hreflang`, sitemap and compatibility redirects need synchronized maintenance. |
| Lazy-loaded translation catalogues | Loads only the active non-Portuguese catalogue. | Missing/stale translation keys require review whenever source copy changes. |
| WhatsApp handoff without a backend | Avoids storing inquiry data and keeps the contact path direct. | The site cannot confirm message delivery or provide a persisted lead-management workflow. |
| Generated AVIF/WebP variants | Gives browsers appropriately sized media. | Source assets and generated variants must be maintained together. |
| Framer Motion plus deferred GSAP | Supports editorial movement without loading all effects immediately. | Motion, payload and accessibility need measurement; reduced-motion/data-saving preferences must remain respected. |

The URL without a language prefix is a preference-detecting gateway. Localized routes keep a stable prefix; changing language preserves the page. Provided Nginx rules redirect old `/norwell` and `/a-norwell` addresses to `/sobre` while preserving language and query parameters.

## Updating assets

```bash
python scripts/generate-responsive-images.py
python scripts/generate-social-cards.py
```

Use Pillow and the approved source assets for these authoring scripts. Social cards use deterministic typography and repository logos; [scripts/assets/README.md](scripts/assets/README.md) documents their source material. After changing the final domain, update `siteUrl`, the root HTML metadata and robots/sitemap settings, regenerate output and review it.

## Hosting

The build output is `dist/`. Use [the Nginx example](deploy/nginx.conf.example) for static hosting or [the TLS example](deploy/nginx.tls.conf.example) when Nginx terminates HTTPS. Validate configuration before reloading the server.

```bash
docker build -t salmon-website .
docker run -d -p 8080:8080 --restart unless-stopped salmon-website
```

The container runs Nginx as an unprivileged user on port 8080. When a reverse proxy/CDN terminates HTTPS, keep the internal hop private and apply HSTS at that public HTTPS boundary. Enable HSTS only after HTTPS is stable; review `includeSubDomains` against the real domain layout. The examples intentionally omit preload enrollment.

## Brand and media provenance

- Catalogue photos were supplied by the company and converted to WebP. Norwell logos and the seafood-origin mark come from [Norwell's official material](https://www.norwell.no); attribution is retained, and use of the name, brand, photos and licensed origin mark requires the relevant rights holder's authorization.
- The Lofoten hero photograph is by Tomáš Malík, sourced from [Pexels](https://www.pexels.com/photo/aerial-view-of-lofoten-islands-norway-27245718/). Responsive/mobile crops derive from that source.
- Norwell's specified Sharp Sans No1 is a commercial typeface. The current site uses locally hosted Montserrat with its [OFL license](public/fonts/licenses); do not switch fonts without the necessary web license.
- Preserve the brand rules: color logos on white, negative logos on the approved green surface, appropriate clear space and no unauthorized photographic backgrounds behind the mark.

Outstanding business inputs include the final legal identity/address/domain and review of policy/terms content. See [the detailed website analysis](docs/analise-website-bridge-point.md) for product context.
