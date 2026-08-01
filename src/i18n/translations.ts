export const supportedLanguages = ['pt', 'en', 'es', 'no'] as const;

export type Language = (typeof supportedLanguages)[number];
export type LanguagePreference = 'system' | Language;
export type TranslationVariables = Record<string, string | number>;

type LocalizedText = Record<Exclude<Language, 'pt'>, string>;

export const htmlLanguageTags: Record<Language, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
  no: 'nb-NO',
};

/**
 * The Portuguese copy currently present in the website is the translation key.
 * This keeps migration incremental: components can wrap existing copy with t()
 * without first introducing a parallel key taxonomy.
 */
export const translations: Record<string, LocalizedText> = {
  // Language selector
  Sistema: { en: 'System', es: 'Sistema', no: 'System' },
  'Idioma do sistema': { en: 'System language', es: 'Idioma del sistema', no: 'Systemspråk' },
  'Selecionar idioma': { en: 'Select language', es: 'Seleccionar idioma', no: 'Velg språk' },

  // Metadata and company-level copy
  'Nordic Salmon | Salmão Norueguês B2B no Brasil': {
    en: 'Nordic Salmon | Norwegian Salmon B2B in Brazil',
    es: 'Nordic Salmon | Salmón noruego B2B en Brasil',
    no: 'Nordic Salmon | Norsk laks for bedriftsmarkedet i Brasil',
  },
  'Nordic Salmon | Salmão Norueguês para o Mercado Brasileiro': {
    en: 'Nordic Salmon | Norwegian Salmon for the Brazilian Market',
    es: 'Nordic Salmon | Salmón noruego para el mercado brasileño',
    no: 'Nordic Salmon | Norsk laks for det brasilianske markedet',
  },
  'Salmão Norueguês para o Mercado Brasileiro': {
    en: 'Norwegian Salmon for the Brazilian Market',
    es: 'Salmón noruego para el mercado brasileño',
    no: 'Norsk laks for det brasilianske markedet',
  },
  'Política de Privacidade | Nordic Salmon': {
    en: 'Privacy Policy | Nordic Salmon',
    es: 'Política de Privacidad | Nordic Salmon',
    no: 'Personvernerklæring | Nordic Salmon',
  },
  'Termos de Uso | Nordic Salmon': {
    en: 'Terms of Use | Nordic Salmon',
    es: 'Términos de Uso | Nordic Salmon',
    no: 'Bruksvilkår | Nordic Salmon',
  },
  'Sobre Mai Tonheim | Nordic Salmon': {
    en: 'About Mai Tonheim | Nordic Salmon',
    es: 'Sobre Mai Tonheim | Nordic Salmon',
    no: 'Om Mai Tonheim | Nordic Salmon',
  },
  'Página não encontrada | Nordic Salmon': {
    en: 'Page not found | Nordic Salmon',
    es: 'Página no encontrada | Nordic Salmon',
    no: 'Siden ble ikke funnet | Nordic Salmon',
  },
  'Representação comercial e fornecimento B2B de salmão norueguês no Brasil, em conexão direta com a exportadora Norwell. Produtos frescos, congelados e sob medida.': {
    en: 'Commercial representation and B2B supply of Norwegian salmon in Brazil, directly connected to exporter Norwell. Fresh, frozen and tailor-made products.',
    es: 'Representación comercial y suministro B2B de salmón noruego en Brasil, en conexión directa con la exportadora Norwell. Productos frescos, congelados y a medida.',
    no: 'Kommersiell representasjon og B2B-leveranser av norsk laks i Brasil, i direkte kontakt med eksportøren Norwell. Ferske, fryste og skreddersydde produkter.',
  },
  'Representação comercial e fornecimento B2B de salmão norueguês no Brasil, em conexão direta com a exportadora Norwell.': {
    en: 'Commercial representation and B2B supply of Norwegian salmon in Brazil, directly connected to exporter Norwell.',
    es: 'Representación comercial y suministro B2B de salmón noruego en Brasil, en conexión directa con la exportadora Norwell.',
    no: 'Kommersiell representasjon og B2B-leveranser av norsk laks i Brasil, i direkte kontakt med eksportøren Norwell.',
  },
  'Importação e fornecimento de salmão norueguês com procedência, conhecimento internacional e atendimento comercial personalizado.': {
    en: 'Norwegian salmon imports and supply backed by traceable origin, international expertise and personalised commercial service.',
    es: 'Importación y suministro de salmón noruego con origen trazable, experiencia internacional y atención comercial personalizada.',
    no: 'Import og levering av norsk laks med dokumentert opprinnelse, internasjonal kompetanse og personlig kommersiell oppfølging.',
  },
  'Importação e fornecimento de salmão norueguês para o mercado brasileiro.': {
    en: 'Import and supply of Norwegian salmon for the Brazilian market.',
    es: 'Importación y suministro de salmón noruego para el mercado brasileño.',
    no: 'Import og levering av norsk laks til det brasilianske markedet.',
  },
  'Salmão norueguês': { en: 'Norwegian salmon', es: 'Salmón noruego', no: 'Norsk laks' },
  'Comércio internacional': {
    en: 'International trade',
    es: 'Comercio internacional',
    no: 'Internasjonal handel',
  },
  'Distribuição de pescados': {
    en: 'Seafood distribution',
    es: 'Distribución de productos del mar',
    no: 'Distribusjon av sjømat',
  },
  'Atendimento comercial B2B em todo o Brasil': {
    en: 'B2B commercial service throughout Brazil',
    es: 'Atención comercial B2B en todo Brasil',
    no: 'B2B-salgsoppfølging i hele Brasil',
  },
  Brasil: { en: 'Brazil', es: 'Brasil', no: 'Brasil' },
  'Olá, Mai! Conheci a Nordic Salmon pelo website e gostaria de conversar sobre o fornecimento de salmão norueguês para a minha empresa.': {
    en: 'Hello, Mai! I found Nordic Salmon through the website and would like to discuss supplying Norwegian salmon to my company.',
    es: '¡Hola, Mai! Conocí Nordic Salmon a través del sitio web y me gustaría conversar sobre el suministro de salmón noruego para mi empresa.',
    no: 'Hei, Mai! Jeg fant Nordic Salmon via nettstedet og ønsker å snakke om levering av norsk laks til selskapet mitt.',
  },

  // Navigation and shared layout
  'Quem somos': { en: 'About us', es: 'Quiénes somos', no: 'Om oss' },
  Sobre: { en: 'About', es: 'Acerca de', no: 'Om' },
  Origem: { en: 'Origin', es: 'Origen', no: 'Opprinnelse' },
  Produtos: { en: 'Products', es: 'Productos', no: 'Produkter' },
  Galeria: { en: 'Gallery', es: 'Galería', no: 'Galleri' },
  Processo: { en: 'Process', es: 'Proceso', no: 'Prosess' },
  'Nordic Salmon — voltar ao início': {
    en: 'Nordic Salmon — back to the beginning',
    es: 'Nordic Salmon — volver al inicio',
    no: 'Nordic Salmon — tilbake til starten',
  },
  'Navegação principal': {
    en: 'Main navigation',
    es: 'Navegación principal',
    no: 'Hovednavigasjon',
  },
  'Navegação principal (celular)': {
    en: 'Main navigation (mobile)',
    es: 'Navegación principal (móvil)',
    no: 'Hovednavigasjon (mobil)',
  },
  'Cotação B2B': { en: 'B2B quote', es: 'Cotización B2B', no: 'B2B-tilbud' },
  'Solicitar cotação B2B': {
    en: 'Request a B2B quote',
    es: 'Solicitar cotización B2B',
    no: 'Be om et B2B-tilbud',
  },
  'Abrir menu': { en: 'Open menu', es: 'Abrir menú', no: 'Åpne meny' },
  'Fechar menu': { en: 'Close menu', es: 'Cerrar menú', no: 'Lukk meny' },
  'Links do rodapé': { en: 'Footer links', es: 'Enlaces del pie de página', no: 'Lenker i bunnteksten' },
  Navegação: { en: 'Navigation', es: 'Navegación', no: 'Navigasjon' },
  Contato: { en: 'Contact', es: 'Contacto', no: 'Kontakt' },
  Atendimento: { en: 'Service', es: 'Atención', no: 'Kundeservice' },
  'Parceiro exportador: Norwell AS': {
    en: 'Export partner: Norwell AS',
    es: 'Socio exportador: Norwell AS',
    no: 'Eksportpartner: Norwell AS',
  },
  'Falar com a equipe': { en: 'Talk to our team', es: 'Hablar con el equipo', no: 'Snakk med teamet' },
  'Todos os direitos reservados.': {
    en: 'All rights reserved.',
    es: 'Todos los derechos reservados.',
    no: 'Alle rettigheter forbeholdt.',
  },
  '© {year} {company}. Todos os direitos reservados.': {
    en: '© {year} {company}. All rights reserved.',
    es: '© {year} {company}. Todos los derechos reservados.',
    no: '© {year} {company}. Alle rettigheter forbeholdt.',
  },
  'Política de Privacidade': { en: 'Privacy Policy', es: 'Política de Privacidad', no: 'Personvernerklæring' },
  'Termos de Uso': { en: 'Terms of Use', es: 'Términos de Uso', no: 'Bruksvilkår' },
  'A disponibilidade, os formatos, os volumes e as condições comerciais dos produtos devem ser confirmados diretamente com a empresa.': {
    en: 'Product availability, formats, volumes and commercial terms must be confirmed directly with the company.',
    es: 'La disponibilidad, los formatos, los volúmenes y las condiciones comerciales de los productos deben confirmarse directamente con la empresa.',
    no: 'Produkttilgjengelighet, formater, volum og kommersielle vilkår må bekreftes direkte med selskapet.',
  },
  'Conversar pelo WhatsApp': {
    en: 'Chat on WhatsApp',
    es: 'Conversar por WhatsApp',
    no: 'Snakk på WhatsApp',
  },
  'Voltar ao topo': { en: 'Back to top', es: 'Volver arriba', no: 'Tilbake til toppen' },
  'Norway · Brazil': { en: 'Norway · Brazil', es: 'Noruega · Brasil', no: 'Norge · Brasil' },

  // Hero
  'Origem norueguesa': { en: 'Norwegian origin', es: 'Origen noruego', no: 'Norsk opprinnelse' },
  'Fresco ou congelado': { en: 'Fresh or frozen', es: 'Fresco o congelado', no: 'Fersk eller fryst' },
  'Via aérea ou marítima': { en: 'By air or sea', es: 'Por vía aérea o marítima', no: 'Med fly eller sjøfrakt' },
  'Atendimento em todo o Brasil': {
    en: 'Service throughout Brazil',
    es: 'Atención en todo Brasil',
    no: 'Oppfølging i hele Brasil',
  },
  'Representação comercial · Noruega → Brasil': {
    en: 'Commercial representation · Norway → Brazil',
    es: 'Representación comercial · Noruega → Brasil',
    no: 'Kommersiell representasjon · Norge → Brasil',
  },
  'Salmão norueguês, direto da origem.': {
    en: 'Norwegian salmon, direct from the source.',
    es: 'Salmón noruego, directo del origen.',
    no: 'Norsk laks, direkte fra opprinnelsen.',
  },
  'Salmão norueguês,': { en: 'Norwegian salmon,', es: 'Salmón noruego,', no: 'Norsk laks,' },
  'direto da origem.': { en: 'direct from the source.', es: 'directo del origen.', no: 'direkte fra opprinnelsen.' },
  'Conectamos empresas brasileiras à exportadora Norwell e a produtores selecionados da costa norueguesa, com especificação sob medida e logística de ponta a ponta.': {
    en: 'We connect Brazilian companies with exporter Norwell and selected producers along the Norwegian coast, providing tailor-made specifications and end-to-end logistics.',
    es: 'Conectamos empresas brasileñas con la exportadora Norwell y productores seleccionados de la costa noruega, con especificaciones a medida y logística integral.',
    no: 'Vi kobler brasilianske selskaper til eksportøren Norwell og utvalgte produsenter langs norskekysten, med skreddersydde spesifikasjoner og logistikk fra start til slutt.',
  },
  'Conhecer o portfólio': { en: 'Explore the portfolio', es: 'Conocer el portafolio', no: 'Se porteføljen' },
  'Falar com a Mai': { en: 'Talk to Mai', es: 'Hablar con Mai', no: 'Snakk med Mai' },
  'Costa da Noruega': { en: 'Norwegian coast', es: 'Costa de Noruega', no: 'Norskekysten' },
  'Qualidade construída na origem': {
    en: 'Quality built at the source',
    es: 'Calidad construida en el origen',
    no: 'Kvalitet skapt ved opprinnelsen',
  },
  'Atlantic salmon · premium': {
    en: 'Atlantic salmon · premium',
    es: 'Salmón atlántico · premium',
    no: 'Atlantisk laks · premium',
  },

  // About and partnership
  'Ano de fundação da Norwell na Noruega': {
    en: 'Year Norwell was founded in Norway',
    es: 'Año de fundación de Norwell en Noruega',
    no: 'Året Norwell ble grunnlagt i Norge',
  },
  'Mercados alcançados pelo salmão norueguês': {
    en: 'Markets reached by Norwegian salmon',
    es: 'Mercados alcanzados por el salmón noruego',
    no: 'Markeder nådd av norsk laks',
  },
  '2 modais': { en: '2 modes', es: '2 modalidades', no: '2 transportmåter' },
  'Fornecimento por via aérea ou marítima': {
    en: 'Supply by air or sea',
    es: 'Suministro por vía aérea o marítima',
    no: 'Levering med fly eller sjøfrakt',
  },
  'Produtores familiares cuidadosamente selecionados': {
    en: 'Carefully selected family producers',
    es: 'Productores familiares cuidadosamente seleccionados',
    no: 'Nøye utvalgte familieprodusenter',
  },
  'Especificações padrão ou desenvolvidas sob medida': {
    en: 'Standard or tailor-made specifications',
    es: 'Especificaciones estándar o desarrolladas a medida',
    no: 'Standardspesifikasjoner eller skreddersydde løsninger',
  },
  'Produtos frescos, congelados e de alto valor agregado': {
    en: 'Fresh, frozen and value-added products',
    es: 'Productos frescos, congelados y de alto valor agregado',
    no: 'Ferske, fryste og videreforedlede produkter',
  },
  'Parceiro na origem': { en: 'Partner at the source', es: 'Socio en el origen', no: 'Partner ved opprinnelsen' },
  'Exportadora norueguesa com presença global e relações de longo prazo com produtores.': {
    en: 'Norwegian exporter with a global presence and long-term producer relationships.',
    es: 'Exportadora noruega con presencia global y relaciones de largo plazo con productores.',
    no: 'Norsk eksportør med global tilstedeværelse og langsiktige relasjoner til produsenter.',
  },
  'Uma ponte comercial com os dois pés na origem': {
    en: 'A commercial bridge firmly rooted at the source',
    es: 'Un puente comercial firmemente arraigado en el origen',
    no: 'En kommersiell bro med solid forankring ved opprinnelsen',
  },
  'Nordic Salmon + Norwell': {
    en: 'Nordic Salmon + Norwell',
    es: 'Nordic Salmon + Norwell',
    no: 'Nordic Salmon + Norwell',
  },
  'Representamos no Brasil a Norwell, exportadora norueguesa especializada em salmão e sediada em Florø. A empresa construiu sua atuação em parceria com produtores da costa da Noruega, combinando escala internacional e proximidade na cadeia.': {
    en: 'We represent Norwell in Brazil, a Norwegian salmon exporter based in Florø. The company has built its business in partnership with producers along the Norwegian coast, combining international scale with close supply-chain relationships.',
    es: 'Representamos en Brasil a Norwell, exportadora noruega especializada en salmón y con sede en Florø. La empresa desarrolló su actividad en alianza con productores de la costa de Noruega, combinando escala internacional y cercanía en la cadena.',
    no: 'Vi representerer Norwell i Brasil, en norsk lakseeksportør med base i Florø. Selskapet har bygget virksomheten i samarbeid med produsenter langs norskekysten og kombinerer internasjonal skala med nærhet i verdikjeden.',
  },
  'Para o cliente brasileiro, isso significa acesso qualificado à origem, comunicação direta e uma solução desenhada a partir do produto, volume e ritmo de cada operação.': {
    en: 'For Brazilian customers, this means qualified access to the source, direct communication and a solution designed around each operation’s product, volume and pace.',
    es: 'Para el cliente brasileño, esto significa acceso cualificado al origen, comunicación directa y una solución diseñada según el producto, el volumen y el ritmo de cada operación.',
    no: 'For brasilianske kunder betyr dette kvalifisert tilgang til opprinnelsen, direkte kommunikasjon og en løsning utformet etter produkt, volum og tempo i hver virksomhet.',
  },
  'Conhecer a Norwell': { en: 'Discover Norwell', es: 'Conocer Norwell', no: 'Bli kjent med Norwell' },

  // Norwegian salmon
  'Origem e habitat': { en: 'Origin and habitat', es: 'Origen y hábitat', no: 'Opprinnelse og habitat' },
  'Criado nas águas frias e limpas da costa norueguesa, condição natural para textura firme e sabor equilibrado.': {
    en: 'Raised in the cold, clean waters of the Norwegian coast, a natural environment for firm texture and balanced flavour.',
    es: 'Criado en las aguas frías y limpias de la costa noruega, un entorno natural para una textura firme y un sabor equilibrado.',
    no: 'Oppdrettet i det kalde, rene vannet langs norskekysten, et naturlig miljø for fast tekstur og balansert smak.',
  },
  'Procedência e rastreabilidade': {
    en: 'Origin and traceability',
    es: 'Procedencia y trazabilidad',
    no: 'Opprinnelse og sporbarhet',
  },
  'A cadeia produtiva norueguesa opera com identificação de origem e controles reconhecidos internacionalmente.': {
    en: 'The Norwegian production chain operates with origin identification and internationally recognised controls.',
    es: 'La cadena productiva noruega opera con identificación de origen y controles reconocidos internacionalmente.',
    no: 'Den norske produksjonskjeden har opprinnelsesmerking og internasjonalt anerkjente kontrollsystemer.',
  },
  'Conservação e cadeia do frio': {
    en: 'Preservation and cold chain',
    es: 'Conservación y cadena de frío',
    no: 'Holdbarhet og kjølekjede',
  },
  'Temperatura controlada da origem ao destino, preservando frescor, cor e características do produto.': {
    en: 'Temperature controlled from source to destination, preserving freshness, colour and product characteristics.',
    es: 'Temperatura controlada desde el origen hasta el destino, preservando la frescura, el color y las características del producto.',
    no: 'Kontrollert temperatur fra opprinnelse til destinasjon bevarer ferskhet, farge og produktegenskaper.',
  },
  'Versatilidade profissional': {
    en: 'Professional versatility',
    es: 'Versatilidad profesional',
    no: 'Profesjonell allsidighet',
  },
  'Do sushi ao forno: cortes e formatos que atendem cozinhas profissionais e o varejo com constância.': {
    en: 'From sushi to the oven: cuts and formats that consistently serve professional kitchens and retail.',
    es: 'Del sushi al horno: cortes y formatos que atienden con constancia a cocinas profesionales y al comercio minorista.',
    no: 'Fra sushi til ovnsretter: stykningsdeler og formater som gir stabil kvalitet til profesjonelle kjøkken og detaljhandel.',
  },
  'Águas frias': { en: 'Cold waters', es: 'Aguas frías', no: 'Kaldt vann' },
  Rastreabilidade: { en: 'Traceability', es: 'Trazabilidad', no: 'Sporbarhet' },
  'Qualidade que começa muito antes do embarque': {
    en: 'Quality that begins long before shipment',
    es: 'Calidad que comienza mucho antes del embarque',
    no: 'Kvalitet som begynner lenge før forsendelse',
  },
  'Criado nas águas frias e cristalinas da costa norueguesa, o salmão se desenvolve em uma cadeia monitorada — da ova ao produto final.': {
    en: 'Raised in the cold, crystal-clear waters of the Norwegian coast, the salmon develops within a monitored chain — from roe to final product.',
    es: 'Criado en las aguas frías y cristalinas de la costa noruega, el salmón se desarrolla en una cadena supervisada — desde la ova hasta el producto final.',
    no: 'Oppdrettet i det kalde, krystallklare vannet langs norskekysten utvikler laksen seg i en overvåket kjede — fra rogn til ferdig produkt.',
  },
  'Textura firme, sabor delicado e qualidade consistente ao longo das estações.': {
    en: 'Firm texture, delicate flavour and consistent quality throughout the seasons.',
    es: 'Textura firme, sabor delicado y calidad constante a lo largo de las estaciones.',
    no: 'Fast tekstur, delikat smak og jevn kvalitet gjennom årstidene.',
  },

  // Product portfolio
  'Salmão inteiro HOG': { en: 'Whole HOG salmon', es: 'Salmón entero HOG', no: 'Hel HOG-laks' },
  'Salmão Atlântico de cultivo, eviscerado e com cabeça, para operações que valorizam flexibilidade de corte e rendimento.': {
    en: 'Farmed Atlantic salmon, gutted with head on, for operations that value cutting flexibility and yield.',
    es: 'Salmón atlántico de cultivo, eviscerado y con cabeza, para operaciones que valoran la flexibilidad de corte y el rendimiento.',
    no: 'Oppdrettet atlantisk laks, sløyd med hode, for virksomheter som verdsetter fleksibel skjæring og godt utbytte.',
  },
  'Calibres de 3–4 kg a +9 kg': { en: 'Sizes from 3–4 kg to +9 kg', es: 'Calibres de 3–4 kg a +9 kg', no: 'Størrelser fra 3–4 kg til +9 kg' },
  'Distribuidores, peixarias e processamento': {
    en: 'Distributors, fishmongers and processing',
    es: 'Distribuidores, pescaderías y procesamiento',
    no: 'Distributører, fiskebutikker og foredling',
  },
  'Salmões inteiros sobre gelo': {
    en: 'Whole salmon on ice',
    es: 'Salmones enteros sobre hielo',
    no: 'Hel laks på is',
  },
  'Lombo e filés': { en: 'Loins and fillets', es: 'Lomos y filetes', no: 'Loin og fileter' },
  'Filés pré-rigor, com pele, sem espinhas e corte D-trim. Outros trims podem ser desenvolvidos conforme a operação.': {
    en: 'Pre-rigor fillets, skin-on, pin-bone-out and D-trim. Other trims can be developed for the operation.',
    es: 'Filetes pre-rigor, con piel, sin espinas y corte D-trim. Pueden desarrollarse otros trims según la operación.',
    no: 'Pre-rigor-fileter med skinn, uten bein og D-trim. Andre trims kan utvikles etter virksomhetens behov.',
  },
  'Congelado · IVP': { en: 'Frozen · IVP', es: 'Congelado · IVP', no: 'Fryst · IVP' },
  'Faixas de 1,0–1,4 kg a 1,8–2,2 kg': {
    en: 'Ranges from 1.0–1.4 kg to 1.8–2.2 kg',
    es: 'Rangos de 1,0–1,4 kg a 1,8–2,2 kg',
    no: 'Vektklasser fra 1,0–1,4 kg til 1,8–2,2 kg',
  },
  'Restaurantes, sushi bars, hotéis e varejo': {
    en: 'Restaurants, sushi bars, hotels and retail',
    es: 'Restaurantes, sushi bars, hoteles y comercio minorista',
    no: 'Restauranter, sushibarer, hoteller og detaljhandel',
  },
  'Lombo de salmão norueguês sobre gelo': {
    en: 'Norwegian salmon loin on ice',
    es: 'Lomo de salmón noruego sobre hielo',
    no: 'Loin av norsk laks på is',
  },
  'Porções IVP': { en: 'IVP portions', es: 'Porciones IVP', no: 'IVP-porsjoner' },
  'Porções padronizadas, sem pele e sem espinhas, pensadas para controle de custo, agilidade e consistência no serviço.': {
    en: 'Standardised skinless, boneless portions designed for cost control, speed and consistent service.',
    es: 'Porciones estandarizadas, sin piel ni espinas, pensadas para el control de costes, la agilidad y la consistencia en el servicio.',
    no: 'Standardiserte porsjoner uten skinn og bein, utviklet for kostnadskontroll, effektivitet og jevn servering.',
  },
  '125 g · caixas de 3, 5 ou 10 kg': {
    en: '125 g · 3, 5 or 10 kg boxes',
    es: '125 g · cajas de 3, 5 o 10 kg',
    no: '125 g · kartonger på 3, 5 eller 10 kg',
  },
  'Food service, catering e private label': {
    en: 'Food service, catering and private label',
    es: 'Food service, catering y private label',
    no: 'Storhusholdning, catering og private label',
  },
  'Quatro porções padronizadas de salmão sobre gelo': {
    en: 'Four standardised salmon portions on ice',
    es: 'Cuatro porciones estandarizadas de salmón sobre hielo',
    no: 'Fire standardiserte lakseporsjoner på is',
  },
  'Defumado e gravlax': { en: 'Smoked and gravlax', es: 'Ahumado y gravlax', no: 'Røkt laks og gravlaks' },
  'Filé defumado a quente, fatiados e gravlax curado para aplicações de alto valor agregado e consumo imediato.': {
    en: 'Hot-smoked fillet, sliced products and cured gravlax for value-added and ready-to-eat applications.',
    es: 'Filete ahumado en caliente, productos loncheados y gravlax curado para aplicaciones de alto valor agregado y consumo inmediato.',
    no: 'Varmrøkt filet, skivede produkter og speket gravlaks for videreforedlede og spiseklare anvendelser.',
  },
  Congelado: { en: 'Frozen', es: 'Congelado', no: 'Fryst' },
  '100 g, 200 g ou filés de 900 g–1,2 kg': {
    en: '100 g, 200 g or 900 g–1.2 kg fillets',
    es: '100 g, 200 g o filetes de 900 g–1,2 kg',
    no: '100 g, 200 g eller fileter på 900 g–1,2 kg',
  },
  'Empórios, hotéis, varejo e alta gastronomia': {
    en: 'Delicatessens, hotels, retail and fine dining',
    es: 'Tiendas gourmet, hoteles, comercio minorista y alta gastronomía',
    no: 'Delikatessebutikker, hoteller, detaljhandel og gastronomi',
  },
  'Fatias de salmão defumado sobre gelo': {
    en: 'Slices of smoked salmon on ice',
    es: 'Lonchas de salmón ahumado sobre hielo',
    no: 'Skiver av røkt laks på is',
  },
  'Portfólio Norwell': { en: 'Norwell portfolio', es: 'Portafolio Norwell', no: 'Norwell-porteføljen' },
  'Do inteiro à porção, com especificação precisa': {
    en: 'From whole fish to portions, with precise specifications',
    es: 'Del pescado entero a la porción, con especificaciones precisas',
    no: 'Fra hel fisk til porsjon, med presise spesifikasjoner',
  },
  'Produtos frescos ou congelados, com formatos padrão e desenvolvimento sob medida para operações B2B.': {
    en: 'Fresh or frozen products, with standard formats and tailor-made development for B2B operations.',
    es: 'Productos frescos o congelados, con formatos estándar y desarrollo a medida para operaciones B2B.',
    no: 'Ferske eller fryste produkter, med standardformater og skreddersydd utvikling for B2B-virksomheter.',
  },
  Apresentação: { en: 'Presentation', es: 'Presentación', no: 'Produktformat' },
  'Ideal para:': { en: 'Ideal for:', es: 'Ideal para:', no: 'Ideell for:' },
  'Consultar disponibilidade': {
    en: 'Check availability',
    es: 'Consultar disponibilidad',
    no: 'Sjekk tilgjengelighet',
  },
  'Trabalhamos também com especificações B, C, D e E-trim e soluções de private label. Disponibilidade, MOQ e condições são confirmadas na cotação.': {
    en: 'We also work with B, C, D and E-trim specifications and private label solutions. Availability, MOQ and terms are confirmed in the quote.',
    es: 'También trabajamos con especificaciones B, C, D y E-trim y soluciones de private label. La disponibilidad, el MOQ y las condiciones se confirman en la cotización.',
    no: 'Vi tilbyr også B-, C-, D- og E-trim-spesifikasjoner og private label-løsninger. Tilgjengelighet, MOQ og vilkår bekreftes i tilbudet.',
  },
  'Pedir especificação': { en: 'Request specifications', es: 'Solicitar especificación', no: 'Be om spesifikasjon' },

  // Image alternative text and gallery
  'Produtor norueguês segurando um salmão inteiro junto a um fiorde': {
    en: 'Norwegian producer holding a whole salmon beside a fjord',
    es: 'Productor noruego sosteniendo un salmón entero junto a un fiordo',
    no: 'Norsk produsent som holder en hel laks ved en fjord',
  },
  'Fiorde norueguês cercado por montanhas nevadas': {
    en: 'Norwegian fjord surrounded by snow-covered mountains',
    es: 'Fiordo noruego rodeado de montañas nevadas',
    no: 'Norsk fjord omgitt av snødekte fjell',
  },
  'Filé de salmão diante de uma paisagem costeira da Noruega': {
    en: 'Salmon fillet against a Norwegian coastal landscape',
    es: 'Filete de salmón ante un paisaje costero de Noruega',
    no: 'Laksefilet foran et norsk kystlandskap',
  },
  'Salmões nadando em águas frias da Noruega': {
    en: 'Salmon swimming in Norway’s cold waters',
    es: 'Salmones nadando en las aguas frías de Noruega',
    no: 'Laks som svømmer i kaldt norsk vann',
  },
  'Fazenda de salmão em águas frias cercada por montanhas nevadas': {
    en: 'Salmon farm in cold waters surrounded by snow-covered mountains',
    es: 'Granja de salmón en aguas frías rodeada de montañas nevadas',
    no: 'Lakseanlegg i kaldt vann omgitt av snødekte fjell',
  },
  'Prato de salmão defumado com salada e pão': {
    en: 'Smoked salmon dish with salad and bread',
    es: 'Plato de salmón ahumado con ensalada y pan',
    no: 'Røkt laks med salat og brød',
  },
  'Alta gastronomia': { en: 'Fine dining', es: 'Alta gastronomía', no: 'Gastronomi' },
  'Salada fresca acompanhada de fatias de salmão': {
    en: 'Fresh salad with slices of salmon',
    es: 'Ensalada fresca acompañada de lonchas de salmón',
    no: 'Frisk salat med lakseskiver',
  },
  'Cozinha contemporânea': {
    en: 'Contemporary cuisine',
    es: 'Cocina contemporánea',
    no: 'Moderne kjøkken',
  },
  'Entrada com salmão, ervas e molho cítrico': {
    en: 'Salmon starter with herbs and citrus sauce',
    es: 'Entrante de salmón con hierbas y salsa cítrica',
    no: 'Lakseforrett med urter og sitrussaus',
  },
  'Apresentação premium': {
    en: 'Premium presentation',
    es: 'Presentación premium',
    no: 'Premium presentasjon',
  },
  'Canapés com salmão defumado e ervas': {
    en: 'Canapés with smoked salmon and herbs',
    es: 'Canapés con salmón ahumado y hierbas',
    no: 'Kanapeer med røkt laks og urter',
  },
  'Eventos e catering': { en: 'Events and catering', es: 'Eventos y catering', no: 'Arrangementer og catering' },
  'Torradas com salmão defumado e creme': {
    en: 'Toast with smoked salmon and cream',
    es: 'Tostadas con salmón ahumado y crema',
    no: 'Toast med røkt laks og krem',
  },
  'Versatilidade no menu': {
    en: 'Menu versatility',
    es: 'Versatilidad en el menú',
    no: 'Allsidighet på menyen',
  },
  'Da origem à mesa': { en: 'From source to table', es: 'Del origen a la mesa', no: 'Fra opprinnelse til bord' },
  'Um produto, muitas possibilidades': {
    en: 'One product, many possibilities',
    es: 'Un producto, muchas posibilidades',
    no: 'Ett produkt, mange muligheter',
  },
  'Cor vibrante, textura delicada e versatilidade para cardápios, varejo e experiências gastronômicas de alto padrão.': {
    en: 'Vibrant colour, delicate texture and versatility for menus, retail and premium dining experiences.',
    es: 'Color vibrante, textura delicada y versatilidad para menús, comercio minorista y experiencias gastronómicas de alto nivel.',
    no: 'Klar farge, delikat tekstur og allsidighet for menyer, detaljhandel og matopplevelser på høyt nivå.',
  },
  'Fotografias do catálogo oficial disponibilizado pela empresa.': {
    en: 'Photography from the official catalogue provided by the company.',
    es: 'Fotografías del catálogo oficial proporcionado por la empresa.',
    no: 'Fotografier fra den offisielle katalogen selskapet har gjort tilgjengelig.',
  },

  // Process
  Ova: { en: 'Roe', es: 'Ova', no: 'Rogn' },
  Smolt: { en: 'Smolt', es: 'Smolt', no: 'Smolt' },
  Mar: { en: 'Sea', es: 'Mar', no: 'Sjø' },
  Processamento: { en: 'Processing', es: 'Procesamiento', no: 'Foredling' },
  'Diagnóstico da operação': {
    en: 'Operational assessment',
    es: 'Diagnóstico de la operación',
    no: 'Kartlegging av virksomheten',
  },
  'Entendemos canal, volume, frequência, conservação e especificações necessárias para o seu negócio.': {
    en: 'We assess the channel, volume, frequency, preservation and specifications your business requires.',
    es: 'Analizamos el canal, el volumen, la frecuencia, la conservación y las especificaciones necesarias para su negocio.',
    no: 'Vi kartlegger kanal, volum, hyppighet, lagringsform og spesifikasjoner virksomheten din trenger.',
  },
  'Produto sob medida': { en: 'Tailor-made product', es: 'Producto a medida', no: 'Skreddersydd produkt' },
  'Definimos apresentação, corte, gramatura, embalagem e possibilidade de private label.': {
    en: 'We define presentation, cut, weight, packaging and private label possibilities.',
    es: 'Definimos la presentación, el corte, el gramaje, el embalaje y la posibilidad de private label.',
    no: 'Vi definerer produktformat, skjæring, vekt, emballasje og muligheter for private label.',
  },
  'Plano comercial e logístico': {
    en: 'Commercial and logistics plan',
    es: 'Plan comercial y logístico',
    no: 'Kommersiell plan og logistikkplan',
  },
  'Estruturamos condições, prazos e modal aéreo ou marítimo, com cadeia refrigerada de ponta a ponta.': {
    en: 'We structure terms, timelines and air or sea transport, with an end-to-end cold chain.',
    es: 'Estructuramos las condiciones, los plazos y el transporte aéreo o marítimo, con una cadena de frío integral.',
    no: 'Vi strukturerer vilkår, tidsfrister og fly- eller sjøtransport, med en sammenhengende kjølekjede.',
  },
  'Acompanhamento próximo': { en: 'Close follow-up', es: 'Seguimiento cercano', no: 'Tett oppfølging' },
  'Monitoramos a operação, a documentação e os próximos ciclos para construir uma relação estável.': {
    en: 'We monitor the operation, documentation and upcoming cycles to build a stable relationship.',
    es: 'Supervisamos la operación, la documentación y los próximos ciclos para construir una relación estable.',
    no: 'Vi følger opp driften, dokumentasjonen og kommende sykluser for å bygge et stabilt samarbeid.',
  },
  'Da necessidade à entrega': {
    en: 'From requirement to delivery',
    es: 'De la necesidad a la entrega',
    no: 'Fra behov til levering',
  },
  'Comercial simples. Operação rigorosa.': {
    en: 'Simple commercial process. Rigorous operation.',
    es: 'Proceso comercial sencillo. Operación rigurosa.',
    no: 'Enkel kommersiell prosess. Grundig gjennomføring.',
  },
  'Uma interlocução única no Brasil, conectada diretamente à equipe exportadora e à cadeia de produção norueguesa.': {
    en: 'A single point of contact in Brazil, connected directly to the export team and Norwegian production chain.',
    es: 'Un único interlocutor en Brasil, conectado directamente con el equipo exportador y la cadena de producción noruega.',
    no: 'Ett kontaktpunkt i Brasil, direkte koblet til eksportteamet og den norske produksjonskjeden.',
  },

  // Founder
  'Representante da Norwell no Brasil': {
    en: 'Norwell Representative in Brazil',
    es: 'Representante de Norwell en Brasil',
    no: 'Norwells representant i Brasil',
  },
  'Conectando a excelência norueguesa às oportunidades do mercado brasileiro': {
    en: 'Connecting Norwegian excellence with opportunities in the Brazilian market',
    es: 'Conectando la excelencia noruega con las oportunidades del mercado brasileño',
    no: 'Kobler norsk kvalitet til mulighetene i det brasilianske markedet',
  },
  'Entrada no mercado, ESG e parcerias estratégicas entre a Noruega e o Brasil': {
    en: 'Market entry, ESG and strategic partnerships between Norway and Brazil',
    es: 'Entrada al mercado, ESG y alianzas estratégicas entre Noruega y Brasil',
    no: 'Markedsinngang, ESG og strategiske partnerskap mellom Norge og Brasil',
  },
  'Mai Tonheim conecta a expertise em seafood norueguês às oportunidades do mercado brasileiro, combinando experiência em entrada no mercado, ESG e construção de parcerias estratégicas.': {
    en: 'Mai Tonheim connects Norwegian seafood expertise with opportunities in the Brazilian market, combining experience in market entry, ESG and strategic partnership building.',
    es: 'Mai Tonheim conecta la experiencia noruega en productos del mar con las oportunidades del mercado brasileño, combinando experiencia en entrada al mercado, ESG y creación de alianzas estratégicas.',
    no: 'Mai Tonheim kobler norsk sjømatkompetanse til mulighetene i det brasilianske markedet, med erfaring innen markedsinngang, ESG og utvikling av strategiske partnerskap.',
  },
  'Entrada no mercado brasileiro': {
    en: 'Entry into the Brazilian market',
    es: 'Entrada al mercado brasileño',
    no: 'Inngang i det brasilianske markedet',
  },
  'ESG e parcerias estratégicas': {
    en: 'ESG and strategic partnerships',
    es: 'ESG y alianzas estratégicas',
    no: 'ESG og strategiske partnerskap',
  },
  'Seafood norueguês no Brasil': {
    en: 'Norwegian seafood in Brazil',
    es: 'Productos del mar noruegos en Brasil',
    no: 'Norsk sjømat i Brasil',
  },
  'Mai Tonheim é norueguesa, radicada no Rio de Janeiro, e dedicou quase duas décadas ao Serviço Exterior da Noruega, no qual ingressou em 2007. Entre 2021 e 2025, foi Cônsul e Vice-Chefe de Missão do Consulado-Geral Real da Noruega no Rio de Janeiro, com atuação dedicada à promoção de negócios noruegueses e ao apoio a investimentos no Brasil.': {
    en: 'Mai Tonheim is Norwegian, based in Rio de Janeiro, and devoted nearly two decades to the Norwegian Foreign Service, which she joined in 2007. From 2021 to 2025, she served as Consul and Deputy Head of Mission at the Royal Norwegian Consulate General in Rio de Janeiro, promoting Norwegian business and supporting investment in Brazil.',
    es: 'Mai Tonheim es noruega, está radicada en Río de Janeiro y dedicó casi dos décadas al Servicio Exterior de Noruega, al que ingresó en 2007. Entre 2021 y 2025 fue Cónsul y Jefa Adjunta de Misión del Consulado General Real de Noruega en Río de Janeiro, dedicada a promover empresas noruegas y apoyar inversiones en Brasil.',
    no: 'Mai Tonheim er norsk, bosatt i Rio de Janeiro, og arbeidet i nær to tiår i norsk utenrikstjeneste, som hun begynte i i 2007. Fra 2021 til 2025 var hun konsul og nestleder ved Det kongelige norske generalkonsulatet i Rio de Janeiro, med ansvar for å fremme norsk næringsliv og støtte investeringer i Brasil.',
  },
  'Sua trajetória inclui postos diplomáticos na Itália e no Líbano, a Academia Diplomática do Ministério das Relações Exteriores da Noruega, em Oslo, e o Escritório das Nações Unidas sobre Drogas e Crime (UNODC), em Viena. Representou a Noruega na OCDE em grupos sobre conduta empresarial responsável.': {
    en: 'Her career includes diplomatic postings in Italy and Lebanon, the Diplomatic Academy at the Norwegian Ministry of Foreign Affairs in Oslo, and the United Nations Office on Drugs and Crime (UNODC) in Vienna. She represented Norway in OECD groups on responsible business conduct.',
    es: 'Su trayectoria incluye cargos diplomáticos en Italia y Líbano, la Academia Diplomática del Ministerio de Asuntos Exteriores de Noruega en Oslo y la Oficina de las Naciones Unidas contra la Droga y el Delito (UNODC) en Viena. Representó a Noruega en grupos de la OCDE sobre conducta empresarial responsable.',
    no: 'Karrieren hennes omfatter diplomatiske stillinger i Italia og Libanon, Utenriksdepartementets diplomatakademi i Oslo og FNs kontor for narkotika og kriminalitet (UNODC) i Wien. Hun representerte Norge i OECD-grupper for ansvarlig næringsliv.',
  },
  'Hoje, aplica essa experiência ao setor de produtos do mar. Como Representante no Brasil da Norwell AS, trabalha na introdução do salmão norueguês no mercado brasileiro — a ponte comercial que esta empresa materializa.': {
    en: 'Today, she applies this experience to the seafood sector. As Norwell AS Representative in Brazil, she works to introduce Norwegian salmon to the Brazilian market — the commercial bridge embodied by this company.',
    es: 'Hoy aplica esta experiencia al sector de productos del mar. Como representante de Norwell AS en Brasil, trabaja para introducir el salmón noruego en el mercado brasileño — el puente comercial que esta empresa hace realidad.',
    no: 'I dag bruker hun denne erfaringen i sjømatnæringen. Som Norwell AS’ representant i Brasil arbeider hun med å introdusere norsk laks i det brasilianske markedet — den kommersielle broen selskapet gjør mulig.',
  },
  'Português intensivo': { en: 'Intensive Portuguese', es: 'Portugués intensivo', no: 'Intensiv portugisisk' },
  'MSc em Violence, Conflict and Development': {
    en: 'MSc in Violence, Conflict and Development',
    es: 'MSc en Violence, Conflict and Development',
    no: 'MSc i Violence, Conflict and Development',
  },
  'Poliglota: norueguês, inglês, português, árabe e albanês estão entre os sete idiomas do seu perfil profissional.': {
    en: 'Multilingual: Norwegian, English, Portuguese, Arabic and Albanian are among the seven languages listed in her professional profile.',
    es: 'Políglota: noruego, inglés, portugués, árabe y albanés figuran entre los siete idiomas de su perfil profesional.',
    no: 'Flerspråklig: norsk, engelsk, portugisisk, arabisk og albansk er blant de sju språkene i hennes profesjonelle profil.',
  },
  '2025 — atual': { en: '2025 — present', es: '2025 — actualidad', no: '2025 — i dag' },
  'Representante no Brasil': { en: 'Representative in Brazil', es: 'Representante en Brasil', no: 'Representant i Brasil' },
  'Rio de Janeiro, Brasil': { en: 'Rio de Janeiro, Brazil', es: 'Río de Janeiro, Brasil', no: 'Rio de Janeiro, Brasil' },
  'Representação comercial da exportadora norueguesa de pescados no mercado brasileiro, com foco na introdução do salmão norueguês junto a importadores, distribuidores e varejo.': {
    en: 'Commercial representation of the Norwegian seafood exporter in the Brazilian market, focused on introducing Norwegian salmon to importers, distributors and retail.',
    es: 'Representación comercial de la exportadora noruega de productos del mar en el mercado brasileño, centrada en introducir el salmón noruego entre importadores, distribuidores y comercio minorista.',
    no: 'Kommersiell representasjon av den norske sjømateksportøren i det brasilianske markedet, med fokus på norsk laks til importører, distributører og detaljhandel.',
  },
  'Membro do Conselho de Administração': {
    en: 'Board Member',
    es: 'Miembro del Consejo de Administración',
    no: 'Styremedlem',
  },
  'Orientação estratégica em ESG, valoração de capital natural e finanças voltadas à natureza, com apoio a governança e parcerias internacionais.': {
    en: 'Strategic guidance on ESG, natural-capital valuation and nature-focused finance, supporting governance and international partnerships.',
    es: 'Orientación estratégica en ESG, valoración del capital natural y finanzas orientadas a la naturaleza, con apoyo a la gobernanza y las alianzas internacionales.',
    no: 'Strategisk rådgivning innen ESG, verdsetting av naturkapital og naturrettet finans, med støtte til styring og internasjonale partnerskap.',
  },
  'Cônsul e Vice-Chefe de Missão': {
    en: 'Consul and Deputy Head of Mission',
    es: 'Cónsul y Jefa Adjunta de Misión',
    no: 'Konsul og nestleder ved utenriksstasjonen',
  },
  'Consulado-Geral Real da Noruega no Rio de Janeiro': {
    en: 'Royal Norwegian Consulate General in Rio de Janeiro',
    es: 'Consulado General Real de Noruega en Río de Janeiro',
    no: 'Det kongelige norske generalkonsulatet i Rio de Janeiro',
  },
  'Fortalecimento das relações bilaterais, promoção dos interesses noruegueses e apoio ao desenvolvimento de negócios sustentáveis no Brasil.': {
    en: 'Strengthening bilateral relations, promoting Norwegian interests and supporting sustainable business development in Brazil.',
    es: 'Fortalecimiento de las relaciones bilaterales, promoción de los intereses noruegos y apoyo al desarrollo de negocios sostenibles en Brasil.',
    no: 'Styrking av bilaterale forbindelser, fremme av norske interesser og støtte til bærekraftig næringsutvikling i Brasil.',
  },
  'Assessora Sênior — Academia Diplomática': {
    en: 'Senior Adviser — Diplomatic Academy',
    es: 'Asesora Sénior — Academia Diplomática',
    no: 'Seniorrådgiver — Diplomatakademiet',
  },
  'Ministério das Relações Exteriores da Noruega': {
    en: 'Norwegian Ministry of Foreign Affairs',
    es: 'Ministerio de Asuntos Exteriores de Noruega',
    no: 'Det norske utenriksdepartementet',
  },
  'Oslo, Noruega': { en: 'Oslo, Norway', es: 'Oslo, Noruega', no: 'Oslo, Norge' },
  'Desenvolvimento de programas de formação para o corpo diplomático norueguês, com ênfase em capacitação e segurança em ambientes de risco.': {
    en: 'Development of training programmes for the Norwegian diplomatic corps, with an emphasis on skills and safety in high-risk environments.',
    es: 'Desarrollo de programas de formación para el cuerpo diplomático noruego, con énfasis en capacitación y seguridad en entornos de riesgo.',
    no: 'Utvikling av opplæringsprogrammer for norsk utenrikstjeneste, med vekt på kompetanse og sikkerhet i risikoutsatte miljøer.',
  },
  Diplomata: { en: 'Diplomat', es: 'Diplomática', no: 'Diplomat' },
  'Embaixada Real da Noruega em Roma': {
    en: 'Royal Norwegian Embassy in Rome',
    es: 'Real Embajada de Noruega en Roma',
    no: 'Den kongelige norske ambassaden i Roma',
  },
  'Roma, Itália': { en: 'Rome, Italy', es: 'Roma, Italia', no: 'Roma, Italia' },
  'Relações bilaterais Noruega–Itália, promoção dos interesses comerciais noruegueses, comunicação institucional e análise política.': {
    en: 'Norway–Italy bilateral relations, promotion of Norwegian commercial interests, institutional communication and political analysis.',
    es: 'Relaciones bilaterales Noruega–Italia, promoción de los intereses comerciales noruegos, comunicación institucional y análisis político.',
    no: 'Bilaterale forbindelser mellom Norge og Italia, fremme av norske næringsinteresser, institusjonell kommunikasjon og politisk analyse.',
  },
  'Assessora — Assuntos Econômicos e Comerciais': {
    en: 'Adviser — Economic and Commercial Affairs',
    es: 'Asesora — Asuntos Económicos y Comerciales',
    no: 'Rådgiver — økonomiske og kommersielle saker',
  },
  'Promoção do comércio norueguês na América do Sul e representação da Noruega na OCDE em grupos sobre conduta empresarial responsável.': {
    en: 'Promotion of Norwegian trade in South America and representation of Norway in OECD groups on responsible business conduct.',
    es: 'Promoción del comercio noruego en Sudamérica y representación de Noruega en grupos de la OCDE sobre conducta empresarial responsable.',
    no: 'Fremme av norsk handel i Sør-Amerika og representasjon av Norge i OECD-grupper for ansvarlig næringsliv.',
  },
  'Vice-Chefe de Missão': {
    en: 'Deputy Head of Mission',
    es: 'Jefa Adjunta de Misión',
    no: 'Nestleder ved utenriksstasjonen',
  },
  'Embaixada Real da Noruega no Líbano': {
    en: 'Royal Norwegian Embassy in Lebanon',
    es: 'Real Embajada de Noruega en Líbano',
    no: 'Den kongelige norske ambassaden i Libanon',
  },
  'Beirute, Líbano': { en: 'Beirut, Lebanon', es: 'Beirut, Líbano', no: 'Beirut, Libanon' },
  'Gestão da equipe da embaixada como encarregada de negócios interina e administração de portfólio de cooperação e assistência técnica.': {
    en: 'Management of the embassy team as acting chargé d’affaires and administration of a cooperation and technical-assistance portfolio.',
    es: 'Gestión del equipo de la embajada como encargada de negocios interina y administración de una cartera de cooperación y asistencia técnica.',
    no: 'Ledelse av ambassadeteamet som fungerende chargé d’affaires og forvaltning av en portefølje for samarbeid og teknisk bistand.',
  },
  'UNODC — Nações Unidas': { en: 'UNODC — United Nations', es: 'UNODC — Naciones Unidas', no: 'UNODC — De forente nasjoner' },
  'Associate Expert': { en: 'Associate Expert', es: 'Experta Asociada', no: 'Associate Expert' },
  'Viena, Áustria': { en: 'Vienna, Austria', es: 'Viena, Austria', no: 'Wien, Østerrike' },
  'Programas internacionais de combate à corrupção e ao crime organizado transnacional, incluindo coautoria de guia legislativo da ONU.': {
    en: 'International programmes to combat corruption and transnational organised crime, including co-authorship of a UN legislative guide.',
    es: 'Programas internacionales de lucha contra la corrupción y el crimen organizado transnacional, incluida la coautoría de una guía legislativa de la ONU.',
    no: 'Internasjonale programmer mot korrupsjon og grenseoverskridende organisert kriminalitet, inkludert medforfatterskap til en lovgivningsveileder for FN.',
  },
  'Analista e Intérprete': { en: 'Analyst and Interpreter', es: 'Analista e Intérprete', no: 'Analytiker og tolk' },
  'Forças Armadas da Noruega': {
    en: 'Norwegian Armed Forces',
    es: 'Fuerzas Armadas de Noruega',
    no: 'Forsvaret',
  },
  Noruega: { en: 'Norway', es: 'Noruega', no: 'Norge' },
  'Atuação como analista e intérprete de albanês e árabe no Comando de Defesa da Noruega.': {
    en: 'Work as an Albanian and Arabic analyst and interpreter at the Norwegian Defence Command.',
    es: 'Trabajo como analista e intérprete de albanés y árabe en el Mando de Defensa de Noruega.',
    no: 'Arbeid som analytiker og tolk i albansk og arabisk ved Forsvarets overkommando.',
  },
  'Fotografia de {name}': { en: 'Photograph of {name}', es: 'Fotografía de {name}', no: 'Fotografi av {name}' },
  'Fotografia de Mai Tonheim': {
    en: 'Photograph of Mai Tonheim',
    es: 'Fotografía de Mai Tonheim',
    no: 'Fotografi av Mai Tonheim',
  },
  'Noruega · Brasil': { en: 'Norway · Brazil', es: 'Noruega · Brasil', no: 'Norge · Brasil' },
  '“Relações comerciais sólidas começam com clareza, confiança e conhecimento dos dois mercados.”': {
    en: '“Strong commercial relationships begin with clarity, trust and knowledge of both markets.”',
    es: '“Las relaciones comerciales sólidas comienzan con claridad, confianza y conocimiento de ambos mercados.”',
    no: '«Solide forretningsforbindelser begynner med tydelighet, tillit og kunnskap om begge markedene.»',
  },
  'Enviar e-mail': { en: 'Send email', es: 'Enviar correo electrónico', no: 'Send e-post' },
  'Representação no Brasil': {
    en: 'Representation in Brazil',
    es: 'Representación en Brasil',
    no: 'Representasjon i Brasil',
  },
  'Experiência internacional transformada em acesso comercial': {
    en: 'International experience transformed into commercial access',
    es: 'Experiencia internacional transformada en acceso comercial',
    no: 'Internasjonal erfaring omsatt til kommersiell tilgang',
  },
  'Formação internacional': {
    en: 'International education',
    es: 'Formación internacional',
    no: 'Internasjonal utdanning',
  },
  'MSc pela SOAS University of London e formação diplomática norueguesa.': {
    en: 'MSc from SOAS University of London and Norwegian diplomatic training.',
    es: 'MSc por SOAS University of London y formación diplomática noruega.',
    no: 'MSc fra SOAS University of London og norsk diplomatopplæring.',
  },
  'Comunicação sem fronteiras': {
    en: 'Communication without borders',
    es: 'Comunicación sin fronteras',
    no: 'Kommunikasjon uten grenser',
  },
  'Experiência multicultural e atuação profissional em sete idiomas.': {
    en: 'Multicultural experience and professional work across seven languages.',
    es: 'Experiencia multicultural y actuación profesional en siete idiomas.',
    no: 'Flerkulturell erfaring og profesjonelt arbeid på sju språk.',
  },
  'Trajetória em destaque': { en: 'Career highlights', es: 'Trayectoria destacada', no: 'Karrierehøydepunkter' },
  'Conheça a trajetória completa': {
    en: 'Discover the full career journey',
    es: 'Conozca la trayectoria completa',
    no: 'Se hele karrieren',
  },
  'Sobre Mai Tonheim': { en: 'About Mai Tonheim', es: 'Sobre Mai Tonheim', no: 'Om Mai Tonheim' },
  'Liderança e representação no Brasil': {
    en: 'Leadership and representation in Brazil',
    es: 'Liderazgo y representación en Brasil',
    no: 'Lederskap og representasjon i Brasil',
  },
  'Ver perfil no LinkedIn': {
    en: 'View LinkedIn profile',
    es: 'Ver perfil en LinkedIn',
    no: 'Se LinkedIn-profil',
  },
  'Conversar sobre uma parceria': {
    en: 'Discuss a partnership',
    es: 'Conversar sobre una alianza',
    no: 'Snakk om et samarbeid',
  },
  'Perfil profissional': { en: 'Professional profile', es: 'Perfil profesional', no: 'Profesjonell profil' },
  'Experiência internacional a serviço de conexões duradouras': {
    en: 'International experience building lasting connections',
    es: 'Experiencia internacional al servicio de conexiones duraderas',
    no: 'Internasjonal erfaring som bygger varige forbindelser',
  },
  'Áreas de atuação': { en: 'Areas of expertise', es: 'Áreas de actuación', no: 'Kompetanseområder' },
  Formação: { en: 'Education', es: 'Formación', no: 'Utdanning' },
  Idiomas: { en: 'Languages', es: 'Idiomas', no: 'Språk' },
  'Trajetória profissional': {
    en: 'Professional journey',
    es: 'Trayectoria profesional',
    no: 'Yrkeskarriere',
  },
  'Uma carreira construída entre mercados, diplomacia e impacto': {
    en: 'A career built across markets, diplomacy and impact',
    es: 'Una carrera construida entre mercados, diplomacia e impacto',
    no: 'En karriere bygget på markeder, diplomati og samfunnseffekt',
  },
  'Construa a próxima parceria': {
    en: 'Build the next partnership',
    es: 'Construya la próxima alianza',
    no: 'Bygg det neste partnerskapet',
  },
  'Conecte sua operação ao seafood norueguês com visão local.': {
    en: 'Connect your operation to Norwegian seafood with local insight.',
    es: 'Conecte su operación con los productos del mar noruegos desde una perspectiva local.',
    no: 'Koble virksomheten din til norsk sjømat med lokal innsikt.',
  },
  'Fale com a Nordic Salmon': {
    en: 'Talk to Nordic Salmon',
    es: 'Hable con Nordic Salmon',
    no: 'Snakk med Nordic Salmon',
  },

  // Differentials and trust
  'Conhecimento real do mercado norueguês': {
    en: 'First-hand knowledge of the Norwegian market',
    es: 'Conocimiento real del mercado noruego',
    no: 'Førstehåndskunnskap om det norske markedet',
  },
  'Relacionamento direto com o setor de pescados da Noruega e leitura precisa de como ele funciona — da produção à exportação.': {
    en: 'Direct relationships with Norway’s seafood sector and a precise understanding of how it works — from production to export.',
    es: 'Relación directa con el sector de productos del mar de Noruega y comprensión precisa de su funcionamiento — desde la producción hasta la exportación.',
    no: 'Direkte relasjoner til norsk sjømatnæring og presis forståelse av hvordan den fungerer — fra produksjon til eksport.',
  },
  'Experiência internacional comprovada': {
    en: 'Proven international experience',
    es: 'Experiencia internacional comprobada',
    no: 'Dokumentert internasjonal erfaring',
  },
  'Quase duas décadas de atuação diplomática e comercial da fundadora conectando empresas, governos e mercados.': {
    en: 'Nearly two decades of the founder’s diplomatic and commercial work connecting companies, governments and markets.',
    es: 'Casi dos décadas de actuación diplomática y comercial de la fundadora conectando empresas, gobiernos y mercados.',
    no: 'Nær to tiår med grunnleggerens diplomatiske og kommersielle arbeid med å koble selskaper, myndigheter og markeder.',
  },
  'Negociação intercultural': {
    en: 'Cross-cultural negotiation',
    es: 'Negociación intercultural',
    no: 'Tverrkulturelle forhandlinger',
  },
  'Fluência nos códigos de negócios da Noruega e do Brasil, o que reduz ruídos e acelera acordos bem construídos.': {
    en: 'Fluency in Norwegian and Brazilian business cultures, reducing misunderstandings and accelerating well-structured agreements.',
    es: 'Dominio de los códigos empresariales de Noruega y Brasil, lo que reduce malentendidos y acelera acuerdos bien estructurados.',
    no: 'God forståelse av forretningskulturen i Norge og Brasil reduserer misforståelser og fremskynder godt utformede avtaler.',
  },
  'Transparência nas condições': {
    en: 'Transparent terms',
    es: 'Transparencia en las condiciones',
    no: 'Åpenhet om vilkårene',
  },
  'Escopo, prazos e condições comerciais documentados com clareza, sem promessas que não possam ser cumpridas.': {
    en: 'Scope, timelines and commercial terms documented clearly, without promises that cannot be kept.',
    es: 'Alcance, plazos y condiciones comerciales documentados con claridad, sin promesas que no puedan cumplirse.',
    no: 'Omfang, tidsfrister og kommersielle vilkår dokumenteres tydelig, uten løfter som ikke kan holdes.',
  },
  'Planejamento logístico rigoroso': {
    en: 'Rigorous logistics planning',
    es: 'Planificación logística rigurosa',
    no: 'Grundig logistikkplanlegging',
  },
  'Cadeia refrigerada tratada como prioridade em todas as etapas, da origem ao destino final.': {
    en: 'The cold chain is prioritised at every stage, from source to final destination.',
    es: 'La cadena de frío se trata como una prioridad en todas las etapas, desde el origen hasta el destino final.',
    no: 'Kjølekjeden prioriteres i alle ledd, fra opprinnelse til endelig destinasjon.',
  },
  'Relacionamento de longo prazo': {
    en: 'Long-term relationships',
    es: 'Relación a largo plazo',
    no: 'Langsiktige relasjoner',
  },
  'Fornecimento pensado como parceria contínua, com acompanhamento comercial próximo após cada entrega.': {
    en: 'Supply designed as an ongoing partnership, with close commercial follow-up after every delivery.',
    es: 'Suministro concebido como una alianza continua, con seguimiento comercial cercano después de cada entrega.',
    no: 'Leveransene er utformet som et løpende samarbeid, med tett kommersiell oppfølging etter hver levering.',
  },
  Diferenciais: { en: 'Our strengths', es: 'Diferenciales', no: 'Våre styrker' },
  'O que sustenta a confiança dos nossos parceiros': {
    en: 'What underpins our partners’ trust',
    es: 'Lo que sustenta la confianza de nuestros socios',
    no: 'Dette bygger partnernes tillit',
  },
  'Não prometemos o que não podemos cumprir. Estes são os pontos em que nossa atuação se diferencia de fato.': {
    en: 'We do not promise what we cannot deliver. These are the areas where our work genuinely stands out.',
    es: 'No prometemos lo que no podemos cumplir. Estos son los aspectos en los que nuestra actuación realmente se diferencia.',
    no: 'Vi lover ikke mer enn vi kan holde. Dette er områdene der arbeidet vårt virkelig skiller seg ut.',
  },
  'Relação de confiança': { en: 'A trusted relationship', es: 'Relación de confianza', no: 'Et tillitsforhold' },
  'Transparência antes, durante e depois de cada operação': {
    en: 'Transparency before, during and after every operation',
    es: 'Transparencia antes, durante y después de cada operación',
    no: 'Åpenhet før, under og etter hver leveranse',
  },
  'Procedência documentada': {
    en: 'Documented origin',
    es: 'Procedencia documentada',
    no: 'Dokumentert opprinnelse',
  },
  'Produto de origem norueguesa com cadeia de fornecimento identificada e documentação de cada operação.': {
    en: 'Product of Norwegian origin with an identified supply chain and documentation for each operation.',
    es: 'Producto de origen noruego con cadena de suministro identificada y documentación de cada operación.',
    no: 'Produkt av norsk opprinnelse med identifisert leverandørkjede og dokumentasjon for hver leveranse.',
  },
  'Comunicação direta': { en: 'Direct communication', es: 'Comunicación directa', no: 'Direkte kommunikasjon' },
  'Interlocução próxima e sem intermediários desnecessários, do primeiro contato ao pós-entrega.': {
    en: 'Close communication without unnecessary intermediaries, from first contact through post-delivery.',
    es: 'Comunicación cercana y sin intermediarios innecesarios, desde el primer contacto hasta la posentrega.',
    no: 'Tett dialog uten unødvendige mellomledd, fra første kontakt til oppfølging etter levering.',
  },
  'Condições claras': { en: 'Clear terms', es: 'Condiciones claras', no: 'Tydelige vilkår' },
  'Propostas objetivas, com escopo, prazos e responsabilidades definidos por escrito.': {
    en: 'Clear proposals with scope, timelines and responsibilities defined in writing.',
    es: 'Propuestas objetivas, con alcance, plazos y responsabilidades definidos por escrito.',
    no: 'Tydelige tilbud med omfang, tidsfrister og ansvar definert skriftlig.',
  },
  'Presença no setor': { en: 'Industry presence', es: 'Presencia en el sector', no: 'Tilstedeværelse i bransjen' },
  'Participações recentes em eventos do mercado de pescados, representando o salmão norueguês.': {
    en: 'Recent participation in seafood-market events representing Norwegian salmon.',
    es: 'Participaciones recientes en eventos del mercado de productos del mar, representando el salmón noruego.',
    no: 'Nylig deltakelse på arrangementer i sjømatmarkedet som representant for norsk laks.',
  },
  'São Paulo, Brasil': { en: 'São Paulo, Brazil', es: 'São Paulo, Brasil', no: 'São Paulo, Brasil' },
  'Apresentação do salmão da Noruega ao varejo e à distribuição brasileira.': {
    en: 'Presentation of Norwegian salmon to Brazilian retail and distribution.',
    es: 'Presentación del salmón de Noruega al comercio minorista y la distribución brasileña.',
    no: 'Presentasjon av norsk laks for brasiliansk detaljhandel og distribusjon.',
  },
  'Barcelona, Espanha': { en: 'Barcelona, Spain', es: 'Barcelona, España', no: 'Barcelona, Spania' },
  'Participação na maior feira mundial de pescados, ao lado do setor exportador norueguês.': {
    en: 'Participation in the world’s largest seafood trade show alongside Norway’s export sector.',
    es: 'Participación en la mayor feria mundial de productos del mar junto al sector exportador noruego.',
    no: 'Deltakelse på verdens største sjømatmesse sammen med norsk eksportnæring.',
  },

  // Audiences (component is currently available but not mounted)
  'Restaurantes e chefs': { en: 'Restaurants and chefs', es: 'Restaurantes y chefs', no: 'Restauranter og kokker' },
  'Regularidade de fornecimento e padrão de corte para cardápios que dependem de qualidade constante.': {
    en: 'Reliable supply and consistent cuts for menus that depend on stable quality.',
    es: 'Regularidad de suministro y patrón de corte para menús que dependen de una calidad constante.',
    no: 'Forutsigbare leveranser og jevn skjæring for menyer som er avhengige av stabil kvalitet.',
  },
  'Hotéis e catering': { en: 'Hotels and catering', es: 'Hoteles y catering', no: 'Hoteller og catering' },
  'Porcionamento previsível e planejamento de volume para banquetes, eventos e operações de grande escala.': {
    en: 'Predictable portioning and volume planning for banquets, events and large-scale operations.',
    es: 'Porcionado previsible y planificación de volumen para banquetes, eventos y operaciones a gran escala.',
    no: 'Forutsigbar porsjonering og volumplanlegging for banketter, arrangementer og storskala drift.',
  },
  'Supermercados e empórios': {
    en: 'Supermarkets and delicatessens',
    es: 'Supermercados y tiendas gourmet',
    no: 'Supermarkeder og delikatessebutikker',
  },
  'Produto com procedência clara e apelo de vitrine para o varejo que atende consumidores exigentes.': {
    en: 'A clearly sourced product with strong display appeal for retailers serving discerning consumers.',
    es: 'Producto con procedencia clara y atractivo en vitrina para el comercio minorista que atiende a consumidores exigentes.',
    no: 'Et produkt med tydelig opprinnelse og sterk presentasjon for detaljister som betjener kvalitetsbevisste kunder.',
  },
  'Distribuidores e atacadistas': {
    en: 'Distributors and wholesalers',
    es: 'Distribuidores y mayoristas',
    no: 'Distributører og grossister',
  },
  'Estruturação de volumes, logística e condições comerciais para quem abastece outras empresas.': {
    en: 'Volume, logistics and commercial-term planning for businesses that supply other companies.',
    es: 'Estructuración de volúmenes, logística y condiciones comerciales para quienes abastecen a otras empresas.',
    no: 'Planlegging av volum, logistikk og kommersielle vilkår for virksomheter som leverer til andre selskaper.',
  },
  Peixarias: { en: 'Fishmongers', es: 'Pescaderías', no: 'Fiskebutikker' },
  'Salmão inteiro ou em cortes com frescor e apresentação impecável para o balcão.': {
    en: 'Whole salmon or cuts with freshness and impeccable counter presentation.',
    es: 'Salmón entero o en cortes con frescura y una presentación impecable para el mostrador.',
    no: 'Hel laks eller stykningsdeler med ferskhet og førsteklasses presentasjon i disken.',
  },
  'Empresas de alimentação': {
    en: 'Food-service companies',
    es: 'Empresas de alimentación',
    no: 'Storhusholdningsbedrifter',
  },
  'Cadeia de suprimento confiável para cozinhas industriais e operações de refeições coletivas.': {
    en: 'A reliable supply chain for industrial kitchens and institutional catering operations.',
    es: 'Cadena de suministro fiable para cocinas industriales y operaciones de alimentación colectiva.',
    no: 'En pålitelig leverandørkjede for industrikjøkken og storhusholdning.',
  },
  'Quem atendemos': { en: 'Who we serve', es: 'A quiénes atendemos', no: 'Hvem vi leverer til' },
  'Fornecimento pensado para cada tipo de operação': {
    en: 'Supply designed for every type of operation',
    es: 'Suministro pensado para cada tipo de operación',
    no: 'Leveranser tilpasset hver type virksomhet',
  },

  // Call to action
  'Próximo embarque': { en: 'Next shipment', es: 'Próximo embarque', no: 'Neste forsendelse' },
  'O salmão certo para a sua operação começa com uma boa conversa.': {
    en: 'The right salmon for your operation starts with a good conversation.',
    es: 'El salmón adecuado para su operación comienza con una buena conversación.',
    no: 'Riktig laks for virksomheten din begynner med en god samtale.',
  },
  'Conte o produto, o volume e a frequência que procura. Estruturamos a especificação e a rota de fornecimento mais adequadas ao seu negócio.': {
    en: 'Tell us the product, volume and frequency you need. We will structure the specifications and supply route best suited to your business.',
    es: 'Indíquenos el producto, el volumen y la frecuencia que busca. Estructuraremos la especificación y la ruta de suministro más adecuadas para su negocio.',
    no: 'Fortell oss hvilket produkt, volum og leveringsintervall du trenger. Vi utformer spesifikasjonen og leveringsruten som passer best for virksomheten din.',
  },
  'Solicitar proposta': { en: 'Request a proposal', es: 'Solicitar propuesta', no: 'Be om tilbud' },
  'Falar pelo WhatsApp': { en: 'Talk on WhatsApp', es: 'Hablar por WhatsApp', no: 'Snakk på WhatsApp' },

  // Contact form and generated WhatsApp message
  'Solicite uma proposta': { en: 'Request a proposal', es: 'Solicite una propuesta', no: 'Be om et tilbud' },
  'Conte um pouco sobre a sua operação. Retornaremos com as possibilidades de fornecimento adequadas ao seu negócio.': {
    en: 'Tell us a little about your operation. We will respond with supply options suited to your business.',
    es: 'Cuéntenos un poco sobre su operación. Le responderemos con las opciones de suministro adecuadas para su negocio.',
    no: 'Fortell oss litt om virksomheten din. Vi kommer tilbake med leveringsalternativer som passer behovene dine.',
  },
  'Informe seu nome completo': { en: 'Enter your full name', es: 'Ingrese su nombre completo', no: 'Oppgi fullt navn' },
  'Informe o nome da empresa': { en: 'Enter the company name', es: 'Ingrese el nombre de la empresa', no: 'Oppgi selskapsnavnet' },
  'Informe seu cargo': { en: 'Enter your job title', es: 'Ingrese su cargo', no: 'Oppgi stillingstittelen din' },
  'Informe um e-mail válido': { en: 'Enter a valid email address', es: 'Ingrese un correo electrónico válido', no: 'Oppgi en gyldig e-postadresse' },
  'Informe um telefone com DDD': { en: 'Enter a phone number with area code', es: 'Ingrese un teléfono con código de área', no: 'Oppgi et telefonnummer med retningsnummer' },
  'Informe a cidade': { en: 'Enter the city', es: 'Ingrese la ciudad', no: 'Oppgi by' },
  'Selecione o estado': { en: 'Select the state', es: 'Seleccione el estado', no: 'Velg delstat' },
  'Selecione o tipo de estabelecimento': {
    en: 'Select the type of business',
    es: 'Seleccione el tipo de establecimiento',
    no: 'Velg virksomhetstype',
  },
  'Selecione o produto de interesse': {
    en: 'Select the product of interest',
    es: 'Seleccione el producto de interés',
    no: 'Velg produktet du er interessert i',
  },
  'É necessário autorizar o contato': {
    en: 'You must authorise contact',
    es: 'Es necesario autorizar el contacto',
    no: 'Du må samtykke til kontakt',
  },
  'Restaurante / Sushi bar': { en: 'Restaurant / Sushi bar', es: 'Restaurante / Sushi bar', no: 'Restaurant / Sushibar' },
  'Hotel / Resort': { en: 'Hotel / Resort', es: 'Hotel / Resort', no: 'Hotell / Resort' },
  'Supermercado / Empório': { en: 'Supermarket / Delicatessen', es: 'Supermercado / Tienda gourmet', no: 'Supermarked / Delikatessebutikk' },
  'Distribuidor / Atacadista': { en: 'Distributor / Wholesaler', es: 'Distribuidor / Mayorista', no: 'Distributør / Grossist' },
  Peixaria: { en: 'Fishmonger', es: 'Pescadería', no: 'Fiskebutikk' },
  'Empresa de alimentação': { en: 'Food-service company', es: 'Empresa de alimentación', no: 'Storhusholdningsbedrift' },
  Outro: { en: 'Other', es: 'Otro', no: 'Annet' },
  Semanal: { en: 'Weekly', es: 'Semanal', no: 'Ukentlig' },
  Quinzenal: { en: 'Every two weeks', es: 'Quincenal', no: 'Annenhver uke' },
  Mensal: { en: 'Monthly', es: 'Mensual', no: 'Månedlig' },
  'Sob demanda': { en: 'On demand', es: 'Bajo demanda', no: 'Etter behov' },
  'Solicitação pronta no WhatsApp': {
    en: 'Request ready in WhatsApp',
    es: 'Solicitud lista en WhatsApp',
    no: 'Forespørselen er klar i WhatsApp',
  },
  'Os dados foram organizados em uma mensagem. Basta confirmar o envio na conversa aberta com a Mai.': {
    en: 'Your information has been organised into a message. Simply confirm sending it in the conversation opened with Mai.',
    es: 'Los datos se organizaron en un mensaje. Solo tiene que confirmar el envío en la conversación abierta con Mai.',
    no: 'Opplysningene er satt sammen i en melding. Du trenger bare å bekrefte sendingen i samtalen som er åpnet med Mai.',
  },
  'Enviar nova solicitação': { en: 'Send another request', es: 'Enviar nueva solicitud', no: 'Send en ny forespørsel' },
  'Nome completo': { en: 'Full name', es: 'Nombre completo', no: 'Fullt navn' },
  Empresa: { en: 'Company', es: 'Empresa', no: 'Selskap' },
  Cargo: { en: 'Job title', es: 'Cargo', no: 'Stilling' },
  'Telefone / WhatsApp': { en: 'Phone / WhatsApp', es: 'Teléfono / WhatsApp', no: 'Telefon / WhatsApp' },
  'E-mail': { en: 'Email', es: 'Correo electrónico', no: 'E-post' },
  Cidade: { en: 'City', es: 'Ciudad', no: 'By' },
  Estado: { en: 'State', es: 'Estado', no: 'Delstat' },
  'Tipo de estabelecimento': { en: 'Type of business', es: 'Tipo de establecimiento', no: 'Virksomhetstype' },
  'Produto de interesse': { en: 'Product of interest', es: 'Producto de interés', no: 'Produkt av interesse' },
  'Selecione…': { en: 'Select…', es: 'Seleccione…', no: 'Velg…' },
  'Mais de um produto': { en: 'More than one product', es: 'Más de un producto', no: 'Mer enn ett produkt' },
  'Volume estimado (kg/mês)': { en: 'Estimated volume (kg/month)', es: 'Volumen estimado (kg/mes)', no: 'Anslått volum (kg/måned)' },
  'Ex.: 500 kg': { en: 'E.g. 500 kg', es: 'Ej.: 500 kg', no: 'F.eks. 500 kg' },
  'Frequência de compra': { en: 'Purchase frequency', es: 'Frecuencia de compra', no: 'Innkjøpsfrekvens' },
  Mensagem: { en: 'Message', es: 'Mensaje', no: 'Melding' },
  'Detalhes adicionais sobre a sua operação e necessidade': {
    en: 'Additional details about your operation and requirements',
    es: 'Detalles adicionales sobre su operación y necesidad',
    no: 'Ytterligere informasjon om virksomheten og behovene dine',
  },
  'Autorizo o uso dos dados informados para retorno desta solicitação e envio de propostas comerciais, conforme a Política de Privacidade.': {
    en: 'I authorise the use of the information provided to respond to this request and send commercial proposals, in accordance with the Privacy Policy.',
    es: 'Autorizo el uso de los datos proporcionados para responder a esta solicitud y enviar propuestas comerciales, de acuerdo con la Política de Privacidad.',
    no: 'Jeg samtykker til at opplysningene brukes til å besvare denne forespørselen og sende kommersielle tilbud, i samsvar med personvernerklæringen.',
  },
  'Autorizo o uso dos dados informados para retorno desta solicitação e envio de propostas comerciais, conforme a': {
    en: 'I authorise the use of the information provided to respond to this request and send commercial proposals, in accordance with the',
    es: 'Autorizo el uso de los datos proporcionados para responder a esta solicitud y enviar propuestas comerciales, de acuerdo con la',
    no: 'Jeg samtykker til at opplysningene brukes til å besvare denne forespørselen og sende kommersielle tilbud, i samsvar med',
  },
  'Não foi possível enviar a solicitação. Tente novamente em instantes ou utilize outro canal de contato.': {
    en: 'We could not send your request. Please try again shortly or use another contact channel.',
    es: 'No fue posible enviar la solicitud. Inténtelo de nuevo en unos instantes o utilice otro canal de contacto.',
    no: 'Vi kunne ikke sende forespørselen. Prøv igjen om litt, eller bruk en annen kontaktkanal.',
  },
  'Preparando…': { en: 'Preparing…', es: 'Preparando…', no: 'Forbereder…' },
  'Continuar pelo WhatsApp': { en: 'Continue on WhatsApp', es: 'Continuar por WhatsApp', no: 'Fortsett på WhatsApp' },
  'Olá, Mai! Gostaria de solicitar uma cotação de salmão norueguês.': {
    en: 'Hello, Mai! I would like to request a quote for Norwegian salmon.',
    es: '¡Hola, Mai! Me gustaría solicitar una cotización de salmón noruego.',
    no: 'Hei, Mai! Jeg ønsker et tilbud på norsk laks.',
  },
  Nome: { en: 'Name', es: 'Nombre', no: 'Navn' },
  Telefone: { en: 'Phone', es: 'Teléfono', no: 'Telefon' },
  Local: { en: 'Location', es: 'Ubicación', no: 'Sted' },
  'Tipo de operação': { en: 'Type of operation', es: 'Tipo de operación', no: 'Virksomhetstype' },
  Produto: { en: 'Product', es: 'Producto', no: 'Produkt' },
  'Volume estimado': { en: 'Estimated volume', es: 'Volumen estimado', no: 'Anslått volum' },
  Frequência: { en: 'Frequency', es: 'Frecuencia', no: 'Frekvens' },
  Observações: { en: 'Notes', es: 'Observaciones', no: 'Merknader' },
  'Nome: {value}': { en: 'Name: {value}', es: 'Nombre: {value}', no: 'Navn: {value}' },
  'Empresa: {value}': { en: 'Company: {value}', es: 'Empresa: {value}', no: 'Selskap: {value}' },
  'Cargo: {value}': { en: 'Job title: {value}', es: 'Cargo: {value}', no: 'Stilling: {value}' },
  'E-mail: {value}': { en: 'Email: {value}', es: 'Correo electrónico: {value}', no: 'E-post: {value}' },
  'Telefone: {value}': { en: 'Phone: {value}', es: 'Teléfono: {value}', no: 'Telefon: {value}' },
  'Local: {value}': { en: 'Location: {value}', es: 'Ubicación: {value}', no: 'Sted: {value}' },
  'Tipo de operação: {value}': { en: 'Type of operation: {value}', es: 'Tipo de operación: {value}', no: 'Virksomhetstype: {value}' },
  'Produto: {value}': { en: 'Product: {value}', es: 'Producto: {value}', no: 'Produkt: {value}' },
  'Volume estimado: {value}': { en: 'Estimated volume: {value}', es: 'Volumen estimado: {value}', no: 'Anslått volum: {value}' },
  'Frequência: {value}': { en: 'Frequency: {value}', es: 'Frecuencia: {value}', no: 'Frekvens: {value}' },
  'Observações: {value}': { en: 'Notes: {value}', es: 'Observaciones: {value}', no: 'Merknader: {value}' },

  // Legal and error pages
  'Voltar ao site': { en: 'Back to the website', es: 'Volver al sitio', no: 'Tilbake til nettstedet' },
  'Este documento é um modelo institucional básico e deve ser revisado e complementado pela empresa, preferencialmente com apoio jurídico, antes da publicação definitiva.': {
    en: 'This document is a basic institutional template and should be reviewed and completed by the company, preferably with legal support, before final publication.',
    es: 'Este documento es un modelo institucional básico y debe ser revisado y completado por la empresa, preferentemente con asesoramiento jurídico, antes de su publicación definitiva.',
    no: 'Dette dokumentet er en grunnleggende virksomhetsmal og bør gjennomgås og kompletteres av selskapet, helst med juridisk bistand, før endelig publisering.',
  },
  'Ao acessar este website, o visitante concorda com os termos abaixo. Este site tem caráter institucional e informativo sobre as atividades da {company}.': {
    en: 'By accessing this website, the visitor agrees to the terms below. This website provides corporate and informational content about the activities of {company}.',
    es: 'Al acceder a este sitio web, el visitante acepta los términos que figuran a continuación. Este sitio tiene carácter institucional e informativo sobre las actividades de {company}.',
    no: 'Ved å besøke dette nettstedet godtar den besøkende vilkårene nedenfor. Nettstedet inneholder selskaps- og informasjonsinnhold om virksomheten til {company}.',
  },
  'Conteúdo informativo': { en: 'Informational content', es: 'Contenido informativo', no: 'Informasjonsinnhold' },
  'As informações sobre produtos, formatos e condições apresentadas neste website não constituem oferta vinculante. A disponibilidade, os volumes, os preços e as condições comerciais devem ser confirmados diretamente com a empresa por meio dos canais oficiais.': {
    en: 'The information about products, formats and terms presented on this website does not constitute a binding offer. Availability, volumes, prices and commercial terms must be confirmed directly with the company through its official channels.',
    es: 'La información sobre productos, formatos y condiciones presentada en este sitio web no constituye una oferta vinculante. La disponibilidad, los volúmenes, los precios y las condiciones comerciales deben confirmarse directamente con la empresa a través de sus canales oficiales.',
    no: 'Informasjonen om produkter, formater og vilkår på dette nettstedet utgjør ikke et bindende tilbud. Tilgjengelighet, volum, priser og kommersielle vilkår må bekreftes direkte med selskapet gjennom de offisielle kanalene.',
  },
  'Propriedade intelectual': { en: 'Intellectual property', es: 'Propiedad intelectual', no: 'Immaterielle rettigheter' },
  'Os textos, a identidade visual e os demais elementos deste website pertencem à {company} ou a seus licenciantes e não podem ser reproduzidos sem autorização.': {
    en: 'The text, visual identity and other elements of this website belong to {company} or its licensors and may not be reproduced without authorisation.',
    es: 'Los textos, la identidad visual y los demás elementos de este sitio web pertenecen a {company} o a sus licenciantes y no pueden reproducirse sin autorización.',
    no: 'Tekst, visuell identitet og andre elementer på dette nettstedet tilhører {company} eller selskapets lisensgivere og kan ikke gjengis uten tillatelse.',
  },
  Responsabilidade: { en: 'Liability', es: 'Responsabilidad', no: 'Ansvar' },
  'A empresa emprega esforços razoáveis para manter as informações atualizadas, mas não garante a ausência de imprecisões. Links externos são fornecidos apenas por conveniência.': {
    en: 'The company makes reasonable efforts to keep the information current but does not guarantee that it is free from inaccuracies. External links are provided for convenience only.',
    es: 'La empresa realiza esfuerzos razonables para mantener la información actualizada, pero no garantiza que esté libre de inexactitudes. Los enlaces externos se proporcionan únicamente por comodidad.',
    no: 'Selskapet gjør rimelige tiltak for å holde informasjonen oppdatert, men garanterer ikke at den er fri for unøyaktigheter. Eksterne lenker tilbys kun for enkelhets skyld.',
  },
  'Dúvidas sobre estes termos podem ser encaminhadas pelos canais de contato indicados neste website.': {
    en: 'Questions about these terms may be submitted through the contact channels listed on this website.',
    es: 'Las preguntas sobre estos términos pueden enviarse a través de los canales de contacto indicados en este sitio web.',
    no: 'Spørsmål om disse vilkårene kan sendes gjennom kontaktkanalene som er oppgitt på nettstedet.',
  },
  'A {company} respeita a privacidade dos visitantes deste website e trata os dados pessoais recebidos em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).': {
    en: '{company} respects the privacy of visitors to this website and processes personal data received in accordance with Brazil’s General Data Protection Law (Law No. 13,709/2018 — LGPD).',
    es: '{company} respeta la privacidad de los visitantes de este sitio web y trata los datos personales recibidos de conformidad con la Ley General de Protección de Datos de Brasil (Ley nº 13.709/2018 — LGPD).',
    no: '{company} respekterer personvernet til besøkende på nettstedet og behandler mottatte personopplysninger i samsvar med Brasils generelle personvernlov (lov nr. 13.709/2018 — LGPD).',
  },
  'Dados coletados': { en: 'Data collected', es: 'Datos recopilados', no: 'Opplysninger som samles inn' },
  'Coletamos apenas os dados fornecidos voluntariamente por meio do formulário de contato: nome, empresa, cargo, e-mail, telefone, cidade, estado e informações sobre o interesse comercial. Não coletamos dados sensíveis.': {
    en: 'We collect only the data voluntarily provided through the contact form: name, company, job title, email, phone number, city, state and information about commercial interest. We do not collect sensitive data.',
    es: 'Recopilamos únicamente los datos proporcionados voluntariamente a través del formulario de contacto: nombre, empresa, cargo, correo electrónico, teléfono, ciudad, estado e información sobre el interés comercial. No recopilamos datos sensibles.',
    no: 'Vi samler bare inn opplysninger som frivillig oppgis i kontaktskjemaet: navn, selskap, stilling, e-post, telefon, by, delstat og informasjon om kommersiell interesse. Vi samler ikke inn sensitive personopplysninger.',
  },
  'Finalidade do tratamento': { en: 'Purpose of processing', es: 'Finalidad del tratamiento', no: 'Formål med behandlingen' },
  'Responder às solicitações de contato e de proposta comercial;': {
    en: 'Respond to contact requests and requests for commercial proposals;',
    es: 'Responder a las solicitudes de contacto y de propuesta comercial;',
    no: 'Besvare kontaktforespørsler og forespørsler om kommersielle tilbud;',
  },
  'Elaborar e enviar propostas relacionadas ao fornecimento de produtos;': {
    en: 'Prepare and send proposals related to product supply;',
    es: 'Preparar y enviar propuestas relacionadas con el suministro de productos;',
    no: 'Utarbeide og sende tilbud knyttet til produktleveranser;',
  },
  'Manter o relacionamento comercial solicitado pelo titular.': {
    en: 'Maintain the commercial relationship requested by the data subject.',
    es: 'Mantener la relación comercial solicitada por el titular.',
    no: 'Opprettholde det kommersielle forholdet den registrerte har bedt om.',
  },
  Compartilhamento: { en: 'Data sharing', es: 'Intercambio de datos', no: 'Deling av opplysninger' },
  'Os dados não são vendidos nem compartilhados com terceiros para fins de marketing. O compartilhamento ocorre apenas quando necessário à execução da relação comercial ou por obrigação legal.': {
    en: 'Data is not sold or shared with third parties for marketing purposes. It is shared only when necessary to carry out the commercial relationship or comply with a legal obligation.',
    es: 'Los datos no se venden ni se comparten con terceros con fines de marketing. Solo se comparten cuando es necesario para ejecutar la relación comercial o por obligación legal.',
    no: 'Opplysningene selges ikke eller deles med tredjeparter for markedsføringsformål. De deles bare når det er nødvendig for å gjennomføre kundeforholdet eller oppfylle en lovpålagt plikt.',
  },
  'Direitos do titular': { en: 'Data-subject rights', es: 'Derechos del titular', no: 'Den registrertes rettigheter' },
  'Nos termos da LGPD, o titular pode solicitar a confirmação de tratamento, o acesso, a correção ou a exclusão de seus dados a qualquer momento, pelos canais de contato indicados neste website.': {
    en: 'Under the LGPD, the data subject may request confirmation of processing, access, correction or deletion of their data at any time through the contact channels listed on this website.',
    es: 'Conforme a la LGPD, el titular puede solicitar en cualquier momento la confirmación del tratamiento, el acceso, la corrección o la eliminación de sus datos a través de los canales de contacto indicados en este sitio web.',
    no: 'I henhold til LGPD kan den registrerte når som helst be om bekreftelse på behandling, innsyn, retting eller sletting av opplysningene gjennom kontaktkanalene på nettstedet.',
  },
  'Retenção e segurança': { en: 'Retention and security', es: 'Conservación y seguridad', no: 'Lagring og sikkerhet' },
  'Os dados são mantidos apenas pelo período necessário às finalidades descritas e protegidos por medidas técnicas e organizacionais adequadas.': {
    en: 'Data is retained only for the period necessary for the purposes described and protected by appropriate technical and organisational measures.',
    es: 'Los datos se conservan únicamente durante el período necesario para los fines descritos y se protegen mediante medidas técnicas y organizativas adecuadas.',
    no: 'Opplysningene lagres bare så lenge det er nødvendig for de beskrevne formålene, og beskyttes med egnede tekniske og organisatoriske tiltak.',
  },
  'Detalhes da operação (opcional)': {
    en: 'Operation details (optional)',
    es: 'Detalles de la operación (opcional)',
    no: 'Detaljer om virksomheten (valgfritt)',
  },

  // Assinatura de representação (logotipo da Norwell)
  Representante: { en: 'Official', es: 'Representante', no: 'Offisiell' },
  'oficial no Brasil': {
    en: 'representative in Brazil',
    es: 'oficial en Brasil',
    no: 'representant i Brasil',
  },
  'Parceiro exportador': {
    en: 'Exporting partner',
    es: 'Socio exportador',
    no: 'Eksportpartner',
  },

  // Norwell AS — missão, valores e certificações na origem
  'Fundada em 1996, a Norwell tem cerca de 70% do seu capital nas mãos dos próprios produtores e 30% com colaboradores-chave — um arranjo societário que aproxima quem cria o peixe de quem o exporta. Da sede em Florø, a operação se estende a escritórios comerciais em Aalborg, Londres e Kuala Lumpur.':
    {
      en: 'Founded in 1996, Norwell is roughly 70% owned by the farmers themselves and 30% by key employees — an ownership structure that keeps those who raise the fish close to those who export it. From its headquarters in Florø, the operation extends to sales offices in Aalborg, London and Kuala Lumpur.',
      es: 'Fundada en 1996, Norwell tiene cerca del 70% de su capital en manos de los propios productores y el 30% en las de colaboradores clave, una estructura societaria que acerca a quien cría el pescado con quien lo exporta. Desde su sede en Florø, la operación se extiende a oficinas comerciales en Aalborg, Londres y Kuala Lumpur.',
      no: 'Norwell ble etablert i 1996 og eies med rundt 70 % av oppdretterne selv og 30 % av nøkkelansatte — en eierstruktur som holder dem som produserer fisken tett på dem som eksporterer den. Fra hovedkontoret i Florø strekker virksomheten seg til salgskontorer i Aalborg, London og Kuala Lumpur.',
    },
  'Missão': { en: 'Mission', es: 'Misión', no: 'Formål' },
  'Construímos parcerias de longo prazo que geram o máximo de valor.': {
    en: 'We build long term partnerships at maximum value.',
    es: 'Construimos alianzas de largo plazo que generan el máximo valor.',
    no: 'Vi bygger langsiktige partnerskap med maksimal verdi.',
  },
  'Missão da Norwell AS, aplicada por sua representação comercial no Brasil: usar bem os recursos por meio de planejamento, precisão e prioridades claras — para que o parceiro tenha previsibilidade em toda a cadeia.':
    {
      en: 'Norwell AS’s mission, applied by its commercial representation in Brazil: use resources well through planning, precision and clear priorities — so that partners get predictability across the whole chain.',
      es: 'La misión de Norwell AS, aplicada por su representación comercial en Brasil: usar bien los recursos mediante planificación, precisión y prioridades claras, para que el socio tenga previsibilidad en toda la cadena.',
      no: 'Formålet til Norwell AS, videreført av selskapets kommersielle representasjon i Brasil: bruke ressursene godt gjennom planlegging, presisjon og tydelige prioriteringer — slik at partneren får forutsigbarhet i hele verdikjeden.',
    },
  Valores: { en: 'Values', es: 'Valores', no: 'Verdier' },
  'Os mesmos três princípios, dos fiordes ao cliente brasileiro': {
    en: 'The same three principles, from the fjords to the Brazilian client',
    es: 'Los mismos tres principios, desde los fiordos hasta el cliente brasileño',
    no: 'De samme tre prinsippene, fra fjordene til den brasilianske kunden',
  },
  Respeito: { en: 'Respect', es: 'Respeto', no: 'Respekt' },
  'Tratar todas as pessoas com dignidade, dentro e fora da empresa — de quem cria o peixe a quem o recebe na cozinha.':
    {
      en: 'Treating everyone with dignity, inside and outside the company — from those who raise the fish to those who receive it in the kitchen.',
      es: 'Tratar a todas las personas con dignidad, dentro y fuera de la empresa, desde quien cría el pescado hasta quien lo recibe en la cocina.',
      no: 'Å behandle alle med verdighet, både internt og eksternt — fra dem som produserer fisken til dem som tar imot den på kjøkkenet.',
    },
  Confiabilidade: { en: 'Trustworthy', es: 'Confiabilidad', no: 'Troverdighet' },
  'Parcerias construídas sobre honestidade e sobre o cumprimento do que foi acordado, operação após operação.':
    {
      en: 'Partnerships built on honesty and on delivering what was agreed, shipment after shipment.',
      es: 'Alianzas construidas sobre la honestidad y el cumplimiento de lo acordado, operación tras operación.',
      no: 'Partnerskap bygget på ærlighet og på å levere det som er avtalt, leveranse etter leveranse.',
    },
  'Competência': { en: 'Competent', es: 'Competencia', no: 'Kompetanse' },
  'Conhecimento técnico e de mercado permanentemente atualizado, reconhecido pelo profissionalismo na condução de cada negócio.':
    {
      en: 'Technical and market expertise kept continuously up to date, recognised for the professionalism it brings to every deal.',
      es: 'Conocimiento técnico y de mercado permanentemente actualizado, reconocido por el profesionalismo con que se conduce cada negocio.',
      no: 'Faglig og markedsmessig kunnskap som holdes kontinuerlig oppdatert, anerkjent for profesjonaliteten i hver forretning.',
    },
  'Certificações na origem': {
    en: 'Certifications at source',
    es: 'Certificaciones en el origen',
    no: 'Sertifiseringer i opprinnelsen',
  },
  'A procedência é auditada antes de virar promessa comercial': {
    en: 'Provenance is audited before it becomes a sales claim',
    es: 'La procedencia se audita antes de convertirse en una promesa comercial',
    no: 'Opprinnelsen revideres før den blir et salgsargument',
  },
  'As certificações abaixo são mantidas pela Norwell AS e cobrem a produção e a cadeia de custódia na Noruega. Os certificados em vigor, com suas validades, são publicados pela própria exportadora.':
    {
      en: 'The certifications below are held by Norwell AS and cover production and chain of custody in Norway. The certificates in force, with their expiry dates, are published by the exporter itself.',
      es: 'Las certificaciones a continuación son mantenidas por Norwell AS y cubren la producción y la cadena de custodia en Noruega. Los certificados vigentes, con sus fechas de validez, son publicados por la propia exportadora.',
      no: 'Sertifiseringene nedenfor innehas av Norwell AS og dekker produksjon og sporbarhetskjede i Norge. Gyldige sertifikater, med utløpsdato, publiseres av eksportøren selv.',
    },
  'Ver os certificados da Norwell': {
    en: 'View Norwell’s certificates',
    es: 'Ver los certificados de Norwell',
    no: 'Se sertifikatene til Norwell',
  },
  'Selo de origem do setor pesqueiro norueguês, exibido pela Norwell AS.': {
    en: 'Origin mark of the Norwegian seafood industry, displayed by Norwell AS.',
    es: 'Sello de origen del sector pesquero noruego, exhibido por Norwell AS.',
    no: 'Opprinnelsesmerket til norsk sjømatnæring, brukt av Norwell AS.',
  },
  'Padrão internacional de aquicultura responsável, com critérios ambientais e sociais auditados.': {
    en: 'International standard for responsible aquaculture, with audited environmental and social criteria.',
    es: 'Estándar internacional de acuicultura responsable, con criterios ambientales y sociales auditados.',
    no: 'Internasjonal standard for ansvarlig havbruk, med reviderte miljø- og sosialkriterier.',
  },
  'Certificação de cadeia de custódia para pescado de origem sustentável e rastreável.': {
    en: 'Chain-of-custody certification for seafood from sustainable, traceable sources.',
    es: 'Certificación de cadena de custodia para pescado de origen sostenible y trazable.',
    no: 'Sporbarhetssertifisering for sjømat fra bærekraftige og sporbare kilder.',
  },
  'Boas práticas de produção aplicadas à aquicultura, com foco em segurança do alimento.': {
    en: 'Good production practices applied to aquaculture, focused on food safety.',
    es: 'Buenas prácticas de producción aplicadas a la acuicultura, con foco en la seguridad alimentaria.',
    no: 'God produksjonspraksis anvendt på havbruk, med vekt på mattrygghet.',
  },
  'Certificação orgânica norueguesa': {
    en: 'Norwegian organic certification',
    es: 'Certificación orgánica noruega',
    no: 'Norsk økologisk sertifisering',
  },
  'Organismo oficial de certificação orgânica da Noruega, para as linhas que atendem ao padrão.': {
    en: 'Norway’s official organic certification body, for the lines that meet the standard.',
    es: 'Organismo oficial de certificación orgánica de Noruega, para las líneas que cumplen el estándar.',
    no: 'Norges offisielle organ for økologisk sertifisering, for produktlinjene som oppfyller standarden.',
  },
  'Tanque de criação de salmão em um fiorde norueguês, entre montanhas nevadas': {
    en: 'Salmon pen in a Norwegian fjord, surrounded by snow-covered mountains',
    es: 'Jaula de cría de salmón en un fiordo noruego, entre montañas nevadas',
    no: 'Lakse-merd i en norsk fjord, omgitt av snødekte fjell',
  },
  'Posta de salmão norueguês grelhada, servida com legumes': {
    en: 'Grilled Norwegian salmon portion served with vegetables',
    es: 'Porción de salmón noruego a la parrilla servida con verduras',
    no: 'Grillet porsjon norsk laks servert med grønnsaker',
  },
  'Serviço à la carte': { en: 'À la carte service', es: 'Servicio a la carta', no: 'À la carte-servering' },
  'Fotografias do catálogo oficial da empresa e do acervo da Norwell AS.': {
    en: 'Photographs from the company’s official catalogue and from the Norwell AS archive.',
    es: 'Fotografías del catálogo oficial de la empresa y del archivo de Norwell AS.',
    no: 'Fotografier fra selskapets offisielle katalog og fra arkivet til Norwell AS.',
  },

  'Erro 404': { en: 'Error 404', es: 'Error 404', no: 'Feil 404' },
  'Página não encontrada': { en: 'Page not found', es: 'Página no encontrada', no: 'Siden ble ikke funnet' },
  'O endereço acessado não existe ou foi movido. Volte para a página inicial da {company}.': {
    en: 'The address you accessed does not exist or has been moved. Return to the {company} home page.',
    es: 'La dirección a la que accedió no existe o fue trasladada. Vuelva a la página de inicio de {company}.',
    no: 'Adressen finnes ikke eller er flyttet. Gå tilbake til startsiden til {company}.',
  },
  'Ir para o início': { en: 'Go to the home page', es: 'Ir al inicio', no: 'Gå til startsiden' },
};

const variablePattern = /\{([A-Za-z][A-Za-z0-9_]*)\}/g;

export function translate(
  language: Language,
  source: string,
  variables: TranslationVariables = {},
): string {
  const template = language === 'pt' ? source : translations[source]?.[language] ?? source;

  return template.replace(variablePattern, (placeholder, variableName: string) => {
    const value = variables[variableName];
    return value === undefined ? placeholder : String(value);
  });
}
