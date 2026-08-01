import { lazy, Suspense } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Products } from '@/components/sections/Products';
import { Audiences } from '@/components/sections/Audiences';
import { Process } from '@/components/sections/Process';
import { Founder } from '@/components/sections/Founder';
import { CallToAction } from '@/components/sections/CallToAction';

const ContactSection = lazy(() =>
  import('@/components/sections/ContactSection').then((module) => ({
    default: module.ContactSection,
  })),
);

/**
 * Home enxuta: apresenta a proposta e leva à conversão. A profundidade vive nas
 * páginas internas — /a-norwell (origem, valores, certificações), /produtos
 * (portfólio completo, diferenciais, confiança) e /sobre (a fundadora).
 */
export default function Home() {
  return (
    <PageShell titleSource="Nordic Salmon | Salmão Norueguês B2B no Brasil">
      <Hero />
      <About />
      {/* Dois destaques fecham uma linha inteira do grid; o resto vive em /produtos. */}
      <Products limit={2} hideSpecNote />
      <Audiences />
      <Process />
      <Founder />
      <CallToAction />
      <Suspense
        fallback={<section id="contato" aria-hidden="true" className="min-h-96 bg-background" />}
      >
        <ContactSection />
      </Suspense>
    </PageShell>
  );
}
