import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/data/company';
import { products } from '@/data/products';
import { submitContact } from '@/utils/submitContact';

const ufs = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const businessTypes = [
  'Restaurante / Sushi bar',
  'Hotel / Resort',
  'Supermercado / Empório',
  'Distribuidor / Atacadista',
  'Peixaria',
  'Empresa de alimentação',
  'Outro',
];

const frequencies = ['Semanal', 'Quinzenal', 'Mensal', 'Sob demanda'];

const formSchema = z.object({
  name: z.string().min(2, 'Informe seu nome completo'),
  companyName: z.string().min(2, 'Informe o nome da empresa'),
  role: z.string().min(2, 'Informe seu cargo'),
  email: z.string().email('Informe um e-mail válido'),
  phone: z.string().min(10, 'Informe um telefone com DDD'),
  city: z.string().min(2, 'Informe a cidade'),
  state: z.string().min(2, 'Selecione o estado'),
  businessType: z.string().min(1, 'Selecione o tipo de estabelecimento'),
  productInterest: z.string().min(1, 'Selecione o produto de interesse'),
  volume: z.string().optional(),
  frequency: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((value) => value, 'É necessário autorizar o contato'),
});

type FormValues = z.infer<typeof formSchema>;

const inputClass =
  'w-full rounded-md border border-border bg-white px-4 py-3 text-navy placeholder:text-muted/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-ocean-light aria-[invalid=true]:border-nordic-red';

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: (props: { id: string; describedBy?: string }) => React.ReactNode;
}

