import { motion } from 'framer-motion';
import { Store, UtensilsCrossed, Hotel, Truck, Building2, ShoppingBag } from 'lucide-react';

const segments = [
  {
    icon: <UtensilsCrossed size={32} />,
    title: 'Restaurantes e Chefs',
    description: 'Fornecimento constante de salmão premium para estabelecimentos gastronômicos que não abrem mão da qualidade e frescor.'
  },
  {
    icon: <Hotel size={32} />,
    title: 'Hotéis',
    description: 'Cortes padronizados e porcionamento exato para otimizar as operações de cozinha e banquetes hoteleiros.'
  },
  {
    icon: <Store size={32} />,
    title: 'Supermercados',
    description: 'Linhas de produtos adequadas para o varejo de alto padrão, garantindo prateleiras abastecidas com procedência.'
  },
  {
    icon: <Truck size={32} />,
    title: 'Distribuidores',
    description: 'Soluções em volume e suporte logístico para quem distribui excelência em suas respectivas regiões.'
  },
  {
    icon: <ShoppingBag size={32} />,
    title: 'Peixarias Premium',
    description: 'Salmão inteiro ou eviscerado de altíssima qualidade para vitrines que exigem apelo visual e frescor absoluto.'
  },
  {
    icon: <Building2 size={32} />,
    title: 'Empresas de Alimentação',
    description: 'Cadeia de suprimentos confiável para indústrias e food service de larga escala.'
  }
];

export function Clients() {
  return (
    <section id="clientes" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Soluções para diferentes negócios
          </motion.h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-6" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Entendemos que cada segmento possui exigências específicas de volume, corte e frequência.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl border border-border shadow-sm flex gap-6 group hover:shadow-md transition-shadow"
            >
              <div className="text-secondary shrink-0 pt-1 group-hover:scale-110 transition-transform">
                {segment.icon}
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">{segment.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{segment.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
