import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

// import { ArticleAuthor } from '@src/components/features/article/ArticleAuthor';
// import { ArticleLabel } from '@src/components/features/article/ArticleLabel';
// import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleHeroProps {
  article: PageBlogPostFieldsFragment;
  isFeatured?: boolean;
  isReversedLayout?: boolean;
}
export const ArticleHero = ({
  article,
  isFeatured,
  isReversedLayout = false,
}: ArticleHeroProps) => {
  // const { t } = useTranslation();
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  const { title, shortDescription, publishedDate } = article;

  return (
    <div className={twMerge(`flex max-w-6xl flex-col overflow-hidden`)}>
      {/* <div className="flex-1 basis-1/2" {...inspectorProps({ fieldId: 'featuredImage' })}>
        {article.featuredImage && (
          <CtfImage
            nextImageProps={{ className: 'w-full', priority: true, sizes: undefined }}
            {...article.featuredImage}
          />
        )}
      </div> */}

      <div className="relative flex max-w-6xl flex-1 basis-1/2 flex-col justify-center pb-6 pt-12">
        <div className="mb-2 flex flex-wrap items-center">
          {/* <ArticleAuthor article={article} /> */}
          {/* {isFeatured && (
            <ArticleLabel
              className={twMerge(
                'ml-auto pl-2 lg:absolute lg:top-8 xl:top-12',
                isReversedLayout ? 'lg:left-6 xl:left-0' : 'lg:right-6 xl:right-12',
              )}
            >
              {t('article.featured')}
            </ArticleLabel>
          )} */}
          <div
            className={twMerge(
              'ml-auto hidden pl-2 text-xs text-neutral-600 dark:text-zinc-200',
              isReversedLayout ? 'lg:block' : '',
            )}
            {...inspectorProps({ fieldId: 'publishedDate' })}
          >
            {/* <FormatDate date={publishedDate} /> */}
          </div>
        </div>

        {/* Tags Pills */}
        {/* {article.contentfulMetadata?.tags && article.contentfulMetadata.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {article.contentfulMetadata.tags.map(
              (tag: any) =>
                tag?.name && (
                  <span
                    key={tag.id}
                    className="rounded-full border border-gray-600 px-3 py-1 text-xs font-medium capitalize text-gray-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tag.name}
                  </span>
                ),
            )}
          </div>
        )} */}
        <h1
          className={twMerge(
            'mb-6 font-serif text-5xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 md:text-6xl',
          )}
          {...inspectorProps({ fieldId: 'title' })}
        >
          {title}
        </h1>

        {shortDescription && (
          <p
            className="text-xl italic text-zinc-500 dark:text-zinc-400 md:text-2xl"
            {...inspectorProps({ fieldId: 'shortDescription' })}
          >
            {shortDescription}
          </p>
        )}
        <div
          className={twMerge(
            'mt-2 text-xs text-neutral-700 dark:text-zinc-400',
            isReversedLayout ? 'lg:hidden' : '',
          )}
          {...inspectorProps({ fieldId: 'publishedDate' })}
        >
          <FormatDate date={publishedDate} />
        </div>
      </div>
    </div>
  );
};
