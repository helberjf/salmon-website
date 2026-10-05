export const images = {
  /**
   * Plano de fundo do topo da home: Hamnøy, nas Lofoten, no inverno — ilhas
   * nevadas ligadas por pontes (foto de Tomáš Malík, licença livre do Pexels).
   * No celular usa um recorte vertical centrado na ponte. Os srcset também
   * estão no preload de scripts/generate-route-html.mjs — manter os dois iguais.
   */
  heroBackground: {
    src: '/images/catalog/lofoten-bridges-winter.webp',
    alt: '',
    mobileAvifSrcSet:
      '/images/responsive/hero-bridge-mobile-480.avif 480w, /images/responsive/hero-bridge-mobile-694.avif 694w',
    mobileWebpSrcSet:
      '/images/responsive/hero-bridge-mobile-480.webp 480w, /images/responsive/hero-bridge-mobile-694.webp 694w',
  },
  about: {
    src: '/images/catalog/salmon-farm-mountains.webp',
    alt: 'Tanque de criação de salmão em um fiorde norueguês, entre montanhas nevadas',
  },
  /** Fotografias do site-base da BridgePoint (Squarespace). */
  fjordFillet: {
    src: '/images/catalog/fjord-salmon-fillet.webp',
    alt: 'Filé de salmão fresco diante de um fiorde norueguês com montanhas nevadas',
  },
  bridge: {
    src: '/images/catalog/atlantic-road-bridge.webp',
    alt: 'Ponte da Estrada do Atlântico ligando ilhas na costa da Noruega',
  },
  coast: {
    src: '/images/catalog/norway-coast-sun.webp',
    alt: 'Mar calmo da costa norueguesa sob o sol, com montanhas ao fundo',
  },
  norwellDish: {
    src: '/images/norwell-salmon-dish.webp',
    alt: 'Posta de salmão norueguês grelhada, servida com legumes',
  },
  salmon: {
    src: '/images/catalog/salmon-origin.webp',
    alt: 'Filé de salmão diante de uma paisagem costeira da Noruega',
  },
  callToAction: {
    src: '/images/catalog/salmon-underwater.webp',
    alt: 'Salmões nadando em águas frias da Noruega',
  },
  differentials: {
    src: '/images/catalog/norway-farm-wide.webp',
    alt: 'Fazenda de salmão em águas frias cercada por montanhas nevadas',
  },
};

export const galleryImages = [
  {
    src: '/images/catalog/culinary-01.webp',
    alt: 'Prato de salmão defumado com salada e pão',
    label: 'Alta gastronomia',
  },
  {
    src: '/images/catalog/culinary-02.webp',
    alt: 'Salada fresca acompanhada de fatias de salmão',
    label: 'Cozinha contemporânea',
  },
  {
    src: '/images/catalog/culinary-03.webp',
    alt: 'Entrada com salmão, ervas e molho cítrico',
    label: 'Apresentação premium',
  },
  {
    src: '/images/catalog/culinary-04.webp',
    alt: 'Canapés com salmão defumado e ervas',
    label: 'Eventos e catering',
  },
  {
    src: '/images/catalog/culinary-05.webp',
    alt: 'Torradas com salmão defumado e creme',
    label: 'Versatilidade no menu',
  },
  {
    src: images.norwellDish.src,
    alt: images.norwellDish.alt,
    label: 'Serviço à la carte',
  },
];

export const processImages = {
  eggs: '/images/catalog/salmon-eggs.webp',
  smolt: '/images/catalog/smolt.webp',
  farm: '/images/catalog/salmon-underwater.webp',
  processing: '/images/catalog/processing.webp',
};
