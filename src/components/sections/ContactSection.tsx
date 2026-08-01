import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, ChevronDown, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/data/company';
import { products } from '@/data/products';
import { submitContact } from '@/utils/submitContact';
import { useI18n } from '@/i18n/I18nProvider';

const ufs = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const businessTypes = [
  { id: 'restaurant', label: 'Restaurante / Sushi bar' },
  { id: 'hotel', label: 'Hotel / Resort' },
  { id: 'retail', label: 'Supermercado / Empório' },
  { id: 'distribution', label: 'Distribuidor / Atacadista' },
  { id: 'fishmonger', label: 'Peixaria' },
  { id: 'food-service', label: 'Empresa de alimentação' },
  { id: 'other', label: 'Outro' },
];

const frequencies = [
  { id: 'weekly', label: 'Semanal' },
  { id: 'fortnightly', label: 'Quinzenal' },
  { id: 'monthly', label: 'Mensal' },
  { id: 'on-demand', label: 'Sob demanda' },
];

type Translate = (source: string, vars?: Record<string, string | number>) => string;

const createFormSchema = (t: Translate) =>
  z.object({
    name: z.string().min(2, t('Informe seu nome completo')),
    companyName: z.string().min(2, t('Informe o nome da empresa')),
    role: z.string().min(2, t('Informe seu cargo')),
    email: z.string().email(t('Informe um e-mail válido')),
    phone: z.string().min(10, t('Informe um telefone com DDD')),
    city: z.string().min(2, t('Informe a cidade')),
    state: z.string().min(2, t('Selecione o estado')),
    businessType: z.string().min(1, t('Selecione o tipo de estabelecimento')),
    productInterest: z.string().min(1, t('Selecione o produto de interesse')),
    volume: z.string().optional(),
    frequency: z.string().optional(),
    message: z.string().optional(),
    consent: z.boolean().refine((value) => value, t('É necessário autorizar o contato')),
  });

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

