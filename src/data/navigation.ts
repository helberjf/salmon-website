export interface NavLink {
  href: string;
  /** Preenchido só nas âncoras da home, para o destaque por scroll. */
  sectionId: string;
  label: string;
}

/**
 * Cada item leva a um destino próprio: o início, a Norwell (com um bloco curto
 * sobre a Bridge Point, sua representante), o portfólio com o processo e o
 * contato. O "Início" repete o link do logotipo de propósito — é o que o
 * comprador procura primeiro. O CTA "Solicitar cotação" também leva ao contato,
 * com peso de botão.
 */
export const navLinks: NavLink[] = [
  { href: '/#inicio', sectionId: 'inicio', label: 'Início' },
  { href: '/sobre', sectionId: '', label: 'Sobre' },
  { href: '/produtos', sectionId: '', label: 'Produtos' },
  { href: '/#contato', sectionId: 'contato', label: 'Contato' },
];

/** Rótulo único de todos os botões que levam ao formulário de contato. */
export const quoteCtaLabel = 'Solicitar cotação';
