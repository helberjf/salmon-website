import type { Product } from '@/types';

/**
 * PRODUTOS — estrutura editável.
 * Ajustar nomes, descrições, imagens e disponibilidade conforme o portfólio real.
 */
export const products: Product[] = [
  {
    id: 'inteiro',
    name: 'Salmão Inteiro',
    description:
      'Peixe inteiro eviscerado, ideal para operações com processamento próprio e vitrines de alto padrão.',
    preservation: 'Resfriado',
    presentation: 'Inteiro eviscerado, calibres variados',
    audience: 'Peixarias e restaurantes de grande volume',
    image:
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Pescados frescos dispostos sobre gelo em bancada',
  },
  {
    id: 'file',
    name: 'Filé de Salmão',
    description:
      'Filé limpo, com padronização de corte e rendimento previsível para a cozinha profissional.',
    preservation: 'Resfriado ou congelado',
    presentation: 'Filé com ou sem pele',
    audience: 'Restaurantes, sushi bars e chefs',
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Filé de salmão servido em prato escuro',
  },
  {
    id: 'porcoes',
    name: 'Porções Padronizadas',
    description:
      'Cortes em gramatura definida, que reduzem perdas e agilizam o serviço em operações de escala.',
    preservation: 'Resfriado ou congelado',
    presentation: 'Porções em gramatura sob especificação',
    audience: 'Hotéis, catering e food service',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Porção de salmão empratada em restaurante',
  },
  {
    id: 'congelado',
    name: 'Linha Congelada',
    description:
      'Produtos congelados para maior prazo de validade e planejamento de estoque com segurança.',
    preservation: 'Congelado (-18 °C)',
    presentation: 'Filés e porções congeladas',
    audience: 'Distribuidores, atacadistas e indústria',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Armazém logístico com estoque organizado',
  },
  {
    id: 'distribuidores',
    name: 'Fornecimento para Distribuição',
    description:
      'Estruturação de volume, paletização e logística para quem abastece redes e regiões inteiras.',
    preservation: 'Conforme a operação',
    presentation: 'Volumes e formatos sob demanda',
    audience: 'Grandes distribuidores e redes',
    image:
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Navio cargueiro com contêineres em porto internacional',
  },
];
