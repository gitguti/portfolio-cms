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
        <div className="scrollx flex w-[300vw]">
          <section className="sec1 h-screen w-screen p-[10vw]">
            <span className="text-lg font-semibold">Advanced</span>
            <h1 className="mb-4 text-4xl font-bold">Signify Elegance</h1>

            <div className="flex gap-8">
              <p>
                Lorem ipsum dolor sit amet consectetur. Egestas euismod nec sit sed massa turpis in.
                Sit praesent arcu leo lectus pellentesque. Ornare elit orci morbi volutpat. Ut
                fermentum lorem morbi quis risus amet urna. Urna egestas lorem.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur. Egestas euismod nec sit sed massa turpis in.
                Sit praesent arcu leo lectus pellentesque. Ornare elit orci morbi volutpat. Ut
                fermentum lorem morbi quis risus amet urna. Urna egestas lorem.
              </p>
            </div>
          </section>
          <section className="sec2 h-auto w-screen p-[10vw]">
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
