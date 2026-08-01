import { ArrowRight, PackageCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { products } from '@/data/products';

export function Products() {
  return (
    <section id="produtos" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Portfólio Norwell"
          title="Do inteiro à porção, com especificação precisa"
          description="Produtos frescos ou congelados, com formatos padrão e desenvolvimento sob medida para operações B2B."
        />

        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={(index % 2) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-ice transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 sm:flex-row">
                <div className="relative min-h-64 overflow-hidden sm:w-[46%]">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-ocean backdrop-blur">
                    {product.preservation}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-2xl font-semibold text-navy">{product.name}</h3>
                    <span aria-hidden="true" className="font-serif text-sm text-ocean/35">0{index + 1}</span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {product.description}
                  </p>
                  <dl className="mt-5 space-y-2 border-t border-border pt-4 text-xs text-muted">
                    <div className="flex items-start gap-2">
                      <PackageCheck size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-ocean" />
                      <div>
                        <dt className="font-bold text-navy">Apresentação</dt>
                        <dd className="mt-0.5">{product.presentation}</dd>
                      </div>
                    </div>
                    <div className="flex gap-2 pl-[23px]">
                      <dt className="font-bold text-navy">Ideal para:</dt>
                      <dd>{product.audience}</dd>
                    </div>
                  </dl>
                  <a
                    href="#contato"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-ocean transition-colors hover:text-navy"
                  >
                    Consultar disponibilidade
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

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-navy px-6 py-5 text-white sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-relaxed text-white/70">
            Trabalhamos também com especificações B, C, D e E-trim e soluções de private label.
            Disponibilidade, MOQ e condições são confirmadas na cotação.
          </p>
          <a href="#contato" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-white">
            Pedir especificação
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
