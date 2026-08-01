export interface NavLink {
  href: string;
  /** Preenchido só nas âncoras da home, para o destaque por scroll. */
  sectionId: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '/#empresa', sectionId: 'empresa', label: 'Quem somos' },
  { href: '/a-norwell', sectionId: '', label: 'A Norwell' },
  { href: '/produtos', sectionId: '', label: 'Produtos' },
  { href: '/#como-trabalhamos', sectionId: 'como-trabalhamos', label: 'Processo' },
  { href: '/sobre', sectionId: '', label: 'Sobre' },
];
