import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import type { Argument } from '@contentful/live-preview/dist/types';

/**
 * Conditionally applies Contentful live updates only in preview mode.
 * Skips the hook entirely in production to eliminate client-side re-fetching.
 *
 * @param data - The data from getStaticProps
 * @param previewActive - Whether preview mode is active
 * @returns The data, potentially updated if in preview mode
 */
export function useConditionalLiveUpdates<T extends Argument | null | undefined>(
  data: T,
  previewActive: boolean,
): T {
  // Skip the hook entirely if not in preview mode to avoid any overhead
  if (!previewActive) {
    return data;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContentfulLiveUpdates(data) as T;
}
