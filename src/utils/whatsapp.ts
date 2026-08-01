import { company } from '@/data/company';

/** Indica se o número de WhatsApp já foi configurado em src/data/company.ts. */
export const hasWhatsApp = company.whatsapp.replace(/\D/g, '').length > 0;

/** Monta o link wa.me com uma mensagem localizada pré-preenchida. */
export function whatsAppLink(message = company.whatsappMessage): string {
  const number = company.whatsapp.replace(/\D/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}
