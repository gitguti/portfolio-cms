import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { CtfRichText } from '@src/components/features/contentful/CtfRichText';
import { ComponentQuoteFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleQuoteProps {
  quote: ComponentQuoteFieldsFragment;
}

const avatarColorMap: Record<string, { bg: string; text: string }> = {
  teal: { bg: 'bg-teal-100 dark:bg-teal-900/50', text: 'text-teal-700 dark:text-teal-300' },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/50',
    text: 'text-purple-700 dark:text-purple-300',
  },
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-700 dark:text-blue-300' },
  rose: { bg: 'bg-rose-100 dark:bg-rose-900/50', text: 'text-rose-700 dark:text-rose-300' },
};

export const ArticleQuote = ({ quote }: ArticleQuoteProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: quote.sys.id });

  if (!quote.body) return null;

  const colors = avatarColorMap[quote.avatarColor ?? 'teal'] ?? avatarColorMap.teal;

  return (
    <aside
      className="my-6 inline-block w-auto min-w-[min(100%,480px)] max-w-[560px] rounded-[10px] border border-black/[0.08] bg-white p-5 dark:border-white/10 dark:bg-zinc-900/60"
      {...inspectorProps({ fieldId: 'body' })}
    >
      <div className="flex items-center gap-3">
        {quote.initials && (
          <div
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold uppercase ${colors.bg} ${colors.text}`}
          >
            {quote.initials.slice(0, 3)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          {quote.role && (
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span
                className="text-md font-semibold text-zinc-900 dark:text-gray-100"
                {...inspectorProps({ fieldId: 'role' })}
              >
                {quote.role}
              </span>
              {quote.label && (
                <span
                  className="text-[12px] text-zinc-400 dark:text-gray-500"
                  {...inspectorProps({ fieldId: 'label' })}
                >
                  {quote.label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className="pl-12 [&_.cs-article]:leading-[1.75] [&_.cs-article_p]:mb-0 [&_.cs-article_p]:max-w-none"
        {...inspectorProps({ fieldId: 'body' })}
      >
        <CtfRichText json={quote.body.json} />
      </div>
    </aside>
  );
};
