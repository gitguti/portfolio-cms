import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ArticleTile } from '@src/components/features/article/ArticleTile';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileGridProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<PageBlogPostFieldsFragment | null>;
  tileLayout?: 'vertical' | 'horizontal';
}

export const ArticleTileGrid = ({
  articles,
  className,
  tileLayout = 'vertical',
  ...props
}: ArticleTileGridProps) => {
  return articles && articles.length > 0 ? (
    <div
      className={twMerge('m-auto mb-8 grid max-w-screen-lg grid-cols-1 gap-x-4 gap-y-8', className)}
      {...props}
    >
      {articles.map((article, index) => {
        return article ? <ArticleTile key={index} article={article} layout={tileLayout} /> : null;
      })}
    </div>
  ) : null;
};
