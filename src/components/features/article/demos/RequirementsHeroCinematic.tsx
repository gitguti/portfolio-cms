'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { delay, typeText } from './demoHelpers';
import { useAutoPlay } from './useAutoPlay';

// ─── Constants ────────────────────────────────────────────────────────────────

const QUERY_TEXT = 'Improve this requirement with the predefined rules';

const REASONING_LINES = [
  'Retrieving the current requirement and its context',
  'Cross-referencing applicable rules from the rules library',
  'Identifying ambiguity and structural issues',
] as const;

const CITATION_PILLS = ['↗ Section 4.2 — Naming', '↗ Atomicity rules'] as const;

const CHIPS = ['Check atomicity', 'Generate test cases', 'Improve clarity', '+ More'] as const;

// ─── Send icon ────────────────────────────────────────────────────────────────

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 8L14 2L8 14L7 9L2 8Z"
        fill="white"
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── File-local animation helpers ─────────────────────────────────────────────

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

// ─── Inner animation component ────────────────────────────────────────────────

function HeroCinematicInner() {
  const [inputText, setInputText] = useState('');
  const [saveLabel, setSaveLabel] = useState<'Save' | 'Saved ✓'>('Save');

  const stageRef = useRef<HTMLDivElement>(null);
  const inputSceneRef = useRef<HTMLDivElement>(null);
  const sendBtnRef = useRef<HTMLDivElement>(null);
  const sendPulseRef = useRef<HTMLDivElement>(null);

  const compositionRef = useRef<HTMLDivElement>(null);
  const userBubbleRef = useRef<HTMLDivElement>(null);
  const analysisCardRef = useRef<HTMLDivElement>(null);
  const pill1Ref = useRef<HTMLSpanElement>(null);
  const pill2Ref = useRef<HTMLSpanElement>(null);

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

  // ── Scene 6: Follow-up chips
  const chipsRowRef = useRef<HTMLDivElement>(null);
  const chipRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];

  // ── Scene 7: View-changes button + diff highlights
  const viewChangesBtnRef = useRef<HTMLButtonElement>(null);
  const diffBadgeRef = useRef<HTMLSpanElement>(null);
  // spans wrapping changed words inside the two analysis paragraphs
  const diffSpanRefs = [
    useRef<HTMLSpanElement>(null), // "atomic statements" (added — green)
    useRef<HTMLSpanElement>(null), // "clarity" (added — green)
    useRef<HTMLSpanElement>(null), // "init_signal" (changed — amber)
    useRef<HTMLSpanElement>(null), // "initialization_signal" (changed — amber)
  ];

  // ── Scene 8: Save button
  const saveBtnRef = useRef<HTMLButtonElement>(null);

  const reducedMotion = useRef(false);

  // Read reduced-motion preference once
  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Reduced-motion: show final state immediately
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;

    setInputText(QUERY_TEXT);
    setSaveLabel('Saved ✓');
    if (inputSceneRef.current) gsap.set(inputSceneRef.current, { opacity: 0 });
    if (compositionRef.current) gsap.set(compositionRef.current, { opacity: 1 });
    if (userBubbleRef.current) gsap.set(userBubbleRef.current, { opacity: 1 });
    if (analysisCardRef.current) gsap.set(analysisCardRef.current, { opacity: 1, y: 0, scale: 1 });
    lineRefs.forEach(r => {
      if (r.current) gsap.set(r.current, { opacity: 1, y: 0 });
    });
    checkmarkRefs.forEach(r => {
      if (r.current) gsap.set(r.current, { scale: 1 });
    });
    lineTextRefs.forEach(r => {
      if (r.current) gsap.set(r.current, { opacity: 1 });
    });
    if (pill1Ref.current) gsap.set(pill1Ref.current, { scale: 1, opacity: 1 });
    if (pill2Ref.current) gsap.set(pill2Ref.current, { scale: 1, opacity: 1 });
    chipRefs.forEach(r => {
      if (r.current) gsap.set(r.current, { opacity: 1, scale: 1, y: 0 });
    });
    if (chipsRowRef.current) gsap.set(chipsRowRef.current, { opacity: 1 });
    if (saveBtnRef.current) gsap.set(saveBtnRef.current, { opacity: 1, y: 0 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useAutoPlay(
    async isCancelled => {
      if (reducedMotion.current) {
        await new Promise<void>(() => {});
        return;
      }

      while (!isCancelled()) {
        // ── Reset ──────────────────────────────────────────────────────────────
        gsap.set(stageRef.current, { opacity: 1 });
        gsap.set(compositionRef.current, { opacity: 0, scale: 1 });
        gsap.set(inputSceneRef.current, { opacity: 1, y: 0, scale: 1 });
        gsap.set(userBubbleRef.current, { opacity: 0 });
        gsap.set(analysisCardRef.current, { opacity: 0, y: 0, scale: 1 });
        lineRefs.forEach(r => gsap.set(r.current, { opacity: 0, y: 0 }));
        checkmarkRefs.forEach(r => gsap.set(r.current, { scale: 0 }));
        lineTextRefs.forEach(r => gsap.set(r.current, { opacity: 0 }));
        gsap.set(pill1Ref.current, { scale: 0, opacity: 0 });
        gsap.set(pill2Ref.current, { scale: 0, opacity: 0 });
        // Scene 6-8 reset
        if (chipsRowRef.current) gsap.set(chipsRowRef.current, { opacity: 0 });
        chipRefs.forEach(r => gsap.set(r.current, { opacity: 0, scale: 0.95, y: 8 }));
        if (viewChangesBtnRef.current) gsap.set(viewChangesBtnRef.current, { opacity: 0 });
        if (diffBadgeRef.current) gsap.set(diffBadgeRef.current, { opacity: 0 });
        diffSpanRefs.forEach(r => {
          if (r.current) gsap.set(r.current, { backgroundSize: '0% 100%' });
        });
        if (saveBtnRef.current) gsap.set(saveBtnRef.current, { opacity: 0, y: 8 });
        setSaveLabel('Save');
        setInputText('');
        await delay(16);

        // ── Scene 1: Typing (t=0 → ~2000ms) ───────────────────────────────────
        await delay(400);
        if (isCancelled()) return;

        await typeText(setInputText, QUERY_TEXT, 38);
        if (isCancelled()) return;

        await delay(150);
        if (isCancelled()) return;

        // Send pulse
        if (sendPulseRef.current) {
          gsap.fromTo(
            sendPulseRef.current,
            { scale: 0.8, opacity: 0.6 },
            { scale: 1.8, opacity: 0, duration: 0.45, ease: 'power2.out' },
          );
        }
        if (sendBtnRef.current) {
          gsap.to(sendBtnRef.current, {
            scale: 0.88,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
          });
        }
        await delay(200);
        if (isCancelled()) return;

        // ── Scene 2: Input → Bubble transition (~2000ms → ~2500ms) ────────────
        if (inputSceneRef.current) {
          gsap.to(inputSceneRef.current, {
            y: -20,
            scale: 0.92,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.in',
          });
        }
        gsap.set(userBubbleRef.current, { opacity: 1 });
        await new Promise<void>(resolve => {
          gsap.to(compositionRef.current!, {
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;
        await delay(200);
        if (isCancelled()) return;

        // ── Scene 3: Reasoning steps (~2500ms → ~4500ms) ──────────────────────
        await animateReasoningLine(0, lineRefs, checkmarkRefs, lineTextRefs, isCancelled);
        if (isCancelled()) return;
        await delay(300);

        await animateReasoningLine(1, lineRefs, checkmarkRefs, lineTextRefs, isCancelled);
        if (isCancelled()) return;
        await delay(300);

        await animateReasoningLine(2, lineRefs, checkmarkRefs, lineTextRefs, isCancelled);
        if (isCancelled()) return;

        // ── Scene 4: Analysis card + citation pills (~4500ms → ~6500ms) ───────
        await delay(200);
        if (isCancelled()) return;
        await new Promise<void>(resolve => {
          gsap.fromTo(
            analysisCardRef.current!,
            { opacity: 0, y: 12, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', onComplete: resolve },
          );
        });
        if (isCancelled()) return;

        await delay(400);
        if (isCancelled()) return;

        await new Promise<void>(resolve => {
          gsap.fromTo(
            pill1Ref.current!,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)', onComplete: resolve },
          );
        });
        if (isCancelled()) return;

        await delay(150);
        if (isCancelled()) return;

        await new Promise<void>(resolve => {
          gsap.fromTo(
            pill2Ref.current!,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)', onComplete: resolve },
          );
        });
        if (isCancelled()) return;

        await delay(300);
        if (isCancelled()) return;

        // ── Scene 5: Breathing hold (~6500ms → ~7000ms) ───────────────────────
        await new Promise<void>(resolve => {
          gsap.to(compositionRef.current!, {
            scale: 1.012,
            duration: 0.25,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1,
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;

        // ── Scene 6: Follow-up chips (~7000ms → ~8500ms) ──────────────────────
        if (chipsRowRef.current) gsap.set(chipsRowRef.current, { opacity: 1 });
        for (let i = 0; i < chipRefs.length; i++) {
          const chip = chipRefs[i].current;
          if (!chip || isCancelled()) return;
          gsap.fromTo(
            chip,
            { opacity: 0, scale: 0.95, y: 8 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          );
          await delay(100);
        }
        if (isCancelled()) return;
        // Brief hold — let viewer read the chips
        await delay(900);
        if (isCancelled()) return;

        // ── Scene 7a: "View changes" button (~8500ms → ~9000ms) ───────────────
        await new Promise<void>(resolve => {
          gsap.fromTo(
            viewChangesBtnRef.current!,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out', onComplete: resolve },
          );
        });
        if (isCancelled()) return;
        await delay(200);
        if (isCancelled()) return;

        // ── Scene 7b: Diff badge + highlight reveals (~9000ms → ~10500ms) ─────
        // Badge fades in
        await new Promise<void>(resolve => {
          gsap.fromTo(
            diffBadgeRef.current!,
            { opacity: 0 },
            { opacity: 1, duration: 0.25, ease: 'power2.out', onComplete: resolve },
          );
        });
        if (isCancelled()) return;

        // Left-to-right highlight reveal: animate backgroundSize from 0% to 100%
        // Each span uses a linear-gradient with the highlight colour as the background
        // We stagger them 200ms apart for a "pen sweep" feel
        for (let i = 0; i < diffSpanRefs.length; i++) {
          const span = diffSpanRefs[i].current;
          if (!span || isCancelled()) return;
          gsap.fromTo(
            span,
            { backgroundSize: '0% 100%' },
            { backgroundSize: '100% 100%', duration: 0.55, ease: 'power2.out' },
          );
          await delay(200);
        }
        if (isCancelled()) return;
        // Hold diff visible
        await delay(500);
        if (isCancelled()) return;

        // ── Scene 8a: Save button materialises (~10500ms → ~11000ms) ──────────
        await new Promise<void>(resolve => {
          gsap.fromTo(
            saveBtnRef.current!,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', onComplete: resolve },
          );
        });
        if (isCancelled()) return;
        await delay(400);
        if (isCancelled()) return;

        // ── Scene 8b: Click + confirm (~11000ms → ~12000ms) ───────────────────
        // Simulate click: micro-scale down then up
        await new Promise<void>(resolve => {
          gsap.to(saveBtnRef.current!, {
            scale: 0.96,
            duration: 0.1,
            ease: 'power2.in',
            yoyo: true,
            repeat: 1,
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;

        // Label flips to "Saved ✓" + button background shifts to success green
        setSaveLabel('Saved ✓');
        gsap.to(saveBtnRef.current!, {
          background: 'rgba(22, 163, 74, 0.15)',
          duration: 0.3,
          ease: 'power2.out',
        });
        await delay(300);
        if (isCancelled()) return;

        // Diff highlights fade out — changes are committed
        diffSpanRefs.forEach(r => {
          if (r.current)
            gsap.to(r.current, { backgroundSize: '0% 100%', duration: 0.4, ease: 'power2.in' });
        });
        await delay(450);
        if (isCancelled()) return;

        // ── Scene 9: Final hold + breath + fade-out (~12000ms → ~13300ms) ──────
        await new Promise<void>(resolve => {
          gsap.to(compositionRef.current!, {
            scale: 1.005,
            duration: 0.3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1,
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;
        await delay(200);
        if (isCancelled()) return;

        await new Promise<void>(resolve => {
          gsap.to(stageRef.current!, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: resolve,
          });
        });
        await delay(100);
      }
    },
    () => {},
  );

  return (
    <div
      ref={stageRef}
      aria-label="Animated demonstration of the Requirements Assistant — a user prompts the AI, sees its reasoning, receives a grounded analysis with citations, reviews suggested follow-up actions, views the changes, and saves."
      style={{
        position: 'relative',
        aspectRatio: '16/9',
        borderRadius: 20,
        background: 'radial-gradient(ellipse at 60% 40%, #EDE9FE 0%, #F5F3FF 45%, #F9FAFB 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Centering wrapper */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Glass card */}
        <div
          style={{
            position: 'relative',
            width: '72%',
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: 16,
            boxShadow: '0 4px 24px rgba(110, 92, 246, 0.08), 0 20px 60px rgba(0,0,0,0.04)',
            padding: '28px 32px',
          }}
        >
          {/* ── Scenes 2–9: Conversation column (normal flow, invisible during Scene 1) */}
          <div ref={compositionRef} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* User bubble */}
              <div
                ref={userBubbleRef}
                style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0 }}
              >
                <div
                  style={{
                    background: '#6E5CF6',
                    borderRadius: 16,
                    borderBottomRightRadius: 4,
                    padding: '10px 14px',
                    maxWidth: '80%',
                    color: '#fff',
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {QUERY_TEXT}
                </div>
              </div>

              {/* Reasoning lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 4 }}>
                {REASONING_LINES.map((text, i) => (
                  <div
                    key={i}
                    ref={lineRefs[i]}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 10, opacity: 0 }}
                  >
                    <span
                      ref={checkmarkRefs[i]}
                      style={{
                        color: '#9CA3AF',
                        fontSize: 12,
                        display: 'inline-block',
                        marginTop: 1,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      ref={lineTextRefs[i]}
                      style={{ color: '#6B7280', fontSize: 12, lineHeight: 1.6, opacity: 0 }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Analysis card */}
              <div
                ref={analysisCardRef}
                style={{
                  opacity: 0,
                  background: '#F8F7FF',
                  border: '1px solid rgba(110, 92, 246, 0.15)',
                  borderRadius: 12,
                  padding: '14px 16px',
                }}
              >
                {/* Card header row: label + View changes button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#9CA3AF',
                      margin: 0,
                    }}
                  >
                    Analysis
                  </p>
                  <button
                    ref={viewChangesBtnRef}
                    style={{
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 11,
                      color: '#6B7280',
                      background: 'transparent',
                      border: '0.5px solid rgba(110, 92, 246, 0.25)',
                      borderRadius: 6,
                      padding: '4px 10px',
                      cursor: 'default',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Eye icon */}
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path
                        d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    View changes
                  </button>
                </div>

                {/* Diff summary badge */}
                <span
                  ref={diffBadgeRef}
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    fontSize: 10,
                    color: '#6B7280',
                    marginBottom: 8,
                  }}
                >
                  3 additions · 2 edits
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Para 1 — words with diff spans */}
                  <p style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.55, margin: 0 }}>
                    <strong>Ambiguity found:</strong> Two distinct conditions joined by
                    &lsquo;and/or&rsquo; — consider splitting into{' '}
                    <span
                      ref={diffSpanRefs[0]}
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(29,158,117,0.18) 0%, rgba(29,158,117,0.18) 100%)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '0% 100%',
                        color: '#0f7259',
                        borderRadius: 2,
                        padding: '0 1px',
                      }}
                    >
                      atomic statements
                    </span>{' '}
                    for{' '}
                    <span
                      ref={diffSpanRefs[1]}
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(29,158,117,0.18) 0%, rgba(29,158,117,0.18) 100%)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '0% 100%',
                        color: '#0f7259',
                        borderRadius: 2,
                        padding: '0 1px',
                      }}
                    >
                      clarity
                    </span>
                    .
                  </p>
                  {/* Para 2 — words with diff spans */}
                  <p style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.55, margin: 0 }}>
                    <strong>Naming:</strong>{' '}
                    <span
                      ref={diffSpanRefs[2]}
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(186,117,23,0.15) 0%, rgba(186,117,23,0.15) 100%)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '0% 100%',
                        color: '#92520a',
                        borderRadius: 2,
                        padding: '0 1px',
                      }}
                    >
                      &lsquo;init_signal&rsquo;
                    </span>{' '}
                    should be{' '}
                    <span
                      ref={diffSpanRefs[3]}
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(186,117,23,0.15) 0%, rgba(186,117,23,0.15) 100%)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '0% 100%',
                        color: '#92520a',
                        borderRadius: 2,
                        padding: '0 1px',
                      }}
                    >
                      &lsquo;initialization_signal&rsquo;
                    </span>{' '}
                    per Section 4.2.
                  </p>

                  {/* Citation pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 4 }}>
                    {([pill1Ref, pill2Ref] as const).map((ref, i) => (
                      <span
                        key={i}
                        ref={ref}
                        style={{
                          display: 'inline-block',
                          borderRadius: 20,
                          border: '1px solid rgba(110, 92, 246, 0.3)',
                          padding: '4px 10px',
                          fontSize: 11,
                          color: '#6E5CF6',
                          background: 'rgba(110, 92, 246, 0.06)',
                          opacity: 0,
                        }}
                      >
                        {CITATION_PILLS[i]}
                      </span>
                    ))}
                  </div>

                  {/* Save button — Scene 8 */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }}>
                    <button
                      ref={saveBtnRef}
                      style={{
                        opacity: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 13,
                        fontWeight: 500,
                        color: '#fff',
                        background: '#7F77DD',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 18px',
                        cursor: 'default',
                        pointerEvents: 'none',
                      }}
                    >
                      {saveLabel === 'Save' ? (
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                          <path
                            d="M3 8l4 4 6-7"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                      {saveLabel}
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Scene 6: Follow-up chips + persistent input area */}
              <div>
                {/* Chips row */}
                <div
                  ref={chipsRowRef}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 8,
                    opacity: 0,
                  }}
                >
                  {CHIPS.map((label, i) => (
                    <span
                      key={label}
                      ref={chipRefs[i]}
                      style={{
                        display: 'inline-block',
                        opacity: 0,
                        borderRadius: 20,
                        border: '0.5px solid rgba(127, 119, 221, 0.2)',
                        background: 'rgba(127, 119, 221, 0.08)',
                        color: '#534AB7',
                        fontSize: 12,
                        padding: '6px 14px',
                        cursor: 'default',
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Persistent input bar — always in layout so card height is stable */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    border: '1.5px solid rgba(110, 92, 246, 0.15)',
                    borderRadius: 12,
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  <span style={{ flex: 1, fontSize: 12, color: '#9CA3AF', lineHeight: '18px' }}>
                    Ask a follow-up…
                  </span>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      background: 'rgba(110, 92, 246, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path
                        d="M2 8L14 2L8 14L7 9L2 8Z"
                        fill="#6E5CF6"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Scene 1: Input overlay (position: absolute, z-index above conversation) */}
          <div
            ref={inputSceneRef}
            style={{
              position: 'absolute',
              bottom: 28,
              left: 32,
              right: 32,
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: '1.5px solid rgba(110, 92, 246, 0.3)',
                borderRadius: 12,
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: inputText ? '#374151' : '#9CA3AF',
                  minHeight: 20,
                  lineHeight: '20px',
                }}
              >
                {inputText || 'Ask anything about a requirement...'}
                {inputText && (
                  <span
                    className="requirements-hero-cursor"
                    style={{
                      display: 'inline-block',
                      width: 2,
                      height: 13,
                      background: '#6E5CF6',
                      marginLeft: 2,
                      verticalAlign: 'middle',
                    }}
                  />
                )}
              </span>
              <div
                ref={sendBtnRef}
                style={{
                  position: 'relative',
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: '#6E5CF6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <SendIcon />
                <div
                  ref={sendPulseRef}
                  style={{
                    position: 'absolute',
                    inset: -4,
                    borderRadius: 12,
                    border: '2px solid rgba(110, 92, 246, 0.5)',
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor blink keyframe — scoped to this component */}
      <style>{`
        .requirements-hero-cursor {
          animation: requirements-hero-blink 0.6s step-end infinite;
        }
        @keyframes requirements-hero-blink {
          50% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .requirements-hero-cursor { animation: none; }
        }
      `}</style>
    </div>
  );
}

// ─── Public export with IntersectionObserver gate ─────────────────────────────

export function RequirementsHeroCinematic() {
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

  return <div ref={sentinelRef}>{isVisible && <HeroCinematicInner />}</div>;
}
