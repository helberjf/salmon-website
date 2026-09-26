import type { CareerEntry } from '@/types';

/**
 * DADOS DA FUNDADORA — a apresentação (`bio`) é o texto da própria Mai no
 * site-base da Bridge Point; a trajetória segue o perfil público do LinkedIn
 * (linkedin.com/in/mai-tonheim-iam). Manter descrições fiéis aos cargos reais.
 */
export const founder = {
  name: 'Mai Sissel Tonheim',
  title: 'Fundadora da Bridge Point · Representante da Norwell no Brasil',
  /** Recorte com fundo transparente (site-base da Bridge Point), exibido em /sobre#mai. */
  photo: {
    src: '/images/people/mai-tonheim-flags.webp',
    alt: 'Mai Sissel Tonheim sentada à mesa, entre as bandeiras da Noruega e do Brasil',
  },
  /** Retrato recortado usado no convite final de /sobre. */
  ctaPhoto: {
    src: '/images/people/mai-tonheim-rio.webp',
    alt: 'Mai Sissel Tonheim sorrindo, apoiada em uma mesa',
  },
  gallery: [
    {
      src: '/images/people/mai-tonheim-consulate.jpg',
      alt: 'Cartaz da Hydrogen Expo South America 2025 com Mai Tonheim como palestrante do painel internacional',
      caption: 'Painel internacional da Hydrogen Expo South America, Rio de Janeiro, junho de 2025',
      frame: '4/5',
    },
    {
      src: '/images/people/mai-tonheim-norway-brazil.jpg',
      alt: 'Retrato editorial em preto e branco de Mai Tonheim para a campanha Noruega no Brasil',
      caption: 'Atuação institucional no Consulado-Geral Real da Noruega no Rio de Janeiro',
      frame: '4/5',
    },
    {
      src: '/images/people/mai-tonheim-salmon-preparation.jpg',
      alt: 'Mai Tonheim, em traje tradicional norueguês, cortando um filé de salmão durante uma apresentação',
      caption: 'Demonstração do produto e da cultura norueguesa em ação',
      frame: '3/4',
    },
    {
      src: '/images/people/mai-tonheim-salmon-presentation.jpg',
      alt: 'Mai Tonheim, em traje tradicional norueguês, segurando uma bandeja com porções de salmão no estande Salmão da Noruega',
      caption: 'Apresentação e degustação de salmão norueguês em uma ação cultural no Brasil',
      frame: '3/4',
    },
  ],
  linkedin: 'https://www.linkedin.com/in/mai-tonheim-iam/',
  profileHeadline: 'Experiência internacional. Conhecimento local. Relações construídas com confiança.',
  /** Texto de apresentação escrito pela Mai para o site-base da Bridge Point. */
  bio: [
    'Norueguesa e radicada no Rio de Janeiro, Mai construiu uma trajetória de quase 20 anos na diplomacia norueguesa, com atuação no Ministério das Relações Exteriores da Noruega e experiência em diferentes países e contextos internacionais. Entre 2021 e 2025, atuou como vice-cônsul geral da Noruega no Rio de Janeiro.',
    'Ao longo dessa trajetória, desenvolveu experiência em relações institucionais, comunicação estratégica, negociação e cooperação internacional. Foi dessa experiência que nasceu a Bridge Point.',
    'Hoje, Mai aplica esse conhecimento ao desenvolvimento de negócios, apoiando empresas norueguesas que precisam compreender o mercado brasileiro, estabelecer as conexões certas e conduzir oportunidades com continuidade — estar presente não apenas para fazer uma conexão, mas para ajudá-la a avançar comercialmente.',
  ],
  focusAreas: [
    'Entrada no mercado brasileiro',
    'ESG e parcerias estratégicas',
    'Seafood norueguês no Brasil',
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
