'use client';

import { useRef } from 'react';
import type { RefObject } from 'react';
import { CHAPTERS } from '@/data/chapters';
import { PROFILE } from '@/data/site';
import type { Project } from '@/data/types';
import ChapterBody from './Chapters';
import s from './Book.module.css';

interface Props {
  index: number;
  dir: 1 | -1;
  turns: number;
  /** Cover has been opened (stays open afterwards). */
  opened: boolean;
  pageRef: RefObject<HTMLElement | null>;
  go: (i: number) => void;
  onOpenProject: (p: Project) => void;
  onEnter: (p: Project) => void;
  onLookUp: () => void;
}

/* The book on the table. Left page: chapter opener. Right page: the
   chapter. Desktop shows the spread; under 880px it is a single page. */
export default function Book({
  index, dir, turns, opened, pageRef, go, onOpenProject, onEnter, onLookUp,
}: Props) {
  const touch = useRef<{ x: number; y: number } | null>(null);
  const chapter = CHAPTERS[index];
  const prev = CHAPTERS[index - 1];
  const next = CHAPTERS[index + 1];

  return (
    <div
      className={s.reader}
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
      <div className={s.book} data-open={opened || undefined}>
        <div className={s.pageLeft}>
          <header key={`opener-${index}`} className={`${s.opener} ${s.turnIn}`} data-dir={dir}>
            <p className={s.chapterNum}>Chapter {chapter.numeral}</p>
            <h1 id={`h-${chapter.id}`} className={s.chapterTitle}>{chapter.title}</h1>
            <p className={s.chapterSub}>{chapter.subtitle}</p>
            <span className={s.flourish} aria-hidden="true" />
            {chapter.sketch ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={s.sketch} src={chapter.sketch} alt="" />
            ) : (
              <span className={s.sketchSlot} aria-hidden="true">{chapter.numeral}</span>
            )}
            <p className={s.openerLine}>{chapter.epigraph}</p>
          </header>
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
            <ChapterBody
              id={chapter.id}
              onOpenProject={onOpenProject}
              onEnter={onEnter}
              onLookUp={onLookUp}
            />
          </div>
          <span className={`${s.folio} ${s.folioRight}`}>{index * 2 + 2}</span>
        </article>
        {turns > 0 && (
          <div key={turns} className={s.sheet} data-dir={dir} aria-hidden="true">
            <span className={s.sheetFront} />
            <span className={s.sheetBack} />
          </div>
        )}
        <div className={s.cover} aria-hidden="true">
          <span className={s.coverFrame} />
          <span className={s.coverKicker}>The Journey of</span>
          <span className={s.coverTitle}>{PROFILE.name}</span>
          <span className={s.coverRule} />
          <span className={s.coverSub}>
            A developer’s tale of ideas,
            <br />
            systems and worlds yet to be built.
          </span>
        </div>
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
    </div>
  );
}
