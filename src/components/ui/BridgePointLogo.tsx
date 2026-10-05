/**
 * Logotipo oficial da BridgePoint International, vetorizado a partir do
 * manual de marca ("Branding BP 05"): bússola dourada + nome em azul-marinho.
 *
 * `white` é a versão invertida do manual (nome em branco, bússola dourada),
 * usada no cabeçalho e no rodapé, que ficam sobre o verde escuro.
 */
const LOGO = {
  horizontal: { ratio: 738.08 / 145.12, color: 'bridgepoint-horizontal', white: 'bridgepoint-horizontal-white' },
  vertical: { ratio: 330.13 / 414.18, color: 'bridgepoint-vertical', white: 'bridgepoint-vertical-white' },
} as const;

interface BridgePointLogoProps {
  variant?: 'color' | 'white';
  layout?: keyof typeof LOGO;
  /** Altura renderizada em pixels — a largura acompanha a proporção do arquivo. */
  height?: number;
  className?: string;
  /** Imagens acima da dobra (cabeçalho) não devem ser carregadas sob demanda. */
  eager?: boolean;
  /**
   * A altura vem das classes em `className` (para animar entre tamanhos);
   * `height` passa a servir só para a proporção dos atributos da imagem.
   */
  heightFromClass?: boolean;
}

export function BridgePointLogo({
  variant = 'color',
  layout = 'horizontal',
  height = 36,
  className = '',
  eager = false,
  heightFromClass = false,
}: BridgePointLogoProps) {
  const logo = LOGO[layout];

  return (
    <img
      src={`/brand/${variant === 'white' ? logo.white : logo.color}.svg`}
      alt="BridgePoint International"
      width={Math.round(logo.ratio * height)}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`w-auto max-w-full object-contain object-left ${className}`}
      style={heightFromClass ? undefined : { height }}
    />
  );
}
