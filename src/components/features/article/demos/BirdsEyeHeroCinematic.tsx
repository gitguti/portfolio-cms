'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { delay, typeText } from './demoHelpers';
import { useAutoPlay } from './useAutoPlay';

// ─── Dot data ─────────────────────────────────────────────────────────────────

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

  // The "Maria Persson" cluster — 14 dots loosely grouped center-right of the scatter
  const clusterCx = 52; // % of scatter width
  const clusterCy = 48; // % of scatter height
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

  // Background dots — 120 scattered across the whole scatter area
  for (let i = 14; i < 134; i++) {
    dots.push({
      id: i,
      x: 3 + rand() * 94,
      y: 5 + rand() * 90,
      score: rand(),
      highlight: false,
    });
  }

  return dots;
}

const DOTS = buildDots();

// ─── Color helpers ────────────────────────────────────────────────────────────

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

// ─── Sub-components ───────────────────────────────────────────────────────────

// Scatter uses % coordinates so it reflows naturally when the panel layout changes
function ScatterPlot({
  filterProgress, // 0 = all dots full opacity, 1 = only highlights full
  staggerProgress, // 0–1 initial fade-in
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
        // Stagger: each dot fades in sequentially
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

function SidebarPanel({
  slideProgress, // 0 = off-screen left, 1 = fully in
  searchText,
  filterActive,
}: {
  slideProgress: number;
  searchText: string;
  filterActive: boolean;
}) {
  const tx = (1 - slideProgress) * -110;

  return (
    <div
      style={{
        position: 'absolute',
        top: '35%',
        left: 10,
        transform: `translateY(-50%) translateX(${tx}%)`,
        width: 118,
        background: '#FFFFFF',
        borderRadius: 10,
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        zIndex: 10,
        willChange: 'transform',
      }}
    >
      {/* Search field */}
      <div>
        <div style={{ fontSize: 7, color: '#9CA3AF', marginBottom: 3, letterSpacing: '0.02em' }}>
          Search
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            border: '1px solid',
            borderColor: filterActive ? 'rgba(55,138,221,0.5)' : 'rgba(0,0,0,0.1)',
            borderRadius: 5,
            padding: '4px 6px',
            background: '#FAFAFA',
            transition: 'border-color 0.3s ease',
          }}
        >
          <svg
            width="7"
            height="7"
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
              fontSize: 8,
              color: searchText ? '#111827' : '#C4C4C4',
              flex: 1,
              minHeight: 11,
              lineHeight: '11px',
            }}
          >
            {searchText || 'Search…'}
            {searchText && (
              <span
                className="bev-cursor"
                style={{
                  display: 'inline-block',
                  width: 1,
                  height: 8,
                  background: '#378ADD',
                  marginLeft: 1,
                  verticalAlign: 'middle',
                }}
              />
            )}
          </span>
        </div>
      </div>

      {/* Analyse by */}
      <div>
        <div style={{ fontSize: 7, color: '#9CA3AF', marginBottom: 3, letterSpacing: '0.02em' }}>
          Analyse by
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: 5,
            padding: '3px 6px',
            background: '#FAFAFA',
          }}
        >
          <span style={{ fontSize: 7, color: '#374151' }}>Score scale</span>
          <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 3.5L5 6.5L8 3.5"
              stroke="#9CA3AF"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Show results for */}
      <div>
        <div style={{ fontSize: 7, color: '#9CA3AF', marginBottom: 3, letterSpacing: '0.02em' }}>
          Show results for
        </div>
        <div
          style={{
            display: 'flex',
            borderRadius: 5,
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '2px 0',
              fontSize: 7,
              fontWeight: 600,
              background: '#111827',
              color: '#fff',
            }}
          >
            Direct
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '2px 0',
              fontSize: 7,
              color: '#9CA3AF',
              background: '#F5F5F5',
            }}
          >
            Roll up
          </div>
        </div>
      </div>

      {/* View type */}
      <div>
        <div style={{ fontSize: 7, color: '#9CA3AF', marginBottom: 3, letterSpacing: '0.02em' }}>
          View type
        </div>
        <div
          style={{
            display: 'flex',
            borderRadius: 5,
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '2px 0',
              fontSize: 7,
              fontWeight: 600,
              background: '#111827',
              color: '#fff',
            }}
          >
            Overview
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '2px 0',
              fontSize: 7,
              color: '#9CA3AF',
              background: '#F5F5F5',
            }}
          >
            Focus
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailPanel({
  slideProgress, // 0 = off-screen right, 1 = fully in
  numbersVisible,
  surveyProgress, // 0–1, reveals survey rows
  sparkProgress,
}: {
  slideProgress: number;
  numbersVisible: boolean;
  surveyProgress: number;
  sparkProgress: number;
}) {
  const tx = (1 - slideProgress) * 110;

  const overviewItems = [
    { label: 'Engagement', val: '63', delta: '↑1' },
    { label: 'Benchmark', val: '−11', delta: '↑1' },
    { label: 'Response', val: '90%', delta: null },
  ];

  const surveyItems = [
    { label: 'Action', score: 45, bm: '−10', low: true },
    { label: 'Confidence', score: 52, bm: '+6', low: true },
    { label: 'Communication', score: 85, bm: '−4', low: false },
    { label: 'Ownership', score: 30, bm: '+13', low: true },
  ];

  const sparkBars = [52, 55, 58, 60, 63];

  return (
    <div
      style={{
        position: 'absolute',
        top: '45%',
        right: 10,
        transform: `translateY(-50%) translateX(${tx}%)`,
        width: 136,
        background: '#FFFFFF',
        borderRadius: 10,
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        willChange: 'transform',
        overflow: 'hidden',
      }}
    >
      {/* Overview card */}
      <div style={{ padding: '8px 10px 6px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div
          style={{
            fontSize: 7,
            color: '#9CA3AF',
            marginBottom: 4,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Overview
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
          {overviewItems.map(({ label, val, delta }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 7, color: '#9CA3AF', marginBottom: 2 }}>{label}</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
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
                      fontSize: 7,
                      color: '#9CA3AF',
                      opacity: numbersVisible ? 1 : 0,
                      transition: 'opacity 0.3s ease 0.2s',
                    }}
                  >
                    {delta}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Survey scores */}
      <div style={{ padding: '6px 10px', flex: 1 }}>
        <div style={{ fontSize: 7, color: '#9CA3AF', marginBottom: 4, letterSpacing: '0.04em' }}>
          Question
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {surveyItems.map(({ label, score, bm, low }, i) => {
            const visible = surveyProgress >= (i + 1) / surveyItems.length;
            return (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(4px)',
                  transition: `opacity 0.25s ease, transform 0.25s ease`,
                }}
              >
                <span style={{ fontSize: 8, color: '#374151', flex: 1 }}>{label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      color: '#fff',
                      background: low ? '#E24B4A' : '#378ADD',
                      borderRadius: 3,
                      padding: '1px 4px',
                      minWidth: 20,
                      textAlign: 'center',
                    }}
                  >
                    {score}
                  </span>
                  <span style={{ fontSize: 7, color: '#9CA3AF', width: 18, textAlign: 'right' }}>
                    {bm}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sparkline section */}
      <div style={{ padding: '5px 10px 8px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: 7, color: '#9CA3AF', marginBottom: 3, letterSpacing: '0.04em' }}>
          Engagement history
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
          {sparkBars.map((v, i) => {
            const pct = (v - 46) / (68 - 46);
            const h = Math.round(pct * 16);
            const revealed = sparkProgress >= (i + 1) / sparkBars.length;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: h,
                  borderRadius: 2,
                  background: i === sparkBars.length - 1 ? '#378ADD' : '#B5D4F4',
                  opacity: revealed ? 1 : 0,
                  transition: `opacity 0.18s ease ${i * 55}ms`,
                }}
              />
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
          <span style={{ fontSize: 7, color: '#C4C4C4' }}>Q1</span>
          <span style={{ fontSize: 7, color: '#C4C4C4' }}>Q5</span>
        </div>
      </div>
    </div>
  );
}

// ─── Inner animation ───────────────────────────────────────────────────────────

function BirdsEyeInner() {
  const stageRef = useRef<HTMLDivElement>(null);

  // Beat 1 — scatter fills frame
  const [staggerProgress, setStaggerProgress] = useState(0);

  // Beat 2 — sidebar slides in, name types, dots filter
  const [sidebarProgress, setSidebarProgress] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [filterProgress, setFilterProgress] = useState(0);

  // Beat 3 — right panel slides in, numbers populate
  const [detailProgress, setDetailProgress] = useState(0);
  const [numbersVisible, setNumbersVisible] = useState(false);
  const [surveyProgress, setSurveyProgress] = useState(0);
  const [sparkProgress, setSparkProgress] = useState(0);

  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Reduced-motion: jump to final state
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    setStaggerProgress(1);
    setSidebarProgress(1);
    setSearchText('Maria Persson');
    setFilterProgress(1);
    setDetailProgress(1);
    setNumbersVisible(true);
    setSurveyProgress(1);
    setSparkProgress(1);
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
        setStaggerProgress(0);
        setSidebarProgress(0);
        setSearchText('');
        setFilterProgress(0);
        setDetailProgress(0);
        setNumbersVisible(false);
        setSurveyProgress(0);
        setSparkProgress(0);
        await delay(16);
        if (isCancelled()) return;

        // ── Beat 1: Scatter fades in (0 → 1.4s) ───────────────────────────────
        await new Promise<void>(resolve => {
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: 1,
            duration: 1.1,
            ease: 'power2.out',
            onUpdate: () => setStaggerProgress(proxy.v),
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;

        // Brief hold — "here's a lot of data"
        await delay(300);
        if (isCancelled()) return;

        // ── Beat 2a: Sidebar slides in (1.4s → 2s) ────────────────────────────
        await new Promise<void>(resolve => {
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: 1,
            duration: 0.55,
            ease: 'power3.out',
            onUpdate: () => setSidebarProgress(proxy.v),
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;

        await delay(120);
        if (isCancelled()) return;

        // ── Beat 2b: Name types into search field (2s → 2.9s) ─────────────────
        await typeText(fn => setSearchText(prev => fn(prev)), 'Maria Persson', 52);
        if (isCancelled()) return;

        await delay(180);
        if (isCancelled()) return;

        // ── Beat 2c: Dots filter (2.9s → 3.4s) ────────────────────────────────
        await new Promise<void>(resolve => {
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: 1,
            duration: 0.45,
            ease: 'power2.inOut',
            onUpdate: () => setFilterProgress(proxy.v),
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;

        await delay(220);
        if (isCancelled()) return;

        // ── Beat 3a: Detail panel slides in (3.4s → 4s) ───────────────────────
        await new Promise<void>(resolve => {
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: 1,
            duration: 0.5,
            ease: 'power3.out',
            onUpdate: () => setDetailProgress(proxy.v),
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;

        // ── Beat 3b: Numbers appear (4s → 4.3s) ───────────────────────────────
        await delay(120);
        setNumbersVisible(true);
        if (isCancelled()) return;

        // ── Beat 3c: Survey rows reveal one by one (4.3s → 5s) ────────────────
        await delay(100);
        await new Promise<void>(resolve => {
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: 1,
            duration: 0.55,
            ease: 'power2.out',
            onUpdate: () => setSurveyProgress(proxy.v),
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;

        // ── Beat 3d: Sparkline draws (concurrent with survey tail) ─────────────
        await new Promise<void>(resolve => {
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: 1,
            duration: 0.4,
            ease: 'power2.out',
            onUpdate: () => setSparkProgress(proxy.v),
            onComplete: resolve,
          });
        });
        if (isCancelled()) return;

        // ── Hold — full layout visible (5s → 6s) ──────────────────────────────
        await delay(1000);
        if (isCancelled()) return;

        // ── Fade out (6s → 6.3s) ──────────────────────────────────────────────
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

  return (
    <div
      ref={stageRef}
      aria-label="Animated demonstration of Bird's Eye View — a scatter plot of engagement scores across teams, filtering to a single manager's rollup, and surfacing detailed metrics for a specific team."
      style={{
        position: 'relative',
        aspectRatio: '16/10',
        borderRadius: 14,
        background: '#F5F5F4',
        overflow: 'hidden',
      }}
    >
      {/* Outer glass frame — scatter fills it, panels float on top */}
      <div
        style={{
          position: 'absolute',
          inset: 7,
          background: '#FFFFFF',
          borderRadius: 10,
          border: '1px solid rgba(0,0,0,0.07)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}
      >
        {/* Scatter — always full frame */}
        <ScatterPlot staggerProgress={staggerProgress} filterProgress={filterProgress} />

        {/* Team count label — top-left, floats over scatter */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 16,
            fontSize: 8,
            fontWeight: 500,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: '#C4C4C4',
            opacity: staggerProgress > 0.8 ? 1 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none',
          }}
        >
          {filterProgress > 0.5 ? '14 teams' : '1,247 teams'}
        </div>

        {/* Sidebar — floating card, left-center */}
        <SidebarPanel
          slideProgress={sidebarProgress}
          searchText={searchText}
          filterActive={filterProgress > 0}
        />

        {/* Detail panel — floating card, right-center */}
        <DetailPanel
          slideProgress={detailProgress}
          numbersVisible={numbersVisible}
          surveyProgress={surveyProgress}
          sparkProgress={sparkProgress}
        />
      </div>

      {/* Cursor blink */}
      <style>{`
        .bev-cursor { animation: bev-blink 0.55s step-end infinite; }
        @keyframes bev-blink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .bev-cursor { animation: none; } }
      `}</style>
    </div>
  );
}

// ─── Public export with IntersectionObserver gate ─────────────────────────────

export function BirdsEyeHeroCinematic() {
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

  return <div ref={sentinelRef}>{isVisible && <BirdsEyeInner />}</div>;
}
