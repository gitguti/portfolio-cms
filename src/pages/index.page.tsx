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

  // Enhanced GSAP Animation Logic - Completely Independent
  useEffect(() => {
    if (!selectedTag) {
      if (hasBeenFiltered) {
        // DESELECTION - Smooth return to original state
        gsap.killTweensOf([questionRef.current, pillsRef.current, postsRef.current]);

        // Animate posts out first
        gsap.to(postsRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            // Then animate question and pills back to center
            gsap.to([questionRef.current, pillsRef.current], {
              y: 250,
              duration: 1.2,
              ease: 'power3.inOut',
            });
          },
        });
      } else {
        // INITIAL STATE - Complete reset to initial state
        gsap.killTweensOf([questionRef.current, pillsRef.current, postsRef.current]);
        gsap.set([questionRef.current, pillsRef.current], { y: 250, x: 0 });
        gsap.set(postsRef.current, { x: 0, y: 200, opacity: 0 });
      }

      // Reset the flag after animation
      setTimeout(() => setHasBeenFiltered(false), hasBeenFiltered ? 800 : 0);
      return;
    }

    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf([questionRef.current, pillsRef.current, postsRef.current]);

    if (!hasBeenFiltered) {
      // FIRST TIME - Pure vertical animation
      // Question and pills animation
      gsap.to([questionRef.current, pillsRef.current], {
        y: 25,
        x: 0, // Explicitly keep horizontal position
        duration: 1.8,
        ease: 'power3.out',
      });

      // Posts animation - completely vertical
      gsap.fromTo(
        postsRef.current,
        {
          x: 0,
          y: 200,
          opacity: 0,
        },
        {
          x: 0, // No horizontal movement at all
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'ease.out',
          delay: 0.5,
        },
      );

      setHasBeenFiltered(true);
    } else {
      // SUBSEQUENT TIMES - Pure horizontal animation
      // First slide out to the left
      gsap.to(postsRef.current, {
        x: -100,
        y: 0, // Keep vertical position stable
        opacity: 0,
        duration: 1.2,
        ease: 'ease.out',
        onComplete: () => {
          // Then slide in from the right
          gsap.fromTo(
            postsRef.current,
            {
              x: 100,
              y: 0, // Keep vertical position stable
              opacity: 0,
            },
            {
              x: 0,
              y: 0, // Keep vertical position stable
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            },
          );
        },
      });
    }
  }, [selectedTag]);

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
        { opacity: 1, y: 250, duration: 3, ease: 'ease', delay: 3 },
      );
    }
  }, []);

  // Handle pill click
  const handlePillClick = (tagId: string) => {
    setSelectedTag(selectedTag === tagId ? null : tagId);
  };

  if (!posts) return null;

  return (
    <>
      {page?.seoFields && <SeoFields {...page.seoFields} />}
      {/* <div className='revealer'></div> */}
      <div>
        <div className="flex flex-col items-center justify-center pt-16 transition-all duration-500">
          <div ref={questionRef} className="mb-8 space-y-6 text-center">
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
          <div ref={pillsRef} className="mb-16 flex flex-wrap justify-center gap-3">
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
