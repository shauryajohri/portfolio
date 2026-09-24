'use client';

import { useEffect, useRef } from 'react';
import type { Project } from '@/data/types';
import s from './ProjectDialog.module.css';

/* The engineering record behind each world. Plain, professional —
   the fantasy stops at the door. */
export default function ProjectDialog({
  project: p,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (p && !d.open) d.showModal();
    if (!p && d.open) d.close();
  }, [p]);

  return (
    <dialog
      ref={ref}
      className={s.dialog}
      aria-labelledby="record-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {p && (
        <article className={s.sheet}>
          <header className={s.head}>
            <p className={s.kicker}>{p.category} · {p.statusLabel}</p>
            <h2 id="record-title" className={s.title}>{p.name}</h2>
            <p className={s.tagline}>{p.tagline}</p>
            <button className={s.close} onClick={onClose} aria-label="Close">×</button>
          </header>

          <Section title="What it is"><p>{p.overview}</p></Section>
          <Section title="The problem"><p>{p.problem}</p></Section>
          <Section title="What I built"><p>{p.solution}</p></Section>

          {p.metrics.length > 0 && (
            <ul className={s.metrics}>
              {p.metrics.map(([v, l]) => (
                <li key={l}><strong>{v}</strong><span>{l}</span></li>
              ))}
            </ul>
          )}

          <Section title="Architecture">
            <ol className={s.arch}>
              {p.architecture.map((a) => <li key={a}>{a}</li>)}
            </ol>
          </Section>

          <Section title="Features">
            <dl className={s.features}>
              {p.features.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </Section>

          <Section title="Technologies">
            <dl className={s.stack}>
              {Object.entries(p.stack).map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v.join(' · ')}</dd></div>
              ))}
            </dl>
          </Section>

          <Section title="Challenges">
            <ul className={s.bullets}>
              {p.challenges.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </Section>

          {(p.repo || p.demo) && (
            <footer className={s.links}>
              {p.demo && <a href={p.demo} target="_blank" rel="noopener">Live demo ↗</a>}
              {p.repo && <a href={p.repo} target="_blank" rel="noopener">GitHub ↗</a>}
            </footer>
          )}
        </article>
      )}
    </dialog>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={s.section}>
      <h3 className={s.h3}>{title}</h3>
      {children}
    </section>
  );
}
