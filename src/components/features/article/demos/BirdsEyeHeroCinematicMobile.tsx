'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { delay, typeText } from './demoHelpers';
import { useAutoPlay } from './useAutoPlay';

// ─── Dot data (shared seed — subset for mobile) ───────────────────────────────

type Dot = { id: number; x: number; y: number; score: number; highlight: boolean };

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function buildDots(): Dot[] {
  const rand = seededRand(77);
  const dots: Dot[] = [];
  const clusterCx = 52;
  const clusterCy = 48;
  for (let i = 0; i < 14; i++) {
    const angle = rand() * Math.PI * 2;
    const r = rand() * 12 + 2;
    dots.push({
      id: i,
      x: clusterCx + Math.cos(angle) * r,
      y: clusterCy + Math.sin(angle) * r,
      score: 0.45 + rand() * 0.5,
      highlight: true,
    });
  }
  // Fewer background dots on mobile — 60 instead of 120
  for (let i = 14; i < 74; i++) {
    dots.push({ id: i, x: 3 + rand() * 94, y: 5 + rand() * 90, score: rand(), highlight: false });
  }
  return dots;
}

const DOTS = buildDots();

function scoreToColor(score: number): string {
  if (score < 0.15) return '#D3D1C7';
  if (score < 0.32) return '#E24B4A';
  if (score < 0.44) return '#F09595';
  if (score < 0.56) return '#FCEBEB';
  if (score < 0.63) return '#B4B2A9';
  if (score < 0.74) return '#B5D4F4';
  if (score < 0.86) return '#378ADD';
  return '#185FA5';
}

// ─── Scatter ──────────────────────────────────────────────────────────────────

function ScatterPlot({
  filterProgress,
  staggerProgress,
}: {
  filterProgress: number;
  staggerProgress: number;
}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      style={{ position: 'absolute', inset: 0 }}
    >
      {DOTS.map((dot, idx) => {
        const staggerThreshold = idx / DOTS.length;
        const dotOpacity =
          staggerProgress < staggerThreshold
            ? 0
            : dot.highlight
            ? 1
            : Math.max(0, 1 - filterProgress * 0.82);
        const r = dot.highlight && filterProgress > 0.3 ? 1.9 : 1.4;
        return (
          <circle
            key={dot.id}
            cx={dot.x}
            cy={dot.y}
            r={r}
            fill={scoreToColor(dot.score)}
            opacity={dotOpacity}
            style={{ transition: 'opacity 0.35s ease, r 0.3s ease' }}
          />
        );
      })}
    </svg>
  );
}

// ─── Inner animation ──────────────────────────────────────────────────────────

