import { useEffect, useRef } from 'react';
import Link from 'next/link';

import gsap from 'gsap';

import { Container } from '@src/components/shared/container';

import { nowData } from './about-data';

export const NowSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.now-item');
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

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="py-4 md:py-6" ref={sectionRef}>
      <Container className="max-w-3xl px-4 md:px-6">
        <div className="space-y-4">
          {/* Header with title and last updated */}
          <div className="now-item space-y-2">
            <h2 className="font-serif text-2xl font-light text-neutral-800 dark:text-zinc-50 md:text-3xl">
              Now
            </h2>
            <p className="text-xs text-neutral-500 dark:text-zinc-500">
              Last updated: {formatDate(nowData.lastUpdated)}
            </p>
          </div>

          {/* Current Project */}
          <div className="now-item space-y-2">
            <p className="text-base leading-relaxed text-neutral-700 dark:text-zinc-300">
              {nowData.currentProject}
            </p>
          </div>

          {/* Learning */}
          <div className="now-item space-y-3">
            <h3 className="font-serif font-medium text-neutral-800 dark:text-zinc-200">
              Currently exploring
            </h3>
            <ul className="space-y-2">
              {nowData.learning.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start text-base leading-relaxed text-neutral-700 dark:text-zinc-300"
                >
                  <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400 dark:bg-zinc-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
