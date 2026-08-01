import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

/** Move o foco para o conteúdo após navegações internas do cliente. */
export function RouteFocusManager() {
  const [location] = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    let observer: MutationObserver | undefined;
    const focusMain = () => {
      const main = document.getElementById('main-content');
      if (!main) return false;
      main.focus({ preventScroll: true });
      return true;
    };

    const animationFrame = window.requestAnimationFrame(() => {
      if (focusMain()) return;

      observer = new MutationObserver(() => {
        if (focusMain()) observer?.disconnect();
      });
      observer.observe(document.getElementById('root') ?? document.body, {
        childList: true,
        subtree: true,
      });
    });
    const observerTimeout = window.setTimeout(() => observer?.disconnect(), 5000);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(observerTimeout);
      observer?.disconnect();
    };
  }, [location]);

  return null;
}
