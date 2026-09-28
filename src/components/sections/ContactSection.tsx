import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/data/company';
import { products } from '@/data/products';
import { submitContact } from '@/utils/submitContact';
import { hasWhatsApp, whatsAppLink } from '@/utils/whatsapp';
import {
  CONTACT_INTEREST_EVENT,
  readContactInterest,
  type ContactInterest,
} from '@/utils/contactInterest';
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton';
import { useI18n } from '@/i18n/I18nProvider';

const interests: { id: ContactInterest; label: string; hint: string }[] = [
  { id: 'salmon', label: 'Cotação de salmão', hint: 'Importadores, atacadistas e distribuidores' },
  { id: 'market', label: 'Entrada no mercado brasileiro', hint: 'Empresas norueguesas que querem atuar no Brasil' },
];

// Importadores, atacadistas e distribuidores primeiro: são o foco da operação.
const businessTypes = [
  { id: 'importer', label: 'Importador' },
  { id: 'distribution', label: 'Distribuidor / Atacadista' },
  { id: 'retail', label: 'Supermercado / Empório' },
  { id: 'food-service', label: 'Food service' },
  { id: 'other', label: 'Outro' },
];

type Translate = (source: string, vars?: Record<string, string | number>) => string;

/**
 * Só o essencial para a Mai responder: quem é, como falar com a pessoa e, na
 * cotação, o tipo de empresa e o produto. O resto (volume, frequência, cidade)
 * cabe na mensagem opcional, para o formulário não ficar comprido.
 */
const createFormSchema = (t: Translate) =>
  z
    .object({
      interest: z.enum(['salmon', 'market']),
      name: z.string().trim().min(2, t('Informe seu nome completo')),
      companyName: z.string().trim().min(2, t('Informe o nome da empresa')),
      email: z.string().trim().email(t('Informe um e-mail válido')),
      phone: z.string().trim().min(8, t('Informe um telefone com DDD ou código do país')),
      businessType: z.string().optional(),
      productInterest: z.string().optional(),
      message: z.string().optional(),
      consent: z.boolean().refine((value) => value, t('É necessário autorizar o contato')),
    })
    .superRefine((data, context) => {
      if (data.interest !== 'salmon') return;
      if (!data.businessType) {
        context.addIssue({ code: 'custom', path: ['businessType'], message: t('Selecione o tipo de empresa') });
      }
      if (!data.productInterest) {
        context.addIssue({ code: 'custom', path: ['productInterest'], message: t('Selecione o produto de interesse') });
      }
    });

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

