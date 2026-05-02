'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { clickCursor, delay, hideCursor, moveCursor, relPos, revealElement } from './demoHelpers';
import { DemoStep, PatternDemoShell, StepProps } from './PatternDemoShell';
import { useAutoPlay } from './useAutoPlay';

const STEPS_LABELS = ['Basics', 'Details', 'Team', 'Review', 'Submit'];

// ─── Shared ───────────────────────────────────────────────────────────────────

const cardCls = 'min-w-[240px] rounded-xl border border-black/[0.08] bg-white p-4';

// Counter that animates in on each page change
function PageCounter({ page }: { page: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
      );
    }
  }, [page]);

  return (
    <span ref={ref} className="text-[10px] font-medium tabular-nums text-zinc-500">
      Page {page} of 5
    </span>
  );
}

// ─── Step 1: Progress bar (anti-pattern) ──────────────────────────────────────

function ProgressBarStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useAutoPlay(async isCancelled => {
    await delay(400);
    const wrapper = wrapperRef.current;
    const bar = barRef.current;
    if (!wrapper || !bar || isCancelled()) return;

    // Cursor hovers over the progress bar
    await moveCursor(cursorRef, ...(Object.values(relPos(bar, wrapper)) as [number, number]));
    if (isCancelled()) return;
    await delay(400);

    // Callout slides in — "How many steps left?"
    await revealElement(tooltipRef.current);
    await delay(1200);

    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  return (
    <div className={cardCls}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-900">Basic Information</span>
      </div>
      <div className="relative">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
          <div ref={barRef} className="h-full w-[40%] rounded-full bg-zinc-400" />
        </div>
        <div
          ref={tooltipRef}
          className="absolute -right-1 top-4 whitespace-nowrap rounded-lg border border-black/[0.1] bg-white px-2.5 py-1.5 shadow-sm"
          style={{ opacity: 0 }}
        >
          <span className="text-[10px] text-zinc-500">How many steps left?</span>
        </div>
      </div>
      <p className="mt-4 text-[10px] text-zinc-400">Old pattern</p>
    </div>
  );
}

// ─── Step 2: Page numbers (good pattern) ──────────────────────────────────────

function PageNumberStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const [page, setPage] = useState(2);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useAutoPlay(async isCancelled => {
    await delay(400);
    const wrapper = wrapperRef.current;
    const button = buttonRef.current;
    if (!wrapper || !button || isCancelled()) return;

    // Click Next twice — counter advances visibly
    for (let i = 0; i < 2; i++) {
      if (isCancelled()) return;
      await moveCursor(cursorRef, ...(Object.values(relPos(button, wrapper)) as [number, number]));
      await clickCursor(cursorRef);
      setPage(p => p + 1);
      await delay(700);
    }

    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  return (
    <div className={cardCls}>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-900">Basic Information</span>
        <PageCounter page={page} />
      </div>
      <button
        ref={buttonRef}
        className="w-full rounded-lg border border-black/[0.13] bg-white px-4 py-2 text-sm text-zinc-700 hover:border-zinc-400"
      >
        Next →
      </button>
    </div>
  );
}

// ─── Step 3: Named steps (best) ───────────────────────────────────────────────

function NamedStepsStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const [page, setPage] = useState(2);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useAutoPlay(async isCancelled => {
    await delay(400);
    const wrapper = wrapperRef.current;
    const button = buttonRef.current;
    if (!wrapper || !button || isCancelled()) return;

    // Pills slide in
    await revealElement(pillsRef.current);
    await delay(400);

    // Click Next twice — counter + pill highlight both animate
    for (let i = 0; i < 2; i++) {
      if (isCancelled()) return;
      await moveCursor(cursorRef, ...(Object.values(relPos(button, wrapper)) as [number, number]));
      await clickCursor(cursorRef);
      setPage(p => {
        const next = p + 1;
        const pill = pillRefs.current[next - 1];
        if (pill)
          gsap.fromTo(pill, { scale: 0.88 }, { scale: 1, duration: 0.22, ease: 'back.out(2)' });
        return next;
      });
      await delay(700);
    }

    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  return (
    <div className={cardCls}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-900">Basic Information</span>
        <PageCounter page={page} />
      </div>
      <div ref={pillsRef} className="mb-4 flex flex-wrap gap-1" style={{ opacity: 0 }}>
        {STEPS_LABELS.map((label, i) => (
          <span
            key={label}
            ref={el => {
              pillRefs.current[i] = el;
            }}
            className={`rounded-full px-2 py-0.5 text-[9px] font-medium transition-colors ${
              i === page - 1 ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      <button
        ref={buttonRef}
        className="w-full rounded-lg border border-black/[0.13] bg-white px-4 py-2 text-sm text-zinc-700 hover:border-zinc-400"
      >
        Next →
      </button>
    </div>
  );
}

// ─── Demo definition ──────────────────────────────────────────────────────────

const PAGINATION_STEPS: DemoStep[] = [
  { label: 'Progress bar', component: ProgressBarStep },
  { label: 'Page numbers', component: PageNumberStep },
  { label: 'Named steps', component: NamedStepsStep },
];

export function PaginationDemo() {
  return <PatternDemoShell steps={PAGINATION_STEPS} />;
}
