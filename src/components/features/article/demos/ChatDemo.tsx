'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { delay } from './demoHelpers';
import { DemoStep, PatternDemoShell, StepProps } from './PatternDemoShell';
import { useAutoPlay } from './useAutoPlay';

// ─── Constants ────────────────────────────────────────────────────────────────

const REASONING_LINES = [
  'Retrieving the requirement and its version history',
  'Cross-referencing applicable safety rules and naming conventions',
  'Checking for ambiguity patterns flagged in similar specs',
] as const;

const CITATION_PILLS = ['↗ Section 4.2 — Naming', '↗ Atomicity rules'] as const;

// ─── File-local animation helper ──────────────────────────────────────────────

async function animateReasoningLine(
  index: number,
  lineRefs: React.RefObject<HTMLDivElement | null>[],
  checkmarkRefs: React.RefObject<HTMLSpanElement | null>[],
  lineTextRefs: React.RefObject<HTMLSpanElement | null>[],
  isCancelled: () => boolean,
): Promise<void> {
  const line = lineRefs[index].current;
  const check = checkmarkRefs[index].current;
  const text = lineTextRefs[index].current;
  if (!line || !check || !text || isCancelled()) return;

  gsap.fromTo(line, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });

  await new Promise<void>(resolve => {
    gsap.fromTo(
      check,
      { scale: 0 },
      { scale: 1, duration: 0.2, ease: 'back.out(2)', onComplete: resolve },
    );
  });
  if (isCancelled()) return;

  await new Promise<void>(resolve => {
    gsap.fromTo(
      text,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out', onComplete: resolve },
    );
  });
}

// ─── Chat step ────────────────────────────────────────────────────────────────

