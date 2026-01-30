import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { useCallback, useState } from 'react';

import { getServerSideTranslations } from '../utils/get-serverside-translations';

import { CraftGrid, CraftLightbox, CraftTagFilter } from '@src/components/features/craft';
import type { CraftProject } from '@src/components/features/craft';
import { localCraftProjects } from '@src/components/features/craft/craft-data';
import { Container } from '@src/components/shared/container';
import { fetchDribbbleShots } from '@src/lib/dribbble';

const CraftPage = ({ projects, tags }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [lightboxProject, setLightboxProject] = useState<CraftProject | null>(null);

  const filteredProjects = selectedTag
    ? projects.filter((p: CraftProject) => p.tags.includes(selectedTag))
    : projects;

  const handleItemClick = useCallback((project: CraftProject) => {
    setLightboxProject(project);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxProject(null);
  }, []);

  return (
    <>
      <NextSeo
        title="Craft"
        description="Design experiments, interactions, and visual explorations"
      />
      <Container className="my-12 max-w-5xl py-12">
        <div className="mb-12 pt-16">
          <h1 className="mb-4 font-serif text-3xl font-light text-neutral-800 md:text-5xl dark:text-zinc-50">
            Craft
          </h1>
          <p className="text-base text-neutral-600 md:text-lg dark:text-zinc-300">
            Experiments, interactions, and visual explorations.
          </p>
        </div>

        {tags.length > 0 && (
          <CraftTagFilter tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
        )}

        <CraftGrid projects={filteredProjects} onItemClick={handleItemClick} />
      </Container>

      <CraftLightbox project={lightboxProject} onClose={handleCloseLightbox} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const dribbbleProjects = await fetchDribbbleShots();

  // Merge all sources: local + Dribbble
  const allProjects = [...localCraftProjects, ...dribbbleProjects].sort((a, b) => {
    // Featured items first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Then by date descending
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Derive unique tags from merged data
  const tags = Array.from(new Set(allProjects.flatMap(p => p.tags))).sort();

  return {
    revalidate: 3600,
    props: {
      projects: allProjects,
      tags,
      ...(await getServerSideTranslations(locale)),
    },
  };
};

export default CraftPage;
