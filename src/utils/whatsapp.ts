import { company } from '@/data/company';

/** Indica se o número de WhatsApp já foi configurado em src/data/company.ts. */
export const hasWhatsApp = company.whatsapp.replace(/\D/g, '').length > 0;

/** Monta o link wa.me com a mensagem padrão pré-preenchida. */
export function whatsAppLink(): string {
  const number = company.whatsapp.replace(/\D/g, '');
  const text = encodeURIComponent(company.whatsappMessage);
  return `https://wa.me/${number}?text=${text}`;
}
