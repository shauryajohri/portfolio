export type ProjectStatus = 'done' | 'wip' | 'plan';

/** Where a project lives in the world model. */
export type WorldRole =
  | 'world'    // a flagship with its own explorable world
  | 'building' // lives in the Engineering District
  | 'unassigned';

export interface Project {
  id: string;
  glyph: string;
  name: string;
  status: ProjectStatus;
  statusLabel: string;
  tagline: string;
  category: string;
  worldRole: WorldRole;
  /** Engineering District archetype, when worldRole === 'building'. */
  building?: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  features: [string, string][];
  stack: Record<string, string[]>;
  metrics: [string, string][];
  timeline: [string, string][];
  challenges: string[];
  future: string[];
  repo: string;
  demo: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export interface Achievement {
  glyph: string;
  title: string;
  body: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}
