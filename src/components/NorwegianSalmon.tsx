import { motion } from 'framer-motion';
import { MapPin, ChefHat, Search, Snowflake, Repeat, Briefcase } from 'lucide-react';

const attributes = [
  {
    icon: <MapPin size={32} />,
    title: 'Origem Reconhecida',
    description: 'Águas frias e cristalinas dos fiordes noruegueses, o habitat perfeito para o crescimento ideal do salmão.'
  },
  {
    icon: <ChefHat size={32} />,
    title: 'Qualidade e Sabor',
    description: 'Textura firme, coloração vibrante e marmoreio incomparável, apreciado pelos melhores chefs do mundo.'
  },
  {
    icon: <Search size={32} />,
    title: 'Rastreabilidade',
    description: 'Controle rigoroso em cada etapa, garantindo a procedência desde o ovo até o prato.'
  },
  {
    icon: <Snowflake size={32} />,
    title: 'Cadeia Refrigerada',
    description: 'Logística de temperatura controlada, mantendo o frescor absoluto durante todo o trajeto até o Brasil.'
  },
  {
    icon: <Repeat size={32} />,
    title: 'Versatilidade',
    description: 'Excelente para pratos crus (sushi, sashimi), defumados, assados, grelhados e preparações elaboradas.'
  },
  {
    icon: <Briefcase size={32} />,
    title: 'Fornecimento Profissional',
    description: 'Padronização de cortes e constância na entrega para operações de food service de alto nível.'
  }
];

export function NorwegianSalmon() {
  return (
    <section id="salmao" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Por que o salmão norueguês?
          </motion.h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-6" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            O mar norueguês não é apenas a origem dos nossos produtos; é a base da sua qualidade inigualável.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attributes.map((attr, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background p-8 rounded-xl border border-border group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                {attr.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">{attr.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{attr.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
