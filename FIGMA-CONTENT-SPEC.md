# Portfolio — Content & Layout Spec for the Remaining 9 Sections

Companion to `FIGMA-RESUME-BRIEF.md`. That file says *where* things go and *how* to build them.
This file is *what goes in them* — every string, every layout measurement, every motion timing.

> **⚠︎ = I invented this.** I don't know your actual project details, so anywhere you see ⚠︎ the
> copy is a plausible placeholder written to the right length and tone. Overwrite it with the truth
> before this ships. Everything without a ⚠︎ comes straight from your spec.

Build target: **1440×900** desktop frames. Grid: 12 columns, 80px margins, 24px gutters.

---

## 05 — AURA World · 200vh · page B, y = 1000

The first project world. Longest single-project section on the site — it earns the length because
it's the flagship.

### Background plate

Purple galaxy. Three depth layers, all parallaxing at different rates:

| Layer | Content | Parallax |
|---|---|---|
| Far | Nebula wash `#2E0B5E` → `#0B0630`, star field | 0.15× |
| Mid | Floating stations, silhouetted, `#12122A` | 0.45× |
| Near | Asteroids drifting L→R, rim-lit purple | 0.8× |

The **AURA orb** sits center-right, ~420px diameter, `#7C3AED` core with `#A855F7` corona,
slow Y-axis rotation (24s loop), three satellites on tilted orbits (11s / 17s / 29s — deliberately
non-harmonic so the pattern never visibly repeats).

### Layout — left rail (560px) / right demo (720px), 80px gutter

Left rail is a sticky scroll-through: the right panel pins while the left content scrolls past it.

### Left rail content, in order

**Eyebrow**
`CHAPTER 03 · AURA · AMBIENT INTELLIGENCE`
Mono/Label 12 · ls 3 · `#A855F7`

**Title**
`AURA`
Display/XL 72 · `#FFFFFF`

**Subtitle**
`An ambient assistant that actually remembers you.` ⚠︎
Heading/H3 28 · `#94A3B8`

**Description**
> Most assistants are stateless. You explain your project, they help once, and the next morning
> you start from zero. AURA is a local-first ambient layer that keeps continuous context across
> your files, your terminal and your calendar — so the second conversation starts where the first
> one ended. ⚠︎

Body/Large 18 · `#94A3B8` · lh 165 · max-width 460

**Problem** — section header component, accent `#A855F7`
> Context is the bottleneck, not intelligence. Models got good; the pipe feeding them stayed
> narrow. Every session re-explains the same project from scratch, and anything genuinely
> personal has to leave your machine to be useful. ⚠︎

**Solution**
> A persistent memory substrate running entirely on-device. AURA watches the surfaces you already
> work in, builds a rolling semantic index, and serves the relevant slice of your history to
> whichever model you're talking to — without the raw data ever leaving the laptop. ⚠︎

**Architecture** — diagram block, 460×280, glass card

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  PERCEPTION  │──▶│    MEMORY    │──▶│   PLANNING   │
│ fs · term ·  │   │ vector store │   │ task graph   │
│ cal watchers │   │ + episodic   │   │ + scheduler  │
└──────────────┘   └──────────────┘   └──────────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                   ┌──────────────┐
                   │    ACTION    │
                   │ tools · exec │
                   └──────────────┘
             ── streaming event bus (async) ──
```

**Brain Modules** — 2×2 grid of glass cards, each 220×140

| Module | Line |
|---|---|
| Perception | Filesystem, terminal and calendar watchers feeding a debounced event stream ⚠︎ |
| Memory | Hybrid vector + episodic store with time-decayed relevance scoring ⚠︎ |
| Planning | Decomposes intent into a task graph, schedules against available tools ⚠︎ |
| Action | Sandboxed tool execution with a rollback journal ⚠︎ |

**Tech Stack** — chip row, Chip/Skill component
`Python` `C++` `FastAPI` `SQLite` `FAISS` `Electron` `React` `TypeScript` ⚠︎

**Features** — checklist, 8 items, Body/Base 16 with `#7C3AED` 6px bullet
- Runs fully offline — no telemetry, no cloud round-trip ⚠︎
- Continuous context across sessions and applications ⚠︎
- Sub-200ms retrieval on a 100k-document index ⚠︎
- Pluggable model backend — local GGUF or hosted API ⚠︎
- Timeline scrubber for auditing what AURA remembered and why ⚠︎
- One-key redaction — forget a file, a day, or a whole project ⚠︎
- Cross-platform desktop shell ⚠︎
- Extension API for custom watchers ⚠︎

