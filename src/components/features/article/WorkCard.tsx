import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface WorkCardProps {
  article: PageBlogPostFieldsFragment;
  variant: 'pattern' | 'form' | 'requirements';
  className?: string;
  comingSoon?: boolean;
}

// ── Pattern Discovery Visual ──────────────────────────────────────────────────
const PatternVisual = () => (
  <div className="absolute inset-0" aria-hidden="true">
    {/* Light mode SVG */}
    <svg
      className="absolute inset-0 h-full w-full dark:hidden"
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle
        cx="200"
        cy="290"
        r="240"
        fill="none"
        stroke="#6E40C9"
        strokeWidth="1"
        strokeDasharray="4,6"
        opacity="0.35"
      />
      <circle
        cx="200"
        cy="290"
        r="175"
        fill="none"
        stroke="#E0234E"
        strokeWidth="1"
        strokeDasharray="4,6"
        opacity="0.35"
      />
      <circle
        cx="200"
        cy="290"
        r="112"
        fill="none"
        stroke="#1A1A2E"
        strokeWidth="1"
        strokeDasharray="4,6"
        opacity="0.25"
      />
      <circle
        cx="200"
        cy="290"
        r="55"
        fill="none"
        stroke="#6E40C9"
        strokeWidth="1"
        strokeDasharray="3,5"
        opacity="0.2"
      />
      <line x1="200" y1="290" x2="60" y2="180" stroke="rgba(110,64,201,0.2)" strokeWidth="1" />
      <line x1="200" y1="290" x2="140" y2="110" stroke="rgba(110,64,201,0.2)" strokeWidth="1" />
      <line x1="200" y1="290" x2="200" y2="95" stroke="rgba(110,64,201,0.2)" strokeWidth="1" />
      <line x1="200" y1="290" x2="300" y2="120" stroke="rgba(224,35,78,0.2)" strokeWidth="1" />
      <line x1="200" y1="290" x2="360" y2="200" stroke="rgba(224,35,78,0.2)" strokeWidth="1" />
      <line x1="200" y1="290" x2="30" y2="260" stroke="rgba(26,26,46,0.15)" strokeWidth="1" />
      <circle cx="200" cy="290" r="8" fill="#6E40C9" opacity="0.9" />
      <circle cx="200" cy="290" r="18" fill="rgba(110,64,201,0.12)" />
      <circle cx="60" cy="180" r="7" fill="#185FA5" opacity="0.8" />
      <circle cx="140" cy="110" r="9" fill="#185FA5" opacity="0.85" />
      <circle cx="200" cy="95" r="6" fill="#185FA5" opacity="0.7" />
      <circle cx="300" cy="120" r="8" fill="#E0234E" opacity="0.75" />
      <circle cx="360" cy="200" r="5" fill="#E0234E" opacity="0.6" />
      <circle cx="30" cy="260" r="5" fill="#1A1A2E" opacity="0.4" />
      <circle cx="370" cy="280" r="4" fill="#1A1A2E" opacity="0.3" />
    </svg>
    {/* Dark mode SVG — boosted opacity for visibility */}
    <svg
      className="absolute inset-0 hidden h-full w-full dark:block"
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle
        cx="200"
        cy="290"
        r="240"
        fill="none"
        stroke="#9D6FF0"
        strokeWidth="1"
        strokeDasharray="4,6"
        opacity="0.5"
      />
      <circle
        cx="200"
        cy="290"
        r="175"
        fill="none"
        stroke="#F04B72"
        strokeWidth="1"
        strokeDasharray="4,6"
        opacity="0.5"
      />
      <circle
        cx="200"
        cy="290"
        r="112"
        fill="none"
        stroke="#A89EC9"
        strokeWidth="1"
        strokeDasharray="4,6"
        opacity="0.35"
      />
      <circle
        cx="200"
        cy="290"
        r="55"
        fill="none"
        stroke="#9D6FF0"
        strokeWidth="1"
        strokeDasharray="3,5"
        opacity="0.4"
      />
      <line x1="200" y1="290" x2="60" y2="180" stroke="rgba(157,111,240,0.45)" strokeWidth="1" />
      <line x1="200" y1="290" x2="140" y2="110" stroke="rgba(157,111,240,0.45)" strokeWidth="1" />
      <line x1="200" y1="290" x2="200" y2="95" stroke="rgba(157,111,240,0.45)" strokeWidth="1" />
      <line x1="200" y1="290" x2="300" y2="120" stroke="rgba(240,75,114,0.45)" strokeWidth="1" />
      <line x1="200" y1="290" x2="360" y2="200" stroke="rgba(240,75,114,0.45)" strokeWidth="1" />
      <line x1="200" y1="290" x2="30" y2="260" stroke="rgba(168,158,201,0.3)" strokeWidth="1" />
      <circle cx="200" cy="290" r="8" fill="#9D6FF0" opacity="1" />
      <circle cx="200" cy="290" r="18" fill="rgba(157,111,240,0.2)" />
      <circle cx="60" cy="180" r="7" fill="#5B9FD4" opacity="1" />
      <circle cx="140" cy="110" r="9" fill="#5B9FD4" opacity="1" />
      <circle cx="200" cy="95" r="6" fill="#5B9FD4" opacity="0.9" />
      <circle cx="300" cy="120" r="8" fill="#F04B72" opacity="1" />
      <circle cx="360" cy="200" r="5" fill="#F04B72" opacity="0.85" />
      <circle cx="30" cy="260" r="5" fill="#A89EC9" opacity="0.6" />
      <circle cx="370" cy="280" r="4" fill="#A89EC9" opacity="0.5" />
    </svg>

    <div className="absolute left-1/2 top-5 w-[220px] -translate-x-1/2 rounded-xl border border-black/[0.08] bg-white/90 p-4 shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-zinc-800/90">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-[11px] font-medium text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
          CM
        </div>
        <div>
          <div className="text-xs font-medium text-neutral-900 dark:text-zinc-100">
            Mike Miggers #47
          </div>
          <div className="text-[10px] text-neutral-400 dark:text-zinc-400">Manager</div>
        </div>
      </div>
      <div className="mb-1.5 text-[10px] text-neutral-400 dark:text-zinc-500">
        Score by dimension
      </div>
      <div className="flex gap-1">
        {[
          { val: 77, low: false },
          { val: 63, low: true },
          { val: 81, low: false },
          { val: 69, low: true },
        ].map(({ val, low }) => (
          <div
            key={val}
            className={twMerge(
              'flex-1 rounded-md py-1 text-center text-[13px] font-medium',
              low
                ? 'border border-red-200/60 bg-red-50/70 text-red-600 dark:border-red-700/50 dark:bg-red-900/30 dark:text-red-300'
                : 'border border-purple-200/60 bg-purple-50/70 text-purple-700 dark:border-purple-700/50 dark:bg-purple-900/30 dark:text-purple-300',
            )}
          >
            {val}
          </div>
        ))}
      </div>
      <div className="mt-2.5 space-y-2">
        {[
          { label: 'Culture', pct: '45%', from: '#E0234E', to: '#FFB3C6' },
          { label: 'Respect', pct: '72%', from: '#185FA5', to: '#7EC8E3' },
          { label: 'Autonomy', pct: '88%', from: '#6E40C9', to: '#C4B8F0' },
        ].map(({ label, pct, from, to }) => (
          <div key={label}>
            <div className="mb-1 text-[10px] text-neutral-400 dark:text-zinc-500">{label}</div>
            <div className="h-[5px] overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
              <div
                className="h-full rounded-full"
                style={{ width: pct, background: `linear-gradient(90deg, ${from}, ${to})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Form Builder Visual ───────────────────────────────────────────────────────
const FormVisual = () => (
  <div className="absolute inset-0 flex flex-col gap-2.5 overflow-hidden p-4" aria-hidden="true">
    {/* Focused input with focus ring + ARIA annotation */}
    <div className="relative">
      <div className="rounded-lg border-2 border-blue-500 bg-white px-3 py-2 shadow-[0_0_0_3px_rgba(59,130,246,0.25)] dark:bg-zinc-800">
        <div className="mb-0.5 flex items-center justify-between">
          <span className="text-[9px] font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Company name
          </span>
          <span className="rounded bg-blue-50 px-1 py-px font-mono text-[8px] text-blue-500 dark:bg-blue-900/40 dark:text-blue-300">
            required
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-24 rounded-sm bg-neutral-800 opacity-80 dark:bg-zinc-200" />
          <div className="h-3.5 w-px animate-pulse bg-blue-500" />
        </div>
      </div>
      {/* Focus ring annotation */}
      <div className="absolute -right-1 -top-1 flex items-center gap-1">
        <div className="h-px w-4 bg-blue-400 dark:bg-blue-500" />
        <span className="rounded bg-blue-500 px-1.5 py-px text-[8px] font-medium text-white">
          focus ring
        </span>
      </div>
    </div>

    {/* Select field — error state */}
    <div className="relative">
      <div className="rounded-lg border border-red-400 bg-white px-3 py-2 dark:border-red-500 dark:bg-zinc-800">
        <div className="mb-0.5 text-[9px] font-medium uppercase tracking-wider text-red-500 dark:text-red-400">
          Industry
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-neutral-400 dark:text-zinc-500">Select an option</span>
          <svg className="h-3 w-3 text-red-400" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1zm0 7.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM5.25 4.5a.75.75 0 0 1 1.5 0v2a.75.75 0 0 1-1.5 0v-2z" />
          </svg>
        </div>
      </div>
      <div className="mt-0.5 flex items-center gap-1 px-1">
        <svg
          className="h-2.5 w-2.5 flex-shrink-0 text-red-500"
          viewBox="0 0 10 10"
          fill="currentColor"
        >
          <circle cx="5" cy="5" r="4" />
        </svg>
        <span className="text-[9px] text-red-500 dark:text-red-400">
          Selection required to continue
        </span>
      </div>
      {/* ARIA role annotation */}
      <div className="absolute -right-1 top-1 flex items-center gap-1">
        <div className="h-px w-4 bg-orange-400" />
        <span className="rounded bg-orange-400 px-1.5 py-px text-[8px] font-medium text-white dark:bg-orange-500">
          aria-invalid
        </span>
      </div>
    </div>

    {/* Bottom row: contrast check + WCAG badge */}
    <div className="mt-auto flex items-center gap-2">
      {/* Contrast swatch */}
      <div className="flex flex-1 items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 dark:border-zinc-700 dark:bg-zinc-800">
        <div
          className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded"
          style={{ background: '#185FA5' }}
        >
          <span className="text-[8px] font-bold text-white">Aa</span>
        </div>
        <div>
          <div className="text-[8px] text-neutral-400 dark:text-zinc-500">Contrast ratio</div>
          <div className="text-[10px] font-semibold text-neutral-800 dark:text-zinc-200">
            7.2 : 1
          </div>
        </div>
        <span className="ml-auto rounded-full bg-green-100 px-1.5 py-px text-[8px] font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
          AAA
        </span>
      </div>
      {/* Tab order indicator */}
      <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 dark:border-zinc-700 dark:bg-zinc-800">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className={twMerge(
              'flex h-4 w-4 items-center justify-center rounded text-[8px] font-bold',
              n === 1
                ? 'bg-blue-500 text-white'
                : 'border border-neutral-300 text-neutral-400 dark:border-zinc-600 dark:text-zinc-500',
            )}
          >
            {n}
          </div>
        ))}
        <span className="ml-0.5 text-[8px] text-neutral-400 dark:text-zinc-500">tab</span>
      </div>
    </div>
  </div>
);

// ── Requirements Visual (right-hand traceability panel) ───────────────────────
const RequirementsVisual = () => (
  <div
    className="relative flex h-full w-full flex-col justify-center gap-4 overflow-hidden border-l border-green-100/50 p-6 dark:border-green-900/30"
    aria-hidden="true"
  >
    {/* Breadcrumb trace */}
    <div className="flex items-center gap-1.5 rounded-xl border border-black/[0.07] bg-white/80 px-4 py-2.5 text-[11px] text-neutral-400 dark:border-white/[0.08] dark:bg-zinc-800/70 dark:text-zinc-400">
      <span>Product vision</span>
      <span className="text-neutral-300 dark:text-zinc-600">›</span>
      <span>Spec v2.4</span>
      <span className="text-neutral-300 dark:text-zinc-600">›</span>
      <span>§3.1</span>
      <span className="text-neutral-300 dark:text-zinc-600">›</span>
      <span className="font-semibold text-green-700 dark:text-green-400">REQ-3.1.4</span>
    </div>

    {/* Requirement box */}
    <div className="rounded-xl border-2 border-green-700/25 bg-white/80 px-4 py-3.5 dark:border-green-500/20 dark:bg-zinc-800/70">
      <p className="text-[13px] font-medium leading-snug text-neutral-800 dark:text-zinc-200">
        &ldquo;System shall notify users within 3s of a payment state change&rdquo;
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[10px] text-green-800 dark:border-green-700/50 dark:bg-green-900/30 dark:text-green-300">
          Testable
        </span>
        <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[10px] text-green-800 dark:border-green-700/50 dark:bg-green-900/30 dark:text-green-300">
          Unambiguous
        </span>
        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] text-blue-700 dark:border-blue-700/50 dark:bg-blue-900/30 dark:text-blue-300">
          AC included
        </span>
      </div>
    </div>

    {/* Affects section */}
    <div>
      <div className="mb-2.5 text-[9px] font-medium uppercase tracking-[0.1em] text-neutral-400 dark:text-zinc-500">
        Affects →
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-px w-5 bg-green-300 dark:bg-green-700" />
          <span className="rounded-lg border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-medium text-green-800 dark:border-green-700/50 dark:bg-green-900/30 dark:text-green-300">
            Toast component
          </span>
          <span className="rounded-lg border border-black/[0.07] bg-white/80 px-3 py-1 text-[11px] text-neutral-500 dark:border-white/[0.08] dark:bg-zinc-800/70 dark:text-zinc-400">
            Payment flow
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px w-5 bg-green-300 dark:bg-green-700" />
          <span className="rounded-lg border border-black/[0.07] bg-white/80 px-3 py-1 text-[11px] text-neutral-500 dark:border-white/[0.08] dark:bg-zinc-800/70 dark:text-zinc-400">
            Test case A-12
          </span>
          <span className="rounded-lg border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-medium text-green-800 dark:border-green-700/50 dark:bg-green-900/30 dark:text-green-300">
            API contract
          </span>
        </div>
      </div>
    </div>

    {/* Stat pill */}
    <div className="absolute bottom-5 right-5 rounded-xl border border-green-200/40 bg-white/90 px-4 py-2.5 shadow-sm dark:border-green-700/30 dark:bg-zinc-800/80">
      <div className="text-xl font-semibold leading-none text-green-700 dark:text-green-400">
        200+
      </div>
      <div className="mt-1 text-[10px] text-neutral-400 dark:text-zinc-500">users onboarded</div>
    </div>
  </div>
);

// ── WorkCard ──────────────────────────────────────────────────────────────────
export const WorkCard = ({ article, variant, className, comingSoon = false }: WorkCardProps) => {
  const { title, shortDescription } = article;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => gsap.to(cardRef.current, { scale: 1.015, duration: 0.3 });
  const handleMouseLeave = () => gsap.to(cardRef.current, { scale: 1, duration: 0.3 });

  const badgeMap = {
    pattern: {
      background: 'rgba(110,64,201,0.08)',
      color: '#5B30B8',
      borderColor: 'rgba(110,64,201,0.15)',
    },
    form: {
      background: 'rgba(24,95,165,0.08)',
      color: '#185FA5',
      borderColor: 'rgba(24,95,165,0.15)',
    },
    requirements: {
      background: 'rgba(22,163,74,0.08)',
      color: '#166534',
      borderColor: 'rgba(22,163,74,0.25)',
    },
  };

  const badgeLabel = variant === 'requirements' ? 'Volvo Cars · AI' : 'Volvo Cars';

  const year = article.publishedDate ? new Date(article.publishedDate).getFullYear() : null;

  const displayTags =
    article.contentfulMetadata?.tags
      ?.filter((t: any) => t?.id && !['caseStudy', 'blogArticle'].includes(t.id))
      .slice(0, 3) ?? [];

  const isRequirements = variant === 'requirements';

  const inner = (
    <div
      ref={cardRef}
      className={twMerge(
        'flex w-full flex-1 overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/95 dark:border-zinc-700/70 dark:bg-[#1c1b1d]',
        comingSoon ? 'cursor-default' : 'cursor-pointer',
        isRequirements ? 'flex-col md:flex-row' : 'flex-col',
        className,
      )}
      onMouseEnter={comingSoon ? undefined : handleMouseEnter}
      onMouseLeave={comingSoon ? undefined : handleMouseLeave}
    >
      {/* Text block */}
      <div className={twMerge('flex flex-col justify-between p-8', isRequirements && 'md:w-1/2')}>
        <div>
          {/* Meta badge */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {displayTags.map((tag: any) =>
              tag?.name ? (
                <span
                  key={tag.id}
                  className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize"
                  style={badgeMap[variant]}
                >
                  {tag.name}
                </span>
              ) : null,
            )}
            {year && <span className="text-[11px] text-black/35 dark:text-white/35">{year}</span>}
          </div>

          {title && (
            <h3 className="mb-2.5 font-serif text-[22px] font-normal leading-snug text-neutral-900 dark:text-zinc-100">
              {title}
            </h3>
          )}

          {shortDescription && (
            <p className="text-[13px] leading-relaxed text-black/50 dark:text-white/50">
              {shortDescription}
            </p>
          )}
        </div>

        {/* Bottom row */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          {comingSoon ? (
            <span className="whitespace-nowrap text-xs font-medium italic text-black/30 dark:text-white/30">
              Sharing under request
            </span>
          ) : (
            <span className="whitespace-nowrap text-xs font-medium text-black/35 dark:text-white/35">
              Case study →
            </span>
          )}
        </div>
      </div>

      {/* Visual area */}
      {isRequirements ? (
        <div className="min-h-[260px] flex-1 md:w-1/2">
          <RequirementsVisual />
        </div>
      ) : (
        <div className="relative flex-1 overflow-hidden" style={{ minHeight: 240 }}>
          {variant === 'pattern' ? <PatternVisual /> : <FormVisual />}
        </div>
      )}
    </div>
  );

  if (comingSoon) {
    return <div className="flex h-full">{inner}</div>;
  }

  return (
    <Link className="flex h-full" href={`/${article.slug}`}>
      {inner}
    </Link>
  );
};