function Field({ label, error, required, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-erro`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && (
          <span aria-hidden="true" className="text-nordic-red">
            {' '}
            *
          </span>
        )}
      </label>
      {children({ id, describedBy: error ? errorId : undefined })}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-nordic-red">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { consent: false },
  });

  const onSubmit = async (data: FormValues) => {
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      const { consent: _consent, ...payload } = data;
      await submitContact(payload);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Contato"
              title="Solicite uma proposta"
              description="Conte um pouco sobre a sua operação. Retornaremos com as possibilidades de fornecimento adequadas ao seu negócio."
            />
            <Reveal delay={0.1} className="mt-9 space-y-5 text-sm">
              {company.email && (
                <p className="flex items-center gap-3.5">
                  <Mail size={18} aria-hidden="true" className="shrink-0 text-ocean" />
                  <a href={`mailto:${company.email}`} className="text-muted hover:text-navy">
                    {company.email}
                  </a>
                </p>
              )}
              {company.phone && (
                <p className="flex items-center gap-3.5">
                  <Phone size={18} aria-hidden="true" className="shrink-0 text-ocean" />
                  <span className="text-muted">{company.phone}</span>
                </p>
              )}
              <p className="flex items-center gap-3.5">
                <MapPin size={18} aria-hidden="true" className="shrink-0 text-ocean" />
                <span className="text-muted">
                  {company.city} — {company.state}, Brasil
                </span>
              </p>
              {company.linkedin && (
                <p className="flex items-center gap-3.5">
                  <Linkedin size={18} aria-hidden="true" className="shrink-0 text-ocean" />
                  <a
                    href={company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-navy"
                  >
                    LinkedIn
                  </a>
                </p>
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={0.1}>
              {status === 'success' ? (
                <div
                  role="status"
                  className="flex h-full flex-col items-center justify-center rounded-lg border border-border bg-white px-8 py-20 text-center"
                >
                  <CheckCircle2 size={44} aria-hidden="true" className="text-ocean" />
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-navy">
                    Solicitação pronta no WhatsApp
                  </h3>
                  <p className="mt-3 max-w-md text-muted">
                    Os dados foram organizados em uma mensagem. Basta confirmar o envio na conversa
                    aberta com a Mai.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-8 rounded-md border border-border px-6 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-background"
                  >
                    Enviar nova solicitação
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="rounded-lg border border-border bg-white p-7 md:p-9"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Nome completo" required error={errors.name?.message}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          type="text"
                          autoComplete="name"
                          aria-invalid={!!errors.name}
                          aria-describedby={describedBy}
                          className={inputClass}
                          {...register('name')}
                        />
                      )}
                    </Field>
                    <Field label="Empresa" required error={errors.companyName?.message}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          type="text"
                          autoComplete="organization"
                          aria-invalid={!!errors.companyName}
                          aria-describedby={describedBy}
                          className={inputClass}
                          {...register('companyName')}
                        />
                      )}
                    </Field>
                    <Field label="Cargo" required error={errors.role?.message}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          type="text"
                          autoComplete="organization-title"
                          aria-invalid={!!errors.role}
                          aria-describedby={describedBy}
                          className={inputClass}
                          {...register('role')}
                        />
                      )}
                    </Field>
                    <Field label="Telefone / WhatsApp" required error={errors.phone?.message}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          type="tel"
                          autoComplete="tel"
                          placeholder="(00) 00000-0000"
                          aria-invalid={!!errors.phone}
                          aria-describedby={describedBy}
                          className={inputClass}
                          {...register('phone')}
                        />
                      )}
                    </Field>
                    <Field label="E-mail" required error={errors.email?.message}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          type="email"
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                          aria-describedby={describedBy}
                          className={inputClass}
                          {...register('email')}
                        />
                      )}
                    </Field>
                    <div className="grid grid-cols-[1fr_auto] gap-4">
                      <Field label="Cidade" required error={errors.city?.message}>
                        {({ id, describedBy }) => (
                          <input
                            id={id}
                            type="text"
                            autoComplete="address-level2"
                            aria-invalid={!!errors.city}
                            aria-describedby={describedBy}
                            className={inputClass}
                            {...register('city')}
                          />
                        )}
                      </Field>
                      <Field label="Estado" required error={errors.state?.message}>
                        {({ id, describedBy }) => (
                          <select
                            id={id}
                            autoComplete="address-level1"
                            aria-invalid={!!errors.state}
                            aria-describedby={describedBy}
                            className={`${inputClass} min-w-24`}
                            defaultValue=""
                            {...register('state')}
                          >
                            <option value="" disabled>
                              UF
                            </option>
                            {ufs.map((uf) => (
                              <option key={uf} value={uf}>
                                {uf}
                              </option>
                            ))}
                          </select>
                        )}
                      </Field>
                    </div>
                    <Field
                      label="Tipo de estabelecimento"
                      required
                      error={errors.businessType?.message}
                    >
                      {({ id, describedBy }) => (
                        <select
                          id={id}
                          aria-invalid={!!errors.businessType}
                          aria-describedby={describedBy}
                          className={inputClass}
                          defaultValue=""
                          {...register('businessType')}
                        >
                          <option value="" disabled>
                            Selecione…
                          </option>
                          {businessTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <Field
                      label="Produto de interesse"
                      required
                      error={errors.productInterest?.message}
                    >
                      {({ id, describedBy }) => (
                        <select
                          id={id}
                          aria-invalid={!!errors.productInterest}
                          aria-describedby={describedBy}
                          className={inputClass}
                          defaultValue=""
                          {...register('productInterest')}
                        >
                          <option value="" disabled>
                            Selecione…
                          </option>
                          {products.map((product) => (
                            <option key={product.id} value={product.name}>
                              {product.name}
                            </option>
                          ))}
                          <option value="Mais de um produto">Mais de um produto</option>
                        </select>
                      )}
                    </Field>
                    <Field label="Volume estimado (kg/mês)" error={errors.volume?.message}>
                      {({ id }) => (
                        <input
                          id={id}
                          type="text"
                          placeholder="Ex.: 500 kg"
                          className={inputClass}
                          {...register('volume')}
                        />
                      )}
                    </Field>
                    <Field label="Frequência de compra" error={errors.frequency?.message}>
                      {({ id }) => (
                        <select
                          id={id}
                          className={inputClass}
                          defaultValue=""
                          {...register('frequency')}
                        >
                          <option value="">Selecione…</option>
                          {frequencies.map((frequency) => (
                            <option key={frequency} value={frequency}>
                              {frequency}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label="Mensagem" error={errors.message?.message}>
                      {({ id }) => (
                        <textarea
                          id={id}
                          rows={4}
                          placeholder="Detalhes adicionais sobre a sua operação e necessidade"
                          className={`${inputClass} resize-none`}
                          {...register('message')}
                        />
                      )}
                    </Field>
                  </div>

                  <div className="mt-6">
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 accent-ocean"
                        aria-invalid={!!errors.consent}
                        {...register('consent')}
                      />
                      <span>
                        Autorizo o uso dos dados informados para retorno desta solicitação e envio
                        de propostas comerciais, conforme a{' '}
                        <a href="/privacidade" className="font-medium text-ocean underline">
                          Política de Privacidade
                        </a>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p role="alert" className="mt-1.5 text-xs text-nordic-red">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="mt-5 rounded-md bg-nordic-red/10 px-4 py-3 text-sm text-nordic-red">
                      Não foi possível enviar a solicitação. Tente novamente em instantes ou
                      utilize outro canal de contato.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="mt-7 w-full rounded-md bg-navy py-4 font-semibold text-white transition-colors hover:bg-ocean disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Preparando…' : 'Continuar pelo WhatsApp'}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
