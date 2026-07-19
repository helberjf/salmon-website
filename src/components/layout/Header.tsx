import { useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { company } from '@/data/company';
import { useScrolled } from '@/hooks/useScrolled';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export function Header() {
  const isScrolled = useScrolled(40);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = useMemo(() => navLinks.map((link) => link.sectionId), []);
  const activeSection = useScrollSpy(sectionIds);

  const solid = isScrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-navy/95 shadow-lg shadow-navy/20 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div aria-hidden="true" className="nordic-stripe h-0.5 w-full opacity-80" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <a
          href="#inicio"
          className="font-serif text-xl font-semibold tracking-tight text-white"
          aria-label={`${company.name} — voltar ao início`}
        >
          {company.name}
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.sectionId ? 'true' : undefined}
              className={`text-sm font-medium transition-colors hover:text-frost ${
                activeSection === link.sectionId
                  ? 'text-frost underline decoration-salmon decoration-2 underline-offset-8'
                  : 'text-white/85'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-frost"
          >
            Solicitar proposta
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-white lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="menu-mobile"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="menu-mobile"
          aria-label="Navegação principal (celular)"
          className="border-t border-white/10 bg-navy px-5 pb-6 pt-2 lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              aria-current={activeSection === link.sectionId ? 'true' : undefined}
              className="block border-b border-white/10 py-3.5 font-medium text-white transition-colors hover:text-frost"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setMobileOpen(false)}
            className="mt-5 block rounded-md bg-white px-4 py-3 text-center font-semibold text-navy"
          >
            Solicitar proposta
          </a>
        </nav>
      )}
    </header>
  );
}
