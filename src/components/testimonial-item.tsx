import { cn, FormattedText } from 'drupal-canvas';
import type { ComponentPropsWithoutRef } from 'react';
import type { CanvasImage } from '@/lib/types';

export interface TestimonialItemProps extends Omit<
  ComponentPropsWithoutRef<'figure'>,
  'children'
> {
  image?: CanvasImage;
  name: string;
  quote: string;
  role?: string;
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
      <path d="M4 5h7v7c0 4-2.5 6.5-7 7v-3c2 0 3-1 3-3v-1H4V5Zm9 0h7v7c0 4-2.5 6.5-7 7v-3c2 0 3-1 3-3v-1h-3V5Z" />
    </svg>
  );
}

// A hard-cropped square portrait printed over an offset ink layer, with the
// grainy acid quote tile overlapping its corner. Without a portrait the tile
// stands alone, so the card keeps the same rhythm either way.
function Portrait({ image }: { image?: CanvasImage }) {
  return (
    <div
      className={cn(
        'relative shrink-0',
        image
          ? 'mr-4 mb-4 size-28 md:size-32 xl:size-28'
          : 'mr-1.5 mb-1.5 size-12',
      )}
    >
      {image ? (
        <>
          <div
            className="absolute inset-0 translate-x-2.5 translate-y-2.5 bg-ink"
            aria-hidden="true"
          />
          <div className="relative size-full overflow-hidden border-2 border-ink bg-surface-0">
            <img
              alt={image.alt}
              src={image.src}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              sizes="8rem"
              className="size-full object-cover object-top"
            />
          </div>
          <div
            className="absolute -right-4 -bottom-4 size-10"
            aria-hidden="true"
          >
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-ink" />
            <div className="grain-multiply relative flex size-10 items-center justify-center bg-acid text-ink">
              <QuoteIcon />
            </div>
          </div>
        </>
      ) : (
        <div aria-hidden="true">
          <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-ink" />
          <div className="grain-multiply relative flex size-12 items-center justify-center bg-acid text-ink">
            <QuoteIcon />
          </div>
        </div>
      )}
    </div>
  );
}

function TestimonialItem({
  className,
  image,
  name,
  quote,
  role,
  ...props
}: TestimonialItemProps) {
  return (
    <figure
      className={cn(
        'relative mr-2.5 mb-2.5 h-full xl:row-span-3 xl:grid xl:grid-rows-[subgrid]',
        className,
      )}
      {...props}
    >
      {/* Offset ink layer beneath the card, the same print pass as the pricing cards. */}
      <div
        className="absolute inset-0 translate-x-2.5 translate-y-2.5 bg-ink"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col gap-6 border-2 border-ink bg-paper p-6 text-ink md:flex-row md:items-start md:gap-8 md:p-8 xl:row-span-3 xl:grid xl:grid-rows-[subgrid] xl:gap-6">
        <Portrait image={image} />
        <div className="flex min-w-0 grow flex-col gap-6 xl:row-span-2 xl:grid xl:grid-rows-[subgrid]">
          <blockquote className="text-lg leading-7 font-medium tracking-[-0.01em] text-text md:text-xl md:leading-8 xl:text-lg xl:leading-7">
            <FormattedText as="div">{quote}</FormattedText>
          </blockquote>
          <figcaption className="mt-auto border-t-2 border-line pt-4 font-mono text-xs leading-5 tracking-[0.08em] uppercase xl:mt-0">
            <span className="block font-bold text-text">{name}</span>
            {role && <span className="block text-muted">{role}</span>}
          </figcaption>
        </div>
      </div>
    </figure>
  );
}

export { TestimonialItem };
export default TestimonialItem;
