import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillDribbbleCircle,
} from 'react-icons/ai';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { TbBrandGithubFilled, TbBrandDribbbleFilled } from 'react-icons/tb';
import { MdEmail } from 'react-icons/md';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import gsap from 'gsap';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect } from 'react';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { ArticleTileGrid } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';
import { initScrollAnimations } from '@src/pages/utils/scrollAnimations';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    initScrollAnimations();
  }, []);
  const page = useContentfulLiveUpdates(props.page);
  const posts = useContentfulLiveUpdates(props.posts);

  if (!page?.featuredBlogPost || !posts) return;

  return (
    <>
      {page.seoFields && <SeoFields {...page.seoFields} />}
      <div className="relative overflow-x-hidden">
        <div className="scrollx flex w-[200vw]">
          <section className="h-screen w-screen">
            <div className="flex h-full flex-col justify-center px-8 md:flex-row">
              <div className="flex w-full flex-col justify-end border-b-2 border-neutral-300 py-8 px-4 md:w-3/5 md:border-b-0">
                <span className="mb-6 font-serif text-4xl text-zinc-700 dark:text-zinc-100 md:mb-2 md:text-7xl">
                  gitmel gutierrez
                </span>
                <h1 className="mb-4 text-7xl font-bold text-zinc-700 dark:text-zinc-50  md:text-8xl">
                  Product Designer
                </h1>
                {/* <p>
            Passionate about building through desing & code.
              </p> */}
                <Link href="/404"> About me</Link>
              </div>
              <div className="w-full border-l-0 border-neutral-300 py-8 px-2 md:w-2/5 md:px-12">
                <h2 className="mb-6 text-gray-100">Contact</h2>
                <div className="flex h-fit gap-4">
                  <a
                    href="http://github.com/gitguti"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <div className="bg-neutral-950 flex h-14 w-14 items-center justify-center rounded-full transition duration-500 ease-in hover:-translate-y-3 hover:border hover:border-neutral-500 hover:ease-in md:h-24 md:w-24">
                      <TbBrandGithubFilled className="h-8 w-8 md:h-20 md:w-20" color="white" />
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gitguti/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <div className="bg-neutral-950 flex h-14 w-14 items-center justify-center rounded-full transition duration-500 ease-in hover:-translate-y-3 hover:border hover:border-neutral-500 hover:ease-in md:h-24 md:w-24">
                      <FaLinkedinIn className="h-12 w-12 p-2 md:h-20 md:w-20" fill="white" />
                    </div>
                  </a>
                  <a
                    href="https://twitter.com/whynotgit"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Dribbble"
                  >
                    <div className="bg-neutral-950 flex h-14 w-14 items-center justify-center rounded-full transition duration-500 ease-in hover:-translate-y-3 hover:border hover:border-neutral-500 hover:ease-in md:h-24 md:w-24">
                      <FaTwitter className="h-12 w-12 p-2 md:h-20 md:w-20" fill="white" />
                    </div>
                  </a>
                  <a
                    href="https://dribbble.com/gitguti"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Dribbble"
                  >
                    <div className="bg-neutral-950 flex h-14 w-14 items-center justify-center rounded-full transition duration-500 ease-in hover:-translate-y-3 hover:border hover:border-neutral-500 hover:ease-in md:h-24 md:w-24">
                      <TbBrandDribbbleFilled
                        className="h-12 w-12 p-2 md:h-20 md:w-20 "
                        color="white"
                      />
                    </div>
                  </a>
                  <a
                    href="mailto:gitmelbco@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Email"
                  >
                    <div className="bg-neutral-950 flex h-14 w-14 items-center justify-center rounded-full transition duration-500 ease-in hover:-translate-y-3 hover:border hover:border-neutral-500 hover:ease-in md:h-24 md:w-24">
                      <MdEmail className="h-12 w-12 p-2 md:h-20 md:w-20" fill="white" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="h-auto w-screen">
            <Container className="my-8  md:mb-10 lg:mb-16">
              <h2 className="mb-4 md:mb-6">{t('landingPage.latestArticles')}</h2>
              <ArticleTileGrid className="md:grid-cols-2 lg:grid-cols-3" articles={posts} />
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
        slug_not: page?.featuredBlogPost?.slug,
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
