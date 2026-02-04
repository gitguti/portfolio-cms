import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';

import { getServerSideTranslations } from '../utils/get-serverside-translations';

import { ArticleContent, ArticleHero } from '@src/components/features/article';
import { BlogArticleList } from '@src/components/features/blog';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { client, previewClient } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';

const BlogArticlePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const blogPost = useContentfulLiveUpdates(props.blogPost);
  const relatedPosts = blogPost?.relatedBlogPostsCollection?.items;

  if (!blogPost) return null;

  return (
    <>
      {blogPost.seoFields && <SeoFields {...blogPost.seoFields} />}
      <Container className="mt-8 max-w-3xl">
        <ArticleHero article={blogPost} isFeatured={false} isReversedLayout={true} />
      </Container>
      <Container className="mt-8 max-w-3xl">
        <ArticleContent article={blogPost} />
      </Container>
      {relatedPosts && relatedPosts.length > 0 && (
        <Container className="mt-12 max-w-3xl">
          <h2 className="mb-6 font-serif text-2xl font-medium text-neutral-800 dark:text-zinc-50">
            Related Articles
          </h2>
          <BlogArticleList articles={relatedPosts} />
        </Container>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params, locale, draftMode: preview }) => {
  if (!params?.slug || !locale) {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }

  const gqlClient = preview ? previewClient : client;

  try {
    const blogPageData = await gqlClient.pageBlogPost({
      slug: params.slug.toString(),
      locale,
      preview,
    });

    const blogPost = blogPageData.pageBlogPostCollection?.items[0];

    // Verify the post has the blogArticle tag
    const hasBlogTag = blogPost?.contentfulMetadata?.tags?.some(tag => tag?.id === 'blogArticle');

    if (!blogPost || !hasBlogTag) {
      return {
        notFound: true,
        revalidate: revalidateDuration,
      };
    }

    return {
      revalidate: revalidateDuration,
      props: {
        ...(await getServerSideTranslations(locale)),
        previewActive: !!preview,
        blogPost,
      },
    };
  } catch (error) {
    console.error('Error fetching blog article:', error);
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const dataPerLocale = locales
    ? await Promise.all(
        locales.map(locale =>
          client.pageBlogPostCollection({
            locale,
            limit: 100,
            where: {
              contentfulMetadata: {
                tags: {
                  id_contains_some: ['blogArticle'],
                },
              },
            },
          }),
        ),
      )
    : [];

  const paths = dataPerLocale
    .flatMap((data, index) =>
      data.pageBlogPostCollection?.items.map(blogPost =>
        blogPost?.slug
          ? {
              params: {
                slug: blogPost.slug,
              },
              locale: locales?.[index],
            }
          : undefined,
      ),
    )
    .filter(Boolean);

  return {
    paths,
    fallback: 'blocking',
  };
};

export default BlogArticlePage;
