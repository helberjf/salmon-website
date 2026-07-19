import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { company } from '../data/company';

const formSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  companyName: z.string().min(2, 'Nome da empresa é obrigatório'),
  role: z.string().min(2, 'Cargo é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  location: z.string().min(2, 'Cidade e Estado são obrigatórios'),
  businessType: z.string().min(1, 'Selecione o tipo de estabelecimento'),
  productInterest: z.string().min(1, 'Selecione o produto'),
  volume: z.string().optional(),
  frequency: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'Você precisa aceitar os termos de contato'),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section id="contato" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                Inicie uma Parceria
              </h2>
              <div className="w-12 h-1 bg-accent mb-8" />
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Nossa equipe comercial está pronta para entender as necessidades específicas do seu negócio e apresentar soluções adequadas de importação.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-background p-3 rounded-full text-secondary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">E-mail</h4>
                    <a href={`mailto:${company.email}`} className="text-muted-foreground hover:text-secondary transition-colors">
                      {company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-background p-3 rounded-full text-secondary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Telefones</h4>
                    <p className="text-muted-foreground">{company.phone}</p>
                    <p className="text-muted-foreground">WhatsApp: {company.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-background p-3 rounded-full text-secondary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Localização</h4>
                    <p className="text-muted-foreground">{company.address}</p>
                    <p className="text-muted-foreground">{company.city}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background p-8 md:p-10 rounded-2xl border border-border shadow-sm"
            >
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 text-center h-full">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Solicitação Enviada!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Agradecemos o seu interesse. Nossa equipe comercial entrará em contato em breve com mais informações.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 px-6 py-2 border border-border rounded-md text-sm font-medium hover:bg-white transition-colors"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Nome Completo *</label>
                      <input 
                        {...register('name')} 
                        className={`w-full px-4 py-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 ${errors.name ? 'border-destructive' : 'border-border'}`}
                        placeholder="Seu nome"
                      />
                      {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Nome da Empresa *</label>
                      <input 
                        {...register('companyName')} 
                        className={`w-full px-4 py-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 ${errors.companyName ? 'border-destructive' : 'border-border'}`}
                        placeholder="Razão social ou fantasia"
                      />
                      {errors.companyName && <p className="text-destructive text-xs">{errors.companyName.message}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Cargo *</label>
                      <input 
                        {...register('role')} 
                        className={`w-full px-4 py-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 ${errors.role ? 'border-destructive' : 'border-border'}`}
                        placeholder="Ex: Comprador, Chef, Diretor"
                      />
                      {errors.role && <p className="text-destructive text-xs">{errors.role.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Cidade e Estado *</label>
                      <input 
                        {...register('location')} 
                        className={`w-full px-4 py-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 ${errors.location ? 'border-destructive' : 'border-border'}`}
                        placeholder="Ex: São Paulo, SP"
                      />
                      {errors.location && <p className="text-destructive text-xs">{errors.location.message}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">E-mail Corporativo *</label>
                      <input 
                        {...register('email')} 
                        type="email"
                        className={`w-full px-4 py-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 ${errors.email ? 'border-destructive' : 'border-border'}`}
                        placeholder="seu@email.com.br"
                      />
                      {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Telefone / WhatsApp *</label>
                      <input 
                        {...register('phone')} 
                        className={`w-full px-4 py-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 ${errors.phone ? 'border-destructive' : 'border-border'}`}
                        placeholder="(00) 00000-0000"
                      />
                      {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Tipo de Estabelecimento *</label>
                      <select 
                        {...register('businessType')} 
                        className={`w-full px-4 py-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 ${errors.businessType ? 'border-destructive' : 'border-border'}`}
                      >
                        <option value="">Selecione...</option>
                        <option value="Restaurante">Restaurante / Sushibar</option>
                        <option value="Hotel">Hotel / Resort</option>
                        <option value="Supermercado">Supermercado / Empório</option>
                        <option value="Distribuidor">Distribuidor / Atacadista</option>
                        <option value="Peixaria">Peixaria</option>
                        <option value="Outro">Outro</option>
                      </select>
                      {errors.businessType && <p className="text-destructive text-xs">{errors.businessType.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Produto de Interesse *</label>
                      <select 
                        {...register('productInterest')} 
                        className={`w-full px-4 py-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 ${errors.productInterest ? 'border-destructive' : 'border-border'}`}
                      >
                        <option value="">Selecione...</option>
                        <option value="Inteiro">Salmão Inteiro (Fresco)</option>
                        <option value="File">Filé de Salmão</option>
                        <option value="Porcoes">Porções Padronizadas</option>
                        <option value="Congelado">Produtos Congelados</option>
                        <option value="Mix">Mix de Produtos</option>
                      </select>
                      {errors.productInterest && <p className="text-destructive text-xs">{errors.productInterest.message}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Volume Aproximado (kg/mês)</label>
                      <input 
                        {...register('volume')} 
                        className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        placeholder="Ex: 500kg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Frequência de Compra</label>
                      <select 
                        {...register('frequency')} 
                        className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      >
                        <option value="">Selecione...</option>
                        <option value="Semanal">Semanal</option>
                        <option value="Quinzenal">Quinzenal</option>
                        <option value="Mensal">Mensal</option>
                        <option value="Sob demanda">Sob demanda</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Mensagem (Opcional)</label>
                    <textarea 
                      {...register('message')} 
                      rows={4}
                      className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
                      placeholder="Detalhes adicionais sobre sua demanda..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        {...register('consent')}
                        className="mt-1 w-4 h-4 text-secondary rounded border-gray-300 focus:ring-secondary"
                      />
                      <span className="text-sm text-muted-foreground">
                        Autorizo o contato da {company.name} para responder à minha solicitação e enviar propostas comerciais.
                      </span>
                    </label>
                    {errors.consent && <p className="text-destructive text-xs">{errors.consent.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-secondary text-white font-bold rounded-md hover:bg-secondary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
