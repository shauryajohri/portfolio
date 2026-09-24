# Shaurya Johri — Portfolio Master Plan

**Status:** Phase 1 built in `v2/` (readable book, no art). Images deferred to the final stage.
**Last updated:** 25 September 2026

---

## 1. Core vision

The portfolio is **one living book**: *The Journey of Shaurya Johri.* The visitor reads the story of the developer behind the work. The book is the navigation. Shaurya and his dragon companion travel through its pages.

> "A beautifully illustrated fantasy novel that happens to contain a modern software engineer's portfolio."

**Fantasy is the presentation layer. Engineering is the substance.**

After 3–5 minutes the visitor knows: who Shaurya is · what he builds · his stack · his strongest projects · his experience · what he's building now · how to contact him.

### It is NOT
A game UI · a card-grid portfolio · an open world · an MMORPG · a generic cyberpunk site · a resume with fantasy graphics pasted on.

---

## 2. Design language

- Medieval fantasy book · cinematic fantasy environments · subtle futuristic tech
- Deep purple / midnight blue atmosphere, warm parchment and gold accents
- Elegant modern typography, premium cinematic lighting, restrained magical particles, restrained UI
- Fantasy elements are **metaphors for real engineering work**

Feels: cinematic · mysterious · warm · premium · intelligent · minimal · memorable.

### Principles
1. **Recruiter never struggles** to find name, role, projects, skills, experience, resume, GitHub, LinkedIn, contact.
2. **No gates.** Nothing blocks content behind an interaction or an animation.
3. **All content is real HTML text.** 3D/illustration sits behind it as atmosphere, never as the carrier of information.
4. **Short transitions.** Nobody watches a long animation twice.
5. **Every interaction is purposeful** — open, turn, inspect, contact. No mini-games, no random particle toys, no free-roam.
6. The visitor always knows where they are and how to continue.

---

## 3. Locked decisions

| # | Decision | Rationale |
|---|---|---|
| D1 | **Rewrite on Next.js + React + TypeScript + R3F.** | Book-open 3D moment, page transitions and chapter state aren't maintainable in the vanilla site. |
| D2 | **Book concept replaces the old plan entirely.** Katana, sakura, Japanese greeting, rest scene, Engineering District and Experience Mode are dropped. | Old concept rejected. |
| D3 | **Only one real 3D moment:** the book opening and the pages rising into a world. | Scope. It's the signature — spend the budget there. |
| D4 | **Chapters are illustrated 2.5D parallax scenes**, not 3D environments. | Fits "illustrated novel" better; achievable solo; avoids half-finished 3D. |
| D5 | **Character + dragon are illustrated poses per chapter**, not rigged animated models. Light motion (breathing, wing shift, parallax) only. | Rigged 3D characters are the highest-risk asset; poses keep quality high. |
| D6 | **The cover never blocks.** It auto-opens after ~2s, and the cover itself already shows name, role, Resume, GitHub, Contact. "Skip to contents" always available. | Principle 2. |
| D7 | **Dragon = black fantasy dragon companion** (Kaisel-inspired). Expressive, intelligent, friendly; never dominates the frame. | Fits medieval fantasy natively. |
| D8 | **Mobile = single page, swipe to turn.** Desktop = open two-page spread. | An open book is landscape; phones are portrait. Designed from day one, not retrofitted. |

---

## 4. The opening

```
Closed ancient book on a dark surface
  Cover: THE JOURNEY OF / SHAURYA JOHRI
  "A developer's tale of ideas, systems and worlds yet to be built."
  Purple glow leaking between the pages
  [ Open the book ]   ·   small: Resume · GitHub · Contact
        ↓  (click, or auto after ~2s)
Book opens → camera orbits → book tilts into 3D perspective
        ↓
Pages become a miniature world. Shaurya and the dragon emerge and stand on the book.
        ↓
Camera pulls back. The book becomes the world.   ← SIGNATURE MOMENT
        ↓
Chapter I
```

Plays once per session. Return visits / reduced-motion users land directly on an opened book.

---

## 5. Chapters

Target ~3–5 min total. Six chapters (Prologue and The Beginning merged).

| # | Chapter | Content | Scene |
|---|---|---|---|
| I | **Prologue — The Invitation** | One-line philosophy ("Every great story begins with an idea."), who Shaurya is, education, motivation, what builder he wants to become. Readable in <30s. | Peaceful academy / elevated landscape; Shaurya and the dragon overlook a distant futuristic city. |
| II | **The Forge** | Skills in 4–5 categories. Concrete tools only. | Medieval forge; technologies appear as tools/artifacts, not a logo wall. |
| III | **The Creations** | Strongest projects (see §6). Most important chapter. | Each flagship is its own world. |
| IV | **The Trials** | Internship, competitions, certifications, research, milestones. Factual, no hero language. | Mountain path; milestones are landmarks along it. |
| V | **The Unknown** | Currently building · future goals · research. Hints, not riddles. | Enormous gate / locked region. "Some chapters are still being written." |
| VI | **The Next Chapter** | "The story doesn't end here." Email · LinkedIn · GitHub · Resume. "Let's build what's next." | Final page open toward a sunrise. |

