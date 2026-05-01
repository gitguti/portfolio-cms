import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { CtfImage } from '@src/components/features/contentful';
import { ComponentRichImage } from '@src/lib/__generated/sdk';

interface ArticleImageProps {
  image: ComponentRichImage;
}

export const ArticleImage = ({ image }: ArticleImageProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: image.sys.id });

  if (!image.image) return null;

  const isSmall = image.size === 'small';
  const isMedium = image.size === 'medium' || !image.size;
  const isFull = image.size === 'full';

  return (
    <figure className={isSmall ? 'flex justify-center' : undefined}>
      <div
        className={[
          'overflow-hidden rounded-lg',
          isFull ? 'w-full' : isSmall ? 'max-w-[320px]' : 'mx-auto max-w-[760px]',
        ].join(' ')}
        {...inspectorProps({ fieldId: 'image' })}
      >
        <CtfImage
          nextImageProps={{ className: '', style: { width: '100%', height: 'auto' } }}
          {...image.image}
        />
      </div>
      {image.caption && (
        <figcaption
          className="mt-3 text-[12px] italic text-zinc-400 dark:text-zinc-500"
          {...inspectorProps({ fieldId: 'caption' })}
        >
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
};
