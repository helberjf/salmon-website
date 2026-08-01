/**
 * Selo de origem "Seafood from Norway" — marca oficial do setor pesqueiro
 * norueguês, exibida também pela Norwell AS (norwell.no).
 *
 * O arquivo SVG é monocromático (traço branco + faixa da bandeira norueguesa)
 * e foi desenhado para aparecer sobre o fundo verde-petróleo institucional,
 * por isso o quadrado colorido faz parte do componente.
 */
interface SeafoodFromNorwayProps {
  /** Lado do selo em pixels. */
  size?: number;
  className?: string;
}

export function SeafoodFromNorway({ size = 96, className = '' }: SeafoodFromNorwayProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center bg-norwell ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/brand/seafood-from-norway.svg"
        alt="Seafood from Norway"
        loading="lazy"
        decoding="async"
        className="h-[86%] w-[86%]"
      />
    </span>
  );
}
