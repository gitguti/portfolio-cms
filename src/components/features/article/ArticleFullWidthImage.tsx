import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { CtfImage } from '@src/components/features/contentful';
import { ComponentFullWidthImage } from '@src/lib/__generated/sdk';

interface ArticleFullWidthImageProps {
  fullWidthImage: ComponentFullWidthImage;
  variant?: 'default' | 'hero';
}

export const ArticleFullWidthImage = ({
  fullWidthImage,
  variant = 'default',
}: ArticleFullWidthImageProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: fullWidthImage.sys.id });
  const maxWidth = fullWidthImage.maxWidth || 'default';
  const isHero = variant === 'hero';
  const isBrowser = isHero || maxWidth === 'browser';

  if (!fullWidthImage.image) return null;

  if (isBrowser) {
    return (
      <div
        className={isHero ? 'overflow-hidden' : 'mx-auto my-8 max-w-6xl'}
        {...inspectorProps({ fieldId: 'image' })}
      >
        <div className="overflow-hidden bg-[#FAFAF8] dark:bg-zinc-900">
          <div className="flex items-center gap-1.5 border-b border-black/[0.08] bg-[#EDEAE5] px-3.5 py-2.5 dark:border-white/10 dark:bg-zinc-800">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2.5 max-w-[320px] flex-1 truncate rounded-md bg-white/70 px-3 py-1 font-cs-mono text-[10px] text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500">
              {fullWidthImage.caption || 'preview'}
            </span>
          </div>
          <CtfImage
            nextImageProps={{ className: 'block w-full object-cover' }}
            {...fullWidthImage.image}
          />
        </div>
      </div>
    );
  }

  const widthClasses =
    {
      narrow: 'max-w-3xl',
      default: 'max-w-6xl',
      wide: 'max-w-6xl',
      full: 'max-w-none',
    }[maxWidth as 'narrow' | 'default' | 'wide' | 'full'] ?? 'max-w-6xl';

  return (
    <div className={`mx-auto my-8 ${widthClasses}`} {...inspectorProps({ fieldId: 'image' })}>
      <CtfImage
        nextImageProps={{ className: 'w-full rounded-[10px] object-cover' }}
        {...fullWidthImage.image}
      />
      {fullWidthImage.caption && (
        <p className="mt-3 text-center text-[12px] italic text-zinc-400 dark:text-zinc-500">
          {fullWidthImage.caption}
        </p>
      )}
    </div>
  );
};
