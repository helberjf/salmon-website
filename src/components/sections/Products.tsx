import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { products } from '@/data/products';

export function Products() {
  return (
    <section id="produtos" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Portfólio"
          title="Produtos e formatos de fornecimento"
          description="Cortes e apresentações adequados às exigências de cada operação, definidos em conjunto com o cliente."
        />

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={(index % 3) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white transition-shadow hover:shadow-md">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ocean backdrop-blur">
                    {product.preservation}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-xl font-semibold text-navy">{product.name}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                    {product.description}
                  </p>
                  <dl className="mt-5 space-y-1.5 border-t border-border pt-4 text-xs text-muted">
                    <div className="flex gap-2">
                      <dt className="font-semibold text-navy">Apresentação:</dt>
                      <dd>{product.presentation}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold text-navy">Indicado para:</dt>
                      <dd>{product.audience}</dd>
                    </div>
                  </dl>
                  <a
                    href="#contato"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean transition-colors hover:text-navy"
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

        <p className="mt-10 text-sm text-muted">
          A disponibilidade e as especificações de cada item devem ser confirmadas com a equipe
          comercial.
        </p>
      </div>
    </section>
  );
}
