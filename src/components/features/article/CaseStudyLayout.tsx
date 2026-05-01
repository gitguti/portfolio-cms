import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { BLOCKS, Document, Node } from '@contentful/rich-text-types';
import { useEffect, useMemo } from 'react';

import { ArticleContent } from './ArticleContent';
import { ArticleFullWidthImage } from './ArticleFullWidthImage';
import { CaseStudyDetails } from './CaseStudyDetails';
import { CtfImage } from '@src/components/features/contentful/CtfImage';

import { slugifyHeading } from '@src/components/features/contentful/CtfRichText';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface CaseStudyLayoutProps {
  article: PageBlogPostFieldsFragment;
}

interface TocItem {
  id: string;
  label: string;
}

const INFRA_TAG_IDS = new Set(['caseStudy', 'blogArticle']);

const extractText = (node: Node): string => {
  if (!node) return '';
  if ('value' in node && typeof (node as any).value === 'string') return (node as any).value;
  if ('content' in node && Array.isArray((node as any).content)) {
    return (node as any).content.map(extractText).join('');
  }
  return '';
};

const collectHeadings = (json?: Document): TocItem[] => {
  if (!json?.content) return [];
  const items: TocItem[] = [];
  for (const node of json.content) {
    if (node.nodeType === BLOCKS.HEADING_4) {
      const label = extractText(node).trim();
      if (label) {
        items.push({ id: slugifyHeading(label), label });
      }
    }
  }
  return items;
};

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

  const tocItems = useMemo(
    () => collectHeadings(article.content?.json as Document | undefined),
    [article.content?.json],
  );

  // Scroll-spy for active TOC item
  useEffect(() => {
    if (tocItems.length === 0) return;

    const items = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-toc-id]'));
    const sections = items
      .map(i => document.getElementById(i.dataset.tocId!))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const activate = (id: string | undefined) => {
      items.forEach(i => i.classList.toggle('cs-toc-active', i.dataset.tocId === id));
    };

    const onScroll = () => {
      const y = window.scrollY + 120;
      let current: string | undefined = sections[0]?.id;
      for (const s of sections) {
        if (s.offsetTop <= y) current = s.id;
      }
      activate(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [tocItems]);

  return (
    <div className="case-study w-full bg-[rgb(249,250,251)] font-cs-sans text-zinc-900 dark:bg-[#1f1f1f] dark:text-zinc-100">
      {/* HERO SECTION — title, meta, full-width image */}
      <section className="mx-auto w-full max-w-[1080px] px-6 pt-24 sm:px-12">
        {/* title + meta */}
        <div className="mb-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_320px]">
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
            {/* chips */}
            {chips.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {chips.map(chip => (
                  <span
                    key={chip.id}
                    className="mt-4 rounded-full border border-black/[0.13] px-3.5 py-1.5 text-xs tracking-[0.01em] text-zinc-600 dark:border-white/15 dark:text-zinc-300"
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
      </section>

      {/* CONTENT SECTION — sticky TOC + main content starts here */}
      <div className="mx-auto w-full max-w-[1080px]">
        <div className="grid grid-cols-1 items-start lg:grid-cols-[220px_1fr]">
          {/* sticky TOC */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:sticky lg:top-14 lg:flex lg:max-h-[calc(100vh-56px)] lg:flex-col lg:overflow-y-auto lg:px-7 lg:py-8">
              <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-500">
                Contents
              </div>
              <nav className="flex flex-col gap-px">
                {tocItems.map(t => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    data-toc-id={t.id}
                    className="block border-l-[1.5px] border-transparent py-1.5 pl-3 text-xs leading-[1.4] text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 [&.cs-toc-active]:border-zinc-900 [&.cs-toc-active]:text-zinc-900 dark:[&.cs-toc-active]:border-zinc-100 dark:[&.cs-toc-active]:text-zinc-100"
                  >
                    {t.label}
                  </a>
                ))}
              </nav>
            </aside>
          )}

          {/* main content */}
          <main className="px-6 pb-20 pt-12 sm:px-12">
            <ArticleContent article={article} />
          </main>
        </div>
      </div>
    </div>
  );
};
