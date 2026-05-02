'use client';

import gsap from 'gsap';
import { useRef, useState } from 'react';

import {
  clickCursor,
  delay,
  hideCursor,
  hideElement,
  moveCursor,
  relPos,
  revealElement,
} from './demoHelpers';
import { DemoStep, PatternDemoShell, StepProps } from './PatternDemoShell';
import { useAutoPlay } from './useAutoPlay';

// ─── Shared UI ────────────────────────────────────────────────────────────────

const cardCls = 'min-w-[240px] rounded-xl border border-black/[0.08] bg-white p-4';

const ARTICLE_TITLE = 'Design tokens at scale';
const ARTICLE_META = 'Miguel · 4 min read';

// Spinning SVG circle for the spinner step
function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="animate-spin text-zinc-400"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="28"
        strokeDashoffset="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Heart icon — outline or filled
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 15s-6-4.35-6-8.25A3.75 3.75 0 0 1 9 4.44 3.75 3.75 0 0 1 15 6.75C15 10.65 9 15 9 15Z"
        fill={filled ? '#18181b' : 'none'}
        stroke="#18181b"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Article row used in all three steps
function ArticleRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-zinc-900">{ARTICLE_TITLE}</p>
        <p className="mt-0.5 text-[10px] text-zinc-400">{ARTICLE_META}</p>
      </div>
      {children}
    </div>
  );
}

// ─── Step 1: Spinner (anti-pattern) ───────────────────────────────────────────

function SpinnerStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'liked'>('idle');
  const heartRef = useRef<HTMLButtonElement>(null);

  useAutoPlay(async isCancelled => {
    await delay(500);
    const wrapper = wrapperRef.current;
    const heart = heartRef.current;
    if (!wrapper || !heart || isCancelled()) return;

    await moveCursor(cursorRef, ...(Object.values(relPos(heart, wrapper)) as [number, number]));
    if (isCancelled()) return;
    await clickCursor(cursorRef);
    setState('loading');

    // Spinner is visible for 1200ms — the wait IS the demo
    await delay(1200);
    if (isCancelled()) return;

    setState('liked');
    await delay(800);

    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  return (
    <div className={cardCls}>
      <ArticleRow>
        <button
          ref={heartRef}
          disabled={state === 'loading'}
          className="flex-shrink-0 rounded-full p-1 text-zinc-400 transition-colors"
        >
          {state === 'loading' ? <Spinner /> : <HeartIcon filled={state === 'liked'} />}
        </button>
      </ArticleRow>
      {state === 'loading' && <p className="mt-3 text-center text-[10px] text-zinc-400">Saving…</p>}
    </div>
  );
}

// ─── Step 2: Optimistic update (good pattern) ─────────────────────────────────

function OptimisticStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const [liked, setLiked] = useState(false);
  const heartRef = useRef<HTMLButtonElement>(null);

  useAutoPlay(async isCancelled => {
    await delay(500);
    const wrapper = wrapperRef.current;
    const heart = heartRef.current;
    if (!wrapper || !heart || isCancelled()) return;

    await moveCursor(cursorRef, ...(Object.values(relPos(heart, wrapper)) as [number, number]));
    if (isCancelled()) return;
    await clickCursor(cursorRef);

    // Instant feedback — no wait
    setLiked(true);
    if (heart) {
      gsap.fromTo(heart, { scale: 0.7 }, { scale: 1, duration: 0.25, ease: 'back.out(2.5)' });
    }
    await delay(1200);

    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  return (
    <div className={cardCls}>
      <ArticleRow>
        <button
          ref={heartRef}
          className="flex-shrink-0 rounded-full p-1 text-zinc-700 transition-colors"
          onClick={() => setLiked(l => !l)}
        >
          <HeartIcon filled={liked} />
        </button>
      </ArticleRow>
      <p className="mt-3 text-center text-[10px] text-zinc-400">
        {liked ? 'Saved instantly ✓' : 'Click the heart'}
      </p>
    </div>
  );
}

// ─── Step 3: With undo (best) ─────────────────────────────────────────────────

function WithUndoStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const [liked, setLiked] = useState(false);
  const heartRef = useRef<HTMLButtonElement>(null);
  const undoRef = useRef<HTMLDivElement>(null);

  useAutoPlay(async isCancelled => {
    await delay(500);
    const wrapper = wrapperRef.current;
    const heart = heartRef.current;
    const undo = undoRef.current;
    if (!wrapper || !heart || isCancelled()) return;

    // Click heart — instant fill + undo pill appears
    await moveCursor(cursorRef, ...(Object.values(relPos(heart, wrapper)) as [number, number]));
    if (isCancelled()) return;
    await clickCursor(cursorRef);

    setLiked(true);
    if (heart) {
      gsap.fromTo(heart, { scale: 0.7 }, { scale: 1, duration: 0.25, ease: 'back.out(2.5)' });
    }
    await revealElement(undo);
    await delay(700);

    // Click undo — reverses instantly
    if (isCancelled()) return;
    if (undo) {
      await moveCursor(cursorRef, ...(Object.values(relPos(undo, wrapper)) as [number, number]));
    }
    await clickCursor(cursorRef);
    setLiked(false);
    await hideElement(undo);
    if (heart) {
      gsap.fromTo(heart, { scale: 1.1 }, { scale: 1, duration: 0.2, ease: 'power2.out' });
    }
    await delay(600);

    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  return (
    <div className={cardCls}>
      <ArticleRow>
        <button
          ref={heartRef}
          className="flex-shrink-0 rounded-full p-1 text-zinc-700 transition-colors"
        >
          <HeartIcon filled={liked} />
        </button>
      </ArticleRow>
      <div ref={undoRef} className="mt-3 flex items-center gap-1" style={{ opacity: 0 }}>
        <span className="text-[10px] text-zinc-500">Saved</span>
        <span className="text-[10px] text-zinc-300">·</span>
        <span className="cursor-pointer text-[10px] text-zinc-500 underline underline-offset-2">
          Undo
        </span>
      </div>
    </div>
  );
}

// ─── Demo definition ──────────────────────────────────────────────────────────

const OPTIMISTIC_STEPS: DemoStep[] = [
  { label: 'Spinner', component: SpinnerStep },
  { label: 'Optimistic', component: OptimisticStep },
  { label: 'With undo', component: WithUndoStep },
];

export function OptimisticDemo() {
  return <PatternDemoShell steps={OPTIMISTIC_STEPS} />;
}
