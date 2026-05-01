'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import {
  clickCursor,
  closeList,
  delay,
  hideCursor,
  moveCursor,
  openList,
  relPos,
} from './demoHelpers';
import { DemoStep, PatternDemoShell, StepProps } from './PatternDemoShell';
import { useAutoPlay } from './useAutoPlay';

const OPTIONS = [
  'Continuous improvement',
  'Client',
  'Customer engagement',
  'New product development',
  'Strategic business',
];

// ─── Shared UI pieces ─────────────────────────────────────────────────────────

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className={`text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <path
      d="M2 4l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const triggerCls =
  'flex w-full items-center justify-between rounded-xl border border-black/[0.13] bg-white px-4 py-3 text-left text-sm';
const listCls =
  'absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-sm';

// ─── Step 1: Simple select ────────────────────────────────────────────────────

function SimpleStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useAutoPlay(async isCancelled => {
    await delay(600);
    const wrapper = wrapperRef.current;
    const trigger = triggerRef.current;
    if (!wrapper || !trigger || isCancelled()) return;

    await moveCursor(cursorRef, ...(Object.values(relPos(trigger, wrapper)) as [number, number]));
    if (isCancelled()) return;
    await clickCursor(cursorRef);
    if (isCancelled()) return;

    setOpen(true);
    await delay(16);
    await openList(listRef.current);
    await delay(350);

    const opts = listRef.current?.querySelectorAll('[data-opt]') ?? [];
    for (let i = 0; i <= 2; i++) {
      if (!opts[i] || isCancelled()) return;
      await moveCursor(
        cursorRef,
        ...(Object.values(relPos(opts[i], wrapper)) as [number, number]),
        0.22,
      );
      setHovered(i);
      if (i < 2) await delay(130);
    }

    if (isCancelled()) return;
    await delay(180);
    await clickCursor(cursorRef);
    setSelected(OPTIONS[2]);
    setHovered(null);
    await closeList(listRef.current);
    setOpen(false);

    await delay(900);
    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  return (
    <>
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400">
        Status
      </p>
      <button ref={triggerRef} className={triggerCls}>
        <span className={selected ? 'text-zinc-900' : 'text-zinc-400'}>
          {selected ?? 'Select an option'}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div ref={listRef} className={listCls} style={{ transformOrigin: 'top' }}>
          {OPTIONS.map((opt, i) => (
            <div
              key={opt}
              data-opt
              className={`w-full px-4 py-2.5 text-sm text-zinc-700 transition-colors ${
                hovered === i ? 'bg-zinc-50' : ''
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Step 2: Multi-select with checkboxes ─────────────────────────────────────

function CheckboxControl({ checked }: { checked: boolean }) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const prev = useRef(false);
  useEffect(() => {
    if (checked && !prev.current && boxRef.current)
      gsap.fromTo(boxRef.current, { scale: 0 }, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
    prev.current = checked;
  }, [checked]);

  return (
    <span
      className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded transition-colors ${
        checked ? 'bg-zinc-900' : 'border border-black/[0.2] bg-white'
      }`}
    >
      {checked && (
        <span ref={boxRef} className="flex items-center justify-center">
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path
              d="M1 3.5L3.5 6L8 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </span>
  );
}

function MultiStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const label =
    selected.size === 0
      ? 'Select options'
      : selected.size === 1
      ? [...selected][0]
      : `${selected.size} selected`;

  useAutoPlay(async isCancelled => {
    await delay(600);
    const wrapper = wrapperRef.current;
    const trigger = triggerRef.current;
    if (!wrapper || !trigger || isCancelled()) return;

    await moveCursor(cursorRef, ...(Object.values(relPos(trigger, wrapper)) as [number, number]));
    if (isCancelled()) return;
    await clickCursor(cursorRef);
    if (isCancelled()) return;

    setOpen(true);
    await delay(16);
    await openList(listRef.current);
    await delay(350);

    for (const idx of [0, 2, 4]) {
      if (isCancelled()) return;
      const rows = listRef.current?.querySelectorAll('[data-row]') ?? [];
      if (!rows[idx]) continue;
      await moveCursor(
        cursorRef,
        ...(Object.values(relPos(rows[idx], wrapper)) as [number, number]),
        0.28,
      );
      setHovered(idx);
      await delay(150);
      await clickCursor(cursorRef);
      setSelected(prev => {
        const n = new Set(prev);
        n.add(OPTIONS[idx]);
        return n;
      });
      await delay(320);
    }

    if (isCancelled()) return;
    setHovered(null);
    await delay(400);

    await moveCursor(cursorRef, ...(Object.values(relPos(trigger, wrapper)) as [number, number]));
    await clickCursor(cursorRef);
    await closeList(listRef.current);
    setOpen(false);

    await delay(900);
    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  return (
    <>
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400">
        Status
      </p>
      <button ref={triggerRef} className={triggerCls}>
        <span className={selected.size > 0 ? 'text-zinc-900' : 'text-zinc-400'}>{label}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div ref={listRef} className={listCls} style={{ transformOrigin: 'top' }}>
          {OPTIONS.map((opt, i) => (
            <div
              key={opt}
              data-row
              className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                hovered === i ? 'bg-zinc-50' : ''
              }`}
            >
              <CheckboxControl checked={selected.has(opt)} />
              <span className="text-sm text-zinc-700">{opt}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Step 3: Searchable combobox ──────────────────────────────────────────────

function SearchStep({ wrapperRef, cursorRef, onDone }: StepProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const filtered = OPTIONS.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  useAutoPlay(async isCancelled => {
    await delay(600);
    const wrapper = wrapperRef.current;
    const trigger = triggerRef.current;
    if (!wrapper || !trigger || isCancelled()) return;

    await moveCursor(cursorRef, ...(Object.values(relPos(trigger, wrapper)) as [number, number]));
    if (isCancelled()) return;
    await clickCursor(cursorRef);
    if (isCancelled()) return;

    setOpen(true);
    await delay(16);
    await openList(listRef.current);
    await delay(400);

    for (const char of 'cus') {
      if (isCancelled()) return;
      setQuery(prev => prev + char);
      await delay(80 + Math.random() * 60);
    }
    await delay(350);

    if (isCancelled()) return;
    const opts = listRef.current?.querySelectorAll('[data-opt]') ?? [];
    if (opts[0]) {
      await moveCursor(
        cursorRef,
        ...(Object.values(relPos(opts[0], wrapper)) as [number, number]),
        0.25,
      );
      setHovered(0);
      await delay(200);
      if (isCancelled()) return;
      await clickCursor(cursorRef);
      setSelected(OPTIONS.find(o => o.toLowerCase().includes('cus')) ?? OPTIONS[2]);
      setQuery('');
      setHovered(null);
      await closeList(listRef.current);
      setOpen(false);
    }

    await delay(900);
    hideCursor(cursorRef);
    await delay(400);
  }, onDone);

  const displayFiltered = OPTIONS.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400">
        Status
      </p>
      <button ref={triggerRef} className={triggerCls}>
        <span className={selected ? 'text-zinc-900' : 'text-zinc-400'}>
          {selected ?? 'Select an option'}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div ref={listRef} className={listCls} style={{ transformOrigin: 'top' }}>
          <div className="flex items-center gap-2 border-b border-black/[0.06] px-3 py-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="flex-shrink-0 text-zinc-400"
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
              <path
                d="M10 10l2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <span className="w-full text-sm text-zinc-700">
              {query || <span className="text-zinc-400">Search…</span>}
            </span>
          </div>
          <div className="max-h-[180px] overflow-y-auto">
            {displayFiltered.map((opt, i) => (
              <div
                key={opt}
                data-opt
                className={`w-full px-4 py-2.5 text-sm text-zinc-700 transition-colors ${
                  hovered === i ? 'bg-zinc-50' : ''
                }`}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Demo definition ──────────────────────────────────────────────────────────

export const DROPDOWN_STEPS: DemoStep[] = [
  { label: 'Simple', component: SimpleStep },
  { label: 'Multi-select', component: MultiStep },
  { label: 'Searchable', component: SearchStep },
];

export function DropdownDemo() {
  return <PatternDemoShell steps={DROPDOWN_STEPS} />;
}
