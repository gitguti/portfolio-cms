'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

const OPTIONS = [
  'Continuous improvement',
  'Client',
  'Customer engagement',
  'New product development',
  'Strategic business',
];

const VARIANTS = ['simple', 'multi', 'search'] as const;
type Variant = (typeof VARIANTS)[number];

// ─── Shared helpers ───────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

const moveCursor = (
  ref: React.RefObject<HTMLDivElement | null>,
  x: number,
  y: number,
  duration = 0.35,
) =>
  new Promise<void>(resolve => {
    if (!ref.current) return resolve();
    gsap.to(ref.current, {
      left: x,
      top: y,
      opacity: 1,
      duration,
      ease: 'power2.inOut',
      onComplete: resolve,
    });
  });

const clickCursor = (ref: React.RefObject<HTMLDivElement | null>) =>
  new Promise<void>(resolve => {
    if (!ref.current) return resolve();
    gsap
      .timeline({ onComplete: resolve })
      .to(ref.current, { scale: 0.7, duration: 0.08, ease: 'power2.in' })
      .to(ref.current, { scale: 1, duration: 0.12, ease: 'back.out(2)' });
  });

const hideCursor = (ref: React.RefObject<HTMLDivElement | null>) => {
  if (ref.current) gsap.to(ref.current, { opacity: 0, duration: 0.2 });
};

const openList = (el: HTMLDivElement | null) =>
  new Promise<void>(resolve => {
    if (!el) return resolve();
    gsap.fromTo(
      el,
      { scaleY: 0, opacity: 0, y: -8 },
      {
        scaleY: 1,
        opacity: 1,
        y: 0,
        duration: 0.22,
        ease: 'power2.out',
        transformOrigin: 'top',
        onComplete: resolve,
      },
    );
  });

const closeList = (el: HTMLDivElement | null) =>
  new Promise<void>(resolve => {
    if (!el) return resolve();
    gsap.to(el, {
      scaleY: 0,
      opacity: 0,
      y: -8,
      duration: 0.18,
      ease: 'power2.in',
      transformOrigin: 'top',
      onComplete: resolve,
    });
  });

// ─── Fake cursor ──────────────────────────────────────────────────────────────

function Cursor({ cursorRef }: { cursorRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={cursorRef}
      className="pointer-events-none absolute z-50 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 opacity-0 shadow-md ring-2 ring-white"
      style={{ top: 0, left: 0 }}
    />
  );
}

// ─── Simple select ────────────────────────────────────────────────────────────

