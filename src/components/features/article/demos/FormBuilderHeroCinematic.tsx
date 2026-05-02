'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { delay } from './demoHelpers';
import { useAutoPlay } from './useAutoPlay';

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCENT = '#7F77DD';
const ACCENT_40 = 'rgba(127, 119, 221, 0.4)';

type DroppedField = 'input' | 'select' | 'date' | 'button';

// ─── Component thumbnails in sidebar ─────────────────────────────────────────

function InputThumb({ dimmed }: { dimmed: boolean }) {
  return (
    <div style={{ opacity: dimmed ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
      <div
        style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.10)',
          borderRadius: 6,
          padding: '6px 8px',
        }}
      >
        <div
          style={{
            height: 5,
            width: '55%',
            background: '#E5E7EB',
            borderRadius: 2,
            marginBottom: 4,
          }}
        />
        <div
          style={{
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 4,
            padding: '3px 5px',
            background: '#FAFAFA',
          }}
        >
          <div style={{ height: 4, width: '70%', background: '#D1D5DB', borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ fontSize: 9, color: '#9CA3AF', marginTop: 3, letterSpacing: '0.01em' }}>
        Input field
      </div>
    </div>
  );
}

function SelectThumb({ dimmed }: { dimmed: boolean }) {
  return (
    <div style={{ opacity: dimmed ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
      <div
        style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.10)',
          borderRadius: 6,
          padding: '6px 8px',
        }}
      >
        <div
          style={{
            height: 5,
            width: '40%',
            background: '#E5E7EB',
            borderRadius: 2,
            marginBottom: 4,
          }}
        />
        <div
          style={{
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 4,
            padding: '3px 5px',
            background: '#FAFAFA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ height: 4, width: '55%', background: '#D1D5DB', borderRadius: 2 }} />
          <svg width="6" height="6" viewBox="0 0 8 8" fill="none">
            <path
              d="M1.5 2.5L4 5.5L6.5 2.5"
              stroke="#9CA3AF"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div style={{ fontSize: 9, color: '#9CA3AF', marginTop: 3, letterSpacing: '0.01em' }}>
        Select
      </div>
    </div>
  );
}

function DateThumb({ dimmed }: { dimmed: boolean }) {
  return (
    <div style={{ opacity: dimmed ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
      <div
        style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.10)',
          borderRadius: 6,
          padding: '6px 8px',
        }}
      >
        <div
          style={{
            height: 5,
            width: '50%',
            background: '#E5E7EB',
            borderRadius: 2,
            marginBottom: 4,
          }}
        />
        <div
          style={{
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 4,
            padding: '3px 5px',
            background: '#FAFAFA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ height: 4, width: '50%', background: '#D1D5DB', borderRadius: 2 }} />
          <svg width="8" height="8" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="2" width="12" height="11" rx="2" stroke="#9CA3AF" strokeWidth="1.2" />
            <path
              d="M4 1v2M10 1v2M1 5h12"
              stroke="#9CA3AF"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div style={{ fontSize: 9, color: '#9CA3AF', marginTop: 3, letterSpacing: '0.01em' }}>
        Date picker
      </div>
    </div>
  );
}

function ButtonThumb({ dimmed }: { dimmed: boolean }) {
  return (
    <div style={{ opacity: dimmed ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
      <div
        style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.10)',
          borderRadius: 6,
          padding: '6px 8px',
        }}
      >
        <div
          style={{
            background: ACCENT,
            borderRadius: 4,
            padding: '4px 0',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              height: 4,
              width: '50%',
              background: 'rgba(255,255,255,0.6)',
              borderRadius: 2,
              margin: '0 auto',
            }}
          />
        </div>
      </div>
      <div style={{ fontSize: 9, color: '#9CA3AF', marginTop: 3, letterSpacing: '0.01em' }}>
        Button
      </div>
    </div>
  );
}

// ─── Dropped form fields on canvas ────────────────────────────────────────────

function InputField() {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 500, color: '#374151', marginBottom: 4 }}>
        Full name
      </div>
      <div
        style={{
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: 6,
          padding: '6px 8px',
          background: '#fff',
          fontSize: 10,
          color: '#9CA3AF',
        }}
      >
        Enter your full name
      </div>
    </div>
  );
}

