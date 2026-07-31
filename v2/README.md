# Portfolio v2

Next.js + TypeScript rewrite. See `../MASTER-PLAN.md` for the full plan.

## Setup

```bash
cd v2
npm install
npm run dev
```

Open http://localhost:3000

> Install must be run on your own machine — Next.js ships platform-specific
> native binaries (SWC), so a `node_modules` built elsewhere will not run here.

## What's built (Phase 1, partial)

| Area | Status |
|---|---|
| Next.js / TS scaffold | ✅ |
| Design tokens (`src/app/globals.css`) | ✅ |
| Project + site data, typed (`src/data/`) | ✅ |
| Automatic katana prologue | ✅ |
| Rest scene | ⏳ placeholder — blocked on Q1/Q2 |
| Hero · About · Projects · Contact | ⏳ not started |

## The prologue

`src/components/prologue/`

- `script.ts` — every beat, timing and stage cue in one file. **Tune pacing here.**
- `Prologue.tsx` — the rAF sequencer.
- `OniKatana.tsx` — the blade. Ignition driven by the `--ignite` CSS var.
- `Petals.tsx` — canvas sakura.

Runs automatically, ~26s. Behaviour:

- **Skip** button, plus <kbd>Esc</kbd> / <kbd>Enter</kbd> / <kbd>Space</kbd>.
- Plays **once per browser session** (`sessionStorage`), so refreshing while
  working doesn't force a re-watch.
- Skipped entirely under `prefers-reduced-motion`.
- Silent — see the audio note in the master plan (§4). Browsers block autoplay
  audio, so sound needs either a mute-by-default toggle or first-interaction unlock.

### Replaying it while developing

Because it plays once per session, a plain refresh will **skip** it. Use:

| URL | Behaviour |
|---|---|
| `localhost:3000/?intro=1` | always replay, ignores the session flag |
| `localhost:3000/?intro=0` | always skip, jump straight to the scene |
| `localhost:3000` | normal — plays once per tab session |

Or clear the flag by hand:

```js
sessionStorage.removeItem('sj:prologue-seen'); location.reload();
```
