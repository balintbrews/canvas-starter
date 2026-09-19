import { cn } from 'drupal-canvas';
import type { ComponentPropsWithoutRef } from 'react';

export interface HeadingProps extends Omit<
  ComponentPropsWithoutRef<'h2'>,
  'children'
> {
  text: string;
}

function Heading({ className, text, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        'max-w-5xl font-sans text-4xl leading-[0.95] font-black tracking-[-0.035em] text-balance text-text md:text-5xl lg:text-6xl',
        className,
      )}
      {...props}
    >
      {text}
    </h2>
  );
}

export { Heading };
export default Heading;
