import { cn } from 'drupal-canvas';
import type { ComponentPropsWithoutRef } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3';

export interface HeadingProps extends Omit<
  ComponentPropsWithoutRef<'h2'>,
  'children'
> {
  level?: HeadingLevel;
  text: string;
}

function Heading({ className, level = 'h2', text, ...props }: HeadingProps) {
  // The level only changes the semantic element; the type treatment is the
  // same at every level so headings keep one voice across the site.
  const Tag = level;

  return (
    <Tag
      className={cn(
        'max-w-5xl font-sans text-4xl leading-[0.95] font-black tracking-[-0.035em] text-balance text-text md:text-5xl lg:text-6xl',
        className,
      )}
      {...props}
    >
      {text}
    </Tag>
  );
}

export { Heading };
export default Heading;
