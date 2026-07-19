import { motion } from 'framer-motion';
import { company } from '../data/company';

export function About() {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Noruega e Brasil unidos pela excelência
            </h2>
            <div className="w-12 h-1 bg-accent mb-8" />
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              A {company.name} atua como uma ponte sólida e confiável entre a excelência da aquicultura norueguesa e a crescente demanda do mercado brasileiro por produtos premium.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Compreendemos as particularidades culturais e comerciais de ambos os países, o que nos permite facilitar negociações, garantir o mais alto padrão de qualidade e estabelecer relações comerciais transparentes e duradouras.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 md:gap-8"
          >
            {[
              { stat: '[X]+', label: 'anos de experiência internacional' },
              { stat: '[X]', label: 'parceiros comerciais' },
              { stat: '[X]', label: 'estados atendidos no Brasil' },
              { stat: '[X]%', label: 'compromisso com a qualidade' },
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm border border-border flex flex-col items-center text-center justify-center min-h-[160px]"
              >
                <div className="text-4xl font-serif font-bold text-secondary mb-2">{item.stat}</div>
                <div className="text-sm text-muted-foreground font-medium">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
