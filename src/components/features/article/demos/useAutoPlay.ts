import { useEffect, useRef } from 'react';

/**
 * Runs `script` once on mount. Passes a `cancelled` getter so async steps
 * can bail early on unmount. Calls `onDone` when the script resolves.
 *
 * The script receives stable refs — it never re-runs because its deps changed.
 */
export function useAutoPlay(
  script: (isCancelled: () => boolean) => Promise<void>,
  onDone: () => void,
) {
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const scriptRef = useRef(script);
  useEffect(() => {
    scriptRef.current = script;
  }, [script]);

  useEffect(() => {
    let cancelled = false;
    scriptRef
      .current(() => cancelled)
      .then(() => {
        if (!cancelled) onDoneRef.current();
      });
    return () => {
      cancelled = true;
    };
  }, []);
}
