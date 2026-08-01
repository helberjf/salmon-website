import { Link } from 'wouter';
import { company } from '@/data/company';
import { useI18n } from '@/i18n/I18nProvider';

export default function NotFound() {
  const { href: localizedHref, t } = useI18n();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-dvh flex-col items-center justify-center bg-navy px-5 text-center text-white"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-frost">{t('Erro 404')}</p>
      <h1 className="mt-4 font-serif text-4xl font-semibold">{t('Página não encontrada')}</h1>
      <p className="mt-4 max-w-md text-frost/80">
        {t('O endereço acessado não existe ou foi movido. Volte para a página inicial da {company}.', { company: company.name })}
      </p>
      <Link
        href={localizedHref('/')}
        className="mt-8 rounded-md bg-white px-6 py-3 font-semibold text-navy transition-colors hover:bg-frost"
      >
        {t('Ir para o início')}
      </Link>
    </main>
  );
}