function SimpleSelectDemo({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await delay(600);
      const wrapper = wrapperRef.current;
      const trigger = triggerRef.current;
      if (!wrapper || !trigger || cancelled) return;

      // Move to trigger and click
      const tr = trigger.getBoundingClientRect();
      const wr = wrapper.getBoundingClientRect();
      await moveCursor(
        cursorRef,
        tr.left - wr.left + tr.width / 2,
        tr.top - wr.top + tr.height / 2,
      );
      if (cancelled) return;
      await clickCursor(cursorRef);
      if (cancelled) return;

      // Open — wait a frame so React renders the list before animating it
      setOpen(true);
      await delay(16);
      await openList(listRef.current);
      await delay(350);

      // Hover over options 0 → 1 → 2, then click 2
      const listEl = listRef.current;
      if (!listEl || cancelled) return;
      const optionEls = listEl.querySelectorAll('[data-opt]');

      for (let i = 0; i <= 2; i++) {
        if (!optionEls[i] || cancelled) return;
        const r = optionEls[i].getBoundingClientRect();
        const wr2 = wrapper.getBoundingClientRect();
        await moveCursor(
          cursorRef,
          r.left - wr2.left + r.width / 2,
          r.top - wr2.top + r.height / 2,
          0.22,
        );
        setHovered(i);
        if (i < 2) await delay(130);
      }

      if (cancelled) return;
      await delay(180);
      await clickCursor(cursorRef);

      // Close with selection
      setSelected(OPTIONS[2]);
      setHovered(null);
      await closeList(listRef.current);
      setOpen(false);

      await delay(900);
      hideCursor(cursorRef);
      await delay(400);
      if (!cancelled) onDoneRef.current();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Cursor cursorRef={cursorRef} />
      <button
        ref={triggerRef}
        className="flex w-full items-center justify-between rounded-xl border border-black/[0.13] bg-white px-4 py-3 text-left text-sm text-zinc-700"
      >
        <span className={selected ? 'text-zinc-900' : 'text-zinc-400'}>
          {selected ?? 'Select an option'}
        </span>
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
      </button>

      {open && (
        <div
          ref={listRef}
          className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-sm"
          style={{ transformOrigin: 'top' }}
        >
          {OPTIONS.map((opt, i) => (
            <div
              key={opt}
              data-opt
              className={`w-full px-4 py-2.5 text-left text-sm text-zinc-700 transition-colors ${
                hovered === i ? 'bg-zinc-50' : ''
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Multi-select with checkboxes ─────────────────────────────────────────────

function CheckboxControl({ checked }: { checked: boolean }) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const prevChecked = useRef(false);

  useEffect(() => {
    if (checked && !prevChecked.current && boxRef.current) {
      gsap.fromTo(boxRef.current, { scale: 0 }, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
    }
    prevChecked.current = checked;
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

function MultiSelectDemo({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<number | null>(null);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const label =
    selected.size === 0
      ? 'Select options'
      : selected.size === 1
      ? [...selected][0]
      : `${selected.size} selected`;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await delay(600);
      const wrapper = wrapperRef.current;
      const trigger = triggerRef.current;
      if (!wrapper || !trigger || cancelled) return;

      // Move to trigger and click open
      const tr = trigger.getBoundingClientRect();
      const wr = wrapper.getBoundingClientRect();
      await moveCursor(
        cursorRef,
        tr.left - wr.left + tr.width / 2,
        tr.top - wr.top + tr.height / 2,
      );
      if (cancelled) return;
      await clickCursor(cursorRef);
      if (cancelled) return;

      setOpen(true);
      await delay(16);
      await openList(listRef.current);
      await delay(350);

      // Click options at indices 0, 2, 4
      for (const idx of [0, 2, 4]) {
        if (cancelled) return;
        const listEl = listRef.current;
        if (!listEl) return;
        const rows = listEl.querySelectorAll('div[data-row]');
        if (!rows[idx]) continue;
        const r = rows[idx].getBoundingClientRect();
        const wr2 = wrapper.getBoundingClientRect();
        await moveCursor(
          cursorRef,
          r.left - wr2.left + r.width / 2,
          r.top - wr2.top + r.height / 2,
          0.28,
        );
        setHovered(idx);
        await delay(150);
        await clickCursor(cursorRef);
        setSelected(prev => {
          const next = new Set(prev);
          next.add(OPTIONS[idx]);
          return next;
        });
        await delay(320);
      }

      if (cancelled) return;
      setHovered(null);
      await delay(400);

      // Click trigger to close
      const tr2 = trigger.getBoundingClientRect();
      const wr3 = wrapper.getBoundingClientRect();
      await moveCursor(
        cursorRef,
        tr2.left - wr3.left + tr2.width / 2,
        tr2.top - wr3.top + tr2.height / 2,
      );
      await clickCursor(cursorRef);
      await closeList(listRef.current);
      setOpen(false);

      await delay(900);
      hideCursor(cursorRef);
      await delay(400);
      if (!cancelled) onDoneRef.current();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Cursor cursorRef={cursorRef} />
      <button
        ref={triggerRef}
        className="flex w-full items-center justify-between rounded-xl border border-black/[0.13] bg-white px-4 py-3 text-left text-sm"
      >
        <span className={selected.size > 0 ? 'text-zinc-900' : 'text-zinc-400'}>{label}</span>
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
      </button>

      {open && (
        <div
          ref={listRef}
          className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-sm"
          style={{ transformOrigin: 'top' }}
        >
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
    </div>
  );
}

// ─── Searchable combobox ──────────────────────────────────────────────────────

function SearchableComboboxDemo({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const filtered = OPTIONS.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await delay(600);
      const wrapper = wrapperRef.current;
      const trigger = triggerRef.current;
      if (!wrapper || !trigger || cancelled) return;

      // Move to trigger and click
      const tr = trigger.getBoundingClientRect();
      const wr = wrapper.getBoundingClientRect();
      await moveCursor(
        cursorRef,
        tr.left - wr.left + tr.width / 2,
        tr.top - wr.top + tr.height / 2,
      );
      if (cancelled) return;
      await clickCursor(cursorRef);
      if (cancelled) return;

      setOpen(true);
      await delay(16);
      await openList(listRef.current);
      await delay(400);

      // Type "cus" character by character
      for (const char of 'cus') {
        if (cancelled) return;
        setQuery(prev => prev + char);
        await delay(80 + Math.random() * 60);
      }
      await delay(350);

      // Hover then click the first filtered result
      if (cancelled) return;
      const listEl = listRef.current;
      if (!listEl) return;
      const optionEls = listEl.querySelectorAll('div[data-opt]');
      if (optionEls[0]) {
        const r = optionEls[0].getBoundingClientRect();
        const wr2 = wrapper.getBoundingClientRect();
        await moveCursor(
          cursorRef,
          r.left - wr2.left + r.width / 2,
          r.top - wr2.top + r.height / 2,
          0.25,
        );
        setHovered(0);
        await delay(200);
        if (cancelled) return;
        await clickCursor(cursorRef);
        setSelected(filtered[0] ?? OPTIONS[2]);
        setQuery('');
        setHovered(null);
        await closeList(listRef.current);
        setOpen(false);
      }

      await delay(900);
      hideCursor(cursorRef);
      await delay(400);
      if (!cancelled) onDoneRef.current();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayFiltered = OPTIONS.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Cursor cursorRef={cursorRef} />
      <button
        ref={triggerRef}
        className="flex w-full items-center justify-between rounded-xl border border-black/[0.13] bg-white px-4 py-3 text-left text-sm"
      >
        <span className={selected ? 'text-zinc-900' : 'text-zinc-400'}>
          {selected ?? 'Select an option'}
        </span>
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
      </button>

      {open && (
        <div
          ref={listRef}
          className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-sm"
          style={{ transformOrigin: 'top' }}
        >
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
                className={`w-full px-4 py-2.5 text-left text-sm text-zinc-700 transition-colors ${
                  hovered === i ? 'bg-zinc-50' : ''
                }`}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const VARIANT_LABELS: Record<Variant, string> = {
  simple: 'Simple',
  multi: 'Multi-select',
  search: 'Searchable',
};

interface ArticleDropdownPatternDemoProps {
  demo?: { variant?: string | null };
}

export const ArticleDropdownPatternDemo = ({ demo }: ArticleDropdownPatternDemoProps) => {
  const initialVariant = (demo?.variant as Variant) ?? 'simple';
  const [activeVariant, setActiveVariant] = useState<Variant>(initialVariant);
  const [key, setKey] = useState(0);
  const demoRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const advanceVariant = () => {
    const currentIdx = VARIANTS.indexOf(activeVariant);
    const nextVariant = VARIANTS[(currentIdx + 1) % VARIANTS.length];

    // Animate tab pill
    if (tabsRef.current) {
      const pills = tabsRef.current.querySelectorAll('button');
      const nextPill = pills[(currentIdx + 1) % VARIANTS.length];
      if (nextPill) {
        gsap.fromTo(nextPill, { scale: 0.9 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
      }
    }

    // Crossfade demo area
    gsap.to(demoRef.current, {
      opacity: 0,
      y: 6,
      duration: 0.18,
      onComplete: () => {
        setActiveVariant(nextVariant);
        setKey(k => k + 1);
        gsap.fromTo(
          demoRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' },
        );
      },
    });
  };

  const switchVariant = (v: Variant) => {
    if (v === activeVariant) return;
    gsap.to(demoRef.current, {
      opacity: 0,
      duration: 0.12,
      onComplete: () => {
        setActiveVariant(v);
        setKey(k => k + 1);
        gsap.to(demoRef.current, { opacity: 1, duration: 0.15 });
      },
    });
  };

  return (
    <div className="rounded-2xl border border-black/[0.08] bg-[rgb(249,250,251)] p-6 pb-[220px]">
      {/* Variant tabs */}
      <div ref={tabsRef} className="mb-5 flex flex-wrap gap-2">
        {VARIANTS.map(v => (
          <button
            key={v}
            onClick={() => switchVariant(v)}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
              activeVariant === v
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-black/[0.13] bg-white text-zinc-600 hover:border-zinc-400'
            }`}
          >
            {VARIANT_LABELS[v]}
          </button>
        ))}
      </div>

      {/* Demo area */}
      <div ref={demoRef} className="relative w-full max-w-[280px]">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400">
          Status
        </p>
        {activeVariant === 'simple' && <SimpleSelectDemo key={key} onDone={advanceVariant} />}
        {activeVariant === 'multi' && <MultiSelectDemo key={key} onDone={advanceVariant} />}
        {activeVariant === 'search' && <SearchableComboboxDemo key={key} onDone={advanceVariant} />}
      </div>
    </div>
  );
};
