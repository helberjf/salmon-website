export interface NavLink {
  href: string;
  sectionId: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '#inicio', sectionId: 'inicio', label: 'Início' },
  { href: '#empresa', sectionId: 'empresa', label: 'Empresa' },
  { href: '#salmao', sectionId: 'salmao', label: 'Salmão Norueguês' },
  { href: '#como-trabalhamos', sectionId: 'como-trabalhamos', label: 'Como Trabalhamos' },
  { href: '#fundadora', sectionId: 'fundadora', label: 'Fundadora' },
  { href: '#diferenciais', sectionId: 'diferenciais', label: 'Diferenciais' },
  { href: '#contato', sectionId: 'contato', label: 'Contato' },
];