const inputClass =
  'w-full rounded-md border border-border bg-white px-4 py-2.5 text-navy placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-ocean aria-[invalid=true]:border-nordic-red sm:py-3';

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
  const interestId = useId();
  const formSchema = useMemo(() => createFormSchema(t), [language, t]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors, submitCount },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { interest: readContactInterest(), consent: false },
  });
  const interest = watch('interest');

  useEffect(() => {
    if (submitCount > 0) void trigger();
  }, [language, submitCount, trigger]);

  useEffect(() => {
    if (status === 'success') successTitleRef.current?.focus();
  }, [status]);

  // Um botão "Fale com a Bridge Point" ou "Solicitar cotação" na própria página troca o assunto.
  useEffect(() => {
    const onInterest = (event: Event) => {
      const next = (event as CustomEvent<ContactInterest>).detail;
      setValue('interest', next, { shouldValidate: submitCount > 0 });
      setStatus((current) => (current === 'success' ? 'idle' : current));
    };
    window.addEventListener(CONTACT_INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(CONTACT_INTEREST_EVENT, onInterest);
  }, [setValue, submitCount]);

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
      const businessType = businessTypes.find((item) => item.id === data.businessType);
      const product = products.find((item) => item.id === data.productInterest);
      const isQuote = data.interest === 'salmon';
      await submitContact(
        {
          interest: data.interest,
          name: data.name,
          companyName: data.companyName,
          email: data.email,
          phone: data.phone,
          businessType: isQuote && businessType ? t(businessType.label) : undefined,
          productInterest: !isQuote
            ? undefined
            : data.productInterest === 'multiple'
              ? t('Mais de um produto')
              : product
                ? t(product.name)
                : undefined,
          message: data.message?.trim() || undefined,
        },
        t,
      );
      setStatus('success');
      reset({ interest: data.interest, consent: false });
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
      {/**
       * No celular o formulário vem logo depois do título, para quem clica em
       * "Contato" cair direto nele; os outros canais ficam abaixo. No desktop
       * eles ocupam a coluna da esquerda, ao lado do formulário.
       */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-8 lg:px-8">
        <div className="lg:col-start-1 lg:row-start-1">
          <SectionHeading
            eyebrow={t('Contato')}
            title={t('Como podemos ajudar?')}
            description={t('Escolha o assunto e deixe seus dados. A mensagem segue pronta para o WhatsApp da Mai, que responde pessoalmente.')}
          />
        </div>

        <div className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <Reveal delay={0.1}>
            {status === 'success' ? (
              <div
                role="status"
                className="flex h-full flex-col items-center justify-center rounded-lg border border-border bg-white px-8 py-20 text-center"
              >
                <CheckCircle2 size={44} aria-hidden="true" className="text-ocean" />
                <h3 ref={successTitleRef} tabIndex={-1} className="mt-5 text-2xl font-light text-navy focus:outline-none">
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
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-navy">{t('Assunto')}</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {interests.map((option) => (
                      <label
                        key={option.id}
                        className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-ocean/40 has-[:checked]:border-ocean has-[:checked]:bg-ice"
                      >
                        {/* Nome acessível só com o título; o texto de apoio vira descrição. */}
                        <input
                          type="radio"
                          value={option.id}
                          aria-labelledby={`${interestId}-${option.id}`}
                          aria-describedby={`${interestId}-${option.id}-hint`}
                          className="mt-0.5 h-5 w-5 shrink-0 accent-ocean"
                          {...register('interest')}
                        />
                        <span>
                          <span id={`${interestId}-${option.id}`} className="block text-sm font-semibold text-navy">
                            {t(option.label)}
                          </span>
                          <span
                            id={`${interestId}-${option.id}-hint`}
                            className="mt-0.5 block text-xs leading-relaxed text-muted"
                          >
                            {t(option.hint)}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-5 grid gap-4 sm:gap-5 md:grid-cols-2">
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
                  <Field label={t('Telefone / WhatsApp')} required error={errors.phone?.message}>
                    {({ id, describedBy }) => (
                      <input
                        id={id}
                        type="tel"
                        autoComplete="tel"
                        placeholder="+55 21 90000-0000"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={describedBy}
                        className={inputClass}
                        {...register('phone')}
                      />
                    )}
                  </Field>

                  {interest === 'salmon' && (
                    <>
                      <Field label={t('Tipo de empresa')} required error={errors.businessType?.message}>
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
                      <Field label={t('Produto de interesse')} required error={errors.productInterest?.message}>
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
                    </>
                  )}

                  <div className="md:col-span-2">
                    <Field label={t('Mensagem (opcional)')} error={errors.message?.message}>
                      {({ id }) => (
                        <textarea
                          id={id}
                          rows={3}
                          placeholder={
                            interest === 'salmon'
                              ? t('Volume estimado, frequência de compra e cidade de entrega, se já souber.')
                              : t('Conte sobre a sua empresa e o que procura no Brasil.')
                          }
                          className={`${inputClass} resize-none`}
                          {...register('message')}
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-start gap-3 text-sm text-muted">
                    <input
                      id={consentId}
                      type="checkbox"
                      required
                      className="h-6 w-6 shrink-0 accent-ocean sm:mt-0.5 sm:h-5 sm:w-5"
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

        <div className="lg:col-start-1 lg:row-start-2">
          {hasWhatsApp && (
            <Reveal delay={0.05}>
              {/* Atalho para quem prefere uma conversa rápida a preencher o formulário. */}
              <a
                href={whatsAppLink(t(company.whatsappMessage))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-ocean px-6 py-3.5 text-sm font-bold text-ocean transition-colors hover:bg-ocean hover:text-white sm:w-auto"
              >
                <WhatsAppIcon size={18} />
                {t('Conversar pelo WhatsApp')}
              </a>
            </Reveal>
          )}
          <Reveal delay={0.1} className="mt-8 space-y-5 text-sm">
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
                <a
                  href={`tel:+${company.phone.replace(/\D/g, '')}`}
                  className="inline-block py-1.5 text-muted hover:text-navy"
                >
                  {company.phone}
                </a>
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
      </div>
    </section>
  );
}
