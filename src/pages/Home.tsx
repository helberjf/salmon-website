import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { BackToTop } from '@/components/layout/BackToTop';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { NorwegianSalmon } from '@/components/sections/NorwegianSalmon';
import { Products } from '@/components/sections/Products';
import { Process } from '@/components/sections/Process';
import { Founder } from '@/components/sections/Founder';
import { Differentials } from '@/components/sections/Differentials';
import { Audiences } from '@/components/sections/Audiences';
import { Trust } from '@/components/sections/Trust';
import { CallToAction } from '@/components/sections/CallToAction';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <NorwegianSalmon />
        <Products />
        <Process />
        <Founder />
        <Differentials />
        <Audiences />
        <Trust />
        <CallToAction />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
