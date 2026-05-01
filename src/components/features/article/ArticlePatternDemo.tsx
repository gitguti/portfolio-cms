'use client';

import { ButtonStateDemo } from './demos/ButtonStateDemo';
import { DropdownDemo } from './demos/DropdownDemo';
import { OptimisticDemo } from './demos/OptimisticDemo';
import { PaginationDemo } from './demos/PaginationDemo';

// Registry — add new demos here as you build them
const DEMO_REGISTRY: Record<string, React.ComponentType> = {
  dropdown: DropdownDemo,
  buttonState: ButtonStateDemo,
  pagination: PaginationDemo,
  optimistic: OptimisticDemo,
};

interface ArticlePatternDemoProps {
  demo?: {
    variant?: string | null; // reuses the existing Contentful field as the demo type key
  };
}

export function ArticlePatternDemo({ demo }: ArticlePatternDemoProps) {
  const type = demo?.variant ?? 'dropdown';
  const Demo = DEMO_REGISTRY[type] ?? DEMO_REGISTRY['dropdown'];
  if (!Demo) return null;
  return <Demo />;
}
