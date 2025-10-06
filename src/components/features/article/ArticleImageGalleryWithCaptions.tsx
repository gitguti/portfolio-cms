import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { CtfImage } from '@src/components/features/contentful';
import { ComponentImageGalleryWithCaptions } from '@src/lib/__generated/sdk';

interface ArticleImageGalleryWithCaptionsProps {
  gallery: ComponentImageGalleryWithCaptions;
}

export const ArticleImageGalleryWithCaptions = ({
  gallery,
}: ArticleImageGalleryWithCaptionsProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: gallery.sys.id });
  const columns = gallery.columns || 3;
  const gridCols = {
    2: 'md:grid-cols-2 h-64',
    3: 'md:grid-cols-3 h-48',
  }[columns];

  const items = gallery.itemsCollection?.items?.filter(Boolean) || [];

  if (items.length === 0) return null;

  return (
    <div className="my-16" {...inspectorProps({ fieldId: 'itemsCollection' })}>
      <div className={`grid grid-cols-1 gap-6 ${gridCols}`}>
        {items.map((item, index) => {
          if (!item.image) return null;

          return (
            <div key={index} className="flex flex-col">
              {/* Imagen */}
              <div className="overflow-hidden rounded-lg">
                <CtfImage
                  nextImageProps={{
                    className: 'w-full object-contain aspect-video bg-white',
                  }}
                  {...item.image}
                />
              </div>

              {/* Title opcional (si quieres heading) */}
              {item.title && (
                <h4 className="mt-2 text-base font-semibold text-zinc-800 dark:text-zinc-200">
                  {item.title}
                </h4>
              )}

              {/* Caption individual */}
              {item.caption?.json && (
                <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {documentToReactComponents(item.caption.json)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
