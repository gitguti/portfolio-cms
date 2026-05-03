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
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }[columns];

  const items = gallery.itemsCollection?.items?.filter(Boolean) || [];

  if (items.length === 0) return null;

  return (
    <div className="my-6" {...inspectorProps({ fieldId: 'itemsCollection' })}>
      <div className={`grid grid-cols-1 gap-3.5 ${gridCols}`}>
        {items.map((item, index) => {
          if (!item.image) return null;

          return (
            <div key={index} className="flex flex-col overflow-hidden rounded-md ">
              <div className="aspect-[4/3] ">
                <CtfImage
                  nextImageProps={{
                    className: 'h-full w-full object-contain',
                  }}
                  {...item.image}
                />
              </div>

              <div className="">
                {item.title && (
                  <div className="text-md mb-0.5 font-medium text-zinc-900 dark:text-gray-100">
                    {item.title}
                  </div>
                )}

                {item.caption?.json && (
                  <div className="text-sm leading-[1.55] text-zinc-600 dark:text-gray-300">
                    {documentToReactComponents(item.caption.json)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
