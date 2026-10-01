# Shaurya Johri — Portfolio Master Plan

**Status:** Concept v3 — *The Balcony*. Phases A–B built (1 Oct 2026); Phase C next.
**Last updated:** 1 October 2026

---

## 1. Core vision

The visitor **becomes Shaurya**. They open their eyes on a balcony at dusk, overlooking a kingdom. Everything Shaurya has built is visible from here: **AURA** as a black hole in the sky, the **SmartConnect metaverse** as the kingdom ahead, and the smaller projects as buildings within it. A dragon rests on the railing.

On the table in front of them lies a book — *The Journey of Shaurya Johri*. They look down, it opens, and they read: who he is, what he built, his experience, his achievements. Any project can be **entered**: the camera dives from the balcony into that project's universe, and pulls back out when they return.

> **The view is the map. The book is the substance. The universes are the reward for curiosity.**

After 3–5 minutes the visitor knows: who Shaurya is · what he builds · his stack · his strongest projects · his experience · what he's building now · how to contact him.

### Two audiences, one scene
| Audience | Path |
|---|---|
| Recruiter | Eyes open (~3s) → book → reads, downloads resume, leaves. Never has to touch the view. |
| Curious dev / hiring manager | Looks up, hovers the sky and kingdom, enters AURA's universe, comes back, enters another. |

### It is NOT
A game UI · an open world · explorable 3D levels · a card-grid portfolio · a resume with fantasy graphics pasted on.

---

## 2. Design language

- Medieval fantasy kingdom at dusk · a cosmic black hole overhead · subtle futuristic technology in the kingdom
- Deep purple / midnight atmosphere; warm parchment and gold in the book and lanterns
- Cinematic, calm, premium, mysterious — never childish, never MMORPG
- Fantasy is the presentation; engineering is the substance

### Principles
1. **Recruiter never struggles** to find name, role, projects, skills, experience, resume, GitHub, LinkedIn, contact.
2. **No gates.** The intro plays itself, is skippable, and doesn't replay within a session.
3. **All information is real HTML text** — in the book and in each universe. Art is atmosphere, never the carrier of information.
4. **Short transitions.** Intro ≤ ~4s; look up/down ≤ ~1s; entering a universe ≤ ~1.5s.
5. **Every interaction is purposeful:** read, turn, look up, enter, return, contact.
6. The visitor always knows where they are and how to get back to the book.

---

## 3. Locked decisions

| # | Decision | Rationale |
|---|---|---|
| D1 | **Next.js + React + TypeScript.** Existing `v2/` app is the base. | Already built; book, content and records carry over. |
| D2 | **First-person camera — the visitor is Shaurya.** No full-body character on screen; at most his hands on the book. | Removes the hardest art problem (keeping one character consistent across many images). "Opening eyes" only makes sense in first person. *Reversible — see Q1.* |
| D3 | **Dragon rests on the balcony railing.** One pose, subtle idle motion, reacts when the visitor looks up or enters a universe. | Keeps the signature companion for the cost of one image. *Reversible — see Q2.* |
| D4 | **The scene is layered 2.5D, not a 3D world.** One painting split into depth layers; the "camera" pans/zooms/tilts across them. | Buildable solo, fast on phones, looks painted rather than half-finished 3D. |
| D5 | **One WebGL effect only: the AURA black hole** (shader: lensing + accretion glow). Loaded lazily. | The signature visual. Everything else is images + CSS/GSAP. |
| D6 | **The book is a real web page shown in perspective on the table.** Text stays sharp, selectable, searchable, accessible. | Principle 3. |
| D7 | **Universes are cinematic project pages, not explorable worlds.** Full-screen art + short entry animation + the engineering record over it. | Scope. AURA gets the bespoke treatment; the rest share one template. |
| D8 | **Two ways into a project:** "Enter its world" in the book, or clicking it in the view. | Recruiters use the book; the curious use the sky. |
| D9 | **Mobile = portrait look-up / look-down.** View at the top, table and book below; swipe to turn pages. | Portrait suits looking up and down naturally. |
| D10 | **Images are the last stage.** Everything is built and working with placeholders first. | User decision; protects the Higgsfield budget. |

