export interface NavLink {
  href: string;
  /** Preenchido só nas âncoras da home, para o destaque por scroll. */
  sectionId: string;
  label: string;
}

/**
 * Cada item leva a um destino próprio: o início, a origem (Norwell), o
 * portfólio com o processo, quem somos (Bridge Point e Mai) e o contato. O
 * "Início" repete o link do logotipo de propósito — é o que o comprador procura
 * primeiro. O CTA "Solicitar cotação" também leva ao contato, com peso de botão.
 */
export const navLinks: NavLink[] = [
  { href: '/#inicio', sectionId: 'inicio', label: 'Início' },
  { href: '/a-norwell', sectionId: '', label: 'Norwell' },
  { href: '/produtos', sectionId: '', label: 'Produtos' },
  { href: '/sobre', sectionId: '', label: 'Sobre' },
  { href: '/#contato', sectionId: 'contato', label: 'Contato' },
];

/** Rótulo único de todos os botões que levam ao formulário de contato. */
export const quoteCtaLabel = 'Solicitar cotação';
