import { motion } from 'framer-motion';
import { 
  Award, Anchor, HeartHandshake, Eye, 
  ShieldCheck, Route, UserCheck, Infinity 
} from 'lucide-react';

const differentials = [
  { icon: <Award size={24} />, title: "Experiência Internacional" },
  { icon: <Anchor size={24} />, title: "Conhecimento do Mercado Norueguês" },
  { icon: <HeartHandshake size={24} />, title: "Relacionamento Próximo com Clientes" },
  { icon: <Eye size={24} />, title: "Transparência nas Negociações" },
  { icon: <ShieldCheck size={24} />, title: "Atenção à Procedência" },
  { icon: <Route size={24} />, title: "Planejamento Logístico" },
  { icon: <UserCheck size={24} />, title: "Atendimento Personalizado" },
  { icon: <Infinity size={24} />, title: "Parcerias de Longo Prazo" }
];

export function Differentials() {
  return (
    <section id="diferenciais" className="py-24 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold mb-6"
            >
              Nossos Diferenciais
            </motion.h2>
            <div className="w-12 h-1 bg-accent mb-6" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {differentials.map((diff, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 border border-white/10 hover:bg-white/10 p-6 rounded-xl flex flex-col items-center text-center justify-center gap-4 transition-all duration-300"
            >
              <div className="text-accent">
                {diff.icon}
              </div>
              <h3 className="font-serif font-medium text-sm md:text-base leading-tight">
                {diff.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
