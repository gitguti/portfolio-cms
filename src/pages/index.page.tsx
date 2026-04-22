import { HackathonOrder } from '@src/lib/__generated/sdk';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useConditionalLiveUpdates } from '@src/lib/hooks/useConditionalLiveUpdates';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useRef } from 'react';
import { HiArrowRight, HiArrowDown } from 'react-icons/hi';
import { contactConfig, socialLinks } from '@src/components/features/about/about-data';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { ArticleTile, WorkCard } from '@src/components/features/article';
import { HackathonCard, HackathonsSection } from '@src/components/features/hackathons';
import { SeoFields } from '@src/components/features/seo';
import { VibesCard } from '@src/components/features/vibes';
import { vibesProjects } from '@src/components/features/vibes/vibes-data';
import { SectionLabel } from '@src/components/shared/section-label';
import { Cursor } from '@src/components/shared/cursor';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { gsap, ScrollTrigger } from '@src/lib/gsap';
import { revalidateDuration } from '@src/pages/utils/constants';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const page = useConditionalLiveUpdates(props.page, props.previewActive);
  const posts = useConditionalLiveUpdates(props.posts, props.previewActive);
  const hackathons = useConditionalLiveUpdates(props.hackathons, props.previewActive);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Refs
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const workSectionRef = useRef<HTMLElement>(null);
  const buildingSectionRef = useRef<HTMLElement>(null);
  const hackathonsSectionRef = useRef<HTMLElement>(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP Animated Blobs
  useEffect(() => {
    if (!shape1Ref.current || !shape2Ref.current || !shape3Ref.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Shape 1
    gsap.to(shape1Ref.current, {
      keyframes: [
        {
          borderRadius: '50% 70%',
          width: '160px',
          height: '200px',
          filter: 'blur(60px) saturate(90%)',
          opacity: 0.5,
          scale: 1,
          duration: 0,
        },
        {
          borderRadius: '50%',
          width: '200px',
          height: '160px',
          opacity: 0.6,
          scale: 1.03,
          duration: 1.5,
        },
        {
          borderRadius: '70% 50%',
          width: '240px',
          height: '120px',
          opacity: 0.5,
          scale: 1,
          duration: 1.5,
        },
      ],
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Shape 2
    gsap.to(shape2Ref.current, {
      keyframes: [
        {
          borderRadius: '40% 60%',
          width: '140px',
          height: '240px',
          filter: 'blur(80px) saturate(100%)',
          opacity: 0.3,
          scale: 1,
          duration: 0,
        },
        {
          borderRadius: '50%',
          width: '180px',
          height: '180px',
          opacity: 0.4,
          scale: 1.01,
          duration: 1.5,
        },
        {
          borderRadius: '60% 40%',
          width: '160px',
          height: '120px',
          opacity: 0.3,
          scale: 1,
          duration: 1.5,
        },
      ],
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Shape 3
    gsap.to(shape3Ref.current, {
      keyframes: [
        {
          borderRadius: '60% 50%',
          width: '120px',
          height: '180px',
          filter: 'blur(100px) saturate(150%)',
          opacity: 0.2,
          scale: 1,
          duration: 0,
        },
        {
          borderRadius: '50%',
          width: '150px',
          height: '140px',
          opacity: 0.25,
          scale: 1.02,
          duration: 1.5,
        },
        {
          borderRadius: '50% 60%',
          width: '180px',
          height: '100px',
          opacity: 0.2,
          scale: 1,
          duration: 1.5,
        },
      ],
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
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

  // Scroll-triggered reveals on content sections
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Work section
    if (workSectionRef.current) {
      const workItems = workSectionRef.current.querySelectorAll('.bento-reveal');
      gsap.fromTo(
        workItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: workSectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }

    // Building section
    if (buildingSectionRef.current) {
      const buildingItems = buildingSectionRef.current.querySelectorAll('.bento-reveal');
      gsap.fromTo(
        buildingItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: buildingSectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }

    // Hacks section
    if (hackathonsSectionRef.current) {
      const hackItems = hackathonsSectionRef.current.querySelectorAll('.bento-reveal');
      gsap.fromTo(
        hackItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: hackathonsSectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [posts, hackathons]);

  // Scroll-linked blob parallax
  useEffect(() => {
    if (!shape1Ref.current || !shape2Ref.current || !shape3Ref.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const blobs = [shape1Ref.current, shape2Ref.current, shape3Ref.current];
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        yPercent: 50 + i * 20,
        opacity: 0.1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
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
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* ── 00 Hero ─────────────────────────────────────────── */}
          <section
            id="hero"
            ref={heroRef}
            className="relative scroll-mt-24 pb-12 pt-32 md:scroll-mt-20"
          >
            {/* Animated background blobs */}
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] overflow-hidden">
              <div className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/20" />
              <div className="absolute left-[14%] top-[22%] h-[420px] w-[420px] rounded-full bg-emerald-200/60 blur-3xl dark:bg-emerald-400/20" />
              <div className="absolute right-[12%] top-[24%] h-[380px] w-[380px] rounded-full bg-violet-200/55 blur-3xl dark:bg-violet-500/20" />
              <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_35%)] dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.04),transparent_35%)]" />
            </div>

            <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-[1fr_300px]">
              {/* Left: main hero card */}
              <div className="rounded-[2rem] border border-neutral-200/70 bg-white/95 p-8 shadow-[0_24px_100px_-60px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-colors duration-300 dark:border-zinc-700/70 dark:bg-[#1c1b1d] dark:shadow-[0_24px_100px_-60px_rgba(15,23,42,0.5)] sm:p-10">
                <div className="flex h-full flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <p className="hero-stagger text-base font-light tracking-wide text-neutral-500 dark:text-zinc-400">
                      Hi, I&apos;m Git
                    </p>
                    <h1 className="hero-stagger font-serif leading-tight text-neutral-800 dark:text-zinc-100">
                      <span className="block text-4xl lg:text-5xl">I design things.</span>
                      <span className="block text-4xl italic text-neutral-400 dark:text-zinc-500 lg:text-5xl">
                        Then I build them.
                      </span>
                    </h1>
                    <p className="hero-stagger max-w-xl text-base font-light leading-relaxed text-neutral-500 dark:text-zinc-400">
                      Product designer + engineer building AI, automation and data tools — making
                      complex workflows feel simple, at work and in real life.
                    </p>
                  </div>
                  <div className="hero-stagger flex flex-wrap items-center gap-3">
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
              </div>

              {/* Right: profile + video cards */}
              <div className="flex hidden flex-col gap-3 md:block">
                {/* Profile card */}
                <div className="hero-stagger flex h-full flex-col items-center justify-center gap-4 rounded-[2rem] border border-neutral-200/70 bg-white/95 p-6 text-center shadow-[0_24px_100px_-60px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-colors duration-300 dark:border-zinc-700/70 dark:bg-[#1c1b1d]">
                  <div className="h-24 w-24 overflow-hidden rounded-full bg-neutral-100 dark:bg-zinc-800">
                    <img
                      src="/avatar.jpg"
                      alt="Git Gutierrez"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-zinc-100">Git Gutierrez</p>
                    <p className="text-sm text-neutral-500 dark:text-zinc-400">
                      Designer + Engineer
                    </p>
                    <p className="text-sm text-neutral-400 dark:text-zinc-500">Gothenburg, SE</p>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    {socialLinks.map(link => (
                      <a
                        key={link.label}
                        href={link.href}
                        aria-label={link.label}
                        className="inline-flex items-center justify-center rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                  <a
                    href="/about"
                    className="mt-2 inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-xs font-light text-neutral-700 transition-all hover:border-neutral-500 hover:bg-neutral-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/50"
                  >
                    More about me →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── 01 Work ─────────────────────────────────────────── */}
          <section
            id="work"
            ref={workSectionRef}
            className="scroll-mt-24 pb-12 pt-8 md:scroll-mt-20"
          >
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
                    className="min-h-[260px]"
                    comingSoon
                  />
                </div>
              )}

              {/* Second + third: side-by-side styled work cards */}
              {filteredPosts[1] && (
                <div className="bento-reveal col-span-12 md:col-span-7">
                  <WorkCard
                    article={filteredPosts[1]}
                    variant="pattern"
                    className="min-h-[480px]"
                  />
                </div>
              )}
              {filteredPosts[2] && (
                <div className="bento-reveal col-span-12 md:col-span-5">
                  <WorkCard article={filteredPosts[2]} variant="form" className="min-h-[480px]" />
                </div>
              )}

              {/* Remaining posts: fallback thirds grid */}
              {filteredPosts.slice(3).map((post: any, i: number) => (
                <div key={post.sys?.id ?? i} className="bento-reveal col-span-12 md:col-span-4">
                  <ArticleTile
                    article={post}
                    layout="vertical"
                    className="h-full rounded-2xl border border-neutral-200/70 bg-white/95 p-4 dark:border-zinc-700/70 dark:bg-zinc-900/80 sm:p-5"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ── 02 Building ─────────────────────────────────────── */}
          <section
            id="building"
            ref={buildingSectionRef}
            className="scroll-mt-24 pb-12 pt-8 md:scroll-mt-20"
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
            <section
              id="hacks"
              ref={hackathonsSectionRef}
              className="scroll-mt-24 pb-24 pt-8 md:scroll-mt-20"
            >
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
