import { GetStaticProps } from 'next';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import gsap from 'gsap';

import { getServerSideTranslations } from '../utils/get-serverside-translations';

import { AboutHero, NowSection, aboutContent, beliefs } from '@src/components/features/about';
import { Container } from '@src/components/shared/container';

const AboutPage = () => {
  const { t } = useTranslation();
  const aboutSectionRef = useRef<HTMLElement>(null);
  const beliefsSectionRef = useRef<HTMLElement>(null);

  // GSAP animation for about paragraphs
  useEffect(() => {
    if (!aboutSectionRef.current) return;

    const paragraphs = aboutSectionRef.current.querySelectorAll('.about-paragraph');
    if (!paragraphs.length) return;

    gsap.fromTo(
      paragraphs,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      },
    );
  }, []);

  // GSAP animation for beliefs list
  useEffect(() => {
    if (!beliefsSectionRef.current) return;

    const items = beliefsSectionRef.current.querySelectorAll('.belief-item');
    if (!items.length) return;

    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      },
    );
  }, []);

  return (
    <>
      <NextSeo
        title="About | Git"
        description="Designer and builder making complex workflows simple, automated, and usable. Learn about my approach, current projects, and beliefs."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <AboutHero />

        {/* About Section */}
        <section className="py-16 md:py-20" ref={aboutSectionRef}>
          <Container className="max-w-3xl px-4 md:px-6">
            <h2 className="mb-8 font-serif text-2xl font-light text-neutral-800 dark:text-zinc-50 md:text-3xl">
              {aboutContent.title}
            </h2>
            <div className="space-y-6">
              {aboutContent.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="about-paragraph text-lg leading-relaxed text-neutral-700 dark:text-zinc-300"
                >
                  {para}
                </p>
              ))}
            </div>
          </Container>
        </section>

        {/* Now Section */}
        <NowSection />

        {/* Beliefs Section */}
        <section className="py-16 md:py-20" ref={beliefsSectionRef}>
          <Container className="max-w-3xl px-4 md:px-6">
            <h2 className="mb-8 font-serif text-2xl font-light text-neutral-800 dark:text-zinc-50 md:text-3xl">
              Things I believe
            </h2>
            <ul className="space-y-3">
              {beliefs.map((belief, index) => (
                <li
                  key={index}
                  className="belief-item flex items-start text-base leading-relaxed text-neutral-700 dark:text-zinc-300"
                >
                  <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400 dark:bg-zinc-600" />
                  <span>{belief}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </div>
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

export default AboutPage;
