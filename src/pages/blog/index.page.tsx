import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import { getServerSideTranslations } from '../utils/get-serverside-translations';

import { BlogArticleList } from '@src/components/features/blog';
import { Container } from '@src/components/shared/container';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';

const BlogPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const articles = useContentfulLiveUpdates(props.articles);

  return (
    <>
      <NextSeo title="Blog" description="Artículos sobre diseño, UX, tecnología y procesos" />
      <Container className="my-12 max-w-4xl py-12">
        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl font-bold text-neutral-800 md:text-5xl dark:text-zinc-50">
            Blog
          </h1>
          <p className="text-lg text-neutral-600 dark:text-zinc-300">
            Thoughts on design, technology, and building better products
          </p>
        </div>
        {articles && articles.length > 0 ? (
          <BlogArticleList articles={articles} />
        ) : (
          <p className="text-neutral-600 dark:text-zinc-400">No articles yet.</p>
        )}
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, draftMode: preview }) => {
  try {
    const gqlClient = preview ? previewClient : client;

    const blogArticlesData = await gqlClient.pageBlogPostCollection({
      limit: 100,
      locale,
      order: PageBlogPostOrder.PublishedDateDesc,
      where: {
        contentfulMetadata: {
          tags: {
            id_contains_some: ['blogArticle'],
          },
        },
      },
      preview,
    });

    const articles = blogArticlesData.pageBlogPostCollection?.items || [];

    return {
      revalidate: revalidateDuration,
      props: {
        previewActive: !!preview,
        ...(await getServerSideTranslations(locale)),
        articles,
      },
    };
  } catch (error) {
    console.error('Error fetching blog articles:', error);
    return {
      revalidate: revalidateDuration,
      notFound: true,
    };
  }
};

export default BlogPage;