---

## 4. The flow

```
Black
  ↓  eyelids open — blur → sharp, a breath of wind          (~2.5s, auto, skippable)
THE VIEW
  AURA black hole in the sky · metaverse kingdom ahead · small projects glowing faintly
  dragon on the railing
  ↓  camera tilts down to the table                         (~1s, auto on first visit)
THE BOOK — cover opens
  ↓
Chapters, page turns
  ├── "Look up"  → camera tilts back to the view (explore, hover, click)
  └── "Enter its world" / click in view
         ↓  camera dives from the balcony into the project   (~1.5s)
       THE UNIVERSE — project art + engineering record
         ↓  "Return to the balcony" — camera pulls back out
       back to the same page of the book (or the view, if entered from there)
```

- Plays the intro once per session. Return visits and deep links (`/#creations`, `/aura`) skip straight to the book or universe.
- `prefers-reduced-motion`: no eyelids, no camera moves — cross-fades only.

---

## 5. The view (the balcony scene)

```
┌───────────────────────────────────────────────┐
│                 ◉  AURA                        │  sky — black hole, accretion glow (WebGL)
│        stars · faint cosmic web                │
├───────────────────────────────────────────────┤
│   ⌂ Yatra   ⌂ WasabiKiri    ▲ SmartConnect     │  kingdom — the metaverse city ahead,
│      ⌂ FinGuard  ⌂ Tourist Prediction          │  small projects as distinct buildings
├───────────────────────────────────────────────┤
│ railing ── 🐉 dragon                            │  balcony
│        [ table · book · lantern · cup ]        │  foreground
└───────────────────────────────────────────────┘
```

- **Layers (back → front):** sky · AURA · far kingdom · near kingdom · balcony/railing · dragon · table + book.
- **Hotspots:** AURA, SmartConnect, and each small-project building. Hover = soft glow + name label; click = enter.
- Planned projects (Smart City, WasabiKiri 2.0) appear as **unlit / under-construction** silhouettes on the horizon — honest about status, and a hook for The Unknown.
- Idle life: drifting clouds, window lights flicker on, dragon breathes, lantern flame.

---

## 6. The book

Same chapters and content as the current `v2/` build. The book now sits on the table instead of filling the screen.

| # | Chapter | Content |
|---|---|---|
| I | **Prologue — The Invitation** | Philosophy line, who Shaurya is, education, motivation, the builder he wants to become. |
| II | **The Forge** | Skills as a book index: tool ····· projects it was used in. |
| III | **The Creations** | AURA and SmartConnect, then Lesser Tales. Each: summary + **Read the record** + **Enter its world**. |
| IV | **The Trials** | Timeline path + landmarks (internship, competitions, certifications, research). Factual. |
| V | **The Unknown** | Currently building · research · future goals · ideas in the vault (planned projects). |
| VI | **The Next Chapter** | Email · LinkedIn · GitHub · Resume. "Let's build what's next." |

- Left page: short text or a small ink sketch (optional, final stage). No per-chapter scene paintings.
- Page-turn: the two-sided sheet already built.
- Persistent controls: **Look up** · **Contents** · **Resume** · **Contact**.

---

## 7. The universes

Each project's universe = full-screen art, a short entry animation, and the engineering record (what it is · problem · what I built · architecture · stack · features · challenges · demo · GitHub) laid over it.

| Project | Entry | Universe | Treatment |
|---|---|---|---|
| **AURA** | Camera dives into the black hole | Inside the event horizon — cosmic UI, planets as models, memory as a starfield | **Bespoke** (built first) |
| **SmartConnect** | Camera glides down into the kingdom | A living campus city, lit windows, travellers | Template + own art |
| Yatra AI | Into its building | A living travel map | Template |
| Tourist Prediction | Into its building | An observatory reading the seasons | Template |
| WasabiKiri | Into its building | An ancient archive | Template |
| FinGuard | Into its building | A vault with watchful wards | Template |
| Smart City, WasabiKiri 2.0 | — | Shown in The Unknown only, not enterable yet | — |

