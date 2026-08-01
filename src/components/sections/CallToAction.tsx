import { MessageCircle } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { images } from '@/data/images';
import { hasWhatsApp, whatsAppLink } from '@/utils/whatsapp';

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-ocean py-24 md:py-28">
      {images.callToAction.src && (
        <img
          src={images.callToAction.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-ocean/60" />
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-salmon">Próximo embarque</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white md:text-5xl">
            O salmão certo para a sua operação começa com uma boa conversa.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Conte o produto, o volume e a frequência que procura. Estruturamos a especificação e a
            rota de fornecimento mais adequadas ao seu negócio.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost"
            >
              Solicitar proposta
            </a>
            {hasWhatsApp && (
              <a
                href={whatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-4 font-bold text-white transition-colors hover:bg-white/10"
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
