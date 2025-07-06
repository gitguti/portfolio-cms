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
  posts.forEach((post: any) => {
    post.contentfulMetadata?.tags?.forEach((tag: any) => {
      if (tag?.id && tag?.name) tagMap.set(tag.id, tag.name);
    });
  });
  const allTags = Array.from(tagMap.entries()); // [ [id, name], ... ]

  // Filter posts by selected tag (if any)
  const filteredPosts = selectedTag
    ? posts.filter((post: any) =>
        post.contentfulMetadata?.tags?.some((tag: any) => tag.id === selectedTag),
      )
    : posts;

  // Replace the problematic useEffect with this improved version
  useEffect(() => {
    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf([questionRef.current, pillsRef.current, postsRef.current]);

    if (!selectedTag) {
      // DESELECTION - Return to original state
      if (hasBeenFiltered) {
        // Animate posts out first
        gsap.to(postsRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            // Then animate question and pills back to center
            gsap.to([questionRef.current, pillsRef.current], {
              y: 200,
              duration: 1.2,
              ease: 'power3.inOut',
              onComplete: () => {
                // Reset the flag after animation completes
                setHasBeenFiltered(false);
              },
            });
          },
        });
      } else {
        // INITIAL STATE - Ensure everything is in initial position
        gsap.set([questionRef.current, pillsRef.current], { y: 200, x: 0 });
        gsap.set(postsRef.current, { x: 0, y: 250, opacity: 0 });
      }
      return;
    }

    if (!hasBeenFiltered) {
      // FIRST TIME - Pure vertical animation
      gsap.to([questionRef.current, pillsRef.current], {
        y: 50,
        x: 0,
        duration: 1.8,
        ease: 'power3.out',
      });

      gsap.fromTo(
        postsRef.current,
        {
          x: 0,
          y: 250,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          delay: 0.5,
          onComplete: () => {
            // Set the flag after first animation completes
            setHasBeenFiltered(true);
          },
        },
      );
    } else {
      // SUBSEQUENT TIMES - Pure horizontal animation
      gsap.to(postsRef.current, {
        x: -100,
        y: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          gsap.fromTo(
            postsRef.current,
            {
              x: 100,
              y: 0,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
            },
          );
        },
      });
    }
  }, [selectedTag]); // Remove hasBeenFiltered from dependency array

  // Also, update the handlePillClick function to be more explicit:
  const handlePillClick = (tagId: string) => {
    const newSelectedTag = selectedTag === tagId ? null : tagId;
    setSelectedTag(newSelectedTag);
  };
  // Animate question text on mount
  useEffect(() => {
    if (questionTextRef.current) {
      gsap.fromTo(
        questionTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.3, ease: 'power2.in', delay: 2 },
      );
    }
    if (questionIntroRef.current) {
      gsap.fromTo(
        questionIntroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 5, duration: 1, ease: 'power2.in', delay: 1 },
      );
    }
    if (pillsRef.current) {
      gsap.fromTo(
        pillsRef.current,
        { opacity: 0, y: 400 },
        { opacity: 1, y: 200, duration: 3, ease: 'ease', delay: 3 },
      );
    }
  }, []);

  if (!posts) return null;

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
            top: isMobile ? '30%' : '32%',
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
            top: isMobile ? '30%' : '37%',
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
            top: isMobile ? '10%' : '24%',
            transform: 'translate(-60%, -50%)',
            zIndex: 1,
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 w-full">
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
                className="mx-auto max-w-2xl text-lg font-light tracking-wide opacity-70"
              >
                Design it&apos;s about how deeply you listen.
              </p>
              <h1
                ref={questionTextRef}
                className="mx-auto max-w-3xl font-serif text-3xl text-neutral-800 dark:text-zinc-100 lg:text-4xl"
              >
                What kind of stories do you want to hear?
              </h1>
            </div>
            {/* Pill Buttons from real tags */}
            <div ref={pillsRef} className="relative z-20 mb-16 flex flex-wrap justify-center gap-3">
              {allTags.map(([id, name]) => (
                <button
                  key={id}
                  className={`rounded-full border px-6 py-2 capitalize transition-all duration-200
                    ${
                      selectedTag === id
                        ? 'bg-black text-white dark:bg-zinc-100 dark:font-semibold dark:text-black'
                        : 'border-gray-300 text-black hover:bg-gray-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900'
                    }
                  `}
                  onClick={() => handlePillClick(id)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          {/* Render filtered posts or call to action */}
          <div ref={postsRef} style={{ minHeight: 150 }}>
            {selectedTag ? (
              <ArticleTileGrid className="grid-cols-1 " articles={filteredPosts} />
            ) : null}
          </div>
        </div>
        {/* Responsive adjustments for blobs */}
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