Each universe has its own URL (`/aura`, `/smartconnect`, …) so it can be linked directly and indexed.

---

## 8. Build phases

### Phase A — Scene shell *(built)*
Four stages (`intro · view · book · universe`) on one root attribute; the camera is CSS transitions per layer (no GSAP needed). Eyes-open intro (~2.3s, skippable by any click/key, once per session). Look up / look down (bar button, ↑/↓, or click the book). Book lies on the table in perspective, closed cover opens on first look down. Chapter opener on the left page. Enter its world → camera dives toward the project, book drops away, placeholder universe with the record; Esc/Return comes back to the same page. Phone layout: same scene in portrait, single-page book.

### Phase B — The view *(built)*
Every project in the view is a button (positions in `v2/src/data/view.ts`, right edge kept clear for the dragon): hover/focus shows a label and lights it up while the rest dim; built ones enter their world, planned ones (unlit, scaffolded) open The Unknown. Placeholder district buildings per project (gate, dome, temple, vault, spire). Dragon perks up when you look up and rears with wings raised when you dive. Window lights come on one building at a time after waking, then flicker; clouds drift; a lantern on the table flickers.

### Phase C — Universes *(next)*
Universe template (art slot + record + return) · routes per project · enter/return camera transitions · AURA black hole shader and dive.

### Phase D — Polish
Audio (optional, muted by default) · reduced-motion pass · performance (lazy WebGL, image sizes) · accessibility pass · SEO/meta per universe.

### Phase E — Art *(last)*
Swap placeholders for real images. No code changes needed beyond file paths in data.

### Carried over from the current build
Book component, page turns, chapter content, project records, navigation, keyboard/swipe, deep links, data files.
**Dropped:** the six per-chapter plate scenes and the walking cast (uncommitted Phase 2 work).

---

## 9. Art list (Phase E)

| # | Asset | Notes |
|---|---|---|
| 1 | Balcony view — sky layer | Stars, cosmic web, dusk gradient. AURA itself is the shader. |
| 2 | Balcony view — kingdom layers (far, near) | SmartConnect city + distinct buildings for each small project + unlit planned ones. Transparent. |
| 3 | Balcony — railing, table, book, lantern | Foreground, transparent. |
| 4 | Dragon on the railing | One pose, transparent. |
| 5 | AURA universe | Bespoke. |
| 6–10 | SmartConnect, Yatra, Tourist Prediction, WasabiKiri, FinGuard universes | One each. |

~10 finals, ~30 generations with retries. Order: lock the style with #1–3 first, then the rest reference them.

---

## 10. Open questions

| # | Question | Default until answered |
|---|---|---|
| Q1 | Camera: first-person (visitor is Shaurya) or over-the-shoulder (we see him in the chair)? | First-person (D2) |
| Q2 | Keep the dragon? | Yes, on the railing (D3) |
| Q3 | Audio: none, or ambient wind/city muted by default with an unmute toggle? | None until Phase D |
| Q4 | Art source: Higgsfield generation, illustrator, or mixed? | Higgsfield, final stage |
| Q5 | Does the old vanilla site at the repo root stay live until v2 ships? | Yes |

### Content still missing (blocks launch, not building)
Resume PDF (`v2/public/resume.pdf`) · LinkedIn URL · education · real names/dates for internship and certifications.

---

## 11. Technical stack

- **Framework** — Next.js (App Router), React, TypeScript
- **Motion** — CSS transitions/keyframes for the camera, intro, idle loops and page turns (GSAP only if Phase C needs sequenced timelines)
- **WebGL** — one lazy-loaded shader for the AURA black hole (raw WebGL or a minimal Three.js scene)
- **Images** — layered WebP with transparency

### Repo state
- `v2/` — the Next.js app (branch `book-redesign`). Phase A built on top of the Phase 1 book; Phase 2 plates/walking cast removed.
- Root `index.html` + `assets/` — the old vanilla site.
