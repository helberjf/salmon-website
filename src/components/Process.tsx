import { motion } from 'framer-motion';
import { Search, Users, CalendarDays, Ship, Handshake } from 'lucide-react';

const steps = [
  {
    icon: <Search size={24} />,
    title: 'Entendimento da Demanda',
    description: 'Análise detalhada do seu negócio, volume necessário, especificações de corte e frequência de abastecimento ideal.'
  },
  {
    icon: <Users size={24} />,
    title: 'Seleção de Parceiros',
    description: 'Conexão com os produtores noruegueses que melhor atendem aos requisitos específicos da sua demanda comercial.'
  },
  {
    icon: <CalendarDays size={24} />,
    title: 'Planejamento da Importação',
    description: 'Estruturação da parte burocrática, cambial e cronograma, garantindo total transparência e previsibilidade.'
  },
  {
    icon: <Ship size={24} />,
    title: 'Acompanhamento Logístico',
    description: 'Monitoramento rigoroso da cadeia do frio durante o trajeto internacional até a nacionalização e entrega.'
  },
  {
    icon: <Handshake size={24} />,
    title: 'Relacionamento Pós-Venda',
    description: 'Acompanhamento da qualidade do produto recebido e ajustes para os próximos lotes, visando parcerias de longo prazo.'
  }
];

export function Process() {
  return (
    <section id="como-trabalhamos" className="py-24 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            Como Trabalhamos
          </motion.h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-6" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-blue-100"
          >
            Um processo estruturado e transparente, desenhado para minimizar riscos e maximizar a eficiência na importação.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2" />
          
          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-secondary border-4 border-primary flex items-center justify-center text-white mb-6 group-hover:bg-accent group-hover:text-primary transition-colors duration-300 relative">
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-primary text-xs font-bold flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                  {step.icon}
                </div>
                <h3 className="text-lg font-serif font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-blue-100/80 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