function BirdsEyeMobileInner() {
  const stageRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const metricsRowRef = useRef<HTMLDivElement>(null);
  const surveyCardRef = useRef<HTMLDivElement>(null);

  const [staggerProgress, setStaggerProgress] = useState(0);
  const [filterProgress, setFilterProgress] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [numbersVisible, setNumbersVisible] = useState(false);
  const [surveyProgress, setSurveyProgress] = useState(0);

  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    setStaggerProgress(1);
    setFilterProgress(1);
    setSearchText('Maria Persson');
    setNumbersVisible(true);
    setSurveyProgress(1);
    if (searchBarRef.current) gsap.set(searchBarRef.current, { opacity: 1, y: 0 });
    if (metricsRowRef.current) gsap.set(metricsRowRef.current, { opacity: 1, y: 0 });
    if (surveyCardRef.current) gsap.set(surveyCardRef.current, { opacity: 1, y: 0 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useAutoPlay(
    async isCancelled => {
      if (reducedMotion.current) {
        await new Promise<void>(() => {});
        return;
      }

      while (!isCancelled()) {
        // ── Reset ──────────────────────────────────────────────────────────────
        if (stageRef.current) gsap.set(stageRef.current, { opacity: 1 });
        if (searchBarRef.current) gsap.set(searchBarRef.current, { opacity: 0, y: 6 });
        if (metricsRowRef.current) gsap.set(metricsRowRef.current, { opacity: 0, y: 6 });
        if (surveyCardRef.current) gsap.set(surveyCardRef.current, { opacity: 0, y: 6 });
        setStaggerProgress(0);
        setFilterProgress(0);
        setSearchText('');
        setNumbersVisible(false);
        setSurveyProgress(0);
        await delay(16);
        if (isCancelled()) return;

        // ── Beat 1: Scatter fades in ────────────────────────────────────────
        await new Promise<void>(resolve => {
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: 1,
            duration: 0.9,
            ease: 'power2.out',
            onUpdate: () => setStaggerProgress(proxy.v),
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;
        await delay(200);
        if (isCancelled()) return;

        // ── Beat 2a: Search bar slides up ────────────────────────────────────
        await new Promise<void>(resolve => {
          gsap.to(searchBarRef.current!, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power3.out',
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;
        await delay(100);

        // ── Beat 2b: Type name ────────────────────────────────────────────────
        await typeText(fn => setSearchText(prev => fn(prev)), 'Maria Persson', 55);
        if (isCancelled()) return;
        await delay(150);

        // ── Beat 2c: Dots filter ──────────────────────────────────────────────
        await new Promise<void>(resolve => {
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: 1,
            duration: 0.4,
            ease: 'power2.inOut',
            onUpdate: () => setFilterProgress(proxy.v),
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;
        await delay(200);

        // ── Beat 3a: Metrics row ──────────────────────────────────────────────
        await new Promise<void>(resolve => {
          gsap.to(metricsRowRef.current!, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;
        await delay(80);
        setNumbersVisible(true);
        if (isCancelled()) return;

        // ── Beat 3b: Survey rows ──────────────────────────────────────────────
        await delay(150);
        await new Promise<void>(resolve => {
          gsap.to(surveyCardRef.current!, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;
        await new Promise<void>(resolve => {
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: 1,
            duration: 0.5,
            ease: 'power2.out',
            onUpdate: () => setSurveyProgress(proxy.v),
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;

        // ── Hold ──────────────────────────────────────────────────────────────
        await delay(1400);
        if (isCancelled()) return;

        // ── Fade out ──────────────────────────────────────────────────────────
        await new Promise<void>(resolve => {
          gsap.to(stageRef.current!, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: resolve,
          });
        });
        await delay(80);
      }
    },
    () => {},
  );

  const surveyItems = [
    { label: 'Action', score: 45, low: true },
    { label: 'Confidence', score: 52, low: true },
    { label: 'Communication', score: 85, low: false },
    { label: 'Ownership', score: 30, low: true },
  ];

  return (
    <div
      ref={stageRef}
      aria-label="Animated demo of Bird's Eye View"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/5',
        borderRadius: 14,
        background: '#F0F0EF',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: 7,
        gap: 5,
      }}
    >
      {/* Row 1 — Scatter graph */}
      <div
        style={{
          flex: '0 0 44%',
          position: 'relative',
          background: '#fff',
          borderRadius: 10,
          border: '1px solid rgba(0,0,0,0.07)',
          overflow: 'hidden',
        }}
      >
        <ScatterPlot staggerProgress={staggerProgress} filterProgress={filterProgress} />
        <div
          style={{
            position: 'absolute',
            top: 7,
            left: 9,
            fontSize: 7,
            fontWeight: 500,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: '#C4C4C4',
            opacity: staggerProgress > 0.8 ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          {filterProgress > 0.5 ? '14 teams' : '1,247 teams'}
        </div>
      </div>

      {/* Row 2 — Search bar */}
      <div
        ref={searchBarRef}
        style={{ flex: '0 0 auto', opacity: 0, transform: 'translateY(6px)' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: '#fff',
            border: '1px solid',
            borderColor: filterProgress > 0 ? 'rgba(55,138,221,0.5)' : 'rgba(0,0,0,0.1)',
            borderRadius: 8,
            padding: '6px 10px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            transition: 'border-color 0.3s ease',
          }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 12 12"
            fill="none"
            style={{ flexShrink: 0, opacity: 0.35 }}
          >
            <circle cx="5" cy="5" r="3.5" stroke="#374151" strokeWidth="1.2" />
            <line
              x1="7.8"
              y1="7.8"
              x2="10.5"
              y2="10.5"
              stroke="#374151"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontSize: 9,
              color: searchText ? '#111827' : '#C4C4C4',
              flex: 1,
              lineHeight: '14px',
            }}
          >
            {searchText || 'Search…'}
            {searchText && (
              <span
                className="bev-mobile-cursor"
                style={{
                  display: 'inline-block',
                  width: 1.5,
                  height: 9,
                  background: '#378ADD',
                  marginLeft: 1.5,
                  verticalAlign: 'middle',
                }}
              />
            )}
          </span>
        </div>
      </div>

      {/* Row 3 — Bento stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {/* Metric cards */}
        <div
          ref={metricsRowRef}
          style={{ display: 'flex', gap: 5, opacity: 0, transform: 'translateY(6px)' }}
        >
          {[
            { label: 'Engagement', val: '63', delta: '↑1' },
            { label: 'Benchmark', val: '−11', delta: '↑1' },
            { label: 'Response', val: '90%', delta: null },
          ].map(({ label, val, delta }) => (
            <div
              key={label}
              style={{
                flex: 1,
                background: '#fff',
                borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.07)',
                padding: '8px 4px',
                textAlign: 'center',
              }}
            >
              <div
                style={{ fontSize: 8, color: '#9CA3AF', marginBottom: 3, letterSpacing: '0.03em' }}
              >
                {label}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#111827',
                    opacity: numbersVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {val}
                </span>
                {delta && (
                  <span
                    style={{
                      fontSize: 8,
                      color: '#9CA3AF',
                      opacity: numbersVisible ? 1 : 0,
                      transition: 'opacity 0.3s ease 0.15s',
                    }}
                  >
                    {delta}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Survey rows card */}
        <div
          ref={surveyCardRef}
          style={{
            background: '#fff',
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.07)',
            padding: '8px 10px',
            opacity: 0,
            transform: 'translateY(6px)',
          }}
        >
          <div
            style={{
              fontSize: 7.5,
              color: '#9CA3AF',
              marginBottom: 6,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Questions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {surveyItems.map(({ label, score, low }, i) => {
              const visible = surveyProgress >= (i + 1) / surveyItems.length;
              return (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(3px)',
                    transition: 'opacity 0.22s ease, transform 0.22s ease',
                  }}
                >
                  <span style={{ fontSize: 10, color: '#374151' }}>{label}</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#fff',
                      background: low ? '#E24B4A' : '#378ADD',
                      borderRadius: 4,
                      padding: '2px 7px',
                    }}
                  >
                    {score}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .bev-mobile-cursor { animation: bev-mobile-blink 0.55s step-end infinite; }
        @keyframes bev-mobile-blink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .bev-mobile-cursor { animation: none; } }
      `}</style>
    </div>
  );
}

// ─── Public export ─────────────────────────────────────────────────────────────

export function BirdsEyeHeroCinematicMobile() {
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
      {isVisible && <BirdsEyeMobileInner />}
    </div>
  );
}
