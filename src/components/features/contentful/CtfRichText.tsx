import React from 'react';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';

import { ArticleImage } from '@src/components/features/article';
import { ComponentRichImage } from '@src/lib/__generated/sdk';

export type EmbeddedEntryType = ComponentRichImage | null;

export interface ContentfulRichTextInterface {
  json: Document;
  links?:
    | {
        entries: {
          block: Array<EmbeddedEntryType>;
        };
      }
    | any;
}

export const EmbeddedEntry = (entry: EmbeddedEntryType) => {
  switch (entry?.__typename) {
    case 'ComponentRichImage':
      return <ArticleImage image={entry} />;
    default:
      return null;
  }
};

export const contentfulBaseRichTextOptions = ({ links }: ContentfulRichTextInterface): Options => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const entry = links?.entries?.block?.find(
        (item: EmbeddedEntryType) => item?.sys?.id === node.data.target.sys.id,
      );

      if (!entry) return null;

      return <EmbeddedEntry {...entry} />;
    },
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="custom-blockquote relative py-8 font-serif text-2xl italic leading-relaxed text-zinc-800 dark:text-zinc-200 md:text-5xl ">
        {children}
      </blockquote>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="mt-16 font-serif text-3xl font-medium text-zinc-800 dark:text-zinc-200">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="mt-8 mb-4 font-serif text-2xl font-medium text-zinc-700 dark:text-zinc-300">
        {children}
      </h3>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mt-5 text-xl leading-8 text-zinc-700 dark:text-zinc-300">{children}</p>
    ),
    [BLOCKS.TABLE]: (node, children) => {
      const rows = Array.isArray(children) ? children : [children];
      const headRows = rows.filter(
        row =>
          row &&
          row.props &&
          row.props.children &&
          React.Children.toArray(row.props.children).some(
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
    [BLOCKS.TABLE_ROW]: (node, children) => (
      <tr className="border-t border-zinc-200 dark:border-zinc-700">{children}</tr>
    ),
    [BLOCKS.TABLE_CELL]: (node, children) => (
      <td className=" dark:text-zinc-200x py-4 align-top text-zinc-800">{children}</td>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
      <th className=" border-b border-zinc-300 bg-zinc-100 py-4 text-left font-bold text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100">
        {children}
      </th>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="my-6 list-disc space-y-2 pl-8 text-xl text-zinc-700 dark:text-zinc-300">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="my-6 list-decimal space-y-2 pl-8 text-xl text-zinc-700 dark:text-zinc-300">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <li className="ml-2">{children}</li>,
  },
});

export const CtfRichText = ({ json, links }: ContentfulRichTextInterface) => {
  const baseOptions = contentfulBaseRichTextOptions({ links, json });

  return (
    <div>
      <article className=" mx-auto pb-16">{documentToReactComponents(json, baseOptions)}</article>
    </div>
  );
};
