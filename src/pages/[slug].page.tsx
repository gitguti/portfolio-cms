import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { ArticleTile, CaseStudyLayout } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { SectionLabel } from '@src/components/shared/section-label';
import { client, previewClient } from '@src/lib/client';
import { useConditionalLiveUpdates } from '@src/lib/hooks/useConditionalLiveUpdates';
import { revalidateDuration } from '@src/pages/utils/constants';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const blogPost = useConditionalLiveUpdates(props.blogPost, props.previewActive);
  const relatedPosts = blogPost?.relatedBlogPostsCollection?.items;
  if (!blogPost) return null;

  return (
    <>
      {blogPost.seoFields && <SeoFields {...blogPost.seoFields} />}
      <CaseStudyLayout article={blogPost} />

      {relatedPosts && relatedPosts.length > 0 && (
        <div className="mx-auto w-full max-w-[1080px] px-6 sm:px-12">
          <section className="border-t border-black/[0.08] py-16 dark:border-white/10">
            <SectionLabel title="Next case" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedPosts.map((post, i) =>
                post ? <ArticleTile key={post.sys?.id ?? i} article={post} /> : null,
              )}
            </div>
          </section>
        </div>
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
    const [blogPageData, landingPageData] = await Promise.all([
      gqlClient.pageBlogPost({ slug: params.slug.toString(), locale, preview }),
      gqlClient.pageLanding({ locale, preview }),
    ]);

    const blogPost = blogPageData.pageBlogPostCollection?.items[0];
    const landingPage = landingPageData.pageLandingCollection?.items[0];

    const isFeatured =
      landingPage?.featuredBlogPost?.__typename === 'PageBlogPost' &&
      (landingPage.featuredBlogPost as { slug?: string }).slug === blogPost?.slug;

    if (!blogPost) {
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
        isFeatured,
      },
    };
  } catch {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const dataPerLocale = locales
    ? await Promise.all(
        locales.map(locale => client.pageBlogPostCollection({ locale, limit: 100 })),
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

export default Page;
