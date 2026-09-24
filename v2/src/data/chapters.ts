/* ============================================================
   THE BOOK'S CHAPTERS — order here is the reading order.
   `plate` is the illustration on the left page. Until the art
   exists (final stage), the plate renders its caption instead.
   ============================================================ */

export interface Chapter {
  id: string;
  numeral: string;
  title: string;
  subtitle: string;
  /** Plain label for the table of contents and screen readers. */
  label: string;
  plate: {
    caption: string;
    /** Path under /public once the illustration exists. */
    image?: string;
  };
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'prologue',
    numeral: 'I',
    title: 'Prologue',
    subtitle: 'The Invitation',
    label: 'About',
    plate: {
      caption:
        'An academy on high ground. Shaurya and the dragon overlook a distant, glowing city.',
    },
  },
  {
    id: 'forge',
    numeral: 'II',
    title: 'The Forge',
    subtitle: 'Tools forged through building',
    label: 'Skills',
    plate: {
      caption: 'A great forge. Technologies rest on the anvil as tools, not weapons.',
    },
  },
  {
    id: 'creations',
    numeral: 'III',
    title: 'The Creations',
    subtitle: 'Worlds that were built',
    label: 'Projects',
    plate: {
      caption: 'A tower wrapped in cosmic energy; beyond it, a connected city of light.',
    },
  },
  {
    id: 'trials',
    numeral: 'IV',
    title: 'The Trials',
    subtitle: 'The road so far',
    label: 'Experience',
    plate: {
      caption: 'A long mountain path. Milestones stand along it like old waystones.',
    },
  },
  {
    id: 'unknown',
    numeral: 'V',
    title: 'The Unknown',
    subtitle: 'Some chapters are still being written',
    label: 'Now',
    plate: {
      caption: 'An enormous sealed gate. Faint light leaks through the seams.',
    },
  },
  {
    id: 'next',
    numeral: 'VI',
    title: 'The Next Chapter',
    subtitle: 'The story doesn’t end here',
    label: 'Contact',
    plate: {
      caption: 'The final page, open toward a sunrise. The dragon watches the horizon.',
    },
  },
];
