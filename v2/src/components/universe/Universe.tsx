'use client';

import { useEffect, useRef } from 'react';
import type { Project } from '@/data/types';
import { ProjectRecord } from '../book/ProjectDialog';
import s from './Universe.module.css';

/* A project's universe. Phase A placeholder: a tinted backdrop and the
   engineering record. Phase C adds the art slot, routes and AURA's dive. */
export default function Universe({ project, onLeave }: { project: Project; onLeave: () => void }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { ref.current?.focus({ preventScroll: true }); }, [project.id]);

  return (
    <section
      ref={ref}
      tabIndex={-1}
      className={s.universe}
      data-world={project.id}
      aria-labelledby="universe-title"
    >
      <div className={s.backdrop} aria-hidden="true" />
      <div className={s.content}>
        <button className={s.back} onClick={onLeave}>
          <span aria-hidden="true">← </span>Return to the balcony
        </button>
        <p className={s.scene}>{project.scene}</p>
        <h1 id="universe-title" className={s.title}>{project.name}</h1>
        <div className={s.record}>
          <ProjectRecord project={project} />
        </div>
      </div>
    </section>
  );
}
