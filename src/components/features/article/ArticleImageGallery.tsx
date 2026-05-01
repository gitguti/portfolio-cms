import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { CtfImage } from '@src/components/features/contentful';
import { ComponentImageGallery } from '@src/lib/__generated/sdk';

interface ArticleImageGalleryProps {
  gallery: ComponentImageGallery;
}

export const ArticleImageGallery = ({ gallery }: ArticleImageGalleryProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: gallery.sys.id });
  const columns = gallery.columns || 3;
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }[columns];

  const images = gallery.imagesCollection?.items?.filter(Boolean) || [];

  if (images.length === 0) return null;

  return (
    <div className="my-6" {...inspectorProps({ fieldId: 'imagesCollection' })}>
      <div className={`grid grid-cols-1 gap-3.5 ${gridCols}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[10px] border border-black/[0.08] bg-white dark:border-white/10 dark:bg-zinc-900"
          >
            <CtfImage
              nextImageProps={{
                className: 'w-full aspect-[4/3] object-cover',
              }}
              {...image}
            />
          </div>
        ))}
      </div>
      {gallery.caption && (
        <p className="mt-3 text-center text-xs text-zinc-400 dark:text-zinc-500">
          {gallery.caption}
        </p>
      )}
    </div>
  );
};
