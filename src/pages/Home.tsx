import { lazy, Suspense, useEffect, useRef, useState, type Ref } from 'react';
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
    <PageShell titleSource="Bridge Point | Salmão Norueguês B2B no Brasil">
      <Hero />
      <About />
      {/* Dois destaques fecham uma linha inteira do grid; o resto vive em /produtos. */}
      <Products limit={2} hideSpecNote />
      <Audiences />
      <Process />
      <Founder />
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