function ChatStep({ onDone }: StepProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const convRef = useRef<HTMLDivElement>(null);
  const lineRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const checkmarkRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];
  const lineTextRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];
  const outputRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Reduced-motion: reveal everything immediately on mount
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      [convRef, outputRef, pillsRef, ...lineRefs].forEach(r => {
        if (r.current) gsap.set(r.current, { opacity: 1 });
      });
      [...checkmarkRefs].forEach(r => {
        if (r.current) gsap.set(r.current, { scale: 1 });
      });
      lineTextRefs.forEach(r => {
        if (r.current) gsap.set(r.current, { opacity: 1 });
      });
    }
  }, []);

  useAutoPlay(async isCancelled => {
    if (reducedMotion.current) {
      await new Promise<void>(() => {});
      return;
    }

    while (!isCancelled()) {
      // Reset — opacity only, layout never changes
      gsap.set(containerRef.current, { opacity: 1 });
      gsap.set(convRef.current, { opacity: 0, y: 0 });
      gsap.set(outputRef.current, { opacity: 0, y: 0 });
      gsap.set(pillsRef.current, { opacity: 0, y: 0 });
      lineRefs.forEach(r => gsap.set(r.current, { opacity: 0, y: 0 }));
      checkmarkRefs.forEach(r => gsap.set(r.current, { scale: 0 }));
      lineTextRefs.forEach(r => gsap.set(r.current, { opacity: 0 }));
      await delay(16);

      // ── t=1000ms: Conversational message ──────────────────────────────────
      await delay(1000);
      if (isCancelled()) return;
      await new Promise<void>(resolve => {
        gsap.fromTo(
          convRef.current!,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', onComplete: resolve },
        );
      });

      // ── t=2500ms: Reasoning lines ──────────────────────────────────────────
      await delay(1100);
      if (isCancelled()) return;

      await animateReasoningLine(0, lineRefs, checkmarkRefs, lineTextRefs, isCancelled);
      if (isCancelled()) return;
      await delay(100);
      await animateReasoningLine(1, lineRefs, checkmarkRefs, lineTextRefs, isCancelled);
      if (isCancelled()) return;
      await delay(100);
      await animateReasoningLine(2, lineRefs, checkmarkRefs, lineTextRefs, isCancelled);
      if (isCancelled()) return;

      // ── t=5200ms: Output ──────────────────────────────────────────────────
      await delay(700);
      if (isCancelled()) return;
      await new Promise<void>(resolve => {
        gsap.fromTo(
          outputRef.current!,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', onComplete: resolve },
        );
      });

      // ── t=5900ms: Citation pills ───────────────────────────────────────────
      await delay(200);
      if (isCancelled()) return;
      await new Promise<void>(resolve => {
        gsap.fromTo(
          pillsRef.current!,
          { opacity: 0, y: 4 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', onComplete: resolve },
        );
      });

      // ── Hold then fade out ─────────────────────────────────────────────────
      await delay(2500);
      if (isCancelled()) return;
      await new Promise<void>(resolve => {
        gsap.to(containerRef.current!, {
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
      className="flex flex-col gap-3"
      aria-label="Animated example of three AI message types: conversational, reasoning, and output"
    >
      {/* User prompt — always visible, no animation */}
      <div className="flex justify-end">
        <div
          className="max-w-[75%] text-[13px] leading-relaxed text-white"
          style={{ background: '#6E5CF6', borderRadius: 16, padding: '10px 14px' }}
        >
          Can you analyze the latest version of the climate control initialization spec and flag any
          ambiguity?
        </div>
      </div>

      {/* Conversational — light gray bubble, left-aligned */}
      <div ref={convRef} className="flex justify-start" style={{ opacity: 0 }}>
        <div
          className="max-w-[85%] rounded-2xl rounded-tl-sm text-[13px] leading-relaxed"
          style={{ background: '#EEEEF0', color: '#1A1A1A', padding: '10px 14px' }}
        >
          Looking into this — let me pull the spec and check it against the rules library.
        </div>
      </div>

      {/* Reasoning — checkmarks, muted, no container */}
      <div className="flex flex-col gap-2 pl-1">
        {REASONING_LINES.map((text, i) => (
          <div
            key={i}
            ref={lineRefs[i]}
            className="flex items-start gap-2.5"
            style={{ opacity: 0 }}
          >
            <span
              ref={checkmarkRefs[i]}
              className="mt-px flex-shrink-0 text-[12px]"
              style={{ color: '#9CA3AF', display: 'inline-block' }}
            >
              ✓
            </span>
            <span
              ref={lineTextRefs[i]}
              className="text-[12px] leading-relaxed"
              style={{ color: '#6B7280' }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>

      {/* Output — plain text, no card */}
      <div ref={outputRef} className="flex flex-col gap-2" style={{ opacity: 0 }}>
        <p className="text-[13px] font-semibold leading-snug" style={{ color: '#111827' }}>
          Here is a summary of the relevant findings:
        </p>
        <div className="flex flex-col gap-1.5">
          <p className="text-[12.5px] leading-relaxed" style={{ color: '#374151' }}>
            <span className="font-semibold">Ambiguity found:</span> Two distinct conditions joined
            by &lsquo;and/or&rsquo; — consider splitting into atomic statements.
          </p>
          <p className="text-[12.5px] leading-relaxed" style={{ color: '#374151' }}>
            <span className="font-semibold">Naming:</span> &lsquo;init_signal&rsquo; should be
            &lsquo;initialization_signal&rsquo; per Section 4.2.
          </p>
        </div>
        <div ref={pillsRef} className="flex flex-wrap gap-2 pt-1" style={{ opacity: 0 }}>
          {CITATION_PILLS.map(pill => (
            <span
              key={pill}
              className="rounded-full border px-2.5 py-1 text-[11px]"
              style={{ color: '#6B7280', background: '#F3F4F6', borderColor: '#E5E7EB' }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Demo definition ──────────────────────────────────────────────────────────

export const CHAT_STEPS: DemoStep[] = [{ label: 'AI Chat', component: ChatStep }];

export function ChatDemo() {
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

  return <div ref={sentinelRef}>{isVisible && <PatternDemoShell steps={CHAT_STEPS} />}</div>;
}
