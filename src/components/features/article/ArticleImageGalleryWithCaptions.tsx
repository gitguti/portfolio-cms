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
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-[10px] border border-black/[0.08] bg-white dark:border-white/10 dark:bg-zinc-900"
            >
              <div className="aspect-[4/3] border-b border-black/[0.08] bg-[#F2F0ED] dark:border-white/10 dark:bg-zinc-800">
                <CtfImage
                  nextImageProps={{
                    className: 'h-full w-full object-cover',
                  }}
                  {...item.image}
                />
              </div>

              <div className="p-3.5">
                {item.title && (
                  <div className="mb-0.5 text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </div>
                )}

                {item.caption?.json && (
                  <div className="mt-2 border-t border-black/[0.08] pt-2.5 text-[12px] leading-[1.55] text-zinc-600 dark:border-white/10 dark:text-zinc-300">
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
