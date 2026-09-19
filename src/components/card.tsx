import { cn, FormattedText } from 'drupal-canvas';
import type { CSSProperties, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  description?: string;
  iconNameFromLucide?: string;
  title?: string;
}

function Card({
  className,
  description,
  iconNameFromLucide,
  title,
  ...props
}: CardProps) {
  const iconMaskStyle: CSSProperties | undefined = iconNameFromLucide
    ? {
        maskImage: `url(https://esm.sh/lucide-static@0.544.0/icons/${iconNameFromLucide}.svg)`,
        maskPosition: 'center',
        maskRepeat: 'no-repeat',
        maskSize: 'contain',
        WebkitMaskImage: `url(https://esm.sh/lucide-static@0.544.0/icons/${iconNameFromLucide}.svg)`,
        WebkitMaskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
      }
    : undefined;

  return (
    <div
      className={cn(
        'group flex flex-col gap-6 bg-transparent p-6 hover:bg-paper md:p-8 dark:hover:bg-surface-0',
        'motion-safe:transition-colors motion-safe:duration-150',
        className,
      )}
      {...props}
    >
      {iconNameFromLucide && (
        <div className="relative mr-1.5 mb-1.5 size-14 shrink-0">
          {/* Misregistered ink layer beneath the acid tile. */}
          <div
            className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-ink dark:bg-blue"
            aria-hidden="true"
          />
          <div className="grain-multiply relative flex size-14 items-center justify-center bg-acid">
            <div
              className="relative z-10 size-7 bg-ink"
              style={iconMaskStyle}
            />
          </div>
        </div>
      )}
      <div className="min-w-0">
        {title && (
          <h3 className="mb-3 text-lg leading-6 font-black tracking-[-0.02em] text-text uppercase">
            {title}
          </h3>
        )}
        {description && (
          <FormattedText as="div" className="text-sm leading-6 text-muted">
            {description}
          </FormattedText>
        )}
      </div>
    </div>
  );
}

export { Card };
export default Card;
