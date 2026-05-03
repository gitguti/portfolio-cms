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
            <span className="font-mono text-xs font-medium tracking-widest text-gray-400 dark:text-gray-500">
              {number}
            </span>
            <span className="text-gray-300 dark:text-gray-700">—</span>
          </>
        )}
        <h2 className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {title}
        </h2>
      </div>
    </div>
  );
};
