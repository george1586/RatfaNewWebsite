# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the frontend for **Steelgate** — a network security hardware product. The repo is a React + Vite SPA deployed to Vercel. There is no active backend; the `server/` directory is empty.

All source code lives under `client/`. Run all commands from there.

## Commands

```bash
cd client

npm run dev       # start dev server with HMR
npm run build     # production build
npm run preview   # preview production build locally
npm run lint      # ESLint
```

## Architecture

**Routing** (`App.jsx`) — `Header` is rendered outside `<Routes>` so it persists on every page. Two routes:
- `/` → `LandingPage` — stacks Hero, Video, ProductInfo, FeatureShowcase, Features, FAQ, Footer
- `/products` → `ProductPage` — renders `ProductShowcase` (quantity selector + add-on features, price calculation)

**Directory layout:**
- `src/pages/` — page-level compositions
- `src/components/` — section-level UI (one component per landing-page section)
- `src/elements/` — primitive UI (`Button` — uses styled-components, not Tailwind)
- `src/assets/images/` — static images imported directly into components

**Styling** — two systems in use:
- **Tailwind CSS v3** for most components
- **styled-components** for `Button.jsx` only (animated hover/active states that are impractical in Tailwind)
- CSS custom properties defined in `index.css` (`:root`) are the single source of truth for colors and fonts; always use `var(--...)` tokens rather than raw color values

**Fonts** (loaded from Google Fonts in `index.css`):
- `--font-header`: Monomaniac One — `body` default
- `--font-body`: Cairo — body copy
- `--font-alt`: Inter — headings / hero

**React Compiler** is enabled via `@rolldown/plugin-babel` + `babel-plugin-react-compiler` in `vite.config.js`. Avoid manual `useMemo`/`useCallback` unless profiling shows a real need.

**Vercel deployment** — `client/vercel.json` rewrites all paths to `/index.html` for client-side routing.
