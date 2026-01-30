import gsap from 'gsap';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { FiExternalLink, FiX } from 'react-icons/fi';

import type { CraftProject } from './craft-data';

import { Portal } from '@src/components/shared/portal';

interface CraftLightboxProps {
  project: CraftProject | null;
  onClose: () => void;
}

export const CraftLightbox = ({ project, onClose }: CraftLightboxProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const animateClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { y: 20, opacity: 0, duration: 0.25 });
    tl.to(backdropRef.current, { opacity: 0, duration: 0.2 }, '-=0.1');
  }, [onClose]);

  useEffect(() => {
    if (!project) return;

    // Animate in
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power2.out' },
    );

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [project]);

  // Escape key handler
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') animateClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [project, animateClose]);

  if (!project) return null;

  const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const renderMedia = () => {
    switch (project.medium) {
      case 'gif':
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.src}
            alt={project.title}
            className="h-auto max-h-[60vh] w-full rounded-lg object-contain"
          />
        );
      case 'video':
        return (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={project.src}
            poster={project.poster}
            controls
            playsInline
            className="h-auto max-h-[60vh] w-full rounded-lg"
          />
        );
      case 'iframe':
        return (
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{ aspectRatio: project.aspectRatio || '16/9' }}
          >
            <iframe
              src={project.src}
              title={project.title}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              className="h-full w-full border-0"
            />
          </div>
        );
      case 'image':
      default:
        return (
          <Image
            src={project.src}
            alt={project.title}
            width={1200}
            height={800}
            quality={90}
            unoptimized={project.source === 'dribbble'}
            className="h-auto max-h-[60vh] w-full rounded-lg object-contain"
          />
        );
    }
  };

  return (
    <Portal>
      {/* Backdrop */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:p-8 dark:bg-black/90"
        onClick={e => {
          if (e.target === e.currentTarget) animateClose();
        }}
      >
        {/* Content */}
        <div
          ref={contentRef}
          className="relative max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 md:max-w-4xl md:p-8 dark:bg-zinc-900"
        >
          {/* Close button */}
          <button
            onClick={animateClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            aria-label="Close"
          >
            <FiX className="h-4 w-4" />
          </button>

          {/* Media */}
          <div className="mb-6">{renderMedia()}</div>

          {/* Details */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-neutral-800 md:text-3xl dark:text-zinc-50">
              {project.title}
            </h2>

            <p className="text-sm leading-relaxed text-neutral-600 dark:text-zinc-300">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-zinc-800">
              <time className="text-xs text-neutral-500 dark:text-zinc-500">{formattedDate}</time>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                >
                  View project
                  <FiExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
