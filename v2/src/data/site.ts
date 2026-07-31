import type { Achievement, Stat, TimelineEntry } from './types';

export const SKILLS: Record<string, string[]> = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Electron'],
  Backend: ['Python', 'FastAPI', 'Node.js', 'WebSockets', 'Flask', 'PostgreSQL', 'SQLite'],
  'AI / ML': [
    'LLM Routing',
    'Prompt Engineering',
    'OpenRouter',
    'Groq',
    'Ollama',
    'Gemini',
    'Whisper',
    'Scikit-learn',
    'Pandas',
    'NumPy',
  ],
  Languages: ['C++', 'Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'],
  Tools: ['Git', 'Docker', 'VS Code', 'Qt', 'Figma', 'Linux', 'Vercel'],
};

export const TIMELINE: TimelineEntry[] = [
  {
    year: '2023',
    title: 'Started Programming',
    body: 'First lines of code — C++ and the fundamentals. Data structures, algorithms, and learning to actually finish things rather than abandon them at 80%.',
  },
  {
    year: '2024',
    title: 'Web Development',
    body: 'Moved into full-stack: JavaScript, React, Next.js, backends and databases. Started shipping projects other people could open in a browser.',
  },
  {
    year: '2025',
    title: 'Machine Learning',
    body: 'Scikit-learn, Pandas, real pipelines. Tourist Prediction, Yatra AI and FinGuard came out of this year — forecasting, recommendation and fraud detection end to end.',
  },
  {
    year: '2025',
    title: 'AURA begins',
    body: 'The flagship. A desktop AI companion with memory, voice and multi-model routing — the project that pulled everything else together.',
  },
  {
    year: '2026',
    title: 'Internship',
    body: 'Applying the work in a professional environment.',
  },
  {
    year: '2026',
    title: 'SmartConnect',
    body: 'Designing a real-time multiplayer educational metaverse — the first project built as much for research as for shipping.',
  },
  {
    year: '2026',
    title: 'Digital Twin',
    body: 'Smart City digital twin: 3D visualisation over live IoT and AI analytics.',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { glyph: '🏆', title: 'Hackathons', body: 'Competitive build events — shipping working software against the clock.' },
  { glyph: '📜', title: 'Certificates', body: 'Formal coursework and certifications across AI, web and systems.' },
  { glyph: '🔬', title: 'Research', body: 'Educational metaverse and smart-city work aimed at publication.' },
  { glyph: '⚡', title: 'Competitive Coding', body: 'Regular practice in algorithmic problem solving.' },
  { glyph: '🚀', title: 'Projects', body: '8 projects spanning AI, ML, desktop and 3D web.' },
  { glyph: '💼', title: 'Internship', body: 'Professional engineering experience.' },
  { glyph: '🌐', title: 'ICPC', body: 'International Collegiate Programming Contest participation.' },
  { glyph: '💻', title: 'CodeVita', body: 'TCS CodeVita global coding contest participation.' },
];

export const STATS: Stat[] = [
  { value: 8, suffix: '+', label: 'Projects' },
  { value: 25000, suffix: '+', label: 'Lines of Code' },
  { value: 20, suffix: '+', label: 'Technologies' },
  { value: 10, suffix: '+', label: 'Repositories' },
];

export const LINKS = {
  github: 'https://github.com/shauryajohri',
  linkedin: '',
  email: 'shauryajohri9@gmail.com',
  resume: '/resume.pdf',
};
