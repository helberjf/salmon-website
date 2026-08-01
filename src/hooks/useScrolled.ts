import { useEffect, useState } from 'react';

/** Retorna true quando a página já rolou além do limite informado (px). */
export function useScrolled(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(() =>
    typeof window === 'undefined' ? false : window.scrollY > threshold,
  );

  useEffect(() => {
    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;
      const nextValue = window.scrollY > threshold;
      setScrolled((currentValue) => (currentValue === nextValue ? currentValue : nextValue));
    };
    const onScroll = () => {
      if (animationFrame === 0) animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
    };
  }, [threshold]);

  return scrolled;
}