const inputClass =
  'w-full rounded-md border border-border bg-white px-4 py-2.5 text-navy placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-ocean-light aria-[invalid=true]:border-nordic-red sm:py-3';

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
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-navy">
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
  const { href: localizedHref, language, t } = useI18n();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const successTitleRef = useRef<HTMLHeadingElement>(null);
  const consentErrorId = useId();
  const consentId = useId();
  const consentLabelId = `${consentId}-label`;
  const consentPolicyId = `${consentId}-policy`;
  const formSchema = useMemo(() => createFormSchema(t), [language, t]);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, submitCount },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { consent: false },
  });

  useEffect(() => {
    if (submitCount > 0) void trigger();
  }, [language, submitCount, trigger]);

  useEffect(() => {
    if (status === 'success') successTitleRef.current?.focus();
  }, [status]);

  useEffect(() => {
    if (window.location.hash !== '#contato') return undefined;

    const animationFrame = window.requestAnimationFrame(() => {
      sectionRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      const { consent: _consent, ...payload } = data;
      const businessType = businessTypes.find((item) => item.id === payload.businessType);
      const product = products.find((item) => item.id === payload.productInterest);
      const frequency = frequencies.find((item) => item.id === payload.frequency);
      await submitContact(
        {
          ...payload,
          businessType: businessType ? t(businessType.label) : payload.businessType,
          productInterest:
            payload.productInterest === 'multiple'
              ? t('Mais de um produto')
              : product
                ? t(product.name)
                : payload.productInterest,
          frequency: frequency ? t(frequency.label) : payload.frequency,
        },
        t,
      );
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contato"
      tabIndex={-1}
      aria-label={t('Contato')}
      className="bg-background py-16 focus:outline-none sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={t('Contato')}
              title={t('Solicite uma proposta')}
              description={t('Conte um pouco sobre a sua operação. Retornaremos com as possibilidades de fornecimento adequadas ao seu negócio.')}
            />
            <Reveal delay={0.1} className="mt-9 space-y-5 text-sm">
              {company.email && (
                <p className="flex items-center gap-3.5">
                  <Mail size={18} aria-hidden="true" className="shrink-0 text-ocean" />
                  <a href={`mailto:${company.email}`} className="inline-block break-all py-1.5 text-muted hover:text-navy">
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
                  {company.city} — {company.state}, {t('Brasil')}
                </span>
              </p>
              {company.linkedin && (
                <p className="flex items-center gap-3.5">
                  <Linkedin size={18} aria-hidden="true" className="shrink-0 text-ocean" />
                  <a
                    href={company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block break-all py-1.5 text-muted hover:text-navy"
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
                  <h3 ref={successTitleRef} tabIndex={-1} className="mt-5 font-serif text-2xl font-semibold text-navy focus:outline-none">
                    {t('Solicitação pronta no WhatsApp')}
                  </h3>
                  <p className="mt-3 max-w-md text-muted">
                    {t('Os dados foram organizados em uma mensagem. Basta confirmar o envio na conversa aberta com a Mai.')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-8 rounded-md border border-border px-6 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-background"
                  >
                    {t('Enviar nova solicitação')}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="rounded-lg border border-border bg-white p-5 sm:p-7 md:p-9"
                >
                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    <Field label={t('Nome completo')} required error={errors.name?.message}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          type="text"
                          autoComplete="name"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={describedBy}
                          className={inputClass}
                          {...register('name')}
                        />
                      )}
                    </Field>
                    <Field label={t('Empresa')} required error={errors.companyName?.message}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          type="text"
                          autoComplete="organization"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.companyName}
                          aria-describedby={describedBy}
                          className={inputClass}
                          {...register('companyName')}
                        />
                      )}
                    </Field>
                    <Field label={t('Cargo')} required error={errors.role?.message}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          type="text"
                          autoComplete="organization-title"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.role}
                          aria-describedby={describedBy}
                          className={inputClass}
                          {...register('role')}
                        />
                      )}
                    </Field>
                    <Field label={t('Telefone / WhatsApp')} required error={errors.phone?.message}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          type="tel"
                          autoComplete="tel"
                          placeholder="(00) 00000-0000"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          aria-describedby={describedBy}
                          className={inputClass}
                          {...register('phone')}
                        />
                      )}
                    </Field>
                    <Field label={t('E-mail')} required error={errors.email?.message}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          type="email"
                          autoComplete="email"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={describedBy}
                          className={inputClass}
                          {...register('email')}
                        />
                      )}
                    </Field>
                    <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4">
                      <Field label={t('Cidade')} required error={errors.city?.message}>
                        {({ id, describedBy }) => (
                          <input
                            id={id}
                            type="text"
                            autoComplete="address-level2"
                            required
                            aria-required="true"
                            aria-invalid={!!errors.city}
                            aria-describedby={describedBy}
                            className={inputClass}
                            {...register('city')}
                          />
                        )}
                      </Field>
                      <Field label={t('Estado')} required error={errors.state?.message}>
                        {({ id, describedBy }) => (
                          <select
                            id={id}
                            autoComplete="address-level1"
                            required
                            aria-required="true"
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
                      label={t('Tipo de estabelecimento')}
                      required
                      error={errors.businessType?.message}
                    >
                      {({ id, describedBy }) => (
                        <select
                          id={id}
                          aria-invalid={!!errors.businessType}
                          required
                          aria-required="true"
                          aria-describedby={describedBy}
                          className={inputClass}
                          defaultValue=""
                          {...register('businessType')}
                        >
                          <option value="" disabled>
                            {t('Selecione…')}
                          </option>
                          {businessTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {t(type.label)}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <Field
                      label={t('Produto de interesse')}
                      required
                      error={errors.productInterest?.message}
                    >
                      {({ id, describedBy }) => (
                        <select
                          id={id}
                          aria-invalid={!!errors.productInterest}
                          required
                          aria-required="true"
                          aria-describedby={describedBy}
                          className={inputClass}
                          defaultValue=""
                          {...register('productInterest')}
                        >
                          <option value="" disabled>
                            {t('Selecione…')}
                          </option>
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {t(product.name)}
                            </option>
                          ))}
                          <option value="multiple">{t('Mais de um produto')}</option>
                        </select>
                      )}
                    </Field>
                  </div>

                  {/**
                   * Os três campos opcionais ficam recolhidos: no celular eles
                   * respondiam por quase um terço da altura do formulário e
                   * empurravam o botão de envio para muito longe.
                   */}
                  <details className="group mt-5 rounded-md border border-border bg-background">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-navy [&::-webkit-details-marker]:hidden">
                      {t('Detalhes da operação (opcional)')}
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className="shrink-0 text-ocean transition-transform duration-300 group-open:rotate-180"
                      />
                    </summary>
                    <div className="grid gap-4 border-t border-border px-4 py-4 sm:gap-5 md:grid-cols-2">
                      <Field label={t('Volume estimado (kg/mês)')} error={errors.volume?.message}>
                        {({ id }) => (
                          <input
                            id={id}
                            type="text"
                            placeholder={t('Ex.: 500 kg')}
                            className={inputClass}
                            {...register('volume')}
                          />
                        )}
                      </Field>
                      <Field label={t('Frequência de compra')} error={errors.frequency?.message}>
                        {({ id }) => (
                          <select
                            id={id}
                            className={inputClass}
                            defaultValue=""
                            {...register('frequency')}
                          >
                            <option value="">{t('Selecione…')}</option>
                            {frequencies.map((frequency) => (
                              <option key={frequency.id} value={frequency.id}>
                                {t(frequency.label)}
                              </option>
                            ))}
                          </select>
                        )}
                      </Field>
                      <div className="md:col-span-2">
                        <Field label={t('Mensagem')} error={errors.message?.message}>
                          {({ id }) => (
                            <textarea
                              id={id}
                              rows={3}
                              placeholder={t('Detalhes adicionais sobre a sua operação e necessidade')}
                              className={`${inputClass} resize-none`}
                              {...register('message')}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                  </details>

                  <div className="mt-6">
                    <div className="flex items-start gap-3 text-sm text-muted">
                      <input
                        id={consentId}
                        type="checkbox"
                        required
                        className="mt-0.5 h-4 w-4 accent-ocean"
                        aria-invalid={!!errors.consent}
                        aria-required="true"
                        aria-labelledby={`${consentLabelId} ${consentPolicyId}`}
                        aria-describedby={errors.consent ? consentErrorId : undefined}
                        {...register('consent')}
                      />
                      <span>
                        <label id={consentLabelId} htmlFor={consentId} className="cursor-pointer">
                          {t('Autorizo o uso dos dados informados para retorno desta solicitação e envio de propostas comerciais, conforme a')}
                          <span aria-hidden="true" className="text-nordic-red"> *</span>
                        </label>{' '}
                        <a
                          id={consentPolicyId}
                          href={localizedHref('/privacidade')}
                          className="font-medium text-ocean underline"
                        >
                          {t('Política de Privacidade')}
                        </a>
                        .
                      </span>
                    </div>
                    {errors.consent && (
                      <p id={consentErrorId} role="alert" className="mt-1.5 text-xs text-nordic-red">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="mt-5 rounded-md bg-nordic-red/10 px-4 py-3 text-sm text-nordic-red">
                      {t('Não foi possível enviar a solicitação. Tente novamente em instantes ou utilize outro canal de contato.')}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="mt-7 w-full rounded-md bg-navy py-4 font-semibold text-white transition-colors hover:bg-ocean disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? t('Preparando…') : t('Continuar pelo WhatsApp')}
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
