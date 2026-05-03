'use client';

import { useState } from 'react';

// ─── Shared constants ─────────────────────────────────────────────────────────

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

// ─── Shared pieces ────────────────────────────────────────────────────────────

function AssistantBubble() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-zinc-100 px-3 py-2 text-[12px] leading-relaxed text-zinc-900 dark:bg-zinc-700 dark:text-gray-100">
        I&apos;ve improved the requirement. Anything else I can help with?
      </div>
    </div>
  );
}

function InputBar() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
      <span className="flex-1 text-[12px] text-zinc-400 dark:text-gray-500">Write your prompt</span>
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-gray-400">
        <SendIcon />
      </span>
    </div>
  );
}

// ─── Snippet wrapper ──────────────────────────────────────────────────────────

function Snippet({ children, shipped }: { children: React.ReactNode; shipped?: boolean }) {
  return (
    <div
      className={`flex aspect-[3/2] flex-col gap-3 rounded-xl p-4 sm:aspect-[4/5] sm:p-5 ${
        shipped
          ? 'border border-violet-300/70 bg-zinc-50 dark:border-violet-500/40 dark:bg-zinc-800/60'
          : 'border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/60'
      }`}
    >
      {children}
    </div>
  );
}

// ─── Column wrapper ───────────────────────────────────────────────────────────

function Column({
  eyebrow,
  title,
  caption,
  shipped,
  children,
}: {
  eyebrow: string;
  title: string;
  caption: string;
  shipped?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2" role="group" aria-label={`${eyebrow} — ${title}`}>
      <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-zinc-400 dark:text-gray-500">
        {eyebrow}
      </span>
      <p className="text-[15px] font-medium leading-snug text-zinc-900 dark:text-gray-100">
        {title}
      </p>
      <Snippet shipped={shipped}>{children}</Snippet>
      <div className="flex items-center gap-1.5">
        <p className="text-[12px] leading-relaxed text-zinc-500 dark:text-gray-400">{caption}</p>
        {shipped && (
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.04em] text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
            shipped
          </span>
        )}
      </div>
    </div>
  );
}

// ─── V1: Form pattern ─────────────────────────────────────────────────────────

function FormSnippet() {
  return (
    <>
      <AssistantBubble />
      <div className="flex flex-1 flex-col rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="mb-3 text-[11.5px] font-medium text-zinc-600 dark:text-gray-300">
          Can I help you with something else?
        </p>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-start gap-2.5">
            <span className="mt-[1px] flex h-[13px] w-[13px] flex-shrink-0 items-center justify-center rounded-full border-2 border-violet-600 bg-white dark:bg-zinc-900">
              <span className="h-[5px] w-[5px] rounded-full bg-violet-600" />
            </span>
            <span className="text-[11px] leading-snug text-zinc-500 dark:text-gray-400">
              I noticed this requirement might contain multiple thoughts. Would you like me to split
              it into atomic requirements?
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="mt-[1px] flex h-[13px] w-[13px] flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900" />
            <span className="text-[11px] leading-snug text-zinc-500 dark:text-gray-400">
              Do you want to generate test cases to validate this requirement?
            </span>
          </div>
        </div>
        <div className="mt-auto flex justify-end pt-3">
          <span className="rounded-lg bg-violet-600 px-3 py-1 text-[11px] font-medium text-white opacity-60">
            Done
          </span>
        </div>
      </div>
      <InputBar />
    </>
  );
}

// ─── V2: Inline suggestions ───────────────────────────────────────────────────

function InlineSnippet() {
  return (
    <>
      <AssistantBubble />
      <div className="flex flex-1 flex-col gap-2 pl-0.5">
        <p className="text-[12px] leading-relaxed text-zinc-900 dark:text-gray-100">
          Can I help you with <strong className="font-semibold">something else?</strong>
        </p>
        <ul className="flex flex-col gap-1.5">
          <li className="flex items-start gap-2 text-[11.5px] leading-relaxed text-zinc-500 dark:text-gray-400">
            <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
            Check if this requirement violates atomicity and needs splitting
          </li>
          <li className="flex items-start gap-2 text-[11.5px] leading-relaxed text-zinc-500 dark:text-gray-400">
            <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
            Generate test cases for this requirement
          </li>
        </ul>
      </div>
      <InputBar />
    </>
  );
}

// ─── V3: Chip actions ─────────────────────────────────────────────────────────

function ChipsSnippet() {
  return (
    <>
      <AssistantBubble />
      <div className="flex-1" />
      <div className="flex flex-wrap gap-1.5">
        {CHIPS.map(chip => (
          <span
            key={chip}
            className="rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 dark:border-zinc-600 dark:bg-zinc-700 dark:text-gray-300 sm:px-2.5 sm:py-1 sm:text-[11px]"
          >
            {chip}
          </span>
        ))}
      </div>
      <InputBar />
    </>
  );
}

// ─── Mobile carousel ─────────────────────────────────────────────────────────

const COLUMNS: {
  eyebrow: string;
  title: string;
  caption: string;
  shipped?: boolean;
  snippet: React.ReactNode;
}[] = [
  {
    eyebrow: 'v1',
    title: 'Form pattern',
    caption: 'Structured, but blocked the flow',
    snippet: <FormSnippet />,
  },
  {
    eyebrow: 'v2',
    title: 'Inline suggestions',
    caption: "Friendlier, but couldn't be acted on",
    snippet: <InlineSnippet />,
  },
  {
    eyebrow: 'v3',
    title: 'Chip actions',
    caption: 'Available, never blocking',
    shipped: true,
    snippet: <ChipsSnippet />,
  },
];

function MobileCarousel() {
  const [active, setActive] = useState(0);
  const { eyebrow, title, caption, shipped, snippet } = COLUMNS[active];

  return (
    <div
      className="mx-auto max-w-md sm:hidden"
      aria-label="Three iterations of the assistant's follow-up suggestions: form pattern, inline suggestions, and chip actions"
    >
      <Column eyebrow={eyebrow} title={title} caption={caption} shipped={shipped}>
        {snippet}
      </Column>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          onClick={() => setActive(i => (i - 1 + COLUMNS.length) % COLUMNS.length)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-gray-400"
          aria-label="Previous"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M8.5 2.5L4 7l4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={() => setActive(i => (i + 1) % COLUMNS.length)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-gray-400"
          aria-label="Next"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5.5 2.5L10 7l-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Comparison grid ──────────────────────────────────────────────────────────

export function SuggestionComparisonDemo() {
  return (
    <>
      <MobileCarousel />

      {/* Tablet/desktop: three-column grid */}
      <div
        className="hidden sm:grid sm:grid-cols-3 sm:gap-5"
        aria-label="Three iterations of the assistant's follow-up suggestions: form pattern, inline suggestions, and chip actions"
      >
        <Column eyebrow="v1" title="Form pattern" caption="Structured, but blocked the flow">
          <FormSnippet />
        </Column>

        <Column
          eyebrow="v2"
          title="Inline suggestions"
          caption="Friendlier, but couldn't be acted on"
        >
          <InlineSnippet />
        </Column>

        <Column eyebrow="v3" title="Chip actions" caption="Available, never blocking" shipped>
          <ChipsSnippet />
        </Column>
      </div>
    </>
  );
}
