import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { ComponentImpactMetrics } from '@src/lib/__generated/sdk';

interface ArticleImpactMetricsProps {
  metrics: ComponentImpactMetrics;
}

// Renders text with **bold** markers as inline <strong> elements
function InlineBold({ text }: { text: string }) {
  const parts = text.split(/(__[^_]+__)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('__') && part.endsWith('__')) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export const ArticleImpactMetrics = ({ metrics }: ArticleImpactMetricsProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: metrics.sys.id });

  const metricsData = metrics.metricsCollection?.items?.filter(Boolean) || [];

  if (metricsData.length === 0) return null;

  return (
    <div {...inspectorProps({ fieldId: 'metricsCollection' })}>
      <div className="grid grid-cols-1 divide-y divide-white/10 rounded-2xl bg-[#111111] md:grid-cols-3 md:divide-x md:divide-y-0">
        {metricsData.map((metric, index) => (
          <div key={index} className="flex flex-col gap-3 px-8 py-8">
            <p className="text-xl font-bold leading-snug text-white">{metric.value}</p>
            {metric.label && (
              <p className="text-sm leading-relaxed text-zinc-400">
                <InlineBold text={metric.label} />
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
