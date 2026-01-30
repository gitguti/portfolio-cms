import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

import type { CraftProject } from './craft-data';

interface CraftItemProps {
  project: CraftProject;
  onClick: (project: CraftProject) => void;
}

export const CraftItem = ({ project, onClick }: CraftItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(itemRef.current, { scale: 1.02, duration: 0.3 });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(itemRef.current, { scale: 1, duration: 0.3 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
  };

  const renderMedia = () => {
    switch (project.medium) {
      case 'gif':
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.src}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        );
      case 'video':
        return (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={project.src}
            poster={project.poster}
            muted
            autoPlay
            loop
            playsInline
            preload="none"
            className="h-full w-full object-cover"
          />
        );
      case 'iframe':
        return (
          <div className="relative h-full w-full overflow-hidden">
            <iframe
              src={project.src}
              title={project.title}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              className="pointer-events-none h-full w-full border-0"
              aria-hidden="true"
            />
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span className="text-[10px] font-medium text-white">Live</span>
            </div>
          </div>
        );
      case 'image':
      default:
        return (
          <Image
            src={project.src}
            alt={project.title}
            width={800}
            height={600}
            loading="lazy"
            quality={85}
            unoptimized={project.source === 'dribbble'}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full object-cover"
          />
        );
    }
  };

  return (
    <div
      className="craft-item"
      role="button"
      tabIndex={0}
      onClick={() => onClick(project)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
    >
      <div
        ref={itemRef}
        className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-white dark:bg-zinc-900"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {renderMedia()}

        {/* Hover overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0"
        >
          <h3 className="text-base font-semibold text-white">{project.title}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium capitalize text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
