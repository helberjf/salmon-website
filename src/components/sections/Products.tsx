import { ArrowRight, PackageCheck } from 'lucide-react';
import { Link } from 'wouter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { products } from '@/data/products';
import { useI18n } from '@/i18n/I18nProvider';

interface ProductsProps {
  /** Quantos itens exibir. Sem valor, mostra o portfólio inteiro. */
  limit?: number;
  /** Oculta o rodapé sobre especificações — usado no resumo da home. */
  hideSpecNote?: boolean;
}

export function Products({ limit, hideSpecNote = false }: ProductsProps = {}) {
  const { t } = useI18n();
  const shown = typeof limit === 'number' ? products.slice(0, limit) : products;
  const isPreview = shown.length < products.length;

  return (
    <section id="produtos" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t('Portfólio Norwell')}
          title={isPreview ? t('Alguns dos formatos que fornecemos') : t('Do inteiro à porção, com especificação precisa')}
          description={t('Produtos frescos ou congelados, com formatos padrão e desenvolvimento sob medida para operações B2B.')}
        />

        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          {shown.map((product, index) => (
            <Reveal
              key={product.id}
              delay={(index % 2) * 0.08}
              direction={index % 2 === 0 ? 'right' : 'left'}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-ice transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ocean/25 hover:shadow-xl hover:shadow-navy/10 focus-within:-translate-y-1 focus-within:shadow-xl sm:flex-row">
                <div className="relative min-h-64 overflow-hidden sm:w-[46%]">
                  <img
                    src={product.image}
                    alt={t(product.imageAlt)}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-ocean backdrop-blur">
                    {t(product.preservation)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-2xl font-semibold text-navy">{t(product.name)}</h3>
                    <span aria-hidden="true" className="font-serif text-sm text-ocean/35">0{index + 1}</span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {t(product.description)}
                  </p>
                  <dl className="mt-5 space-y-2 border-t border-border pt-4 text-xs text-muted">
                    <div className="flex items-start gap-2">
                      <PackageCheck size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-ocean" />
                      <div>
                        <dt className="font-bold text-navy">{t('Apresentação')}</dt>
                        <dd className="mt-0.5">{t(product.presentation)}</dd>
                      </div>
                    </div>
                    <div className="flex gap-2 pl-[23px]">
                      <dt className="font-bold text-navy">{t('Ideal para:')}</dt>
                      <dd>{t(product.audience)}</dd>
                    </div>
                  </dl>
                  <a
                    href="/#contato"
                    className="mt-5 inline-flex items-center gap-1.5 py-2.5 text-sm font-bold text-ocean transition-colors hover:text-navy"
                  >
                    {t('Consultar disponibilidade')}
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {isPreview && (
          <Reveal delay={0.1} className="mt-10 flex justify-center">
            <Link
              href="/produtos"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:border-ocean/30 hover:bg-ice"
            >
              {t('Ver o portfólio completo')}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        )}

        {!hideSpecNote && (
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-navy px-6 py-5 text-white sm:flex-row sm:items-center">
            <p className="max-w-2xl text-sm leading-relaxed text-white/70">
              {t(
                'Trabalhamos também com especificações B, C, D e E-trim e soluções de private label. Disponibilidade, MOQ e condições são confirmadas na cotação.',
              )}
            </p>
            <a
              href="/#contato"
              className="inline-flex shrink-0 items-center gap-2 py-1.5 text-sm font-bold text-white"
            >
              {t('Pedir especificação')}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
