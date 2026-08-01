import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { company } from '@/data/company';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { useI18n } from '@/i18n/I18nProvider';
import type { ReactNode } from 'react';

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

/** Layout compartilhado das páginas legais (Privacidade e Termos). */
export function LegalPage({ title, children }: LegalPageProps) {
  const { href: localizedHref, t } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-dvh bg-background">
      <header className="bg-navy">
        <div aria-hidden="true" className="nordic-stripe h-0.5 w-full opacity-80" />
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-5 lg:px-0">
          <Link href={localizedHref('/')} className="font-serif text-lg font-semibold text-white">
            {company.name}
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={localizedHref('/')}
              aria-label={t('Voltar ao site')}
              className="inline-flex items-center gap-2 text-sm font-medium text-frost transition-colors hover:text-white"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span className="hidden sm:inline">{t('Voltar ao site')}</span>
            </Link>
            <LanguageSelector />
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-3xl px-5 py-14 lg:px-0">
        <h1 className="font-serif text-3xl font-semibold text-navy md:text-4xl">{title}</h1>
        <div className="mt-8 space-y-6 leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
          {children}
        </div>
        <p className="mt-12 rounded-md bg-mist px-5 py-4 text-sm text-slate-blue">
          {t('Este documento é um modelo institucional básico e deve ser revisado e complementado pela empresa, preferencialmente com apoio jurídico, antes da publicação definitiva.')}
        </p>
      </main>
    </div>
  );
}
