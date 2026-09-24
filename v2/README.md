# Portfolio v2 — The Journey of Shaurya Johri

Next.js + TypeScript. The portfolio is one living book. See `../MASTER-PLAN.md` for the full plan.

## Setup

```bash
cd v2
npm install
npm run dev
```

## Where things live

| What | File |
|---|---|
| Chapter order, titles, plate captions and images | `src/data/chapters.ts` |
| Profile, skills (Forge), timeline, achievements, links | `src/data/site.ts` |
| Projects and which chapter each belongs to (`chapter: world / tale / unknown`) | `src/data/projects.ts` |
| Book shell: cover, page turns, nav, keyboard/swipe, deep links | `src/components/book/Book.tsx` |
| Chapter content | `src/components/book/Chapters.tsx` |
| Project record dialog | `src/components/book/ProjectDialog.tsx` |

## Adding the illustrations (final stage)

Drop an image in `public/plates/` and set `plate.image` for that chapter in `src/data/chapters.ts`:

```ts
plate: { caption: '…', image: '/plates/forge.webp' },
```

Until then each plate shows its numeral over a tinted sky.

## Behaviour

- The cover auto-opens after ~2.4s. Return visits in the same session and deep links (`/#creations`) land on an open book.
- Arrow keys and swipes turn pages. **Contents** in the top bar is the plain navigation.
- Desktop shows a two-page spread; under 880px it becomes a single page.
