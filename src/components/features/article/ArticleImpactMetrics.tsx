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
    <div className="my-16" {...inspectorProps({ fieldId: 'metricsCollection' })}>
      <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
        {metricsData.map((metric, index) => (
          <div key={index} className="flex flex-1 flex-col items-center p-6 text-center">
            {/* Número prominente */}
            <div className="mb-3 font-serif text-5xl font-bold text-zinc-900 dark:text-zinc-100 md:text-6xl">
              {metric.value}
            </div>

            {/* Texto descriptivo */}
            <div className="text-base text-zinc-600 dark:text-zinc-400">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
