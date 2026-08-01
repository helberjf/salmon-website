import { Link } from 'wouter';
import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { company } from '@/data/company';
import { navLinks } from '@/data/navigation';
import { norwell } from '@/data/norwell';
import { BrandMark } from '@/components/ui/BrandMark';
import { SeafoodFromNorway } from '@/components/ui/SeafoodFromNorway';
import { NorwellLogo } from '@/components/ui/NorwellLogo';
import { useI18n } from '@/i18n/I18nProvider';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { href: localizedHref, t } = useI18n();

  return (
    <footer className="bg-navy-dark text-frost">
      <div aria-hidden="true" className="nordic-stripe h-0.5 w-full opacity-60" />
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandMark inverse />
            <p className="mt-4 text-sm leading-relaxed text-frost/80">{t(company.description)}</p>
            {(company.instagram || company.linkedin) && (
              <div className="mt-6 flex gap-3">
                {company.instagram && (
                  <a
                    href={company.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/15"
                  >
                    <Instagram size={18} aria-hidden="true" />
                  </a>
                )}
                {company.linkedin && (
                  <a
                    href={company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/15"
                  >
                    <Linkedin size={18} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>

          <nav aria-label={t('Links do rodapé')}>
            <h2 className="font-serif text-base font-semibold text-white">{t('Navegação')}</h2>
            <ul className="mt-4 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {/* py generoso: no celular estes links tinham 18px de altura. */}
                  <a
                    href={localizedHref(link.href)}
                    className="inline-block py-2 transition-colors hover:text-white"
                  >
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-serif text-base font-semibold text-white">{t('Contato')}</h2>
            <ul className="mt-5 space-y-3.5 text-sm">
              {company.email && (
                <li className="flex items-start gap-3">
                  <Mail size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-salmon" />
                  <a
                    href={`mailto:${company.email}`}
                    className="inline-block break-all py-1 hover:text-white"
                  >
                    {company.email}
                  </a>
                </li>
              )}
              {company.phone && (
                <li className="flex items-start gap-3">
                  <Phone size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-salmon" />
                  <span>{company.phone}</span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-salmon" />
                <span>
                  {company.address && (
                    <>
                      {company.address}
                      <br />
                    </>
                  )}
                  {company.city} — {company.state}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-base font-semibold text-white">{t('Atendimento')}</h2>
            <p className="mt-5 text-sm leading-relaxed text-frost/80">{t(company.serviceArea)}</p>
            <a
              href={norwell.site}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block w-fit rounded-lg py-1 opacity-90 transition-opacity hover:opacity-100"
            >
              <span className="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-frost/60">
                {t('Parceiro exportador')}
              </span>
              <NorwellLogo variant="white" height={26} className="mt-2.5" />
            </a>
            <div className="mt-6 flex items-center gap-3">
              <SeafoodFromNorway size={54} className="rounded-md" />
              <p className="text-xs leading-relaxed text-frost/60">
                {t('Selo de origem do setor pesqueiro norueguês, exibido pela Norwell AS.')}
              </p>
            </div>
            <a
              href={localizedHref('/#contato')}
              className="mt-6 inline-block rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white hover:text-navy"
            >
              {t('Falar com a equipe')}
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-7 text-xs text-frost/60">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p>
              © {currentYear} {company.legalName || company.name}.
              {company.cnpj && ` CNPJ ${company.cnpj}.`} {t('Todos os direitos reservados.')}
            </p>
            <div className="flex gap-5">
              <Link
                href={localizedHref('/privacidade')}
                className="inline-block py-1.5 transition-colors hover:text-white"
              >
                {t('Política de Privacidade')}
              </Link>
              <Link
                href={localizedHref('/termos')}
                className="inline-block py-1.5 transition-colors hover:text-white"
              >
                {t('Termos de Uso')}
              </Link>
            </div>
          </div>
          <p className="mt-4">
            {t(
              'A disponibilidade, os formatos, os volumes e as condições comerciais dos produtos devem ser confirmados diretamente com a empresa.',
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
