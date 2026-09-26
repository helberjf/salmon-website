export interface NavLink {
  href: string;
  /** Preenchido só nas âncoras da home, para o destaque por scroll. */
  sectionId: string;
  label: string;
}

/**
 * Cada item leva a um destino próprio: a origem (Norwell), o portfólio com o
 * processo, quem somos (Bridge Point e Mai) e o contato. O CTA "Solicitar
 * cotação" do cabeçalho também leva ao contato, mas com peso visual de botão.
 */
export const navLinks: NavLink[] = [
  { href: '/a-norwell', sectionId: '', label: 'Norwell' },
  { href: '/produtos', sectionId: '', label: 'Produtos' },
  { href: '/sobre', sectionId: '', label: 'Sobre' },
  { href: '/#contato', sectionId: 'contato', label: 'Contato' },
];

/** Rótulo único de todos os botões que levam ao formulário de contato. */
export const quoteCtaLabel = 'Solicitar cotação';
