import gsap from 'gsap';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

import { RequirementsHeroCinematic } from './demos/RequirementsHeroCinematic';
import { RequirementsHeroCinematicMobile } from './demos/RequirementsHeroCinematicMobile';
import { BirdsEyeHeroCinematic } from './demos/BirdsEyeHeroCinematic';
import { BirdsEyeHeroCinematicMobile } from './demos/BirdsEyeHeroCinematicMobile';
import { FormBuilderHeroCinematic } from './demos/FormBuilderHeroCinematic';

interface WorkCardProps {
  article: PageBlogPostFieldsFragment;
  variant: 'pattern' | 'form' | 'requirements';
  className?: string;
}

// ── WorkCard ──────────────────────────────────────────────────────────────────
export const WorkCard = ({ article, variant, className }: WorkCardProps) => {
  const { title, shortDescription } = article;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMd, setIsMd] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseEnter = () => gsap.to(cardRef.current, { scale: 1.015, duration: 0.3 });
  const handleMouseLeave = () => gsap.to(cardRef.current, { scale: 1, duration: 0.3 });

  const year = article.publishedDate ? new Date(article.publishedDate).getFullYear() : null;

  const displayTags =
    article.contentfulMetadata?.tags
      ?.filter((t: any) => t?.id && !['caseStudy', 'blogArticle'].includes(t.id))
      .slice(0, 3) ?? [];

  return (
    <Link className="flex h-full" href={`/${article.slug}`}>
      <div
        ref={cardRef}
        className={twMerge(
          'flex w-full flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/95 dark:border-zinc-700/70 dark:bg-[#1c1b1d]',
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Text block */}
        <div className="flex flex-col gap-2 px-5 pt-5">
          {title && (
            <h3 className="text-[18px] font-medium leading-snug tracking-tight text-neutral-900 dark:text-zinc-100">
              {title}
            </h3>
          )}

          {shortDescription && (
            <p className="text-[13px] leading-relaxed text-black/45 dark:text-white/45">
              {shortDescription}
            </p>
          )}

          {/* Chips row */}
          <div className="flex flex-wrap items-center gap-1.5">
            {displayTags.map((tag: any) =>
              tag?.name ? (
                <span
                  key={tag.id}
                  className="rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium capitalize text-neutral-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  {tag.name}
                </span>
              ) : null,
            )}
            {year && (
              <span className="rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500">
                {year}
              </span>
            )}
          </div>
        </div>

        {/* Demo animation area */}
        <div className="overflow-hidden p-5">
          <div className="pointer-events-none h-full w-full overflow-hidden rounded-xl">
            {variant === 'requirements' &&
              (isMd ? <RequirementsHeroCinematic /> : <RequirementsHeroCinematicMobile />)}
            {variant === 'pattern' &&
              (isMd ? <BirdsEyeHeroCinematic /> : <BirdsEyeHeroCinematicMobile />)}
            {variant === 'form' && <FormBuilderHeroCinematic />}
          </div>
        </div>
      </div>
    </Link>
  );
};
