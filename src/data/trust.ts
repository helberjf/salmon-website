import type { Testimonial, FaqItem } from '@/types';

/**
 * PROVA DE CONFIANÇA — apenas informações reais.
 * Depoimentos e logotipos de clientes só devem ser adicionados com autorização.
 */

// Participações reais em eventos do setor (fonte: atividade pública no LinkedIn).
export const industryPresence = [
  {
    event: 'APAS Show',
    location: 'São Paulo, Brasil',
    note: 'Apresentação do salmão da Noruega ao varejo e à distribuição brasileira.',
  },
  {
    event: 'Seafood Expo Global',
    location: 'Barcelona, Espanha',
    note: 'Participação na maior feira mundial de pescados, ao lado do setor exportador norueguês.',
  },
];

// Compromissos institucionais exibidos na seção de confiança.
export const commitments = [
  {
    title: 'Procedência documentada',
    description:
      'Produto de origem norueguesa com cadeia de fornecimento identificada e documentação de cada operação.',
  },
  {
    title: 'Comunicação direta',
    description:
      'Interlocução próxima e sem intermediários desnecessários, do primeiro contato ao pós-entrega.',
  },
  {
    title: 'Condições claras',
    description:
      'Propostas objetivas, com escopo, prazos e responsabilidades definidos por escrito.',
  },
];

// Depoimentos — preencher somente com citações reais e autorizadas.
export const testimonials: Testimonial[] = [];

// Perguntas frequentes — estrutura pronta para uso futuro.
export const faqs: FaqItem[] = [];