function SelectField() {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 500, color: '#374151', marginBottom: 4 }}>
        Country
      </div>
      <div
        style={{
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: 6,
          padding: '6px 8px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 10, color: '#374151' }}>Sweden</span>
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 4.5L6 8.5L10 4.5"
            stroke="#9CA3AF"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function DateField() {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 500, color: '#374151', marginBottom: 4 }}>
        Start date
      </div>
      <div
        style={{
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: 6,
          padding: '6px 8px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 10, color: '#9CA3AF' }}>Select date</span>
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
          <rect x="1.5" y="2.5" width="13" height="12" rx="2" stroke="#9CA3AF" strokeWidth="1.2" />
          <path
            d="M5 1.5v2M11 1.5v2M1.5 5.5h13"
            stroke="#9CA3AF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

function ButtonField() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div
        style={{
          background: ACCENT,
          borderRadius: 6,
          padding: '7px 16px',
          fontSize: 10,
          fontWeight: 500,
          color: '#fff',
        }}
      >
        Submit
      </div>
    </div>
  );
}

// ─── Design token annotation overlay ─────────────────────────────────────────

function TokenOverlay({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Spacing tick between field 1 and 2 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 44,
          width: 6,
          height: 1,
          background: ACCENT_40,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 54,
          width: 6,
          height: 1,
          background: ACCENT_40,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 2,
          top: 44,
          width: 1,
          height: 10,
          background: ACCENT_40,
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: 9,
          top: 46,
          fontSize: 7,
          color: ACCENT,
          fontWeight: 500,
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}
      >
        spacing-md
      </span>

      {/* Color swatch beside Submit button */}
      <div
        style={{
          position: 'absolute',
          right: 6,
          bottom: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span style={{ fontSize: 7, color: ACCENT, fontWeight: 500, letterSpacing: '0.02em' }}>
          color-accent
        </span>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: ACCENT,
          }}
        />
      </div>
    </div>
  );
}

// ─── Cursor SVG ───────────────────────────────────────────────────────────────

function Cursor() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden>
      <path
        d="M1.5 1.5L1.5 16L5.5 12.5L8 18.5L10 17.5L7.5 11.5L13 11.5L1.5 1.5Z"
        fill="#111827"
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Ghost (dragged component) ────────────────────────────────────────────────

function Ghost({ type }: { type: DroppedField | null }) {
  if (!type) return null;

  const content: Record<DroppedField, React.ReactNode> = {
    input: (
      <div style={{ width: 110 }}>
        <div
          style={{
            height: 5,
            width: '55%',
            background: '#E5E7EB',
            borderRadius: 2,
            marginBottom: 4,
          }}
        />
        <div
          style={{
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 5,
            padding: '4px 6px',
            background: '#FAFAFA',
          }}
        >
          <div style={{ height: 4, width: '70%', background: '#D1D5DB', borderRadius: 2 }} />
        </div>
      </div>
    ),
    select: (
      <div style={{ width: 110 }}>
        <div
          style={{
            height: 5,
            width: '40%',
            background: '#E5E7EB',
            borderRadius: 2,
            marginBottom: 4,
          }}
        />
        <div
          style={{
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 5,
            padding: '4px 6px',
            background: '#FAFAFA',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ height: 4, width: '55%', background: '#D1D5DB', borderRadius: 2 }} />
          <svg width="5" height="5" viewBox="0 0 8 8" fill="none">
            <path
              d="M1.5 2.5L4 5.5L6.5 2.5"
              stroke="#9CA3AF"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    ),
    date: (
      <div style={{ width: 110 }}>
        <div
          style={{
            height: 5,
            width: '50%',
            background: '#E5E7EB',
            borderRadius: 2,
            marginBottom: 4,
          }}
        />
        <div
          style={{
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 5,
            padding: '4px 6px',
            background: '#FAFAFA',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ height: 4, width: '50%', background: '#D1D5DB', borderRadius: 2 }} />
          <svg width="7" height="7" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="2" width="12" height="11" rx="2" stroke="#9CA3AF" strokeWidth="1.2" />
            <path
              d="M4 1v2M10 1v2M1 5h12"
              stroke="#9CA3AF"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    ),
    button: (
      <div style={{ width: 110 }}>
        <div style={{ background: ACCENT, borderRadius: 5, padding: '5px 0', textAlign: 'center' }}>
          <div
            style={{
              height: 4,
              width: '50%',
              background: 'rgba(255,255,255,0.6)',
              borderRadius: 2,
              margin: '0 auto',
            }}
          />
        </div>
      </div>
    ),
  };

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.10)',
        borderRadius: 6,
        padding: '6px 8px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        opacity: 0.85,
        transform: 'scale(1.05)',
      }}
    >
      {content[type]}
    </div>
  );
}

