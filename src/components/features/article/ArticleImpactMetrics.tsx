import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { ComponentImpactMetrics } from '@src/lib/__generated/sdk';

interface ArticleImpactMetricsProps {
  metrics: ComponentImpactMetrics;
}

export const ArticleImpactMetrics = ({ metrics }: ArticleImpactMetricsProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: metrics.sys.id });

  const metricsData = metrics.metricsCollection?.items?.filter(Boolean) || [];

  if (metricsData.length === 0) return null;

  return (
    <div className="" {...inspectorProps({ fieldId: 'metricsCollection' })}>
      <div className="flex w-full flex-col md:flex-row">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className="border-r border-black/[0.08] px-6 py-4 last:border-r-0 dark:border-white/10"
          >
            <div className="mb-2 pb-2 text-4xl font-bold leading-none text-zinc-900 dark:text-zinc-100">
              {metric.value}
            </div>
            <div className="text-base text-zinc-500 dark:text-zinc-400">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
