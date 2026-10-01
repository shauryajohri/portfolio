'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { PROJECTS, canEnter } from '@/data/projects';
import { PLACES } from '@/data/view';
import type { Place } from '@/data/view';
import type { Project } from '@/data/types';
import { DragonSilhouette } from './Dragon';
import s from './Scene.module.css';

const SPOTS = PROJECTS.filter((p) => PLACES[p.id]).map((p) => ({
  p,
  place: PLACES[p.id],
  open: canEnter(p),
}));

function pos(place: Place, i = 0) {
  return { '--x': place.x, '--y': place.y, '--w': place.w, '--h': place.h, '--i': i } as CSSProperties;
}

/* The view from the balcony, as depth layers (back → front).
   The camera is CSS: each layer moves by its own amount when an
   ancestor's data-stage changes (see Scene.module.css).
   Every project in the view is a button — only reachable while
   looking out. All visuals are placeholder until the art stage. */
export default function Scene({
  onEnter,
  onPlanned,
}: {
  onEnter: (p: Project) => void;
  onPlanned: () => void;
}) {
  const [hot, setHot] = useState<string | null>(null);

  return (
    <div className={s.scene} data-hot={hot ?? undefined}>
      <div className={`${s.layer} ${s.sky}`} aria-hidden="true">
        <span className={s.clouds} />
      </div>
      <div className={`${s.layer} ${s.auraLayer}`} aria-hidden="true">
        <div className={s.aura} data-hot={hot === 'aura' || undefined} />
      </div>
      <div className={`${s.layer} ${s.far}`} aria-hidden="true" />

      <div className={`${s.layer} ${s.district}`} aria-hidden="true">
        {SPOTS.map(({ p, place, open }, i) => (
          <span key={p.id}>
            <span className={s.halo} data-hot={hot === p.id || undefined} style={pos(place)} />
            {place.shape && (
              <span
                className={s.building}
                data-shape={place.shape}
                data-lit={open || undefined}
                data-hot={hot === p.id || undefined}
                style={pos(place, i)}
              />
            )}
          </span>
        ))}
      </div>

      <div className={`${s.layer} ${s.near}`} aria-hidden="true" />

      <nav className={s.spots} aria-label="The kingdom">
        {SPOTS.map(({ p, place, open }) => (
          <button
            key={p.id}
            className={s.spot}
            style={pos(place)}
            data-label={place.y < 35 ? 'below' : place.x < 14 ? 'left' : place.x > 70 ? 'right' : undefined}
            aria-label={open ? `Enter ${p.name}` : `${p.name} — not built yet, read The Unknown`}
            onPointerEnter={() => setHot(p.id)}
            onPointerLeave={() => setHot(null)}
            onFocus={() => setHot(p.id)}
            onBlur={() => setHot(null)}
            onClick={() => (open ? onEnter(p) : onPlanned())}
          >
            <span className={s.label} aria-hidden="true">
              <strong>{p.name}</strong>
              <span>{p.category}</span>
              <em>{open ? 'Enter its world →' : 'Still being written'}</em>
            </span>
          </button>
        ))}
      </nav>

      <div className={`${s.layer} ${s.railing}`} aria-hidden="true">
        <div className={s.dragon}>
          <div className={s.dragonReact}>
            <DragonSilhouette />
          </div>
        </div>
      </div>
      <div className={`${s.layer} ${s.table}`} aria-hidden="true">
        <span className={s.lantern} />
      </div>
    </div>
  );
}
