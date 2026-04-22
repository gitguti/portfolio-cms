import { useEffect, useState } from 'react';

export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const visibilityMap = new Map<string, number>();

    const pickMostVisible = () => {
      let topId: string | null = null;
      let topRatio = 0;

      // Prefer the section highest on page among those that are visible
      for (const id of ids) {
        const ratio = visibilityMap.get(id) ?? 0;
        if (ratio > 0 && ratio > topRatio) {
          topRatio = ratio;
          topId = id;
        }
      }

      // If nothing is visible, fall back to the topmost section that has been seen
      setActiveId(prev => topId ?? prev);
    };

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibilityMap.set(id, entry.intersectionRatio);
          pickMostVisible();
        },
        { threshold: [0, 0.1, 0.3, 0.5, 0.75, 1.0], rootMargin: '-10% 0px -10% 0px' },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach(o => o.disconnect());
    };
  }, [ids.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  return activeId;
}
