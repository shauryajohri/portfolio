import type { Achievement, TimelineEntry } from './types';

export const PROFILE = {
  name: 'Shaurya Johri',
  role: 'Software Developer · AI Engineer',
  status: 'Open to internships and collaborations',
  /** Chapter I opener. */
  philosophy: 'Every great story begins with an idea.',
  intro:
    'Shaurya Johri is a software developer who builds intelligent systems — desktop AI, machine-learning pipelines and real-time 3D worlds.',
  /** Leave empty to hide. Degree · institution · years. */
  education: '',
  beginning: [
    'It started with C++ and the fundamentals: data structures, algorithms, and learning to finish things instead of abandoning them at 80%.',
    'From there the work moved to the web, then to machine learning, and finally to AURA — the project that pulled everything together.',
  ],
  motivation:
    'What drives the work: software that remembers, adapts and helps before it is asked.',
  aspiration:
    'The builder he wants to become: one who designs whole systems end to end — from the model to the interface people actually touch.',
};

/** Chapter II — The Forge. Concrete tools only; no filler categories. */
export const FORGE: { name: string; note: string; tools: string[] }[] = [
  {
    name: 'Languages',
    note: 'The raw metal.',
    tools: ['C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    name: 'Frontend',
    note: 'What people see and touch.',
    tools: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'Electron'],
  },
  {
    name: 'Backend & Systems',
    note: 'The machinery underneath.',
    tools: ['Node.js', 'FastAPI', 'Flask', 'WebSockets', 'PostgreSQL', 'SQLite'],
  },
  {
    name: 'AI / ML',
    note: 'The part that thinks.',
    tools: [
      'Multi-LLM routing',
      'OpenRouter',
      'Groq',
      'Ollama',
      'Gemini',
      'Whisper',
      'Scikit-learn',
      'Pandas',
      'NumPy',
    ],
  },
  {
    name: 'Tools & Cloud',
    note: 'How it gets shipped.',
    tools: ['Git', 'Docker', 'Linux', 'Vercel', 'Qt', 'Figma'],
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    year: '2023',
    title: 'Started Programming',
    body: 'C++ and the fundamentals — data structures and algorithms.',
  },
  {
    year: '2024',
    title: 'Web Development',
    body: 'Full-stack: JavaScript, React, Next.js, backends and databases.',
  },
  {
    year: '2025',
    title: 'Machine Learning',
    body: 'Tourist Prediction, Yatra AI and FinGuard — forecasting, recommendation and fraud detection end to end.',
  },
  {
    year: '2025',
    title: 'AURA begins',
    body: 'A desktop AI companion with memory, voice and multi-model routing.',
  },
  {
    year: '2026',
    title: 'Internship',
    body: 'Applying the work in a professional environment.',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { glyph: '🌐', title: 'ICPC', body: 'International Collegiate Programming Contest participation.' },
  { glyph: '💻', title: 'TCS CodeVita', body: 'Global coding contest participation.' },
  { glyph: '🏆', title: 'Hackathons', body: 'Competitive build events — shipping working software against the clock.' },
  { glyph: '📜', title: 'Certifications', body: 'Coursework and certifications across AI, web and systems.' },
  { glyph: '🔬', title: 'Research', body: 'Educational metaverse and smart-city work aimed at publication.' },
];

/** Chapter V — The Unknown. Planned projects are pulled in from PROJECTS. */
export const UNKNOWN = {
  building: 'AURA — the React + Electron rewrite, with the cosmic UI over a WebSocket bridge.',
  goals: [
    'Publish the educational-metaverse research',
    'Ship AURA’s plugin system and mobile companion',
    'Take SmartConnect from campus prototype to live multiplayer',
  ],
  research: 'Educational metaverses, AI-assisted collaboration and smart-city digital twins.',
};

export const LINKS = {
  github: 'https://github.com/shauryajohri',
  /** Leave empty to hide. */
  linkedin: '',
  email: 'shauryajohri9@gmail.com',
  /** Drop the file at public/resume.pdf. */
  resume: '/resume.pdf',
};
