'use client';

import { DropdownDemo } from './demos/DropdownDemo';

// Registry — add new demos here as you build them
const DEMO_REGISTRY: Record<string, React.ComponentType> = {
  dropdown: DropdownDemo,
};

interface ArticlePatternDemoProps {
  demo?: {
    variant?: string | null; // reuses the existing Contentful field as the demo type key
  };
}

export function ArticlePatternDemo({ demo }: ArticlePatternDemoProps) {
  const type = demo?.variant ?? 'dropdown';
  const Demo = DEMO_REGISTRY[type];
  if (!Demo) return null;
  return <Demo />;
}
