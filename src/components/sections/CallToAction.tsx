import { MessageCircle } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { images } from '@/data/images';
import { hasWhatsApp, whatsAppLink } from '@/utils/whatsapp';

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-ocean py-20 md:py-24">
      {images.callToAction.src && (
        <img
          src={images.callToAction.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
      )}
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold text-white md:text-4xl">
            Vamos conversar sobre as necessidades do seu negócio?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Apresente o perfil da sua operação, o produto desejado e a frequência de compra. Nossa
            equipe avaliará as possibilidades de fornecimento.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3.5 font-semibold text-navy transition-colors hover:bg-frost"
            >
              Solicitar proposta
            </a>
            {hasWhatsApp && (
              <a
                href={whatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Falar pelo WhatsApp
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
