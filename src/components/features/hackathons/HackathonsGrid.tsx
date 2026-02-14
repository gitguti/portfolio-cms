import { HTMLProps, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { gsap, ScrollTrigger } from '@src/lib/gsap';

import { HackathonCard } from './HackathonCard';

// Temporary type - will be replaced by generated HackathonFieldsFragment once Contentful is set up
type HackathonFieldsFragment = {
  __typename?: 'Hackathon';
  sys: { id: string; spaceId: string };
  internalName?: string | null;
  name?: string | null;
  slug?: string | null;
  oneLiner?: string | null;
  eventName?: string | null;
  eventDate?: string | null;
  myRole?: string | null;
  outcome?: string | null;
  description?: string | null;
  coverImage?: {
    __typename?: 'Asset';
    sys: { id: string };
    url?: string | null;
    title?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  demoVideoUrl?: string | null;
  tags?: Array<string | null> | null;
  showcaseUrl?: string | null;
  demoUrl?: string | null;
  codeUrl?: string | null;
  teamMembersCollection?: {
    items: Array<{
      __typename?: 'TeamMember';
      sys: { id: string };
      name?: string | null;
      role?: string | null;
      linkedinUrl?: string | null;
      twitterUrl?: string | null;
      photo?: {
        __typename?: 'Asset';
        sys: { id: string };
        url?: string | null;
        title?: string | null;
        width?: number | null;
        height?: number | null;
      } | null;
    } | null>;
  } | null;
  contentfulMetadata?: {
    tags: Array<{
      id: string;
      name: string;
    } | null>;
  } | null;
};

interface HackathonsGridProps extends HTMLProps<HTMLDivElement> {
  hackathons?: Array<HackathonFieldsFragment | null>;
  className?: string;
}

export const HackathonsGrid = ({ hackathons, className }: HackathonsGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.hackathon-card');
    if (!items?.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [hackathons]);

  if (!hackathons || hackathons.length === 0) {
    return (
      <p className="py-16 text-center text-neutral-500 dark:text-zinc-500">
        No hackathons to display yet.
      </p>
    );
  }

  return (
    <div
      ref={gridRef}
      className={twMerge('grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3', className)}
    >
      {hackathons.map(
        hackathon =>
          hackathon && (
            <div key={hackathon.sys.id} className="hackathon-card">
              <HackathonCard hackathon={hackathon} />
            </div>
          ),
      )}
    </div>
  );
};
