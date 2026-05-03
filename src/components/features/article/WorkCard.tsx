import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';
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

  const handleMouseEnter = () => gsap.to(cardRef.current, { scale: 1.015, duration: 0.3 });
  const handleMouseLeave = () => gsap.to(cardRef.current, { scale: 1, duration: 0.3 });

  const year = article.publishedDate ? new Date(article.publishedDate).getFullYear() : null;

  const displayTags =
    article.contentfulMetadata?.tags
      ?.filter((t: any) => t?.id && !['caseStudy', 'blogArticle'].includes(t.id))
      .slice(0, 3) ?? [];

  // Fixed heights per variant per breakpoint — prevents layout shift from
  // aspectRatio recalculation and from swapping mobile/desktop demo components.
  const demoHeight =
    variant === 'requirements'
      ? 'h-[300px] md:h-[420px]'
      : variant === 'pattern'
      ? 'h-[322px] md:h-[402px]'
      : 'h-[300px] md:h-[380px]';

  return (
    <Link className="flex h-full" href={`/${article.slug}`}>
      <div
        ref={cardRef}
        className={twMerge(
          'flex w-full flex-1 cursor-pointer flex-col overflow-hidden rounded-3xl bg-white/95 dark:border-white/[0.08] dark:bg-[#131416]',
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Demo animation area — fixed height per breakpoint, both variants in DOM, CSS toggles visibility */}
        <div className={`${demoHeight} overflow-hidden p-4`}>
          <div className="pointer-events-none h-full w-full overflow-hidden rounded-xl">
            {variant === 'requirements' && (
              <>
                <div className="h-full md:hidden">
                  <RequirementsHeroCinematicMobile />
                </div>
                <div className="hidden h-full md:block">
                  <RequirementsHeroCinematic />
                </div>
              </>
            )}
            {variant === 'pattern' && (
              <>
                <div className="h-full md:hidden">
                  <BirdsEyeHeroCinematicMobile />
                </div>
                <div className="hidden h-full md:block">
                  <BirdsEyeHeroCinematic />
                </div>
              </>
            )}
            {variant === 'form' && <FormBuilderHeroCinematic />}
          </div>
        </div>
        {/* Text block */}
        <div className="flex flex-col px-5">
          {title && (
            <h3 className="leading- text-base font-medium tracking-tight text-gray-700 dark:text-gray-100 md:text-2xl">
              {title}
            </h3>
          )}

          {shortDescription && (
            <p className="mb-3 text-base text-black/45 dark:text-white/45">{shortDescription}</p>
          )}

          {/* Chips row */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5">
            {displayTags.map((tag: any) =>
              tag?.name ? (
                <span
                  key={tag.id}
                  className="rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs font-medium capitalize text-gray-500 dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-400"
                >
                  {tag.name}
                </span>
              ) : null,
            )}
            {year && (
              <span className="rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-400 dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-500">
                {year}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
