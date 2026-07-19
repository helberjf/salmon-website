import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { company } from '../data/company';

export function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Leve a excelência do salmão norueguês para o seu negócio
          </h2>
          <p className="text-xl text-blue-100 mb-10 font-light">
            Entre em contato com nossa equipe comercial para discutir volumes, frequências e a solução ideal de importação para a sua operação.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contato" 
              className="inline-flex justify-center items-center px-8 py-4 bg-white text-secondary font-bold rounded-md hover:bg-gray-100 transition-colors shadow-lg"
            >
              Solicitar proposta comercial
            </a>
            <a 
              href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-md hover:bg-[#128C7E] transition-colors shadow-lg"
            >
              <MessageCircle size={20} />
              Falar pelo WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
