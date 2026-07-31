'use client';

import { useEffect, useMemo, useRef } from 'react';
import Kaisel from './Kaisel';
import Player from './Player';
import styles from './RestScene.module.css';

/* deterministic RNG — the scene must render identically on server and client */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HORIZON = 640;

export default function RestScene({ children }: { children?: React.ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null);

  /* ── stars ─────────────────────────────────────────────────── */
  const stars = useMemo(() => {
    const rnd = mulberry32(20260731);
    return Array.from({ length: 150 }, () => ({
      x: rnd() * 1600,
      y: rnd() * 470,
      r: 0.4 + rnd() * 1.5,
      o: 0.15 + rnd() * 0.75,
      d: rnd() * 5,
    }));
  }, []);

  /* ── the city below ────────────────────────────────────────── */
  const towers = useMemo(() => {
    const rnd = mulberry32(77123);
    const out: {
      x: number;
      w: number;
      top: number;
      depth: number;
      windows: { x: number; y: number; w: number; h: number; o: number }[];
    }[] = [];

    // three depth bands — farthest first, so nearer towers overlap them
    const bands = [
      { count: 22, minTop: 505, maxTop: 585, minW: 26, maxW: 54, depth: 0 },
      { count: 16, minTop: 468, maxTop: 545, minW: 34, maxW: 70, depth: 1 },
      { count: 11, minTop: 430, maxTop: 512, minW: 44, maxW: 92, depth: 2 },
    ];

    for (const band of bands) {
      for (let i = 0; i < band.count; i++) {
        const w = band.minW + rnd() * (band.maxW - band.minW);
        const x = -60 + rnd() * 1720;
        const top = band.minTop + rnd() * (band.maxTop - band.minTop);

        const windows: { x: number; y: number; w: number; h: number; o: number }[] = [];
        if (band.depth > 0) {
          const cols = Math.max(1, Math.floor(w / 13));
          const rows = Math.floor((HORIZON - top) / 16);
          for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
              if (rnd() > 0.58) continue;
              windows.push({
                x: x + 5 + c * 13,
                y: top + 12 + r * 16,
                w: 3.5,
                h: 6,
                o: 0.2 + rnd() * 0.7,
              });
            }
          }
        }
        out.push({ x, w, top, depth: band.depth, windows });
      }
    }
    return out;
  }, []);

  /* ── embers drifting up off the ledge ──────────────────────── */
  const embers = useMemo(() => {
    const rnd = mulberry32(4242);
    return Array.from({ length: 18 }, () => ({
      x: 380 + rnd() * 900,
      y: 600 + rnd() * 60,
      r: 0.8 + rnd() * 1.8,
      delay: rnd() * 9,
      violet: rnd() > 0.45,
    }));
  }, []);

  /* ── parallax ──────────────────────────────────────────────── */
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width - 0.5;
        const my = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--mx', (-mx * 2).toFixed(3));
        el.style.setProperty('--my', (-my * 2).toFixed(3));
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.scene} ref={sceneRef}>
      <div className={styles.canvas} aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#04020a" />
              <stop offset="38%" stopColor="#0a0618" />
              <stop offset="62%" stopColor="#160b2e" />
              <stop offset="80%" stopColor="#2a1147" />
              <stop offset="100%" stopColor="#3d1550" />
            </linearGradient>

            <radialGradient id="auraCore" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="22%" stopColor="#e9d5ff" />
              <stop offset="55%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="rgba(109,40,217,0)" />
            </radialGradient>

            <radialGradient id="auraHalo" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(168,85,247,.42)" />
              <stop offset="60%" stopColor="rgba(124,58,237,.12)" />
              <stop offset="100%" stopColor="rgba(124,58,237,0)" />
            </radialGradient>

            <linearGradient id="cityGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(168,85,247,0)" />
              <stop offset="55%" stopColor="rgba(168,85,247,.16)" />
              <stop offset="100%" stopColor="rgba(255,46,136,.24)" />
            </linearGradient>

            <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(60,26,102,0)" />
              <stop offset="45%" stopColor="rgba(78,34,128,.42)" />
              <stop offset="100%" stopColor="rgba(30,12,54,.85)" />
            </linearGradient>

            <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0614" />
              <stop offset="100%" stopColor="#030208" />
            </linearGradient>

            <radialGradient id="vig" cx="50%" cy="48%">
              <stop offset="55%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,.72)" />
            </radialGradient>

            <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>

          {/* ═══ SPACE ═══ */}
          <rect width="1600" height="900" fill="url(#sky)" />

          <g className={`${styles.layer} ${styles.d1}`}>
            {stars.map((s, i) => (
              <circle
                key={i}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="#e8dcff"
                opacity={s.o}
                className={styles.twinkle}
                style={{ animationDelay: `${s.d}s` }}
              />
            ))}

            {/* nebula wisps */}
            <ellipse cx="330" cy="180" rx="300" ry="90" fill="rgba(124,58,237,.10)" filter="url(#softGlow)" />
            <ellipse cx="1180" cy="120" rx="360" ry="80" fill="rgba(255,46,136,.06)" filter="url(#softGlow)" />
          </g>

          {/* ═══ AURA — the first world, seen from very far ═══ */}
          <g className={`${styles.layer} ${styles.d2}`}>
            <circle cx="1250" cy="168" r="150" fill="url(#auraHalo)" />
            <g className={styles.auraSpin}>
              <ellipse
                cx="1250"
                cy="168"
                rx="86"
                ry="24"
                fill="none"
                stroke="rgba(232,213,255,.5)"
                strokeWidth="1.6"
              />
              <ellipse
                cx="1250"
                cy="168"
                rx="112"
                ry="32"
                fill="none"
                stroke="rgba(168,85,247,.3)"
                strokeWidth="1.1"
              />
            </g>
            <circle cx="1250" cy="168" r="30" fill="url(#auraCore)" />
            <circle cx="1250" cy="168" r="11" fill="#05030c" />
            <text
              x="1250"
              y="252"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              letterSpacing="7"
              fill="rgba(214,196,255,.4)"
            >
              AURA
            </text>
          </g>

          {/* ═══ HORIZON BLOOM ═══ */}
          <rect x="0" y="380" width="1600" height="280" fill="url(#cityGlow)" />

          {/* ═══ THE CITY BELOW ═══ */}
          {[0, 1, 2].map((depth) => (
            <g
              key={depth}
              className={`${styles.layer} ${depth === 0 ? styles.d2 : depth === 1 ? styles.d3 : styles.d4}`}
            >
              {towers
                .filter((t) => t.depth === depth)
                .map((t, i) => (
                  <g key={i}>
                    <rect
                      x={t.x}
                      y={t.top}
                      width={t.w}
                      height={HORIZON - t.top + 30}
                      fill={depth === 0 ? '#150a28' : depth === 1 ? '#0e0620' : '#080417'}
                    />
                    <rect
                      x={t.x}
                      y={t.top}
                      width={t.w}
                      height={2}
                      fill={depth === 2 ? 'rgba(255,46,136,.5)' : 'rgba(168,85,247,.35)'}
                    />
                    {t.windows.map((w, j) => (
                      <rect
                        key={j}
                        x={w.x}
                        y={w.y}
                        width={w.w}
                        height={w.h}
                        fill={j % 7 === 0 ? '#ff8a3d' : '#c9a6ff'}
                        opacity={w.o}
                      />
                    ))}
                  </g>
                ))}
            </g>
          ))}

          {/* ═══ FOG SEA — the city's feet disappear into it ═══ */}
          <rect x="0" y="520" width="1600" height="170" fill="url(#fog)" />
          <ellipse cx="400" cy="640" rx="520" ry="60" fill="rgba(90,40,150,.22)" filter="url(#softGlow)" />
          <ellipse cx="1240" cy="655" rx="480" ry="52" fill="rgba(150,40,120,.18)" filter="url(#softGlow)" />

          {/* ═══ THE LEDGE ═══ */}
          <g className={`${styles.layer} ${styles.d5}`}>
            <path
              d={`M-40,${HORIZON + 18}
                  C 180,${HORIZON - 6} 380,${HORIZON + 4} 560,${HORIZON - 2}
                  C 820,${HORIZON - 10} 1120,${HORIZON + 2} 1400,${HORIZON - 14}
                  C 1500,${HORIZON - 20} 1580,${HORIZON - 6} 1640,${HORIZON + 10}
                  L 1640,940 L -40,940 Z`}
              fill="url(#rock)"
            />
            {/* the lit lip of the ledge */}
            <path
              d={`M-40,${HORIZON + 18}
                  C 180,${HORIZON - 6} 380,${HORIZON + 4} 560,${HORIZON - 2}
                  C 820,${HORIZON - 10} 1120,${HORIZON + 2} 1400,${HORIZON - 14}
                  C 1500,${HORIZON - 20} 1580,${HORIZON - 6} 1640,${HORIZON + 10}`}
              fill="none"
              stroke="rgba(168,85,247,.34)"
              strokeWidth="1.6"
            />

            {/* a few cracks so the rock isn't a flat shape */}
            <path d="M240,690 L300,742 L268,806" stroke="rgba(150,110,220,.10)" strokeWidth="1.4" fill="none" />
            <path d="M900,700 L950,766 L928,838" stroke="rgba(150,110,220,.09)" strokeWidth="1.4" fill="none" />
            <path d="M1320,684 L1372,748" stroke="rgba(150,110,220,.08)" strokeWidth="1.2" fill="none" />

            {/* embers lifting off the warm rock */}
            {embers.map((e, i) => (
              <circle
                key={i}
                cx={e.x}
                cy={e.y}
                r={e.r}
                fill={e.violet ? '#c084fc' : '#ff8a3d'}
                className={styles.emberDrift}
                style={{ animationDelay: `${e.delay}s` }}
              />
            ))}
          </g>

          {/* ═══ THE TWO OF THEM ═══ */}
          <g className={`${styles.layer} ${styles.d5}`}>
            <g className={styles.breath}>
              <Kaisel />
            </g>
            <Player />
          </g>

          {/* ═══ FINAL VIGNETTE ═══ */}
          <rect width="1600" height="900" fill="url(#vig)" />
        </svg>
      </div>

      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
}
