import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import gsap from 'gsap';
import { HTMLProps, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { CtfImage } from '@src/components/features/contentful';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
  layout?: 'vertical' | 'horizontal';
}

export const ArticleTile = ({ article, className, layout = 'vertical' }: ArticleTileProps) => {
  const { title, shortDescription } = article;
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });
  const tileRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(tileRef.current, { scale: 1.02, duration: 0.3, zIndex: 2 });
  };
  const handleMouseLeave = () => {
    gsap.to(tileRef.current, { scale: 1, duration: 0.3, zIndex: 1 });
  };

  const isHorizontal = layout === 'horizontal';

  return (
    <Link className="flex" href={`/${article.slug}`}>
      <div
        ref={tileRef}
        className={twMerge(
          'flex w-full flex-1 cursor-pointer overflow-hidden transition-all',
          isHorizontal ? 'flex-col gap-6 md:flex-row md:items-start' : 'flex-col',
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {article.featuredImage && (
          <div
            className={isHorizontal ? 'w-full flex-shrink-0 md:w-1/2' : ''}
            {...inspectorProps({ fieldId: 'featuredImage' })}
          >
            <CtfImage
              nextImageProps={{
                className: twMerge(
                  'object-cover w-full rounded-lg',
                  isHorizontal ? 'aspect-[4/3]' : 'aspect-[16/10]',
                ),
              }}
              {...article.featuredImage}
            />
          </div>
        )}
        <div
          className={twMerge('flex flex-col', isHorizontal ? 'gap-3 py-2 md:w-1/2' : 'mt-4 gap-1')}
        >
          {title && (
            <h3
              className={twMerge(
                'font-serif text-neutral-800 dark:text-zinc-50',
                isHorizontal ? 'text-xl font-medium leading-snug md:text-2xl' : 'text-2xl',
              )}
              {...inspectorProps({ fieldId: 'title' })}
            >
              {title}
            </h3>
          )}
          {shortDescription && (
            <p
              className={twMerge(
                'text-neutral-600 dark:text-zinc-300',
                isHorizontal ? 'text-sm leading-relaxed md:text-base' : 'text-sm',
              )}
              {...inspectorProps({ fieldId: 'shortDescription' })}
            >
              {shortDescription}
            </p>
          )}

          {/* Tags Pills */}
          {article.contentfulMetadata?.tags && article.contentfulMetadata.tags.length > 0 && (
            <div className={twMerge('flex flex-wrap gap-2', isHorizontal ? 'mt-2' : 'mt-3')}>
              {article.contentfulMetadata.tags
                .filter((tag: any) => tag?.id !== 'caseStudy' && tag?.id !== 'blogArticle')
                .map(
                  (tag: any) =>
                    tag?.name && (
                      <span
                        key={tag.id}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {tag.name}
                      </span>
                    ),
                )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
