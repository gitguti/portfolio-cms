import { useContentfulInspectorMode } from '@contentful/live-preview/react';

interface CaseStudyDetailsProps {
  role?: string | null;
  team?: string | null;
  timeframe?: string | null;
  entryId: string;
}

export const CaseStudyDetails = ({ role, team, timeframe, entryId }: CaseStudyDetailsProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId });

  if (!role && !team && !timeframe) {
    return null;
  }

  return (
    <dl className="mb-4 flex flex-col gap-4" {...inspectorProps({ fieldId: 'caseStudyDetails' })}>
      {role && (
        <div>
          <dt className="mb-1.5 text-xs font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Role
          </dt>
          <dd className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{role}</dd>
        </div>
      )}

      {team && (
        <div>
          <dt className="mb-1.5 text-xs font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Team
          </dt>
          <dd className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{team}</dd>
        </div>
      )}

      {timeframe && (
        <div>
          <dt className="mb-1.5 text-xs font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Timeframe
          </dt>
          <dd className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{timeframe}</dd>
        </div>
      )}
    </dl>
  );
};
