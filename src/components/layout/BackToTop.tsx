import { ChevronUp } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';

export function BackToTop() {
  const visible = useScrolled(400);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Voltar ao topo"
      className="fixed bottom-5 left-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-navy/70 text-white shadow-md backdrop-blur transition-colors hover:bg-navy"
    >
      <ChevronUp size={20} aria-hidden="true" />
    </button>
  );
}
