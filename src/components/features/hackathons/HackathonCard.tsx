import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import gsap from 'gsap';
import { HTMLProps, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { HiCode, HiExternalLink, HiEye } from 'react-icons/hi';
import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { TeamAvatarStack } from './TeamAvatarStack';

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
    teamMembersCollection,
  } = hackathon;
  const inspectorProps = useContentfulInspectorMode({ entryId: hackathon.sys.id });
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // GSAP hover animation
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { scale: 1.02, duration: 0.3 });
    gsap.to(overlayRef.current, { zIndex: 20, duration: 0.4 });
  };
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { scale: 1, duration: 0.3 });
    gsap.to(overlayRef.current, { zIndex: 0, duration: 0.4 });
  };

  // Filter system tags
  const displayTags = hackathon.contentfulMetadata?.tags
    ?.filter(tag => tag?.id !== 'caseStudy' && tag?.id !== 'blogArticle')
    .filter(tag => tag?.name);

  const handleLinkClick = (url: string | null | undefined, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (url && url.startsWith('http')) {
      window.open(url, '_blank');
    }
  };

  return (
    <div
      className={twMerge(
        'flex flex-col rounded-xl border border-neutral-200 bg-white px-4 py-4 dark:border-zinc-700 dark:bg-zinc-900',
        className,
      )}
      role="button"
      tabIndex={0}
    >
      {/* Cover Image */}
      <div
        ref={cardRef}
        className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Placeholder background with title (visible initially, z-10) */}
        <div className="flex items-center justify-center p-4"></div>

        {/* Cover Image (hidden initially, reveals on hover via z-index) */}
        {coverImage && (
          <div
            ref={overlayRef}
            className="absolute inset-0 z-0"
            {...inspectorProps({ fieldId: 'coverImage' })}
          >
            <CtfImage
              nextImageProps={{ className: 'h-full w-full object-cover' }}
              {...coverImage}
            />
          </div>
        )}
      </div>

      {/* Card Content - Below Image */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Event Info */}
        {eventName && (
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-medium text-neutral-600 dark:text-zinc-400"
              {...inspectorProps({ fieldId: 'eventName' })}
            >
              {eventName}
            </span>
            {eventDate && (
              <>
                <span className="text-neutral-400 dark:text-zinc-600">·</span>
                <span className="text-xs text-neutral-500 dark:text-zinc-500">
                  <FormatDate date={new Date(eventDate)} />
                </span>
              </>
            )}
          </div>
        )}

        {/* Title and Description */}
        {name && (
          <h3
            className="font-serif text-lg font-semibold capitalize text-neutral-800 dark:text-zinc-50"
            {...inspectorProps({ fieldId: 'name' })}
          >
            {name}
          </h3>
        )}

        {oneLiner && (
          <p
            className="text-sm text-neutral-600 dark:text-zinc-300"
            {...inspectorProps({ fieldId: 'oneLiner' })}
          >
            {oneLiner}
          </p>
        )}

        {/* Action Buttons */}
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

        {/* My Role */}
        {myRole && (
          <p
            className="text-xs text-neutral-500 dark:text-zinc-400"
            {...inspectorProps({ fieldId: 'myRole' })}
          >
            Role: {myRole}
          </p>
        )}

        {/* Outcome Badge */}
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

        {/* Team Avatars */}
        {teamMembersCollection &&
          teamMembersCollection.items &&
          teamMembersCollection.items.length > 0 && (
            <div>
              <TeamAvatarStack members={teamMembersCollection.items} maxVisible={3} />
            </div>
          )}

        {/* Tags */}
        {displayTags && displayTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {displayTags.map(
              tag =>
                tag?.name && (
                  <span
                    key={tag.id}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tag.name}
                  </span>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};
