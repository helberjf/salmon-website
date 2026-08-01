import type { Product } from '@/types';

/**
 * PRODUTOS — estrutura editável.
 * Ajustar nomes, descrições, imagens e disponibilidade conforme o portfólio real.
 */
export const products: Product[] = [
  {
    id: 'hog',
    name: 'Salmão inteiro HOG',
    description:
      'Salmão Atlântico de cultivo, eviscerado e com cabeça, para operações que valorizam flexibilidade de corte e rendimento.',
    preservation: 'Fresco ou congelado',
    presentation: 'Calibres de 3–4 kg a +9 kg',
    audience: 'Distribuidores, peixarias e processamento',
    image: '/images/catalog/salmon-whole.webp',
    imageAlt: 'Salmões inteiros sobre gelo',
  },
  {
    id: 'filets',
    name: 'Lombo e filés',
    description:
      'Filés pré-rigor, com pele, sem espinhas e corte D-trim. Outros trims podem ser desenvolvidos conforme a operação.',
    preservation: 'Congelado · IVP',
    presentation: 'Faixas de 1,0–1,4 kg a 1,8–2,2 kg',
    audience: 'Restaurantes, sushi bars, hotéis e varejo',
    image: '/images/catalog/salmon-fillet.webp',
    imageAlt: 'Lombo de salmão norueguês sobre gelo',
  },
  {
    id: 'portions',
    name: 'Porções IVP',
    description:
      'Porções padronizadas, sem pele e sem espinhas, pensadas para controle de custo, agilidade e consistência no serviço.',
    preservation: 'Congelado · IVP',
    presentation: '125 g · caixas de 3, 5 ou 10 kg',
    audience: 'Food service, catering e private label',
    image: '/images/catalog/salmon-portions.webp',
    imageAlt: 'Quatro porções padronizadas de salmão sobre gelo',
  },
  {
    id: 'smoked',
    name: 'Defumado e gravlax',
    description:
      'Filé defumado a quente, fatiados e gravlax curado para aplicações de alto valor agregado e consumo imediato.',
    preservation: 'Congelado',
    presentation: '100 g, 200 g ou filés de 900 g–1,2 kg',
    audience: 'Empórios, hotéis, varejo e alta gastronomia',
    image: '/images/catalog/salmon-smoked.webp',
    imageAlt: 'Fatias de salmão defumado sobre gelo',
  },
];
