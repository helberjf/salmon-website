/**
 * ENVIO DO FORMULÁRIO DE CONTATO
 *
 * Hoje o envio é simulado (não há backend). Para integrar uma API real:
 *  1. Substitua o corpo desta função por um fetch/POST para o seu endpoint
 *     (ex.: Formspree, Resend, ou uma rota própria no servidor da VPS).
 *  2. Lance um erro em caso de falha — o formulário já exibe a mensagem
 *     de erro e mantém os dados preenchidos.
 *
 * Exemplo com endpoint próprio:
 *   const res = await fetch('/api/contato', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(data),
 *   });
 *   if (!res.ok) throw new Error('Falha no envio');
 */
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

export async function submitContact(data: ContactPayload): Promise<void> {
  // Simulação de latência de rede — remover ao integrar a API real.
  await new Promise((resolve) => setTimeout(resolve, 1200));
  if (import.meta.env.DEV) {
    console.info('[contato] dados prontos para envio à API:', data);
  }
}
