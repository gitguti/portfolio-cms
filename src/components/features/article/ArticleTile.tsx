import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import gsap from 'gsap';
import { HTMLProps, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
}

export const ArticleTile = ({ article, className }: ArticleTileProps) => {
  const { title, shortDescription } = article;
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });
  const tileRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(tileRef.current, { scale: 1.02, duration: 0.3, zIndex: 2 });
  };
  const handleMouseLeave = () => {
    gsap.to(tileRef.current, { scale: 1, duration: 0.3, zIndex: 1 });
  };

  const chips = (article.contentfulMetadata?.tags ?? []).filter(
    (tag: any) => tag?.id && tag.id !== 'caseStudy' && tag.id !== 'blogArticle' && tag?.name,
  );

  return (
    <Link className="flex" href={`/${article.slug}`}>
      <div
        ref={tileRef}
        className={twMerge(
          'group flex w-full flex-1 cursor-pointer flex-col justify-between gap-4 rounded-2xl bg-[#ddeaf8] p-6 transition-all dark:bg-[#1e2d3d]',
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col gap-2">
          {title && (
            <h3
              className="text-xl font-semibold leading-snug text-gray-900 dark:text-gray-100"
              {...inspectorProps({ fieldId: 'title' })}
            >
              {title}
            </h3>
          )}
          {shortDescription && (
            <p
              className="text-sm leading-relaxed text-gray-600 dark:text-gray-400"
              {...inspectorProps({ fieldId: 'shortDescription' })}
            >
              {shortDescription}
            </p>
          )}
          {chips.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {chips.map((tag: any) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium capitalize text-gray-600 dark:bg-white/10 dark:text-gray-300"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-gray-700 transition-transform duration-200 group-hover:translate-x-0.5 dark:bg-white/15 dark:text-gray-200">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};
