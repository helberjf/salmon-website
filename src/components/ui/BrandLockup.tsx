import { BridgePointLogo } from '@/components/ui/BridgePointLogo';
import { NorwellLogo } from '@/components/ui/NorwellLogo';

interface BrandLockupProps {
  /** Versão compacta, usada quando o cabeçalho encolhe ao rolar a página. */
  compact?: boolean;
}

/**
 * Assinatura do site: o logotipo da Norwell como marca principal e, ao lado, o
 * da Bridge Point, sua representante no Brasil. Só sobre sjøgrønn sólido
 * (`bg-navy`), como o manual da Norwell exige para o logotipo em negativo; o
 * espaço até o fio divisor respeita a área livre de meio símbolo.
 */
export function BrandLockup({ compact = false }: BrandLockupProps) {
  return (
    <span className={`flex items-center ${compact ? 'gap-3.5' : 'gap-3.5 sm:gap-4 xl:gap-6'}`}>
      <NorwellLogo
        variant="negative"
        eager
        heightFromClass
        height={48}
        className={`shrink-0 transition-[height] duration-300 ${compact ? 'h-7 sm:h-8' : 'h-7 sm:h-9 xl:h-12'}`}
      />
      <span
        aria-hidden="true"
        className={`w-px shrink-0 bg-white/25 transition-[height] duration-300 ${compact ? 'h-6' : 'h-6 sm:h-7 xl:h-9'}`}
      />
      <BridgePointLogo
        variant="white"
        eager
        heightFromClass
        height={28}
        className={`shrink-0 transition-[height] duration-300 ${compact ? 'h-[1.125rem] sm:h-6' : 'h-[1.125rem] sm:h-6 xl:h-8'}`}
      />
    </span>
  );
}
