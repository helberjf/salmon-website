import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { images } from '@/data/images';

const highlights = [
  {
    value: 'Noruega → Brasil',
    label: 'Ponte comercial direta com o setor norueguês de pescados',
  },
  {
    value: '2007 — 2025',
    label: 'Trajetória da fundadora no Serviço Exterior da Noruega',
  },
  {
    value: 'B2B',
    label: 'Atendimento a restaurantes, hotéis, varejo e distribuição',
  },
];

export function About() {
  return (
    <section id="empresa" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="A empresa"
              title="Uma ponte sólida entre a Noruega e o mercado brasileiro"
            />
            <Reveal delay={0.1} className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Trabalhamos na importação e no fornecimento de salmão norueguês para operações
                profissionais no Brasil: restaurantes, hotéis, supermercados, peixarias e
                distribuidores que precisam de produto com procedência e de um interlocutor que
                conhece os dois lados da operação.
              </p>
              <p>
                A empresa nasce da trajetória de sua fundadora, que atuou por quase duas décadas no
                Serviço Exterior da Noruega — incluindo o posto de Cônsul e Vice-Chefe de Missão no
                Rio de Janeiro — e hoje dedica essa experiência ao comércio de pescados entre os
                dois países.
              </p>
              <p>
                Esse repertório se traduz em algo prático para o cliente: acesso qualificado ao
                setor norueguês, negociações transparentes e um fornecimento planejado de ponta a
                ponta.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <figure className="overflow-hidden rounded-lg">
              <img
                src={images.about.src}
                alt={images.about.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </figure>
            <ul className="mt-8 grid gap-6 sm:grid-cols-3">
              {highlights.map((item) => (
                <li key={item.value} className="border-l-2 border-salmon pl-4">
                  <p className="font-serif text-lg font-semibold text-navy">{item.value}</p>
                  <p className="mt-1.5 text-sm leading-snug text-muted">{item.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
