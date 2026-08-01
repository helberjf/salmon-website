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

export function submitContact(data: ContactPayload): Promise<void> {
  const message = [
    'Olá, Mai! Gostaria de solicitar uma cotação de salmão norueguês.',
    '',
    `Nome: ${data.name}`,
    `Empresa: ${data.companyName}`,
    `Cargo: ${data.role}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.phone}`,
    `Local: ${data.city}/${data.state}`,
    `Tipo de operação: ${data.businessType}`,
    `Produto: ${data.productInterest}`,
    data.volume ? `Volume estimado: ${data.volume}` : '',
    data.frequency ? `Frequência: ${data.frequency}` : '',
    data.message ? `Observações: ${data.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const number = company.whatsapp.replace(/\D/g, '');
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = url;
  return Promise.resolve();
}
