# Navidrome Stat — Landing Page

Marketing site for [Navidrome Stat](https://github.com/StepaniaH/navidrome-stat), a self-hosted listening statistics dashboard for Navidrome. Four locales (English / 简体中文 / 繁體中文 / 日本語), statically generated with Astro 5.

**Live:** https://navidrome-stat.pages.dev (其他语言: [/zh/](https://navidrome-stat.pages.dev/zh/) · [/zh-tw/](https://navidrome-stat.pages.dev/zh-tw/) · [/ja/](https://navidrome-stat.pages.dev/ja/))

## Principles

- **Zero third-party requests.** Fonts and icons are all self-hosted. No analytics, no cookies, no external resource loads.
- **Strict CSP.** `script-src 'self'` — no inline scripts; interactions live in a single dependency-free `public/motion.js`. `style-src 'self' 'unsafe-inline'` allows style attributes, matching the main application's policy.
- **No hardcoded copy in components.** All text comes from typed bilingual dictionaries in `src/i18n/ui.ts`. The `zh` dictionary is typed as `typeof en`, so missing translations fail `astro check`.
- **Respects `prefers-reduced-motion`.** All animation degrades via CSS media queries and runtime checks.
- **Verifiable claims only.** Copy mirrors the main repository's README — no marketing fluff.

## Local development

```sh
npm ci
npm run dev       # dev server at localhost:4321
npm run build     # static build to dist/
npm run check     # astro check (type-checks dictionaries + components)
npm run preview   # serve the production build locally
npm run test:e2e  # build + preview + Playwright assertions (all locales)
```

Requires Node 18.17+ (`.node-version` pins 22 for Cloudflare builds). Playwright uses the shared browser cache; run `npx playwright install chromium` once if it is empty.

## Site structure

```
src/
├── i18n/
│   ├── ui.ts          # bilingual dictionaries (en source of truth, zh = typeof en)
│   └── utils.ts       # getT(), localePath(); SITE_VERSION, LINKS constants
├── layouts/Base.astro # head/SEO/JSON-LD/fonts/security-relevant wiring
├── components/
│   ├── nav/           # sticky nav, language dropdown, mobile menu
│   ├── hero/          # animated hero + "listening now" card
│   ├── bento/         # proof strip + feature bento grid
│   ├── themes/        # interactive theme showcase (pure-CSS dashboard mock)
│   ├── review/        # year-in-review strip (count-up numbers)
│   ├── how/ start/    # how-it-works + quickstart tabs w/ copy buttons
│   ├── trust/ faq/    # privacy/limitations cards + FAQ accordion
│   └── footer/
├── pages/             # index.astro (en), zh/, zh-tw/, ja/, 404.astro
├── tests/e2e.mjs      # Playwright assertions, run via npm run test:e2e
└── styles/global.css  # design tokens (@theme), keyframes, utilities

public/
├── motion.js          # sole JS entry: reveal, counters, menus, tabs, theme
│                      #   pills, review modal, synced now-playing, copy
├── _headers           # Cloudflare Pages security headers (CSP etc.)
├── robots.txt         # allows all + sitemap reference
├── og.png             # social preview images, one per locale
├── site.webmanifest   # + icon-192/512.png (maskable)
└── favicon.svg, apple-touch-icon.png
```

### motion.js contract

Components and motion.js communicate exclusively through data attributes: `data-reveal`, `data-count`, `data-lang-btn/menu`, `data-menu-btn/panel`, `data-theme-btn/img`, `data-start-tab/panel`, `data-theme-pill`, `data-theme-scope`, `data-review-open/close`, `data-np-fill`, `data-np-current`, `data-copy`. No component may introduce another JS entry point.

The Noto Sans SC stylesheet (`src/styles/noto-sc.css`) is loaded asynchronously (`media="print"`, flipped by motion.js) to keep render-blocking CSS small; CJK text renders in system fonts until it arrives, then swaps.

The theme showcase renders a pure-CSS simulation of the dashboard (`src/components/themes/Themes.astro` + palettes in `src/data/themes.ts`) instead of screenshots — every one of the ten themes can be previewed live, themed entirely through `--dm-*` custom properties.

Latin fonts (Inter, Space Grotesk, JetBrains Mono) are managed by the Astro Fonts API (`experimental.fonts`, local provider over the Fontsource packages): self-hosted with hashed filenames, preloaded above the fold, with explicit `Noto Sans SC` fallbacks so CJK text still resolves to the async stylesheet.

## Deployment (Cloudflare Pages)

The Cloudflare Pages project `navidrome-stat` is a **direct-upload** project (it cannot be switched to Git integration), so deploys are done with wrangler:

```sh
npm run build
npx wrangler pages deploy dist --project-name=navidrome-stat --branch=main
```

Requires `npx wrangler login` once. Every deploy also gets a unique preview URL; `--branch=main` publishes to production at https://navidrome-stat.pages.dev.

To automate, add a GitHub Action running the two commands above on push to `main`, with `CLOUDFLARE_API_TOKEN` (Pages: Edit permission) stored as a repository secret.

## Asset provenance

- Icon (`favicon.svg`, inline nav/footer logo) comes from the main repository's `assets/` directory ([navidrome-stat/assets](https://github.com/StepaniaH/navidrome-stat/tree/main/assets)).
- `og.png` and `apple-touch-icon.png` are rendered from the project brand assets.
- Fonts: [Fontsource](https://fontsource.org/) self-hosted packages — Inter Variable, Space Grotesk Variable, JetBrains Mono Variable, Noto Sans SC.

## License

MIT — see [main project license](https://github.com/StepaniaH/navidrome-stat/blob/main/LICENSE). This site is an independent project and is not affiliated with the Navidrome project.
