/* ═══════════════════════════════════════════════════════════════
   THE PLAYER — sitting on the ledge, facing the city.
   Black suit (the S-rank gathering look), katana planted beside him.
   Pure silhouette with a violet rim; no face, no detail.
   ═══════════════════════════════════════════════════════════════ */

export default function Player() {
  return (
    <g transform="translate(560, 470)">
      {/* shadow */}
      <ellipse cx="6" cy="150" rx="74" ry="14" fill="#000" opacity="0.5" />

      {/* the katana, planted point-down in the rock beside him */}
      <g>
        <path d="M92,10 L98,10 L104,146 L96,146 Z" fill="#0d0819" />
        <path d="M92,10 L98,10 L104,146 L96,146 Z" fill="none" stroke="rgba(192,132,252,.45)" strokeWidth="1" />
        <rect x="86" y="2" width="18" height="5" rx="2" fill="#1a0d28" stroke="rgba(255,61,143,.45)" strokeWidth="0.8" />
        <rect x="91" y="-30" width="9" height="30" rx="4" fill="#120a1e" stroke="rgba(150,80,220,.4)" strokeWidth="0.8" />
        <circle cx="95.5" cy="-32" r="3" fill="#ff2e88" opacity="0.8" />
      </g>

      {/* the leg hanging over the edge */}
      <path
        d="M10,86 C22,112 26,142 24,168 L42,170 C48,136 44,104 34,84 Z"
        fill="#07040f"
      />
      {/* dress shoe */}
      <path d="M24,168 L42,170 L48,180 L22,180 Z" fill="#0b0714" />

      {/* the bent leg, knee up */}
      <path
        d="M2,84 C-16,94 -30,116 -28,136 C-26,152 -8,154 0,142 C8,128 14,108 18,92 Z"
        fill="#080510"
      />

      {/* torso — suit jacket */}
      <path
        d="M-8,16 C-24,26 -28,54 -22,80 C-14,100 20,102 26,80 C32,54 24,26 10,16 Z"
        fill="#06040d"
      />
      {/* jacket opening — a sliver of shirt catching the city light */}
      <path d="M-2,24 C-6,44 -4,66 2,82 L8,80 C4,64 2,44 6,24 Z" fill="#1a1030" opacity="0.9" />

      {/* the arm propped behind him */}
      <path
        d="M-16,28 C-38,44 -50,74 -48,98 L-34,98 C-36,76 -26,54 -8,40 Z"
        fill="#07040f"
      />

      {/* head + hair */}
      <circle cx="0" cy="-2" r="16" fill="#06040d" />
      <path
        d="M-16,-6 C-15,-22 -6,-30 3,-30 C14,-30 20,-21 18,-5
           C13,-17 2,-20 -7,-15 Z"
        fill="#06040d"
      />

      {/* violet rim light — the city and AURA both catch him */}
      <path
        d="M10,16 C24,26 32,54 26,80"
        stroke="rgba(192,132,252,.5)"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M18,-5 C20,-21 14,-30 3,-30"
        stroke="rgba(192,132,252,.42)"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M34,84 C44,104 48,136 42,170"
        stroke="rgba(168,85,247,.34)"
        strokeWidth="1.3"
        fill="none"
      />
    </g>
  );
}
