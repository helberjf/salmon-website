import type { Audience } from '@/types';

/**
 * O foco da operação são os importadores que atuam como atacadistas e
 * distribuidores (os três primeiros). Os demais compram em escala e costumam
 * ser abastecidos por eles.
 */
export const audiences: Audience[] = [
  {
    title: 'Importadores',
    description:
      'Importação direta da Norwell, com especificação, documentação de origem e programação de embarques definidas com a exportadora.',
  },
  {
    title: 'Atacadistas',
    description:
      'Volumes regulares e condições comerciais para quem revende salmão norueguês em escala.',
  },
  {
    title: 'Distribuidores',
    description:
      'Calibres, frequência e logística planejados para abastecer varejo, peixarias e food service.',
  },
  {
    title: 'Supermercados e empórios',
    description:
      'Produto com procedência clara e apelo de vitrine para o varejo que atende consumidores exigentes.',
  },
  {
    title: 'Processadores e indústria',
    description:
      'Matéria-prima com calibre e qualidade constantes para porcionamento, defumação e produtos de valor agregado.',
  },
  {
    title: 'Food service',
    description:
      'Fornecimento regular para redes de restaurantes, hotéis e catering que dependem de padrão de corte e volume previsível.',
  },
];
