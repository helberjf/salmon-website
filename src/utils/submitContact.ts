import { company } from '@/data/company';

export interface ContactPayload {
  name: string;
  companyName: string;
  role: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  businessType: string;
  productInterest: string;
  volume?: string;
  frequency?: string;
  message?: string;
}

type Translate = (source: string, vars?: Record<string, string | number>) => string;

export function submitContact(
  data: ContactPayload,
  t: Translate = (source) => source,
): Promise<void> {
  const message = [
    t('Olá, Mai! Gostaria de solicitar uma cotação de salmão norueguês.'),
    '',
    `${t('Nome')}: ${data.name}`,
    `${t('Empresa')}: ${data.companyName}`,
    `${t('Cargo')}: ${data.role}`,
    `${t('E-mail')}: ${data.email}`,
    `${t('Telefone')}: ${data.phone}`,
    `${t('Local')}: ${data.city}/${data.state}`,
    `${t('Tipo de operação')}: ${data.businessType}`,
    `${t('Produto')}: ${data.productInterest}`,
    data.volume ? `${t('Volume estimado')}: ${data.volume}` : '',
    data.frequency ? `${t('Frequência')}: ${data.frequency}` : '',
    data.message ? `${t('Observações')}: ${data.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const number = company.whatsapp.replace(/\D/g, '');
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = url;
  return Promise.resolve();
}
