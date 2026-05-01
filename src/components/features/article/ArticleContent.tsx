import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { CtfRichText } from '@src/components/features/contentful';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleContentProps {
  article: PageBlogPostFieldsFragment;
  excludeBlockIds?: string[];
}
export const ArticleContent = ({ article, excludeBlockIds }: ArticleContentProps) => {
  const { content } = article;
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  return (
    <div {...inspectorProps({ fieldId: 'content' })}>
      <CtfRichText json={content?.json} links={content?.links} excludeBlockIds={excludeBlockIds} />
    </div>
  );
};
