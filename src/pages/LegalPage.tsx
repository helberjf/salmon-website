import { useEffect } from 'react';
import { Link } from 'wouter';
import { BridgePointLogo } from '@/components/ui/BridgePointLogo';
import { ShoreLine } from '@/components/ui/ShoreLine';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { useI18n } from '@/i18n/I18nProvider';
import type { ReactNode } from 'react';

/** Data da versão vigente de Privacidade e Termos — atualizar a cada revisão. */

interface LegalPageProps {
  title: string;
  /** Data da última revisão do texto, por extenso em português (é traduzida). */
  updatedAt: string;
  children: ReactNode;
}

/** Layout compartilhado das páginas legais (Privacidade e Termos). */
export function LegalPage({ title, updatedAt, children }: LegalPageProps) {
  const { href: localizedHref, t } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-dvh bg-background">
      <header className="bg-navy">
        <ShoreLine thinOnMobile />
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-5 lg:px-0">
          {/* O logotipo é o caminho de volta ao site: sem um segundo botão "voltar". */}
          <Link
            href={localizedHref('/')}
            aria-label={t('Bridge Point — voltar ao início')}
            className="-my-1 block shrink-0 py-1"
          >
            <BridgePointLogo variant="white" eager height={32} />
          </Link>
          <LanguageSelector />
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-3xl px-5 py-14 lg:px-0">
        <h1 className="text-3xl font-light text-navy md:text-4xl">{title}</h1>
        <div className="mt-8 space-y-6 leading-relaxed text-muted [&_a]:font-medium [&_a]:text-ocean [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
          {children}
        </div>
        <p className="mt-12 border-t border-border pt-6 text-sm text-muted">
          {t('Última atualização: {date}.', { date: t(updatedAt) })}
        </p>
      </main>
    </div>
  );
}
