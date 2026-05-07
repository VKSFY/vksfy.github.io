# oscar.dev

Personal developer portfolio. Next.js 14 (App Router) + Tailwind CSS + Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (page + scroll animations)
- d3-force (custom canvas force graph in the Stack section)
- Inter + JetBrains Mono via `next/font`

## Sections

1. **Hero** — typewriter cycling phrases, interactive amber particle network on canvas
2. **About** — bio + git-log styled vertical timeline
3. **Projects** — feature cards for venvsnap & multi-source-reconciliation-engine, plus an "also built" pill row
4. **Stack** — interactive draggable force graph (Oscar at the center, languages on the inner ring, tools on the outer)
5. **Philosophy** — pulled-quote card + 3 stat callouts
6. **Contact** — terminal-style form posting to Formspree, plus email + GitHub links

## Configure Formspree

Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

## Deploy

Push to GitHub and connect to Vercel — zero config.
