import type { ComponentPropsWithoutRef } from 'react';

const VARIANT_WIDTHS = [480, 800, 1200, 1600] as const;
const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

type ImageMetadata = {
  width: number;
  height: number;
  maxVariantWidth: number;
};

const imageMetadata: Record<string, ImageMetadata> = {
  'culinary-01': { width: 1200, height: 900, maxVariantWidth: 1200 },
  'culinary-02': { width: 1200, height: 900, maxVariantWidth: 800 },
  'culinary-03': { width: 1100, height: 1108, maxVariantWidth: 800 },
  'culinary-04': { width: 1200, height: 800, maxVariantWidth: 1200 },
  'culinary-05': { width: 1200, height: 800, maxVariantWidth: 800 },
  'norway-farm-wide': { width: 2200, height: 1466, maxVariantWidth: 1200 },
  'norway-fjord': { width: 2200, height: 1465, maxVariantWidth: 1200 },
  'norwell-hero': { width: 1920, height: 925, maxVariantWidth: 1600 },
  'norwell-salmon-dish': { width: 1200, height: 800, maxVariantWidth: 800 },
  'mai-tonheim-consulate': { width: 800, height: 1000, maxVariantWidth: 800 },
  'mai-tonheim-diplomacy': { width: 480, height: 640, maxVariantWidth: 480 },
  'mai-tonheim-norway-brazil': { width: 388, height: 485, maxVariantWidth: 0 },
  'mai-tonheim-portrait': { width: 800, height: 800, maxVariantWidth: 800 },
  'mai-tonheim-salmon-preparation': { width: 960, height: 1280, maxVariantWidth: 800 },
  'mai-tonheim-salmon-presentation': { width: 1200, height: 1600, maxVariantWidth: 1200 },
  processing: { width: 1400, height: 932, maxVariantWidth: 800 },
  'salmon-eggs': { width: 1200, height: 798, maxVariantWidth: 800 },
  'salmon-farm': { width: 1536, height: 1024, maxVariantWidth: 800 },
  'salmon-fillet': { width: 1800, height: 1200, maxVariantWidth: 1200 },
  'salmon-origin': { width: 2200, height: 1465, maxVariantWidth: 1200 },
  'salmon-portions': { width: 1800, height: 1200, maxVariantWidth: 1200 },
  'salmon-smoked': { width: 1400, height: 933, maxVariantWidth: 1200 },
  'salmon-underwater': { width: 2200, height: 1467, maxVariantWidth: 1600 },
  'salmon-whole': { width: 1800, height: 1200, maxVariantWidth: 1200 },
  smolt: { width: 1200, height: 798, maxVariantWidth: 800 },
};

function responsiveStem(src: string) {
  return src.match(/^\/images\/(?:catalog\/|people\/)?([^/]+)\.(?:jpe?g|png|webp)$/i)?.[1];
}

export function getResponsiveImageSources(src: string, maxWidth?: number) {
  const stem = responsiveStem(src);
  const metadata = stem ? imageMetadata[stem] : undefined;

  if (!stem || !metadata) {
    return {
      width: undefined,
      height: undefined,
      avifSrcSet: undefined,
      webpSrcSet: undefined,
    };
  }

  const ceiling = Math.min(maxWidth ?? metadata.maxVariantWidth, metadata.maxVariantWidth);
  const widths = VARIANT_WIDTHS.filter((width) => width <= ceiling && width <= metadata.width);
  const sourceSet = (extension: 'avif' | 'webp') =>
    widths
      .map((width) => `/images/responsive/${stem}-${width}.${extension} ${width}w`)
      .join(', ');

  return {
    width: metadata.width,
    height: metadata.height,
    avifSrcSet: sourceSet('avif'),
    webpSrcSet: sourceSet('webp'),
  };
}

type ResponsiveImageProps = Omit<
  ComponentPropsWithoutRef<'img'>,
  'alt' | 'height' | 'sizes' | 'src' | 'srcSet' | 'width'
> & {
  alt: string;
  artDirection?: ReadonlyArray<{
    avifSrcSet: string;
    media: string;
    sizes: string;
    webpSrcSet: string;
  }>;
  src: string;
  sizes: string;
  maxWidth?: number;
  media?: string;
  pictureClassName?: string;
  preventFallbackDownload?: boolean;
};

/**
 * Catalog image with explicit intrinsic dimensions and AVIF/WebP candidates.
 * `preventFallbackDownload` is intended for images hidden behind a media query:
 * unmatched viewports retain layout metadata without fetching the original.
 */
export function ResponsiveImage({
  alt,
  artDirection = [],
  decoding = 'async',
  loading = 'lazy',
  maxWidth,
  media,
  pictureClassName = 'block',
  preventFallbackDownload = false,
  sizes,
  src,
  ...imageProps
}: ResponsiveImageProps) {
  const { width, height, avifSrcSet, webpSrcSet } = getResponsiveImageSources(src, maxWidth);

  return (
    <picture className={pictureClassName}>
      {artDirection.flatMap((source) => [
        <source
          key={`${source.media}-avif`}
          media={source.media}
          type="image/avif"
          srcSet={source.avifSrcSet}
          sizes={source.sizes}
        />,
        <source
          key={`${source.media}-webp`}
          media={source.media}
          type="image/webp"
          srcSet={source.webpSrcSet}
          sizes={source.sizes}
        />,
      ])}
      {avifSrcSet && (
        <source media={media} type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      )}
      {webpSrcSet && (
        <source media={media} type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      )}
      <img
        {...imageProps}
        src={preventFallbackDownload ? TRANSPARENT_PIXEL : src}
        srcSet={preventFallbackDownload ? undefined : webpSrcSet}
        sizes={preventFallbackDownload ? undefined : sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  );
}