### Forge categories (concrete only)
- **Languages** — C++, Python, Java, JavaScript
- **Frontend** — React, Next.js, HTML, CSS
- **Backend / Systems** — Node.js, FastAPI, named databases (fill from `data.js`)
- **AI / ML** — LLMs, RAG, named ML libs (fill from `data.js`)
- **Tools / Cloud** — Git, Docker, named cloud provider

Cut vague entries ("AI", "Cloud", "APIs", "Development tools") — recruiters read them as filler.

---

## 6. The Creations — project mapping

| Project (`data.js`) | Status | Treatment | World |
|---|---|---|---|
| AURA | WIP · Flagship | **Full world** | Wizard-tech tower in cosmic energy — AI, memory, voice, automation |
| SmartConnect | Planned | **Full world** | Futuristic connected city — metaverse / multiplayer |
| Yatra AI | Done | Lesser Tales | Living travel map |
| Tourist Prediction | Done | Lesser Tales | Observatory reading the seasons |
| WasabiKiri | Done | Lesser Tales | Ancient digital archive |
| FinGuard | Done | Lesser Tales | Vault with watchful wards |
| Smart City Digital Twin | Planned | The Unknown (vault) | Kingdom mirrored in glass |
| WasabiKiri 2.0 | Planned | The Unknown (vault) | The archive, being rebuilt |

Set per project via `chapter` in `v2/src/data/projects.ts`.

**Lesser Tales** = one illustrated spread holding the smaller projects, each with a small vignette. Keeps the chapter short.

### Project panel (every project)
Opens as a clean, professional panel — no fantasy language inside:
what it is · problem · what Shaurya built · architecture · technologies · features · challenges · demo · GitHub.

⚠️ SmartConnect and Smart City are **Planned**. Showing a planned project as a full world in "Creations" overclaims — either ship something demoable first or move it to Chapter V (The Unknown).

---

## 7. Navigation

- **Primary:** the book. Page turn / next-chapter control; Shaurya and the dragon shift position, short camera move, next scene appears. **Transition ≤ ~1s.**
- **Chapter indicator:** small, always visible (e.g. ribbon bookmark with I–VI).
- **Secondary / accessibility:** a table-of-contents menu with plain labels (About, Skills, Projects, Experience, Now, Contact) + keyboard arrows + deep links (`/#creations`).
- **Persistent:** Resume and Contact reachable from every page.
- `prefers-reduced-motion`: cross-fades only, no camera moves.

---

## 8. Characters

- **Shaurya** — young modern developer/adventurer. Calm, curious, intelligent, ambitious. Not a superhero.
- **Dragon** — black, expressive, friendly. Reacts subtly on chapter changes. Never steals the frame.

---

## 9. Phased roadmap

### Phase 1 — The readable book *(built — needs real content: education, LinkedIn, resume PDF)*
Next.js scaffold · book layout (spread desktop / single page mobile) · all six chapters as **text + static illustration** · project panels · ToC nav · Resume/Contact. Content pulled from `data.js`.
Must be a complete, excellent portfolio with **zero 3D**. This alone is shippable.

### Phase 2 — Illustration & motion
Final chapter art · character/dragon poses · 2.5D parallax · page-turn transitions.

### Phase 3 — The signature opening
3D book open → tilt → pages become the world → characters emerge → pull back.

---

## 10. Open questions

| # | Question | Blocks |
|---|---|---|
| Q1 | Art source: commission an illustrator, AI-generate and paint over, or hand-build? Consistency of Shaurya and the dragon across 6 scenes is the hard part. | Phase 2 |
| Q2 | Character outfit: modern dev clothes, fantasy traveller, or the black suit? | Phase 2 art |
| Q3 | Audio at all? If yes: muted by default with unmute toggle (browsers block autoplay audio). | Phase 2 |
| Q4 | SmartConnect / Smart City — Creations or The Unknown? (§6 warning) | Phase 1 content |
| Q5 | FinGuard — Lesser Tales or cut? | Phase 1 content |
| Q6 | Does the current vanilla site stay live during the rewrite? | Phase 1 setup |

---

## 11. Technical stack

- **Framework** — Next.js, React, TypeScript
- **Animation** — GSAP (or Framer Motion) for page transitions and parallax
- **3D** — Three.js / React Three Fiber, **opening sequence only**
- **Models** — Blender (book only)

### Repo state
- `v2/` — the book (Next.js). Old katana prologue and rest scene deleted.
- Root `index.html` + `assets/` — the old vanilla site, kept live until v2 ships (Q6).
