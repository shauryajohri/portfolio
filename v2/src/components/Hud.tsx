'use client';

import { useEffect, useState } from 'react';
import { CHAPTERS } from '@/data/chapters';
import { LINKS, PROFILE } from '@/data/site';
import type { Stage } from './Experience';
import s from './Hud.module.css';

interface Props {
  stage: Stage;
  index: number;
  go: (i: number) => void;
  onRead: () => void;
  onLookUp: () => void;
  onLeave: () => void;
}

/* The always-there bar: who this is, where the book is, resume, contact. */
export default function Hud({ stage, index, go, onRead, onLookUp, onLeave }: Props) {
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    if (!tocOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setTocOpen(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [tocOpen]);

  const pick = (i: number) => { setTocOpen(false); go(i); };

  return (
    <header className={s.bar} data-stage={stage}>
      <button className={s.brand} onClick={() => pick(0)}>
        <span className={s.brandName}>{PROFILE.name}</span>
        <span className={s.brandRole}>{PROFILE.role}</span>
      </button>

      <nav className={s.nav} aria-label="Site">
        {stage === 'book' && (
          <button className={s.link} onClick={onLookUp}>
            <span aria-hidden="true">↑ </span>Look up
          </button>
        )}
        {(stage === 'view' || stage === 'intro') && (
          <button className={s.link} onClick={onRead} aria-label="Read the book">
            <span aria-hidden="true">↓ </span>Read<span className={s.wide}> the book</span>
          </button>
        )}
        {stage === 'universe' && (
          <button className={s.link} onClick={onLeave}>
            <span aria-hidden="true">← </span>Balcony
          </button>
        )}

        <div className={s.toc}>
          <button
            className={s.link}
            aria-expanded={tocOpen}
            aria-controls="toc"
            onClick={() => setTocOpen((o) => !o)}
          >
            Contents
          </button>
          {tocOpen && (
            <ol id="toc" className={s.tocList}>
              {CHAPTERS.map((c, i) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    aria-current={stage === 'book' && i === index ? 'page' : undefined}
                    onClick={(e) => { e.preventDefault(); pick(i); }}
                  >
                    <span className={s.tocNum}>{c.numeral}</span>
                    <span>{c.title}</span>
                    <span className={s.tocLabel}>{c.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          )}
        </div>

        <a className={s.link} href={LINKS.resume} target="_blank" rel="noopener">
          Resume
        </a>
        <a
          className={`${s.link} ${s.cta}`}
          href="#next"
          onClick={(e) => { e.preventDefault(); pick(CHAPTERS.length - 1); }}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
