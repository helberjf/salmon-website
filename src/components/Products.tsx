import { motion } from 'framer-motion';
import { products } from '../data/products';

export function Products() {
  return (
    <section id="produtos" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
            >
              Nossos Produtos e Soluções
            </motion.h2>
            <div className="w-12 h-1 bg-accent mb-6" />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Cortes e apresentações adequadas para as diferentes exigências do mercado B2B brasileiro, com foco em rendimento e qualidade.
            </motion.p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-secondary rounded-full">
                  {product.preservation}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{product.name}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{product.description}</p>
                <div className="pt-4 border-t border-border flex justify-between items-center mt-auto">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {product.audience}
                  </span>
                  <a 
                    href="#contato" 
                    className="text-sm font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Consultar
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground italic">
            * A disponibilidade e especificações exatas devem ser confirmadas diretamente com nossa equipe comercial.
          </p>
        </div>
      </div>
    </section>
  );
}
