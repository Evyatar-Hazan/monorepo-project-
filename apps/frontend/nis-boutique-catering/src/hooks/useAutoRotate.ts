import { useEffect } from 'react';

export const useAutoRotate = (
  itemCount: number,
  delayMs: number,
  onAdvance: () => void,
): void => {
  useEffect(() => {
    if (itemCount < 2) {
      return undefined;
    }

    const timer = window.setInterval(onAdvance, delayMs);

    return () => window.clearInterval(timer);
  }, [delayMs, itemCount, onAdvance]);
};
