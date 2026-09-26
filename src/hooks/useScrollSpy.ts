import { useEffect, useState } from 'react';

/**
 * Retorna o id da seção que cruza a linha de leitura (35% da altura da tela),
 * para destacar o item ativo na navegação. Quando nenhuma das seções está na
 * linha — no meio da home, entre o topo e o contato — retorna ''.
 *
 * As seções são buscadas por id a cada verificação porque o #contato da home
 * troca o placeholder pela seção real depois do carregamento sob demanda.
 */
export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (sectionIds.length === 0) return undefined;
    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;
      const readingLine = window.innerHeight * 0.35;
      const current =
        sectionIds.find((id) => {
          const rect = document.getElementById(id)?.getBoundingClientRect();
          return rect ? rect.top <= readingLine && rect.bottom > readingLine : false;
        }) ?? '';
      setActiveId((previous) => (previous === current ? previous : current));
    };
    const schedule = () => {
      if (animationFrame === 0) animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
    };
  }, [sectionIds]);

  return activeId;
}