**Links** — Button/Secondary ×2
`View on GitHub` → ⚠︎ your repo URL
`Read the docs` → ⚠︎ your docs URL

### Right demo panel — 720×480, sticky

Glass card, radius 16, `#12122A` @ 70%, backdrop blur 24. Contains:
- Video/screenshot slot (720×405, 16:9)
- Below it, a 3-tab switcher: `Demo` · `Interface` · `Memory Graph` ⚠︎
- Interactive orb variant: on hover, satellites speed up and the orb emits a particle burst

### Motion spec

```
Pinned 200vh · ScrollTrigger scrub 1
orb.rotation.y      →  0 → 2π            (0–100%, linear, never eases — it's ambient)
satellites          →  independent orbits, decoupled from scroll
nebula.position.x   →  0 → -120px        (0.15× parallax)
stations.position.x →  0 → -360px        (0.45× parallax)
asteroids.position.x→  0 → -640px        (0.8× parallax)
leftRail children   →  y 40 → 0, opacity 0 → 1, stagger 0.08, ease "power2.out"
                       triggered per-block at 75% viewport
demoPanel           →  pinned from 15% to 85%, then releases
orb.scale           →  1 → 0.4 (88–100%) as the Portal chapter takes over
```

---

## 07 — Dragon Flight · 150vh · page B, y = 3200

Storyboard chapter. Four keyframes, no UI at all.

| % | Title | Gradient | Glow | On screen | Camera | Layers |
|---|---|---|---|---|---|---|
| 0% | Exit | `#2E0B5E`→`#6D28D9` | `#A855F7` 0.6 | Camera bursts out of the portal into open sky. Light rebalances from violet to daylight. | High speed forward, motion blur decaying | portal residue ‧ sky ‧ lens flare |
| 30% | Floating Islands | `#1E3A8A`→`#60A5FA` | `#FFFFFF` 0.35 | Rock islands hang in cloud. Waterfalls fall into nothing. Wind streaks the air. | Wide, banking gently left | islands ‧ waterfalls ‧ cloud ‧ wind |
| 60% | The Dragon | `#1E40AF`→`#FB923C` | `#FBBF24` 0.45 | The dragon enters from below frame-right. The avatar is riding it. Scales catch the light. | Camera matches dragon speed, slight lag | dragon ‧ rider ‧ trail particles |
| 100% | Toward the City | `#7C2D12`→`#F97316` | `#FDE68A` 0.5 | Dragon banks toward a blue glass skyline breaking the cloud line on the horizon. | Pull back to wide, city fills lower third | skyline ‧ haze ‧ dragon silhouette |

**Header**
Eyebrow: `CHAPTER 05 · 07 — DRAGON FLIGHT · 150vh · NO UI` (accent `#FB923C`)
Title: `Dragon Flight`
Desc: *The set piece. No text, no cards, no buttons — just scenery moving past at speed. If a visitor screenshots one frame of this site, it should be this one.*

### Motion spec

```
Pinned 150vh · dragon rides a CatmullRomCurve3 flight path, scrubbed by scroll progress
curve.getPointAt(p)    →  dragon.position
curve.getTangentAt(p)  →  dragon.quaternion (lookAt + bank into turns)
camera follows at offset (0, 6, -18) with damped lerp 0.06 so it lags in turns
islands: 3 parallax depths at 0.3× / 0.6× / 1.0×
clouds: instanced billboards, opacity by depth
wind streaks spawn above 45% progress, density ∝ scroll velocity
dragon wing cycle: 1.4s loop, decoupled from scroll — keeps living when the user stops
Fallback: no WebGL or reduced-motion → scrubbed image sequence, 48 frames
```

---

## 08 — Metaverse World · 200vh · page B, y = 4200

Same split structure as AURA, but blue instead of purple, and daylight instead of void.

### Background plate

Huge futuristic city. Blue, glass, vertical. Flying cars on three traffic lanes at different depths,
NPC crowds as low-opacity silhouettes at street level, holographic billboards flickering on a
4s irregular cycle. Sun low and behind the towers so everything is rim-lit.

| Layer | Content | Parallax |
|---|---|---|
| Far | Skyline silhouette `#1E3A8A`, atmospheric haze | 0.2× |
| Mid | Glass towers with lit windows, `#3B82F6` accents | 0.55× |
| Near | Flying cars, holograms, foreground tower edge | 1.0× |

