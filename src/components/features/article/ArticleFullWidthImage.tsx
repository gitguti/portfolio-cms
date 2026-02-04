import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { CtfImage } from '@src/components/features/contentful';
import { ComponentFullWidthImage } from '@src/lib/__generated/sdk';

interface ArticleFullWidthImageProps {
  fullWidthImage: ComponentFullWidthImage;
}

export const ArticleFullWidthImage = ({ fullWidthImage }: ArticleFullWidthImageProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: fullWidthImage.sys.id });
  const maxWidth = fullWidthImage.maxWidth || 'default';

  const widthClasses = {
    narrow: 'max-w-3xl',
    default: 'max-w-3xl',
    wide: 'max-w-6xl',
    full: 'max-w-none',
  }[maxWidth];

  if (!fullWidthImage.image) return null;

  return (
    <div className={`mx-auto my-16 ${widthClasses}`} {...inspectorProps({ fieldId: 'image' })}>
      <CtfImage
        nextImageProps={{
          className: 'w-full rounded-lg object-cover',
        }}
        {...fullWidthImage.image}
      />
      {fullWidthImage.caption && (
        <p className="mt-3 text-center text-sm italic text-zinc-600 dark:text-zinc-400">
          {fullWidthImage.caption}
        </p>
      )}
    </div>
  );
};
