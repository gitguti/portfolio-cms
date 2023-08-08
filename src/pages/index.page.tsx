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
import { Cursor } from '@src/components/shared/cursor';
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
        <Cursor />
        <div className="scrollx flex w-[200vw]">
          <section className="h-screen w-screen">
            <div className="flex h-full flex-col justify-center px-8 md:flex-row">
              <div className="flex w-full flex-col justify-around border-b-2 border-neutral-800 py-8 px-4 md:w-3/5 md:border-b-0 md:border-r">
                <div className="flex w-full flex-col justify-start border-b-2 border-neutral-800 py-8 px-4 md:border-b-0">
                  {/* <Link href="/404" className='h2 dark:text-zinc-100 mb-8'> Work</Link>
              <Link href="/404" className='h2 dark:text-zinc-100 leading-8'> About</Link> */}
                  <span className="animatedFIU fadeInUp mb-6 text-4xl text-neutral-800 dark:text-zinc-100 md:mb-2 md:text-5xl">
                    Hey, I&apos;m a
                  </span>
                  <h1 className="outer animatedSID  slideInDown my-4 h-32  overflow-hidden font-serif text-7xl leading-[8rem] text-neutral-800 dark:text-zinc-50 md:text-[7rem]">
                    <span>
                      Maker: <br></br>
                      Product Designer: <br></br>
                      UX Engineer: <br></br>
                      Wild Unicorn: <br></br>
                    </span>
                  </h1>
                  <p className="animatedFIL fadeInUp text-2xl font-light text-neutral-700 dark:text-zinc-50 ">
                    <span className="font-serif">[sounds builder] </span>A passionate about building
                    through design and code. My goal is to create products that solve user needs
                    with a delightful experience
                  </p>
                  {/* <Link href="/404" className="h4 leading-8 dark:text-zinc-100">
                    {' '}
                    About
                  </Link> */}
                </div>
                <div className="relative flex flex-col border-neutral-800 pt-8 md:border-t">
                  <h3 className="absolute -bottom-14 right-0 font-serif text-9xl font-light text-neutral-800">
                    Skills
                  </h3>
                  <div className="flex gap-x-16 text-sm font-light text-neutral-700 dark:text-neutral-400">
                    <div className="">
                      Product:<br></br>
                      Lean UX<br></br>
                      Design Thinking<br></br>
                      JTBD<br></br>
                      UX Research<br></br>
                      Design system<br></br>
                      Atomic Design<br></br>
                      UI Design<br></br>
                    </div>
                    <div className="">
                      Code:<br></br>
                      React<br></br>
                      NextJS<br></br>
                      Chakra UI<br></br>
                      StoryBook<br></br>
                      Tailwind CSS<br></br>
                      Gsap<br></br>
                      Framer Motion<br></br>
                      Spline<br></br>
                    </div>
                    <div className="">
                      Tools:<br></br>
                      Figma<br></br>
                      Miro<br></br>
                      FigJam<br></br>
                      Adobe Illustrator<br></br>
                    </div>
                  </div>
                  {/* <p className="dark:text-zinc-50 h3">
            Passionate about building through desing & code.
              </p> */}
                </div>
              </div>
              <div className="w-full border-l-0 border-neutral-300 py-8 px-2 md:w-2/5 md:px-12">
                <div className="flex h-fit gap-4">
                  <a
                    href="http://github.com/gitguti"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <div className="dark:bg-neutral-950 md:h-18 md:w-18 flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in">
                      <TbBrandGithubFilled className="h-8 w-8 md:h-8 md:w-8" color="white" />
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gitguti/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <div className="dark:bg-neutral-950 md:h-18 md:w-18 flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in">
                      <FaLinkedinIn className="h-12 w-12 p-2 md:h-14 md:w-14" fill="white" />
                    </div>
                  </a>
                  <a
                    href="https://twitter.com/whynotgit"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Dribbble"
                  >
                    <div className="dark:bg-neutral-950 md:h-18 md:w-18 flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in">
                      <FaTwitter className="h-12 w-12 p-2 md:h-14 md:w-14" fill="white" />
                    </div>
                  </a>
                  <a
                    href="https://dribbble.com/gitguti"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Dribbble"
                  >
                    <div className="dark:bg-neutral-950 md:h-18 md:w-18 flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in">
                      <TbBrandDribbbleFilled
                        className="h-12 w-12 p-2 md:h-14 md:w-14 "
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
                    <div className="dark:bg-neutral-950 md:h-18 md:w-18 flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in">
                      <MdEmail className="h-12 w-12 p-2 md:h-14 md:w-14" fill="white" />
                    </div>
                  </a>
                </div>
                <h3 className="vertical absolute bottom-10 right-32 font-serif text-[12rem] font-light text-neutral-800">
                  Work
                </h3>
              </div>
            </div>
          </section>
          <section className="h-screen w-screen">
            <Container className="my-8  md:mb-10 lg:mb-16">
              <h2 className="mb-4 text-neutral-800 dark:text-zinc-50 md:mb-6">
                {t('landingPage.latestArticles')}
              </h2>
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
