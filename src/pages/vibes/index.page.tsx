import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import { getServerSideTranslations } from '../utils/get-serverside-translations';

import { VibesGrid } from '@src/components/features/vibes';
import { vibesProjects } from '@src/components/features/vibes/vibes-data';
import { Container } from '@src/components/shared/container';

const VibesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title="Vibes" description="Side quests, rabbit holes, and things I built for fun" />
      <Container className="my-12 max-w-5xl py-12">
        <div className="mb-12 pt-16">
          <h1 className="mb-4 font-serif text-3xl font-light text-neutral-800 md:text-5xl dark:text-zinc-50">
            Vibes
          </h1>
          <p className="text-base text-neutral-600 md:text-lg dark:text-zinc-300">
            Side quests, rabbit holes, and things I built for fun.
          </p>
        </div>

        <VibesGrid projects={vibesProjects} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    revalidate: 3600,
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  };
};

export default VibesPage;
