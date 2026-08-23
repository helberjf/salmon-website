import { useEffect } from 'react';

type IdleCapableWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

type DataSavingNavigator = Navigator & {
  connection?: { saveData?: boolean };
};

/**
 * Coreografia progressiva para elementos editoriais.
 *
 * O GSAP fica em um chunk separado e só é baixado depois do primeiro paint.
 * Movimento reduzido e economia de dados desativam a experiência por completo.
 */
export function GsapExperience() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const savesData = (navigator as DataSavingNavigator).connection?.saveData === true;
    if (prefersReducedMotion || savesData) return;
    if (!document.querySelector('[data-gsap-parallax], [data-gsap-drift], [data-gsap-progress]')) {
      return;
    }

    const idleWindow = window as IdleCapableWindow;
    let cancelled = false;
    let timeoutId: number | undefined;
    let idleId: number | undefined;
    let revert: (() => void) | undefined;

    const start = async () => {
      let modules: [typeof import('gsap'), typeof import('gsap/ScrollTrigger')];
      try {
        modules = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      } catch {
        // Motion is an enhancement; the page remains fully usable if its chunk fails.
        return;
      }

      const [{ gsap }, { ScrollTrigger }] = modules;
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-gsap-parallax]').forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: -3, scale: 1.035 },
            {
              yPercent: 3,
              scale: 1.075,
              ease: 'none',
              scrollTrigger: {
                trigger: element.parentElement ?? element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-gsap-drift]').forEach((element, index) => {
          gsap.fromTo(
            element,
            { y: index % 2 === 0 ? 10 : -10 },
            {
              y: index % 2 === 0 ? -10 : 10,
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.15,
              },
            },
          );
        });

        const progress = document.querySelector<HTMLElement>('[data-gsap-progress]');
        if (progress) {
          gsap.fromTo(
            progress,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: progress,
                start: 'top 82%',
                end: 'bottom 38%',
                scrub: 0.7,
              },
            },
          );
        }
      }, document.body);

      ScrollTrigger.refresh();
      revert = () => context.revert();
    };

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(() => void start(), { timeout: 1_200 });
    } else {
      timeoutId = window.setTimeout(() => void start(), 180);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      revert?.();
    };
  }, []);

  return null;
}
