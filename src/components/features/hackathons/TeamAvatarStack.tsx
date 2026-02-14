import { HTMLProps } from 'react';
import { CtfImage } from '@src/components/features/contentful';

// Temporary type - will be replaced by generated HackathonFieldsFragment once Contentful is set up
type TeamMemberFieldsFragment = {
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
};

interface TeamAvatarStackProps extends HTMLProps<HTMLDivElement> {
  members?: Array<TeamMemberFieldsFragment | null>;
  maxVisible?: number;
}

export const TeamAvatarStack = ({ members, maxVisible = 3, className }: TeamAvatarStackProps) => {
  if (!members || members.length === 0) {
    return null;
  }

  const visibleMembers = members.slice(0, maxVisible);
  const remainingCount = members.length - maxVisible;

  const getInitials = (name?: string | null) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className={`flex items-center ${className || ''}`}>
      <div className="flex -space-x-2">
        {visibleMembers.map((member, index) => (
          <div
            key={member?.sys.id || index}
            className="relative inline-block h-8 w-8 overflow-hidden rounded-full border-2 border-white dark:border-zinc-900"
            title={member?.name || undefined}
          >
            {member?.photo?.url ? (
              <CtfImage
                nextImageProps={{
                  className: 'object-cover w-full h-full',
                  style: { width: '100%', height: '100%' },
                }}
                {...member.photo}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-medium text-gray-600 dark:bg-zinc-700 dark:text-zinc-300">
                {getInitials(member?.name)}
              </div>
            )}
          </div>
        ))}
      </div>
      {remainingCount > 0 && (
        <span className="ml-2 text-xs text-neutral-600 dark:text-zinc-400">
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};
