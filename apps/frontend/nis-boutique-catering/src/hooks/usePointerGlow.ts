import { useEffect } from 'react';

export const usePointerGlow = (): void => {
  useEffect(() => {
    let rafId = 0;
    let nextX = '50%';
    let nextY = '50%';

    const flushPointerPosition = () => {
      document.documentElement.style.setProperty('--pointer-x', nextX);
      document.documentElement.style.setProperty('--pointer-y', nextY);
      rafId = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      nextX = `${(event.clientX / window.innerWidth) * 100}%`;
      nextY = `${(event.clientY / window.innerHeight) * 100}%`;

      if (rafId !== 0) {
        return;
      }

      rafId = window.requestAnimationFrame(flushPointerPosition);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);

      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);
};
