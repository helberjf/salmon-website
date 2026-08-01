/**
 * Logotipo institucional da Norwell AS (norwell.no), exportadora norueguesa
 * representada no Brasil pela fundadora.
 *
 * O arquivo original é verde-petróleo e só funciona sobre fundos claros; a
 * variante `white` é a versão monocromática usada em superfícies escuras.
 */
interface NorwellLogoProps {
  variant?: 'color' | 'white';
  /** Altura renderizada em pixels — a largura acompanha a proporção 325×76. */
  height?: number;
  className?: string;
}

export function NorwellLogo({ variant = 'color', height = 28, className = '' }: NorwellLogoProps) {
  return (
    <img
      src={variant === 'white' ? '/brand/norwell-white.svg' : '/brand/norwell.svg'}
      alt="Norwell AS"
      width={Math.round((325 / 76) * height)}
      height={height}
      loading="lazy"
      decoding="async"
      className={`w-auto ${className}`}
      style={{ height }}
    />
  );
}
