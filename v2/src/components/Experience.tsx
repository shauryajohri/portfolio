'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { CHAPTERS } from '@/data/chapters';
import { PLACES } from '@/data/view';
import type { Project } from '@/data/types';
import Scene from './scene/Scene';
import Book from './book/Book';
import ProjectDialog from './book/ProjectDialog';
import Universe from './universe/Universe';
import Hud from './Hud';
import s from './Experience.module.css';

/* ============================================================
   The whole experience is one of four stages:
     intro    — eyes opening on the balcony (first visit only)
     view     — looking out at the kingdom
     book     — looking down at the book on the table
     universe — inside a project's world
   The camera is CSS, driven by data-stage on the root.
   ============================================================ */

export type Stage = 'intro' | 'view' | 'book' | 'universe';

const INTRO_KEY = 'intro-seen';
const EYES_OPEN_MS = 2300;  // eyelids finish → the view
const LOOK_DOWN_MS = 3400;  // the camera tilts down to the book

function safeSession(fn: () => void) {
  try { fn(); } catch { /* private mode / blocked storage */ }
}

export default function Experience() {
  const [stage, setStageState] = useState<Stage>('intro');
  const [opened, setOpened] = useState(false);
  const [instant, setInstant] = useState(false);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [turns, setTurns] = useState(0);
  const [record, setRecord] = useState<Project | null>(null);
  const [world, setWorld] = useState<Project | null>(null);

  const stageRef = useRef<Stage>('intro');
  const indexRef = useRef(0);
  const returnTo = useRef<'view' | 'book'>('book');
  const pageRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  indexRef.current = index;

  const setStage = useCallback((next: Stage) => {
    stageRef.current = next;
    setStageState(next);
  }, []);

  const read = useCallback(() => {
    setStage('book');
    setOpened(true);
    requestAnimationFrame(() => pageRef.current?.focus({ preventScroll: true }));
  }, [setStage]);

  const lookUp = useCallback(() => {
    setRecord(null);
    setStage('view');
  }, [setStage]);

  const go = useCallback((next: number) => {
    const i = Math.max(0, Math.min(CHAPTERS.length - 1, next));
    const cur = indexRef.current;
    if (i !== cur) {
      setDir(i > cur ? 1 : -1);
      // only animate a page turn when the book is already in front of us
      if (stageRef.current === 'book') setTurns((t) => t + 1);
      setIndex(i);
    }
    history.replaceState(null, '', `#${CHAPTERS[i].id}`);
    setRecord(null);
    if (stageRef.current !== 'book') read();
    else requestAnimationFrame(() => pageRef.current?.focus({ preventScroll: true }));
  }, [read]);

  const enter = useCallback((p: Project) => {
    setRecord(null);
    returnTo.current = stageRef.current === 'view' ? 'view' : 'book';
    setWorld(p);
    setStage('universe');
  }, [setStage]);

  const leave = useCallback(() => {
    const back = returnTo.current;
    setStage(back);
    if (back === 'book') requestAnimationFrame(() => pageRef.current?.focus({ preventScroll: true }));
  }, [setStage]);

  // First visit: eyes open, look out, look down. Return visits,
  // deep links and reduced motion go straight to the open book.
  useEffect(() => {
    const fromHash = CHAPTERS.findIndex((c) => `#${c.id}` === location.hash);
    if (fromHash >= 0) setIndex(fromHash);
    let seen = false;
    safeSession(() => { seen = sessionStorage.getItem(INTRO_KEY) === '1'; });
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seen || reduce || fromHash >= 0) {
      setInstant(true);
      setStage('book');
      setOpened(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
      return;
    }
    safeSession(() => sessionStorage.setItem(INTRO_KEY, '1'));
    const t1 = setTimeout(() => { if (stageRef.current === 'intro') setStage('view'); }, EYES_OPEN_MS);
    const t2 = setTimeout(() => { if (stageRef.current === 'view') read(); }, LOOK_DOWN_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [read, setStage]);

  // Chapter links in the address bar.
  useEffect(() => {
    const onHash = () => {
      const i = CHAPTERS.findIndex((c) => `#${c.id}` === location.hash);
      if (i >= 0) go(i);
    };
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, [go]);

  // Each chapter starts at the top of its page.
  useEffect(() => {
    pageRef.current?.scrollTo({ top: 0 });
    frameRef.current?.scrollTo({ top: 0 });
  }, [index]);

  // Keyboard: ← → turn pages, ↑ look up, ↓ read, Esc leaves a universe.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (record || e.altKey || e.ctrlKey || e.metaKey) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const st = stageRef.current;
      if (st === 'intro') return read();
      if (st === 'book') {
        if (e.key === 'ArrowRight') go(indexRef.current + 1);
        if (e.key === 'ArrowLeft') go(indexRef.current - 1);
        // ↑ at the top of the page lifts your eyes from the book
        const atTop = (frameRef.current?.scrollTop ?? 0) === 0 && (pageRef.current?.scrollTop ?? 0) === 0;
        if (e.key === 'ArrowUp' && atTop) lookUp();
      }
      if (st === 'view' && (e.key === 'ArrowDown' || e.key === 'Enter')) read();
      if (st === 'universe' && e.key === 'Escape') leave();
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [record, go, read, lookUp, leave]);

  const place = world ? PLACES[world.id] : undefined;
  const style = { '--fx': place?.x ?? 50, '--fy': place?.y ?? 30 } as CSSProperties;

  return (
    <div
      className={s.experience}
      data-stage={stage}
      data-instant={instant || undefined}
      style={style}
      onPointerDown={stage === 'intro' ? read : undefined}
    >
      <Scene />

      <div className={s.bookLayer}>
        <div className={s.tableBook} onClick={stage === 'view' ? read : undefined}>
          <main ref={frameRef} className={s.frame} inert={stage !== 'book'}>
            <Book
              index={index}
              dir={dir}
              turns={turns}
              opened={opened}
              pageRef={pageRef}
              go={go}
              onOpenProject={setRecord}
              onEnter={enter}
              onLookUp={lookUp}
            />
          </main>
        </div>
      </div>

      {stage === 'universe' && world && <Universe project={world} onLeave={leave} />}

      {stage === 'intro' && (
        <div className={s.eyelids} aria-hidden="true">
          <span className={s.lidTop} />
          <span className={s.lidBottom} />
        </div>
      )}

      <Hud stage={stage} index={index} go={go} onRead={read} onLookUp={lookUp} onLeave={leave} />
      <ProjectDialog project={record} onClose={() => setRecord(null)} onEnter={enter} />
    </div>
  );
}
