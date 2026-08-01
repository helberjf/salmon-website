/**
 * NORWELL AS — exportadora norueguesa de pescados representada no Brasil
 * pela fundadora desta empresa.
 *
 * Todas as informações abaixo são públicas e foram extraídas do site oficial
 * (https://www.norwell.no — páginas "Our story", "Our quality products" e
 * "Our certificates"). Ao atualizar, conferir a fonte antes de alterar números.
 */
export const norwell = {
  name: 'Norwell AS',
  site: 'https://www.norwell.no',
  certificatesUrl: 'https://www.norwell.no/our-certificates',
  tagline: 'Masters of seafood excellence',
  headquarters: 'Florø, Noruega',
  foundedYear: 1996,

  // Missão oficial da Norwell, em versão livre para o português.
  mission: 'Construímos parcerias de longo prazo que geram o máximo de valor.',
  missionOriginal: 'We build long term partnerships at maximum value.',

  intro:
    'Fundada em 1996 em Florø, na costa oeste da Noruega, a Norwell é uma exportadora de porte médio de salmão e truta noruegueses. Cerca de 70% do seu capital pertence aos próprios produtores e 30% a colaboradores-chave — um arranjo societário que aproxima quem cria o peixe de quem o exporta.',

  facts: [
    { value: '1996', label: 'Ano de fundação, em Florø, na costa oeste norueguesa' },
    { value: '≈70%', label: 'Do capital nas mãos dos próprios produtores; 30% com colaboradores-chave' },
    { value: '4', label: 'Bases comerciais: Florø, Aalborg, Londres e Kuala Lumpur' },
  ],

  offices: [
    { city: 'Florø', country: 'Noruega', role: 'Sede e operação de exportação' },
    { city: 'Aalborg', country: 'Dinamarca', role: 'Escritório de vendas' },
    { city: 'Londres', country: 'Reino Unido', role: 'Escritório de vendas' },
    { city: 'Kuala Lumpur', country: 'Malásia', role: 'Escritório de vendas' },
  ],

  // Portfólio da exportadora. Disponibilidade para o Brasil deve ser confirmada caso a caso.
  portfolio: [
    'Salmão do Atlântico fresco',
    'Salmão do Atlântico congelado',
    'Produtos de valor agregado (VAP)',
    'Truta do fiorde fresca',
    'Truta do fiorde congelada',
  ],

  /**
   * Certificações mantidas pela Norwell AS. Os certificados e suas validades
   * são publicados em norwell.no/our-certificates — por isso o site remete à
   * fonte em vez de fixar datas que envelhecem.
   */
  certifications: [
    {
      abbr: 'ASC',
      name: 'Aquaculture Stewardship Council',
      description: 'Padrão internacional de aquicultura responsável, com critérios ambientais e sociais auditados.',
    },
    {
      abbr: 'MSC',
      name: 'Marine Stewardship Council',
      description: 'Certificação de cadeia de custódia para pescado de origem sustentável e rastreável.',
    },
    {
      abbr: 'GLOBALG.A.P.',
      name: 'Good Agricultural Practices',
      description: 'Boas práticas de produção aplicadas à aquicultura, com foco em segurança do alimento.',
    },
    {
      abbr: 'Debio',
      name: 'Certificação orgânica norueguesa',
      description: 'Organismo oficial de certificação orgânica da Noruega, para as linhas que atendem ao padrão.',
    },
  ],
};

/**
 * VALORES — os três valores institucionais da Norwell AS (Respect, Trustworthy,
 * Competent), adotados também na representação comercial no Brasil.
 */
export const values = [
  {
    title: 'Respeito',
    original: 'Respect',
    description:
      'Tratar todas as pessoas com dignidade, dentro e fora da empresa — de quem cria o peixe a quem o recebe na cozinha.',
  },
  {
    title: 'Confiabilidade',
    original: 'Trustworthy',
    description:
      'Parcerias construídas sobre honestidade e sobre o cumprimento do que foi acordado, operação após operação.',
  },
  {
    title: 'Competência',
    original: 'Competent',
    description:
      'Conhecimento técnico e de mercado permanentemente atualizado, reconhecido pelo profissionalismo na condução de cada negócio.',
  },
];
