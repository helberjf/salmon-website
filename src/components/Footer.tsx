import { company } from '../data/company';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-blue-100 pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <a href="#inicio" className="text-2xl font-serif font-bold text-white tracking-tight inline-block mb-2">
              NORDIC<span className="text-accent">SALMON</span>
            </a>
            <p className="text-sm leading-relaxed text-blue-200">
              Ponte direta entre a excelência da aquicultura norueguesa e os melhores estabelecimentos gastronômicos e comerciais do Brasil.
            </p>
            <div className="flex gap-4">
              <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold mb-6">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#inicio" className="hover:text-accent transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-accent transition-colors">Sobre a Empresa</a></li>
              <li><a href="#salmao" className="hover:text-accent transition-colors">O Salmão Norueguês</a></li>
              <li><a href="#produtos" className="hover:text-accent transition-colors">Produtos</a></li>
              <li><a href="#como-trabalhamos" className="hover:text-accent transition-colors">Como Trabalhamos</a></li>
              <li><a href="#fundadora" className="hover:text-accent transition-colors">Liderança</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className="shrink-0 mt-0.5 text-accent" />
                <div>
                  <p>{company.phone}</p>
                  <p className="text-blue-300">WhatsApp: {company.whatsapp}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="shrink-0 mt-0.5 text-accent" />
                <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">{company.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5 text-accent" />
                <p>{company.address}<br/>{company.city}</p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold mb-6">Regiões Atendidas</h4>
            <p className="text-sm mb-4 leading-relaxed">
              Atendemos operações B2B nas regiões:
            </p>
            <p className="text-sm font-medium text-white mb-6">
              {company.regionsServed}
            </p>
            <a 
              href="#contato"
              className="inline-block border border-white/20 px-6 py-2 rounded text-sm font-medium hover:bg-white hover:text-primary transition-colors"
            >
              Consultar disponibilidade
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-300/60">
          <p>© {currentYear} {company.name}. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
        <div className="mt-4 text-center text-[10px] text-blue-300/40">
          * Importação e comercialização sujeitas às condições, disponibilidade e regulamentações sanitárias e aduaneiras aplicáveis.
        </div>
      </div>
    </footer>
  );
}
