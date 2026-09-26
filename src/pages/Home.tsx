import { lazy, Suspense, useEffect, useRef, useState, type Ref } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Hero } from '@/components/sections/Hero';
import { Pathways } from '@/components/sections/Pathways';
import { Products } from '@/components/sections/Products';
import { CallToAction } from '@/components/sections/CallToAction';

const ContactSection = lazy(() =>
  import('@/components/sections/ContactSection').then((module) => ({
    default: module.ContactSection,
  })),
);

/**
 * Home enxuta: apresenta a proposta e leva à conversão. A profundidade vive nas
 * páginas internas, cada uma com um assunto — /a-norwell (origem, valores,
 * certificações), /produtos (portfólio, processo, públicos) e /sobre (Bridge
 * Point e a fundadora). Os atalhos de Pathways levam a elas sem repetir conteúdo.
 */
export default function Home() {
  return (
    <PageShell titleSource="Bridge Point | Salmão Norueguês B2B no Brasil">
      <Hero />
      <Pathways />
      {/* Dois destaques fecham uma linha inteira do grid; o resto vive em /produtos. */}
      <Products limit={2} hideSpecNote tone="ice" />
      <CallToAction />
      <DeferredContactSection />
    </PageShell>
  );
}

function ContactPlaceholder({ sectionRef }: { sectionRef?: Ref<HTMLElement> }) {
  return (
    <section
      ref={sectionRef}
      id="contato"
      aria-hidden="true"
      className="min-h-96 bg-background"
    />
  );
}

function DeferredContactSection() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const placeholderRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldLoad) return;

    if (window.location.hash === '#contato') {
      placeholderRef.current?.scrollIntoView();
      setShouldLoad(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '800px 0px' },
    );
    const accessibilityFallback = window.setTimeout(() => setShouldLoad(true), 8_000);

    if (placeholderRef.current) observer.observe(placeholderRef.current);
    return () => {
      observer.disconnect();
      window.clearTimeout(accessibilityFallback);
    };
  }, [shouldLoad]);

  if (!shouldLoad) return <ContactPlaceholder sectionRef={placeholderRef} />;

  return (
    <Suspense fallback={<ContactPlaceholder />}>
      <ContactSection />
    </Suspense>
  );
}
