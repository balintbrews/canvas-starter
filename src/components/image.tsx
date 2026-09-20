import { LogoMark } from '@/components/logo';
import { cva } from 'class-variance-authority';
import { cn, Image as ResponsiveImage } from 'drupal-canvas';
import type { ComponentPropsWithoutRef } from 'react';
import type { CanvasImage } from '@/lib/types';
import type { VariantProps } from 'class-variance-authority';

// The figure reserves room on the right and bottom for the offset print layer
// so the treatment stays inside the section gutter instead of bleeding out.
const imageVariants = cva('relative', {
  variants: {
    variant: {
      print: 'mr-3 mb-3',
      plain: '',
    },
  },
  defaultVariants: {
    variant: 'print',
  },
});

type ImageVariant = NonNullable<VariantProps<typeof imageVariants>['variant']>;

// Rendered width hints for the responsive srcset. Full width is a section's
// max width minus its gutters at each breakpoint. Half width is one column of
// a two-column split inside that section, which stacks to full width below
// the medium breakpoint. Half width with bleed is that column grown to the
// right viewport edge, which works out to half the viewport minus half the
// split's column gap. These are layout facts the image cannot measure, so the
// author states them explicitly with the layout width prop.
const SIZES = {
  full: '(min-width: 80rem) 72rem, (min-width: 64rem) calc(100vw - 8rem), (min-width: 40rem) calc(100vw - 4rem), calc(100vw - 2.5rem)',
  half: '(min-width: 80rem) 34rem, (min-width: 64rem) calc(50vw - 6rem), (min-width: 48rem) calc(50vw - 3.5rem), (min-width: 40rem) calc(100vw - 4rem), calc(100vw - 2.5rem)',
  half_bleed:
    '(min-width: 64rem) calc(50vw - 2rem), (min-width: 48rem) calc(50vw - 1.5rem), (min-width: 40rem) calc(100vw - 4rem), calc(100vw - 2.5rem)',
} as const;

type ImageLayoutWidth = keyof typeof SIZES;

export interface ImageProps extends Omit<
  ComponentPropsWithoutRef<'figure'>,
  'children'
> {
  image?: CanvasImage;
  layoutWidth?: ImageLayoutWidth;
  variant?: ImageVariant;
}

function Image({
  className,
  image,
  layoutWidth = 'full',
  variant,
  ...props
}: ImageProps) {
  // Without a source there is nothing to frame, so render nothing rather than
  // an empty print treatment or a placeholder.
  if (!image?.src) {
    return null;
  }

  const isPrint = (variant ?? 'print') === 'print';

  return (
    <figure className={cn(imageVariants({ variant }), className)} {...props}>
      {isPrint && (
        // Grainy blue print pass under the photo; the photo itself stays untextured.
        <div
          className="grain-multiply absolute inset-0 translate-x-3 translate-y-3 bg-blue"
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          'relative',
          isPrint && 'overflow-hidden border-2 border-ink bg-surface-0',
        )}
      >
        <ResponsiveImage
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={SIZES[layoutWidth]}
          className="block h-auto w-full"
        />
        {isPrint && (
          <div
            className="absolute right-0 bottom-0 flex h-14 w-24 items-center justify-center border-t-2 border-l-2 border-ink bg-paper"
            aria-hidden="true"
          >
            <LogoMark className="h-10" primaryClassName="fill-ink" />
          </div>
        )}
      </div>
    </figure>
  );
}

export { Image };
export default Image;
