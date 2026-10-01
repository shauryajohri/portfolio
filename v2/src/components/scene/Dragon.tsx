/* Placeholder silhouette for the dragon resting on the railing.
   Replaced by an illustrated pose at the art stage. */
export function DragonSilhouette() {
  return (
    <svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <path d="M44 66 Q24 70 13 60 Q7 53 12 47 Q16 58 28 60 Q38 62 44 60 Z" />
      <path d="M40 60 Q54 40 78 47 Q93 54 88 66 Q70 74 47 70 Z" />
      <g data-neck>
        <path d="M79 50 Q88 30 95 18 Q99 12 107 13 L115 17 L106 20 Q100 24 96 34 Q92 46 88 56 Z" />
        <path d="M100 13 L95 3 L104 11 Z" />
        <circle data-eye cx="106" cy="15.5" r="1.3" />
      </g>
      <path d="M54 50 Q60 20 84 21 Q74 30 72 45 Q64 41 54 50 Z" />
      <path d="M52 68 L50 80 L57 80 L59 70 Z M76 68 L76 80 L83 80 L83 68 Z" />
    </svg>
  );
}
