import { useEffect, type ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { BackToTop } from '@/components/layout/BackToTop';
import { GsapExperience } from '@/components/motion/GsapExperience';
import { useI18n } from '@/i18n/I18nProvider';

interface PageShellProps {
  /**
   * Frase-fonte do <title>. O I18nProvider só reavalia o título quando o idioma
   * muda, então cada página precisa aplicar o seu ao entrar — do contrário a
   * navegação client-side deixaria o título da página anterior.
   */
  titleSource: string;
  /** Volta ao topo ao abrir a página. Não usar na home, que recebe âncoras. */
  resetScroll?: boolean;
  mainClassName?: string;
  children: ReactNode;
}

export function PageShell({
  titleSource,
  resetScroll = false,
  mainClassName,
  children,
}: PageShellProps) {
  const { t } = useI18n();

  useEffect(() => {
    document.title = t(titleSource);
  }, [t, titleSource]);

  useEffect(() => {
    if (!resetScroll || window.location.hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [resetScroll]);

  return (
    <>
      <GsapExperience />
      <Header />
      <main id="main-content" tabIndex={-1} className={mainClassName}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
