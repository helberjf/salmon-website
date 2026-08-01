import { lazy, Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { BackToTop } from '@/components/layout/BackToTop';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { NorwegianSalmon } from '@/components/sections/NorwegianSalmon';
import { Products } from '@/components/sections/Products';
import { Gallery } from '@/components/sections/Gallery';
import { Process } from '@/components/sections/Process';
import { Founder } from '@/components/sections/Founder';
import { Differentials } from '@/components/sections/Differentials';
import { CallToAction } from '@/components/sections/CallToAction';

const ContactSection = lazy(() =>
  import('@/components/sections/ContactSection').then((module) => ({
    default: module.ContactSection,
  })),
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <NorwegianSalmon />
        <Products />
        <Gallery />
        <Process />
        <Founder />
        <Differentials />
        <CallToAction />
        <Suspense
          fallback={<section id="contato" aria-hidden="true" className="min-h-96 bg-background" />}
        >
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
