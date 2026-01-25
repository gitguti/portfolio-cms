import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import gsap from 'gsap';
import Image from 'next/image';
// import {useRevealer} from "../hooks/useRevealer";

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState, useEffect, useRef, use } from 'react';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { ArticleTileGrid } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { Cursor } from '@src/components/shared/cursor';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';
import { initScrollAnimations } from '@src/pages/utils/scrollAnimations';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const page = useContentfulLiveUpdates(props.page);
  const posts = useContentfulLiveUpdates(props.posts);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [hasBeenFiltered, setHasBeenFiltered] = useState(false); // Track if we've ever filtered
  const questionRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const questionTextRef = useRef<HTMLHeadingElement>(null);
  const questionIntroRef = useRef<HTMLParagraphElement>(null);
  // Animated blob refs
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  // Study cases section ref
  const studyCasesRef = useRef<HTMLElement>(null);
  // GSAP Animated Blobs
  useEffect(() => {
    if (!shape1Ref.current || !shape2Ref.current || !shape3Ref.current) return;
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

  // useRevealer(); // Initialize the revealer effect

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
  // Animate question text on mount
  useEffect(() => {
    if (questionTextRef.current) {
      gsap.fromTo(
        questionTextRef.current,
        { opacity: 0, y: 150 },
        { opacity: 1, y: 130, duration: 1.3, ease: 'power2.in', delay: 2 },
      );
    }
    if (questionIntroRef.current) {
      gsap.fromTo(
        questionIntroRef.current,
        { opacity: 0, y: 170 },
        { opacity: 1, y: 150, duration: 1, ease: 'power2.in', delay: 1 },
      );
    }
    if (pillsRef.current) {
      gsap.fromTo(
        pillsRef.current,
        { opacity: 0, y: 190 },
        { opacity: 1, y: 115, duration: 3, ease: 'ease', delay: 3 },
      );
    }
    if (studyCasesRef.current) {
      gsap.fromTo(
        studyCasesRef.current,
        { opacity: 0, y: 0 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 5.5 },
      );
    }
  }, []);

  return (
    <>
      {page?.seoFields && <SeoFields {...page.seoFields} />}
      {/* <div className='revealer'></div> */}
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Animated Blobs using GSAP */}
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
            zIndex: 1,
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
            zIndex: 1,
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
            zIndex: 1,
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 w-full">
          {/* Hero Section */}
          <section className="flex h-[70vh] flex-col items-center justify-center">
            <div
              className={`flex flex-col items-center justify-center transition-all duration-500 ${
                isMobile ? 'pt-2' : 'pt-10 lg:pt-16'
              }`}
            >
              <div
                ref={questionRef}
                className={`mb-8 space-y-6 text-center ${isMobile ? 'mt-2' : ''}`}
              >
                <p
                  ref={questionIntroRef}
                  className="mx-auto max-w-2xl text-xl font-light tracking-wide opacity-80"
                >
                  Hi, I&apos;m Git
                </p>
                <h1
                  ref={questionTextRef}
                  className="mx-auto max-w-3xl font-serif text-3xl leading-tight text-neutral-800 lg:text-4xl dark:text-zinc-100"
                >
                  Designer and builder making complex workflows simple, automated, and usable.
                </h1>
                <p
                  className="mx-auto mt-6 max-w-2xl text-lg font-light leading-7 tracking-wide opacity-70"
                  ref={pillsRef}
                >
                  I help technical teams and decision-makers adopt smarter processes — by
                  integrating data, automation, and AI into everyday work.
                </p>
              </div>
            </div>
          </section>

          {/* Study Cases Section */}
          <section ref={studyCasesRef} className="mx-auto max-w-screen-lg py-20">
            <Container>
              <ArticleTileGrid className="grid-cols-1 md:grid-cols-2" articles={filteredPosts} />
            </Container>
          </section>
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
