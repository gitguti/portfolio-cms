import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import gsap from 'gsap';
import { useRouter } from 'next/router';
import { HTMLProps, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
// import { ArticleAuthor } from '@src/components/features/article/ArticleAuthor';
import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
}

export const ArticleTile = ({ article, className }: ArticleTileProps) => {
  const { title, publishedDate, shortDescription } = article;
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });
  const router = useRouter();
  const tileRef = useRef<HTMLDivElement>(null);

  // Animación hover
  const handleMouseEnter = () => {
    gsap.to(tileRef.current, { scale: 1.02, duration: 0.3, zIndex: 2 });
  };
  const handleMouseLeave = () => {
    gsap.to(tileRef.current, { scale: 1, duration: 0.3, zIndex: 1 });
  };

  return (
    <Link className="flex flex-col" href={`/${article.slug}`}>
      <div
        ref={tileRef}
        className={twMerge(
          'mx-auto flex w-11/12 flex-1 cursor-pointer flex-col overflow-hidden  transition-all',
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {article.featuredImage && (
          <div {...inspectorProps({ fieldId: 'featuredImage' })}>
            <CtfImage
              nextImageProps={{ className: 'object-cover aspect-[16/10] w-full rounded' }}
              {...article.featuredImage}
            />
          </div>
        )}
        <div className="mt-4 flex flex-col text-2xl">
          {title && (
            <p
              className="font-serif text-neutral-800 dark:text-zinc-50"
              {...inspectorProps({ fieldId: 'title' })}
            >
              {title}
            </p>
          )}
          {shortDescription && (
            <p
              className="text-sm text-neutral-600 dark:text-zinc-200"
              {...inspectorProps({ fieldId: 'shortDescription' })}
            >
              {shortDescription}
            </p>
          )}

          {/* Tags Pills */}
          {article.contentfulMetadata?.tags && article.contentfulMetadata.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {article.contentfulMetadata.tags.map(
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