### Left rail content

**Eyebrow** `CHAPTER 06 · METAVERSE · DIGITAL TWIN`
**Title** `Digital Twin` ⚠︎
**Subtitle** `A live, walkable mirror of a real city.` ⚠︎

**Description**
> A browser-native digital twin: real sensor feeds driving a real-time 3D model of an urban block.
> Traffic, air quality and energy load render as spatial layers you can walk through rather than
> read off a dashboard. ⚠︎

**Problem**
> City data exists — it's just trapped in dashboards nobody outside the ops team can read. A chart
> of NO₂ across twelve intersections tells you nothing. Standing at the intersection and seeing it
> tells you everything. ⚠︎

**Solution**
> Stream the sensor network into a WebGL twin. Same data, spatial encoding. Planners walk the model
> and see the problem where it physically is, at the scale it actually happens. ⚠︎

**Architecture** — same diagram treatment as AURA
```
sensors ──▶ ingest (MQTT) ──▶ time-series store ──▶ WS gateway ──▶ R3F scene
                                     │                                  │
                                  replay API ──────────────────────────┘
```

**Research** — 3 stat cards, Stat/Counter component
`12` monitored intersections ⚠︎ · `4.2M` events/day ⚠︎ · `60fps` at 50k instances ⚠︎

**Roadmap** — vertical timeline, 4 nodes with `#3B82F6` connector line
1. `SHIPPED` Live traffic + air quality layers ⚠︎
2. `SHIPPED` Time-scrub replay, 30-day window ⚠︎
3. `IN PROGRESS` Predictive congestion overlay ⚠︎
4. `PLANNED` Multi-district federation ⚠︎

**Tech Stack**
`React` `Next.js` `TypeScript` `React Three Fiber` `Drei` `MQTT` `TimescaleDB` `WebSockets` ⚠︎

**Links** `View on GitHub` · `Live demo` ⚠︎

### Right demo panel
Same 720×480 sticky glass card. Tabs: `Demo` · `Architecture` · `Research` · `Roadmap`

### Motion spec
```
Pinned 200vh · scrub 1
flyingCars    →  3 lanes, looping translate, speeds 0.6 / 1.0 / 1.7 — NOT scroll-driven
holograms     →  opacity flicker, 4s irregular cycle, seeded random per billboard
towers        →  parallax by layer (0.2× / 0.55× / 1.0×)
camera.position.y →  street level → 40m (0–60%), then hold
fog.density   →  0.02 → 0.008 (0–40%) as the camera rises out of the haze
leftRail      →  same staggered fade-up as AURA
```

---

## Bridge Transition · 80vh · page B, y = 5400

Three keyframes. The palette pivot: this is where blue becomes sunset, and sunset becomes the
Engineering District's neon.

| % | Title | Gradient | Glow | On screen | Camera |
|---|---|---|---|---|---|
| 0% | Dragon Leaves | `#1E40AF`→`#F97316` | `#FDE68A` 0.5 | The dragon peels away upward and out of frame. The camera does not follow it. | Holds, then begins to descend |
| 50% | The Bridge | `#7C2D12`→`#FB923C` | `#FDE68A` 0.65 | A massive suspension bridge fills the frame, cables striping the sun. Water far below. | Low and fast along the deck |
| 100% | District Appears | `#431407`→`#7C3AED` | `#A855F7` 0.55 | At the far end: neon, tiled roofs, signage in Japanese. The Engineering District. | Slows, tilts up to reveal |

**Header**
Eyebrow: `CHAPTER 07 · BRIDGE · 80vh · NO UI` (accent `#FB923C`)
Title: `The Bridge`
Desc: *A breath between two cities. The only chapter where the camera travels horizontally instead of falling — it should feel like arriving, not descending.*

### Motion spec
```
Pinned 80vh · scrub 0.6 (tighter than the flight chapters — this is a connector, keep it brisk)
dragon.position    →  arc up and out of frustum (0–25%), ease "power1.in"
camera.position.z  →  0 → -900 along bridge deck (20–90%), ease "none"
camera.rotation.x  →  -0.05 → 0.12 (85–100%) — the reveal tilt
sunPosition        →  drops 8° across the section, warming 5600K → 3200K
cables             →  instanced, strobe past camera — cap at 60 instances for perf
districtNeon.opacity → 0 → 1 (80–100%)
```

---

## 09 — Engineering District · 250vh · page B, y = 6400

