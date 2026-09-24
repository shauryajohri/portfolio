'use client';

import { useState } from 'react';
import { PROJECTS, TALES, UNWRITTEN, WORLDS } from '@/data/projects';
import { ACHIEVEMENTS, FORGE, LINKS, PROFILE, TIMELINE, UNKNOWN } from '@/data/site';
import type { Project } from '@/data/types';
import s from './Book.module.css';

interface Props {
  id: string;
  onOpenProject: (p: Project) => void;
  onClose: () => void;
}

export default function ChapterBody({ id, onOpenProject, onClose }: Props) {
  switch (id) {
    case 'prologue': return <Prologue />;
    case 'forge': return <Forge />;
    case 'creations': return <Creations onOpen={onOpenProject} />;
    case 'trials': return <Trials />;
    case 'unknown': return <Unknown onOpen={onOpenProject} />;
    case 'next': return <NextChapter onClose={onClose} />;
    default: return null;
  }
}

/* ── I · Prologue ─────────────────────────────────────────── */

function Prologue() {
  return (
    <div className={s.body}>
      <p className={s.epigraph}>“{PROFILE.philosophy}”</p>
      <p className={s.lead}>
        <span className={s.dropcap}>{PROFILE.intro[0]}</span>
        {PROFILE.intro.slice(1)}
      </p>
      {PROFILE.education && <p className={s.meta}>{PROFILE.education}</p>}

      <h2 className={s.h2}>The Beginning</h2>
      {PROFILE.beginning.map((p) => <p key={p}>{p}</p>)}
      <p>{PROFILE.motivation}</p>
      <p>{PROFILE.aspiration}</p>
    </div>
  );
}

/* ── II · The Forge ───────────────────────────────────────── */

/** Projects whose stack lists this tool — the evidence behind each skill. */
function forgedIn(tool: string) {
  const t = tool.toLowerCase();
  return PROJECTS.filter(
    (p) => p.status !== 'plan' &&
      Object.values(p.stack).flat().some((x) => x.toLowerCase() === t),
  ).map((p) => p.name);
}

function Forge() {
  const [active, setActive] = useState(0);
  const cat = FORGE[active];
  return (
    <div className={s.body}>
      <p>These are the tools forged through building — each one listed beside the work it was used in.</p>
      <div className={s.tabs} role="tablist" aria-label="Skill categories">
        {FORGE.map((c, i) => (
          <button
            key={c.name}
            role="tab"
            id={`tab-${i}`}
            aria-selected={i === active}
            aria-controls="forge-panel"
            className={s.tab}
            onClick={() => setActive(i)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div id="forge-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className={s.forgePanel}>
        <p className={s.meta}>{cat.note}</p>
        <ul className={s.index}>
          {cat.tools.map((tool) => {
            const where = forgedIn(tool);
            return (
              <li key={tool}>
                <span className={s.indexTerm}>{tool}</span>
                <span className={s.indexDots} aria-hidden="true" />
                <span className={s.indexRef}>{where.length ? where.join(', ') : '—'}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ── III · The Creations ──────────────────────────────────── */

function Creations({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div className={s.body}>
      {WORLDS.map((p) => (
        <section key={p.id} className={s.world} aria-labelledby={`w-${p.id}`}>
          <p className={s.scene}>{p.scene}</p>
          <h2 id={`w-${p.id}`} className={s.worldName}>{p.name}</h2>
          <p className={s.meta}>{p.category} · <Status p={p} /></p>
          <p>{p.tagline}</p>
          <button className={s.readMore} onClick={() => onOpen(p)}>
            Read the full record <span aria-hidden="true">→</span>
          </button>
        </section>
      ))}

      <h2 className={s.h2}>Lesser Tales</h2>
      <ul className={s.tales}>
        {TALES.map((p) => (
          <li key={p.id}>
            <button className={s.tale} onClick={() => onOpen(p)}>
              <span className={s.taleName}>{p.name}</span>
              <span className={s.meta}>{p.category}</span>
              <span className={s.taleLine}>{p.tagline}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Status({ p }: { p: Project }) {
  return <span className={s.status} data-status={p.status}>{p.statusLabel}</span>;
}

/* ── IV · The Trials ──────────────────────────────────────── */

function Trials() {
  return (
    <div className={s.body}>
      <ol className={s.path}>
        {TIMELINE.map((t) => (
          <li key={t.year + t.title} className={s.waystone}>
            <span className={s.year}>{t.year}</span>
            <h3 className={s.h3}>{t.title}</h3>
            <p>{t.body}</p>
          </li>
        ))}
      </ol>

      <h2 className={s.h2}>Landmarks</h2>
      <ul className={s.landmarks}>
        {ACHIEVEMENTS.map((a) => (
          <li key={a.title}>
            <h3 className={s.h3}>{a.title}</h3>
            <p>{a.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── V · The Unknown ──────────────────────────────────────── */

function Unknown({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div className={s.body}>
      <h2 className={s.h2}>Currently building</h2>
      <p>{UNKNOWN.building}</p>

      <h2 className={s.h2}>Research</h2>
      <p>{UNKNOWN.research}</p>

      <h2 className={s.h2}>Future goals</h2>
      <ul className={s.list}>
        {UNKNOWN.goals.map((g) => <li key={g}>{g}</li>)}
      </ul>

      <h2 className={s.h2}>Ideas in the vault</h2>
      <ul className={s.tales}>
        {UNWRITTEN.map((p) => (
          <li key={p.id}>
            <button className={`${s.tale} ${s.sealed}`} onClick={() => onOpen(p)}>
              <span className={s.taleName}>{p.name}</span>
              <span className={s.meta}>{p.category} · <Status p={p} /></span>
              <span className={s.taleLine}>{p.tagline}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── VI · The Next Chapter ────────────────────────────────── */

function NextChapter({ onClose }: { onClose: () => void }) {
  const actions = [
    { label: 'Email', value: LINKS.email, href: `mailto:${LINKS.email}` },
    LINKS.linkedin && { label: 'LinkedIn', value: 'Connect', href: LINKS.linkedin },
    { label: 'GitHub', value: LINKS.github.replace('https://', ''), href: LINKS.github },
    { label: 'Resume', value: 'Download PDF', href: LINKS.resume },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <div className={s.body}>
      <p className={s.lead}>
        {PROFILE.status}. Email is the fastest way to reach me.
      </p>
      <ul className={s.contact}>
        {actions.map((a) => (
          <li key={a.label}>
            <a
              href={a.href}
              {...(a.href.startsWith('http') || a.href.endsWith('.pdf')
                ? { target: '_blank', rel: 'noopener' }
                : {})}
            >
              <span className={s.contactLabel}>{a.label}</span>
              <span className={s.contactValue}>{a.value}</span>
              <span aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
      <p className={s.epigraph}>Let’s build what’s next.</p>
      <button className={s.readMore} onClick={onClose}>Close the book</button>
    </div>
  );
}
