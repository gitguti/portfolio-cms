import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';

import { ImageFieldsFragment } from '@src/lib/__generated/sdk';

interface ImageProps extends Omit<ImageFieldsFragment, '__typename'> {
  nextImageProps?: Omit<NextImageProps, 'src' | 'alt'>;
}

export const CtfImage = ({
  url,
  width,
  height,
  title,
  contentType,
  nextImageProps,
}: ImageProps) => {
  if (!url) return null;

  if (contentType?.startsWith('video/')) {
    return (
      <video
        src={url}
        autoPlay
        loop
        muted
        playsInline
        className={twMerge(nextImageProps?.className, 'transition-all')}
        style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
      />
    );
  }

  if (!width || !height) return null;

  const blurURL = new URL(url);
  blurURL.searchParams.set('w', '10');

  return (
    <NextImage
      src={url}
      width={width}
      height={height}
      sizes="100vw"
      quality="85"
      alt={title || ''}
      placeholder="blur"
      blurDataURL={blurURL.toString()}
      {...nextImageProps}
      className={twMerge(nextImageProps?.className, 'transition-all')}
    />
  );
};
