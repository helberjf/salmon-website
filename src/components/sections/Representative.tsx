import { ArrowUpRight, Linkedin } from 'lucide-react';
import { BridgePointLogo } from '@/components/ui/BridgePointLogo';
import { Reveal } from '@/components/ui/Reveal';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { bridgePoint } from '@/data/bridgepoint';
import { founder } from '@/data/founder';
import { useI18n } from '@/i18n/I18nProvider';

/**
 * A representante da Norwell no Brasil, em um bloco curto: o site é sobre a
 * Norwell, e a BridgePoint aparece como quem atende o comprador brasileiro.
 * Usado na home (destino da faixa do topo, #representante) e em /sobre.
 */
export function Representative() {
  const { t } = useI18n();

  return (
    <section id="representante" className="bg-white py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading
            eyebrow={t('Representante no Brasil')}
            title={t('Atendimento local, pela BridgePoint')}
          />
          <Reveal delay={0.1} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            <p>{t(bridgePoint.representative)}</p>
          </Reveal>
        </div>

        <Reveal direction="left" className="rounded-[2rem] border border-border bg-ice p-7 md:p-9">
          <BridgePointLogo height={44} />
          <div className="mt-8 flex items-center gap-5 border-t border-border pt-7">
            <ResponsiveImage
              src={founder.introPhoto.src}
              alt={t(founder.introPhoto.alt)}
              sizes="80px"
              maxWidth={480}
              className="h-20 w-20 shrink-0 rounded-full object-cover object-[35%_30%]"
            />
            <div className="min-w-0">
              <p className="text-lg font-semibold text-navy">{founder.name}</p>
              <p className="mt-0.5 text-sm text-muted">{t('Fundadora da BridgePoint')}</p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ocean transition-colors hover:text-navy"
              >
                <Linkedin size={16} aria-hidden="true" />
                {t('Ver perfil no LinkedIn')}
                <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only">{t('(abre em nova aba)')}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