The biggest section on the site. A Japanese cyberpunk city where **each building is one project.**

### Layout

A wide isometric city plate, 1440×900 viewport, that the user scrolls *through* horizontally
(scroll-jacked: vertical scroll → horizontal camera pan). Six buildings. Hovering a building lifts
it, brightens its neon and shows a name plate. Clicking expands into the Project Building Template.

Palette: base `#050510`, neon accents per building, wet-street reflections, rain optional
(off by default, toggle in the corner as an easter egg).

### The six buildings

| # | Building | Project | Form | Neon | One-liner |
|---|---|---|---|---|---|
| 1 | 🏯 WasabiKiri Temple | WasabiKiri | Japanese shrine, tiered roof, stone steps | `#F9A8D4` | A desktop app that cuts through clutter ⚠︎ |
| 2 | 📚 JLPT Academy | JLPT Academy | Torii gate approach, library block behind | `#FB923C` | Structured Japanese study, N5→N1 ⚠︎ |
| 3 | 🏙 Smart City Tower | Digital Twin | Tallest tower, holographic city model on top | `#3B82F6` | The live urban mirror from Chapter 06 |
| 4 | 🚄 Tourist AI Station | Tourist AI | Train station, platform clock, route maps | `#60A5FA` | Travel recommendations that know your pace ⚠︎ |
| 5 | 🏦 FinGuard Tower | FinGuard | Bank facade, vault door, blue holo-security | `#1D4ED8` | Fraud detection on transaction streams ⚠︎ |
| 6 | ⚙ Research Lab | Future Work | Low industrial block, exposed pipework, steam | `#7C3AED` | Experiments that haven't earned a building yet |

### Per-building hover plate (280×120 glass card)

```
[NEON ICON]  WASABIKIRI TEMPLE
             Desktop · C++ · Qt            ⚠︎
             ────────────────────
             Enter →
```

### Section header (pinned top-left during the pan)

Eyebrow: `CHAPTER 08 · ENGINEERING DISTRICT · 250vh`
Title: `City of Projects`
Desc: *Six buildings. Six things I actually shipped. Walk the street and pick one.*

Plus a **mini-map** bottom-right, 200×60, showing pan position across the six buildings.

### Motion spec
```
Pinned 250vh · vertical scroll drives horizontal camera pan
camera.position.x  →  0 → 2400 (0–100%), ease "none", scrub 1
buildings          →  4 parallax depths: 0.25× / 0.5× / 0.75× / 1.0×
                      foreground signage at 1.3× (moves faster than camera — sells depth)
neonFlicker        →  per-building seeded loop, 2–6s, 3% duty cycle on the flicker
rain               →  off by default; GPU instanced, 8k drops, wind-sheared 12°
puddleReflection   →  planar reflection at 0.5 res, blurred 4px
hover              →  building.position.y +12px, neon.intensity ×1.8, 240ms ease "power2.out"
                      siblings dim to 0.5 opacity
click              →  camera dollies in, district blurs, Project Template overlays (450ms)
```

---

## 10 — Project Building Template · page B, y = 8000

The reusable expanded-project layout. Every building opens into this. Build it once as a Figma
component set, then instance it six times with swapped content.

### Layout — full-screen overlay, 1440×900

```
┌────────────────────────────────────────────────────────────┐
│  ← BACK TO DISTRICT              [neon icon] WASABIKIRI    │  72px header
├──────────────────────────┬─────────────────────────────────┤
│                          │                                 │
│  OVERVIEW                │                                 │
│  Challenges              │        DEMO / SCREENSHOTS       │  sticky
│  Architecture            │        720×405                  │  right
│  Tech Stack              │                                 │  panel
│  Future Scope            │        ┌────┬────┬────┐         │
│                          │        │ 01 │ 02 │ 03 │ thumbs  │
│  [GitHub] [Docs]         │        └────┴────┴────┘         │
│                          │                                 │
│  560px rail              │        720px                    │
└──────────────────────────┴─────────────────────────────────┘
```

### Required content blocks — all eight, in this order

1. **Overview** — Body/Large 18, 3–4 sentences, what it is and who it's for
2. **Demo** — video or interactive embed, 16:9, with 3 thumbnail stills below
3. **Architecture** — ASCII/vector diagram in a glass card, same treatment as AURA
4. **Tech Stack** — Chip/Skill row, grouped `Core` / `Infra` / `Tooling`
5. **GitHub** — Button/Secondary with repo, star count and last-commit date
6. **Documentation** — Button/Secondary
7. **Challenges** — 2–3 items, each a glass card: `The problem` → `What I tried` → `What worked`
8. **Future Scope** — bulleted, 3–4 items, `#4A5568` bullets to read as clearly unfinished

