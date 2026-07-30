# Portfolio Figma Build — Resume Brief

**To resume: open a new chat and say "read FIGMA-RESUME-BRIEF.md and continue the Figma build".**

---

## The file

- **Name:** Shaurya Johri — Portfolio Worlds
- **URL:** https://www.figma.com/design/vYROXvcoTBIQETZoGT2QjA
- **fileKey:** `vYROXvcoTBIQETZoGT2QjA`
- **Account:** shauryajohri9@gmail.com (Figma Starter plan)

## Theme

> "Every project is a world. Every scroll is a journey."

A scroll-driven cinematic portfolio, ~1,400–1,700vh total, 2–4 minutes top to bottom.
Chapter order: Hero → Earth → Sky → Space → AURA → Portal → Dragon Journey → Metaverse →
Engineering District → City of Projects → Return Home → Contact → End.

## Plan constraints hit (important)

1. **Starter = 3 pages max.** The 17 planned Figma pages were collapsed into 3 real pages,
   with the 17 "pages" as titled section blocks inside them:
   - `A — Foundations` — Design System, Hero, Hero Components, Components
   - `B — The Journey` — chapter storyboards + world layouts, stacked vertically
   - `C — Mobile & Handoff` — Mobile Layout, Icons & Assets, Motion Notes, Developer Handoff
2. **Starter has an MCP tool-call rate limit.** The build stopped mid-way when it tripped.
   It resets on a rolling window. Upgrading to Professional removes both limits.

---

## DONE

### Tokens & styles (file-level, already created — do not recreate)

Variable collections: `Color` (16), `Spacing` (11), `Radius` (5).

| Token | Hex |
|---|---|
| purple/500 | #7C3AED |
| purple/400 | #9B62F5 |
| purple/700 | #5B21B6 |
| purple/glow | #A855F7 |
| blue/500 | #3B82F6 |
| blue/400 | #60A5FA |
| blue/700 | #1D4ED8 |
| bg/base | #050510 |
| bg/elevated | #0B0B1C |
| bg/glass | #12122A |
| text/primary | #FFFFFF |
| text/secondary | #94A3B8 |
| text/muted | #4A5568 |
| border/subtle | #1E1E3F |
| accent/sakura | #F9A8D4 |
| accent/sunset | #FB923C |

Text styles (13): Display/XXL, Display/XL, Heading/H1–H4, Body/Large, Body/Base, Body/Small,
Label/Medium, Mono/Label, Mono/Value, Mono/Code.

Fonts confirmed available: **Space Grotesk** (Bold, Medium, Regular, Light — no SemiBold),
**Inter** (note: "Semi Bold" with a space), **JetBrains Mono**.

### Built sections

| Section | Page | Node ID |
|---|---|---|
| 01 — Design System | A | `2:2` |
| 02 — Hero (1440×900) | A | `5:2` |
| 03/14 — Components | A | `7:2` |
| CH04 — Space Transition (120vh) | B | `9:2` |
| CH06 — Portal Transition (80vh) | B | `10:2` |

Hero contains: SYSTEM stat rail (`6:2`), avatar placeholder (`5:96`), SKILL MATRIX (`6:38`),
name block (`6:76`), scroll cue (`6:82`), chapter tag (`6:87`).

9 real Figma components exist: Button/Primary, Button/Secondary, Chip/Skill, Pill/Status,
Stat/Counter, Tag/Chapter, Card/Glass, Rail/Progress, Section/Header.

---

## TODO — in order

Build on page `B — The Journey` at these Y positions (x = 0, width 1920):

