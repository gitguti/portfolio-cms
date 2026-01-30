import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import type { CraftProject } from './craft-data';
import { CraftItem } from './CraftItem';

interface CraftGridProps {
  projects: CraftProject[];
  onItemClick: (project: CraftProject) => void;
}

export const CraftGrid = ({ projects, onItemClick }: CraftGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.craft-item');
    if (!items?.length) return;

    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      },
    );
  }, [projects]);

  if (projects.length === 0) {
    return (
      <p className="py-16 text-center text-neutral-500 dark:text-zinc-500">
        No projects found for this filter.
      </p>
    );
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map(project => (
        <CraftItem key={project.id} project={project} onClick={onItemClick} />
      ))}
    </div>
  );
};