**Challenge card format** (this is the block that makes the portfolio credible — don't skip it):
```
CHALLENGE 01
Indexing 100k files without pegging the CPU              ⚠︎
──────────────────────────────────────────────
TRIED    Naive walk on a background thread — still spiked
         to 90% and thrashed the disk cache
WORKED   Debounced fs events + a priority queue keyed on
         recency; cold index moved to an idle-time budget
```

---

## Return · transition · page B, y = 9200

Two keyframes. Deliberately quiet — the payoff for 1,200vh of spectacle is silence.

| % | Title | Gradient | Glow | On screen | Camera |
|---|---|---|---|---|---|
| 0% | Leaving the City | `#2E0B5E`→`#F97316` | `#FB923C` 0.4 | Neon falls behind. The camera climbs out of the district into open sky. | Slow rise, looking back |
| 100% | Countryside | `#F97316`→`#FDE68A` | `#FDE68A` 0.3 | Rice terraces, a single farmhouse, mountains flattening into haze. Nothing moves fast. | Settles into a slow forward drift |

**Header**
Eyebrow: `CHAPTER 09 · RETURN`
Title: `Return Home`
Desc: *Quiet. Peaceful. After eleven hundred vh of spectacle the site should exhale here — resist the urge to put anything on screen.*

### Motion spec
```
Pinned 120vh · scrub 1.4 (the slowest scrub on the site — deliberately heavy)
camera.position   →  bezier arc, city → altitude → countryside
audio             →  everything ducks to a single held pad + cicadas, -18dB
particleCount     →  all systems drop to 0 by 60% — nothing sparkles in this chapter
colorGrade        →  saturation 1.0 → 0.75, warmth +200K
```

---

## 11 — About · 120vh · page B, y = 10200

Explicitly **not** boring cards. A vertical timeline with the content hung off a single line.

### Layout

Center-left vertical rule (`#1E1E3F`, 1px) running the full section, with a `#7C3AED` progress
fill that tracks scroll. Content alternates left/right off the line. 7 blocks.

| Block | Content |
|---|---|
| **Journey** | One paragraph, first person, no résumé voice. *"I started because I wanted to make a game and ended up making everything except the game."* ⚠︎ |
| **Timeline** | 5 nodes, each `YEAR · one line`. 2021 first C++ project ⚠︎ / 2022 shipped first desktop app ⚠︎ / 2023 went deep on systems ⚠︎ / 2024 started AURA ⚠︎ / 2025 building toward Japan ⚠︎ |
| **Education** | Degree, institution, years, one line on what actually mattered ⚠︎ |
| **Goals** | 3 items, present tense: ship AURA v2 ⚠︎ / relocate to Japan ⚠︎ / go deeper on distributed systems ⚠︎ |
| **Japan** | Why Japan. Sakura accent `#F9A8D4`. Include JLPT level if you have one ⚠︎ |
| **Fun Facts** | 4 short lines, one genuinely odd one. This is the block people remember. ⚠︎ |
| **Hobbies** | Chip row, not sentences. ⚠︎ |

Typography: block titles Heading/H3 28, body Body/Base 16 `#94A3B8`, year labels Mono/Label 12
`#7C3AED`. Generous whitespace — 96px between blocks. No cards, no borders, no icons.

### Motion spec
```
timelineRule.scaleY  →  0 → 1, scrub 1 (fills as you scroll)
blocks               →  y 32 → 0, opacity 0 → 1, ease "power2.out", trigger at 80% viewport
                        alternate x -20 / +20 by side
background           →  countryside plate from Return, held and slowly desaturating
```

---

## 12 — Contact · 100vh · page B, y = 11400

Japanese garden. The warmest frame on the site, and the last thing anyone sees.

### Background plate

Sunset garden: `#F97316` → `#7C2D12` → `#050510` vertical. Stone lantern silhouettes,
an arched bridge over still water, a sakura tree frame-left shedding petals that drift right
and down. Water reflects the sky with a slow ripple normal map.

### Center content — vertically centered, max-width 720, text-align center

**Eyebrow** `CHAPTER 10 · CONTACT` · Mono/Label 12 · ls 3 · `#F9A8D4`

**Headline**
`Let's Build Something Amazing.`
Display/XL 72 · `#FFFFFF` · ls -2

**Sub**
`Open to roles, collaborations, and unreasonable ideas.` ⚠︎
Body/Large 18 · `#94A3B8`

**Button row** — 5 buttons, wrap to 2 rows at ≤1024px
| Button | Style | Target |
|---|---|---|
| Download CV | Primary (gradient) | ⚠︎ /cv.pdf |
| Resume | Secondary | ⚠︎ |
| GitHub | Secondary + icon | ⚠︎ |
| LinkedIn | Secondary + icon | ⚠︎ |
| Email | Secondary + icon | shauryajohri9@gmail.com |

**Footer strip** — 48px, `#4A5568` Mono/Code 12, centered
`SHAURYA JOHRI · BUILT WITH NEXT.JS, R3F & TOO MUCH COFFEE · 2026` ⚠︎

### Motion spec
```
petals          →  40 instances, drift + rotate, seeded — NOT scroll-driven, always alive
water.ripple    →  normal map scroll, 0.02 u/s, continuous
headline        →  per-word y 24 → 0, stagger 0.06, ease "power3.out", once on enter
buttons         →  magnetic hover: translate toward cursor ×0.25, cap 8px, spring 0.15
                   glow scales 1 → 1.15 on hover
lanterns        →  emissive pulse, 3.5s loop, offset per lantern
scrollHint      →  hidden — this is the end, don't invite more scrolling
```

---

## Page C — Mobile & Handoff

### 13 — Mobile Layout · 390×844 frames

Six key screens. **The cinematic chapters do not survive contact with mobile** — plan for this now:

| Screen | Desktop equivalent | Mobile treatment |
|---|---|---|
| 1 | Hero | Stack vertical: avatar → name → stats as a 2-col grid → skills as a wrapped chip cloud. Drop the side rails entirely. |
| 2 | Space Transition | Replace 3D with a 24-frame scrubbed image sequence |
| 3 | AURA | Rail and demo panel stack; demo goes on top, sticky under the header |
| 4 | Dragon Flight | Pre-rendered video, `playsinline`, scrubbed — do not run R3F |
| 5 | Engineering District | Vertical card list, one building per card. No pan, no isometric. |
| 6 | Contact | Buttons full-width, stacked, 56px tall |

Global mobile rules: 24px margins, base font 16 minimum, tap targets ≥44px, total scroll length
capped at ~600vh (down from 1,700), all WebGL behind a `matchMedia` + capability check.

### 15 — Icons & Assets

- Icon set: 24×24 grid, 1.5px stroke, round caps — Lucide as the base, custom for the six buildings
- Building icons: 🏯 temple, 📚 academy, 🏙 tower, 🚄 station, 🏦 bank, ⚙ lab — all as flat vectors, single-color, tintable by neon accent
- Social: GitHub, LinkedIn, Mail, Download, External-link
- Asset list for Blender/Spline: avatar, dragon, 6 buildings, floating islands, AURA orb, bridge, lantern, torii, sakura tree
- Texture budget: 2048² max, KTX2/Basis compressed, target <8MB total scene weight

### 16 — Motion Notes

One consolidated scroll timeline: a vertical scrubber diagram mapping the full 1,400–1,700vh
against every animated layer, with each chapter's pin ranges, scrub values and easing curves
in a single readable strip. Plus:
- Global easing set: `power2.out` (entrances), `power3.in` (exits), `none` (scrubbed camera)
- Lenis config: `lerp 0.08`, `wheelMultiplier 1`, `smoothTouch false`
- `prefers-reduced-motion`: all scrubs become instant state changes, video sequences show frame 1

### 17 — Developer Handoff

- Token → Tailwind config mapping table
- Component → React component name mapping
- Scroll architecture: one root ScrollTrigger timeline, chapters register as labeled sections
- Performance budget: 60fps on an M1 Air, <3s LCP, <200KB initial JS, WebGL lazy-loaded per chapter
- Asset loading: chapter N+1 preloads while chapter N is on screen
- Accessibility: full keyboard skip-links per chapter, all content readable with JS disabled

---

## What I need from you to remove the ⚠︎ marks

1. Real one-liners and descriptions for the six projects
2. Actual tech stacks per project
3. GitHub / docs / demo URLs
4. Your education, timeline years, and JLPT level if any
5. Two or three real "challenge → tried → worked" stories — these matter more than anything else here
6. Fun facts and hobbies

Give me those and I'll swap them in when the Figma limit clears.
