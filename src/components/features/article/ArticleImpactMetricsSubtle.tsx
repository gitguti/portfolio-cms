import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { ComponentImpactMetrics } from '@src/lib/__generated/sdk';

interface ArticleImpactMetricsSubtleProps {
  metrics: ComponentImpactMetrics;
}

function InlineBold({ text }: { text: string }) {
  const parts = text.split(/(__[^_]+__)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('__') && part.endsWith('__')) {
          return (
            <strong key={i} className="font-semibold text-zinc-900 dark:text-zinc-100">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export const ArticleImpactMetricsSubtle = ({ metrics }: ArticleImpactMetricsSubtleProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: metrics.sys.id });

  const metricsData = metrics.metricsCollection?.items?.filter(Boolean) || [];

  if (metricsData.length === 0) return null;

  return (
    <div {...inspectorProps({ fieldId: 'metricsCollection' })}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-xl bg-zinc-100 px-6 py-5 dark:bg-zinc-800/60"
          >
            <p className="text-3xl font-semibold leading-none tracking-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
              {metric.value}
            </p>
            {metric.label && (
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                <InlineBold text={metric.label} />
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
