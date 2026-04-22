import { useContentfulInspectorMode } from '@contentful/live-preview/react';

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

interface HackathonsSectionProps {
  hackathons?: Array<HackathonFieldsFragment | null>;
  className?: string;
}

interface HackathonRowProps {
  hackathon: HackathonFieldsFragment;
  index: number;
}

const HackathonRow = ({ hackathon, index }: HackathonRowProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: hackathon.sys.id });
  const { name, oneLiner, outcome, showcaseUrl, demoUrl } = hackathon;

  const isClickable = !!(showcaseUrl || demoUrl);
  const url = showcaseUrl || demoUrl;

  const rowClassName = `group flex flex-col gap-3 border-b border-neutral-200/70 py-4 dark:border-zinc-800/70 md:flex-row md:items-center md:gap-6 ${
    isClickable ? 'cursor-pointer' : ''
  }`;

  const inner = (
    <>
      {/* Index + Name + Badge row */}
      <div className="flex items-center gap-3 md:gap-0">
        {/* Index */}
        <span className="w-6 flex-shrink-0 text-sm tabular-nums text-neutral-400 dark:text-zinc-600">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Name */}
        <h3
          className={`font-serif text-lg font-medium capitalize text-neutral-900 dark:text-zinc-100 md:w-40 md:flex-shrink-0 ${
            isClickable ? 'group-hover:underline' : ''
          }`}
          {...inspectorProps({ fieldId: 'name' })}
        >
          {name}
        </h3>

        {/* Outcome badge (mobile: next to name) */}
        {outcome && (
          <span
            className="ml-auto flex-shrink-0 rounded border border-neutral-300 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-neutral-600 dark:border-zinc-700 dark:text-zinc-400 md:ml-0 md:hidden"
            {...inspectorProps({ fieldId: 'outcome' })}
          >
            {outcome}
          </span>
        )}
      </div>

      {/* One-liner */}
      {oneLiner && (
        <p
          className="text-sm text-neutral-500 dark:text-zinc-400 md:flex-1"
          {...inspectorProps({ fieldId: 'oneLiner' })}
        >
          {oneLiner}
        </p>
      )}

      {/* Outcome badge (desktop: right side) */}
      {outcome && (
        <span
          className="hidden flex-shrink-0 rounded border border-neutral-300 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-neutral-600 dark:border-zinc-700 dark:text-zinc-400 md:inline-block"
          {...inspectorProps({ fieldId: 'outcome' })}
        >
          {outcome}
        </span>
      )}
    </>
  );

  if (isClickable) {
    return (
      <a href={url!} target="_blank" rel="noopener noreferrer" className={rowClassName}>
        {inner}
      </a>
    );
  }

  return <div className={rowClassName}>{inner}</div>;
};

export const HackathonsSection = ({ hackathons, className }: HackathonsSectionProps) => {
  if (!hackathons || hackathons.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {/* Top border */}
      <div className="border-t border-neutral-200/70 dark:border-zinc-800/70" />

      {hackathons.map(
        (hackathon, i) =>
          hackathon && <HackathonRow key={hackathon.sys.id} hackathon={hackathon} index={i} />,
      )}
    </div>
  );
};
