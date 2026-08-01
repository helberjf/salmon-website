import { useMemo, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { BrandMark } from '@/components/ui/BrandMark';

export function Header() {
  const isScrolled = useScrolled(40);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = useMemo(() => navLinks.map((link) => link.sectionId), []);
  const activeSection = useScrollSpy(sectionIds);

  const solid = isScrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-navy/95 shadow-xl shadow-navy-dark/15 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div aria-hidden="true" className="nordic-stripe h-[3px] w-full" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#inicio" aria-label="Nordic Salmon — voltar ao início">
          <BrandMark inverse />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.sectionId ? 'true' : undefined}
              className={`text-[0.82rem] font-semibold transition-colors hover:text-white ${
                activeSection === link.sectionId
                  ? 'text-white underline decoration-salmon decoration-2 underline-offset-8'
                  : 'text-white/70'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost"
          >
            Cotação B2B
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 rounded-full border border-white/15 p-2.5 text-white lg:hidden"
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
          className="border-t border-white/10 bg-navy px-5 pb-6 pt-2 shadow-2xl lg:hidden"
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
            className="mt-5 block rounded-full bg-white px-4 py-3 text-center font-bold text-navy"
          >
            Solicitar cotação B2B
          </a>
        </nav>
      )}
    </header>
  );
}
