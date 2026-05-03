import { HackathonOrder } from '@src/lib/__generated/sdk';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useConditionalLiveUpdates } from '@src/lib/hooks/useConditionalLiveUpdates';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useRef } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { contactConfig } from '@src/components/features/about/about-data';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { ArticleTile, WorkCard } from '@src/components/features/article';
import { HackathonsSection } from '@src/components/features/hackathons';
import { SeoFields } from '@src/components/features/seo';
import { VibesCard } from '@src/components/features/vibes';
import { vibesProjects } from '@src/components/features/vibes/vibes-data';
import { SectionLabel } from '@src/components/shared/section-label';
import { Cursor } from '@src/components/shared/cursor';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { gsap } from '@src/lib/gsap';
import { revalidateDuration } from '@src/pages/utils/constants';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const page = useConditionalLiveUpdates(props.page, props.previewActive);
  const posts = useConditionalLiveUpdates(props.posts, props.previewActive);
  const hackathons = useConditionalLiveUpdates(props.hackathons, props.previewActive);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Refs
  const heroRef = useRef<HTMLElement>(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hero entrance stagger animation
  useEffect(() => {
    if (!heroRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const elements = heroRef.current.querySelectorAll('.hero-stagger');

    gsap.fromTo(
      elements,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        delay: 0.2,
      },
    );
  }, []);

  // Filter posts by selected tag (if any)
  const filteredPosts =
    posts && selectedTag
      ? posts.filter((post: any) =>
          post.contentfulMetadata?.tags?.some((tag: any) => tag.id === selectedTag),
        )
      : posts || [];

  return (
    <>
      {page?.seoFields && <SeoFields {...page.seoFields} />}

      {/* Custom Cursor - Desktop only */}
      {!isMobile && <Cursor />}

      {/* Main Feed */}
      <div className="flex min-h-screen flex-col">
        {/* Background blobs — right-side only, kept well away from the text */}
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* ── 00 Hero ─────────────────────────────────────────── */}
          <section
            id="hero"
            ref={heroRef}
            className="relative scroll-mt-24 pb-16 pt-32 md:scroll-mt-20 md:pb-20 md:pt-40"
          >
            <div className="space-y-6">
              <h1 className="hero-stagger font-cs font-medium tracking-[-0.03em] text-gray-700 dark:text-zinc-100">
                {/* Line 1: text + chip inline */}
                <span className="flex items-baseline gap-4 text-5xl md:text-7xl lg:text-8xl">
                  <span className="leading-[1.05]">Hola! I&apos;m</span>
                  <a
                    href="/about"
                    className="group relative inline-flex translate-y-[-0.05em] items-center gap-2 rounded-full bg-[#ddeaf8] py-1 pl-1 pr-4 text-3xl font-semibold transition-all duration-300 group-hover:pr-6 md:gap-3 md:py-1.5 md:pl-1.5 md:pr-5 md:text-5xl md:group-hover:pr-8 lg:text-7xl"
                  >
                    <img
                      src="/avatar.png"
                      alt="Git"
                      className="h-8 w-8 rounded-full object-cover md:h-12 md:w-12 lg:h-16 lg:w-16"
                    />
                    <span className="text-gray-700">Git</span>
                    <span className="flex max-w-0 items-center gap-2 overflow-hidden whitespace-nowrap text-[0.5em] font-medium tracking-normal text-[#1d4ed8] opacity-0 transition-all duration-300 group-hover:max-w-[10em] group-hover:opacity-100">
                      <HiArrowRight className="inline-block h-[0.9em] w-[0.9em] shrink-0" /> meet me
                    </span>
                  </a>
                </span>
                {/* Line 2 */}
                <span className="block text-5xl font-bold leading-[1.05] text-gray-700 dark:text-violet-500 md:text-7xl lg:text-8xl">
                  Designer and builder.
                </span>
              </h1>
              <p className="hero-stagger text-3xl font-light leading-relaxed text-gray-500 dark:text-zinc-400">
                I build things that make work (and life) a little better.
              </p>
              <div className="hero-stagger flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={contactConfig.url}
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all hover:gap-3 hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
                >
                  <span>{contactConfig.cta.home}</span>
                  <HiArrowRight className="h-4 w-4" />
                </a>
                <button
                  onClick={() => {
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-light text-neutral-700 transition-all hover:border-neutral-500 hover:bg-neutral-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/50"
                  aria-label="Scroll to selected work"
                >
                  <span>See my work ↓</span>
                </button>
              </div>
            </div>
          </section>

          {/* ── 01 Work ─────────────────────────────────────────── */}
          <section id="work" className="scroll-mt-24 pb-12 pt-8 md:scroll-mt-20">
            <SectionLabel title="Work" />

            <div className="grid grid-cols-12 gap-[10px]">
              {filteredPosts.length === 0 && (
                <div className="col-span-12 py-12 text-center text-sm text-neutral-400 dark:text-zinc-500">
                  No posts found.
                </div>
              )}

              {/* First post: full-width requirements card */}
              {filteredPosts[0] && (
                <div className="bento-reveal col-span-12">
                  <WorkCard
                    article={filteredPosts[0]}
                    variant="requirements"
                    className="md:min-h-[560px]"
                  />
                </div>
              )}

              {/* Second + third: side-by-side styled work cards */}
              {filteredPosts[1] && (
                <div className="bento-reveal col-span-12 md:col-span-7">
                  <WorkCard
                    article={filteredPosts[1]}
                    variant="pattern"
                    className="md:min-h-[480px]"
                  />
                </div>
              )}
              {filteredPosts[2] && (
                <div className="bento-reveal col-span-12 md:col-span-5">
                  <WorkCard
                    article={filteredPosts[2]}
                    variant="form"
                    className="md:min-h-[480px]"
                  />
                </div>
              )}

              {/* Remaining posts: fallback thirds grid */}
              {filteredPosts.slice(3).map((post: any, i: number) => (
                <div key={post.sys?.id ?? i} className="bento-reveal col-span-12 md:col-span-4">
                  <ArticleTile article={post} className="h-full" />
                </div>
              ))}
            </div>
          </section>

          {/* ── 02 Building ─────────────────────────────────────── */}
          <section
            id="building"
            className="min-h-[450px] scroll-mt-24 pb-12 pt-16 md:min-h-[500px] md:scroll-mt-20"
          >
            <SectionLabel title="Building" />

            {/* 4-column portrait grid */}
            <div className="">
              {vibesProjects.map(project => (
                <div key={project.id} className="bento-reveal">
                  <VibesCard project={project} />
                </div>
              ))}
            </div>
          </section>

          {/* ── 03 Hacks ────────────────────────────────────────── */}
          {hackathons && hackathons.length > 0 && (
            <section id="hacks" className="scroll-mt-24 pb-24 pt-8 md:scroll-mt-20">
              <SectionLabel title="Hacks" />

              <HackathonsSection hackathons={hackathons} className="bento-reveal col-span-12" />
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, draftMode: preview }) => {
  try {
    const gqlClient = preview ? previewClient : client;

    const landingPageData = await gqlClient.pageLanding({ locale, preview });
    const page = landingPageData.pageLandingCollection?.items[0];

    const blogPostsData = await gqlClient.pageBlogPostCollection({
      limit: 6,
      locale,
      order: PageBlogPostOrder.PublishedDateDesc,
      where: {
        slug_not:
          page?.featuredBlogPost && 'slug' in page.featuredBlogPost
            ? (page.featuredBlogPost as { slug: string }).slug
            : undefined,
        contentfulMetadata: {
          tags: {
            id_contains_none: ['blogArticle'],
          },
        },
      },
      preview,
    });
    const posts = blogPostsData.pageBlogPostCollection?.items;

    const hackathonsData = await gqlClient.hackathonCollection({
      limit: 6,
      locale,
      order: [HackathonOrder.EventDateDesc],
      preview,
    });
    const hackathons = hackathonsData.hackathonCollection?.items;

    if (!page) {
      return {
        revalidate: revalidateDuration,
        notFound: true,
      };
    }

    return {
      revalidate: revalidateDuration,
      props: {
        previewActive: !!preview,
        ...(await getServerSideTranslations(locale)),
        page,
        posts,
        hackathons,
      },
    };
  } catch {
    return {
      revalidate: revalidateDuration,
      notFound: true,
    };
  }
};

export default Page;
