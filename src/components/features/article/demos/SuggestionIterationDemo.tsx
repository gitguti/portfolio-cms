'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { delay } from './demoHelpers';
import { DemoStep, PatternDemoShell, StepProps } from './PatternDemoShell';
import { useAutoPlay } from './useAutoPlay';

// ─── Constants ────────────────────────────────────────────────────────────────

const CHIPS = ['Check atomicity', 'Generate test cases', 'Improve clarity', '+ More'];

// ─── Send icon ────────────────────────────────────────────────────────────────

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M12.5 7L2 2l2.5 5L2 12l10.5-5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Step component ───────────────────────────────────────────────────────────

function SuggestionStep({ onDone }: StepProps) {
  // State 1 refs
  const state1Ref = useRef<HTMLDivElement>(null);

  // State 2 refs
  const state2Ref = useRef<HTMLDivElement>(null);

  // State 3 chip refs (individual for stagger)
  const chipRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];

  // Label refs
  const labelRef = useRef<HTMLSpanElement>(null);

  // Container for overall fade
  const containerRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Reduced-motion: show everything statically
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      [state1Ref, state2Ref].forEach(r => {
        if (r.current) gsap.set(r.current, { opacity: 1, scale: 1 });
      });
      chipRefs.forEach(r => {
        if (r.current) gsap.set(r.current, { opacity: 1, y: 0 });
      });
    }
  }, []);

  useAutoPlay(async isCancelled => {
    if (reducedMotion.current) {
      await new Promise<void>(() => {});
      return;
    }

    while (!isCancelled()) {
      // ── Reset all to initial hidden state ────────────────────────────────
      gsap.set(containerRef.current, { opacity: 1 });
      gsap.set(state1Ref.current, { opacity: 1, scale: 1 });
      gsap.set(state2Ref.current, { opacity: 0, scale: 0.97 });
      chipRefs.forEach(r => gsap.set(r.current, { opacity: 0, y: 6 }));
      if (labelRef.current) labelRef.current.textContent = 'v1 — Form pattern';
      gsap.set(labelRef.current, { opacity: 1 });
      await delay(16);

      // ── t=0: State 1 is already visible — hold ───────────────────────────
      await delay(2500);
      if (isCancelled()) return;

      // ── t=2.5s: Transition 1→2 (500ms) ──────────────────────────────────
      // Label crossfade
      gsap.to(labelRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' });
      // State 1 out
      await new Promise<void>(resolve => {
        gsap.to(state1Ref.current, {
          opacity: 0,
          scale: 0.97,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: resolve,
        });
      });
      if (isCancelled()) return;
      // State 2 in
      if (labelRef.current) labelRef.current.textContent = 'v2 — Inline suggestions';
      gsap.to(labelRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      await new Promise<void>(resolve => {
        gsap.fromTo(
          state2Ref.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out', onComplete: resolve },
        );
      });

      // ── t=3s: State 2 hold ───────────────────────────────────────────────
      await delay(2500);
      if (isCancelled()) return;

      // ── t=5.5s: Transition 2→3 (500ms) ──────────────────────────────────
      gsap.to(labelRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' });
      await new Promise<void>(resolve => {
        gsap.to(state2Ref.current, {
          opacity: 0,
          y: -8,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: resolve,
        });
      });
      if (isCancelled()) return;
      gsap.set(state2Ref.current, { y: 0 }); // reset y for next cycle
      // Label update
      if (labelRef.current) labelRef.current.textContent = 'v3 — Chip actions';
      gsap.to(labelRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' });

      // Chips stagger in
      for (let i = 0; i < CHIPS.length; i++) {
        if (isCancelled()) return;
        gsap.fromTo(
          chipRefs[i].current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        );
        await delay(80);
      }

      // ── t=6s: Subtle hover cycle on chips ────────────────────────────────
      await delay(400);
      for (let i = 0; i < CHIPS.length; i++) {
        if (isCancelled()) return;
        await new Promise<void>(resolve => {
          gsap
            .timeline({ onComplete: resolve })
            .to(chipRefs[i].current, {
              backgroundColor: '#E8E4F8',
              borderColor: '#C4B8F0',
              duration: 0.2,
              ease: 'power2.out',
            })
            .to(chipRefs[i].current, {
              backgroundColor: '#F0F0F0',
              borderColor: '#E2E2E2',
              duration: 0.2,
              ease: 'power2.in',
            });
        });
        await delay(200);
      }

      // ── t=9s: Hold ───────────────────────────────────────────────────────
      await delay(2000);
      if (isCancelled()) return;

      // ── t=11s: Fade out ───────────────────────────────────────────────────
      await new Promise<void>(resolve => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: resolve,
        });
      });
      await delay(100);
    }
  }, onDone);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-4"
      aria-label="Animation showing three iterations of the follow-up suggestion pattern: form, inline bullets, and chip actions above the input"
    >
      {/* Persistent assistant message */}
      <div className="flex justify-start">
        <div
          className="max-w-[90%] rounded-2xl rounded-tl-sm text-[13px] leading-relaxed"
          style={{ background: '#EEEEF0', color: '#1A1A1A', padding: '10px 14px' }}
        >
          I&apos;ve improved the requirement. Anything else I can help with?
        </div>
      </div>

      {/* State label */}
      <span
        ref={labelRef}
        className="text-[11px] font-medium uppercase tracking-[0.06em]"
        style={{ color: '#A1A1AA' }}
      >
        v1 — Form pattern
      </span>

      {/* ── State 1: Form pattern ─────────────────────────────────────────── */}
      <div
        ref={state1Ref}
        className="rounded-xl border p-4"
        style={{ background: '#FAFAFA', borderColor: '#E4E4E7' }}
      >
        <p className="mb-3 text-[12.5px] font-medium" style={{ color: '#3F3F46' }}>
          Can I help you with something else?
        </p>

        <div className="flex flex-col gap-2.5">
          {/* Radio 1 */}
          <div className="flex items-start gap-3">
            <span
              className="mt-[2px] flex h-[14px] w-[14px] flex-shrink-0 items-center justify-center rounded-full border-2"
              style={{ borderColor: '#7C3AED', background: '#fff' }}
            >
              <span className="h-[6px] w-[6px] rounded-full" style={{ background: '#7C3AED' }} />
            </span>
            <span className="text-[12px] leading-snug" style={{ color: '#52525B' }}>
              I noticed this requirement might contain multiple thoughts. Would you like me to split
              it into atomic requirements?
            </span>
          </div>
          {/* Radio 2 */}
          <div className="flex items-start gap-3">
            <span
              className="mt-[2px] flex h-[14px] w-[14px] flex-shrink-0 items-center justify-center rounded-full border-2"
              style={{ borderColor: '#D4D4D8', background: '#fff' }}
            />
            <span className="text-[12px] leading-snug" style={{ color: '#52525B' }}>
              Do you want to generate test cases to validate this requirement?
            </span>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="rounded-lg px-4 py-1.5 text-[12px] font-medium text-white"
            style={{ background: '#7C3AED', opacity: 0.7 }}
          >
            Done
          </button>
        </div>
      </div>

      {/* ── State 2: Inline suggestions ───────────────────────────────────── */}
      <div ref={state2Ref} className="flex flex-col gap-2 pl-1" style={{ opacity: 0 }}>
        <p className="text-[13px] leading-relaxed" style={{ color: '#1A1A1A' }}>
          Can I help you with <strong className="font-semibold">something else?</strong>
        </p>
        <ul className="flex flex-col gap-1.5 pl-1">
          <li
            className="flex items-start gap-2 text-[12.5px] leading-relaxed"
            style={{ color: '#52525B' }}
          >
            <span
              className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ background: '#A1A1AA' }}
            />
            Check if this requirement violates atomicity and needs splitting
          </li>
          <li
            className="flex items-start gap-2 text-[12.5px] leading-relaxed"
            style={{ color: '#52525B' }}
          >
            <span
              className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ background: '#A1A1AA' }}
            />
            Generate test cases for this requirement
          </li>
        </ul>
      </div>

      {/* ── State 3 spacer — keeps layout stable when states 1/2 are hidden ─ */}
      <div className="flex-1" />

      {/* ── Chips (state 3) — always in DOM above input ───────────────────── */}
      <div className="flex flex-wrap gap-2">
        {CHIPS.map((chip, i) => (
          <span
            key={chip}
            ref={chipRefs[i]}
            className="rounded-full border px-3 py-1.5 text-[12px]"
            style={{
              background: '#F0F0F0',
              borderColor: '#E2E2E2',
              color: '#3F3F46',
              opacity: 0,
            }}
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Persistent input */}
      <div
        className="flex items-center gap-2 rounded-xl border px-3 py-2.5"
        style={{ borderColor: '#E4E4E7', background: '#fff' }}
      >
        <span className="flex-1 text-[13px]" style={{ color: '#A1A1AA' }}>
          Write your prompt
        </span>
        <button
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ background: '#EEEEF0', color: '#71717A' }}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

// ─── Demo definition ──────────────────────────────────────────────────────────

export const SUGGESTION_STEPS: DemoStep[] = [
  { label: 'Suggestion iteration', component: SuggestionStep },
];

export function SuggestionIterationDemo() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={sentinelRef}>{isVisible && <PatternDemoShell steps={SUGGESTION_STEPS} />}</div>;
}
