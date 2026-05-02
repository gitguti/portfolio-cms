'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { delay, typeText } from './demoHelpers';
import { useAutoPlay } from './useAutoPlay';

const QUERY_TEXT = 'Improve this requirement';

const REASONING_LINES = [
  'Retrieving requirement context',
  'Cross-referencing rules library',
  'Identifying ambiguity issues',
] as const;

// ─── Inner component ──────────────────────────────────────────────────────────

function Inner() {
  const [inputText, setInputText] = useState('');

  const stageRef = useRef<HTMLDivElement>(null);
  const inputSceneRef = useRef<HTMLDivElement>(null);
  const sendBtnRef = useRef<HTMLDivElement>(null);

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
  const checkRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];
  const textRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];

  const reducedMotion = useRef(false);

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
    if (inputSceneRef.current) gsap.set(inputSceneRef.current, { opacity: 0 });
    if (compositionRef.current) gsap.set(compositionRef.current, { opacity: 1 });
    if (userBubbleRef.current) gsap.set(userBubbleRef.current, { opacity: 1 });
    if (analysisCardRef.current) gsap.set(analysisCardRef.current, { opacity: 1, y: 0 });
    lineRefs.forEach(r => {
      if (r.current) gsap.set(r.current, { opacity: 1 });
    });
    checkRefs.forEach(r => {
      if (r.current) gsap.set(r.current, { scale: 1 });
    });
    textRefs.forEach(r => {
      if (r.current) gsap.set(r.current, { opacity: 1 });
    });
    if (pill1Ref.current) gsap.set(pill1Ref.current, { scale: 1, opacity: 1 });
    if (pill2Ref.current) gsap.set(pill2Ref.current, { scale: 1, opacity: 1 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useAutoPlay(
    async isCancelled => {
      if (reducedMotion.current) {
        await new Promise<void>(() => {});
        return;
      }

      while (!isCancelled()) {
        // ── Reset ────────────────────────────────────────────────────────────
        gsap.set(stageRef.current, { opacity: 1 });
        gsap.set(inputSceneRef.current, { opacity: 1, y: 0, scale: 1 });
        gsap.set(compositionRef.current, { opacity: 0 });
        gsap.set(userBubbleRef.current, { opacity: 0 });
        gsap.set(analysisCardRef.current, { opacity: 0, y: 10 });
        lineRefs.forEach(r => gsap.set(r.current, { opacity: 0, y: 4 }));
        checkRefs.forEach(r => gsap.set(r.current, { scale: 0 }));
        textRefs.forEach(r => gsap.set(r.current, { opacity: 0 }));
        gsap.set(pill1Ref.current, { scale: 0, opacity: 0 });
        gsap.set(pill2Ref.current, { scale: 0, opacity: 0 });
        setInputText('');
        await delay(16);

        // ── Scene 1: Type ────────────────────────────────────────────────────
        await delay(300);
        if (isCancelled()) return;
        await typeText(setInputText, QUERY_TEXT, 42);
        if (isCancelled()) return;
        await delay(200);
        if (isCancelled()) return;

        // Send button tap
        if (sendBtnRef.current) {
          gsap.to(sendBtnRef.current, {
            scale: 0.88,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
          });
        }
        await delay(250);
        if (isCancelled()) return;

        // ── Scene 2: Input → conversation ────────────────────────────────────
        gsap.to(inputSceneRef.current!, {
          y: -16,
          scale: 0.94,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
        gsap.set(userBubbleRef.current, { opacity: 1 });
        await new Promise<void>(resolve => {
          gsap.to(compositionRef.current!, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;
        await delay(150);

        // ── Scene 3: Reasoning lines ─────────────────────────────────────────
        for (let i = 0; i < 3; i++) {
          const line = lineRefs[i].current;
          const check = checkRefs[i].current;
          const text = textRefs[i].current;
          if (!line || !check || !text || isCancelled()) return;

          gsap.fromTo(
            line,
            { opacity: 0, y: 4 },
            { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
          );
          await new Promise<void>(resolve => {
            gsap.fromTo(
              check,
              { scale: 0 },
              { scale: 1, duration: 0.18, ease: 'back.out(2)', onComplete: resolve },
            );
          });
          if (isCancelled()) return;
          await new Promise<void>(resolve => {
            gsap.fromTo(
              text,
              { opacity: 0 },
              { opacity: 1, duration: 0.3, ease: 'power2.out', onComplete: resolve },
            );
          });
          if (isCancelled()) return;
          await delay(220);
        }
        if (isCancelled()) return;

        // ── Scene 4: Analysis card ────────────────────────────────────────────
        await delay(150);
        await new Promise<void>(resolve => {
          gsap.fromTo(
            analysisCardRef.current!,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', onComplete: resolve },
          );
        });
        if (isCancelled()) return;
        await delay(300);

        await new Promise<void>(resolve => {
          gsap.fromTo(
            pill1Ref.current!,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)', onComplete: resolve },
          );
        });
        if (isCancelled()) return;
        await delay(120);
        await new Promise<void>(resolve => {
          gsap.fromTo(
            pill2Ref.current!,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)', onComplete: resolve },
          );
        });
        if (isCancelled()) return;

        // ── Hold + fade out ───────────────────────────────────────────────────
        await delay(1800);
        if (isCancelled()) return;

        await new Promise<void>(resolve => {
          gsap.to(stageRef.current!, {
            opacity: 0,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: resolve,
          });
        });
        await delay(80);
      }
    },
    () => {},
  );

  return (
    <div
      ref={stageRef}
      aria-label="Animated demo of Requirements Assistant"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: 16,
        background: 'radial-gradient(ellipse at 60% 30%, #EDE9FE 0%, #F5F3FF 50%, #F9FAFB 100%)',
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
          padding: '16px',
        }}
      >
        {/* Glass card */}
        <div
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.85)',
            borderRadius: 14,
            boxShadow: '0 4px 20px rgba(110,92,246,0.08), 0 12px 40px rgba(0,0,0,0.04)',
            padding: '16px 18px',
            position: 'relative',
          }}
        >
          {/* Conversation column */}
          <div ref={compositionRef} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* User bubble */}
              <div
                ref={userBubbleRef}
                style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0 }}
              >
                <div
                  style={{
                    background: '#6E5CF6',
                    borderRadius: 12,
                    borderBottomRightRadius: 3,
                    padding: '8px 12px',
                    color: '#fff',
                    fontSize: 11,
                    lineHeight: 1.5,
                  }}
                >
                  {QUERY_TEXT}
                </div>
              </div>

              {/* Reasoning lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 2 }}>
                {REASONING_LINES.map((text, i) => (
                  <div
                    key={i}
                    ref={lineRefs[i]}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 8, opacity: 0 }}
                  >
                    <span
                      ref={checkRefs[i]}
                      style={{
                        color: '#9CA3AF',
                        fontSize: 10,
                        display: 'inline-block',
                        marginTop: 1,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      ref={textRefs[i]}
                      style={{ color: '#6B7280', fontSize: 10, lineHeight: 1.6, opacity: 0 }}
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
                  border: '1px solid rgba(110,92,246,0.15)',
                  borderRadius: 10,
                  padding: '10px 12px',
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#9CA3AF',
                    margin: '0 0 6px',
                  }}
                >
                  Analysis
                </p>
                <p
                  style={{ fontSize: 10.5, color: '#374151', lineHeight: 1.55, margin: '0 0 4px' }}
                >
                  <strong>Ambiguity:</strong> Split joined conditions into atomic statements.
                </p>
                <p
                  style={{ fontSize: 10.5, color: '#374151', lineHeight: 1.55, margin: '0 0 8px' }}
                >
                  <strong>Naming:</strong> Rename <em>init_signal</em> per Section 4.2.
                </p>

                {/* Citation pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(['↗ Section 4.2', '↗ Atomicity rules'] as const).map((label, i) => (
                    <span
                      key={i}
                      ref={i === 0 ? pill1Ref : pill2Ref}
                      style={{
                        display: 'inline-block',
                        borderRadius: 20,
                        border: '1px solid rgba(110,92,246,0.3)',
                        padding: '3px 8px',
                        fontSize: 9,
                        color: '#6E5CF6',
                        background: 'rgba(110,92,246,0.06)',
                        opacity: 0,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Input overlay — Scene 1 */}
          <div
            ref={inputSceneRef}
            style={{ position: 'absolute', bottom: 16, left: 18, right: 18, zIndex: 10 }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: '1.5px solid rgba(110,92,246,0.3)',
                borderRadius: 10,
                padding: '8px 10px',
                background: 'rgba(255,255,255,0.9)',
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontSize: 11,
                  color: inputText ? '#374151' : '#9CA3AF',
                  minHeight: 16,
                  lineHeight: '16px',
                }}
              >
                {inputText || 'Ask about a requirement…'}
                {inputText && (
                  <span
                    className="req-mobile-cursor"
                    style={{
                      display: 'inline-block',
                      width: 1.5,
                      height: 11,
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
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: '#6E5CF6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M2 8L14 2L8 14L7 9L2 8Z"
                    fill="white"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .req-mobile-cursor { animation: req-mobile-blink 0.6s step-end infinite; }
        @keyframes req-mobile-blink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .req-mobile-cursor { animation: none; } }
      `}</style>
    </div>
  );
}

// ─── Public export ─────────────────────────────────────────────────────────────

export function RequirementsHeroCinematicMobile() {
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

  return (
    <div ref={sentinelRef} style={{ width: '100%' }}>
      {isVisible && <Inner />}
    </div>
  );
}
