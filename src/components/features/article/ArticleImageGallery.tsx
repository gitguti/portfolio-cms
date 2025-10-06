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
    <div className="my-16" {...inspectorProps({ fieldId: 'imagesCollection' })}>
      <div className={`grid grid-cols-1 gap-4 ${gridCols}`}>
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg bg-white">
            <CtfImage
              nextImageProps={{
                className: 'w-full h-64 aspect-video object-contain',
              }}
              {...image}
            />
          </div>
        ))}
      </div>
      {gallery.caption && (
        <p className="mt-4 text-center text-sm italic text-zinc-600 dark:text-zinc-400">
          {gallery.caption}
        </p>
      )}
    </div>
  );
};
