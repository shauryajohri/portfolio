import { LINKS, PROFILE } from '@/data/site';
import s from './Cover.module.css';

interface Props {
  opening: boolean;
  onOpen: () => void;
  onContact: () => void;
}

/* The closed book. Phase 3 replaces the CSS book with the 3D opening;
   the links below it stay, so a recruiter never has to wait. */
export default function Cover({ opening, onOpen, onContact }: Props) {
  return (
    <main className={s.scene} data-opening={opening || undefined}>
      <div className={s.book}>
        <div className={s.pages} aria-hidden="true" />
        <div className={s.glow} aria-hidden="true" />
        <button className={s.front} onClick={onOpen} aria-label="Open the book">
          <span className={s.frame} aria-hidden="true" />
          <span className={s.kicker}>The Journey of</span>
          <h1 className={s.title}>{PROFILE.name}</h1>
          <span className={s.rule} aria-hidden="true" />
          <span className={s.subtitle}>
            A developer’s tale of ideas,
            <br />
            systems and worlds yet to be built.
          </span>
        </button>
      </div>

      <div className={s.below}>
        <button className={s.open} onClick={onOpen}>
          Open the book
        </button>
        <p className={s.role}>
          {PROFILE.name} — {PROFILE.role}
        </p>
        <nav className={s.links} aria-label="Quick links">
          <a href={LINKS.resume} target="_blank" rel="noopener">Resume</a>
          <a href={LINKS.github} target="_blank" rel="noopener">GitHub</a>
          <a href="#next" onClick={(e) => { e.preventDefault(); onContact(); }}>Contact</a>
        </nav>
      </div>
    </main>
  );
}
