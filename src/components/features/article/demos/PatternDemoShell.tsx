'use client';

import gsap from 'gsap';
import { useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DemoStep {
  /** Label shown in the tab pill */
  label: string;
  /** The step component. Receives shared refs and calls onDone when finished. */
  component: React.ComponentType<StepProps>;
}

export interface StepProps {
  /** The wrapper div that contains both the cursor and the demo UI. */
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  /** The fake cursor div — passed down so scripts can animate it. */
  cursorRef: React.RefObject<HTMLDivElement | null>;
  /** Call this when the step's animation sequence is complete. */
  onDone: () => void;
}

interface PatternDemoShellProps {
  steps: DemoStep[];
}

// ─── Fake cursor ──────────────────────────────────────────────────────────────

function Cursor({ cursorRef }: { cursorRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={cursorRef}
      className="pointer-events-none absolute z-50 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 opacity-0 shadow-md ring-2 ring-white"
      style={{ top: 0, left: 0 }}
    />
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export function PatternDemoShell({ steps }: PatternDemoShellProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [key, setKey] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const goTo = (nextIdx: number, animate = true) => {
    if (nextIdx === activeIdx && animate) return;

    if (tabsRef.current) {
      const pills = tabsRef.current.querySelectorAll('button');
      const pill = pills[nextIdx];
      if (pill)
        gsap.fromTo(pill, { scale: 0.9 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
    }

    if (animate) {
      const card = cardRef.current;
      const demo = demoRef.current;

      // Lock the card to its current pixel height so the surrounding layout
      // never sees a reflow while the step content is swapped out.
      if (card) {
        card.style.height = `${card.offsetHeight}px`;
        card.style.overflow = 'hidden';
      }

      gsap.to(demo, {
        opacity: 0,
        duration: 0.18,
        onComplete: () => {
          setActiveIdx(nextIdx);
          setKey(k => k + 1);

          // After React renders the new step, animate the card to its new
          // natural height, then release the lock.
          requestAnimationFrame(() => {
            if (!card || !demo) return;
            const newHeight = card.scrollHeight;
            gsap.to(card, {
              height: newHeight,
              duration: 0.22,
              ease: 'power2.out',
              onComplete: () => {
                card.style.height = '';
                card.style.overflow = '';
              },
            });
            gsap.fromTo(demo, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'power2.out' });
          });
        },
      });
    } else {
      setActiveIdx(nextIdx);
      setKey(k => k + 1);
    }
  };

  const handleDone = () => {
    goTo((activeIdx + 1) % steps.length);
  };

  const ActiveStep = steps[activeIdx]?.component;

  return (
    <div
      ref={cardRef}
      className="min-w-[280px] rounded-2xl border border-black/[0.08] bg-[rgb(249,250,251)] p-6"
    >
      {/* Tab pills */}
      {/* <div ref={tabsRef} className="mb-5 flex flex-wrap gap-2">
        {steps.map((step, i) => (
          <button
            key={step.label}
            onClick={() => goTo(i)}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
              activeIdx === i
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-black/[0.13] bg-white text-zinc-600 hover:border-zinc-400'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div> */}

      {/* Demo area — cursor lives here so coordinates are relative to this wrapper */}
      <div ref={demoRef} className="relative w-full">
        <div ref={wrapperRef} className="relative w-full">
          <Cursor cursorRef={cursorRef} />
          {ActiveStep && (
            <ActiveStep
              key={key}
              wrapperRef={wrapperRef}
              cursorRef={cursorRef}
              onDone={handleDone}
            />
          )}
        </div>
      </div>
    </div>
  );
}
