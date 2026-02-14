import { Container } from '@src/components/shared/container';
import { HackathonsGrid } from './HackathonsGrid';
import { HackathonsMarquee } from './HackathonsMarquee';

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
  title?: string;
  subtitle?: string;
  className?: string;
}

export const HackathonsSection = ({
  hackathons,
  title = 'Hacks',
  subtitle = "I'm nerd 24/7",
  className,
}: HackathonsSectionProps) => {
  if (!hackathons || hackathons.length === 0) {
    return null;
  }

  return (
    <section className={`mx-auto w-full max-w-3xl pb-12 ${className || ''}`}>
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-light text-neutral-800 dark:text-zinc-100 lg:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-sm text-neutral-600 dark:text-zinc-300">{subtitle}</p>}
      </div>
      {/* Desktop: Marquee */}
      <div className="overflow-hidden">
        <HackathonsMarquee hackathons={hackathons} />
      </div>
    </section>
  );
};
