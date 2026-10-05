import { lazy, Suspense, useEffect, useRef, useState, type Ref } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Hero } from '@/components/sections/Hero';
import { NorwellIntro } from '@/components/sections/NorwellIntro';
import { NorwellPartnership } from '@/components/sections/NorwellPartnership';
import { Products } from '@/components/sections/Products';
import { Representative } from '@/components/sections/Representative';
import { CallToAction } from '@/components/sections/CallToAction';

const ContactSection = lazy(() =>
  import('@/components/sections/ContactSection').then((module) => ({
    default: module.ContactSection,
  })),
);

/**
 * Home do site da Norwell no Brasil: a exportadora, o que ela oferece ao
 * comprador brasileiro, os produtos em destaque e, em um bloco curto, a
 * BridgePoint, sua representante no país. A profundidade vive nas páginas
 * internas — /sobre e /produtos.
 */
export default function Home() {
  return (
    <PageShell titleSource="Norwell Brasil | Salmão Norueguês B2B">
      <Hero />
      <NorwellIntro />
      <NorwellPartnership />
      {/* Dois destaques fecham uma linha inteira do grid; o resto vive em /produtos. */}
      <Products limit={2} hideSpecNote tone="ice" />
      <Representative />
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
      // Salto imediato: a rolagem suave desde o topo era interrompida quando o
      // GSAP recalculava a página, e a visita parava perto do topo.
      placeholderRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
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