| Y | Section | Notes |
|---|---|---|
| 1000 | 05 — AURA World (200vh) | Split layout: left content rail (Title, Description, Problem, Solution, Architecture, Brain Modules, Tech Stack, Features, GitHub, Docs) / right large demo panel. Purple galaxy bg, floating stations, asteroids, rotating orb with orbiting satellites. |
| 3200 | 07 — Dragon Flight (150vh) | **Next up — script was written and lost to the rate limit.** 4 keyframes: Exit (0%) → Floating Islands (30%) → The Dragon (60%) → Toward the City (100%). No UI. |
| 4200 | 08 — Metaverse World (200vh) | Huge futuristic city, blue glass, flying cars, NPCs, holograms, Digital Twin. Left = project details, right = demo / architecture / research / roadmap / GitHub. |
| 5400 | Bridge Transition (80vh) | Dragon leaves, camera follows, massive bridge, sunset, Engineering District appears. 3 keyframes. |
| 6400 | 09 — Engineering District (250vh) | Japanese cyberpunk city, each building = one project: WasabiKiri Temple (desktop, shrine), JLPT Academy (language, torii + library), Smart City Tower (digital twin, holographic city), Tourist AI Station (travel rec, train station + maps), FinGuard Tower (bank, blue holograms, security), Research Lab (future work). |
| 8000 | 10 — Project Building Template | Reusable expanded-project layout: Overview, Demo, Architecture, Tech Stack, GitHub, Documentation, Challenges, Future Scope. |
| 9200 | Return (transition) | Camera leaves city, sunset, Japanese countryside, quiet. 2 keyframes. |
| 10200 | 11 — About (120vh) | Journey, Timeline, Education, Goals, Japan, Fun Facts, Hobbies. Minimal — not boring cards. |
| 11400 | 12 — Contact (100vh) | Japanese garden, sakura, lanterns, bridge, sunset. Center: "Let's Build Something Amazing." Buttons: Resume, GitHub, LinkedIn, Email, Download CV. |

Then on page `C — Mobile & Handoff`:

- 13 — Mobile Layout (390×844 key screens)
- 15 — Icons & Assets
- 16 — Motion Notes (consolidated scroll timeline)
- 17 — Developer Handoff

Finally: screenshot every section, check for clipped text / overlaps / wrong colors, fix.

---

## Established conventions — MATCH THESE

**Storyboard chapter block** (used for all cinematic chapters):
- Vertical auto-layout, width 1920, padding 80/72, itemSpacing 32, fill `#050510`
- Header: mono eyebrow (12px, ls 3, accent color) → Space Grotesk Bold 44 title (ls -1.5) →
  Inter Regular 16 description (`#94A3B8`, lh 160)
- Keyframe row: horizontal auto-layout, itemSpacing 24, each column FILL
- Each keyframe: 400×225 art frame, cornerRadius 12, clipsContent, vertical gradient fill,
  1px `#FFFFFF` @ 8% stroke, radial glow ellipse, ~30 procedural stars, scroll-% label
  (JetBrains Mono Bold 13, top-left at 14/12), scene title (Space Grotesk Medium 20, at 14/187)
- Notes under each: ON SCREEN / CAMERA / LAYERS — mono 9px ls 2 label `#4A5568`,
  Inter Regular 13 value `#94A3B8` lh 155
- Motion spec panel at bottom: `#0B0B1C` fill, `#1E1E3F` 1px stroke, radius 12, padding 24/20,
  mono 10 accent "MOTION SPEC" label, mono 12 body lh 190 with real GSAP/R3F property targets

**World/layout section** (AURA, Metaverse, District): full 1440×900 viewport frames showing
key scroll states, plus a content-rail breakdown.

### Plugin API gotchas learned the hard way

1. `figma.createAutoLayout()` frames default to a **white fill** — always `frame.fills = []`
   on layout containers or you get white-on-white invisible text.
2. `layoutSizingHorizontal = 'FILL'` only works **after** `appendChild` into an auto-layout parent.
   Setting it on a child of a plain frame throws.
3. To absolutely position a sized auto-layout frame inside a plain frame: create it, `appendChild`,
   then `resize()`, then set `x`/`y`.
4. Wrapping text needs `textAutoResize = 'HEIGHT'` **and** an explicit width or `FILL`.
5. Paint colors are 0–1 range, no `a` inside `color` — opacity goes at paint level, except in
   gradient stops where `{...color, a}` is correct.
6. Load every font style before touching text. Inter is "Semi Bold" (with space), JetBrains Mono
   is "ExtraBold" (no space).

### Tech stack the design should hand off to

Next.js · React · TypeScript · Tailwind · Framer Motion · React Three Fiber · Drei ·
GSAP ScrollTrigger (scroll timeline) · Lenis (smooth scroll, lerp 0.08) · Spline/Blender assets ·
Vercel.

Animation inventory: hero fade-up, stat count-up, avatar idle breathing, energy glow, orb rotation,
dragon flight path, building parallax, slow star drift, cloud parallax, magnetic button hover,
glass-morphism cards. Everything respects `prefers-reduced-motion`.
