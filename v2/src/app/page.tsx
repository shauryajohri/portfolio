'use client';

import { useState } from 'react';
import Prologue from '@/components/prologue/Prologue';
import RestScene from '@/components/rest/RestScene';

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Prologue onComplete={() => setIntroDone(true)} />

      <main
        style={{
          opacity: introDone ? 1 : 0,
          transition: 'opacity 1.6s var(--ease)',
        }}
      >
        <RestScene>
          <div style={{ maxWidth: 560 }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>
              Between worlds
            </p>
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              Shaurya Johri
            </h1>
            <p
              style={{
                marginTop: 22,
                color: 'var(--text-2)',
                lineHeight: 1.9,
                fontSize: '1rem',
                maxWidth: 440,
              }}
            >
              Software developer and AI engineer. I build intelligent systems — and
              sometimes, entire worlds.
            </p>
          </div>
        </RestScene>
      </main>
    </>
  );
}
