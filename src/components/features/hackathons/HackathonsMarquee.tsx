import { HTMLProps, useEffect, useRef } from 'react';
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

interface HackathonsMarqueeProps extends HTMLProps<HTMLDivElement> {
  hackathons?: Array<HackathonFieldsFragment | null>;
  duration?: number;
}

export const HackathonsMarquee = ({
  hackathons,
  duration = 30,
  className,
}: HackathonsMarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!marqueeRef.current || !hackathons || hackathons.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Calculate total width (including gaps)
    const items = marqueeRef.current.children;
    const itemsArray = Array.from(items) as HTMLElement[];

    // Wait for images to load
    const checkWidths = () => {
      const totalWidth = itemsArray.reduce((acc, item) => {
        return acc + item.offsetWidth;
      }, 0);

      // Add gap spacing (gap-6 = 24px per gap, there are items-1 gaps)
      const gapSpacing = (items.length - 1) * 24;
      const fullWidth = totalWidth + gapSpacing;

      // Create infinite scroll animation
      timelineRef.current = gsap.to(marqueeRef.current, {
        x: -fullWidth / 2,
        duration: duration,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % (fullWidth / 2)),
        },
      });
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const timer = setTimeout(checkWidths, 100);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [hackathons, duration]);

  // Handle pause on hover
  const handleMouseEnter = () => {
    if (timelineRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(timelineRef.current, { timeScale: 0, duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    if (timelineRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(timelineRef.current, { timeScale: 1, duration: 0.3 });
    }
  };

  if (!hackathons || hackathons.length === 0) {
    return (
      <p className="py-16 text-center text-neutral-500 dark:text-zinc-500">
        No hackathons to display yet.
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={marqueeRef} className="flex gap-6">
        {/* Render items twice for seamless loop */}
        {[...hackathons, ...hackathons].map((hackathon, i) =>
          hackathon ? (
            <div key={`${hackathon.sys.id}-${i}`} className="w-80 flex-shrink-0">
              <HackathonCard hackathon={hackathon} />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};
