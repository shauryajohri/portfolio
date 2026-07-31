/* ═══════════════════════════════════════════════════════════════
   THE ONI KATANA
   Not decoration — the site's chapter marker and visual signature.
   `ignite` (0..1) drives the shadow-violet crawl and ember accents.
   ═══════════════════════════════════════════════════════════════ */

/**
 * Ignition is driven by the `--ignite` CSS custom property (0..1) set on an
 * ancestor each frame, so the sequence never re-renders React mid-cutscene.
 */
export default function OniKatana() {
  return (
    <svg viewBox="0 0 1700 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="oniBlade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#150c22" />
          <stop offset="18%" stopColor="#2a1440" />
          <stop offset="48%" stopColor="#1b0f2c" />
          <stop offset="78%" stopColor="#31184a" />
          <stop offset="100%" stopColor="#120a1e" />
        </linearGradient>

        <linearGradient id="oniSteel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,.26)" />
          <stop offset="55%" stopColor="rgba(190,120,255,.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,.02)" />
        </linearGradient>

        <linearGradient id="oniGrip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241134" />
          <stop offset="50%" stopColor="#0e0718" />
          <stop offset="100%" stopColor="#1d0e2b" />
        </linearGradient>

        <linearGradient id="oniEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,.35)" />
          <stop offset="35%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#f7e2ff" />
          <stop offset="100%" stopColor="rgba(255,255,255,.55)" />
        </linearGradient>

        {/* the ignition: shadow-violet dominant, ember only as an accent */}
        <linearGradient id="oniIgnite" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="45%" stopColor="#a855f7" />
          <stop offset="72%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#ff8a3d" />
        </linearGradient>

        <filter id="oniGlow" x="-40%" y="-260%" width="180%" height="620%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="oniSoft" x="-60%" y="-300%" width="220%" height="700%">
          <feGaussianBlur stdDeviation="14" />
        </filter>

        <filter id="oniBloom" x="-70%" y="-400%" width="240%" height="900%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      {/* demonic aura trailing the edge */}
      <path
        d="M520,128 C900,126 1300,132 1662,104"
        stroke="#b14cff"
        strokeWidth="16"
        fill="none"
        style={{ opacity: 'calc(0.3 + var(--ignite, 0) * 0.5)' }}
        filter="url(#oniSoft)"
      />

      {/* ── BLADE ── */}
      <path
        d="M520,92 C900,80 1300,70 1662,104 C1300,132 900,126 520,128 Z"
        fill="url(#oniBlade)"
      />
      <path
        d="M520,92 C900,80 1300,70 1662,104 C1300,132 900,126 520,128 Z"
        fill="url(#oniSteel)"
      />

      {/* shinogi ridge + spine */}
      <path d="M523,101 C900,90 1300,81 1650,104" stroke="rgba(255,255,255,.22)" strokeWidth="1.4" fill="none" />
      <path d="M520,92 C900,80 1300,70 1662,104" stroke="rgba(196,140,255,.45)" strokeWidth="1.6" fill="none" />

      {/* hamon — the temper line, like breath on steel */}
      <path
        d="M540,120 q36,-9 72,-1 t72,0 t72,-2 t72,1 t72,-2 t72,0 t72,-3 t72,0 t72,-3 t72,-2 t72,-4 t72,-4"
        stroke="rgba(214,160,255,.55)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── IGNITION — shadow-violet crawls the edge, embers ride it ── */}
      <g style={{ opacity: 'var(--ignite, 0)' }}>
        <path
          d="M520,128 C900,126 1300,132 1662,104"
          stroke="url(#oniIgnite)"
          strokeWidth="8"
          fill="none"
          filter="url(#oniBloom)"
        />
        <path
          d="M520,128 C900,126 1300,132 1662,104"
          stroke="url(#oniIgnite)"
          strokeWidth="3.5"
          fill="none"
          strokeDasharray="1140"
          style={{ strokeDashoffset: 'calc(1140 - var(--ignite, 0) * 1140)' }}
        />
        <path
          d="M540,120 q36,-9 72,-1 t72,0 t72,-2 t72,1 t72,-2 t72,0 t72,-3 t72,0 t72,-3 t72,-2 t72,-4 t72,-4"
          stroke="#ff8a3d"
          strokeWidth="1.4"
          fill="none"
          style={{ opacity: 'calc(var(--ignite, 0) * 0.55)' }}
          filter="url(#oniGlow)"
        />
      </g>

      {/* cutting edge */}
      <path
        d="M520,128 C900,126 1300,132 1662,104"
        stroke="url(#oniEdge)"
        strokeWidth="2.6"
        fill="none"
        filter="url(#oniGlow)"
      />

      {/* oni etchings */}
      <text x="600" y="118" fontFamily="var(--font-jp)" fontSize="26" fill="rgba(255,86,160,.55)" letterSpacing="6">
        鬼
      </text>
      <text x="648" y="118" fontFamily="var(--font-jp)" fontSize="26" fill="rgba(178,92,255,.42)" letterSpacing="6">
        神
      </text>

      {/* ── HABAKI ── */}
      <rect x="506" y="88" width="22" height="42" rx="4" fill="#3a1c52" stroke="rgba(255,120,190,.5)" strokeWidth="1" />
      <path d="M510,94 h14 M510,102 h14 M510,110 h14 M510,118 h14" stroke="rgba(255,255,255,.16)" strokeWidth="1" />

      {/* ── TSUBA: the oni mask ── */}
      <g>
        <path
          d="M497,48 C486,62 482,84 482,110 C482,136 486,158 497,172 C508,158 512,136 512,110 C512,84 508,62 497,48 Z"
          fill="#200f2f"
          stroke="#ff3d8f"
          strokeWidth="1.6"
        />
        <path d="M492,50 C486,34 476,24 462,18 C472,32 478,42 480,56" fill="#200f2f" stroke="#ff3d8f" strokeWidth="1.4" />
        <path d="M492,170 C486,186 476,196 462,202 C472,188 478,178 480,164" fill="#200f2f" stroke="#ff3d8f" strokeWidth="1.4" />
        <ellipse cx="497" cy="92" rx="4" ry="9" fill="#ff2e88" filter="url(#oniGlow)" />
        <ellipse cx="497" cy="128" rx="4" ry="9" fill="#ff2e88" filter="url(#oniGlow)" />
        {/* the eyes turn violet as the blade wakes */}
        <g style={{ opacity: 'var(--ignite, 0)' }}>
          <ellipse cx="497" cy="92" rx="4" ry="9" fill="#c084fc" filter="url(#oniGlow)" />
          <ellipse cx="497" cy="128" rx="4" ry="9" fill="#c084fc" filter="url(#oniGlow)" />
        </g>
        <path d="M503,104 l7,6 -7,6 Z" fill="rgba(255,255,255,.75)" />
        <path d="M491,104 l-7,6 7,6 Z" fill="rgba(255,255,255,.45)" />
      </g>

      {/* ── TSUKA ── */}
      <rect x="196" y="89" width="306" height="42" rx="14" fill="url(#oniGrip)" stroke="rgba(150,80,220,.35)" strokeWidth="1" />
      <g stroke="rgba(220,170,255,.30)" strokeWidth="2.2" strokeLinecap="round">
        <path d="M206,90 l24,40 M230,90 l-24,40" />
        <path d="M238,90 l24,40 M262,90 l-24,40" />
        <path d="M270,90 l24,40 M294,90 l-24,40" />
        <path d="M302,90 l24,40 M326,90 l-24,40" />
        <path d="M334,90 l24,40 M358,90 l-24,40" />
        <path d="M366,90 l24,40 M390,90 l-24,40" />
        <path d="M398,90 l24,40 M422,90 l-24,40" />
        <path d="M430,90 l24,40 M454,90 l-24,40" />
        <path d="M462,90 l24,40 M486,90 l-24,40" />
      </g>

      {/* menuki */}
      <g transform="translate(330,110)">
        <circle r="11" fill="#2b1240" stroke="#ff3d8f" strokeWidth="1.2" />
        <path d="M-5,-2 h10 M-3,3 l3,4 3,-4" stroke="#ff77b4" strokeWidth="1.2" fill="none" />
      </g>

      {/* ── KASHIRA ── */}
      <rect x="164" y="84" width="34" height="52" rx="9" fill="#1a0d28" stroke="rgba(255,61,143,.55)" strokeWidth="1.3" />
      <path d="M164,96 C148,88 136,74 132,58 C146,68 158,78 166,88 Z" fill="#1a0d28" stroke="rgba(255,61,143,.45)" strokeWidth="1.2" />
      <circle cx="181" cy="110" r="4" fill="#ff2e88" filter="url(#oniGlow)" />
      <circle cx="181" cy="110" r="4" fill="#c084fc" style={{ opacity: 'var(--ignite, 0)' }} filter="url(#oniGlow)" />

      {/* sageo cord */}
      <path d="M150,120 C120,140 96,142 74,132" stroke="rgba(255,61,143,.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
