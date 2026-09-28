import { company } from '@/data/company';
import type { ContactInterest } from '@/utils/contactInterest';

export interface ContactPayload {
  interest: ContactInterest;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  businessType?: string;
  productInterest?: string;
  message?: string;
}

type Translate = (source: string, vars?: Record<string, string | number>) => string;

export function submitContact(
  data: ContactPayload,
  t: Translate = (source) => source,
): Promise<void> {
  const message = [
    data.interest === 'market'
      ? t('Olá, Mai! Gostaria de conversar sobre a entrada da minha empresa no mercado brasileiro.')
      : t('Olá, Mai! Gostaria de solicitar uma cotação de salmão norueguês.'),
    '',
    `${t('Nome')}: ${data.name}`,
    `${t('Empresa')}: ${data.companyName}`,
    `${t('E-mail')}: ${data.email}`,
    `${t('Telefone')}: ${data.phone}`,
    data.businessType ? `${t('Tipo de operação')}: ${data.businessType}` : '',
    data.productInterest ? `${t('Produto')}: ${data.productInterest}` : '',
    data.message ? `${t('Observações')}: ${data.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const number = company.whatsapp.replace(/\D/g, '');
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  // Com o recurso "noopener" o window.open sempre devolve null, e a página também
  // era redirecionada. Abre normalmente e corta o vínculo com a aba nova.
  const opened = window.open(url, '_blank');
  if (opened) opened.opener = null;
  else window.location.href = url;
  return Promise.resolve();
}
