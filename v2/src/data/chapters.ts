/* ============================================================
   THE BOOK'S CHAPTERS — order here is the reading order.
   The left page of each spread is the chapter opener: title,
   subtitle, an epigraph, and (final stage) a small ink sketch.
   ============================================================ */

export interface Chapter {
  id: string;
  numeral: string;
  title: string;
  subtitle: string;
  /** Plain label for the table of contents and screen readers. */
  label: string;
  /** One italic line under the title on the opener page. */
  epigraph: string;
  /** Ink sketch under /public, once it exists. */
  sketch?: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'prologue',
    numeral: 'I',
    title: 'Prologue',
    subtitle: 'The Invitation',
    label: 'About',
    epigraph: 'Every great story begins with an idea.',
  },
  {
    id: 'forge',
    numeral: 'II',
    title: 'The Forge',
    subtitle: 'Tools forged through building',
    label: 'Skills',
    epigraph: 'No tool here was learned for its own sake.',
  },
  {
    id: 'creations',
    numeral: 'III',
    title: 'The Creations',
    subtitle: 'Worlds that were built',
    label: 'Projects',
    epigraph: 'Look up — every one of them is out there.',
  },
  {
    id: 'trials',
    numeral: 'IV',
    title: 'The Trials',
    subtitle: 'The road so far',
    label: 'Experience',
    epigraph: 'Milestones, set down plainly.',
  },
  {
    id: 'unknown',
    numeral: 'V',
    title: 'The Unknown',
    subtitle: 'Some chapters are still being written',
    label: 'Now',
    epigraph: 'The unlit towers on the horizon are next.',
  },
  {
    id: 'next',
    numeral: 'VI',
    title: 'The Next Chapter',
    subtitle: 'The story doesn’t end here',
    label: 'Contact',
    epigraph: 'Let’s build what’s next.',
  },
];
