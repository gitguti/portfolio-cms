'use client';

import { ButtonStateDemo } from './demos/ButtonStateDemo';
import { ChatDemo } from './demos/ChatDemo';
import { DropdownDemo } from './demos/DropdownDemo';
import { OptimisticDemo } from './demos/OptimisticDemo';
import { PaginationDemo } from './demos/PaginationDemo';
import { SuggestionComparisonDemo } from './demos/SuggestionComparisonDemo';
import { SuggestionIterationDemo } from './demos/SuggestionIterationDemo';
import { ValidationBentoDemo } from './demos/ValidationBentoDemo';

// Registry — add new demos here as you build them
const DEMO_REGISTRY: Record<string, React.ComponentType> = {
  dropdown: DropdownDemo,
  buttonState: ButtonStateDemo,
  pagination: PaginationDemo,
  optimistic: OptimisticDemo,
  chat: ChatDemo,
  suggestionIteration: SuggestionIterationDemo,
  suggestionComparison: SuggestionComparisonDemo,
  validationBento: ValidationBentoDemo,
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
