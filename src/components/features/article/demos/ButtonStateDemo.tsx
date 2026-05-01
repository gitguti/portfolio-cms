'use client';

import gsap from 'gsap';
import { useRef, useState } from 'react';

import {
  clickCursor,
  delay,
  hideCursor,
  moveCursor,
  relPos,
  revealElement,
  shakeElement,
  typeText,
} from './demoHelpers';
import { DemoStep, PatternDemoShell, StepProps } from './PatternDemoShell';
import { useAutoPlay } from './useAutoPlay';

// ─── Shared UI pieces ─────────────────────────────────────────────────────────

const inputCls =
  'w-full rounded-lg border border-black/[0.13] bg-white px-3 py-2.5 text-sm outline-none text-zinc-900 placeholder:text-zinc-400';

const labelCls = 'mb-1.5 block text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400';

// ─── Step 1: Disabled button (anti-pattern) ───────────────────────────────────

function DisabledStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useAutoPlay(async isCancelled => {
    await delay(500);
    const wrapper = wrapperRef.current;
    const button = buttonRef.current;
    const input = inputRef.current;
    if (!wrapper || !button || !input || isCancelled()) return;

    await moveCursor(cursorRef, ...(Object.values(relPos(button, wrapper)) as [number, number]));
    if (isCancelled()) return;
    await clickCursor(cursorRef);
    await delay(800);

    if (isCancelled()) return;
    await moveCursor(cursorRef, ...(Object.values(relPos(input, wrapper)) as [number, number]));
    await delay(700);

    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  return (
    <div className="rounded-xl border border-black/[0.08] bg-white p-4">
      <label htmlFor="disabled-step-label" className={labelCls}>
        Project label
      </label>
      <input
        id="disabled-step-label"
        ref={inputRef}
        className={inputCls}
        placeholder="e.g. Website redesign"
        readOnly
      />
      <button
        ref={buttonRef}
        disabled
        className="mt-3 w-full cursor-not-allowed rounded-lg bg-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-400 opacity-60"
      >
        Continue
      </button>
      <p className="mt-2 text-center text-[10px] text-zinc-400">Fill required fields first</p>
    </div>
  );
}

// ─── Step 2: Always active (good pattern) ─────────────────────────────────────

function ActiveStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const [label, setLabel] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useAutoPlay(async isCancelled => {
    await delay(500);
    const wrapper = wrapperRef.current;
    const button = buttonRef.current;
    const input = inputRef.current;
    if (!wrapper || !button || !input || isCancelled()) return;

    await moveCursor(cursorRef, ...(Object.values(relPos(button, wrapper)) as [number, number]));
    if (isCancelled()) return;
    await clickCursor(cursorRef);
    if (isCancelled()) return;

    await Promise.all([shakeElement(button), revealElement(errorRef.current)]);
    await delay(600);

    if (isCancelled()) return;
    await moveCursor(cursorRef, ...(Object.values(relPos(input, wrapper)) as [number, number]));
    await clickCursor(cursorRef);
    if (isCancelled()) return;

    await typeText(setLabel, 'Website redesign');
    await delay(500);

    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  return (
    <div className="rounded-xl border border-black/[0.08] bg-white p-4">
      <label htmlFor="active-step-label" className={labelCls}>
        Project label
      </label>
      <input
        id="active-step-label"
        ref={inputRef}
        className={inputCls}
        placeholder="e.g. Website redesign"
        value={label}
        readOnly
      />
      <button
        ref={buttonRef}
        className="mt-3 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white"
      >
        Continue
      </button>
      <div ref={errorRef} className="mt-2 flex items-center gap-1.5" style={{ opacity: 0 }}>
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="flex-shrink-0">
          <circle cx="3" cy="3" r="3" fill="#ef4444" />
        </svg>
        <span className="text-xs text-red-500">Add a label before continuing</span>
      </div>
    </div>
  );
}

// ─── Step 3: With SR annotation (best) ────────────────────────────────────────

function AnnotatedStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const [label, setLabel] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useAutoPlay(async isCancelled => {
    await delay(400);
    const wrapper = wrapperRef.current;
    const button = buttonRef.current;
    const input = inputRef.current;
    if (!wrapper || !button || !input || isCancelled()) return;

    await revealElement(badgeRef.current);
    await delay(500);

    await moveCursor(cursorRef, ...(Object.values(relPos(button, wrapper)) as [number, number]));
    if (isCancelled()) return;
    await clickCursor(cursorRef);
    if (isCancelled()) return;

    await Promise.all([shakeElement(button), revealElement(errorRef.current)]);

    if (badgeRef.current) {
      gsap.to(badgeRef.current, { scale: 1.06, yoyo: true, repeat: 1, duration: 0.18 });
    }
    await delay(900);

    if (isCancelled()) return;
    await moveCursor(cursorRef, ...(Object.values(relPos(input, wrapper)) as [number, number]));
    await clickCursor(cursorRef);
    if (isCancelled()) return;

    await typeText(setLabel, 'Website redesign');
    await delay(500);

    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  return (
    <div className="rounded-xl border border-black/[0.08] bg-white p-4">
      <label htmlFor="annotated-step-label" className={labelCls}>
        Project label
      </label>
      <input
        id="annotated-step-label"
        ref={inputRef}
        className={inputCls}
        placeholder="e.g. Website redesign"
        value={label}
        readOnly
      />
      <button
        ref={buttonRef}
        className="mt-3 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white"
      >
        Continue
      </button>
      <div ref={errorRef} className="mt-2 flex items-center gap-1.5" style={{ opacity: 0 }}>
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="flex-shrink-0">
          <circle cx="3" cy="3" r="3" fill="#ef4444" />
        </svg>
        <span className="text-xs text-red-500">Add a label before continuing</span>
      </div>
      <div
        ref={badgeRef}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-2.5 py-1"
        style={{ opacity: 0 }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white">
          <path
            d="M2 4.5C2 2.567 3.343 1 5 1s3 1.567 3 3.5V6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <rect x="1" y="5.5" width="2" height="3" rx="1" fill="currentColor" />
          <rect x="7" y="5.5" width="2" height="3" rx="1" fill="currentColor" />
        </svg>
        <span className="text-[9px] font-medium text-white">Announced to screen readers</span>
      </div>
    </div>
  );
}

// ─── Demo definition ──────────────────────────────────────────────────────────

const BUTTON_STEPS: DemoStep[] = [
  { label: 'Disabled', component: DisabledStep },
  { label: 'Always active', component: ActiveStep },
  { label: 'With context', component: AnnotatedStep },
];

export function ButtonStateDemo() {
  return <PatternDemoShell steps={BUTTON_STEPS} />;
}
