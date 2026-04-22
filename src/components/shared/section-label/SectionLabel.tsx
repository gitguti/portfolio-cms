import { twMerge } from 'tailwind-merge';

interface SectionLabelProps {
  number?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionLabel = ({ number, title, subtitle, className }: SectionLabelProps) => {
  return (
    <div className={twMerge('mb-6', className)}>
      <div className="flex items-baseline gap-2">
        {number && (
          <>
            <span className="font-mono text-xs font-medium tracking-widest text-neutral-400 dark:text-zinc-500">
              {number}
            </span>
            <span className="text-neutral-300 dark:text-zinc-700">—</span>
          </>
        )}
        <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-zinc-400">
          {title}
        </h2>
      </div>
    </div>
  );
};
