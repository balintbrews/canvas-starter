import { LogoMark } from '@/components/logo';
import { cn, FormattedText } from 'drupal-canvas';
import type { ComponentPropsWithoutRef } from 'react';
import type { CanvasImage } from '@/lib/types';

export interface ImageFeatureProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  description: string;
  eyebrow?: string;
  image: CanvasImage;
  title: string;
}

function ImageFeature({
  className,
  description,
  eyebrow,
  image,
  title,
  ...props
}: ImageFeatureProps) {
  return (
    <div
      className={cn(
        // Tabloid layout: the photo bleeds to the left viewport edge and takes
        // the larger column; the copy column keeps the section gutter.
        'ml-[calc(50%-50vw)] grid w-[calc(50%+50vw)] gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-12 lg:gap-16',
        className,
      )}
      {...props}
    >
      <div className="relative mr-3 mb-3 min-h-72 md:min-h-[28rem] lg:min-h-[32rem]">
        {/* Grainy blue print pass under the photo; the photo itself stays untextured. */}
        <div
          className="grain-multiply absolute inset-0 translate-x-3 translate-y-3 bg-blue"
          aria-hidden="true"
        />
        <div className="absolute inset-0 overflow-hidden border-2 border-l-0 border-ink bg-surface-0">
          <img
            alt={image.alt}
            src={image.src}
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 52vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="absolute right-0 bottom-0 flex h-14 w-24 items-center justify-center border-t-2 border-l-2 border-ink bg-paper"
            aria-hidden="true"
          >
            <LogoMark className="h-10" primaryClassName="fill-ink" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl px-5 py-2 sm:px-8 md:px-0 md:pr-5 lg:pr-16">
        {eyebrow && (
          <p className="mb-5 border-t-[3px] border-line pt-3 font-mono text-xs leading-6 font-bold tracking-[0.2em] text-blue uppercase before:mr-3 before:inline-block before:size-2.5 before:bg-blue before:align-[-1px] dark:text-acid dark:before:bg-acid">
            {eyebrow}
          </p>
        )}
        <h2 className="max-w-2xl font-sans text-4xl leading-[0.95] font-black tracking-[-0.035em] text-balance text-text md:text-5xl lg:text-6xl">
          {title}
        </h2>
        <FormattedText
          as="div"
          className="mt-6 max-w-2xl text-base leading-7 text-balance text-muted md:text-lg md:leading-8"
        >
          {description}
        </FormattedText>
      </div>
    </div>
  );
}

export { ImageFeature };
export default ImageFeature;
