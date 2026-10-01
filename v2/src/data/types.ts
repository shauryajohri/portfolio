export type ProjectStatus = 'done' | 'wip' | 'plan';

/** Where a project lives in the book. */
export type BookChapter =
  | 'world'   // a flagship with its own world in The Creations
  | 'tale'    // a smaller project on the Lesser Tales spread
  | 'unknown'; // planned work, shown in The Unknown

export interface Project {
  id: string;
  glyph: string;
  name: string;
  status: ProjectStatus;
  statusLabel: string;
  tagline: string;
  category: string;
  chapter: BookChapter;
  /** One-line fantasy metaphor; captions the project's illustration. */
  scene: string;
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

