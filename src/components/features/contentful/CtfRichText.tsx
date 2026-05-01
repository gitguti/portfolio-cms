import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document, Node } from '@contentful/rich-text-types';
import React from 'react';

import {
  ArticleImage,
  ArticleTextImageSideBySide,
  ArticleImageGallery,
  ArticleImageGalleryWithCaptions,
  ArticleFullWidthImage,
  ArticleImpactMetrics,
} from '@src/components/features/article';
import {
  ComponentRichImage,
  ComponentTextImageSideBySide,
  ComponentImageGallery,
  ComponentImageGalleryWithCaptions,
  ComponentFullWidthImage,
  ComponentImpactMetrics,
} from '@src/lib/__generated/sdk';

export type EmbeddedEntryType =
  | ComponentRichImage
  | ComponentTextImageSideBySide
  | ComponentImageGallery
  | ComponentImageGalleryWithCaptions
  | ComponentFullWidthImage
  | ComponentImpactMetrics
  | null;

export interface ContentfulRichTextInterface {
  json: Document;
  links?:
    | {
        entries: {
          block: Array<EmbeddedEntryType>;
        };
      }
    | any;
  excludeBlockIds?: string[];
}

export const slugifyHeading = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const extractText = (node: Node): string => {
  if (!node) return '';
  if ('value' in node && typeof (node as any).value === 'string') return (node as any).value;
  if ('content' in node && Array.isArray((node as any).content)) {
    return (node as any).content.map(extractText).join('');
  }
  return '';
};

export const EmbeddedEntry = (entry: EmbeddedEntryType) => {
  switch (entry?.__typename) {
    case 'ComponentRichImage':
      return <ArticleImage image={entry} />;
    case 'ComponentTextImageSideBySide':
      return <ArticleTextImageSideBySide textImage={entry} />;
    case 'ComponentImageGallery':
      return <ArticleImageGallery gallery={entry} />;
    case 'ComponentImageGalleryWithCaptions':
      return <ArticleImageGalleryWithCaptions gallery={entry} />;
    case 'ComponentFullWidthImage':
      return <ArticleFullWidthImage fullWidthImage={entry} />;
    case 'ComponentImpactMetrics':
      return <ArticleImpactMetrics metrics={entry} />;
    default:
      return null;
  }
};

export const contentfulBaseRichTextOptions = ({
  links,
  excludeBlockIds,
}: ContentfulRichTextInterface): Options => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const targetId = node.data?.target?.sys?.id;
      if (excludeBlockIds && targetId && excludeBlockIds.includes(targetId)) {
        return null;
      }
      const entry = links?.entries?.block?.find(
        (item: EmbeddedEntryType) => item?.sys?.id === targetId,
      );

      if (!entry) return null;

      return <div className="not-prose my-6">{<EmbeddedEntry {...entry} />}</div>;
    },
    [BLOCKS.QUOTE]: (_node, children) => (
      <aside className="my-6 rounded-[10px] border border-black/[0.08] bg-white p-6 dark:border-white/10 dark:bg-zinc-900/60">
        <div className="font-sans text-[15px] leading-[1.75] text-zinc-600 dark:text-zinc-300 [&>p]:m-0 [&>p]:max-w-none [&>p]:text-inherit">
          {children}
        </div>
      </aside>
    ),
    [BLOCKS.HEADING_2]: (node, children) => {
      const id = slugifyHeading(extractText(node));
      return (
        <h2
          id={id}
          className="mb-3 mt-3 text-[26px] font-medium font-normal leading-[1.15] text-zinc-900 dark:text-zinc-100 md:text-[30px]"
        >
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="mb-3 mt-8 font-serif text-xl font-normal text-zinc-700 dark:text-zinc-200">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => {
      const id = slugifyHeading(extractText(node));
      return (
        <p
          id={id}
          className="mb-2 mt-12 max-w-[560px] text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500"
        >
          {children}
        </p>
      );
    },
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="mb-3.5 max-w-[560px] font-sans text-[15px] leading-[1.72] text-zinc-600 dark:text-zinc-300">
        {children}
      </p>
    ),
    [BLOCKS.TABLE]: (_node, children) => {
      const rows = Array.isArray(children) ? children : [children];
      const headRows = rows.filter(
        row =>
          row &&
          (row as any).props &&
          (row as any).props.children &&
          React.Children.toArray((row as any).props.children).some(
            child => React.isValidElement(child) && child.type === 'th',
          ),
      );
      const bodyRows = rows.filter(row => !headRows.includes(row));
      return (
        <table className="my-8 min-w-full border-collapse">
          {headRows.length > 0 && <thead>{headRows}</thead>}
          {bodyRows.length > 0 && <tbody>{bodyRows}</tbody>}
        </table>
      );
    },
    [BLOCKS.TABLE_ROW]: (_node, children) => (
      <tr className="border-t border-black/[0.08] dark:border-white/10">{children}</tr>
    ),
    [BLOCKS.TABLE_CELL]: (_node, children) => (
      <td className="py-3 align-top text-[14px] text-zinc-700 dark:text-zinc-300">{children}</td>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => (
      <th className="border-b border-black/[0.08] py-3 text-left text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-500 dark:border-white/10 dark:text-zinc-400">
        {children}
      </th>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="my-4 max-w-[560px] list-disc space-y-1.5 pl-6 font-sans text-[15px] leading-[1.72] text-zinc-600 dark:text-zinc-300">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="my-4 max-w-[560px] list-decimal space-y-1.5 pl-6 font-sans text-[15px] leading-[1.72] text-zinc-600 dark:text-zinc-300">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => <li className="ml-1">{children}</li>,
    [BLOCKS.HR]: () => <hr className="my-8 h-px border-0 bg-black/[0.08] dark:bg-white/10" />,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-700 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-300"
      >
        {children}
      </a>
    ),
  },
});

export const CtfRichText = ({ json, links, excludeBlockIds }: ContentfulRichTextInterface) => {
  const baseOptions = contentfulBaseRichTextOptions({ json, links, excludeBlockIds });

  return (
    <article className="cs-article font-sans text-[15px] leading-[1.6] text-zinc-600 dark:text-zinc-300">
      {documentToReactComponents(json, baseOptions)}
    </article>
  );
};
