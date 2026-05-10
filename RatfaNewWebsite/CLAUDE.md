# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the frontend for **Steelgate** — a network security hardware product. The repo is a React + Vite SPA deployed to Vercel. All source code lives under `client/`. Run all commands from there.

## Commands

```bash
cd client

npm run dev       # start dev server with HMR
npm run build     # production build
npm run preview   # preview production build locally
npm run lint      # ESLint
```

There are no tests.

## Architecture

**Routing** (`App.jsx`) — `Header` renders outside `<Routes>` so it persists on every page. Routes:
- `/` → `LandingPage`
- `/products` → `ProductPage` — contains `PreOrderPanel` (Stripe checkout) and `ProductShowcase`
- `/preorder/success` → `PreOrderSuccess`
- `/story`, `/faq`, `/blog`, `/blog/:slug`, `/terms`, `/privacy` — informational pages

**Vercel serverless functions** live in `client/api/` (not `server/`). Each file is a Next.js-style handler:
- `create-preorder-session.js` — creates a Stripe Checkout session for the €10 deposit
- `preorder-count.js` — reads confirmed pre-order count from Supabase (adds a fake base of 13)
- `preorder-webhook.js` — Stripe webhook that writes confirmed pre-orders to Supabase
- `waitlist.js` — inserts emails into a Supabase `waitlist` table
- `webhook.js` — generic Stripe webhook handler

**State** — `CartContext` (`src/context/CartContext.jsx`) is the only global state. It tracks cart items and drawer open/close state. Consumed via `useCart()`.

**Data** — `src/data/blogPosts.js` is the only data layer; blog posts are static JS objects with a `content` array of typed nodes (`p`, `h2`, `ol`, etc.) rendered by `BlogPostPage`.

**Utilities in `src/lib/`:**
- `api.js` — thin wrappers over `fetch` calls to the `/api/*` serverless functions
- `supabase.js` — exports a single `supabase` client (uses `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`)
- `analytics.js` — PostHog (EU endpoint) with `capture_pageview: false`; page views are tracked manually via `PageTracker` in `App.jsx`
- `useSeo.js` — hook that imperatively sets `<title>`, meta description, OG tags, and canonical link

## Styling

Two systems in use — don't mix them for a given component:
- **Tailwind CSS v3** for all components except `Button`
- **styled-components** for `Button.jsx` only (animated hover/active states)

CSS custom properties in `index.css` (`:root`) are the single source of truth for colors and fonts — always use `var(--...)` tokens, never raw color values.

**Fonts** (loaded from Google Fonts in `index.css`):
- `--font-header`: Monomaniac One — `body` default
- `--font-body`: Cairo — body copy
- `--font-alt`: Inter — headings / hero

## Environment variables

Frontend (prefixed `VITE_`, available in browser):
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_URL` — used by serverless functions for Stripe redirect URLs

Serverless only (no `VITE_` prefix in runtime, but reuse the same URL value):
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY` — service role used only in API handlers, never exposed to the browser

## Misc

**React Compiler** is enabled via `@rolldown/plugin-babel` + `babel-plugin-react-compiler` in `vite.config.js`. Avoid manual `useMemo`/`useCallback` unless profiling shows a real need.

**Vercel deployment** — `client/vercel.json` rewrites all paths to `/index.html` for client-side routing.
