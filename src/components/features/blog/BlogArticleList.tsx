import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import Link from 'next/link';
import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface BlogArticleListProps extends HTMLProps<HTMLDivElement> {
  articles: PageBlogPostFieldsFragment[];
}

export const BlogArticleList = ({ articles, className }: BlogArticleListProps) => {
  return (
    <div className={twMerge('space-y-8', className)}>
      {articles.map(article => (
        <BlogArticleItem key={article.sys.id} article={article} />
      ))}
    </div>
  );
};

interface BlogArticleItemProps {
  article: PageBlogPostFieldsFragment;
}

const BlogArticleItem = ({ article }: BlogArticleItemProps) => {
  const { title, publishedDate, shortDescription } = article;
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  return (
    <Link href={`/blog/${article.slug}`}>
      <article className="group cursor-pointer border-b border-gray-200 pb-6 transition-all hover:border-gray-400 dark:border-zinc-700 dark:hover:border-zinc-500">
        <div className="flex flex-col gap-2">
          {publishedDate && (
            <time className="text-sm text-gray-500 dark:text-zinc-400">
              <FormatDate date={publishedDate} />
            </time>
          )}
          {title && (
            <h2
              className="font-serif text-2xl font-medium text-neutral-800 transition-colors group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400"
              {...inspectorProps({ fieldId: 'title' })}
            >
              {title}
            </h2>
          )}
          {shortDescription && (
            <p
              className="text-base leading-relaxed text-neutral-600 dark:text-zinc-300"
              {...inspectorProps({ fieldId: 'shortDescription' })}
            >
              {shortDescription}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};
