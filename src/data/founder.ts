import type { CareerEntry } from '@/types';

/**
 * DADOS DA FUNDADORA — baseados no perfil público do LinkedIn
 * (linkedin.com/in/mai-tonheim-iam). Manter descrições fiéis aos cargos reais.
 */
export const founder = {
  name: 'Mai Tonheim',
  title: 'Representante da Norwell no Brasil',
  // Foto profissional — substituir pela fotografia oficial quando disponível.
  // Enquanto vazio, o site exibe um monograma elegante no lugar da imagem.
  photo: '',
  linkedin: 'https://www.linkedin.com/in/mai-tonheim-iam/',
  headline: 'Conectando a excelência norueguesa às oportunidades do mercado brasileiro',
  profileHeadline:
    'Entrada no mercado, ESG e parcerias estratégicas entre a Noruega e o Brasil',
  shortSummary:
    'Mai Tonheim conecta a expertise em seafood norueguês às oportunidades do mercado brasileiro, combinando experiência em entrada no mercado, ESG e construção de parcerias estratégicas.',
  focusAreas: [
    'Entrada no mercado brasileiro',
    'ESG e parcerias estratégicas',
    'Seafood norueguês no Brasil',
  ],
  summary: [
    'Mai Tonheim é norueguesa, radicada no Rio de Janeiro, e dedicou quase duas décadas ao Serviço Exterior da Noruega, no qual ingressou em 2007. Entre 2021 e 2025, foi Cônsul e Vice-Chefe de Missão do Consulado-Geral Real da Noruega no Rio de Janeiro, com atuação dedicada à promoção de negócios noruegueses e ao apoio a investimentos no Brasil.',
    'Sua trajetória inclui postos diplomáticos na Itália e no Líbano, a Academia Diplomática do Ministério das Relações Exteriores da Noruega, em Oslo, e o Escritório das Nações Unidas sobre Drogas e Crime (UNODC), em Viena. Representou a Noruega na OCDE em grupos sobre conduta empresarial responsável.',
    'Hoje, aplica essa experiência ao setor de produtos do mar. Como Representante no Brasil da Norwell AS, trabalha na introdução do salmão norueguês no mercado brasileiro — a ponte comercial que esta empresa materializa.',
  ],
  education: [
    {
      degree: 'MSc em Violence, Conflict and Development',
      institution: 'SOAS University of London',
    },
    {
      degree: 'Português intensivo',
      institution: 'Pontifícia Universidade Católica (PUC)',
    },
  ],
  languagesNote:
    'Poliglota: norueguês, inglês, português, árabe e albanês estão entre os sete idiomas do seu perfil profissional.',
  career: [
    {
      period: '2025 — atual',
      role: 'Representante no Brasil',
      organization: 'Norwell AS',
      location: 'Rio de Janeiro, Brasil',
      description:
        'Representação comercial da exportadora norueguesa de pescados no mercado brasileiro, com foco na introdução do salmão norueguês junto a importadores, distribuidores e varejo.',
    },
    {
      period: '2025 — atual',
      role: 'Membro do Conselho de Administração',
      organization: 'BMV Global',
      location: 'Rio de Janeiro, Brasil',
      description:
        'Orientação estratégica em ESG, valoração de capital natural e finanças voltadas à natureza, com apoio a governança e parcerias internacionais.',
    },
    {
      period: '2021 — 2025',
      role: 'Cônsul e Vice-Chefe de Missão',
      organization: 'Consulado-Geral Real da Noruega no Rio de Janeiro',
      location: 'Rio de Janeiro, Brasil',
      description:
        'Fortalecimento das relações bilaterais, promoção dos interesses noruegueses e apoio ao desenvolvimento de negócios sustentáveis no Brasil.',
    },
    {
      period: '2018 — 2021',
      role: 'Assessora Sênior — Academia Diplomática',
      organization: 'Ministério das Relações Exteriores da Noruega',
      location: 'Oslo, Noruega',
      description:
        'Desenvolvimento de programas de formação para o corpo diplomático norueguês, com ênfase em capacitação e segurança em ambientes de risco.',
    },
    {
      period: '2015 — 2018',
      role: 'Diplomata',
      organization: 'Embaixada Real da Noruega em Roma',
      location: 'Roma, Itália',
      description:
        'Relações bilaterais Noruega–Itália, promoção dos interesses comerciais noruegueses, comunicação institucional e análise política.',
    },
    {
      period: '2014 — 2015',
      role: 'Assessora — Assuntos Econômicos e Comerciais',
      organization: 'Ministério das Relações Exteriores da Noruega',
      location: 'Oslo, Noruega',
      description:
        'Promoção do comércio norueguês na América do Sul e representação da Noruega na OCDE em grupos sobre conduta empresarial responsável.',
    },
    {
      period: '2010 — 2012',
      role: 'Vice-Chefe de Missão',
      organization: 'Embaixada Real da Noruega no Líbano',
      location: 'Beirute, Líbano',
      description:
        'Gestão da equipe da embaixada como encarregada de negócios interina e administração de portfólio de cooperação e assistência técnica.',
    },
    {
      period: '2004 — 2007',
      role: 'Associate Expert',
      organization: 'UNODC — Nações Unidas',
      location: 'Viena, Áustria',
      description:
        'Programas internacionais de combate à corrupção e ao crime organizado transnacional, incluindo coautoria de guia legislativo da ONU.',
    },
    {
      period: '2000 — 2002',
      role: 'Analista e Intérprete',
      organization: 'Forças Armadas da Noruega',
      location: 'Noruega',
      description:
        'Atuação como analista e intérprete de albanês e árabe no Comando de Defesa da Noruega.',
    },
  ] satisfies CareerEntry[],
};
