import { useId } from 'react';
import { cva } from 'class-variance-authority';
import { cn, FormattedText } from 'drupal-canvas';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'class-variance-authority';

const heroVariants = cva('border-b-2 border-line', {
  variants: {
    backgroundColor: {
      chalk: 'bg-chalk',
      paper: 'bg-paper',
      acid: 'bg-acid',
      ink: 'dark bg-ink',
    },
  },
  defaultVariants: {
    backgroundColor: 'chalk',
  },
});

type HeroBackgroundColor = NonNullable<
  VariantProps<typeof heroVariants>['backgroundColor']
>;

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeWidth="2.5"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export interface HeroProps extends Omit<
  ComponentPropsWithoutRef<'section'>,
  'children'
> {
  backgroundColor: HeroBackgroundColor;
  buttonLabel: string;
  buttonLink: string;
  description: string;
  title: string;
}

// The hero graphic is cut paper: hard-edged shapes with no strokes, each
// colored layer printed slightly out of register over an ink layer, and a
// screen-print grain that lives only inside the colored shapes.
function HeroGraphic({
  isAcid = false,
  isInk = false,
}: {
  isAcid?: boolean;
  isInk?: boolean;
}) {
  const grainId = useId().replace(/:/g, '');
  const inkLayer = isInk ? 'fill-chalk' : 'fill-ink';
  const acidShape = isAcid ? 'fill-paper' : 'fill-acid';

  return (
    <svg
      viewBox="0 0 520 800"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        {/* Grain punches speckles out of whatever it filters, like uneven ink on rough stock. */}
        <filter id={grainId} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.1"
            numOctaves="2"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.6 2.1"
            result="speckle"
          />
          <feComposite in="SourceGraphic" in2="speckle" operator="in" />
        </filter>
      </defs>

      {/* Ink pass: every shape printed first in ink, offset down and right. */}
      <g className={inkLayer} transform="translate(14 14)">
        <polygon points="40,60 300,30 330,300 60,330" />
        <circle cx="330" cy="390" r="170" />
        <polygon points="120,560 500,520 480,760 100,780" />
        <rect x="420" y="120" width="80" height="80" />
      </g>

      {/* Color passes: cut-paper shapes, slightly out of register with the ink. */}
      <g className="motion-safe:animate-print-settle">
        <polygon
          points="40,60 300,30 330,300 60,330"
          className="fill-blue"
          filter={`url(#${grainId})`}
        />
        <rect
          x="420"
          y="120"
          width="80"
          height="80"
          className="fill-blue"
          filter={`url(#${grainId})`}
        />
      </g>
      <g className="motion-safe:animate-print-settle-late">
        <circle
          cx="330"
          cy="390"
          r="170"
          className={acidShape}
          filter={`url(#${grainId})`}
        />
        {/* Paper bar cut across the disc, a third pass with no ink beneath. */}
        <polygon
          points="120,400 520,380 520,440 120,460"
          className={cn('fill-paper', isInk && 'fill-chalk')}
        />
        <polygon
          points="120,560 500,520 480,760 100,780"
          className={acidShape}
          filter={`url(#${grainId})`}
        />
      </g>
    </svg>
  );
}

function Hero({
  backgroundColor,
  buttonLabel,
  buttonLink,
  className,
  description,
  title,
  ...props
}: HeroProps) {
  return (
    <section
      className={cn(
        'overflow-hidden',
        heroVariants({
          backgroundColor,
        }),
        className,
      )}
      {...props}
    >
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div className="relative z-10 px-5 pt-12 pb-12 sm:px-8 md:pt-16 md:pb-16 lg:px-16 lg:pt-20 lg:pb-20">
          <div className="flex max-w-4xl flex-col gap-8">
            <h1 className="font-sans text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] font-black tracking-[-0.045em] text-balance text-text font-stretch-105%">
              {title}
            </h1>
            <FormattedText
              as="div"
              className="max-w-xl font-mono text-sm leading-6 text-balance text-muted md:text-base md:leading-7"
            >
              {description}
            </FormattedText>
            <div>
              <a
                href={buttonLink}
                className={cn(
                  'inline-flex min-h-14 items-center gap-3 border-2 border-ink bg-ink px-7 font-mono text-sm font-bold tracking-[0.12em] text-chalk uppercase shadow-hard-blue',
                  'hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-hard-blue-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue motion-safe:transition-[transform,box-shadow]',
                  'dark:border-acid dark:bg-acid dark:text-ink',
                )}
              >
                <span>{buttonLabel}</span>
                <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
        <div
          className="relative min-h-80 border-t-2 border-line sm:min-h-[30rem] lg:min-h-0 lg:border-t-0 lg:border-l-2"
          aria-hidden="true"
        >
          <div className="absolute inset-0 p-6 sm:p-10 lg:p-8 xl:p-10">
            <HeroGraphic
              isAcid={backgroundColor === 'acid'}
              isInk={backgroundColor === 'ink'}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
export default Hero;
