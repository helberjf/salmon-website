import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { NorwegianSalmon } from '../components/NorwegianSalmon';
import { Products } from '../components/Products';
import { Process } from '../components/Process';
import { Founder } from '../components/Founder';
import { InternationalExperience } from '../components/InternationalExperience';
import { Differentials } from '../components/Differentials';
import { Clients } from '../components/Clients';
import { CallToAction } from '../components/CallToAction';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { BackToTop } from '../components/BackToTop';
import { company } from '../data/company';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = `${company.name} | Importação de Salmão Norueguês`;
  }, []);

  return (
    <div className="font-sans antialiased text-foreground bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <NorwegianSalmon />
        <Products />
        <Process />
        <Founder />
        <InternationalExperience />
        <Differentials />
        <Clients />
        <CallToAction />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