// ─── Inner animation ───────────────────────────────────────────────────────────

function FormBuilderInner() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  // Which sidebar thumbnails are "used" (dimmed)
  const [dimmed, setDimmed] = useState<Set<DroppedField>>(new Set());
  // Which fields have been dropped on the canvas
  const [dropped, setDropped] = useState<DroppedField[]>([]);
  // What is currently being ghosted
  const [ghostType, setGhostType] = useState<DroppedField | null>(null);
  // Sidebar highlight pulse
  const [highlighted, setHighlighted] = useState<DroppedField | null>(null);
  // Token overlay
  const [tokensVisible, setTokensVisible] = useState(false);

  // Refs for dropped field elements (for bounce animation)
  const inputRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Sidebar item center positions (% of stage, estimated for the layout)
  // These are set after mount based on actual layout measurements
  const sidebarInputRef = useRef<HTMLDivElement>(null);
  const sidebarSelectRef = useRef<HTMLDivElement>(null);
  const sidebarDateRef = useRef<HTMLDivElement>(null);
  const sidebarButtonRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

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
    setDropped(['input', 'date', 'button']);
    setDimmed(new Set(['input', 'date', 'button']));
    setGhostType(null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useAutoPlay(
    async isCancelled => {
      if (reducedMotion.current) {
        await new Promise<void>(() => {});
        return;
      }

      // Helper: get center of a sidebar thumb relative to stage
      function getCursorTarget(
        ref: React.RefObject<HTMLDivElement | null>,
      ): { x: number; y: number } | null {
        if (!ref.current || !stageRef.current) return null;
        const el = ref.current.getBoundingClientRect();
        const stage = stageRef.current.getBoundingClientRect();
        return {
          x: el.left - stage.left + el.width / 2,
          y: el.top - stage.top + el.height / 2,
        };
      }

      // Helper: get canvas drop position for each field slot
      function getDropTarget(slot: number): { x: number; y: number } | null {
        if (!canvasRef.current || !stageRef.current) return null;
        const canvas = canvasRef.current.getBoundingClientRect();
        const stage = stageRef.current.getBoundingClientRect();
        return {
          x: canvas.left - stage.left + canvas.width / 2,
          y: canvas.top - stage.top + 20 + slot * 44,
        };
      }

      // Move ghost to cursor position
      function positionGhost(x: number, y: number) {
        if (!ghostRef.current) return;
        gsap.set(ghostRef.current, { left: x - 55, top: y - 20 });
      }

      // Animate cursor from current pos to target
      async function animateCursorTo(x: number, y: number, duration: number) {
        await new Promise<void>(resolve => {
          gsap.to(cursorRef.current!, {
            left: x,
            top: y,
            duration,
            ease: 'power2.inOut',
            onComplete: resolve,
          });
        });
      }

      while (!isCancelled()) {
        // ── Reset ──────────────────────────────────────────────────────────────
        gsap.set(stageRef.current, { opacity: 1 });
        setDropped([]);
        setDimmed(new Set());
        setGhostType(null);
        setHighlighted(null);
        setTokensVisible(false);

        // Start cursor off-screen right
        if (cursorRef.current) gsap.set(cursorRef.current, { left: '98%', top: '50%', opacity: 1 });
        if (ghostRef.current) gsap.set(ghostRef.current, { opacity: 0 });
        await delay(16);
        if (isCancelled()) return;

        const dragDrop = async (
          field: DroppedField,
          sidebarRef: React.RefObject<HTMLDivElement | null>,
          slot: number,
          fieldRef: React.RefObject<HTMLDivElement | null>,
        ) => {
          if (isCancelled()) return;

          // 1. Cursor moves to sidebar item
          const sTarget = getCursorTarget(sidebarRef);
          if (sTarget) await animateCursorTo(sTarget.x, sTarget.y, 0.45);
          if (isCancelled()) return;

          // 2. Highlight pulse on thumbnail
          setHighlighted(field);
          await delay(200);
          if (isCancelled()) return;
          setHighlighted(null);

          // 3. Ghost appears at cursor
          const cursorPos = (() => {
            if (!cursorRef.current || !stageRef.current) return null;
            const el = cursorRef.current.getBoundingClientRect();
            const stage = stageRef.current.getBoundingClientRect();
            return { x: el.left - stage.left, y: el.top - stage.top };
          })();

          if (cursorPos) positionGhost(cursorPos.x, cursorPos.y);
          setGhostType(field);
          if (ghostRef.current) gsap.set(ghostRef.current, { opacity: 1 });
          await delay(16);
          if (isCancelled()) return;

          // 4. Cursor (+ ghost) arcs to canvas drop position
          const dTarget = getDropTarget(slot);
          if (dTarget && cursorPos) {
            const dx = dTarget.x - cursorPos.x;
            const dy = dTarget.y - cursorPos.y;
            const steps = 30;

            await new Promise<void>(resolve => {
              let step = 0;
              const tick = () => {
                if (isCancelled() || step >= steps) {
                  resolve();
                  return;
                }
                const t = step / steps;
                const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                const arcY = Math.sin(Math.PI * t) * -14; // arc peak
                const cx = cursorPos.x + dx * ease;
                const cy = cursorPos.y + dy * ease + arcY;
                gsap.set(cursorRef.current!, { left: cx, top: cy });
                positionGhost(cx, cy);
                step++;
                requestAnimationFrame(tick);
              };
              tick();
            });
          }
          if (isCancelled()) return;

          // 5. Drop: hide ghost, add field to canvas
          if (ghostRef.current) gsap.to(ghostRef.current, { opacity: 0, duration: 0.1 });
          setGhostType(null);
          setDropped(prev => [...prev, field]);
          setDimmed(prev => new Set([...prev, field]));

          // 6. Bounce the dropped field element
          await delay(60);
          if (fieldRef.current) {
            await new Promise<void>(resolve => {
              gsap.fromTo(
                fieldRef.current!,
                { scaleY: 1.05, scaleX: 1.02 },
                {
                  scaleY: 1,
                  scaleX: 1,
                  duration: 0.25,
                  ease: 'elastic.out(1.2, 0.5)',
                  onComplete: resolve,
                },
              );
            });
          }
          await delay(80);
        };

        // ── Scene 1: Input ─────────────────────────────────────────────────────
        await dragDrop('input', sidebarInputRef, 0, inputRef);
        if (isCancelled()) return;

        // ── Scene 2: Date ──────────────────────────────────────────────────────
        await dragDrop('date', sidebarDateRef, 1, dateRef);
        if (isCancelled()) return;

        // ── Scene 3: Button ────────────────────────────────────────────────────
        await dragDrop('button', sidebarButtonRef, 2, buttonRef);
        if (isCancelled()) return;

        // ── Scene 5: Cursor fades, token overlay appears ───────────────────────
        if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
        await delay(300);
        if (isCancelled()) return;
        setTokensVisible(true);

        // Tokens hold
        await delay(700);
        if (isCancelled()) return;
        setTokensVisible(false);
        await delay(400);
        if (isCancelled()) return;

        // ── Scene 6: Breath + hold ─────────────────────────────────────────────
        await new Promise<void>(resolve => {
          gsap.to(stageRef.current!, {
            scale: 1.003,
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

        // ── Fade out ────────────────────────────────────────────────────────────
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

  const fieldRefs: Record<DroppedField, React.RefObject<HTMLDivElement | null>> = {
    input: inputRef,
    select: selectRef,
    date: dateRef,
    button: buttonRef,
  };

  const fieldComponents: Record<DroppedField, React.ReactNode> = {
    input: <InputField />,
    select: <SelectField />,
    date: <DateField />,
    button: <ButtonField />,
  };

  return (
    <div
      ref={stageRef}
      aria-label="Animated demonstration of the Form Builder — components are dragged from a library into a canvas to assemble a form, with design system tokens briefly visible behind the layout."
      style={{
        position: 'relative',
        height: 336,
        borderRadius: 16,
        background: '#FAFAFA',
        overflow: 'hidden',
      }}
    >
      {/* Glass container */}
      <div
        style={{
          position: 'absolute',
          inset: 7,
          background: '#FFFFFF',
          borderRadius: 12,
          border: '1px solid rgba(0,0,0,0.07)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/* ── Left: Component library sidebar ──────────────────────────────── */}
        <div
          style={{
            width: 72,
            borderRight: '1px solid rgba(0,0,0,0.07)',
            background: '#FAFAFA',
            padding: '8px 6px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 7,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#9CA3AF',
              marginBottom: 2,
            }}
          >
            Components
          </div>

          <div
            ref={sidebarInputRef}
            style={{
              background: highlighted === 'input' ? 'rgba(127,119,221,0.08)' : 'transparent',
              borderRadius: 5,
              padding: 3,
              transition: 'background 0.2s ease',
            }}
          >
            <InputThumb dimmed={dimmed.has('input')} />
          </div>

          <div
            ref={sidebarSelectRef}
            style={{
              background: highlighted === 'select' ? 'rgba(127,119,221,0.08)' : 'transparent',
              borderRadius: 5,
              padding: 3,
              transition: 'background 0.2s ease',
            }}
          >
            <SelectThumb dimmed={dimmed.has('select')} />
          </div>

          <div
            ref={sidebarDateRef}
            style={{
              background: highlighted === 'date' ? 'rgba(127,119,221,0.08)' : 'transparent',
              borderRadius: 5,
              padding: 3,
              transition: 'background 0.2s ease',
            }}
          >
            <DateThumb dimmed={dimmed.has('date')} />
          </div>

          <div
            ref={sidebarButtonRef}
            style={{
              background: highlighted === 'button' ? 'rgba(127,119,221,0.08)' : 'transparent',
              borderRadius: 5,
              padding: 3,
              transition: 'background 0.2s ease',
            }}
          >
            <ButtonThumb dimmed={dimmed.has('button')} />
          </div>
        </div>

        {/* ── Right: Canvas ─────────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div
            style={{
              fontSize: 7,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#9CA3AF',
              padding: '8px 10px 5px',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            Form Builder
          </div>

          <div
            style={{
              flex: 1,
              padding: '8px 10px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Empty state drop zone */}
            <div
              style={{
                position: 'absolute',
                inset: 6,
                border: '1.5px dashed rgba(0,0,0,0.12)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: dropped.length === 0 ? 1 : 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
              }}
            >
              <span style={{ fontSize: 10, color: '#C4C4C4' }}>Drag components here</span>
            </div>

            {/* Canvas — narrowed, centered */}
            <div
              ref={canvasRef}
              style={{
                position: 'relative',
                width: 200,
                border: dropped.length > 0 ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
                borderRadius: 8,
                background: dropped.length > 0 ? 'rgba(249,250,251,0.6)' : 'transparent',
                padding: '8px 10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
            >
              {/* Token annotation overlay */}
              <TokenOverlay visible={tokensVisible} />

              {(['input', 'date', 'button'] as DroppedField[]).map(field => {
                const isDropped = dropped.includes(field);
                return (
                  <div
                    key={field}
                    ref={fieldRefs[field]}
                    style={{
                      opacity: isDropped ? 1 : 0,
                      transform: isDropped ? 'translateY(0)' : 'translateY(6px)',
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                    }}
                  >
                    {fieldComponents[field]}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Cursor — absolute positioned over entire stage */}
      <div
        ref={cursorRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 20,
          willChange: 'left, top',
        }}
      >
        <Cursor />
      </div>

      {/* Ghost — dragged component copy */}
      <div
        ref={ghostRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 19,
          opacity: 0,
          willChange: 'left, top',
        }}
      >
        <Ghost type={ghostType} />
      </div>
    </div>
  );
}

// ─── Public export with IntersectionObserver gate ─────────────────────────────

export function FormBuilderHeroCinematic() {
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

  return <div ref={sentinelRef}>{isVisible && <FormBuilderInner />}</div>;
}
