import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import NextImage from 'next/image';

import { ArticlePatternDemo } from '@src/components/features/article/ArticlePatternDemo';
import { CtfRichText } from '@src/components/features/contentful/CtfRichText';
import { ComponentTextImageSideBySideFragment } from '@src/lib/__generated/sdk';

interface ArticleTextImageSideBySideProps {
  textImage: ComponentTextImageSideBySideFragment;
}

export const ArticleTextImageSideBySide = ({ textImage }: ArticleTextImageSideBySideProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: textImage.sys.id });
  const isImageLeft = textImage.imagePosition === 'left';

  const embeddedDemo = textImage.embeddedDemo;

  if (!textImage.text?.json || (!textImage.image && !embeddedDemo)) return null;

  return (
    <div
      className={`my-6 flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-10 ${
        isImageLeft ? 'md:grid-flow-col-dense' : ''
      }`}
      {...inspectorProps({ fieldId: 'text' })}
    >
      {/* Text */}
      <div className={`order-1 md:order-none ${isImageLeft ? 'md:col-start-2' : ''}`}>
        <CtfRichText json={textImage.text.json} />
      </div>

      {/* Image or embedded demo */}
      <div
        className={`order-2 flex min-h-[320px] md:order-none md:self-start ${
          isImageLeft ? 'md:col-start-1' : ''
        }`}
      >
        {embeddedDemo?.__typename === 'ComponentDropdownPatternDemo' ? (
          <ArticlePatternDemo demo={embeddedDemo} />
        ) : textImage.image ? (
          <div className="overflow-hidden rounded-lg">
            {textImage.image.url && textImage.image.width && textImage.image.height && (
              <NextImage
                src={textImage.image.url}
                width={textImage.image.width}
                height={textImage.image.height}
                alt={textImage.image.title ?? ''}
                className="h-auto w-full object-contain transition-all"
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
