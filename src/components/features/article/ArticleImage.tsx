import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { CtfImage } from '@src/components/features/contentful';
import { ComponentRichImage } from '@src/lib/__generated/sdk';

interface ArticleImageProps {
  image: ComponentRichImage;
}

export const ArticleImage = ({ image }: ArticleImageProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: image.sys.id });

  if (!image.image) return null;

  return (
    <figure className="my-6">
      <div
        className="overflow-hidden rounded-[10px] border border-black/[0.08] bg-white dark:border-white/10 dark:bg-zinc-900"
        {...inspectorProps({ fieldId: 'image' })}
      >
        <CtfImage
          nextImageProps={{
            className: image.fullWidth ? 'w-full object-cover' : 'mx-auto w-full max-w-md',
          }}
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
