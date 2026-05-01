import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { useMemo } from 'react';

import { ArticleContent } from './ArticleContent';
import { ArticleImpactMetrics } from './ArticleImpactMetrics';
import { CaseStudyDetails } from './CaseStudyDetails';
import { CtfImage } from '@src/components/features/contentful/CtfImage';

import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface CaseStudyLayoutProps {
  article: PageBlogPostFieldsFragment;
}

const INFRA_TAG_IDS = new Set(['caseStudy', 'blogArticle']);

export const CaseStudyLayout = ({ article }: CaseStudyLayoutProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  const chips = useMemo(
    () =>
      (article.contentfulMetadata?.tags ?? []).filter(
        (t): t is { id: string; name: string } => !!t?.id && !INFRA_TAG_IDS.has(t.id) && !!t?.name,
      ),
    [article.contentfulMetadata?.tags],
  );

  const titleLines = useMemo(
    () =>
      (article.title ?? '')
        .split(/\r?\n/)
        .map(s => s.trim())
        .filter(Boolean),
    [article.title],
  );

  const impactMetrics = article.content?.links?.entries?.block?.find(
    entry => entry?.__typename === 'ComponentImpactMetrics',
  );

  return (
    <div className="case-study w-full bg-[rgb(249,250,251)] font-cs-sans text-zinc-900 dark:bg-[#1f1f1f] dark:text-zinc-100">
      {/* HERO SECTION — title, meta, full-width image */}
      <section className="mx-auto w-full max-w-[1080px] px-6 pt-24 sm:px-12">
        {/* title + meta */}
        <div className=" grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h1
              className="font-cs-sans text-3xl font-normal leading-[1.1] tracking-[-0.02em] text-zinc-900 dark:text-zinc-100 md:text-4xl lg:text-6xl"
              {...inspectorProps({ fieldId: 'title' })}
            >
              {titleLines.length > 0
                ? titleLines.map((line, i) => (
                    <span key={i} className="block">
                      {i === 0 ? (
                        line
                      ) : (
                        <em className="italic text-zinc-400 dark:text-zinc-500">{line}</em>
                      )}
                    </span>
                  ))
                : article.title}
            </h1>
            <p className="mt-8 text-lg text-zinc-600 dark:text-zinc-400">
              {article.shortDescription}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              What I did
            </p>
            {/* chips */}
            {chips.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {chips.map(chip => (
                  <span
                    key={chip.id}
                    className="mt-2 rounded-full border border-black/[0.13] px-3.5 py-1.5 text-xs tracking-[0.01em] text-zinc-600 dark:border-white/15 dark:text-zinc-300"
                  >
                    {chip.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {article.caseStudyDetails && (
            <CaseStudyDetails
              role={article.caseStudyDetails.role}
              team={article.caseStudyDetails.team}
              timeframe={article.caseStudyDetails.timeframe}
              entryId={article.sys.id}
            />
          )}
        </div>

        {/* full-width hero image */}
        {article.featuredImage && (
          <CtfImage
            nextImageProps={{
              className: 'w-full',
              priority: true,
              sizes: '100vw',
            }}
            {...article.featuredImage}
          />
        )}
        {impactMetrics && impactMetrics.__typename === 'ComponentImpactMetrics' && (
          <div className="mt-12">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
              Impact
            </p>
            <ArticleImpactMetrics metrics={impactMetrics as any} />
          </div>
        )}
      </section>

      {/* CONTENT SECTION */}
      <div className="mx-auto w-full max-w-[1080px]">
        <main className="px-6 pb-20 pt-12 sm:px-12">
          <ArticleContent
            article={article}
            excludeBlockIds={impactMetrics?.sys?.id ? [impactMetrics.sys.id] : undefined}
          />
        </main>
      </div>
    </div>
  );
};
