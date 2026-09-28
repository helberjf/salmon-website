/**
 * "Fjærestreken" do manual da Norwell (p. 13–14): a linha fjæregrønn que liga
 * uma imagem ao bloco de informação e sempre vai de borda a borda. Na web tem
 * 4px; no menu do celular, 2px. O manual também permite girá-la 90°.
 */
interface ShoreLineProps {
  /** Menu do celular: 2px até o breakpoint do menu completo. */
  thinOnMobile?: boolean;
  /** Vertical a partir de `sm`, para cartões que passam a ter imagem ao lado do texto. */
  verticalFromSm?: boolean;
  className?: string;
}

export function ShoreLine({ thinOnMobile = false, verticalFromSm = false, className = '' }: ShoreLineProps) {
  const size = thinOnMobile
    ? 'h-0.5 w-full xl:h-1'
    : verticalFromSm
      ? 'h-1 w-full sm:h-auto sm:w-1'
      : 'h-1 w-full';

  return <div aria-hidden="true" className={`shrink-0 bg-shore ${size} ${className}`} />;
}
