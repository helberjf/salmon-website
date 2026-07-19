import { motion } from 'framer-motion';
import { Anchor, ShieldCheck, Headphones, Truck, ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&w=1920&q=80" 
          alt="Ilhas Lofoten, Noruega - paisagem nórdica" 
          className="w-full h-full object-cover"
        />
        {/* Dark elegant overlay */}
        <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
      </div>

      <div className="container relative z-10 mx-auto px-6 pt-24 pb-32">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-6"
          >
            Excelência norueguesa conectada ao mercado brasileiro
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-blue-100 font-light mb-10 leading-relaxed max-w-2xl"
          >
            Importação de salmão norueguês com qualidade, procedência e experiência internacional em cada etapa da operação.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#contato" 
              className="inline-flex justify-center items-center px-8 py-4 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              Solicitar orçamento
            </a>
            <a 
              href="#fundadora" 
              className="inline-flex justify-center items-center px-8 py-4 bg-primary-border border border-white/30 text-white font-semibold rounded-md hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Conheça nossa história
            </a>
          </motion.div>
        </div>
      </div>

      {/* Trust Indicators Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-primary/40 backdrop-blur-md py-6 hidden md:block">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center text-sm font-medium text-white/90">
            <div className="flex items-center gap-2">
              <Anchor size={18} className="text-accent" />
              <span>Origem Norueguesa</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-accent" />
              <span>Qualidade Controlada</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones size={18} className="text-accent" />
              <span>Atendimento Comercial</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-accent" />
              <span>Logística Especializada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator for mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 md:hidden animate-bounce">
        <ChevronDown size={28} className="text-white/70" />
      </div>
    </section>
  );
}
