'use client';

import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  s: number;
  vy: number;
  vx: number;
  a: number;
  va: number;
  o: number;
  sw: number;
}

export default function Petals({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let petals: Petal[] = [];
    let raf = 0;

    const spawn = (y?: number): Petal => ({
      x: Math.random() * w,
      y: y === undefined ? Math.random() * h : y,
      s: 4 + Math.random() * 7,
      vy: 0.22 + Math.random() * 0.55,
      vx: -0.18 - Math.random() * 0.42,
      a: Math.random() * Math.PI * 2,
      va: (Math.random() - 0.5) * 0.02,
      o: 0.16 + Math.random() * 0.42,
      sw: 0.5 + Math.random() * 1.4,
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      petals = Array.from({ length: w < 720 ? 26 : 52 }, () => spawn());
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.008) * p.sw * 0.5;
        p.a += p.va;

        if (p.y - p.s > h || p.x + p.s < 0) {
          Object.assign(p, spawn(-20));
          p.x = Math.random() * (w + 200);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        ctx.scale(1, 0.72 + Math.sin(p.a) * 0.28);

        const g = ctx.createLinearGradient(0, -p.s, 0, p.s);
        g.addColorStop(0, `rgba(255,190,225,${p.o})`);
        g.addColorStop(1, `rgba(186,104,255,${p.o * 0.55})`);
        ctx.fillStyle = g;

        ctx.beginPath();
        ctx.moveTo(0, -p.s * 0.5);
        ctx.bezierCurveTo(p.s * 0.62, -p.s * 0.28, p.s * 0.5, p.s * 0.42, 0, p.s * 0.6);
        ctx.bezierCurveTo(-p.s * 0.5, p.s * 0.42, -p.s * 0.62, -p.s * 0.28, 0, -p.s * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
