/**
 * Logotipo institucional da Norwell AS (norwell.no), exportadora norueguesa
 * representada no Brasil pela fundadora. Os SVGs foram extraídos do manual de
 * perfil da Norwell (Profilmanual 2016, p. 3–4) com as cores RGB oficiais.
 *
 * O manual só permite o logotipo colorido sobre branco (`color`) ou, em
 * negativo, sobre sjøgrønn (`negative`, fundo `bg-navy`). Nunca sobre outras
 * cores nem sobre fotografias.
 *
 * `side` é o "sidestilt logo" (símbolo ao lado do nome), para formatos baixos;
 * `main` é o logotipo principal (símbolo sobre o nome), preferido quando cabe.
 */
const LOGO = {
  side: { ratio: 708.21 / 201.17, color: 'norwell', negative: 'norwell-negative' },
  main: { ratio: 381.49 / 414.82, color: null, negative: 'norwell-main-negative' },
} as const;

type NorwellLogoProps =
  | { layout?: 'side'; variant?: 'color' | 'negative'; height?: number; className?: string }
  | { layout: 'main'; variant: 'negative'; height?: number; className?: string };

export function NorwellLogo({
  layout = 'side',
  variant = 'color',
  height = 28,
  className = '',
}: NorwellLogoProps) {
  const logo = LOGO[layout];
  const file = variant === 'negative' ? logo.negative : logo.color;

  return (
    <img
      src={`/brand/${file}.svg`}
      alt="Norwell AS"
      width={Math.round(logo.ratio * height)}
      height={height}
      loading="lazy"
      decoding="async"
      className={`w-auto ${className}`}
      style={{ height }}
    />
  );
}
