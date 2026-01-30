import gsap from 'gsap';
import { useRef, useState } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

import type { VibesProject } from './vibes-data';

interface VibesCardProps {
  project: VibesProject;
}

export const VibesCard = ({ project }: VibesCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -4,
      boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 0px 0px 0px rgba(0,0,0,0)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className="vibes-card group flex flex-col overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-colors dark:border-zinc-800 dark:bg-zinc-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Iframe preview — render at 1440×900 and scale down to fit */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
        {!iframeLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-zinc-700" />
        )}
        <div
          className="absolute inset-0 origin-top-left scale-[0.35]"
          style={{ width: '285.7%', height: '285.7%' }}
        >
          <iframe
            src={project.previewUrl}
            title={`${project.title} preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            className="pointer-events-none h-full w-full border-0"
            aria-hidden="true"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          <span className="text-[10px] font-medium text-white">Live Preview</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-light text-neutral-800 dark:text-zinc-50">
          {project.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-zinc-300">
          {project.description}
        </p>

        {/* {project.story && (
          <p className="mt-2 text-xs italic leading-relaxed text-neutral-400 dark:text-zinc-500">
            &ldquo;{project.story}&rdquo;
          </p>
        )} */}

        {/* Tech stack badges */}
        <div className="mt-4 flex w-full items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="rounded-full bg-violet-100 px-2.5 py-0.5 font-mono text-[10px] font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="">
            <div className="mt-auto flex gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-50"
              >
                <FiGithub className="h-3.5 w-3.5" />
                Code
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-50"
              >
                <FiExternalLink className="h-3.5 w-3.5" />
                Live
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
