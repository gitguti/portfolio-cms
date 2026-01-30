import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import type { VibesProject } from './vibes-data';
import { VibesCard } from './VibesCard';

interface VibesGridProps {
  projects: VibesProject[];
}

export const VibesGrid = ({ projects }: VibesGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.vibes-card');
    if (!items?.length) return;

    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      },
    );
  }, [projects]);

  if (projects.length === 0) {
    return (
      <p className="py-16 text-center text-neutral-500 dark:text-zinc-500">
        Nothing here yet — check back soon.
      </p>
    );
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map(project => (
        <VibesCard key={project.id} project={project} />
      ))}
    </div>
  );
};
