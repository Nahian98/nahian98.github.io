# Android Engineer — Portfolio

A premium, fully static personal portfolio for a senior Android Engineer. Built
with Next.js (static export), TypeScript, Tailwind CSS and Framer Motion, and
designed to deploy to **GitHub Pages with zero manual configuration**.

Dark-mode-first, calm and minimal, with subtle motion — inspired by the design
language of Linear, Stripe, Vercel, Raycast and the Android Developers site.

---

## Tech stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 14 (App Router, `output: export`) |
| Language       | TypeScript (strict)                      |
| Styling        | Tailwind CSS 3.4 (semantic CSS tokens)   |
| Animation      | Framer Motion 11                         |
| Icons          | lucide-react                             |
| Theming        | next-themes (dark default, light toggle) |
| Hosting        | GitHub Pages via GitHub Actions          |

No backend, no server rendering — everything is static HTML/CSS/JS in `out/`.

---

## Quick start

```bash
npm install          # install dependencies
npm run dev          # local dev server at http://localhost:3000
npm run build        # static export to ./out
npm run serve        # preview the exported ./out locally
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
npm run gen:assets   # regenerate favicons + OG image from the SVG template
```

> Node 18.17+ is required (22 recommended — see `.nvmrc`).

---

## Make it yours (the only files you need to touch)

All personal content is centralized in **`src/constants/`** — you won't need to
edit components:

| File                       | What to change                                          |
| -------------------------- | ------------------------------------------------------- |
| `src/constants/site.ts`    | Name, role, email, GitHub/LinkedIn links, SEO keywords  |
| `src/constants/projects.ts`| Project case studies, tags, links                       |
| `src/constants/skills.ts`  | Skill categories                                        |
| `src/constants/techstack.ts`| Tech chips                                             |
| `src/constants/experience.ts`| Work history, pinned repos, open-source stats         |

Search the constants for `TODO` and `your-username` to find every placeholder.

### Images & assets (in `public/`)

Replace these placeholders with real assets:

- `public/images/profile.jpg` — your headshot (the About section shows a clearly
  labeled placeholder until you add one and wire it in `src/sections/About.tsx`).
- Project screenshots — each project card describes exactly what image it needs.
- `public/resume.pdf` — currently a generated placeholder PDF; drop your real one.
- Brand assets (`favicon*.png`, `og-image.png`, `apple-touch-icon.png`,
  `icon-*.png`) are generated from an SVG template. Edit the identity strings in
  `scripts/generate-assets.mjs` and run `npm run gen:assets` to regenerate.

---

## Deployment to GitHub Pages

Deployment is automated by `.github/workflows/deploy.yml`.

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Push to `main`. The workflow builds and deploys automatically.

### Why no `basePath` editing is needed

A GitHub Pages **project site** is served from `https://<user>.github.io/<repo>`,
so all asset/link URLs must be prefixed with `/<repo>`. A **user/org site**
(`<user>.github.io`) is served from the root with no prefix.

The workflow uses `actions/configure-pages` to detect the correct values and
injects them at build time:

- `NEXT_PUBLIC_BASE_PATH` → `next.config.mjs` (`basePath` / `assetPrefix`)
- `NEXT_PUBLIC_SITE_URL` → absolute URLs for canonical, OG and Twitter metadata

So the same code deploys correctly to either target with no changes.

> **Local builds** default to no basePath (root). To test a project-path build
> locally: `NEXT_PUBLIC_BASE_PATH=/your-repo npm run build`.

---

## Architecture

```
src/
├─ app/                 # App Router: layout, page, 404, robots/sitemap/manifest, globals.css
├─ components/
│  ├─ ui/               # Primitives: Button, Card, Chip, Container, Section, SectionHeading
│  ├─ layout/           # Navbar, Footer, drawer, theme toggle, scroll progress, cursor, providers
│  ├─ common/           # Background, Reveal wrapper, image placeholder, JSON-LD
│  └─ project/          # ProjectCard (expandable case study)
├─ sections/            # Hero, About, Skills, TechStack, Projects, Experience, OpenSource, Contact
├─ hooks/               # scroll-spy, scrolled, media query, reduced-motion, clipboard, mounted
├─ constants/           # All personal data (edit these)
├─ animations/          # Framer Motion variant library
├─ types/               # Shared TypeScript types
└─ lib/                 # cn() + withBasePath() helpers
```

### Key decisions

- **Semantic color tokens as RGB channels** (`--background: 9 9 11`) referenced
  via `rgb(var(--token) / <alpha-value>)`. This is what lets a single token set
  drive both dark/light themes *and* Tailwind opacity modifiers (`bg-card/60`).
- **Motion lives in one place** (`src/animations/variants.ts`) and every reveal
  goes through `<Reveal>` / hooks that auto-disable under `prefers-reduced-motion`.
- **Scroll-spy via IntersectionObserver**, not per-frame scroll math.
- **The custom cursor never hides the native one** — it's a pure enhancement,
  desktop + fine-pointer only, off under reduced motion.

---

## Accessibility & SEO

- Semantic landmarks, skip-to-content link, focus-visible rings, ARIA on
  interactive controls, keyboard-operable nav/drawer/cards.
- Full reduced-motion support (CSS + per-component).
- OpenGraph + Twitter cards, JSON-LD `Person` structured data, `robots.txt`,
  `sitemap.xml`, web app manifest, and a generated OG image.

---

## License

Personal portfolio template — adapt freely for your own use. Replace all
placeholder content before publishing.
