'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import OniKatana from './OniKatana';
import Petals from './Petals';
import { buildScript, CUE, type Beat } from './script';
import styles from './Prologue.module.css';

const SEEN_KEY = 'sj:prologue-seen';

const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t * t;
const span = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

/** rise → hold → fall, in real time rather than scroll position */
function envelope(now: number, beat: Beat, fade = 800) {
  if (now < beat.at) return 0;
  const end = beat.at + beat.hold;
  if (now > end + fade) return 0;
  if (now < beat.at + fade) return easeOut((now - beat.at) / fade);
  if (now > end) return 1 - easeIn((now - end) / fade);
  return 1;
}

export default function Prologue({ onComplete }: { onComplete?: () => void }) {
  const [active, setActive] = useState(false);
  const [script] = useState(() => buildScript());

  const stageRef = useRef<HTMLDivElement>(null);
  const katanaRef = useRef<HTMLDivElement>(null);
  const cutRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    cancelAnimationFrame(rafRef.current);
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* private mode — replaying the intro is an acceptable fallback */
    }
    document.body.classList.remove('intro-locked');
    setActive(false);
    onComplete?.();
  }, [onComplete]);

  /* decide whether to play at all */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    /* ?intro=0 never plays it, ?intro=1 always replays it (dev escape hatch) */
    const forced = params.get('intro');
    if (forced === '0') {
      onComplete?.();
      return;
    }

    if (forced !== '1') {
      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === '1';
      } catch {
        /* ignore */
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (seen || reduced) {
        onComplete?.();
        return;
      }
    }

    setActive(true);
    document.body.classList.add('intro-locked');
  }, [onComplete]);

  /* the sequence */
  useEffect(() => {
    if (!active) return;

    const topBeats = Array.from(topRef.current?.children ?? []) as HTMLElement[];
    const botBeats = Array.from(botRef.current?.children ?? []) as HTMLElement[];

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const t = ts - startRef.current;

      /* text */
      script.beats.forEach((beat, idx) => {
        const jpO = envelope(t, beat);
        const enO = envelope(t - 260, beat);

        const jpEl = topBeats[idx];
        const enEl = botBeats[idx];
        if (jpEl) {
          jpEl.style.opacity = String(jpO);
          jpEl.style.transform = `translateY(${(1 - jpO) * 16}px)`;
          jpEl.style.filter = `blur(${(1 - jpO) * 5}px)`;
        }
        if (enEl) {
          enEl.style.opacity = String(enO);
          enEl.style.transform = `translateY(${(1 - enO) * -14}px)`;
          enEl.style.filter = `blur(${(1 - enO) * 4}px)`;
        }
      });

      /* blade */
      const enter = easeOut(span(t, CUE.bladeIn, CUE.bladeIn + CUE.bladeInDur));
      const strike = span(t, CUE.slash, CUE.slash + CUE.slashDur);
      const drift = Math.sin(t / 900) * 1.1;
      const x = -64 + enter * 64 + easeIn(strike) * 150;
      const rot = (1 - enter) * -3.2 + strike * 2.6 + drift * 0.1;
      const ignite = span(t, CUE.igniteStart, CUE.igniteStart + CUE.igniteDur);

      if (katanaRef.current) {
        katanaRef.current.style.transform = `translate(calc(-50% + ${x}%), calc(-50% + ${drift}px)) rotate(${rot}deg)`;
        katanaRef.current.style.opacity = String(
          enter * (1 - span(t, CUE.slash + 150, CUE.slash + 400))
        );
        katanaRef.current.style.filter = `drop-shadow(0 0 ${
          14 + (0.35 + enter * 0.65 + ignite) * 26
        }px rgba(168,72,255,${0.45 * (0.4 + ignite)})) drop-shadow(0 0 ${
          40 * (0.4 + ignite)
        }px rgba(255,46,136,0.28))`;
      }

      /* the SVG reads --ignite directly, so the cutscene never re-renders React */
      stageRef.current?.style.setProperty('--ignite', ignite.toFixed(3));

      /* the cut */
      const cut = easeOut(span(t, CUE.slash + 40, CUE.slash + CUE.slashDur));
      if (cutRef.current) {
        cutRef.current.style.transform = `translate(-50%,-50%) scaleX(${cut})`;
        cutRef.current.style.opacity = String(cut * (1 - span(t, CUE.end - 900, CUE.end)));
      }

      /* the world opens */
      const split = easeIn(span(t, CUE.split, CUE.split + CUE.splitDur));
      stageRef.current?.style.setProperty('--split', split.toFixed(4));

      if (t >= CUE.end) {
        finish();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, script, finish]);

  /* escape skips */
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, finish]);

  if (!active) return null;

  return (
    <div ref={stageRef} className={styles.stage} role="presentation">
      <div
        className={`${styles.curtain} ${styles.curtainTop}`}
        style={{ transform: 'translateY(calc(var(--split, 0) * -105%))' }}
      />
      <div
        className={`${styles.curtain} ${styles.curtainBot}`}
        style={{ transform: 'translateY(calc(var(--split, 0) * 105%))' }}
      />

      <Petals className={styles.petals} />
      <div className={styles.vignette} style={{ opacity: 'calc(1 - var(--split, 0))' }} />

      <div className={styles.content}>
        <div className={styles.top} ref={topRef}>
          {script.beats.map((b, i) => (
            <div className={styles.beat} key={`jp-${i}`}>
              <span className={`${styles.jp} ${b.latinTop ? styles.jpLatin : ''}`}>{b.jp}</span>
            </div>
          ))}
        </div>

        <div className={styles.lane}>
          <div ref={cutRef} className={styles.cut} />
          <div ref={katanaRef} className={styles.katana}>
            <OniKatana />
          </div>
        </div>

        <div className={styles.bot} ref={botRef}>
          {script.beats.map((b, i) => (
            <div className={styles.beat} key={`en-${i}`}>
              <span className={`${styles.en} ${b.big ? styles.enBig : ''}`}>{b.en}</span>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className={styles.skip} onClick={finish}>
        Skip intro
      </button>
    </div>
  );
}
