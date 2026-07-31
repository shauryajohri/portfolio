/* ═══════════════════════════════════════════════════════════════
   THE PROLOGUE SCRIPT
   Automatic. Time-driven. Japanese above the blade, English below.
   All timings in milliseconds from sequence start.
   ═══════════════════════════════════════════════════════════════ */

export interface Beat {
  /** Above the blade. */
  jp: string;
  /** Below the blade. */
  en: string;
  at: number;
  hold: number;
  /** Render the English line large — used for the name and the closer. */
  big?: boolean;
  /** The top line is Latin here, not Japanese (the "My name is..." beat). */
  latinTop?: boolean;
}

export function greetingFor(date = new Date()): [string, string] {
  const h = date.getHours();
  if (h < 12) return ['おはようございます。', 'Good Morning.'];
  if (h < 18) return ['こんにちは。', 'Good Afternoon.'];
  return ['こんばんは。', 'Good Evening.'];
}

const FADE = 900;

export function buildScript(date = new Date()): { beats: Beat[]; total: number } {
  const [jpGreeting, enGreeting] = greetingFor(date);

  const beats: Beat[] = [
    { jp: jpGreeting, en: enGreeting, at: 1600, hold: 2600 },

    { jp: 'My name is...', en: 'Shaurya Johri.', at: 4600, hold: 2800, big: true, latinTop: true },

    { jp: 'ソフトウェア開発者', en: 'Software Developer.', at: 7800, hold: 1250 },
    { jp: 'ＡＩエンジニア', en: 'AI Engineer.', at: 9250, hold: 1250 },
    { jp: 'システム設計者', en: 'System Designer.', at: 10700, hold: 1250 },
    { jp: '世界の創造者', en: 'World Builder.', at: 12150, hold: 1700 },

    { jp: 'すべての企画は問題から始まる。', en: 'Every project begins with a problem.', at: 14300, hold: 2000 },
    { jp: '私のものは物語から始まる。', en: 'Mine begin with a story.', at: 16600, hold: 2000 },
    { jp: '物語にはそれぞれの世界がある。', en: 'Every story deserves its own world.', at: 18900, hold: 2300 },
  ];

  return {
    beats,
    total: 26200,
  };
}

/* ── stage markers ───────────────────────────────────────────── */
export const CUE = {
  /** blade slides in */
  bladeIn: 400,
  bladeInDur: 2200,
  /** shadow-violet ignition crawls the blade, ember accents on the edge */
  igniteStart: 21600,
  igniteDur: 2200,
  /** the strike */
  slash: 23900,
  slashDur: 420,
  /** the darkness opens */
  split: 24320,
  splitDur: 1500,
  /** sequence complete */
  end: 26200,
} as const;
