'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CHAPTERS } from '@/data/chapters';
import { LINKS, PROFILE } from '@/data/site';
import type { Project } from '@/data/types';
import Cover from './Cover';
import Plate from './Plate';
import ChapterBody from './Chapters';
import ProjectDialog from './ProjectDialog';
import s from './Book.module.css';

const OPENED_KEY = 'book-opened';
const AUTO_OPEN_MS = 2400;
const OPEN_ANIM_MS = 1000;

function safeSession(fn: () => void) {
  try { fn(); } catch { /* private mode / blocked storage */ }
}

export default function Book() {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed');
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [turns, setTurns] = useState(0);
  const [project, setProject] = useState<Project | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const [autoOpen, setAutoOpen] = useState(true);
  const pageRef = useRef<HTMLElement>(null);
  const indexRef = useRef(0);
  indexRef.current = index;
  const touch = useRef<{ x: number; y: number } | null>(null);

  const open = useCallback((instant = false) => {
    safeSession(() => sessionStorage.setItem(OPENED_KEY, '1'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (instant || reduce) return setPhase('open');
    setPhase((p) => (p === 'closed' ? 'opening' : p));
    setTimeout(() => setPhase('open'), OPEN_ANIM_MS);
  }, []);

  const go = useCallback((next: number, focus = true) => {
    const i = Math.max(0, Math.min(CHAPTERS.length - 1, next));
    const cur = indexRef.current;
    if (i !== cur) {
      setDir(i > cur ? 1 : -1);
      setTurns((t) => t + 1);
      setIndex(i);
    }
    history.replaceState(null, '', `#${CHAPTERS[i].id}`);
    setTocOpen(false);
    if (focus) requestAnimationFrame(() => pageRef.current?.focus({ preventScroll: true }));
    window.scrollTo({ top: 0 });
  }, []);

  const goTo = useCallback(
    (id: string) => {
      const i = CHAPTERS.findIndex((c) => c.id === id);
      if (i < 0) return;
      open(true);
      go(i);
    },
    [go, open],
  );

  const closeBook = useCallback(() => {
    setAutoOpen(false);
    setIndex(0);
    setTurns(0);
    history.replaceState(null, '', location.pathname);
    setPhase('closed');
  }, []);

  // Deep links and return visits land on an already-open book.
  useEffect(() => {
    const fromHash = CHAPTERS.findIndex((c) => `#${c.id}` === location.hash);
    let seen = false;
    safeSession(() => { seen = sessionStorage.getItem(OPENED_KEY) === '1'; });
    if (fromHash >= 0) { setIndex(fromHash); open(true); }
    else if (seen) open(true);

    const onHash = () => {
      const i = CHAPTERS.findIndex((c) => `#${c.id}` === location.hash);
      if (i >= 0) { open(true); go(i, false); }
    };
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, [go, open]);

  // The cover never blocks: it opens by itself.
  useEffect(() => {
    if (phase !== 'closed' || !autoOpen) return;
    const t = setTimeout(() => open(), AUTO_OPEN_MS);
    return () => clearTimeout(t);
  }, [phase, autoOpen, open]);

  // Each chapter starts at the top of its page.
  useEffect(() => { pageRef.current?.scrollTo({ top: 0 }); }, [index]);

  // Arrow keys turn pages.
  useEffect(() => {
    if (phase !== 'open') return;
    const onKey = (e: KeyboardEvent) => {
      if (project || e.altKey || e.ctrlKey || e.metaKey) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'Escape') setTocOpen(false);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [phase, index, project, go]);

  if (phase !== 'open') {
    return (
      <Cover
        opening={phase === 'opening'}
        onOpen={() => open()}
        onContact={() => goTo('next')}
      />
    );
  }

  const chapter = CHAPTERS[index];
  const prev = CHAPTERS[index - 1];
  const next = CHAPTERS[index + 1];

  return (
    <div className={s.shell}>
      <header className={s.bar}>
        <button className={s.brand} onClick={() => go(0)}>
          <span className={s.brandName}>{PROFILE.name}</span>
          <span className={s.brandRole}>{PROFILE.role}</span>
        </button>
        <nav className={s.barNav} aria-label="Site">
          <div className={s.toc}>
            <button
              className={s.barLink}
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
                      aria-current={i === index ? 'page' : undefined}
                      onClick={(e) => { e.preventDefault(); go(i); }}
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
          <a className={s.barLink} href={LINKS.resume} target="_blank" rel="noopener">
            Resume
          </a>
          <a
            className={`${s.barLink} ${s.barCta}`}
            href="#next"
            onClick={(e) => { e.preventDefault(); go(CHAPTERS.length - 1); }}
          >
            Contact
          </a>
        </nav>
      </header>

      <main
        className={s.stage}
        onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchEnd={(e) => {
          const t0 = touch.current;
          touch.current = null;
          if (!t0) return;
          const dx = e.changedTouches[0].clientX - t0.x;
          const dy = e.changedTouches[0].clientY - t0.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <div className={s.book}>
          <div className={s.pageLeft}>
            <div key={`plate-${index}`} className={s.turnIn} data-dir={dir}>
              <Plate chapter={chapter} />
            </div>
            <span className={s.folio}>{index * 2 + 1}</span>
          </div>
          <div className={s.spine} aria-hidden="true" />
          <article
            ref={pageRef}
            tabIndex={-1}
            className={s.pageRight}
            aria-labelledby={`h-${chapter.id}`}
          >
            <div key={`page-${index}`} className={s.turnIn} data-dir={dir}>
              <header className={s.chapterHead}>
                <p className={s.chapterNum}>Chapter {chapter.numeral}</p>
                <h1 id={`h-${chapter.id}`} className={s.chapterTitle}>{chapter.title}</h1>
                <p className={s.chapterSub}>{chapter.subtitle}</p>
                <span className={s.flourish} aria-hidden="true" />
              </header>
              <ChapterBody id={chapter.id} onOpenProject={setProject} onClose={closeBook} />
            </div>
            <span className={`${s.folio} ${s.folioRight}`}>{index * 2 + 2}</span>
          </article>
          {turns > 0 && <div key={turns} className={s.sheet} data-dir={dir} aria-hidden="true" />}
        </div>

        <nav className={s.pager} aria-label="Chapters">
          <button className={s.turn} onClick={() => go(index - 1)} disabled={!prev}>
            <span aria-hidden="true">←</span>
            <span className={s.turnLabel}>{prev ? prev.title : 'Beginning'}</span>
          </button>
          <ol className={s.ribbon}>
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <button
                  className={s.ribbonMark}
                  aria-current={i === index ? 'step' : undefined}
                  aria-label={`Chapter ${c.numeral}: ${c.title} (${c.label})`}
                  onClick={() => go(i)}
                >
                  {c.numeral}
                </button>
              </li>
            ))}
          </ol>
          <button className={s.turn} onClick={() => go(index + 1)} disabled={!next}>
            <span className={s.turnLabel}>{next ? next.title : 'The end'}</span>
            <span aria-hidden="true">→</span>
          </button>
        </nav>
      </main>

      <ProjectDialog project={project} onClose={() => setProject(null)} />
    </div>
  );
}
