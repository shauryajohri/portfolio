/* ═══════════════════════════════════════════════════════════════
   KAISEL — resting.
   Winged, western-silhouette wyvern: the one deliberate non-Japanese
   element on the site. Head lowered near the player, wings folded,
   tail curled around the ledge. Read as a shape, not a model.
   ═══════════════════════════════════════════════════════════════ */

export default function Kaisel() {
  return (
    <g>
      {/* shadow pooled under the body */}
      <ellipse cx="1010" cy="606" rx="230" ry="26" fill="#000" opacity="0.55" />

      {/* tail — sweeps right and off the ledge */}
      <path
        d="M1120,586 C1230,584 1320,566 1392,524 C1420,508 1438,486 1444,464
           C1448,486 1436,514 1408,538 C1338,596 1226,620 1122,616 Z"
        fill="#0b0714"
      />

      {/* far wing */}
      <path
        d="M960,566 C972,470 1016,384 1082,338 C1050,404 1036,486 1044,572 Z"
        fill="#0d0819"
      />

      <g>
        {/* body mass */}
        <ellipse cx="1024" cy="558" rx="132" ry="58" fill="#0a0613" />
        {/* haunch */}
        <circle cx="1094" cy="546" r="52" fill="#0b0715" />

        {/* near wing — folded into a peak */}
        <path
          d="M986,556 C1000,448 1052,354 1132,308
             C1104,376 1090,462 1098,566 Z"
          fill="#0b0716"
        />
        <path
          d="M1004,548 C1018,462 1058,388 1118,348
             C1096,404 1086,474 1092,556 Z"
          fill="#130b25"
          opacity="0.85"
        />
      </g>

      {/* neck — long, curving down toward the player */}
      <path
        d="M900,548 C838,540 786,516 752,482
           C742,472 736,460 734,448
           C744,470 762,490 790,506
           C826,526 866,540 906,572 Z"
        fill="#0a0613"
      />

      {/* head, resting */}
      <path
        d="M734,448 C712,438 690,440 678,452
           C670,460 672,472 684,478
           C702,486 726,478 740,464 Z"
        fill="#0b0714"
      />

      {/* horns sweeping back */}
      <path d="M716,440 C700,418 682,406 664,404 C680,414 694,430 702,448 Z" fill="#0b0714" />
      <path d="M728,436 C716,414 700,398 684,394 C698,408 710,426 716,444 Z" fill="#0b0714" />

      {/* jaw line */}
      <path
        d="M678,452 C690,446 706,446 720,452"
        stroke="rgba(168,85,247,.30)"
        strokeWidth="1.2"
        fill="none"
      />

      {/* the eye — the one warm point in the silhouette */}
      <ellipse cx="706" cy="458" rx="7" ry="4" fill="#c084fc" />
      <ellipse cx="706" cy="458" rx="14" ry="9" fill="#a855f7" opacity="0.28" />

      {/* violet rim light along the spine and wing edge */}
      <path
        d="M986,556 C1000,448 1052,354 1132,308"
        stroke="rgba(192,132,252,.55)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M900,548 C838,540 786,516 752,482 C742,472 736,460 734,448"
        stroke="rgba(168,85,247,.34)"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M1120,586 C1230,584 1320,566 1392,524"
        stroke="rgba(168,85,247,.22)"
        strokeWidth="1.4"
        fill="none"
      />
      <ellipse
        cx="1024"
        cy="558"
        rx="132"
        ry="58"
        fill="none"
        stroke="rgba(168,85,247,.16)"
        strokeWidth="1.2"
      />
    </g>
  );
}
