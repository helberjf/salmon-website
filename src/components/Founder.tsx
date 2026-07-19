import { motion } from 'framer-motion';
import { company } from '../data/company';

export function Founder() {
  return (
    <section id="fundadora" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[3/4] bg-muted rounded-2xl overflow-hidden relative group">
              {/* Placeholder for real photo */}
              <div className="absolute inset-0 bg-secondary flex items-center justify-center text-white/20">
                <span className="text-6xl font-serif">{company.founder.charAt(0)}</span>
              </div>
              {/* Fallback image simulation */}
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                alt={company.founder}
                className="w-full h-full object-cover object-top mix-blend-overlay opacity-60 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-serif font-bold text-xl">{company.founder}</p>
                <p className="text-blue-200 text-sm">Fundadora e CEO</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-background border-8 border-white rounded-full flex items-center justify-center p-6 text-center shadow-xl hidden md:flex flex-col">
              <span className="text-3xl font-serif font-bold text-secondary">[X]</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Anos de Diplomacia</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Experiência diplomática aplicada aos negócios internacionais
            </h2>
            <div className="w-12 h-1 bg-accent mb-8" />
            
            <div className="space-y-6 text-lg text-muted-foreground mb-10 leading-relaxed">
              <p>
                A {company.name} é liderada por {company.founder}, profissional com extensa trajetória atuando como <strong className="text-foreground">[CARGO DIPLOMÁTICO]</strong> por <strong className="text-foreground">[PERÍODO DE ATUAÇÃO]</strong>.
              </p>
              <p>
                Sua vivência em <strong className="text-foreground">[PAÍSES/REGIÕES]</strong> e o relacionamento construído com instituições como <strong className="text-foreground">[INSTITUIÇÕES]</strong> proporcionam uma vantagem competitiva única para a empresa. 
              </p>
              <p>
                Ao invés de apenas importar produtos, a {company.name} constrói alianças estratégicas. A capacidade de navegar pelas complexidades culturais e burocráticas internacionais garante negociações mais seguras, transparentes e lucrativas para os parceiros no Brasil.
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="font-serif font-bold text-foreground mb-4">Credenciais</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Formação:</strong> [FORMAÇÃO ACADÊMICA]</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Idiomas:</strong> [IDIOMAS]</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Reconhecimento:</strong> [PREMIAÇÕES]</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
