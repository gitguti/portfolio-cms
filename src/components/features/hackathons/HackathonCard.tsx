import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import gsap from 'gsap';
import { HTMLProps, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { HiCode, HiExternalLink, HiEye } from 'react-icons/hi';
import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';

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

interface HackathonCardProps extends HTMLProps<HTMLDivElement> {
  hackathon: HackathonFieldsFragment;
}

export const HackathonCard = ({ hackathon, className }: HackathonCardProps) => {
  const {
    name,
    eventName,
    eventDate,
    oneLiner,
    myRole,
    outcome,
    coverImage,
    showcaseUrl,
    demoUrl,
    codeUrl,
  } = hackathon;
  const inspectorProps = useContentfulInspectorMode({ entryId: hackathon.sys.id });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { scale: 1.02, duration: 0.3 });
  };
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { scale: 1, duration: 0.3 });
  };

  const handleLinkClick = (url: string | null | undefined, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (url && url.startsWith('http')) {
      window.open(url, '_blank');
    }
  };

  return (
    <div
      ref={cardRef}
      className={twMerge(
        'flex flex-col rounded-xl border border-neutral-200 bg-white px-3 py-3 dark:border-zinc-700 dark:bg-zinc-900 sm:px-4 sm:py-4',
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header: thumbnail + metadata */}
      <div className="flex items-center gap-3">
        {coverImage && (
          <div
            className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
            {...inspectorProps({ fieldId: 'coverImage' })}
          >
            <CtfImage
              nextImageProps={{ className: 'h-full w-full object-cover' }}
              {...coverImage}
            />
          </div>
        )}
        <div className="flex min-w-0 flex-col">
          {name && (
            <h3
              className="truncate font-serif text-base font-semibold capitalize text-neutral-800 dark:text-zinc-50"
              {...inspectorProps({ fieldId: 'name' })}
            >
              {name}
            </h3>
          )}
          {eventName && (
            <span className="text-xs text-neutral-600 dark:text-zinc-400">
              <span {...inspectorProps({ fieldId: 'eventName' })}>{eventName}</span>
              {eventDate && (
                <>
                  <span className="text-neutral-400 dark:text-zinc-600"> · </span>
                  <span className="text-neutral-500 dark:text-zinc-500">
                    <FormatDate date={new Date(eventDate)} />
                  </span>
                </>
              )}
            </span>
          )}
          {myRole && (
            <span
              className="text-xs text-neutral-500 dark:text-zinc-400"
              {...inspectorProps({ fieldId: 'myRole' })}
            >
              {myRole}
            </span>
          )}
        </div>
      </div>

      {/* Body: description, links, outcome */}
      {(oneLiner || showcaseUrl || demoUrl || codeUrl || outcome) && (
        <div className="mt-3 flex flex-col gap-2">
          {oneLiner && (
            <p
              className="text-xs text-neutral-600 dark:text-zinc-300 sm:text-sm"
              {...inspectorProps({ fieldId: 'oneLiner' })}
            >
              {oneLiner}
            </p>
          )}

          {(showcaseUrl || demoUrl || codeUrl) && (
            <div className="flex flex-wrap gap-2">
              {showcaseUrl && (
                <button
                  onClick={e => handleLinkClick(showcaseUrl, e)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-all hover:bg-neutral-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  aria-label="View showcase"
                >
                  <HiEye className="h-3.5 w-3.5" />
                  <span>Showcase</span>
                </button>
              )}
              {demoUrl && (
                <button
                  onClick={e => handleLinkClick(demoUrl, e)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-all hover:bg-neutral-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  aria-label="View demo"
                >
                  <HiExternalLink className="h-3.5 w-3.5" />
                  <span>Demo</span>
                </button>
              )}
              {codeUrl && (
                <button
                  onClick={e => handleLinkClick(codeUrl, e)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-all hover:bg-neutral-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  aria-label="View code"
                >
                  <HiCode className="h-3.5 w-3.5" />
                  <span>Code</span>
                </button>
              )}
            </div>
          )}

          {outcome && (
            <div>
              <span
                className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400"
                {...inspectorProps({ fieldId: 'outcome' })}
              >
                {outcome}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
