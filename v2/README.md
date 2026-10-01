# Portfolio v2 — The Balcony

Next.js + TypeScript. You open your eyes on a balcony, look out at a kingdom of projects, and read the book on the table. See `../MASTER-PLAN.md` for the full plan.

## Setup

```bash
cd v2
npm install
npm run dev
```

## How it works

The page is always in one of four **stages**, set as `data-stage` on the root:

| Stage | What you see |
|---|---|
| `intro` | Eyelids open on the view (first visit per session only, ~2.3s) |
| `view` | Looking out: AURA in the sky, the kingdom, the dragon, the book on the table |
| `book` | Looking down: the book fills the screen and can be read |
| `universe` | Inside a project's world |

The **camera is CSS**: each scene layer and the book move by their own amounts when `data-stage` changes. No animation library.

## Where things live

| What | File |
|---|---|
| Stages, intro timing, chapter navigation, keyboard, deep links | `src/components/Experience.tsx` (+ `.module.css` for the book's camera and eyelids) |
| The balcony scene layers + camera moves | `src/components/scene/Scene.tsx` + `Scene.module.css` |
| Where each project sits in the view: click area, camera dive target, placeholder building shape | `src/data/view.ts` |
| Top bar (Look up / Read, Contents, Resume, Contact) | `src/components/Hud.tsx` |
| The book: opener page, chapter page, cover, page turns, pager | `src/components/book/Book.tsx` |
| Chapter content | `src/components/book/Chapters.tsx` |
| Project record (dialog + inside universes) | `src/components/book/ProjectDialog.tsx` |
| A project's universe (placeholder) | `src/components/universe/Universe.tsx` |
| Chapter order, titles, epigraphs | `src/data/chapters.ts` |
| Profile, skills, timeline, achievements, links | `src/data/site.ts` |
| Projects and where each belongs (`chapter: world / tale / unknown`) | `src/data/projects.ts` |

## Controls

- **Read / Look up** in the top bar, or **↓ / ↑** (↑ only at the top of a page).
- **← →** or swipe to turn pages. **Contents** jumps to any chapter.
- In the view, **hover or Tab** to any place in the kingdom; click to enter it (planned buildings open The Unknown).
- **Enter its world** in The Creations or any project record; **Esc** or **Return to the balcony** comes back.
- Deep links (`/#creations`) and return visits in the same session skip the intro.

## Art (final stage)

Everything visual is placeholder CSS until then. The art plugs into:
the scene layers in `Scene.module.css`, the dragon in `scene/Dragon.tsx`, chapter sketches via `sketch` in `chapters.ts`, and universe backdrops in `universe/Universe.module.css`.
