import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

import { CtfImage } from '@src/components/features/contentful';
import { ComponentRichImage } from '@src/lib/__generated/sdk';

interface ArticleImageProps {
  image: ComponentRichImage;
}

export const ArticleImage = ({ image }: ArticleImageProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: image.sys.id });
  const router = useRouter();
  const isBlogContext = router.pathname.startsWith('/blog/');

  console.log('ArticleImage Debug:', {
    pathname: router.pathname,
    asPath: router.asPath,
    isBlogContext,
    fullWidth: image.fullWidth,
  });

  return image.image ? (
    <figure>
      <div className="flex justify-center" {...inspectorProps({ fieldId: 'image' })}>
        <CtfImage
          nextImageProps={{
            className: twMerge(
              'mt-12 mb-8 rounded-lg',
              isBlogContext
                ? 'w-full max-w-md'
                : image.fullWidth
                ? 'md:w-screen md:max-w-[calc(100vw-40px)] md:shrink-0'
                : 'w-full max-w-md',
            ),
          }}
          {...image.image}
        />
      </div>
      {image.caption && (
        <figcaption className="mt-4" {...inspectorProps({ fieldId: 'caption' })}>
          {image.caption}
        </figcaption>
      )}
    </figure>
  ) : null;
};
