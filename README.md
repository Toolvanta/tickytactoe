# tickytoe — Modern Next.js Tic Tac Toe Platform

A production-ready, feature-rich, accessible, and search-engine-optimized online Tic Tac Toe platform built with **Next.js (App Router)**, **React 19**, **Tailwind CSS**, and **TypeScript**.

## Architecture

```text
├── public/                          # Favicon suite, Web App Manifest, PWA icons
├── scripts/
│   └── build-favicons.mjs           # Automated headless Chrome icon builder
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout, Google Fonts, WebSite & Org Schema, Analytics
│   │   ├── page.tsx                 # Root homepage hub (3x3 default, WebApplication & FAQ Schema)
│   │   ├── robots.ts                # RFC-compliant dynamic robots.txt generator
│   │   ├── sitemap.ts               # Dynamic XML sitemap generator
│   │   ├── not-found.tsx            # Accessible custom 404 handler
│   │   ├── play/
│   │   │   └── [slug]/              # Static Site Generation (SSG) for individual game modes
│   │   │       └── page.tsx         # Dynamic metadata, Breadcrumbs, and tactical guides
│   │   └── privacy/                 # Privacy Policy & compliance disclosures
│   │       └── page.tsx
│   ├── components/                  # Glassmorphic UI, Sound, GameBoard, Modals
│   │   ├── Cell.tsx                 # Accessible ARIA gridcell with keyboard navigation
│   │   ├── Footer.tsx
│   │   ├── GameBoard.tsx            # Multi-grid ARIA matrix (3x3, 4x4, 5x5)
│   │   ├── GameClient.tsx           # Hydration-safe client workbench & mode ribbon
│   │   ├── GameControls.tsx         # Touch-friendly mode, size, and AI difficulty controls
│   │   ├── Header.tsx               # Sticky glassmorphic navbar with theme & sound toggles
│   │   ├── NotFound.tsx
│   │   ├── PrivacyClient.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── RulesSection.tsx         # Interactive strategy guide & accessible FAQ accordion
│   │   ├── ScoreBoard.tsx           # Live region ARIA announcer, scores & blitz timer
│   │   ├── SettingsModal.tsx        # Accessible dialog for themes, symbols, and audio
│   │   └── StatsModal.tsx           # Accessible dialog for win tallies and streak history
│   ├── core/                        # Zero-dependency TypeScript game & AI engine
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── board.ts                 # Dynamic combo generator (3x3, 4x4, 5x5)
│   │   ├── ai.ts                    # Minimax with Alpha-Beta pruning (Easy, Medium, Hard, Master)
│   │   └── engine.ts                # State machine with undo/redo & history
│   ├── data/
│   │   └── modes.ts                 # Centralized game modes & SEO registry
│   ├── lib/
│   │   └── seo.ts                   # Centralized metadata & Schema.org JSON-LD builders
│   ├── hooks/                       # useAudio, useTheme, useConfetti
│   ├── styles/                      # Tailwind directives and custom utility styles
│   │   └── globals.css
│   └── types.ts                     # Web settings and symbol display types
├── tests/
│   ├── core.test.ts                 # Vitest unit tests (AI engine verification)
│   └── seo.test.ts                  # Vitest unit tests (SEO registry & schema validation)
├── next.config.mjs                  # Next.js configuration & security headers
├── tailwind.config.js               # Design tokens, neon glow shadows, animations
├── tsconfig.json                    # Path aliases (@/*) and TypeScript configuration
├── netlify.toml                     # Netlify Next.js deployment configuration
└── package.json
```

## Features

- **5 Dedicated Game Mode Routes**:
  - `/` & `/play/3x3`: Classic 3x3 (3-in-a-row)
  - `/play/4x4`: Tactical 4x4 (4-in-a-row)
  - `/play/5x5`: Epic 5x5 (4-in-a-row Gomoku-style)
  - `/play/2-player`: Local 2-Player pass-and-play
  - `/play/ai`: Vs Unbeatable Minimax AI
- **Unbeatable Minimax AI**: Multi-tiered AI with mathematically proven Minimax and Alpha-Beta pruning across 4 difficulty tiers.
- **Synthesized Audio Engine**: Zero-asset procedural retro sound effects generated on-the-fly with the Web Audio API.
- **Celebratory Confetti**: Lightweight canvas particle explosion upon victory.
- **Turn Speed Timer**: Optional blitz timer (5s, 10s, 15s) with tick countdown sounds.
- **Comprehensive Statistics**: Total matches, win rate, win streaks, and match history stored locally.
- **Theme & Symbol Customization**: Dark/Light mode and Classic, Cyber Glow, or Emoji (⚔️ / 🛡️) symbols.
- **Full WCAG 2.2 AA Accessibility**: ARIA grid matrix, live-region turn announcements, keyboard arrow navigation, and accessible modal dialogs.
- **Offline & Private**: Zero tracking, zero telemetry, and 100% client-side privacy.

## Google Search SEO Architecture

1. **Dynamic Scalable Metadata**: Powered by a centralized registry ([src/data/modes.ts](file:///d:/Side%20Projects/tickytactoe/src/data/modes.ts)) generating unique titles, descriptions, canonical URLs, and OpenGraph/Twitter cards.
2. **Schema.org Structured Data**: Valid JSON-LD implementing `WebSite`, `Organization`, `WebApplication`, `BreadcrumbList`, and `FAQPage`.
3. **Dynamic XML Sitemap & Robots.txt**: Auto-generated via App Router route handlers ([src/app/sitemap.ts](file:///d:/Side%20Projects/tickytactoe/src/app/sitemap.ts) & [src/app/robots.ts](file:///d:/Side%20Projects/tickytactoe/src/app/robots.ts)).
4. **Zero-FOUC `<noscript>` Block**: Pre-rendered semantic HTML fallback for search spiders.
5. **Security Headers**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy configured in [next.config.mjs](file:///d:/Side%20Projects/tickytactoe/next.config.mjs) and [netlify.toml](file:///d:/Side%20Projects/tickytactoe/netlify.toml).

## Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run unit tests
npm test

# Build production bundle
npm run build

# Start production server
npm start

# Build favicons from favicon.svg
npm run build:favicons
```
