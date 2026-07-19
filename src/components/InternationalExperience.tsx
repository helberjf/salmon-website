import { motion } from 'framer-motion';
import { Globe2, MessageSquare, Link as LinkIcon, Compass } from 'lucide-react';

const cards = [
  {
    icon: <Globe2 size={28} />,
    title: 'Relações Institucionais',
    description: 'Acesso e trânsito livre nos principais órgãos reguladores e associações de classe, facilitando processos e antecipando tendências regulatórias.'
  },
  {
    icon: <MessageSquare size={28} />,
    title: 'Negociação Intercultural',
    description: 'Comunicação fluida que respeita as nuances culturais norueguesas, resultando em acordos comerciais mais benéficos e respeitosos.'
  },
  {
    icon: <LinkIcon size={28} />,
    title: 'Conexão Noruega–Brasil',
    description: 'Uma ponte viva de conhecimento mercadológico entre a capacidade produtiva nórdica e a realidade comercial sul-americana.'
  },
  {
    icon: <Compass size={28} />,
    title: 'Visão Estratégica',
    description: 'Análise de cenário internacional aplicada à mitigação de riscos na importação, flutuações de mercado e abastecimento.'
  }
];

export function InternationalExperience() {
  return (
    <section id="experiencia" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Conhecimento que ultrapassa fronteiras
          </motion.h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl border border-border shadow-sm hover:border-accent hover:shadow-md transition-all group"
            >
              <div className="mb-6 text-secondary bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
