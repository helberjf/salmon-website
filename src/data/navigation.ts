export interface NavLink {
  href: string;
  sectionId: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '#empresa', sectionId: 'empresa', label: 'Quem somos' },
  { href: '#salmao', sectionId: 'salmao', label: 'Origem' },
  { href: '#produtos', sectionId: 'produtos', label: 'Produtos' },
  { href: '#galeria', sectionId: 'galeria', label: 'Galeria' },
  { href: '#como-trabalhamos', sectionId: 'como-trabalhamos', label: 'Processo' },
  { href: '#fundadora', sectionId: 'fundadora', label: 'Mai Tonheim' },
];
