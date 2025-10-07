import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { CtfImage } from '@src/components/features/contentful';
import { CtfRichText } from '@src/components/features/contentful/CtfRichText';
import { ComponentTextImageSideBySide } from '@src/lib/__generated/sdk';

interface ArticleTextImageSideBySideProps {
  textImage: ComponentTextImageSideBySide;
}

export const ArticleTextImageSideBySide = ({ textImage }: ArticleTextImageSideBySideProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: textImage.sys.id });
  const isImageLeft = textImage.imagePosition === 'left';

  if (!textImage.text?.json || !textImage.image) return null;

  return (
    <div
      className={`my-16 flex flex-col gap-8 md:grid md:grid-cols-2 md:items-start md:gap-12 ${
        isImageLeft ? 'md:grid-flow-col-dense' : ''
      }`}
      {...inspectorProps({ fieldId: 'text' })}
    >
      {/* Texto */}
      <div className={`order-2 md:order-none ${isImageLeft ? 'md:col-start-2' : ''}`}>
        <CtfRichText json={textImage.text.json} links={textImage.text.links} />
      </div>

      {/* Imagen */}
      <div className={`order-1 md:order-none ${isImageLeft ? 'md:col-start-1' : ''}`}>
        <CtfImage
          nextImageProps={{
            className: 'rounded-lg w-full h-auto object-contain',
          }}
          {...textImage.image}
        />
      </div>
    </div>
  );
};
