import { HackathonOrder } from '@src/lib/__generated/sdk';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useConditionalLiveUpdates } from '@src/lib/hooks/useConditionalLiveUpdates';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useRef } from 'react';
import { HiArrowRight, HiArrowDown } from 'react-icons/hi';
import { contactConfig } from '@src/components/features/about/about-data';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { ArticleTileGrid } from '@src/components/features/article';
import { HackathonsSection } from '@src/components/features/hackathons';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
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
  const hackathonsSectionRef = useRef<HTMLDivElement>(null);

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

    // Selected Work section
    if (workSectionRef.current) {
      const workItems = workSectionRef.current.querySelectorAll('.work-reveal');
      gsap.fromTo(
        workItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: workSectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }

    // Hackathons section
    if (hackathonsSectionRef.current) {
      gsap.fromTo(
        hackathonsSectionRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
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

  // Extract unique tags (id & name) from posts
  const tagMap = new Map<string, string>();
  if (posts && Array.isArray(posts)) {
    posts.forEach((post: any) => {
      post.contentfulMetadata?.tags?.forEach((tag: any) => {
        if (tag?.id && tag?.name) tagMap.set(tag.id, tag.name);
      });
    });
  }
  const allTags = Array.from(tagMap.entries()); // [ [id, name], ... ]

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

      {/* Animated Blobs Background - Fixed */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          ref={shape1Ref}
          className={`absolute bg-blue-700/80 mix-blend-multiply dark:bg-blue-400/80 dark:mix-blend-screen ${
            isMobile ? 'blob-mobile' : ''
          }`}
          style={{
            width: 160,
            height: 200,
            left: '50%',
            top: isMobile ? '30%' : '10%',
            transform: 'translate(-60%, -50%)',
          }}
        />
        <div
          ref={shape2Ref}
          className={`absolute bg-purple-500/70 mix-blend-multiply dark:bg-purple-300/70 dark:mix-blend-screen ${
            isMobile ? 'blob-mobile' : ''
          }`}
          style={{
            width: 140,
            height: 240,
            left: '52%',
            top: isMobile ? '30%' : '12%',
            transform: 'translate(-60%, -50%)',
          }}
        />
        <div
          ref={shape3Ref}
          className={`absolute bg-green-400/40 mix-blend-multiply dark:bg-green-300/60 dark:mix-blend-screen ${
            isMobile ? 'blob-mobile' : ''
          }`}
          style={{
            width: 120,
            height: 180,
            left: '48%',
            top: isMobile ? '10%' : '10%',
            transform: 'translate(-60%, -50%)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen flex-col">
        {/* Hero Section - no flex-1, reduced pt to break false floor */}
        <section ref={heroRef} className="flex flex-col items-center pb-16 pt-32">
          <div className="space-y-6">
            <p className="hero-stagger text-xl font-light tracking-wide opacity-80">
              Hi, I&apos;m Git
            </p>
            <h1 className="hero-stagger max-w-3xl font-serif text-3xl leading-tight text-neutral-800 dark:text-zinc-100 lg:text-4xl">
              Designer and builder making complex workflows simple, automated, and usable.
            </h1>
            <p className="hero-stagger mt-6 max-w-2xl text-lg font-light leading-7 tracking-wide opacity-70">
              I help technical teams and decision-makers adopt smarter processes — by integrating
              data, automation, and AI into everyday work.
            </p>

            {/* CTA Buttons */}
            <div className="hero-stagger mt-8 flex flex-wrap items-center gap-4">
              <a
                href={contactConfig.url}
                className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-6 py-3 text-base font-light text-white transition-all hover:gap-3 hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              >
                <span>{contactConfig.cta.home}</span>
                <HiArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => {
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-base font-light text-neutral-700 transition-all hover:border-neutral-500 hover:bg-neutral-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/50"
                aria-label="Scroll to selected work"
              >
                <span>See my work</span>
                <HiArrowDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Visual Bridge */}

        {/* Study Cases Section */}
        <section id="work" ref={workSectionRef} className="mx-auto w-full max-w-3xl pb-12 pt-8">
          <div className="work-reveal mb-4">
            <h2 className="font-serif text-2xl font-medium text-neutral-800 dark:text-zinc-100 lg:text-3xl">
              Work
            </h2>
          </div>
          <Container className="work-reveal">
            <ArticleTileGrid
              className="grid-cols-1 gap-12 md:grid-cols-1"
              articles={filteredPosts}
              tileLayout="horizontal"
            />
          </Container>
        </section>

        {/* Hackathons Section */}
        {hackathons && hackathons.length > 0 && (
          <div id="hackathons" ref={hackathonsSectionRef}>
            <HackathonsSection hackathons={hackathons} />
          </div>
        )}
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

    // TODO: Uncomment once Contentful is configured with Hackathon content type
    // and run: npm run graphql-codegen:generate
    const hackathonsData = await gqlClient.hackathonCollection({
      limit: 6,
      locale,
      order: [HackathonOrder.EventDateDesc],
      preview,
    });
    const hackathons = hackathonsData.hackathonCollection?.items;
    //const hackathons: any[] = []; // Temporary empty array until Contentful is configured

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
